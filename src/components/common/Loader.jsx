const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen ">
      <div className="flex flex-col items-center gap-4">
        
        {/* Spinner */}
        <div className="w-14 h-14 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>

        {/* Text */}
        <p className="text-base font-semibold text-text">Loading...</p>

      </div>
    </div>
  );
};

export default Loader;