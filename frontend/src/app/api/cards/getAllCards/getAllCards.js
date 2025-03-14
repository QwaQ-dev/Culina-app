import axios from "axios"


export async function getAllCards(){
    const response = await axios.get("http://localhost:8080/dashboard/recipes")
    return response

}