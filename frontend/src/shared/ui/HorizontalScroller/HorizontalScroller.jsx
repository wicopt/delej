import { useRef } from "react";
import Button from "../Button";

const HorizontalScroller = ({
  children,
  scrollStep = 250,
}) => {
  const containerRef = useRef(null);

  const scrollLeft = () => {
    containerRef.current?.scrollBy({
      left: -scrollStep,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    containerRef.current?.scrollBy({
      left: scrollStep,
      behavior: "smooth",
    });
  };

  return (
    <div className="horizontal-scroller">
      <Button onClick={scrollLeft} variant="secondary2">
        ←
      </Button>

      <div
        ref={containerRef}
        className="horizontal-scroller__content"
      >
        {children}
      </div>

      <Button onClick={scrollRight} variant="secondary2">
        →
      </Button>
    </div>
  );
};

export default HorizontalScroller;