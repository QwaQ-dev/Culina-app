import axios from "axios"


export async function getAllCards(){
    const response = await axios.get("http://localhost:8080/api/v1/dashboard/receipts")
    return response

}