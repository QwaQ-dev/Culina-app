import AuthLayout from "../auth-layout";

export default function SignIn() {
    const sign_in = "Sign in"
    return (
        <>
            <AuthLayout lastcomp={sign_in} where={"/sign-in"}/>
            <form action="" method="post">
                
            </form>

        </>
    );
}