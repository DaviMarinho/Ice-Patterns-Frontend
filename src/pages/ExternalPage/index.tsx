import {
  Button,
  ChakraProvider,
  useDisclosure,
  Text,
  Image,
  Box,
  Divider,
} from "@chakra-ui/react";
import React from "react";
import LoginModal from "../../components/LoginModal";
import RegisterModal from "../../components/RegisterModal";
import "./styles.css";
import icebergLogo from "../../assets/iceberg-logo.png";
import icebergFull from "../../assets/iceberg-full.png";
import cuboGelo from "../../assets/Cubo-gelo-transparente-Icon.png";
import energiaCheia from "../../assets/Energia-cheia-Icon.png";
import energiaVazia from "../../assets/Energia-vazia-Icon.png";
import fireIcon from "../../assets/Fire-Icon.svg";
import xpIcon from "../../assets/XP-Icon.svg";

const ExternalPage: React.FC = () => {
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
          <Box className="topbar">
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
          />
        </Box>

        <Box className="center">
          <Image src={icebergFull} alt="iceberg" />
          <Box className="textsCenter">
            <Box className="iconTexts">
              <Image src={cuboGelo} />
              <Text className="text">
                Receba recompensas e troque por itens da loja
              </Text>
            </Box>
            <Box className="iconTexts">
              <Text className="text">
                Atente-se à energia que está utilizando para aprender
              </Text>
              <Image src={energiaCheia} />
              <Image src={energiaVazia} />
            </Box>
            <Box className="iconTexts">
              <Image className="icon" src={fireIcon} />
              <Text className="text">
                Adquira impulsionadores para acelerar sua aprendizagem
              </Text>
            </Box>
            <Box className="iconTexts">
              <Text className="text">
                Adquira experiência, complete desafios e avance de nível
              </Text>
              <Image className="icon" src={xpIcon} />
            </Box>
          </Box>
        </Box>
        <Box className="footer">
          <Text className="text">
            Explore níveis e aprenda Padrões de Projeto de software!
          </Text>
        </Box>
      </Box>

      <LoginModal isOpen={isLoginOpen} onClose={onLoginClose} />
      <RegisterModal isOpen={isRegisterOpen} onClose={onRegisterClose} />
    </ChakraProvider>
  );
};

export default ExternalPage;
