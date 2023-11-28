import React, { useContext, useEffect } from "react";
import {
  Box,
  Button,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Image,
} from "@chakra-ui/react";
import fireIcon from "../../assets/fire-navbar.png";
import { BoosterContext } from "../../context/BoosterContext";
import api from "../../config/axios";
import "./styles.css";
import { toast } from "../../utils/toast";
import { useAuth } from "../../context/AuthContext";

interface BoosterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BoosterModal: React.FC<BoosterModalProps> = ({ isOpen, onClose }) => {
  const { boosterState, boosterDispatch } = useContext(BoosterContext);
  const { user } = useAuth();

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;

    if (boosterState.boosterActive && boosterState.countdown > 0) {
      intervalId = setInterval(() => {
        boosterDispatch({ type: 'DECREMENT_COUNTDOWN' });
      }, 1000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [boosterState.boosterActive, boosterState.countdown, boosterDispatch]);

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
        boosterDispatch({ type: "ACTIVATE_BOOSTER", countdown: 25 });
      }
    } catch (error) {
      console.error("Erro ao ativar o impulsionador:", error);
      toast.error("Não foi possível ativar o impulsionador.");
    }
  };

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${
      remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds
    }`;
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <HStack spacing="2">
            <Image src={fireIcon} />
            <Text fontSize="lg">Impulsionador</Text>
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
            um impulsionador, um cronômetro regressivo indicará o tempo restante de
            impulso.
          </Text>
        </ModalBody>
        <Box className="booster-timer">
          {boosterState.boosterActive && <Text>{formatTime(boosterState.countdown)}</Text>}
        </Box>
        <ModalFooter>
          {!boosterState.boosterActive && (
            <Button colorScheme="green" onClick={handleActivate}>
              Ativar
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default BoosterModal;
