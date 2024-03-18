import { Architecture } from "aws-cdk-lib/aws-lambda";
import { SSTConfig } from "sst";
import { App, Bucket, NextjsSite, StackContext } from "sst/constructs";
import dotenv from "dotenv";
export default {
	config() {
		return {
			name: "soar",
			region: "eu-west-1",
		};
	},
	stacks(app: App) {
		app.stack(function Site({ stack }: StackContext) {
			const bucket = new Bucket(stack, "support_files");
			const env = dotenv.config().parsed;

			const site = new NextjsSite(stack, "site", {
				permissions: [bucket],
				bind: [bucket],
				cdk: {
					server: { architecture: Architecture.X86_64 },
				},
				runtime: "nodejs20.x",
				environment: env,
			});

			stack.addOutputs({
				SiteUrl: site.url,
			});
		});
	},
} satisfies SSTConfig;
