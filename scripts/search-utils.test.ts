import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { getSearchResults, highlightText } from "../src/utils/search-utils.js";

describe("search utils", () => {
	it("highlights literal keywords without treating regex metacharacters as patterns", () => {
		assert.equal(
			highlightText("Use [abc] literally", "[abc]"),
			"Use <mark>[abc]</mark> literally",
		);
	});

	it("escapes html before returning highlighted excerpts", () => {
		assert.equal(
			highlightText("<script>alert(1)</script> astro", "astro"),
			"&lt;script&gt;alert(1)&lt;/script&gt; <mark>astro</mark>",
		);
	});

	it("searches title, description, content and url path", () => {
		const results = getSearchResults(
			[
				{
					title: "Astro Guide",
					description: "Static site notes",
					content: "Use islands and content collections.",
					link: "/posts/astro-guide/",
				},
			],
			"islands",
			(link) => link,
		);

		assert.equal(results.length, 1);
		assert.equal(results[0].meta.title, "Astro Guide");
		assert.match(results[0].excerpt, /<mark>islands<\/mark>/);
	});
});
