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
                <div className="flex w-1/3 flex-col gap-4 leading-loose">
                    {tabs.map((tab)=>(
                        <div key={tab.id} onClick={()=>setActiveTab(tab.id)} className={`block w-full text-left p-2 rounded-lg transition ease-in duration-200 border-2 border-black/10 ${activeTab === tab.id ? "bg-banner  font-bold shadow-[rgba(0,0,13,0.3)_0px_2px_2px_0px]" :""}`}>{tab.label}</div>
                    ))}
                </div>
                <div className="flex ">
                    <div className="flex items-center flex-col">
                        <h2 className="text-center text-2xl">Information</h2>
                        {activeTab === "username" && <ChangeUsername/>}
                        {activeTab === "password" && <ChangePassword/>}
                    </div>
                    <img src="gifs/plate.gif" className=" h-full  transform -translate-y-1/4 translate-x-1/4" alt="Plate" />
                </div>
            </div>

        </div>


    )
}