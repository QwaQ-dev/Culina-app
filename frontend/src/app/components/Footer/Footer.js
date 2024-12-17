export default function Footer(props) {
    let classes = "w-screen sm:border-t-2  sm:border-black flex flex-row justify-between sm:px-7  text-sm sm:text-base bottom-0 left-0";
    if(props.isFixed){
        classes+=" fixed ";
    }
    return(
        <footer className={classes}>
                <div className="flex flex-row p-3 sm:gap-5 ">
                    <div>
                        <span  className = "flex flex-row text-xs sm:text-lg sm:gap-2"><img src="/icons/copyright.svg" className="hidden sm:block sm:w-3" alt="" /><p>2025 Culina inc.All rights reserved</p></span>
                    </div>
                    <div className="flex flex-row gap-1">
                        <a href="">
                            <img src="/icons/telegram.png"  className="hidden sm:block sm:w-7" alt="" />
                        </a>
                        <a href="">
                            <img src="/icons/github.png" className="hidden sm:block sm:w-7" alt="" />
                        </a>
                    </div>
                </div>
                <div className="flex items-center text-center">
                    <a className=" cursor-pointer text-center">
                        Terms of services
                    </a>
                </div>
        </footer>
    );
}