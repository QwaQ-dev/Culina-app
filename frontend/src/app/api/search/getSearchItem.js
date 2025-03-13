import axios from "axios";

export async function getSearchItem(item){
    try{
        const response = await axios.get(`http://localhost:8080/dashboard/search-receipts/${item}`)
        return response
    }catch(err){
        console.log(err)
    }
}