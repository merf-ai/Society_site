import { useState, useEffect } from "react";

export const useResizeMarginRight = myRef => {
    const [margin, setMargin] = useState(0)
  
    useEffect(() => {
      const getMargin = function () {
        let offsetWidth = Number(myRef.current.offsetWidth);
        let left = Number(myRef.current.style.left.replace('px', ''));
        return offsetWidth + left + 100
      }
  
      const handleResize = () => {
        setMargin(getMargin())
      }
  
      if (myRef.current) {
        setMargin(getMargin())
      }
  
      window.addEventListener("resize", handleResize)
  
      return () => {
        window.removeEventListener("resize", handleResize)
      }
    }, [myRef])
  
    return margin;
  };