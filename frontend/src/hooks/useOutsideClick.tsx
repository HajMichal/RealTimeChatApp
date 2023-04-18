import React, { useRef, useEffect } from "react";

interface OutsideClickHandlerProps {
  onOutsideClick: () => void;
  children: any
}

export const useOutsideClickHandler: React.FC<OutsideClickHandlerProps> = ({
  children,
  onOutsideClick,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onOutsideClick();
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onOutsideClick();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [onOutsideClick]);

  return <div ref={ref}>{children}</div>;
};

