"use client"
import { getAllCards } from "@/app/api/cards/getAllCards/getAllCards"
import { useState, useEffect } from "react"
import Card from "../../Card/Card"


export default function Recipes(){
    const [recipes, setRecipes] = useState([])
    const [error, setError] = useState(null)

    useEffect(()=>{
        const fetchData = async () =>{
            try{
                const response = await getAllCards()
                setRecipes(response.data)
            }catch(err){
                setError(err)
                console.log(err)
                
            }


        }
        fetchData()

    },[])
    return(
        <div>
            <h1 className="font-bold text-center text-xl">Here's your recipes</h1>
            <div className = "flex  flex-wrap gap-10  justify-center  w-full overflow-hidden mt-10">
                {recipes.map(({id, imgs, name, diff, author })=>{
                    return <Card key={id} image={imgs[1]} name={name} rate={diff} author={author}/>
                })}
            </div>
        </div>
    )
}