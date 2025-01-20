export default function UserInfo({image, username, recipes}){
    return(
        <div className="flex flex-row gap-5">
            <div className="border-black rounded-xl p-2 cursor-pointer">
            <a href="/profile">
                <img src={image} className="w-14" alt="Chef Avatar" />
            </a>
            </div>
            <div className="flex flex-col items-center justify-center">
            <h2 className="text-center text-xl">{username}</h2>
            <p className="text-base font-thin">{recipes} recipes</p>
            </div>
        </div>
        );
}