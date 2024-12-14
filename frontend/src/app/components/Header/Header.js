export default function Header(props){
    return(
        <header className="flex justify-between py-6 px-12 ">
            <div className = "text-4xl">Culina</div>
            <div>
                <ul className="flex flex-row gap-4 text-2xl">
                    <li><a href="">About</a></li>
                    <li><a href="">Recipes</a></li>
                    <li><a href="">Pricing</a></li>
                </ul>
            </div>
            <div className = "text-2xl">{props.lastcomp}</div>
            
        </header>
    );
}