import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import sharp from "sharp";
import { optimizeImages, renderOptimizeResult } from "./image-optimize.js";

test("optimizeImages reports savings without writing by default", async () => {
	const tmpDir = fs.mkdtempSync(
		path.join(os.tmpdir(), "fuwari-image-optimize-"),
	);
	try {
		const imagePath = path.join(tmpDir, "large.jpg");
		await sharp({
			create: {
				width: 256,
				height: 256,
				channels: 3,
				background: "#ffffff",
			},
		})
			.jpeg({ quality: 100 })
			.toFile(imagePath);

		const originalSize = fs.statSync(imagePath).size;
		const results = await optimizeImages({
			imageDir: tmpDir,
			thresholdBytes: 1,
			quality: 70,
		});
		const currentSize = fs.statSync(imagePath).size;

		assert.equal(results.length, 1);
		assert.equal(currentSize, originalSize);
		assert.ok(results[0].saved >= 0);
		assert.match(renderOptimizeResult(results), /dry-run/);
	} finally {
		fs.rmSync(tmpDir, { recursive: true, force: true });
	}
});
