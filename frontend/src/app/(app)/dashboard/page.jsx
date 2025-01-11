"use client"
import { useEffect, useState } from "react"


import Slider from "@/app/components/Slider/Slider.js"
import Loggedlayout from "../logged-layout.jsx"
import Card from "@/app/components/Card/Card.jsx"
import Filter from "@/app/components/Filter/Filter.jsx"
import { getAllCards } from "@/app/api/cards/getCard/getAllCards.js"
import { FaSearch } from "react-icons/fa";





import axios from "axios"
import SearchCard from "@/app/components/Search/SearchCard/SearchCard.jsx"
import { getSearchItem } from "@/app/api/search/getSearchItem.js"

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
    const [searchValue, setSearchValue] = useState("")
    const [searchResult, setSearchResult] = useState([])
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
        const searchData = async() =>{
            try{
                const response = await getSearchItem(searchValue);
                setSearchResult(response)

            }catch(err){
                console.log("err:", err)
            }
            
        }


        fetchData()
        searchData()
        console.log(cards)

    },[])
    const handleChange = (e) =>{
        setSearchValue(e.target.value)
    }

    return(
        <Loggedlayout lastcomp={lastComponent}  >
            <div className = "flex mx-auto">
                <Slider />
            </div>
            <div className="flex ">
                <div className="flex flex-col h-full  w-20 md:w-40 lg:w-64 m-4">
                    <h2 className="text-base lg:text-3xl text-center pb-4">Recipes</h2>

                    <div className=" bg-nedoorange flex flex-col rounded-t-xl w-full ">
                        <p className=" text-md lg:text-xl lg:leading-loose p-4">Filter by:</p>
                        <div className="flex flex-col gap-4 last:border-b-8 last:border-nedoorange last:rounded-b-lg">
                            {inside.map(({title, content}, key) =>(
                                <Filter title = {title} content = {content} key={key+content.filter + title}/>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="w-full">
                    <div className="w-full lg:max-w-4xl mx-auto">
                        <div className="flex justify-between gap-10 ps-36 items-center relative pt-3 px-3  lg:py-3">

                            <div className="flex flex-row items-center p-2   rounded-lg w-2/3 justify-center bg-black px-4">
                                <FaSearch className="text-white  " />
                                <input
                                    type="text"
                                    placeholder="Search for recipes..."
                                    value={searchValue}
                                    onChange={handleChange}
                                    className="text-sm w-full p-4 bg-black text-white focus:outline-none"
                                />
                            </div>

                            {/* Кнопка сортировки */}
                            <button
                                className="hidden md:flex p-2 lg:ml-4 lg:p-3  rounded-lg bg-black text-white focus:outline-none hover:bg-gray-700"
                                onClick={() => setSort(!sort)}
                            >
                                Sort
                            </button>

                            {/* Выпадающее меню сортировки */}
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

                        {/* Результаты поиска */}
                        <div className="w-2/3 p-2 mx-auto ps-36 z-10 absolute flex flex-col gap-4">
                            {searchResult.map(({ imgs, name, diff, author, id }) => {
                                return (
                                <div key={id} className="div">
                                    <SearchCard img={imgs[0]} name={name} rating={diff} author={author} />
                                </div>
                                );
                            })}
                            </div>
                        </div>
                </div>
                <div>

                    <div className="mx-auto flex flex-row flex-wrap p-4 lg:p-9 w-full flex-grow items-start">
                        <div className="flex flex-row flex-wrap w-full overflow-scroll justify-center  items-center mx-auto">
                            <div className = "flex  flex-wrap gap-10 md:gap-20  xl:gap-20  justify-center  w-full">
                                {cards.map(({id, imgs, name, diff, author })=>{
                                    return <Card key={id} image={imgs[1]} name={name} rate={diff} author={author}/>
                                })}
                            </div>
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