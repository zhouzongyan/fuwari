import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import vm from "node:vm";

function createLocalStorage() {
	const values = new Map();

	return {
		getItem(key) {
			return values.get(key) ?? null;
		},
		removeItem(key) {
			values.delete(key);
		},
		setItem(key, value) {
			values.set(key, value);
		},
	};
}

test("Umami stats requests omit compare=false and include share context", async () => {
	const source = await readFile("public/js/umami-share.js", "utf8");
	const calls = [];
	const localStorage = createLocalStorage();
	const window = {
		localStorage,
		fetch: async (url, options = {}) => {
			calls.push({ url, options });

			if (url === "https://umami.example/api/share/share-id") {
				return {
					ok: true,
					json: async () => ({
						websiteId: "website-id",
						token: "share-token",
					}),
				};
			}

			return {
				ok: true,
				json: async () => ({ pageviews: 1 }),
			};
		},
	};

	vm.runInNewContext(source, {
		Date: { now: () => 1234567890 },
		Error,
		JSON,
		fetch: window.fetch,
		localStorage,
		Map,
		URLSearchParams,
		window,
	});

	await window.fetchUmamiStats("https://umami.example", "share-id", {
		timezone: "Asia/Shanghai",
	});

	const statsCall = calls.at(-1);
	assert.equal(
		statsCall.url,
		"https://umami.example/api/websites/website-id/stats?startAt=0&endAt=1234567890&unit=hour&timezone=Asia%2FShanghai",
	);
	assert.deepEqual(Object.assign({}, statsCall.options.headers), {
		"x-umami-share-context": "1",
		"x-umami-share-token": "share-token",
	});
});
