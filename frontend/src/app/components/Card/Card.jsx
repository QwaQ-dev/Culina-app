import { Montserrat } from "next/font/google"

export default function Card({ image, name, rate, author }) {
    return (
        <div className="font-montserrat w-44 h-56 lg:w-72  flex flex-col bg-nedoorange rounded-md overflow-hidden">
            <img src={`http://localhost:8080/${image}`} className="w-full h-28 lg:h-36 object-cover" alt="CARD" />
            <div className="flex flex-col justify-between p-4 h-full">
                <h2 className="truncate text-md font-bold md:text-2xl leading-relaxed">{name}</h2>
                <div className="flex justify-between text-xs">
                    <p>{rate} <span className="font-bold">rate</span></p>
                    <p className="truncate">{author}</p>
                </div>
            </div>
        </div>
    );
}
