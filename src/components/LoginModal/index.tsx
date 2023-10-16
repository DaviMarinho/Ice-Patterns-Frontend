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
import { useNavigate } from 'react-router-dom';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate()

  const handleLogin = () => {
    navigate('/home')
  };

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
          <Button className="button" onClick={handleLogin}>
            Entrar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default LoginModal;
