import { getSortedPosts } from "@/utils/content-utils";
import type { SearchPost } from "@/utils/search-utils";

function toSearchContent(body: string): string {
	return body
		.replace(/```[\s\S]*?```/g, " ")
		.replace(/<[^>]*>/g, " ")
		.replace(/[#>*_`[\]()!-]/g, " ")
		.replace(/\s+/g, " ")
		.trim();
}

export async function GET() {
	const posts = await getSortedPosts();
	const searchPosts: SearchPost[] = posts.map((post) => ({
		title: post.data.title,
		description: post.data.description,
		content: toSearchContent(post.body || ""),
		link: `/posts/${post.slug}/`,
	}));

	return new Response(JSON.stringify(searchPosts), {
		headers: {
			"content-type": "application/json; charset=utf-8",
		},
	});
}
