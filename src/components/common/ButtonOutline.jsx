import classNames from "classnames";

const ButtonOutline = ({ children, href = "#", className }) => {
  return (
    <>
      {/* ====== CSS Animation ====== */}

      <div className="button-bg rounded-lg p-[2px] hover:scale-105 transition-transform duration-300 active:scale-100">
        <a
          href={href}
          className={classNames(
            "inline-block text-sm md:text-lg py-2 px-3 md:px-6 font-semibold rounded-lg transition-all duration-300 border border-white/20 backdrop-blur-lg bg-white/40 text-white hover:bg-white/30 hover:text-white shadow-lg",
            className
          )}
        >
          {children}
        </a>
      </div>
    </>
  );
};

export default ButtonOutline;
