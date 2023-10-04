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

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader className="center">Login</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>Usuário:</Text>
          <Input placeholder="Digite seu usuário" mb={4} />

          <Text>Senha:</Text>
          <Input type="password" placeholder="Digite sua senha" mb={4} />
        </ModalBody>
        <ModalFooter className="center">
          <Button className="button">Entrar</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default LoginModal;
