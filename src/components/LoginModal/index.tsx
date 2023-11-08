import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importe useHistory do React Router
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
import { useAuth } from "../../context/AuthContext";
import { api } from "../../config/axios/index";
import Message from "../Message"; // Importe o componente de mensagem

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const { dispatch } = useAuth();
  const navigate = useNavigate(); // Obtenha o objeto de histórico do React Router
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      const response = await api.post("login", formData);
      dispatch({
        type: "LOGIN",
        payload: {
          user: response.data.user,
          token: response.data.token,
        },
      });
      setSuccessMessage("Login bem-sucedido!"); // Define a mensagem de sucesso
      setErrorMessage(""); // Limpa a mensagem de erro
      navigate("/HomePage"); // Redireciona para a página "/HomePage"
    } catch (error) {
      setSuccessMessage(""); // Limpa a mensagem de sucesso
      setErrorMessage("Erro ao fazer login. Verifique suas credenciais."); // Define a mensagem de erro
      console.error(error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader className="center">Login</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {successMessage && <Message message={successMessage} isSuccess />}
          {errorMessage && <Message message={errorMessage} isSuccess={false} />}

          <Text>Usuário:</Text>
          <Input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Digite seu usuário"
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
