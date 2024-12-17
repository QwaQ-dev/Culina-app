export default function Header({lastcomp, where}){
    return(
        <header className="flex justify-between py-3 px-3 sm:py-6 sm:px-12 items-center">
            <div className = "text-xl sm:text-3xl">Culina</div>
            <div>
                <ul className="md:flex flex-row gap-12 text-xl hidden">
                    <li><a href="">About</a></li>
                    <li><a href="">Recipes</a></li>
                    <li><a href="">Pricing</a></li>
                </ul>
            </div>
            <div className = " text-xl sm:text-2xl">
                <a href={where}>
                <button className="relative inline-block py-2 px-2 sm:py-2 sm:px-6 border-2 rounded-xl border-nedoblack sm:text-2xl text-nedowhite bg-no-repeat hover:bg-gradient-to-hover bg-center bg-nedoblack transition-colors duration-500 hover:text-nedoblack hover:animate-fill-center hover:border-nedoblack ">
                    {lastcomp}
                </button>
                </a>
            </div>
        </header>
    );
}