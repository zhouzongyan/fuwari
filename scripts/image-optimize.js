#!/usr/bin/env node

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { auditImages } from "./image-audit.js";

const DEFAULT_QUALITY = 82;

function formatBytes(bytes) {
	return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

async function optimizeBuffer(filePath, quality) {
	const extension = path.extname(filePath).toLowerCase();
	const input = await fs.readFile(filePath);
	const image = sharp(input, { animated: extension === ".gif" });

	if (extension === ".jpg" || extension === ".jpeg") {
		return image.jpeg({ quality, mozjpeg: true }).toBuffer();
	}

	if (extension === ".png") {
		return image
			.png({ compressionLevel: 9, adaptiveFiltering: true, effort: 10 })
			.toBuffer();
	}

	if (extension === ".webp") {
		return image.webp({ quality, effort: 6 }).toBuffer();
	}

	return null;
}

export async function optimizeImages({
	imageDir,
	thresholdBytes,
	limit = Number.POSITIVE_INFINITY,
	quality = DEFAULT_QUALITY,
	write = false,
} = {}) {
	const report = auditImages({ imageDir, thresholdBytes, limit });
	const candidates = report.oversized
		.filter((file) =>
			[".jpg", ".jpeg", ".png", ".webp"].includes(file.extension),
		)
		.slice(0, limit);

	const results = [];

	for (const file of candidates) {
		const optimized = await optimizeBuffer(file.path, quality);
		if (!optimized || optimized.length >= file.size) {
			results.push({
				...file,
				optimizedSize: file.size,
				saved: 0,
				written: false,
			});
			continue;
		}

		if (write) {
			await fs.writeFile(file.path, optimized);
		}

		results.push({
			...file,
			optimizedSize: optimized.length,
			saved: file.size - optimized.length,
			written: write,
		});
	}

	return results;
}

export function renderOptimizeResult(results, { write = false } = {}) {
	const totalSaved = results.reduce((sum, item) => sum + item.saved, 0);
	const lines = [
		write ? "Image optimization written." : "Image optimization dry-run.",
		`Candidates: ${results.length}`,
		`Estimated saved: ${formatBytes(totalSaved)}`,
		"",
		...results.map(
			(item) =>
				`- ${formatBytes(item.size)} -> ${formatBytes(item.optimizedSize)}  ${item.relativePath}`,
		),
	];

	return `${lines.join("\n")}\n`;
}

function parseArgs(argv) {
	const options = {};
	for (const arg of argv) {
		if (arg === "--write") {
			options.write = true;
		}
		if (arg.startsWith("--threshold-mb=")) {
			options.thresholdBytes =
				Number.parseFloat(arg.slice("--threshold-mb=".length)) * 1024 * 1024;
		}
		if (arg.startsWith("--limit=")) {
			options.limit = Number.parseInt(arg.slice("--limit=".length), 10);
		}
		if (arg.startsWith("--quality=")) {
			options.quality = Number.parseInt(arg.slice("--quality=".length), 10);
		}
		if (arg.startsWith("--dir=")) {
			options.imageDir = path.resolve(arg.slice("--dir=".length));
		}
	}
	return options;
}

const scriptPath = fileURLToPath(import.meta.url);
const isMainModule =
	process.argv[1] && path.resolve(process.argv[1]) === path.resolve(scriptPath);

if (isMainModule) {
	const options = parseArgs(process.argv.slice(2));
	const results = await optimizeImages(options);
	process.stdout.write(renderOptimizeResult(results, options));
}
