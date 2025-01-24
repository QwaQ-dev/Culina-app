import { ReactLenis} from "@/utils/lenis";

import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { Montserrat } from "next/font/google";


import "../globals.css";

const montserrat = Montserrat({
    subsets: ["latin"],
});

export default function Loggedlayout({ children, lastcomp, isFixed }) {
    return (
        <html lang="en" className={montserrat.className}>
            <ReactLenis root>
                <body className="bg-nedowhite font-montserrat flex flex-col min-h-screen">
                    {/* Шапка */}
                    <Header lastcomp={lastcomp} />
                    
                    {/* Контент */}
                    <main className="flex-grow">
                        {children}
                    </main>

                    {/* Футер */}   
                    <Footer isFixed={isFixed} />
                </body>
            </ReactLenis>
        </html>
    );
}
