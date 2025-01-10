"use client"
import { useState } from "react"


export default function Filter({ title, content }) {
  const [active, setActive] = useState(false)

  return (
    <div className="accordion-item bg-nedowhite lg:p-4 font-montserrat w-full">
      <div className="accordion-title cursor-pointer flex justify-between py-2 " onClick={() => { setActive(!active) }}>
        <div className="font-bold text-xs md:text-base  text-center lg:text-xl">{title}</div>
        <div className="text-md lg:text-2xl">{active ? "-" : "+"}</div>
      </div>
      <div
        className={`accordion-content transition-all duration-300 overflow-y-hidden ${active ? 'max-h-screen' : 'max-h-0'}`}
      >
        {content.map(({ filter }, index) => (
          <div className="flex flex-col gap-4 p-3" key={`content-${index}`}>
            {filter.map((item, subIndex) => (
              <a
                href="#"
                className="cursor-pointer flex justify-between gap-2"
                key={`filter-${index}-${subIndex}`}
              >
                <label htmlFor={`filter-${index}-${subIndex}`} className="text-base ">
                  {item}
                </label>
                <input
                  type="radio"
                  name={title} 
                  id={`filter-${index}-${subIndex}`} 
                  value={item}
                />
              </a>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
