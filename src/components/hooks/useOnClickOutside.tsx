import { useEffect, RefObject } from "react";

type UseOnClickOutsideType = {
  ref: RefObject<HTMLDivElement>;
  handler: () => void;
};

const useOnClickOutside = (
  ref: UseOnClickOutsideType["ref"],
  handler: UseOnClickOutsideType["handler"]
) => {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      handler();
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
};

export default useOnClickOutside;
