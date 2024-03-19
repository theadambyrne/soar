import { Architecture } from "aws-cdk-lib/aws-lambda";
import { SSTConfig } from "sst";
import { App, Bucket, NextjsSite, StackContext } from "sst/constructs";
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
			const site = new NextjsSite(stack, "site", {
				bind: [bucket],
				cdk: {
					server: { architecture: Architecture.X86_64 },
				},
				runtime: "nodejs20.x",
				environment: {
					DATABASE_URL: process.env.DATABASE_URL!,
					DATABASE_AUTH_TOKEN: process.env.DATABASE_AUTH_TOKEN!,
					RESEND_API_KEY: process.env.RESEND_API_KEY!,
				},
			});

			stack.addOutputs({
				SiteUrl: site.url,
			});
		});
	},
} satisfies SSTConfig;
