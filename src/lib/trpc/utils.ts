export function getBaseUrl() {
	if (typeof window !== "undefined") return "";
	if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;

	return "https://d3ru5t0bjt4sdj.cloudfront.net";
}

export function getUrl() {
	return getBaseUrl() + "/api/trpc";
}
