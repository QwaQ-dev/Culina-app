"use client"
import AuthLayout from "../auth-layout.js"
import { handlerSignIn } from "@/app/api/auth/signup.js";
import { Montserrat } from "next/font/google";
import { useState } from "react";
import { useRouter } from "next/navigation"


const montserrat = Montserrat({
    subsets: ['latin'],
  });



export default function SignIn() {
    const sign_up = "Sign up"
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const router = useRouter()

    async function handleSubmit(e){
        e.preventDefault();
        setError(null);
        
        try{
            if(!name || !password){
                setError("All fields should be filled")
            }
            const response = await handlerSignIn(name, password);
            if (response.data.JWT){
                localStorage.setItem("token", response.data.JWT);
                router.push("/dashboard")

            }
        }catch(err){
            setError("Incorrect username or password")
        }

    }
    return (
            <AuthLayout lastcomp={sign_up} where={"/sign-up"} className="font-montserrat" isFixed={true}>
                <main className = "flex flex-row justify-center  items-center mx-auto sm:px-10 mt-24">
                    <div className="left-side w-1/2 text-center ">
                        <h2 className="text-center text-nowrap text-2xl  sm:text-6xl font-bold ">Sign In</h2>
                        <form onSubmit={handleSubmit} className="flex flex-col text-sm sm:text-xl items-center justify-center gap-5 mt-10">
                            <input 
                                type="text" 
                                placeholder="Username" 
                                value={name}
                                onChange={
                                    (e)=>{
                                        setName(e.target.value)
                                    }}
                                name="name"  
                                className="py-2 px-4 border-nedoblack border-2 rounded-lg" required/>
                            <input 
                                type="text" 
                                placeholder="Password" 
                                value={password}
                                onChange = {(e) =>{
                                    setPassword(e.target.value)
                                }}
                                name = "password" 
                                className="py-2 px-4 border-nedoblack border-2 rounded-lg"/>
                            <button className="relative inline-block py-2 px-6 border-2  rounded-xl border-nedoblack text-sm text-nowrap sm:text-xl text-nedowhite bg-no-repeat hover:bg-gradient-to-hover bg-center bg-nedoblack transition-colors duration-300 hover:text-nedoblack hover:animate-fill-center hover:border-nedoblack">
                                Sign In
                            </button>
                            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

                        </form>
                    </div>
                    <div className="right-side w-1/2 justify-center hidden sm:flex">
                        <img src="gifs/signin.gif" className = "w-[40rem]" alt="" />
                    </div>
                </main>
            </AuthLayout>
    );
}