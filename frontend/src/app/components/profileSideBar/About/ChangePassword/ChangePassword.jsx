export default function ChangePassword(){
    return(
        <div className="mt-10 mx-auto">

            <form action="" className="flex flex-col gap-4 ">
                <input type="text" placeholder="Old password" className="bg-white border-2 border-black/20 rounded-lg text-black p-4" required/>
                <input type="text" placeholder="New password" className="bg-white border-2 border-black/20 rounded-lg text-black p-4" required/>
                <button className="relative inline-block py-2 px-2 sm:py-2 sm:px-6 border-2 rounded-xl border-nedoblack sm:text-2xl 2xl:text-3xl text-nedowhite bg-no-repeat hover:bg-gradient-to-hover bg-center bg-nedoblack transition-colors duration-500 hover:text-nedoblack hover:animate-fill-center hover:border-nedoblack ">
                    Save
                </button>
            </form>
        </div>
    )
}