import React from "react";
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
import { useAuth } from "../../context/AuthContext";
import api from "../../config/axios";
import "./styles.css";
import { toast } from "../../utils/toast";

interface BoosterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BoosterModal: React.FC<BoosterModalProps> = ({ isOpen, onClose }) => {
  const { boosterActive, setBoosterActive, countdown, setCountdown } =
    React.useContext(BoosterContext);
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
        setCountdown(20);
      }
    } catch (error) {
      console.error("Erro ao ativar o booster:", error);
      toast.error("Não foi possível ativar o booster")
    }
  };

  // No BoosterModal.tsx

  React.useEffect(() => {
    let timerId: NodeJS.Timeout;

    if (countdown > 0) {
      timerId = setTimeout(() => {
        setCountdown(countdown - 1);
        localStorage.setItem("countdown", String(countdown - 1));
      }, 1000);
    } else if (countdown === 0 && boosterActive) {
      setBoosterActive(false);
      localStorage.setItem("boosterActive", "false");
    }

    return () => clearTimeout(timerId);
  }, [countdown, boosterActive, setBoosterActive, setCountdown]);

  // No início do componente, recupere os valores do localStorage

  React.useEffect(() => {
    const storedCountdown = localStorage.getItem("countdown");
    const storedBoosterActive = localStorage.getItem("boosterActive");

    if (storedCountdown) {
      setCountdown(Number(storedCountdown));
    }

    if (storedBoosterActive) {
      setBoosterActive(storedBoosterActive === "true");
    }
  }, []);

  // Função para formatar o tempo em minutos e segundos
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
        <Box className="booster-timer">
          {countdown > 0 && <Text>{formatTime(countdown)}</Text>}
        </Box>
        <ModalFooter>
          {boosterActive && (
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
