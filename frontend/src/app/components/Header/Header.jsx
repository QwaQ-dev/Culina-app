import Link from "next/link";


export default function Header({ lastcomp }) {
    return (
      <header className=" mx-auto container-fluid  w-full ">
        <div className="flex items-center justify-between p-4">
          <div className="w-44 text-xl  sm:text-3xl 2xl:text-3xl font-bold">Culina</div>
          <div>
            <ul className="md:flex flex-row gap-x-10 text-lg hidden 2xl:text-xl">
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
          <div className="">{lastcomp}</div>
        </div>
      </header>
    );
  }
  