import * as React from "react";
import "./styles.css";
import SidebarNavbar from "../../components/SideBarNavBar";
import { Box, Image, Text } from "@chakra-ui/react";
import iceCubeShop from "../../assets/cubo-gelo-transparente-shop.png";
import energyShop from "../../assets/energia-cheia-shop.png";
import fireShop from "../../assets/fire-solid-shop.png";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import api from "../../config/axios";
import { toast } from "../../utils/toast";
import useSocket from "../../config/service/socketService";
import { BoosterContext } from "../../context/BoosterContext";

const ShopPage: React.FC = () => {
  const [userInformations, setUserInformations] = useState<any>();
  const { user } = useAuth();
   const { boosterState, boosterDispatch } = React.useContext(BoosterContext);
  
  const socket = useSocket();

  useEffect(() => {
    
    if (!socket) return;

    if (!user || !user.email) {
      console.error("Email do usuário não disponível.");
      return;
    }

    const handleConquista = () => {
      console.log("Conquista recebida");
      toast.success("Nova conquista alcançada!");
    };

    const handleMissao = (dados: any) => {
      console.log("Missão recebida");
      toast.success("Você completou uma missão!");

      postReceiveTradeItem(user.username, dados.rewardCube);
    };

    const handleBoosterDesativar = () => {
      console.log("Booster desativado");
      toast.warning("Booster desativado.");

      boosterDispatch({ type: 'DEACTIVATE_BOOSTER' });
    };

    socket.on("conquista", handleConquista);
    socket.on("missao", (dados) => handleMissao(dados));
    socket.on("booster desativar", handleBoosterDesativar);

    return () => {
      socket.off("conquista", handleConquista);
      socket.off("missao", handleMissao);
      socket.off("booster desativar", handleBoosterDesativar);
    };
  }, [socket, user, boosterDispatch, boosterState]);

  async function postReceiveTradeItem(username: string, qtCube: number) {
    const response = await api.post("/receiveTradeItem", {
      username,
      qtCube,
      isReceiving: true,
    });
    return response.data;
  }

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (!user || !user.email) {
          console.error("Email do usuário não disponível.");
          return;
        }

        const response = await api.get(
          `get-user?userEmail=${encodeURIComponent(user.email)}`
        );
        const fetchedUser = response.data;

        if (fetchedUser) {
          setUserInformations(fetchedUser);
        } else {
          console.error("Usuário não encontrado na resposta da API.");
        }
      } catch (error) {
        console.error("Erro ao buscar usuário:", error);
      }
    };

    fetchUser();
  }, [user]);

  const receiveTradeItem = async (qtCubo?: number) => {
    try {
      if (qtCubo === 150 && userInformations.qtEnergy < 5) {
        await api.post("/receiveTradeItem", {
          username: userInformations.username,
          qtCube: qtCubo,
          isReceiving: false,
        });
        await api.post("/receiveTradeItem", {
          username: userInformations.username,
          qtEnergy: 1,
          isReceiving: true,
        });
        toast.success("Energia recebida com sucesso!");

        // Atualiza as informações do usuário
        setUserInformations((prev: any) => ({
          ...prev,
          qtCube: prev.qtCube - qtCubo,
          qtEnergy: prev.qtEnergy + 1,
        }));
      } else if (qtCubo === 150 && userInformations.qtEnergy >= 5) {
        toast.warning("Você já possui 5 energias!");
      }
      if (qtCubo === 250) {
        await api.post("/receiveTradeItem", {
          username: userInformations.username,
          qtCube: qtCubo,
          isReceiving: false,
        });

        await api.post("/receiveTradeItem", {
          username: userInformations.username,
          qtBooster: 1,
          isReceiving: true,
        });
        toast.success("Booster recebido com sucesso!");

        // Atualiza as informações do usuário
        setUserInformations((prev: any) => ({
          ...prev,
          qtCube: prev.qtCube - qtCubo,
          qtBooster: prev.qtBooster + 1,
        }));
      }
    } catch (error: any) {
      toast.error(error.response.data.error);
    }
  };

  return (
    <>
      <SidebarNavbar />
      <Box className="container-shop">
        <Text className="text-title-shop">Loja</Text>
        <Box className="item-shop">
          <Image src={fireShop}></Image>
          <Box className="texts-shop">
            <Text>Energia</Text>
            <Text className="text-minor">As energias fazem com que...</Text>
          </Box>
          <Box
            style={{ cursor: "pointer" }}
            onClick={() => receiveTradeItem(150)}
            className="price-shop"
          >
            <Image src={iceCubeShop}></Image>
            <Text>150</Text>
          </Box>
        </Box>
        <Box className="item-shop">
          <Image src={energyShop}></Image>
          <Box className="texts-shop">
            <Text>Impulsionadores</Text>
            <Text className="text-minor">Impulsionadores são itens que...</Text>
          </Box>
          <Box
            style={{ cursor: "pointer" }}
            onClick={() => receiveTradeItem(250)}
            className="price-shop"
          >
            <Image src={iceCubeShop}></Image>
            <Text>250</Text>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ShopPage;
