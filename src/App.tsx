import { Box, Button, Flex, LinkOverlay, Text } from "@chakra-ui/react";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import "./App.css";

interface Res {
  error: boolean;
  message: string;
  status: string;
  url?: string;
}

function App() {
  useEffect(() => {
    document.title = "v18";
  }, []);

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();
  const [response, setResponse] = useState<Res>();
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

  const handleSend = useCallback(() => {
    if (acceptedFiles.length > 0) callApi();
    console.log(acceptedFiles[0]);
  }, [acceptedFiles]);

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
          {acceptedFiles.length > 0 ? (
            <>
              <Text display="inline-block" fontSize="2.4rem" fontWeight="bold">
                {acceptedFiles[0].name}
              </Text>
              <Text
                mx="auto"
                transform="translateY(-5px)"
                w="fit-content"
                fontSize="2rem"
                fontWeight="medium"
              >
                Size: {(acceptedFiles[0].size / 1024 / 1024).toFixed(2)} MB
              </Text>
              {response?.error === false && (
                <>
                  <Text fontSize="2.4rem" fontWeight="bold" color="#32CD32">
                    Upload Success
                  </Text>
                  <LinkOverlay
                    href={response?.url}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Text color="blue" fontSize="1.4rem" fontWeight="medium">
                      {response?.url}
                    </Text>
                  </LinkOverlay>
                </>
              )}
            </>
          ) : (
            <>
              <Box>
                <Text
                  display="inline-block"
                  fontSize="2.4rem"
                  fontWeight="bold"
                >
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
            </>
          )}
        </Flex>
        <Button
          hidden={acceptedFiles.length === 0}
          onClick={handleSend}
          color="#FFF"
          bg="#0E86D4"
          mt="20px"
          left="50%"
          transform="translate(-50%)"
          w="fit-content"
          p="28px 36px"
          rounded="full"
          fontSize="2rem"
          fontWeight="BOLD"
        >
          UPLOAD
        </Button>
        <input type="file" {...getInputProps()} />
      </Box>
    </Flex>
  );
}

export default App;
