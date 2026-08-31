

const AuctionsFilter = ({handleFilterChange , filter}) => {

    const handleShowPropertyForm = () => {
        document.getElementById("list-property")?.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    };

    return(
        <div className="flex justify-center gap-2 md;gap-3 mb-10">

            {/* Available */}
            <button
                onClick={() => handleFilterChange("available")}
                className={`px-2 md:px-6 py-1 md:py-2.5 rounded-lg text-sm md:text-base md:font-medium transition ${
                    filter === "available"
                        ? "bg-primary text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
            >
                المزادات المتاحة
            </button>

            {/* Ended */} 
            <button
                onClick={() => handleFilterChange("ended")}
                className={`px-2 md:px-6 py-1 md:py-2.5 rounded-lg text-sm md:text-base md:font-medium transition ${
                    filter === "ended"
                        ? "bg-primary text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
            >
                المزادات المنتهية
            </button>

            {/* Add Property */}
            <button
                onClick={handleShowPropertyForm}
                className="bg-gray-100 text-gray-700 hover:bg-gray-200 px-2 md:px-6 py-1 md:py-2.5 rounded-lg text-sm md:text-base md:font-medium  transition"
            >
                اعرض عقارك للمزاد
            </button>

        </div>
    )
}

export default AuctionsFilter;