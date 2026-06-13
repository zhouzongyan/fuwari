#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const IMAGE_EXTENSIONS = new Set([
	".avif",
	".gif",
	".jpeg",
	".jpg",
	".png",
	".webp",
]);

const DEFAULT_IMAGE_DIR = path.join(
	process.cwd(),
	"src",
	"content",
	"assets",
	"images",
);
const DEFAULT_THRESHOLD_BYTES = 2 * 1024 * 1024;

function walkFiles(dir) {
	const files = [];
	if (!fs.existsSync(dir)) {
		return files;
	}

	for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
		const fullPath = path.join(dir, entry.name);
		if (entry.isDirectory()) {
			files.push(...walkFiles(fullPath));
		} else if (entry.isFile()) {
			files.push(fullPath);
		}
	}

	return files;
}

function formatBytes(bytes) {
	return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

export function auditImages({
	imageDir = DEFAULT_IMAGE_DIR,
	thresholdBytes = DEFAULT_THRESHOLD_BYTES,
	limit = 30,
} = {}) {
	const files = walkFiles(imageDir)
		.filter((file) => IMAGE_EXTENSIONS.has(path.extname(file).toLowerCase()))
		.map((file) => {
			const stats = fs.statSync(file);
			return {
				path: file,
				relativePath: path.relative(process.cwd(), file).replace(/\\/g, "/"),
				extension: path.extname(file).toLowerCase(),
				size: stats.size,
			};
		});

	const byExtension = new Map();
	for (const file of files) {
		const current = byExtension.get(file.extension) || { count: 0, size: 0 };
		current.count += 1;
		current.size += file.size;
		byExtension.set(file.extension, current);
	}

	const largest = [...files].sort((a, b) => b.size - a.size).slice(0, limit);
	const oversized = files
		.filter((file) => file.size >= thresholdBytes)
		.sort((a, b) => b.size - a.size);

	return {
		totalCount: files.length,
		totalSize: files.reduce((sum, file) => sum + file.size, 0),
		thresholdBytes,
		byExtension: [...byExtension.entries()]
			.map(([extension, value]) => ({ extension, ...value }))
			.sort((a, b) => b.size - a.size),
		largest,
		oversized,
	};
}

export function renderImageAudit(report) {
	const lines = [
		`Images: ${report.totalCount}`,
		`Total size: ${formatBytes(report.totalSize)}`,
		`Oversized >= ${formatBytes(report.thresholdBytes)}: ${report.oversized.length}`,
		"",
		"By extension:",
		...report.byExtension.map(
			(item) =>
				`- ${item.extension}: ${item.count} files, ${formatBytes(item.size)}`,
		),
		"",
		"Largest files:",
		...report.largest.map(
			(file) => `- ${formatBytes(file.size)}  ${file.relativePath}`,
		),
	];

	return `${lines.join("\n")}\n`;
}

function parseArgs(argv) {
	const options = {};
	for (const arg of argv) {
		if (arg.startsWith("--threshold-mb=")) {
			options.thresholdBytes =
				Number.parseFloat(arg.slice("--threshold-mb=".length)) * 1024 * 1024;
		}
		if (arg.startsWith("--limit=")) {
			options.limit = Number.parseInt(arg.slice("--limit=".length), 10);
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
	const report = auditImages(parseArgs(process.argv.slice(2)));
	process.stdout.write(renderImageAudit(report));
}
