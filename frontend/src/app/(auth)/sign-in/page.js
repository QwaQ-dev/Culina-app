import AuthLayout from "../auth-layout.js"


export default function SignIn() {
    const sign_up = "Sign up"
    return (
            <AuthLayout lastcomp={sign_up} where={"/sign-up"}>
            </AuthLayout>
    );
}