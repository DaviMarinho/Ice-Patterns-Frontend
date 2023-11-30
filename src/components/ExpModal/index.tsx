import React, { useEffect, useState } from "react";
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
  Divider,
} from "@chakra-ui/react";
import xpIcon from "../../assets/XP-Icon.svg";
import api from "../../config/axios";
import { useAuth } from "../../context/AuthContext";

interface XpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface UserXP {
  username: string;
  email: string;
  qtBooster: number;
  qtEnergy: number;
  qtCube: number;
  qtXpOnLevel: number;
  qtXpTotal: number;
  sublevel: {
    id: number;
    numSublevel: number;
    numLevel: number;
    name: string;
  };
}

const XpModal: React.FC<XpModalProps> = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const [userXP, setUserXP] = useState<UserXP | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get<UserXP>(
          `get-user?userEmail=${user?.email}`
        );
        const fetchedUser = response.data;
        setUserXP(fetchedUser);
      } catch (error) {
        console.error("Erro ao buscar User:", error);
      }
    };

    if (user?.email) {
      fetchUser();
    }
  }, [user?.email]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        style={{
          zIndex: 9999,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ModalHeader>
          <Box display="flex" alignItems="center">
            <Image src={xpIcon} />
            <Text fontSize="lg" ml={2}>
              Pontos de Experiência no Nível Atual
            </Text>
          </Box>
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
            Seus pontos comprovam o quanto você já estudou! São apresentados
            nessa barra de progresso. Ao completá-la, você pode tentar o desafio
            para subir de nível.
          </Text>
          <Divider my={4} />
          <Text>Você possui {userXP?.qtXpOnLevel} pontos de experiência no nível {userXP?.sublevel.numLevel}.</Text>
        </ModalBody>
        <ModalFooter>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default XpModal;
