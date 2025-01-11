export default function SearchCard({ img, name, rating, author }) {
    return (
      <div className="flex items-center gap-4 p-4 bg-white shadow-lg rounded-lg border border-gray-200 hover:shadow-xl transition-shadow duration-200">
        <img
          src={`http://localhost:8080/${img}`}
          alt={name}
          className="w-16 h-16 rounded-full object-cover"
        />
        <div className="flex-1 truncate">
          <h2 className="text-lg font-semibold text-gray-800 truncate">
            {name}
          </h2>
          <div className="mt-1 flex gap-2 text-sm text-gray-600">
            <p className="truncate">
              <span className="font-medium text-gray-800">Rating:</span> {rating}
            </p>
            <p className="truncate">
              <span className="font-medium text-gray-800">Author:</span> {author}
            </p>
          </div>
        </div>
      </div>
    );
  }
  