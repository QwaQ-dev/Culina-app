import Loggedlayout from "../logged-layout.js"



const lastComponent = <div className="flex flex-row gap-5">
                        <div className="border-2 border-black rounded-xl p-2 cursor-pointer">
<<<<<<< HEAD
                            <a href="#">
=======
                            <a href="/">
>>>>>>> main
                                <img src="avatars/chef-woman.png" className="w-14" alt="" />
                            </a>
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <h2 className="text-center text-xl">Danil</h2>
                            <p className="text-base font-thin">123 recipes</p>
                        </div>
                    </div> 

export default function dashboard(){

    return(
        <Loggedlayout lastcomp={lastComponent}>
            <h1>123</h1>
        </Loggedlayout>
    )
}