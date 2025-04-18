"use client"
import AuthLayout from "../auth-layout";
import { getCookie, handlerSignUp, setCookie } from "@/app/api/auth/signup";
import { Montserrat } from "next/font/google";
import { use, useState } from "react";
import { useRouter } from "next/navigation";


const montserrat = Montserrat({
    subsets: ['latin'],
  });

const lastComponent = <a href={"/sign-in"}>
                        <button className="relative inline-block py-2 px-2 sm:py-2 sm:px-6 border-2 rounded-xl border-nedoblack sm:text-2xl 2xl:text-3xl text-nedowhite bg-no-repeat hover:bg-gradient-to-hover bg-center bg-nedoblack transition-colors duration-500 hover:text-nedoblack hover:animate-fill-center hover:border-nedoblack ">
                            Sign In
                        </button>
                      </a>

export default function SignUp() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null)


    const router = useRouter();
    
    
    async function handleSubmit(e) {
        e.preventDefault();
        setError(null)

        try {
            if(!email || !name || !password){
                setError("All fields should be filled")
            }
            const response = await handlerSignUp(email, name, password);
            console.log(response);
            if(response.message == "Success!"){
                router.push("/dashboard");

            }else{
                setError(response.message);
            }
        } catch (error) {
            setError(error.message || "User already exists")
            console.log(error)
        }
    }
    
    return (
        <AuthLayout lastcomp={lastComponent} className="font-montserrat" isFixed={true}>
           <main className = "flex flex-row justify-center  items-center mx-auto sm:px-16 ">
                <div className="left-side hidden sm:flex w-1/2 flex-justify-center items-center">
                    <img src="gifs/signup.gif" className = "w-[50rem]" alt="" />
                </div>
                <div className="ride-side sm:w-1/2 mt-24 ">
                    <h2 className="text-center text-2xl sm:text-5xl text-nowrap font-bold">Sign Up</h2>
                    <form className="flex flex-col text-xs sm:text-xl items-center gap-5 mt-10"
                        onSubmit={handleSubmit}
                    >
                        <input 
                            type="text" 
                            value = {email} 
                            onChange={(e)=>{setEmail(e.target.value)}} 
                            placeholder="E-mail" 
                            name="email"  
                            className="py-2 px-4 border-nedoblack border-2 rounded-lg" required/>
                        <input
                            type="text" 
                            value = {name} 
                            onChange={(e) =>{setName(e.target.value)}} 
                            placeholder="Username" 
                            name="name"  
                            className="py-2 px-4 border-nedoblack border-2 rounded-lg" required/>
                        <input 
                            type="password" 
                            value = {password}
                            onChange={(e) =>{setPassword(e.target.value)}}
                            placeholder="Password" 
                            name = "password" 
                            className="py-2 px-4 border-nedoblack border-2 rounded-lg" required/>
                        <button className="relative inline-block py-2 px-6 border-2  rounded-xl border-nedoblack text-nowrap text-xl text-nedowhite bg-no-repeat hover:bg-gradient-to-hover bg-center bg-nedoblack transition-colors duration-300 hover:text-nedoblack hover:animate-fill-center hover:border-nedoblack">
                            Join Us
                        </button>
                        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                    </form>
                </div>
                    
            </main>
        </AuthLayout>
    );
}