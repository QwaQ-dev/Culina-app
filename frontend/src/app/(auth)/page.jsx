import AuthLayout from "./auth-layout"
import { Montserrat } from "next/font/google";
import { Recursive } from "next/font/google";

const montserrat = Montserrat({
  subsets: ['latin'],
});
const recursive = Recursive({
    subsets:['latin'],
    variable:"--font-recursive",
});

const lastcomponent = <a href={"/sign-up"}>
                        <button className="relative inline-block py-2 px-2 sm:py-2 sm:px-6 border-2 rounded-xl border-nedoblack sm:text-2xl 2xl:text-3xl text-nedowhite bg-no-repeat hover:bg-gradient-to-hover bg-center bg-nedoblack transition-colors duration-500 hover:text-nedoblack hover:animate-fill-center hover:border-nedoblack ">
                            Get Started
                        </button>
                      </a>

export default function WelcomePage() {
    return(
        <AuthLayout lastcomp={lastcomponent} className="font-montserrat fixed">
            <div className="top-main flex  flex-col justify-center items-center gap-10 my-36">
                <div className="upper">
                    <h2 className="text-xl lg:text-5xl  2xl:text-7xl font-semibold tracking-widest subpixel-antialiased ">Try.Learn.Repeat.</h2>
                </div>
                <div className="middle px-4">
                    <h2 className="font-recursive text-xl lg:text-3xl 2xl:text-5xl text-center ">Culina is a brand-new website tutor, which can open you the world of cooking</h2>
                </div>
                <div className="bottom">
                    <button className="relative inline-block py-2 px-6 2xl:p-4 2xl:px-12 border-2 rounded-sm border-nedoblack text-2xl lg:text-4xl 2xl:text-5xl text-nedowhite bg-no-repeat hover:bg-gradient-to-hover bg-center bg-nedoblack transition-colors duration-500 hover:text-nedoblack hover:animate-fill-center hover:border-nedoblack">
                        Explore
                    </button>
                </div>
            </div>
            <div className="md:hidden mx-auto p-4"><img src="/illustr/main.png" className="w-[15rem] " alt="" /></div>
            <div className="main flex justify-center items-center gap-10 my-10 mx-auto w-full">
                <div className="text-center md:text-left">
                    <h2 className="text-2xl sm:text-2xl md:text-4xl 2xl:text-7xl font-bold subpixel-antialiased  mr-10">
                    Become <br /> cooking <br /> magician
                    </h2>
                </div>
                <div className="hidden md:block flex-shrink-0">
                    <img src="/illustr/main.png" className="w-[20rem] lg:w-[30rem] 2xl:w-[40rem]" alt="" />
                </div>
                <div className="text-center font-medium lg:text-2xl 2xl:text-5xl">
                    <div>
                    <p>
                        50 <br /> current users
                    </p>
                    </div>
                    <div className="h-1 w-full bg-black my-4"></div>
                    <div>
                    <p>
                        210 <br /> recipes for all need
                    </p>
                    </div>
                </div>
                </div>

            <div className="flex flex-col lg:flex-row justify-between items-center mx-auto gap-10 my-10 p-6">
                <div className="card flex flex-col bg-nedoorange rounded-3xl p-5 gap-5 shadow-lg">
                    <div className="">
                        <p className="text-xl 2xl:text-5xl bg-black inline-block p-4 rounded-xl text-nedowhite">Basic</p>
                    </div>
                    <div>
                        <p className="font-medium 2xl:text-3xl">Ideal for those who want to try our product</p>
                    </div>
                    <div>
                        <h2 className="text-center text-xl 2xl:text-5xl uppercase font-bold">Free</h2>
                    </div>
                    <div>
                        <ul className="gap-10 flex flex-col text-sm 2xl:text-3xl">
                            <li className="flex flex-row "><img src="/icons/cards.svg" alt="" className="w-5 2xl:w-10 mr-2"/> Lorem ipsum dolor sit amet consectetur.</li>
                            <li className="flex flex-row "><img src="/icons/cards.svg" alt="" className="w-5 2xl:w-10 mr-2"/> Lorem ipsum dolor sit amet consectetur.</li>
                            <li className="flex flex-row "><img src="/icons/cards.svg" alt="" className="w-5 2xl:w-10 mr-2"/> Lorem ipsum dolor sit amet consectetur.</li>
                        </ul>
                    </div>
                    <div className="mx-auto">
                        <button className="relative inline-block py-2 px-6 border-2 rounded-xl border-nedoblack text-2xl 2xl:text-5xl text-nedowhite bg-no-repeat hover:bg-gradient-to-hover bg-center bg-nedoblack transition-colors duration-500 hover:text-nedoblack hover:animate-fill-center hover:border-nedoblack">
                            <a href="/sign-up">
                                Try
                            </a>
                        </button>
                    </div>
                </div>
                
                <div className="card flex flex-col bg-nedoorange rounded-3xl p-5 gap-5 shadow-lg">
                    <div className="">
                        <p className="text-xl 2xl:text-5xl bg-black inline-block p-4 rounded-xl text-nedowhite">Cooker</p>
                    </div>
                    <div>
                        <p className="font-medium 2xl:text-3xl">Ideal for those who want to try our product</p>
                    </div>
                    <div>
                        <h2 className="text-center text-xl 2xl:text-5xl uppercase font-bold">25$/month</h2>
                    </div>
                    <div>
                        <ul className="gap-10 flex flex-col text-sm  2xl:text-3xl">
                            <li className="flex flex-row"><img src="/icons/cards.svg" alt="" className="w-5 2xl:w-10 mr-2"/> Lorem ipsum dolor sit amet consectetur.</li>
                            <li className="flex flex-row"><img src="/icons/cards.svg" alt="" className="w-5 2xl:w-10 mr-2"/> Lorem ipsum dolor sit amet consectetur.</li>
                            <li className="flex flex-row"><img src="/icons/cards.svg" alt="" className="w-5 2xl:w-10 mr-2"/> Lorem ipsum dolor sit amet consectetur.</li>
                        </ul>
                    </div>
                    <div className="mx-auto">
                        <button className="relative inline-block py-2 px-6 border-2 rounded-xl border-nedoblack text-xl 2xl:text-5xl text-nedowhite bg-no-repeat hover:bg-gradient-to-hover bg-center bg-nedoblack transition-colors duration-500 hover:text-nedoblack hover:animate-fill-center hover:border-nedoblack">
                            <a href="/sign-up">
                                Try
                            </a>
                        </button>
                    </div>
                </div>

                <div className="card flex flex-col bg-nedoorange rounded-3xl p-5 gap-5 shadow-lg">
                    <div className="">
                        <p className="text-xl 2xl:text-5xl bg-black inline-block p-4 rounded-xl text-nedowhite">Chef</p>
                    </div>
                    <div>
                        <p className="font-medium 2xl:text-3xl">Ideal for those who want to try our product</p>
                    </div>
                    <div>
                        <h2 className="text-center text-xl 2xl:text-5xl uppercase font-bold">100$/month</h2>
                    </div>
                    <div>
                        <ul className="gap-10 flex flex-col text-sm 2xl:text-3xl">
                            <li className="flex flex-row"><img src="/icons/cards.svg" alt="" className="w-5 2xl:w-10 mr-2"/> Lorem ipsum dolor sit amet consectetur.</li>
                            <li className="flex flex-row"><img src="/icons/cards.svg" alt="" className="w-5 2xl:w-10 mr-2"/> Lorem ipsum dolor sit amet consectetur.</li>
                            <li className="flex flex-row "><img src="/icons/cards.svg" alt="" className="w-5 2xl:w-10 mr-2"/> Lorem ipsum dolor sit amet consectetur.</li>
                        </ul>
                    </div>
                    <div className="mx-auto">
                        <button className="relative inline-block py-2 px-6 border-2 rounded-xl border-nedoblack text-xl 2xl:text-5xl text-nedowhite bg-no-repeat hover:bg-gradient-to-hover bg-center bg-nedoblack transition-colors duration-500 hover:text-nedoblack hover:animate-fill-center hover:border-nedoblack">
                            <a href="/sign-up">
                                Try
                            </a>
                        </button>
                    </div>
                </div>
            </div>
        </AuthLayout>
    );
};