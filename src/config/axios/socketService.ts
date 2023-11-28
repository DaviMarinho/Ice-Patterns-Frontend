// useSocket.ts
import { io, Socket } from "socket.io-client";
import { useAuth } from "../../context/AuthContext";

let socket: Socket | null = null;

const useSocket = () => {
  const { user } = useAuth();

  if (!user || !user.email) {
    console.error("Email do usuário não disponível.");
    return null; // Retornando null quando o usuário ou o email não estão disponíveis
  }

  return initializeSocket(user.username);
};

const initializeSocket = (token: string) => {
  if (!socket) {
    socket = io("https://icepatterns-backend-bd993106e512.herokuapp.com", {
      auth: {
        token: token,
      },
    });
  }

  return socket;
};

export default useSocket;
