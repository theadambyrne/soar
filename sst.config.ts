import { Distribution } from "aws-cdk-lib/aws-cloudfront";
import { Architecture } from "aws-cdk-lib/aws-lambda";
import { SSTConfig } from "sst";
import { App, Bucket, NextjsSite, Stack } from "sst/constructs";

export default {
	config() {
		return {
			name: "soar",
			region: "eu-west-1",
		};
	},
	async stacks(app: App) {
		app.stack(function Site({ stack }: { stack: Stack }) {
			const bucket = new Bucket(stack, "public");

			const site = new NextjsSite(stack, "site", {
				permissions: [bucket],
				bind: [bucket],
				cdk: {
					server: { architecture: Architecture.X86_64 },
				},
				runtime: "nodejs20.x",
				memorySize: 4096,
			});

			stack.addOutputs({
				SiteUrl: site.url,
			});
		});
	},
} satisfies SSTConfig;
