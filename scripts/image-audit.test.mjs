import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { auditImages, renderImageAudit } from "./image-audit.js";

test("auditImages groups image sizes and reports oversized files", () => {
	const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "fuwari-image-audit-"));
	try {
		fs.writeFileSync(path.join(tmpDir, "small.webp"), Buffer.alloc(10));
		fs.writeFileSync(path.join(tmpDir, "large.png"), Buffer.alloc(30));
		fs.writeFileSync(path.join(tmpDir, "note.txt"), Buffer.alloc(100));

		const report = auditImages({
			imageDir: tmpDir,
			thresholdBytes: 20,
			limit: 2,
		});

		assert.equal(report.totalCount, 2);
		assert.equal(report.totalSize, 40);
		assert.deepEqual(
			report.byExtension.map((item) => [item.extension, item.count, item.size]),
			[
				[".png", 1, 30],
				[".webp", 1, 10],
			],
		);
		assert.deepEqual(
			report.oversized.map((item) => path.basename(item.path)),
			["large.png"],
		);
		assert.match(renderImageAudit(report), /Oversized >= 0\.00 MB: 1/);
	} finally {
		fs.rmSync(tmpDir, { recursive: true, force: true });
	}
});
