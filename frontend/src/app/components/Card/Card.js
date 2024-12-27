import { Montserrat } from "next/font/google"


export default function Card({image, name, rate, author}){
    return(
        <div className="font-montserrat w-72 ">
            <div>
                <img src={image} className="w-72 cursor-pointer rounded-t-md" alt="CARD" />
            </div>
            <div className="bg-nedoorange rounded-b-md">
                <div className="p-2">
                    <h2 className="text-2xl leading-relaxed ">{name}</h2>
                </div>
                <div className="flex flex-row justify-between px-4 py-2">
                    <div>
                        <p>{rate} rate</p>
                    </div>
                    <div>
                        <p>{author}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}