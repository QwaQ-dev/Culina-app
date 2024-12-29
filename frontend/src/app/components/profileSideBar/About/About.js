"use client"
import { useState } from "react"
import ChangeUsername from "./ChangeUsername/ChangeUsername"
import ChangePassword from "./ChangePassword/ChangePassword"



const tabs=[
    {id:"username", label:"Change username"},
    {id:"password", label:"Change password"},
]
export default function About(){
    const [activeTab, setActiveTab] = useState("")
    return(
        <div className=" w-full">

            <div className="flex flex-row gap-10">
                <div className="flex flex-col gap-4 leading-loose">
                    {tabs.map((tab)=>(
                        <div key={tab.id} onClick={()=>setActiveTab(tab.id)} className={`block w-full text-left p-2 rounded-lg transition ease-in duration-200 ${activeTab === tab.id ? "bg-banner  font-bold shadow-[rgba(0,0,13,0.3)_0px_2px_2px_0px]" :""}`}>{tab.label}</div>
                    ))}
                </div>
                <div className="mx-auto">
                    <h2 className="text-center text-2xl">Information</h2>
                    {activeTab === "username" && <ChangeUsername/>}
                    {activeTab === "password" && <ChangePassword/>}
                </div>

            </div>
        </div>
    )
}