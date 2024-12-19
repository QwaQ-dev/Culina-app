import axios from "axios";

export async function handlerSignUp(e_mail, username, password){
    try{
        const response = await axios.post("http://localhost:8080/sign-up", {
            e_mail,
            username,
            password,
        })
        return response

    }catch(error){
        return null
    }
}

export async function handlerSignIn(username, password){
    try{
        axios.post("http://localhost:8080/sign-up", {
            username,
            password,
        })
    }catch(error){
        console.error(error)
    }
}