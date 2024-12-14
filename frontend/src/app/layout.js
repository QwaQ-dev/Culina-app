import { Montserrat } from "next/font/google";
import "./globals.css";


const montserrat = Montserrat({
  subsets: ['latin'],
})

export default function RootLayout({ children }) {


  
  return (
    <html lang="en" className={montserrat.className}>
      <body>
        {children}
      </body>
    </html>
  );
}
