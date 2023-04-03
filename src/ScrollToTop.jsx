import { Box, Button } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { FaArrowAltCircleUp } from "react-icons/fa";

const ScrollToTop = () => {
  const [visibleScroll, setVisibleScroll] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 400) {
        setVisibleScroll(true);
      } else {
        setVisibleScroll(false);
      }
    });
  }, []);

  const scroll = () => {
    window.scrollTo({
      top: "0",
      behavior: "smooth",
    });
  };

  return (
    <Button
      pos={"fixed"}
      right={"4"}
      bottom={"56"}
      zIndex={1}
      variant={"unstyled"}
      onClick={scroll}
      visibility={!visibleScroll ? "hidden" : "none"}
    >
      <FaArrowAltCircleUp size={"md"} />
    </Button>
  );
};

export default ScrollToTop;
