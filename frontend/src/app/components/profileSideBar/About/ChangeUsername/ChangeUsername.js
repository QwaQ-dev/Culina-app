export default function ChangeUsername(){
    return(
        <div className="mt-10 mx-auto">

            <form action="" className="flex flex-col gap-10 ">
                <input type="text" placeholder="Old username" className="bg-white text-black p-4" />
                <input type="text" placeholder="New username" className="bg-white text-black p-4" />
                <input type="text" placeholder="Passowrd" className="bg-white text-black p-4"/>

                <button className="relative inline-block py-2 px-2 sm:py-2 sm:px-6 border-2 rounded-xl border-nedoblack sm:text-2xl 2xl:text-3xl text-nedowhite bg-no-repeat hover:bg-gradient-to-hover bg-center bg-nedoblack transition-colors duration-500 hover:text-nedoblack hover:animate-fill-center hover:border-nedoblack ">
                    Save
                </button>
            </form>
        </div>
    )
}