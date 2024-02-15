import { SSTConfig } from "sst";
import { NextjsSite } from "sst/constructs";

export default {
	config(_input: any) {
		return {
			name: "soar",
			region: "eu-west-1", 
		};
	},
	stacks(app: any) {
		app.stack(function Site({ stack }: { stack: any }) {
			const site = new NextjsSite(stack, "site");

			stack.addOutputs({
				SiteUrl: site.url,
			});
		});
	},
} satisfies SSTConfig;
