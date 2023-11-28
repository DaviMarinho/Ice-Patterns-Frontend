import * as React from "react";
import "./styles.css";
import SidebarNavbar from "../../components/SideBarNavBar";
import { Box, Image, Text } from "@chakra-ui/react";
import perfil from "../../assets/circle-user-perfil.png";
import icicles from "../../assets/iceberg-logo.png";
import { useAuth } from "../../context/AuthContext";
import api from "../../config/axios";
import { useEffect, useState } from "react";
import useSocket from "../../config/service/socketService";
import { toast } from "../../utils/toast";
import { BoosterContext } from "../../context/BoosterContext";
interface Achievement {
  id: string;
  name: string;
  description: string;
}

const PerfilPage: React.FC = () => {
  const { user } = useAuth();
   const { boosterState, boosterDispatch } = React.useContext(BoosterContext);

  const [achievements, setAchievements] = useState<Achievement[]>([]);

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
    const fetchAchievements = async () => {
      try {
        const response = await api.get(
          `getUserAchievements?username=${user?.username}`
        );
        const fetchedAchievements: Achievement[] =
          response.data.achievements.map(
            (achievement: any) => achievement.achievement
          );
        setAchievements(fetchedAchievements);
      } catch (error) {
        console.error("Erro ao buscar achievements:", error);
      }
    };

    fetchAchievements();
  }, [user?.username]);

  return (
    <>
      <SidebarNavbar />
      <Box className="container-perfil">
        <Box className="person-info">
          <Box className="">
            <Text className="title-perfil">Nome</Text>
            <Text className="info-perfil">{user?.name}</Text>
            <Text className="title-perfil">Username</Text>
            <Text className="info-perfil">{user?.username}</Text>
            <Text className="title-perfil">Email</Text>
            <Text className="info-perfil">{user?.email}</Text>
          </Box>
          <Image src={perfil}></Image>
        </Box>

        <Box className="achievements-perfil">
          <div className="divisao-perfil"></div>
          <Box className="texts-achievements">
            <Text>Conquistas</Text>
          </Box>

          <Box className="achievements-container">
            {achievements.map((achievement: Achievement, index: number) => (
              <Box key={index} className="item-perfil">
                <Image src={icicles}></Image>
                <Box className="texts-achievements">
                  <Text className="text-item">{achievement.description}</Text>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default PerfilPage;
