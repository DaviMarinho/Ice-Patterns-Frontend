import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
	Input,
  Text,
} from "@chakra-ui/react";
import "./styles.css";

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RegisterModal: React.FC<RegisterModalProps> = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader className="center">Registro</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>Usuário:</Text>
          <Input placeholder="Digite seu usuário" mb={4} />

          <Text>Email:</Text>
          <Input type="email" placeholder="Email@email.com" mb={4} />

					<Text>Senha:</Text>
          <Input type="password" placeholder="Digite sua senha" mb={4} />

					<Text>Senha:</Text>
          <Input type="password" placeholder="Digite sua senha" mb={4} />
        </ModalBody>
        <ModalFooter className="center">
          <Button className="button">Registrar</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default RegisterModal;
