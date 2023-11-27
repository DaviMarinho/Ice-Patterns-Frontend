import { io, Socket } from "socket.io-client";
import { useAuth } from "../../context/AuthContext";

let socket: Socket | null = null;

const initializeSocket = (token: string) => {
  if (!socket) {
    socket = io("http://localhost:4001", {
      auth: {
        token: token,
      },
    });
  }

  return socket;
};

const useSocket = () => {
  const { user } = useAuth();

  if (!user || !user.email) {
    console.error("Email do usuário não disponível.");
    return;
  }

  return initializeSocket(user.username);
};

export default useSocket;
