import AuthLayout from "../auth-layout.js"

export default function SignIn() {
    const sign_up = "Sign up"
    return (
            <AuthLayout lastcomp={sign_up} where={"/sign-up"}>
                <main className = "flex flex-row justify-center max-h-lvh items-center mx-auto px-10">
                    <div className="left-side w-1/2">
                        <h2 className="text-center text-6xl font-bold ">Sign In</h2>
                        <form action="POST " className="flex flex-col text-xl items-center gap-5 mt-10">
                            <input type="text" placeholder="Username" name="name"  className="py-2 px-4 border-nedoblack border-2 rounded-lg"/>
                            <input type="text" placeholder="Password" name = "password" className="py-2 px-4 border-nedoblack border-2 rounded-lg"/>
                            <button className="relative inline-block py-2 px-6 border-2  rounded-xl border-nedoblack text-xl text-nedowhite bg-no-repeat hover:bg-gradient-to-hover bg-center bg-nedoblack transition-colors duration-300 hover:text-nedoblack hover:animate-fill-center hover:border-nedoblack">
                                Sign In
                            </button>
                        </form>
                    </div>
                    <div className="right-side w-1/2 flex justify-center">
                        <img src="gifs/signin.gif" className = "w-[40rem]" alt="" />
                    </div>
                </main>
            </AuthLayout>
    );
}