export default function StepCard({stepName,onChangeStep,onDelete, index}){
    return (
        <div className="p-2 flex flex-row justify-between items-center border rounded-xl border-nedoorange shadow-sm my-2">
            <p className="p-2 px-4 text-xl font-bold border-black rounded-lg border-2">{index}</p>
            <input
            type="text"
            value={stepName}
            onChange={onChangeStep}
            placeholder="Recipe Step"
            className="border w-full ms-10 p-2 mr-2 bg-nedowhite border-none focus:outline-none "
            />
            <button onClick={onDelete} className="bg-red-500/50 text-white  h-10 w-12 rounded-xl hover:bg-red-500/70 ">
            X
            </button>
        </div>
      );
}