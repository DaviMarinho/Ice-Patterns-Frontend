import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import api from "../../config/axios/index";
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
import { toast } from '../../utils/toast';

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RegisterModal: React.FC<RegisterModalProps> = ({ isOpen, onClose }) => {
  const { signIn } = useAuth();
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleRegister = async () => {
    const { username, name, email, password, confirmPassword } = formData;
  
    if (password !== confirmPassword) {
      toast.error("As senhas não coincidem");
      return;
    }
  
    try {
      await api.post("create-user", {
        username,
        name,
        email,
        password,
        confirmPassword
      });
  
      toast.success("Registro bem-sucedido.");
  
      await signIn({ email, password });
  
      onClose();
    } catch (error) {
      toast.error("Erro ao registrar o usuário.");
    }
  };
  

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader className="center">Registro</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>Usuário:</Text>
          <Input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Digite seu usuário"
            mb={4}
          />

          <Text>Nome:</Text>
          <Input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Digite seu nome"
            mb={4}
          />

          <Text>Email:</Text>
          <Input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email@email.com"
            mb={4}
          />

          <Text>Senha:</Text>
          <Input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Digite sua senha"
            mb={4}
          />

          <Text>Confirmar Senha:</Text>
          <Input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Digite sua senha novamente"
            mb={4}
          />
        </ModalBody>
        <ModalFooter className="center">
          <Button onClick={handleRegister} className="button">
            Registrar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default RegisterModal;
