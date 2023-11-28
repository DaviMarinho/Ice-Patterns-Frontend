// SocketContext.tsx
import React, { createContext, useContext, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { toast } from "../utils/toast";
import { BoosterContext } from "./BoosterContext";
import api from "../config/axios";
import useSocket from '../config/service/socketService';

const SocketContext = createContext<any>(useSocket);

export const SocketProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const { user } = useAuth();
  const { boosterDispatch } = useContext(BoosterContext);
  const socket = useSocket();

  useEffect(() => {
    if (!user || !user.email) {
      console.error("Email do usuário não disponível.");
      return;
    }

    if (socket) {
      console.log("Configurando ouvintes de eventos...");

      const handleConquista = () => {
        console.log("Conquista recebida");
        toast.success("Nova conquista alcançada!");
      };

      const handleMissao = (dados: any) => {
        console.log("Missão recebida", dados);
        toast.success("Você completou uma missão!");
        console.log(dados.cubeReward);
      
        postReceiveTradeItem(user?.username, dados.cubeReward);
      };

      const handleBoosterDesativar = () => {
        console.log("Impulsionador desativado");
        toast.warning("Impulsionador desativado.");

        boosterDispatch({ type: "DEACTIVATE_BOOSTER" });
      };

      socket.on("conquista", handleConquista);
      socket.on("missao", handleMissao);
      socket.on("booster desativar", handleBoosterDesativar);

      return () => {
        socket.off("conquista", handleConquista);
        socket.off("missao", handleMissao);
        socket.off("booster desativar", handleBoosterDesativar);
      };
    }
  }, [socket, user, boosterDispatch]);

  async function postReceiveTradeItem(username: string, qtCube: number) {
    try {
      const response = await api.post("/receiveTradeItem", {
        username,
        qtCube,
        isReceiving: true,
      });
      return response.data;
    } catch (error) {
      console.error("Erro ao processar trade item:", error);
    }
  }

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};