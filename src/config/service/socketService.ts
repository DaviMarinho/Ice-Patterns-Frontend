// useSocket.ts
import { io, Socket } from "socket.io-client";
import { useAuth } from "../../context/AuthContext";

let socket: Socket | null = null;

const useSocket = () => {
  const { user } = useAuth();

  if (!user || !user.username) {
    console.error("Usuário não disponível.");
    return null;
  }

  if (!socket) {
    socket = io("https://icepatterns-backend-bd993106e512.herokuapp.com", {
      auth: {
        token: user.username,
      },
    });
  }

  return socket;
};

export default useSocket;
