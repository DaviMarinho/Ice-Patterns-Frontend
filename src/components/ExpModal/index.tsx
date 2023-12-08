import React, { useContext } from "react";
import {
  Box,
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
import UserInformationContext from "../../context/UserContext";

interface XpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const XpModal: React.FC<XpModalProps> = ({ isOpen, onClose }) => {
  const { userInformations } = useContext(UserInformationContext);

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
            nessa barra de progresso. Ao chegar em 90%, você pode tentar o desafio
            para subir de nível.
          </Text>
          <Divider my={4} />
          <Text>Você possui {userInformations?.qtXpOnLevel} pontos de experiência no nível {userInformations?.sublevel.numLevel}.</Text>
        </ModalBody>
        <ModalFooter>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default XpModal;
