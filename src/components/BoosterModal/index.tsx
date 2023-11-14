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

interface BoosterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BoosterModal: React.FC<BoosterModalProps> = ({ isOpen, onClose }) => {
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
        <div style={{ height: '2px', width: '400px', backgroundColor: '#4a8db7', margin: '1rem', borderRadius: '5px' }}></div>
        <ModalBody>
          <Text>
            Impulsionador que dobra o ganho de pontos de experiência por 15 minutos! Ao ativar um Booster, um cronômetro regressivo indicará o tempo restante de impulso.
          </Text>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Fechar
          </Button>
          <Button colorScheme="green">
            Ativar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default BoosterModal;
