"use client";
import { useEffect, useState } from "react";

import { FaSearch } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

import Slider from "@/app/components/Slider/Slider";
import Loggedlayout from "../logged-layout";
import Card from "@/app/components/Card/Card";
import Filter from "@/app/components/Filter/Filter";
import SearchCard from "@/app/components/Search/SearchCard/SearchCard";
import { getAllCards } from "@/app/api/cards/getAllCards/getAllCards";
import { getSearchItem } from "@/app/api/search/getSearchItem";
import UserInfo from "@/app/components/UserInfo/UserInfo";




const filters = [
  { title: "Difficult", options: ["Ease", "Medium", "Hard"] },
  { title: "Meal", options: ["Soup", "Meat", "Pasta", "Cake", "Pie"] },
  { title: "Time", options: ["<1 hour", "≈1 hour", ">1 hour"] },
  { title: "Dish type", options: ["Salad", "Dessert", "Soup", "Meat"] },
];

export default function Dashboard() {
  const [cards, setCards] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllCards();
        setCards(response.data);
      } catch (err) {
        console.error("Error fetching cards:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSearch = async (e) => {
    const value = e.target.value;
    setSearchValue(value);

    if (!value.trim()) {
      setSearchResult([]);
      return;
    }

    try {
      const response = await getSearchItem(value);
      setSearchResult(response.data);
    } catch (err) {

    }
  };

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

  return (
    <Loggedlayout lastcomp = {<UserInfo username={"danil"} image={"/avatars/chef.png"} recipes={123}/>} >
      <div className="flex mx-auto">
        <Slider />
      </div>
      <div className="flex justify-center lg:gap-6 2xl:gap-48">
        {/* Фильтры */}
        <div className="flex flex-col w-20 md:w-40 lg:w-64 m-4">
          <h2 className="text-base lg:text-3xl text-center pb-4">Recipes</h2>
          <div className="bg-nedoorange flex flex-col rounded-xl w-full">
            <p className="text-md lg:text-xl lg:leading-loose p-4">Filter by:</p>
            <div className="flex flex-col gap-4 last:border-b-8 last:border-nedoorange last:rounded-b-lg">
              {filters.map(({ title, options }) => (
                <Filter title={title} content={[{ filter: options }]} key={title} />
              ))}
              <div className="mx-auto">
                <button className="shadow-xl py-2 px-6 border-2 rounded-xl border-nedoblack text-xl bg-nedoblack text-nedowhite hover:text-nedoblack hover:bg-nedowhite transition">
                  Find
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Карточки */}
        <div className="flex flex-col w-3/4">
          <div className="w-full">
            <div className="flex justify-around gap-10 items-center relative pt-3 px-3 lg:py-3">
              <div className="flex flex-row items-center p-2 rounded-lg w-full max-w-xl bg-black px-4">
                <FaSearch className="text-white" />
                <input
                  type="text"
                  placeholder="Search for recipes..."
                  value={searchValue}
                  onChange={handleSearch}
                  className="text-sm w-full p-4 bg-black text-white focus:outline-none"
                />
                {searchValue.trim() && (
                  <motion.div
                    className="absolute top-full py-4 mx-auto mt-2 w-1/2 z-50 shadow-lg  flex flex-col gap-4 text-black"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    {searchResult.map(({ imgs, name, diff, author, id }) => (
                      <a href={`/card/${id}`} key={id}>
                        <SearchCard img={imgs} name={name} rating={diff} author={author} />
                      </a>
                    ))}
                  </motion.div>
                )}
              </div>

              <button
                className="hidden md:flex p-2 lg:ml-4 lg:p-3 rounded-lg bg-black text-white focus:outline-none hover:bg-gray-700"
                onClick={() => setSort(!sort)}
              >
                Sort
              </button>
              <AnimatePresence>
                {sort && (
                    <motion.div
                    className="absolute right-0 top-full mt-2 w-40 bg-white text-black rounded-lg shadow-lg z-10"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.5 }}
                    >
                    <ul className="p-2">
                        <li className="py-2 px-4 hover:bg-gray-200 cursor-pointer">By Name</li>
                        <li className="py-2 px-4 hover:bg-gray-200 cursor-pointer">By Date</li>
                        <li className="py-2 px-4 hover:bg-gray-200 cursor-pointer">By Rating</li>
                        <li className="py-2 px-4 hover:bg-gray-200 cursor-pointer">By Difficulty</li>
                    </ul>
                    </motion.div>
                )}
                </AnimatePresence>
            </div>
          </div>
          <div className="flex flex-wrap gap-10 justify-center items-center mx-auto">
            {cards.map(({ id, imgs, name, diff, author }) => (
              <Card key={id} id={id} image={imgs[1]} name={name} rate={diff} author={author} />
            ))}
          </div>
        </div>
      </div>
    </Loggedlayout>
  );
}
