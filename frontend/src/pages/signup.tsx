import { Link } from "react-router-dom";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthProvider";
import { useState } from "react";
import { GoogleLogin, useGoogleLogin } from '@react-oauth/google';
import api from "@/api";

interface Inputs {
	username: string;
	email: string;
	password: string;
	cpassword: string;
}

const SignUpPage = () => {
	const { signup, googleSignup } = useAuth();

	const { register, watch, handleSubmit, formState: { errors } } = useForm<Inputs>();
	const onSubmit: SubmitHandler<Inputs> = async (data) => {
		console.log('login data', data);
		await signup(data);

		// toast
	}

	const tryGoogleSignUp = useGoogleLogin({
		onSuccess: async (codeResponse) => {
			console.log(codeResponse)
			await googleSignup(codeResponse.code);
		},
		onError: (error) => console.log('Signup Failed:', error),
		flow: 'auth-code',
	});

	return (
		<div className="w-full h-screen lg:grid lg:grid-cols-2">
			<div className="hidden bg-muted lg:flex flex-col">
				<div className="flex gap-2 p-8 text-[32px] font-semibold">
					<img src="/chax-logo-light.svg" height={56} width={56} alt="logo" />
					Chax
				</div>
				<div className="h-full w-full flex justify-center items-center">
					<img
						src="/undraw_chatting_re_j55r.svg"
						alt="img"
						width="600"
						height="600"
						className="object-fit dark:brightness-[0.2] dark:grayscale animate-float"
					/>
				</div>
			</div>

			<div className="h-full w-full flex items-center justify-center">
				<div className="mx-auto grid w-[350px] gap-6">
					<div className="grid gap-2 text-center">
						<h1 className="text-3xl font-bold">Create an account</h1>
						<p className="text-balance text-muted-foreground">
							Enter your email below to create your account
						</p>
					</div>
					<form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
						<div className="grid gap-2">
							<Label htmlFor="username">Username</Label>
							<Input
								id="username"
								type="text"
								{...register("username", {
									required: "required",
									maxLength: {
										value: 15,
										message: "max length is 15",
									},
								})}
							/>
							{errors.email && <span role="alert">{errors.email.message}</span>}
						</div>
						<div className="grid gap-2">
							<Label htmlFor="email">Email</Label>
							<Input
								id="email"
								type="email"
								{...register("email", {
									required: "required",
									pattern: {
										value: /\S+@\S+\.\S+/,
										message: "Enter a valid email",
									},
								})}
							/>
							{errors.email && <span role="alert">{errors.email.message}</span>}
						</div>
						<div className="grid gap-2">
							<Label htmlFor="password">Password</Label>
							<Input
								id="password"
								type="password"
								{...register("password", {
									required: "required",
									minLength: {
										value: 5,
										message: "min length is 5",
									},
								})}
							/>
							{errors.password && <span role="alert">{errors.password.message}</span>}
						</div>
						<div className="grid gap-2">
							<Label htmlFor="cpassword">Confirm Password</Label>
							<Input
								id="cpassword"
								type="password"
								{...register("cpassword", {
									required: "required",
									validate: (val: string) => {
										if (watch('password') !== val) {
											return "Password confirmation do no match";
										}
									},
								})}
							/>
							{errors.cpassword && <span role="alert">{errors.cpassword.message}</span>}
						</div>
						<Button type="submit" className="w-full">
							Sign up
						</Button>
						{/* <Button variant="outline" className="w-full">
							Login with Google
						</Button> */}
						{/* <GoogleLogin onSuccess={responseMessage} onError={errorMessage} /> */}
						<button type="button" onClick={() => tryGoogleSignUp()} className="w-full">
							Sign up with Google
						</button>
					</form>
					<div className="mt-4 text-center text-sm">
						Alreay have an account?{" "}
						<Link to="/login" className="underline">
							Login
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SignUpPage;
