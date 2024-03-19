export function getBaseUrl() {
	"use serve";
	if (typeof window !== "undefined") return window.location.origin;
	// return "https://d3ru5t0bjt4sdj.cloudfront.net/production";
	return "http://localhost:3000";
}

export function getUrl() {
	return getBaseUrl() + "/api/trpc";
}
