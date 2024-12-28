import Loggedlayout from "../logged-layout";

const lastComponent = <div>
                            <button className="relative inline-block py-2 px-2 sm:py-2 sm:px-6 border-2 rounded-xl border-nedoblack sm:text-2xl 2xl:text-3xl text-nedowhite bg-no-repeat hover:bg-gradient-to-hover bg-center bg-nedoblack transition-colors duration-500 hover:text-nedoblack hover:animate-fill-center hover:border-nedoblack ">
                                Add receipt
                            </button>
                    </div>

export default function Profile(){
    return(
        <Loggedlayout lastcomp={lastComponent} isFixed={true}>
           <div className="bg-banner max-w-screen-lg mx-auto rounded-xl p-12">
                <div className="flex flex-col items-center mx-auto w-full">
                    <div className="flex w-full  "> 
                        <div className="flex flex-col justify-center items-center px-6 py-2 text-center font-bold rounded-xl text-sm">
                            <span>Cooker</span>
                            <img src="avatars/chef.png" alt="Chef avatar" className="mt-2" /> {/* Добавлено alt и отступ */}
                        </div>
                        <div className="text-xl  text-center">
                            <span>Good morning.<br/> Danil</span> 
                        </div>
                    </div>
                    <div className="w-full mt-4 justify-end"> 
                        <div className="flex flex-row font-light leading-loose text-xl  justify-end">
                            <span>19 Posts </span>
                            <span> </span>
                            <span> | </span>
                            <span> </span>
                            <span> 300 Followers</span>
                        </div>

                    </div>
                </div>
            </div>
        </Loggedlayout>
    )
}