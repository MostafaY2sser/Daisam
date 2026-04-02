import classNames from "classnames";
import { Link } from "react-router-dom";

const ButtonFill = ({ children, href = "#", className }) => {
  return (
    <>
      {/* ====== CSS Animation ====== */}
      

      <div className="button-bg  rounded-lg p-[2px] hover:scale-105 transition-transform duration-300 active:scale-100">
        <Link
          to={href}
          className={classNames(
            "bg-primary w-full flex items-center justify-center text-text font-normal text-sm md:text-lg py-2 px-3 md:px-6 rounded-lg transition-all duration-300",
            className
          )}
        >
          {children}
        </Link>
      </div>
    </>
  );
};

export default ButtonFill;
