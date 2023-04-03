import { Box, Image, Text } from "@chakra-ui/react";
import React from "react";
import { motion } from "framer-motion";
import btcSrc from "../assets/btc.png";

const Home = () => {
  return (
    <Box bgColor={"blackAlpha.900"} w={"full"} h={"85vh"}>
      <motion.div
        style={{ height: "80vh" }}
        animate={{
          // translateY: "20px",
          rotateY: "360deg",
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "linear",
          // repeatType: "reverse",
        }}
      >
        <Image
          src={btcSrc}
          h={"full"}
          w={"full"}
          objectFit={"contain"}
          filter={"grayscale(1)"}
        />
      </motion.div>
      <Text
        fontSize={"6xl"}
        textAlign={"center"}
        fontWeight={"thin"}
        color={"whiteAlpha.700"}
        my={"-20"}
      >
        Xcrypto
      </Text>
    </Box>
  );
};

export default Home;
