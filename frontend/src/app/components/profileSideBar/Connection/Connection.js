export default function Connection(){
    return(
        <div className="mx-auto flex justify-center flex-col">
            <h2 className="text-center text-2xl inline">Information</h2>
            <div className="mx-auto w-full">
                <div className="flex p-10 mx-auto justify-center flex-col text-center">
                    {/* HIDE WHEN HAVING AT LEAST 1 MESSAGE */}
                    <img src="gifs/profile-connection.gif" className=" w-64 h-64 mx-auto" alt="" />
                    <p>Write whenever you need help!</p>


                </div>
                <div className="flex items-center relative">
                    <div className="absolute left-40 flex">
                        <img src="icons/add-image.svg" className="h-8 w-8 cursor-pointer" alt="Add" />
                    </div>
                    
                    <input 
                        type="text" 
                        placeholder="Type your message here..." 
                        className="rounded-xl w-3/4 mx-auto h-14 bg-nedowhite border-black/20 border-2 p-2 pl-12 pr-16" 
                    />

                    <div className="absolute right-40">
                        <img src="icons/send-message.svg" className="w-8 h-8 cursor-pointer" alt="Send" />
                    </div>
                </div>


            </div>

        </div>
    )
}