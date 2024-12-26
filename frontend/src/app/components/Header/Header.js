export default function Header({lastcomp}){
    return(
        <header className="flex justify-between py-3 px-3 sm:py-6 sm:px-12 items-center">
            <div className = "text-xl sm:text-3xl 2xl:text-5xl">Culina</div>
            <div>
                <ul className="md:flex flex-row gap-12 text-lg hidden 2xl:text-2xl">
                    <li><a href="">About</a></li>
                    <li><a href="">Recipes</a></li>
                    <li><a href="">Pricing</a></li>
                </ul>
            </div>
            <div className = " text-xl sm:text-2xl">
                {lastcomp}
            </div>
        </header>
    );
}