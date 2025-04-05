"use client"
import { useState } from "react"
import ChangeUsername from "./ChangeUsername/ChangeUsername"
import ChangePassword from "./ChangePassword/ChangePassword"



const tabs=[
    {id:"username", label:"Change username"},
    {id:"password", label:"Change password"},
]
export default function About(){
    const [activeTab, setActiveTab] = useState("username")
    return(
        <div className="w-full">

            <div className="flex flex-row gap-10">
                <div className="flex w-1/5 flex-col gap-4 leading-loose">
                    {tabs.map((tab)=>(
                        <div key={tab.id} onClick={()=>setActiveTab(tab.id)} className={` w-full text-left p-2 rounded-lg transition ease-in duration-200 border-2 border-black/10 ${activeTab === tab.id ? "bg-banner  font-semibold text-nowrap shadow-[rgba(0,0,13,0.3)_0px_2px_2px_0px]" :""}`}>{tab.label}</div>
                    ))}
                </div>
                <div className="flex overflow-hidden relative w-full">
                    <div className="flex items-center flex-col w-3/5">
                        <h2 className="text-center text-2xl">Information</h2>
                        {activeTab === "username" && <ChangeUsername />}
                        {activeTab === "password" && <ChangePassword />}
                    </div>
                    <img 
                        src="gifs/signin.gif" 
                        alt="Plate" 
                        className="w-96"
                    />
                </div>


            </div>

        </div>


    )
}