import axios from "axios";

export async function handlerSignUp(email, username, password){
    try{
        const response = await axios.post("http://localhost:8080/user/sign-up", {
            email,
            username,
            password,
        })
        return response

    }catch(error){
        throw error.response?.data?.message || "User already exists";
    }
}

export async function handlerSignIn(username, password){
    try{
        const response = await axios.post("http://localhost:8080/user/sign-in",{
            username,
            password,
        })
        return response
    }catch(error){
        throw "Wrong username or password";
    }
}