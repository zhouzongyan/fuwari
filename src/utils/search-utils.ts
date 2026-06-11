export interface SearchPost {
	title: string;
	description: string;
	content: string;
	link: string;
}

export interface SearchResult {
	url: string;
	meta: {
		title: string;
	};
	excerpt: string;
	urlPath: string;
}

function escapeRegExp(value: string): string {
	return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function escapeHtml(value: string): string {
	return value
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&#39;");
}

export function highlightText(text: string, keyword: string): string {
	if (!keyword) return escapeHtml(text);

	const matcher = new RegExp(escapeRegExp(keyword), "gi");
	return escapeHtml(text).replace(matcher, (match) => `<mark>${match}</mark>`);
}

function createExcerpt(post: SearchPost, keyword: string): string {
	const contentLower = post.content.toLowerCase();
	const keywordLower = keyword.toLowerCase();
	const contentIndex = contentLower.indexOf(keywordLower);

	if (contentIndex === -1) {
		return post.description || `${post.content.substring(0, 150)}...`;
	}

	const start = Math.max(0, contentIndex - 50);
	const end = Math.min(post.content.length, contentIndex + 100);
	let excerpt = post.content.substring(start, end);

	if (start > 0) excerpt = `...${excerpt}`;
	if (end < post.content.length) excerpt = `${excerpt}...`;

	return excerpt;
}

export function getSearchResults(
	posts: SearchPost[],
	keyword: string,
	resolveUrl: (link: string) => string,
): SearchResult[] {
	const keywordLower = keyword.toLowerCase();

	return posts
		.filter((post) => {
			const searchText =
				`${post.title} ${post.description} ${post.content}`.toLowerCase();

			return (
				searchText.includes(keywordLower) ||
				post.link.toLowerCase().includes(keywordLower)
			);
		})
		.map((post) => ({
			url: resolveUrl(post.link),
			meta: {
				title: post.title,
			},
			excerpt: highlightText(createExcerpt(post, keyword), keyword),
			urlPath: post.link,
		}));
}
