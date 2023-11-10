import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
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
  Box,
} from "@chakra-ui/react";
import "./styles.css";
import { useAuth } from "../../context/AuthContext";
import { CredentialUser } from "../../types/users.d";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const { signIn } = useAuth();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CredentialUser>();

  const onSubmit: SubmitHandler<CredentialUser> = async ({
    identifier,
    password,
  }) => {
    await signIn({ identifier, password });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader className="center">Login</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit(onSubmit)} aria-label="form">
          <ModalBody>
            <Box mb="7%">
              <Text>Email</Text>
              <Input
                type="text"
                {...register("identifier", { required: true })}
                placeholder="Digite seu usuário"
              />
              {errors.identifier && (
                <span>
                  <Text color="red.400">Este campo é obrigatório</Text>
                </span>
              )}
            </Box>

            <Box mb="4%">
              <Text>Senha</Text>
              <Input
                type="password"
                {...register("password", { required: true })}
                placeholder="Digite sua senha"
              />
              {errors.password && (
                <span>
                  <Text color="red.400">Este campo é obrigatório</Text>
                </span>
              )}
            </Box>
          </ModalBody>
          <ModalFooter className="center">
            <Button type="submit" className="button">Entrar</Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default LoginModal;
