"use client"
import AuthLayout from "@/app/(auth)/auth-layout";
import  { getSingleCard }  from "@/app/api/cards/getSingleCard/getSingleCard";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Loggedlayout from "../../logged-layout";



const lastComponent = <div className="flex flex-row gap-5">
                        <div className=" border-black rounded-xl p-2 cursor-pointer">
                            <a href="/">
                                <img src="/avatars/chef-woman.png" className="w-14" alt="" />
                            </a>
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <h2 className="text-center text-xl">Danil</h2>
                            <p className="text-base font-thin">123 recipes</p>
                        </div>
                    </div> 


export default function RecipeCard() {
    const [cards, setCards] = useState(null); 
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true); 
    const params = useParams();
    const id = params.slug;

    useEffect(() => {
        const getCard = async () => {
            try {
                setLoading(true);
                const response = await getSingleCard(id);
                setCards(response.data);
            } catch (err) {
                console.log(err);
                setError("Recipe is not found");
            } finally {
                setLoading(false);
            }
        };
        getCard();
    }, [id]);

    if (loading) {
        return (
            <Loggedlayout lastcomp = {<UserInfo username={"danil"} image={"/avatars/chef.png"} recipes={123}/>} isFixed={true}>
                <div className="container mx-auto p-6 sm:p-12 flex items-center justify-center text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-black"></div>
                    <p className="text-lg text-gray-600 ml-4">Loading...</p>
                </div>
            </Loggedlayout>
        );
    }

    if (error) {
        return (
            <Loggedlayout lastcomp = {<UserInfo username={"danil"} image={"/avatars/chef.png"} recipes={123}/>} isFixed={true}>
                <div className="container mx-auto p-6 sm:p-12 flex flex-col items-center text-center">
                    <h1 className="text-3xl sm:text-5xl font-bold text-black mb-4">
                        Oops! Recipe Not Found
                    </h1>
                    <p className="text-lg text-gray-600 mb-6">
                        Sorry, the recipe you're looking for does not exist or has been removed.
                    </p>
                    <a
                        href="/dashboard"
                        className="px-6 py-3 bg-black text-white text-lg font-medium rounded-lg hover:bg-gray-800 transition"
                    >
                        Back to Home
                    </a>
                </div>
            </Loggedlayout>
        );
}


    return (
        <Loggedlayout lastcomp = {<UserInfo username={"danil"} image={"/avatars/chef.png"} recipes={123}/>} >
            <div className="container mx-auto p-6 sm:p-12 ">
                <div className="text-center mb-8">
                    <h1 className="text-4xl sm:text-6xl font-bold mb-4 text-black">
                        {cards.name}
                    </h1>
                    <p className="text-lg text-gray-600 italic">
                        {cards.descr}
                    </p>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2">
                        <div className="mb-8 relative group">
                            <img
                                src="/meals/carbonara.png"
                                alt="Spaghetti Carbonara"
                                className="w-full rounded-lg shadow-lg border-2 border-black/60 transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute bottom-2 right-2 bg-white/80 px-4 py-1 rounded-full shadow text-sm">
                                {cards.author}
                            </div>
                        </div>
                        <div className="mb-8">
                            <h2 className="text-2xl font-semibold mb-4 text-black">Ingredients</h2>
                            <ul className="list-disc list-inside text-lg space-y-2">
                                <li>200g spaghetti</li>
                                <li>100g pancetta, diced</li>
                                <li>2 large eggs</li>
                                <li>50g Parmesan cheese, grated</li>
                                <li>1 clove garlic, minced</li>
                                <li>Salt and black pepper to taste</li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="text-2xl font-semibold mb-4 text-black">Steps</h2>
                            <ol className="list-decimal list-inside text-lg space-y-4">
                                <li>Cook the spaghetti in boiling salted water until al dente.</li>
                                <li>Fry the pancetta in a large skillet until crispy.</li>
                                <li>In a bowl, whisk together eggs and Parmesan cheese until smooth.</li>
                                <li>Drain the spaghetti and add it to the skillet with the pancetta.</li>
                                <li>Remove from heat and quickly stir in the egg mixture.</li>
                                <li>Season with salt and black pepper. Serve immediately.</li>
                            </ol>
                        </div>
                    </div>
                    <aside>
                        <div className="mb-8 p-6 rounded-lg shadow-lg border bg-nedoorange/35 border-black ">
                            <h2 className="text-2xl font-semibold mb-4 text-black  ">Cooking Info</h2>
                            <ul className="text-lg space-y-2 text-black">
                                <li><strong>Prep Time:</strong> 10 minutes</li>
                                <li><strong>Cook Time:</strong> 20 minutes</li>
                                <li><strong>Total Time:</strong> 30 minutes</li>
                                <li><strong>Servings:</strong> 4</li>
                            </ul>
                        </div>
                        <div className="mb-8">
                            <h2 className="text-2xl font-semibold mb-4 text-black">Rating</h2>
                            <div className="flex items-center gap-2 text-lg">
                                <span>4.5</span>

                                <div className="flex space-x-1 text-yellow-500 ">
                                    {[...Array(4)].map((_, i) => (
                                        <svg
                                            key={i}
                                            className="w-5 h-5"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M10 15l-5.1 3.7 1.9-6.1L2 8.3h6.2L10 2l1.8 6.3H18l-4.8 3.3 1.9 6.1z" />
                                        </svg>
                                    ))}
                                    <svg
                                        className="w-5 h-5 text-gray-300"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M10 15l-5.1 3.7 1.9-6.1L2 8.3h6.2L10 2l1.8 6.3H18l-4.8 3.3 1.9 6.1z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h2 className="text-2xl font-semibold mb-4 text-black">Reviews</h2>
                            <div className="space-y-6 ">
                                <div className="p-4 rounded-lg shadow-sm border-2 border-black/40 hover:bg-nedoorange/10 bg-nedoorange/35 duration-500 ">
                                    <p className="text-gray-700">"Absolutely delicious! My family loved it!"</p>
                                    <span className="text-gray-500 text-sm">- Emily</span>
                                </div>
                                <div className="p-4 rounded-lg shadow-sm border-2 border-black/40 hover:bg-nedoorange/10 bg-nedoorange/35 duration-500 ">
                                    <p className="text-gray-700">"Easy to follow and tastes amazing!"</p>
                                    <span className="text-gray-500 text-sm">- John</span>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
            
        </Loggedlayout>
    );
}
