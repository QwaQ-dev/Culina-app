export default function Footer(props) {
    let classes = "w-screen border-t-2  border-black flex flex-row justify-between px-7 text-base bottom-0 left-0";
    if(props.isFixed){
        classes+=" fixed ";
    }
    return(
        <footer className={classes}>
                <div className="flex flex-row gap-5">
                    <div>
                        <span  className = "flex flex-row gap-2"><img src="/icons/copyright.svg" alt="" /><p>2025 Culina inc.All rights reserved</p></span>
                    </div>
                    <div className="flex flex-row gap-1">
                        <a href="">
                            <img src="/icons/telegram.png"  className="w-7" alt="" />
                        </a>
                        <a href="">
                            <img src="/icons/github.png" className="w-7" alt="" />
                        </a>
                    </div>
                </div>
                <div>
                    <a className=" cursor-pointer ">
                        Terms of services
                    </a>
                </div>
        </footer>
    );
}