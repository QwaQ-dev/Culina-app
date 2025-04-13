export default function Connection(){
    return(
        <div className="mx-auto flex justify-center flex-col">
            <h2 className="text-center text-2xl inline">Information</h2>
            <div className="mx-auto w-full">
                <div className="flex p-10 mx-auto justify-center flex-col text-center">
                    {/* HIDE WHEN HAVING AT LEAST 1 MESSAGE */}
{/*                     
                    <img src="gifs/profile-connection.gif" className=" w-64 h-64 mx-auto" alt="" />
                    <p>Write whenever you need help!</p> */}
                    
                


                </div>
                <div className=" w-3/4 mx-auto h-12  ">
                    <div className="flex items-center relative justify-between border-2 border-black">
                        <button>
                            <img src="icons/add-image.svg" className="w-8 h-8" alt="" />
                        </button>
                        
                        <input 
                        type="text" 
                            placeholder="Type your message here..." 
                            className="rounded-xl w-full bg-nedowhite focus:outline-none p-4" 
                        />
                        <button>
                            <img src="icons/send-message.svg" className="w-8 h-8 cursor-pointer" alt="Send" />
                        </button>
                    </div>
                </div>


            </div>

        </div>
    )
}