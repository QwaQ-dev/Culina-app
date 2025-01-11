export default function Footer(props) {
    return (
        <footer className="w-full bottom-0  mt-10 border-t-2  border-black flex flex-row justify-between px-7 text-sm sm:text-base">
            <div className="flex flex-row p-3 sm:gap-5">
                <div>
                    <span className="flex flex-row text-xs sm:text-lg 2xl:text-2xl sm:gap-2">
                        <img src="/icons/copyright.svg" className="hidden sm:block sm:w-3" alt="" />
                        <p>2025 Culina Inc. All rights reserved</p>
                    </span>
                </div>
                <div className="flex flex-row gap-1">
                    <a href="">
                        <img src="/icons/telegram.png" className="hidden sm:block sm:w-7 2xl:w-10" alt="Telegram" />
                    </a>
                    <a href="">
                        <img src="/icons/github.png" className="hidden sm:block sm:w-7 2xl:w-10" alt="GitHub" />
                    </a>
                </div>
            </div>
            <div className="flex items-center text-center">
                <a className="cursor-pointer text-center 2xl:text-xl">Terms of Services</a>
            </div>
        </footer>
    );
}
