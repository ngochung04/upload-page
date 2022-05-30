import { Box, Flex, Image, Text } from "@chakra-ui/react";
import axios from "axios";
import React, { useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import "./App.css";

function App() {
  useEffect(() => {
    document.title = "v18";
  }, []);

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

  useEffect(() => {
    callApi();
  }, []);

  const callApi = useCallback(async () => {
    const formData = new FormData();
    acceptedFiles && formData.append("file", acceptedFiles[0]);
    try {
      const response = await axios({
        method: "post",
        url: "https://hungdn.fun/upload.php",
        data: {
          file: acceptedFiles[0],
        },
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
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
        {...getRootProps({ className: "dropzone" })}
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

        <input type="file" {...getInputProps()} />
      </Box>
    </Flex>
  );
}

export default App;
