export default function Header({lastcomp, where}){
    return(
        <header className="flex justify-between py-6 px-12 items-center">
            <div className = "text-3xl">Culina</div>
            <div>
                <ul className="flex flex-row gap-12 text-xl">
                    <li><a href="">About</a></li>
                    <li><a href="">Recipes</a></li>
                    <li><a href="">Pricing</a></li>
                </ul>
            </div>
            <div className = "text-2xl">
                <a href={where}>
                <button className="relative inline-block py-2 px-6 border-2 rounded-xl border-nedoblack text-2xl text-nedowhite bg-no-repeat hover:bg-gradient-to-hover bg-center bg-nedoblack transition-colors duration-500 hover:text-nedoblack hover:animate-fill-center hover:border-nedoblack">
                    {lastcomp}
                </button>
                </a>
            </div>
        </header>
    );
}