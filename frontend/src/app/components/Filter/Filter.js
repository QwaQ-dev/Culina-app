"use client"
import { useState } from "react"


export default function Filter({ title, content }) {
  const [active, setActive] = useState(false)

  return (
    <div className="accordion-item bg-nedowhite p-4 font-montserrat w-full">
      <div className="accordion-title cursor-pointer flex justify-between text-xl" onClick={() => { setActive(!active) }}>
        <div className="font-bold text-2xl">{title}</div>
        <div className="text-3xl">{active ? "-" : "+"}</div>
      </div>
      <div
        className={`accordion-content transition-all duration-300 overflow-y-hidden ${active ? 'max-h-screen' : 'max-h-0'}`}
      >
        {content.map(({ filter }, index) => (
          <div className="flex flex-col gap-4" key={`content-${index}`}>
            {filter.map((item, subIndex) => (
              <a
                href="#"
                className="cursor-pointer flex justify-between gap-2"
                key={`filter-${index}-${subIndex}`}
              >
                <label htmlFor={`filter-${index}-${subIndex}`} className="text-xl">
                  {item}
                </label>
                <input
                  type="radio"
                  name={title} // Уникальное имя для каждой группы радиокнопок
                  id={`filter-${index}-${subIndex}`} // Уникальный id для каждой кнопки
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
