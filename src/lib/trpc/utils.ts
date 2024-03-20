export function getBaseUrl() {
	if (typeof window !== "undefined") return window.location.origin;
	// return "https://d3ru5t0bjt4sdj.cloudfront.net/production";
	return "https://soar-mauve.vercel.app";
}

export function getUrl() {
	return getBaseUrl() + "/api/trpc";
}
