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
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      w="100vw"
    >
      <Box
        mt="4rem"
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
      <Box mt="5rem" w="107.5rem" h="38rem" gap="1rem">
        {[...Array(36)].map((item, i) => (
          <Box
            px="2.4rem"
            alignItems="center"
            key={i}
            h="5.6rem"
            rounded="full"
            bg="#FFF"
            display="inline-flex"
            w="48%"
            mt="1.6rem"
            mx="0.8rem"
          >
            <Text fontSize="1.6rem" fontWeight="bold">
              Item
            </Text>
          </Box>
        ))}
      </Box>
    </Flex>
  );
}

export default App;
