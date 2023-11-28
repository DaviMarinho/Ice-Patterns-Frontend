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
  FormControl,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useAuth } from "../../context/AuthContext";
import { CredentialUser } from "../../types/users.d";
import { SubmitHandler, useForm } from "react-hook-form";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// LoginModal.tsx
const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const { signIn } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CredentialUser>();

  const onSubmit: SubmitHandler<CredentialUser> = async ({
    email,  // Renomeado de identifier para email
    password,
  }) => {
    await signIn({ email, password });
    reset();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader className="center">Login</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit(onSubmit)} aria-label="form">
          <ModalBody>
            <FormControl isInvalid={!!errors.email}>
              <Box mb="7%">
                <Text>Email</Text>
                <Input
                  type="email"  // Alterado para type="email"
                  {...register("email", { required: true })}
                  placeholder="Digite seu email"  // Alterado de "usuário" para "email"
                />
                <FormErrorMessage>{errors.email && "Este campo é obrigatório"}</FormErrorMessage>
              </Box>
            </FormControl>

            <FormControl isInvalid={!!errors.password}>
              <Box mb="4%">
                <Text>Senha</Text>
                <Input
                  type="password"
                  {...register("password", { required: true })}
                  placeholder="Digite sua senha"
                />
                <FormErrorMessage>{errors.password && "Este campo é obrigatório"}</FormErrorMessage>
              </Box>
            </FormControl>
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

