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

export default function WelcomePage() {
    return(
        <AuthLayout lastcomp={"Get Started"} where="/sign-up" className="font-montserrat fixed">
            <div className="top-main flex flex-col justify-center items-center gap-10 mt-10">
                <div className="upper">
                    <h2 className="text-7xl font-semibold tracking-widest ">Try.Learn.Repeat.</h2>
                </div>
                <div className="middle">
                    <h2 className="font-recursive text-2xl ">Culina is a brand-new website tutor, which can open you the world of cooking</h2>
                </div>
                <div className="bottom">
                    <button className="relative inline-block py-2 px-6 border-2 rounded-sm border-nedoblack text-2xl text-nedowhite bg-no-repeat hover:bg-gradient-to-hover bg-center bg-nedoblack transition-colors duration-500 hover:text-nedoblack hover:animate-fill-center hover:border-nedoblack">
                        Explore
                    </button>
                </div>
            </div>
            <div className="main flex justify-center items-center gap-10 h-screen">
                <div>
                    <h2 className="text-6xl leading-normal font-normal">Become <br/>cooking <br/>magician</h2>
                </div>
                <div><img src="/illustr/main.png" className="w-[25rem]" alt="" /></div>
                <div className="text-center ms-10 font-medium ">
                    <div className="">
                        <p>
                            50 <br/> current users
                        </p>
                    </div>
                    <div className="h-1 w-40 bg-black"></div>
                    <div>
                        <p>
                            210 <br/> recipes for all need
                        </p>
                    </div>
                </div>
            </div>
            <div className="flex justify-between items-center mx-auto gap-10 my-10">
                <div className="card flex flex-col bg-nedoorange rounded-3xl p-5 gap-5 shadow-lg">
                    <div className="">
                        <p className="text-3xl bg-black inline-block p-4 rounded-xl text-nedowhite">Basic</p>
                    </div>
                    <div>
                        <p className="font-medium">Ideal for those who want to try our product</p>
                    </div>
                    <div>
                        <h2 className="text-center text-3xl uppercase font-bold">Free</h2>
                    </div>
                    <div>
                        <ul className="gap-10 flex flex-col">
                            <li className="flex flex-row text-sm "><img src="/icons/cards.svg" alt="" className="w-5 mr-2"/> Lorem ipsum dolor sit amet consectetur.</li>
                            <li className="flex flex-row text-sm "><img src="/icons/cards.svg" alt="" className="w-5 mr-2"/> Lorem ipsum dolor sit amet consectetur.</li>
                            <li className="flex flex-row text-sm "><img src="/icons/cards.svg" alt="" className="w-5 mr-2"/> Lorem ipsum dolor sit amet consectetur.</li>
                        </ul>
                    </div>
                    <div className="mx-auto">
                        <button className="relative inline-block py-2 px-6 border-2 rounded-xl border-nedoblack text-2xl text-nedowhite bg-no-repeat hover:bg-gradient-to-hover bg-center bg-nedoblack transition-colors duration-500 hover:text-nedoblack hover:animate-fill-center hover:border-nedoblack">
                            <a href="/sign-up">
                                Try
                            </a>
                        </button>
                    </div>
                </div>
                
                <div className="card flex flex-col bg-nedoorange rounded-3xl p-5 gap-5 shadow-lg">
                    <div className="">
                        <p className="text-3xl bg-black inline-block p-4 rounded-xl text-nedowhite">Cooker</p>
                    </div>
                    <div>
                        <p className="font-medium">Ideal for those who want to try our product</p>
                    </div>
                    <div>
                        <h2 className="text-center text-3xl uppercase font-bold">25$/month</h2>
                    </div>
                    <div>
                        <ul className="gap-10 flex flex-col">
                            <li className="flex flex-row text-sm "><img src="/icons/cards.svg" alt="" className="w-5 mr-2"/> Lorem ipsum dolor sit amet consectetur.</li>
                            <li className="flex flex-row text-sm "><img src="/icons/cards.svg" alt="" className="w-5 mr-2"/> Lorem ipsum dolor sit amet consectetur.</li>
                            <li className="flex flex-row text-sm "><img src="/icons/cards.svg" alt="" className="w-5 mr-2"/> Lorem ipsum dolor sit amet consectetur.</li>
                        </ul>
                    </div>
                    <div className="mx-auto">
                        <button className="relative inline-block py-2 px-6 border-2 rounded-xl border-nedoblack text-2xl text-nedowhite bg-no-repeat hover:bg-gradient-to-hover bg-center bg-nedoblack transition-colors duration-500 hover:text-nedoblack hover:animate-fill-center hover:border-nedoblack">
                            <a href="/sign-up">
                                Try
                            </a>
                        </button>
                    </div>
                </div>

                <div className="card flex flex-col bg-nedoorange rounded-3xl p-5 gap-5 shadow-lg">
                    <div className="">
                        <p className="text-3xl bg-black inline-block p-4 rounded-xl text-nedowhite">Chef</p>
                    </div>
                    <div>
                        <p className="font-medium">Ideal for those who want to try our product</p>
                    </div>
                    <div>
                        <h2 className="text-center text-3xl uppercase font-bold">100$/month</h2>
                    </div>
                    <div>
                        <ul className="gap-10 flex flex-col">
                            <li className="flex flex-row text-sm "><img src="/icons/cards.svg" alt="" className="w-5 mr-2"/> Lorem ipsum dolor sit amet consectetur.</li>
                            <li className="flex flex-row text-sm "><img src="/icons/cards.svg" alt="" className="w-5 mr-2"/> Lorem ipsum dolor sit amet consectetur.</li>
                            <li className="flex flex-row text-sm "><img src="/icons/cards.svg" alt="" className="w-5 mr-2"/> Lorem ipsum dolor sit amet consectetur.</li>
                        </ul>
                    </div>
                    <div className="mx-auto">
                        <button className="relative inline-block py-2 px-6 border-2 rounded-xl border-nedoblack text-2xl text-nedowhite bg-no-repeat hover:bg-gradient-to-hover bg-center bg-nedoblack transition-colors duration-500 hover:text-nedoblack hover:animate-fill-center hover:border-nedoblack">
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