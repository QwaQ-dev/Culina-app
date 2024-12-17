import AuthLayout from "../auth-layout";
import { Montserrat } from "next/font/google";


const montserrat = Montserrat({
    subsets: ['latin'],
  });


export default function SignIn() {

    const sign_in = "Sign in"
    return (
        <AuthLayout lastcomp={sign_in} where={"/sign-in"} className="font-montserrat" isFixed={true}>
           <main className = "flex flex-row justify-center  items-center mx-auto sm:px-16 ">
                <div className="left-side hidden sm:flex w-1/2 flex-justify-center items-center">
                    <img src="gifs/signup.gif" className = "w-[50rem]" alt="" />
                </div>
                <div className="ride-side sm:w-1/2 mt-24 ">
                    <h2 className="text-center text-2xl sm:text-5xl text-nowrap font-bold">Sign Up</h2>
                    <form action="POST " className="flex flex-col text-xs sm:text-xl items-center gap-5 mt-10">
                        <input type="text" placeholder="E-mail" name="email"  className="py-2 px-4 border-nedoblack border-2 rounded-lg"/>
                        <input type="text" placeholder="Username" name="name"  className="py-2 px-4 border-nedoblack border-2 rounded-lg"/>
                        <input type="text" placeholder="Password" name = "password" className="py-2 px-4 border-nedoblack border-2 rounded-lg"/>
                        <button className="relative inline-block py-2 px-6 border-2  rounded-xl border-nedoblack text-nowrap text-xl text-nedowhite bg-no-repeat hover:bg-gradient-to-hover bg-center bg-nedoblack transition-colors duration-300 hover:text-nedoblack hover:animate-fill-center hover:border-nedoblack">
                            Sign Up
                        </button>
                    </form>
                </div>
                    
            </main>
        </AuthLayout>
    );
}