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
	email: string;
	password: string;
}

const LoginPage = () => {
	// const { login, googleLogin } = useAuth();
	
	const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
	const onSubmit: SubmitHandler<Inputs> = async (data) => {
		console.log('login data', data);
		// await login(data);
		console.log('api called', await api.login(data));
	}


	const responseMessage = (response) => {
		console.log('google login successful', response);
		// const access_token = response.credential;
		// googleLogin(access_token);
	};

	const errorMessage = () => {
		console.log('google login failed');
	};

	const tryGoogleLogin = useGoogleLogin({
		onSuccess: async (codeResponse) => {
			console.log(codeResponse)
			// await googleLogin(codeResponse)
			// await login({ username: 'asd', password: 'qw' });
			// await api.googleLogin(codeResponse);
		},
		onError: (error) => console.log('Login Failed:', error),
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
						<h1 className="text-3xl font-bold">Login</h1>
						<p className="text-balance text-muted-foreground">
							Enter your email below to login to your account
						</p>
					</div>
					<form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
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
							<div className="flex items-center">
								<Label htmlFor="password">Password</Label>
								<Link
									to="/forgot-password"
									className="ml-auto inline-block text-sm underline"
								>
									Forgot your password?
								</Link>
							</div>
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
						<Button type="submit" className="w-full">
							Login
						</Button>
						{/* <Button variant="outline" className="w-full">
							Login with Google
						</Button> */}
						{/* <GoogleLogin onSuccess={responseMessage} onError={errorMessage} /> */}
						<button type="button" onClick={() => tryGoogleLogin()} className="w-full">
							Login with Google
						</button>
					</form>
					<div className="mt-4 text-center text-sm">
						Don&apos;t have an account?{" "}
						<Link to="#" className="underline">
							Sign up
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LoginPage;
