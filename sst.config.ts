import { SSTConfig } from "sst";
import { Bucket, NextjsSite } from "sst/constructs";

export default {
	config(_input: any) {
		return {
			name: "soar",
			region: "eu-west-1",
		};
	},
	stacks(app: any) {
		app.stack(function Site({ stack }: { stack: any }) {
			const bucket = new Bucket(stack, "public");
			const site = new NextjsSite(stack, "site", {
				path: "src/app",
				bind: [bucket],
			});

			stack.addOutputs({
				SiteUrl: site.url,
			});
		});
	},
} satisfies SSTConfig;
