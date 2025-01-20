export default function Nutrients({ nutrients, onChange }) {
    return (
        <section className="mt-10">
            <h2 className="font-light text-xl mb-6">Nutrition per meal</h2>
            <div className="flex flex-row flex-wrap gap-6">
                {nutrients.map((item, index) => (
                    <div key={index} className="flex flex-row gap-4">
                        {Object.entries(item).map(([key, value]) => (
                            <div
                                key={key}
                                className="bg-nedoorange/40 flex flex-col p-4 gap-2 rounded-2xl w-28 text-center shadow-lg transition-transform transform hover:scale-105"
                            >
                                <input
                                    type="text"
                                    id={`${index}-${key}`}
                                    value={value}
                                    onChange={(e) => onChange(index, key, e.target.value)}
                                    className="w-16 p-2 rounded-md mx-auto focus:outline-none focus:ring-2 focus:ring-nedoorange text-sm"
                                    maxLength={4}
                                />
                                <label
                                    htmlFor={`${index}-${key}`}
                                    className="text-sm font-medium capitalize text-gray-700"
                                >
                                    {key}
                                </label>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </section>
    );
}
