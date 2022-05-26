import { Box, Flex, Image, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import "./App.css";

function App() {
  useEffect(() => {
    document.title = "v18";
  }, []);

  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      bg="#e9f3fe"
      w="100vw"
      h="100vh"
    >
      <Box
        mt="-16rem"
        w="107.5rem"
        h="38rem"
        bg="white"
        rounded="5rem"
        p="5.2rem"
      >
        <Flex
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          border="4px dashed #CEDAE6"
          w="100%"
          h="100%"
          rounded="2.4rem"
        >
          <Image src="" />

          <Box>
            <Text display="inline-block">Drop your file here, or</Text>
            <Text display="inline-block">browse</Text>
          </Box>
          <Box>
            <Text w="fit-content">Supports: All</Text>
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
}

export default App;
