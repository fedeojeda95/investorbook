import { useState, useRef, useEffect } from "react";

export function useResizeObserver(ref) {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const observer = useRef(
    new ResizeObserver((entries) => {
      const [entry] = entries;
      if (entry) {
        const {
          contentRect: { width, height },
        } = entry;
        setWidth(width);
        setHeight(height);
      }
    })
  );

  useEffect(() => {
    if (ref.current) {
      observer.current.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.current.unobserve(ref.current);
      }
    };
  }, [ref, observer]);

  return { width, height };
}
