import { Montserrat } from "next/font/google";
import Header from "../components/Header/Header";
import Footer from '../components/Footer/Footer';
import "../globals.css";


// const montserrat = Montserrat({
//   subsets: ['latin'],
// })

export default function AuthLayout({ children, lastcomp, where }) {
 
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-nedowhite flex flex-col min-h-svh" suppressHydrationWarning>
        <Header lastcomp={lastcomp} where={where}/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
