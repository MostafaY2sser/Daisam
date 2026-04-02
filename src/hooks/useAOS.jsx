import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const useAOS = (options = { duration: 1000, once: true }) => {
  useEffect(() => {
    AOS.init(options);
  }, [options]);
};

export default useAOS;
