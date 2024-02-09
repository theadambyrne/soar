import AuthForm from "@/components/auth/Form";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Page = async () => {
	return (
		<main className="max-w-lg mx-auto my-4 bg-popover p-10">
			<h1 className="text-2xl font-bold text-center">Create an account</h1>
			<AuthForm action="/api/sign-up">
				<Label htmlFor="email" className="text-muted-foreground">
					Username
				</Label>
				<Input name="username" id="username" required />
				<br />
				<Label htmlFor="name" className="text-muted-foreground">
					Name
				</Label>
				<Input name="name" id="name" required />
				<br />

				<Label htmlFor="email" className="text-muted-foreground">
					Email
				</Label>
				<Input name="email" id="email" type="email" required />
				<br />
				<Label htmlFor="password" className="text-muted-foreground">
					Password
				</Label>
				<Input type="password" name="password" id="password" required />
				<br />
			</AuthForm>
			<div className="mt-4 text-muted-foreground text-center text-sm">
				Already have an account?{" "}
				<Link href="/sign-in" className="text-secondary-foreground underline">
					Sign in
				</Link>
			</div>
		</main>
	);
};

export default Page;
