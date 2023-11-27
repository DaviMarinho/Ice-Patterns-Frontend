import React from "react";
import {
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Image,
  Text,
  HStack,
} from "@chakra-ui/react";
import fireIcon from "../../assets/fire-navbar.png";
import axios from "axios";
import { BoosterContext } from "../../context/BoosterContext";
import { useAuth } from "../../context/AuthContext";
import api from "../../config/axios";
import "./styles.css";

interface BoosterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BoosterModal: React.FC<BoosterModalProps> = ({ isOpen, onClose }) => {
  const { boosterActive, setBoosterActive, countdown, setCountdown } = React.useContext(BoosterContext);
  const { user } = useAuth();

  const handleActivate = async () => {
    try {
      if (!user || !user.email) {
        console.error("Usuário não disponível.");
        return;
      }

      const response = await api.post("/activateBooster", {
        username: user.username,
      });
      
      if (response.status === 200) {
        setBoosterActive(true);
        setCountdown(300);
      }
    } catch (error) {
      console.error("Erro ao ativar o booster:", error);
    }
  };

  React.useEffect(() => {
    let timerId: NodeJS.Timeout;

    if (countdown > 0) {
      timerId = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (countdown === 0 && boosterActive) {
      setBoosterActive(false);
    }

    return () => clearTimeout(timerId);
  }, [countdown, boosterActive, setBoosterActive]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <HStack spacing="2">
            <Image src={fireIcon} />
            <Text fontSize="lg">Booster</Text>
          </HStack>
        </ModalHeader>
        <ModalCloseButton />
        <div
          style={{
            height: "2px",
            width: "400px",
            backgroundColor: "#4a8db7",
            margin: "1rem",
            borderRadius: "5px",
          }}
        ></div>
        <ModalBody>
          <Text>
            Impulsionador que dobra o ganho de cubos por 15 minutos! Ao ativar
            um Booster, um cronômetro regressivo indicará o tempo restante de
            impulso.
          </Text>
        </ModalBody>
          <Box className="booster-timer">{countdown > 0 && <Text>{countdown}</Text>}</Box>
        <ModalFooter>
          <Button disabled={boosterActive} colorScheme="green" onClick={handleActivate}>
            Ativar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default BoosterModal;
