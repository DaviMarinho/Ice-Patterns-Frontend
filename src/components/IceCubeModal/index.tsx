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
  Divider,
} from "@chakra-ui/react";
import cuboGeloIcon from "../../assets/cubo-gelo-navbar.png";

interface CuboGeloModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CuboGeloModal: React.FC<CuboGeloModalProps> = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Box display="flex" alignItems="center">
            <Image src={cuboGeloIcon} />
            <Text fontSize="lg" ml={2}>
              Cubo de Gelo
            </Text>
          </Box>
        </ModalHeader>
        <ModalCloseButton />
        <div style={{ height: '2px', width: '400px', backgroundColor: '#4a8db7', margin: '1rem', borderRadius: '5px' }}></div>
        <ModalBody>
          <Text>
            Cubos de gelo podem ser trocados por outros recursos na loja.
            Compre impulsionadores ou recarregue suas energias!
          </Text>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Fechar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CuboGeloModal;
