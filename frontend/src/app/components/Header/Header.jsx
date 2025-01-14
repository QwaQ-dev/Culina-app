import Link from "next/link";


export default function Header({ lastcomp }) {
    return (
      <header className="flex justify-between py-3 px-3 sm:py-6 sm:px-12 items-center">
        <div className="text-xl sm:text-3xl 2xl:text-5xl">Culina</div>
        <div>
          <ul className="md:flex flex-row gap-12 text-lg hidden 2xl:text-2xl">
            {["About", "Recipes", "Pricing"].map((item, index) => (
              <li key={index} className="relative group">
                <Link href = {item === "Recipes" ? `/dashboard` : `/#${item}`} className="hover:text-black/50 duration-500">
                    {item}
                </Link>
                <div className="absolute left-0 bottom-0 w-0 h-[2px] bg-black/50 transition-all duration-500 group-hover:w-full"></div>
              </li>
            ))}
          </ul>
        </div>
        <div className="text-xl sm:text-2xl">{lastcomp}</div>
      </header>
    );
  }
  