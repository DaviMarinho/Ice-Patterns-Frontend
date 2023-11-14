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
import energiaIcon from "../../assets/Energia-cheia-Icon.png"
import { useAuth } from "../../context/AuthContext";

interface EnergiaModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EnergiaModal: React.FC<EnergiaModalProps> = ({ isOpen, onClose }) => {
  const { user } = useAuth();

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Box display="flex" alignItems="center">
            <Image src={energiaIcon} />
            <Text fontSize="lg" ml={2}>
              Energia
            </Text>
          </Box>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>
            Se suas energias esgotarem, você não conseguirá praticar. Você
            pode aguardar as energias recarregarem, ou então, você pode
            recarregá-las na loja.
          </Text>
          <Divider my={4} />
          <Text>
            Próxima energia recarrega em user?.recharge.
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

export default EnergiaModal;
