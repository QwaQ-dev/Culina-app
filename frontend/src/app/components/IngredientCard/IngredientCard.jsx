export default function IngredientCard({ingrName,ingrAmount,onChangeName,onChangeAmount,onDelete,}){
    return (
        <div className="p-4 flex flex-row justify-between items-center border rounded-md border-nedoorange shadow-sm my-2">
          <input
            type="text"
            value={ingrName}
            onChange={onChangeName}
            placeholder="Ingredient"
            className="border w-28 p-2 mr-2 bg-nedowhite border-none focus:outline-none "
          />
          <input
            type="number"
            
            value={ingrAmount}
            onChange={onChangeAmount}
            placeholder="Amount (g)"
            className="border w-28 p-2 mr-2 bg-nedowhite border-none focus:outline-none"
          />
          <button onClick={onDelete} className="bg-red-500/50 rounded-lg h-8 w-10 text-white  hover:bg-red-500/70 ">
            X
          </button>
        </div>
      );
}