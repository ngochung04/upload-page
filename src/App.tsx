import { Box, Button, Flex, Text } from "@chakra-ui/react";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import "./App.css";

function App() {
  useEffect(() => {
    document.title = "v18";
  }, []);

  const { acceptedFiles, getRootProps, getInputProps, rootRef } = useDropzone();
  const [response, setResponse] = useState<any>(null);
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
      setResponse(response.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleSend = () => {
    if (acceptedFiles.length > 0) callApi();
  };

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
          {...getRootProps({ className: "dropzone" })}
          cursor="pointer"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          border="4px dashed #CEDAE6"
          w="100%"
          h="100%"
          rounded="2.4rem"
        >
          <Box>
            <Text display="inline-block" fontSize="2.4rem" fontWeight="bold">
              Drop your file here, or
            </Text>
            <Text
              ml="8px"
              display="inline-block"
              fontSize="2.4rem"
              fontWeight="bold"
              color="#0E86D4"
            >
              browse
            </Text>
          </Box>
          <Text
            mx="auto"
            transform="translateY(-5px)"
            w="fit-content"
            fontSize="2rem"
            fontWeight="medium"
          >
            Supports: All
          </Text>

          <Button
            onClick={handleSend}
            color="#0E86D4"
            mt="20px"
            p="20px 28px"
            fontSize="2rem"
            fontWeight="medium"
          >
            upload
          </Button>
        </Flex>
        {response}
        <input type="file" {...getInputProps()} />
      </Box>
    </Flex>
  );
}

export default App;
