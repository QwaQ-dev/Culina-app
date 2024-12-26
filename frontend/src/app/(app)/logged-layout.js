import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import "../globals.css";

export default function Loggedlayout({children, lastcomp}){
    return(
        <html lang="en">
            <body>
                <div>
                    <Header lastcomp={lastcomp}/>
                    {children}
                    <Footer isFixed={true}/>
                </div>
            </body>

        </html>
    );
}