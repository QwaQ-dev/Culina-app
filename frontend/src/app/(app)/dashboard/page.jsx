"use client"
import { useEffect, useState } from "react"


import Slider from "@/app/components/Slider/Slider.js"
import Loggedlayout from "../logged-layout.jsx"
import Card from "@/app/components/Card/Card.js"
import Filter from "@/app/components/Filter/Filter.js"
import { getAllCards } from "@/app/api/cards/getCard/getAllCards.js"

import axios from "axios"

const lastComponent = <div className="flex flex-row gap-5">
                        <div className=" border-black rounded-xl p-2 cursor-pointer">
                            <a href="/">
                                <img src="avatars/chef-woman.png" className="w-14" alt="" />
                            </a>
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <h2 className="text-center text-xl">Danil</h2>
                            <p className="text-base font-thin">123 recipes</p>
                        </div>
                    </div> 

const inside = [
    {
        title:"Difficult",
        content:[
            {
                filter:["Ease", "Medium", "Hard"]
            },
        ]
    },
    {
        title:"Meal",
        content:[
            {
                filter:["Soup", "Meat", "Pasta","Cake","Pie",]
            },
        ]
    },
    {
        title:"Time",
        content:[
            {
                filter:["<1 hour", "≈1 hour", ">1 hour",]
            },
        ]
    },
    {
        title:"Dish type",
        content:[
            {
                filter:["Salad", "Dessert", "Soup", "Meat",]
            }
        ]
    }
]

export default function dashboard(){
    const [sort, setSort] = useState(false)
    const [cards, setCards] = useState([])
    useEffect(()=>{
        const fetchData = async() => {
            try{
                const response = await getAllCards();
                console.log(response.data[0].imgs[1])
                setCards(response.data)
            }catch(err){
                console.log(err)
            }


        };

        fetchData()
        console.log(cards)

    },[])
    

    return(
        <Loggedlayout lastcomp={lastComponent}  >
            <div className = "flex mx-auto">
                <Slider />
            </div>
            <div className="flex ">
                <div className="flex flex-col h-full  w-96 m-4">
                    <h2 className="text-3xl text-center p-4">Recipes</h2>

                    <div className=" bg-nedoorange flex flex-col rounded-t-xl w-full ">
                        <p className=" text-xl leading-loose p-4">Filter by:</p>
                        <div className="flex  flex-col gap-4 last:border-b-8 last:border-nedoorange last:rounded-b-lg">
                            {inside.map(({title, content}, key) =>(
                                <Filter title = {title} content = {content} key={key+content.filter + title}/>
                            ))}
                        </div>
                    </div>
                </div>
                <div>
                <div className="w-full max-w-4xl mx-auto">
                    <div className="flex justify-between items-center relative">

                        <input
                            type="text"
                            placeholder="Search for recipes..."
                            className="w-1/2 p-3 pl-10 bg-black text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                        />
                        
                        <button>
                            <svg
                                xmlns="icons/find.svg"
                                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                                width="20" height="20" viewBox="0 0 20 20"
                                fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                            >
                                <circle cx="9" cy="9" r="7"></circle>
                                <path d="M16 16l4 4"></path>
                            </svg>
                        </button>

                        <button className="w-24 ml-4 p-3 bg-black text-white rounded-lg focus:outline-none hover:bg-gray-700" onClick={() =>{setSort(!sort)}}>
                            Sort
                        </button>
                        {sort && (
                            <div className="absolute right-0 top-full mt-2 w-40 bg-white text-black rounded-lg shadow-lg z-10 transition-all duration-300 ease-in-out">
                                <ul className="p-2">
                                    <li className="py-2 px-4 hover:bg-gray-200 cursor-pointer">By Name</li>
                                    <li className="py-2 px-4 hover:bg-gray-200 cursor-pointer">By Date</li>
                                    <li className="py-2 px-4 hover:bg-gray-200 cursor-pointer">By Rating</li>
                                    <li className="py-2 px-4 hover:bg-gray-200 cursor-pointer">By Difficulty</li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>

                    <div className="mx-auto flex flex-row flex-wrap p-9 w-full flex-grow items-start">
                        <div className="flex flex-row flex-wrap gap-10 w-full">
                            {cards.map(({id, imgs, name, diff, author })=>{
                                return <Card key={id} image={imgs[1]} name={name} rate={diff} author={author}/>
                            })}
                            {/* <Card image={"meals/carbonara.png"} name={"Carbonara"} rate={"5"} author={"Rick James"} />
                            <Card image={"meals/carbonara.png"} name={"Carbonara"} rate={"5"} author={"Rick James"} />
                            <Card image={"meals/carbonara.png"} name={"Carbonara"} rate={"5"} author={"Rick James"} />
                            <Card image={"meals/carbonara.png"} name={"Carbonara"} rate={"5"} author={"Rick James"} /> */}
                        </div>
                    </div>
                </div>
            </div>
        </Loggedlayout>
    )
}