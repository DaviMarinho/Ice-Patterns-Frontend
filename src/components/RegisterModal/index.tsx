import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { api } from "../../config/axios/index";
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
  const { dispatch } = useAuth();
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [successMessage, setSuccessMessage] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    try {
      const response = await api.post("create-user", formData);
      dispatch({
        type: "LOGIN",
        payload: {
          user: response.data.user,
          token: response.data.token,
        },
      });
      setSuccessMessage(true); // Exibe a mensagem de sucesso
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader className="center">Registro</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {successMessage ? ( // Renderiza a mensagem de sucesso se for verdadeira
            <Text>Sucesso! Usuário criado com êxito.</Text>
          ) : (
            <>
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
              ></Input>

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

              <Text>Senha:</Text>
              <Input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Digite sua senha"
                mb={4}
              />
            </>
          )}
        </ModalBody>
        <ModalFooter className="center">
          {successMessage ? ( // Renderiza o botão de fechar se a mensagem de sucesso for verdadeira
            <Button onClick={onClose} className="button">
              Fechar
            </Button>
          ) : (
            <Button onClick={handleRegister} className="button">
              Registrar
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default RegisterModal;
