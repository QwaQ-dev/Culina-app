"use client"
import Loggedlayout from "../logged-layout";
import { useState } from "react";
import  About  from "@/app/components/profileSideBar/About/About";
import  PaidContent  from "@/app/components/profileSideBar/PaidContent/PaidContent";
import Connection  from "@/app/components/profileSideBar/Connection/Connection";
import  Recipes  from "@/app/components/profileSideBar/Recipes/Recipes";
import  Settings  from "@/app/components/profileSideBar/Settings/Settings";


const lastComponent = <div>
                            <button className="relative inline-block py-2 px-2 sm:py-2 sm:px-6 border-2 rounded-xl border-nedoblack sm:text-2xl 2xl:text-3xl text-nedowhite bg-no-repeat hover:bg-gradient-to-hover bg-center bg-nedoblack transition-colors duration-500 hover:text-nedoblack hover:animate-fill-center hover:border-nedoblack ">
                                Add receipt
                            </button>
                    </div>
                


const tabs = [
    {id: "about", label:"About me"},
    {id:"recipes", label:"Recipes"},
    {id:"connection", label:"Connection"},
    {id:"paid", label:"Paid Content"},
    {id:"settings", label:"Settings"},
]

export default function Profile(){
    const [activeTab, setActiveTab] = useState("about")
    return(
        <Loggedlayout lastcomp={lastComponent}>
            <div className="flex flex-col items-center w-full max-w-3xl min-h-full mx-auto  ">
                <div className="relative w-full h-48 rounded-lg  ">
                    <img
                        className="bg-banner border-black border-2  rounded-xl w-full h-full object-cover -z-10"
                    />
                    
                    <div className="absolute bottom-[-40px] left-4 ">
                        <h2 className="text-center font-semibold text-xl">Cooker</h2>
                        <div className="relative w-32 h-32 z-10 md:w-32 md:h-32 border-4 border-black rounded-full overflow-hidden">
                            <img
                                src="avatars/chef.svg"
                                alt="Profile"
                                className="w-full h-full object-cover "
                            />
                        </div>
                    </div>
                </div>


                
            </div>
            <div className="absolute mx-auto w-full flex  justify-center ">
                        <h2 className="absolute text-center transform -translate-y-[100px] font-extrabold">Good morning. Danil!</h2>
                    </div>

            <div className="flex flex-col items-center w-full max-w-3xl mx-auto ">
                <div className="flex flex-col w-full text-end pr-6 ">
                    <p className="mt-1  text-end">
                        <span className="font-normal">19 Posts</span> | 
                        <span className="font-normal "> 5897 Followers</span>
                    </p>
                </div>
            </div>

        <div className=" mt-20 mb-10 h-0.5 w-full bg-black/60"></div>
        <div className="flex flex-row gap-10  relative overflow-x-hidden">
            <div className="w-60 ps-10">
                <ul className="space-y-4">
                    {tabs.map((tab) => (
                        <li key={tab.id}>
                            <button
                                onClick={() => setActiveTab(tab.id)}
                                className={`block w-full text-left p-2 transition ease-in duration-200 ${
                                    activeTab === tab.id ? "bg-nedoorange font-bold shadow-[rgba(0,0,13,0.3)_0px_2px_2px_0px]" : ""
                                }`}
                            >
                                {tab.label}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="w-full h-full overflow-hidden">
                {activeTab === "about" && <About />}
                {activeTab === "recipes" && <Recipes />}
                {activeTab === "connection" && <Connection />}
                {activeTab === "paid" && <PaidContent />}
                {activeTab === "settings" && <Settings />}
            </div>
            
        </div>

        </Loggedlayout>
    )
}