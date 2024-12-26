import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { Montserrat } from "next/font/google";
import "../globals.css"


const montserrat = Montserrat({
    subsets: ['latin'],
  })


export default function Loggedlayout({children, lastcomp}){
    
    return(
        <html lang="en">
            <body className="bg-nedowhite font-montserrat">
                <Header lastcomp={lastcomp}/>
                {children}
                <Footer isFixed={true}/>
            </body>

        </html>
    );
}