import Loggedlayout from "../logged-layout";

const lastComponent = <div>
                            <button className="relative inline-block py-2 px-2 sm:py-2 sm:px-6 border-2 rounded-xl border-nedoblack sm:text-2xl 2xl:text-3xl text-nedowhite bg-no-repeat hover:bg-gradient-to-hover bg-center bg-nedoblack transition-colors duration-500 hover:text-nedoblack hover:animate-fill-center hover:border-nedoblack ">
                                Add receipt
                            </button>
                    </div>

export default function Profile(){
    return(
        <Loggedlayout lastcomp={lastComponent} isFixed={true}>
            <div className="flex flex-col items-center w-full max-w-3xl mx-auto p-4">
                <div className="relative w-full h-48 rounded-lg overflow-hidden ">
                    <img
                        className="bg-banner w-full h-full object-cover -z-10"
                    />
                    <div className="absolute bottom-[-40px] left-4">
                        <div className="relative w-32 h-32 z-10 md:w-32 md:h-32 border-4 border-white rounded-full overflow-hidden">
                            <img
                                src="avatars/chef.png"
                                alt="Profile"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute bottom-1 right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                                <img src="avatars/chef.png" alt="" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-16 flex flex-col items-center">
                    <h2 className="text-lg font-bold">Danil</h2>
                    <p className="mt-1 text-gray-500">
                        <span className="font-bold text-black">5897</span> Followers
                    </p>
                </div>
            </div>


        </Loggedlayout>
    )
}