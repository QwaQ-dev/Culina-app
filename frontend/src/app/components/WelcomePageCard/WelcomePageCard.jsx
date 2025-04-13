export default function WelcomePageCard({name, auditory,price}){
    return(
        <div className="card flex flex-col bg-nedoorange rounded-3xl p-5 gap-8 shadow-lg w-[33%]" >
            <div className="">
                <p className="text-xl 2xl:text-3xl bg-black inline-block p-4 rounded-xl text-nedowhite">{name}</p>
            </div>
            <div>
                <p className="font-medium text-xl">{auditory}</p>
            </div>
            <div>
                <h2 className="text-center text-xl 2xl:text-3xl uppercase font-bold">{price}</h2>
            </div>
            <div>
                <ul className="gap-10 flex flex-col text-md">
                    <li className="flex flex-row "><img src="/icons/cards.svg" alt="" className="w-5 2xl:w-10 mr-2"/> Lorem ipsum dolor sit amet consectetur.</li>
                    <li className="flex flex-row "><img src="/icons/cards.svg" alt="" className="w-5 2xl:w-10 mr-2"/> Lorem ipsum dolor sit amet consectetur.</li>
                    <li className="flex flex-row "><img src="/icons/cards.svg" alt="" className="w-5 2xl:w-10 mr-2"/> Lorem ipsum dolor sit amet consectetur.</li>
                </ul>
            </div>
            <div className="mx-auto">
                <button className="relative inline-block py-2 px-6 border-2 rounded-xl border-nedoblack text-2xl 2xl:text-3xl text-nedowhite bg-no-repeat hover:bg-gradient-to-hover bg-center bg-nedoblack transition-colors duration-500 hover:text-nedoblack hover:animate-fill-center hover:border-nedoblack">
                    <a href="/sign-up">
                        Try
                    </a>
                </button>
            </div>
        </div>
    );
}