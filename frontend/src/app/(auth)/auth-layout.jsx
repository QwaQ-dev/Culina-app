import {ReactLenis} from "@/utils/lenis"

import { Montserrat } from "next/font/google";
import Header from "../components/Header/Header";
import Footer from '../components/Footer/Footer';
import "../globals.css";


const montserrat = Montserrat({
  subsets: ['latin'],
})

export default function AuthLayout({ children, lastcomp, isFixed}) {
 
  return (
    <html lang="en" suppressHydrationWarning>
      <ReactLenis root>
        <body className="bg-nedowhite flex flex-col min-h-svh font-montserrat" suppressHydrationWarning>
          <Header lastcomp={lastcomp}/>
          {children}
          <Footer isFixed={isFixed}/>
        </body>
      </ReactLenis>
    </html>
  );
}
