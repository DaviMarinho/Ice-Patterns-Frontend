import {
  Button,
  ChakraProvider,
  useDisclosure,
  Text,
  Image,
  Box,
  Divider,
  Center,
} from "@chakra-ui/react";
import React from "react";
import LoginModal from "../../components/LoginModal";
import RegisterModal from "../../components/RegisterModal";
import "./styles.css";
import icebergLogo from "../../assets/iceberg-logo.png";

const HomePage: React.FC = () => {
  const {
    isOpen: isLoginOpen,
    onOpen: onLoginOpen,
    onClose: onLoginClose,
  } = useDisclosure();
  const {
    isOpen: isRegisterOpen,
    onOpen: onRegisterOpen,
    onClose: onRegisterClose,
  } = useDisclosure();

  return (
    <ChakraProvider>
      <Box className="content">
        <Box className="top">
          <Box className="logo">
            <Text>IcePatterns</Text>
            <Image src={icebergLogo} alt="iceberg" />
          </Box>

          <Box className="button">
            <Button mr={4} onClick={onLoginOpen}>
              Entrar
            </Button>
            <Button onClick={onRegisterOpen}>Registrar-se</Button>
          </Box>
        </Box>

        <Divider
          orientation="horizontal"
          my={4}
          bg="white"
          borderWidth="1px"
          w="85%"
        />
      </Box>

      <LoginModal isOpen={isLoginOpen} onClose={onLoginClose} />
      <RegisterModal isOpen={isRegisterOpen} onClose={onRegisterClose} />
    </ChakraProvider>
  );
};

export default HomePage;
