import axios from "axios"




export async function getSingleCard(id){
    try{
        const response = await axios.get(`http://localhost:8080/dashboard/recipe/${id}`)
        return response
    }catch(err){
        throw "Error while getting single card"
    }

}