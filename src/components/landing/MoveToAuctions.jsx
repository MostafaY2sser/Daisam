import { FaChevronDown } from "react-icons/fa";

const MoveToAuctions = ({lable}) => {
    return (
        <div className="flex justify-center py-8">
            <button
                onClick={() => {
                document.getElementById("auctions")?.scrollIntoView({
                    behavior: "smooth",
                });
                }}
                className="group flex flex-col items-center gap-3"
                aria-label={lable}
            >
                <span className="text-sm font-semibold text-gray-600 group-hover:text-primary transition">
                    {lable}
                </span>

                <span
                className="w-12 h-12 rounded-full border bg-primary border-primary/40 flex items-center justify-center text-white shadow-2xl
                    group-hover:bg-white
                    group-hover:text-primary
                    group-hover:border-primary
                    group-hover:shadow-md
                    transition-all duration-300
                    animate-bounce
                "
                >
                <FaChevronDown className="text-lg " />
                </span>
            </button>
        </div>
    )
}

export default MoveToAuctions;