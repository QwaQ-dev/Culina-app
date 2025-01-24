"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion";


import UserInfo from "@/app/components/UserInfo/UserInfo"
import Loggedlayout from "../logged-layout"
import RecipeFilter from "@/app/components/RecipeFilter/page";
import Nutrients from "@/app/components/Nutrients/Nutrients";
import IngredientCard from "@/app/components/IngredientCard/IngredientCard";
import StepCard from "@/app/components/StepCard/StepCard";







export default function uploadCard(){
  const [isOpen, setIsOpen] = useState(false)
  const [name, setName] = useState("")
  const [descr, setDescr] = useState("")
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nutrients, setNutrients] = useState([{
    calories: "",
    protein: "",
    fat: "",
    carbs: "",
    fiber: "",
  }]);


  const [ingredients, setIngredients] = useState([])
  const [ingredientName, setIngredientName] = useState("");
  const [ingredientAmount, setIngredientAmount] = useState("");
  const [steps, setSteps] = useState([]);
  const [filters, setFilters] = useState([]);
  const [currFilt, setCurrFilter] = useState(0)
  const [newFilterName, setNewFilterName] = useState('');



  const addFilter = (name) => {
    if (filters.length < 3) {
      setFilters((prevFilters) => [
        ...prevFilters,
        { name }
      ]);
    } else {
      alert("You can't add more than 5 filters");
    }
  };


  const updateFilter = (index, newName) => {
    setFilters((prevFilters) =>
      prevFilters.map((filter, i) =>
        i === index ? { ...filter, name: newName } : filter
      )
    );
  };
  
  const removeFilter = (index) =>{
    setFilters((prevFilters) =>
      prevFilters.filter((_, i) => i !== index)
    );
  }


  const handleNutrChanges = (index, key, value) => {
    setNutrients((prevNutrients) =>
        prevNutrients.map((item, i) =>
            i === index ? { ...item, [key]: value } : item
        )
    );
};




  const addIngredient = () => {
    setIngredients([
      ...ingredients,
      { id: Date.now(), name: "", amount: "" }, 
    ]);
  };

  const removeIngredient = (id) => {
    setIngredients(ingredients.filter((ingredient) => ingredient.id !== id));
  };

  const updateIngredient = (id, field, value) => {
    setIngredients(
      ingredients.map((ingredient) =>
        ingredient.id === id ? { ...ingredient, [field]: value } : ingredient
      )
    );
  };
  const addSteps = () => {
    setSteps((prevSteps) => [
      ...(prevSteps || []),
      { id: (prevSteps?.length || 0) + 1, name: "" },
    ]);
  };
  
  const removeSteps = (id) => {
    setSteps((prevSteps) =>
      (prevSteps || []).filter((step) => step.id !== id)
    );
  };
  
  const updateSteps = (id, field, value) => {

    setSteps((prevSteps) =>
      (prevSteps || []).map((step) =>
        step.id === id ? { ...step, [field]: value } : step
      )
    );
  };
  
  

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const newImages = [...images];
      newImages[currentIndex] = file; 
      setImages(newImages);
    }
  };

  const handleAddPhoto = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImages((prev) => [...prev, file]); 
    }
  };

  const handleNext = () => {
    if (currentIndex < images.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };
  const toggleModal = (index) => {
    if (index !== undefined) {
      setCurrFilter(index);
      setNewFilterName(filters[index]?.name || "");
    } 
    setIsOpen(!isOpen);
  }

  const handleSubmit = async() =>{
    const formData = new FormData();
    const nutrientData = {
      nutrients: [
        { name: "calories", value: nutrients.calories },
        { name: "protein", value: nutrients.protein },
        { name: "fat", value: nutrients.fat },
        { name: "carbs", value: nutrients.carbohydrates },
        { name: "fiber", value: nutrients.fiber },
      ],
    };
    const ingreds = {
      ingredients
    }

    formData.append("name", otherData.name);
    formData.append("descr", otherData.descr);
    formData.append("nutrs", nutrientData);
    formData.append("ingreds", ingreds)

  }

  return (
    <Loggedlayout lastcomp = {<UserInfo image={"/avatars/chef.png"} username="danil" recipes="123"/>}>
      <div className="container-fluid grid grid-cols-6">
        <section className="p-6 col-span-2">
    
          <div className="relative w-96 h-96 mx-auto border rounded-lg overflow-hidden">
            <AnimatePresence mode="wait">
              {images.length > 0 ? (
                <motion.img
                  src={URL.createObjectURL(images[currentIndex])}
                  alt={`slide-${currentIndex}`}
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                />
              ) : (
                <motion.div 
                className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                  
                  You didn't upload any phoyo yet
                </motion.div>
              )}
            </AnimatePresence>
          </div>
    

          <div className="flex items-center justify-center gap-4 mt-4">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 disabled:opacity-50"
            >
              ← Previous
            </button>
            <span className="text-lg font-medium">
              {currentIndex + 1} / {images.length || 1}
            </span>
            <button
              onClick={handleNext}
              disabled={currentIndex === images.length - 1}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 disabled:opacity-50"
            >
              Next →
            </button>
          </div>
    

          {images.length > 0 && (
            <div className="mt-4 text-center">
              <label
                htmlFor="replacePhoto"
                className="px-4 py-2 bg-red-300 text-white rounded-lg shadow-md cursor-pointer hover:bg-red-100 hover:text-black transition duration-200"
              >
                Change photo
              </label>
              <input
                type="file"
                id="replacePhoto"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>
          )}
    

          <div className="mt-4 text-center">
            <label
              htmlFor="addPhoto"
              className="px-4 py-2 bg-nedoorange text-white rounded-lg shadow-md cursor-pointer hover:bg-nedoorange/30 hover:text-black"
            >
              Add new photo
            </label>
            <input
              type="file"
              id="addPhoto"
              accept="image/*"
              className="hidden"
              onChange={handleAddPhoto}
            />
          </div>

          <div className=" mt-24 ">
            <div className="flex flex-row items-center justify-between">
              <h2 className="text-2xl">Ingredients</h2>
              <div className="flex flex-row gap-4 text-3xl font-light">
                <button onClick={addIngredient}>+</button>
              </div>
            </div>

            {ingredients.map((ingredient) => (
              <IngredientCard
                key={ingredient.id}
                ingrName={ingredient.name}
                ingrAmount={ingredient.amount}
                onChangeName={(e) =>
                  updateIngredient(ingredient.id, "name", e.target.value)
                }
                onChangeAmount={(e) =>
                  updateIngredient(ingredient.id, "amount", e.target.value)
                }
                onDelete={() => removeIngredient(ingredient.id)}
              />
            ))}
          </div>


        </section>
        <div className="col-span-3 mt-6 mx-auto">
          <div className="left-0 flex flex-col gap-6" >
            <input
              placeholder="Type your dish name here..."
              name="name" 
              id="" 
              value={name} 
              className="bg-nedowhite border-2 px-6 text-xl border-black/60 rounded-xl h-16 w-96 focus:outline-none"
              onChange={(e)=>setName(e.target.value)}/>
              <input 
                type="text" 
                placeholder="Type dish description.. "    
                className="bg-nedowhite border-2 border-black/80 rounded-lg h-24 px-6 focus:outline-none " 
                value={descr}
                onChange={(e)=>setDescr(e.target.value)}
                name="" 
                id="" />
              
          </div>
          <div className="mt-10 flex flex-row items-center  my-auto gap-4">
            
            <div className=" flex flex-row justify-items-center my-auto">
              <ul className="h-full flex flex-row gap-4 items-center  flex-wrap">
                {filters.map((filter, index) => (
                  <li key={index} className="bg-none border-nedoorange border-2 gap-2 h-full p-2 rounded-md flex flex-row items-center" >
                    {filter.name}
                  <div className="flex flex-row ">
                    <div className="group relative">
                      <button 
                        onClick={()=>toggleModal(index)}
                        className=" text-white px-2 py-1 rounded ">
                        <img src="/icons/pencil.png" className="w-4 h-4" alt="" />
                      </button>

                      <div
                        className="absolute bottom-full mb-5  text-nowrap transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black text-white text-sm p-2 rounded"
                      >
                        Edit filter
                      </div>
                    </div>
                    <div className="group relative">
                      <button
                      onClick={() =>removeFilter(index)}
                      className=" text-white px-2 py-1 rounded "
                      >
                        <img src="/icons/close.png" className="w-4 h-4" alt="" />
                      </button>
                      <div
                      
                      className="absolute bottom-full mb-5  text-nowrap transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black text-white text-sm p-2 rounded"
                      >Delete filter</div>
                    </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <RecipeFilter
              filters={filters}
              addFilter={addFilter}
              updateFilter={updateFilter}
            />
          </div>
          {isOpen && (
            <div className="fixed inset-0 z-50 bg-gray-500 bg-opacity-50 flex justify-center items-center">
              <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                <h2 className="text-xl font-semibold mb-4">Edit or delete filter</h2>
                <input
                  type="text"
                  value={newFilterName}
                  onChange={(e) => setNewFilterName(e.target.value)}
                  placeholder="Insert filter here"
                  className="p-2 border border-gray-300 rounded w-full mb-4"
                />
                <div className="flex justify-between">
                  <button
                    onClick={()=>removeFilter(currFilt)}
                    className="bg-red-500 text-white p-2 rounded hover:bg-red-300 transition duration-300">
                    Delete
                  </button>
                  <button
                    onClick={()=>{
                      updateFilter(currFilt, newFilterName)
                      toggleModal()
                    }}
                  
                  className="bg-nedoorange text-white p-2 rounded hover:bg-nedoorange/40 hover:text-black transition duration-300"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => { 
                        toggleModal();
                    }}
                    className="bg-gray-500 text-white p-2 rounded hover:bg-gray-300 transition duration-300">                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

        <Nutrients nutrients={nutrients} onChange={handleNutrChanges}/>

        <div className="mt-24">
          <div className="flex flex-row mx-auto justify-between">
            <div> </div>
            <h2 className="text-3xl text-center">Steps of Preparing</h2>
            <button onClick={addSteps} className="bg-nedoorange  text-white px-4 py-2">
              Add Step
            </button>
          </div>
          <div className="flex flex-col gap-3 mt-10">
            {steps.map((step, index) => (
              <StepCard
                key={step.id}
                stepName={step.name}
                onChangeStep={(e) => updateSteps(step.id, "name", e.target.value)}
                onDelete={() => removeSteps(step.id)}
                index={index + 1}
              />
            ))}
          </div>
        </div>

        </div>
        </div>


      </Loggedlayout>

  )
}