"use client"

import AuthLayout from "./auth-layout"
import WelcomePageCard from "../components/WelcomePageCard/WelcomePageCard";
import { Montserrat } from "next/font/google";
import { Recursive } from "next/font/google";
import { useRouter } from "next/navigation";


const montserrat = Montserrat({
  subsets: ['latin'],
});
const recursive = Recursive({
    subsets:['latin'],
    variable:"--font-recursive",
});
const cardData = {
    1:{
        id: 1,
        name:"Basic",
        auditory:"Ideal for those who want to try our product",
        price: "Free"
    },
    2:{
        id:2,
        name:"Cooker",
        auditory:"Ideal for those who want to try our product",
        price: "25$"
    },
    3:{
        id: 3,
        name:"Chef",
        auditory:"Ideal for those who want to try our product",
        price: "100$"
    }
};
{Object.entries(cardData).map((data) =>{
    console.log(data)
})}

const lastcomponent = <a href={"/sign-up"}>
                        <button className="relative py-2 px-2 sm:py-2 sm:px-6 border-2 rounded-xl border-nedoblack text-xl text-nowrap text-nedowhite bg-no-repeat hover:bg-gradient-to-hover bg-center bg-nedoblack transition-colors duration-500 hover:text-nedoblack hover:animate-fill-center hover:border-nedoblack ">
                            Get Started
                        </button>
                      </a>

export default function WelcomePage() {
    const router = useRouter()
    return(
        <AuthLayout lastcomp={lastcomponent} className="font-montserrat fixed container-fluid flex flex-col">
            <div className="top-main flex  flex-col justify-center items-center gap-10 my-36" id="About">
                <div className="upper">
                    <h2 className="text-xl lg:text-5xl  2xl:text-7xl font-semibold tracking-widest subpixel-antialiased ">Try.Learn.Repeat.</h2>
                </div>
                <div className="middle px-4 ">
                    <h2 className="font-recursive text-xl  2xl:text-3xl text-center ">Culina is a brand-new website tutor, which can open you the world of cooking</h2>
                </div>
                <div className="bottom">
                    <button onClick={()=>{router.push("/sign-up")}} className="relative inline-block py-2 px-6 2xl:p-4 2xl:px-12 border-2 rounded-sm border-nedoblack text-2xl  2xl:text-3xl text-nedowhite bg-no-repeat hover:bg-gradient-to-hover bg-center bg-nedoblack transition-colors duration-500 hover:text-nedoblack hover:animate-fill-center hover:border-nedoblack">
                        Explore
                    </button>
                </div>
            </div>
            <div className="md:hidden mx-auto p-4"><img src="/illustr/main.png" className="w-[15rem] " alt="" /></div>
            <div className="main container-fluid mx-auto">
                <div className="container-fluid flex gap-32 ">
                    <div className="text-center md:text-left flex items-center w-1/4">
                        <h2 className="text-2xl sm:text-2xl md:text-4xl  font-bold subpixel-antialiased ">
                        Become <br /> cooking <br /> magician
                        </h2>
                    </div>
                    <div className="hidden md:flex flex-shrink-0">
                        <img src="/illustr/main.png" className="w-[20rem] lg:w-[30rem] 2xl:w-[30rem]" alt="" />
                    </div>
                    <div className="text-center font-medium lg:text-2xl my-auto flex items-center flex-col w-1/4">
                        <div>
                            <p>
                                50 <br /> current users
                            </p>
                        </div>
                        <div className="h-1 w-full bg-black my-4"></div>
                        <div>
                            <p>
                                210 <br /> recipes for all need
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row justify-between items-center mx-auto gap-10 my-24 mt-48 p-6" id = "Pricing">
                {Object.entries(cardData).map((data) =>(
                     <WelcomePageCard key = {data[1].id} name={data[1].name} auditory = {data[1].auditory} price = {data[1].price}/>
                ))}
            </div>
        </AuthLayout>
    );
};