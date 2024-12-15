import Header from "./components/Header/Header.js"

export default function Home() {
  const sign_up = "Sign up"
  return (
   <div>
    <Header lastcomp= {sign_up} where={'/signup'}/>
   </div>
  );
}
