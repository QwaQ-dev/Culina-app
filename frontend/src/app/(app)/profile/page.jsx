import Loggedlayout from "../logged-layout";

const lastComponent = <div>
                            <button className="relative inline-block py-2 px-2 sm:py-2 sm:px-6 border-2 rounded-xl border-nedoblack sm:text-2xl 2xl:text-3xl text-nedowhite bg-no-repeat hover:bg-gradient-to-hover bg-center bg-nedoblack transition-colors duration-500 hover:text-nedoblack hover:animate-fill-center hover:border-nedoblack ">
                                Add receipt
                            </button>
                    </div>

export default function Profile(){
    return(
        <Loggedlayout lastcomp={lastComponent} isFixed={true}>
            <div className="relative bg-banner h-80 w-2/3 mx-auto rounded-xl flex flex-row border-black border-2">
                <div className="absolute bottom-0 left-4 translate-y-1/2">
                    <img
                        src="avatars/chef.png"
                        alt="Avatar"
                        className="rounded-full w-30 h-30   border-4 border-black"
                    />
                </div>
                <div><h1>2</h1></div>
            </div>



        </Loggedlayout>
    )
}