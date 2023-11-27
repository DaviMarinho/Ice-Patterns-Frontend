import * as React from "react";
import { useEffect, useState } from "react";
import "./styles.css";
import SidebarNavbar from "../../components/SideBarNavBar";
import { Box, Image, Text, Progress } from "@chakra-ui/react";
import api from "../../config/axios";
import { useAuth } from "../../context/AuthContext";
import useSocket from "../../config/service/socketService";
import { toast } from "../../utils/toast";
import cuboGeloIcon from "../../assets/cubo-gelo-navbar.png";
import { BoosterContext } from "../../context/BoosterContext";


interface Mission {
  id: string;
  name: string;
  description: string;
  rewardBooster: number;
  rewardEnergy: number;
  rewardCube: number;
  rewardXp: number;
  unlocksOnLevel: string;
  createdAt: string;
  updatedAt: string;
}

interface UserMission {
  mission: Mission;
  progress: number;
  dateTimeStarted: string;
  dateTimeCompleted: string | null;
}

const QuestsPage: React.FC = () => {
  const [missions, setMissions] = useState<UserMission[]>([]);
  const { user } = useAuth();
  const { setBoosterActive } = React.useContext(BoosterContext);

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

      setBoosterActive(false);
    };


    socket.on("conquista", handleConquista);
    socket.on("missao", (dados) => handleMissao(dados));
    socket.on("booster desativar", handleBoosterDesativar);

    return () => {
      socket.off("conquista", handleConquista);
      socket.off("missao", handleMissao);
      socket.off("booster desativar", handleBoosterDesativar);
    };
  }, [socket, user]);

  async function postReceiveTradeItem(username: string, qtCube: number) {
    const response = await api.post("/receiveTradeItem", {
      username,
      qtCube,
      isReceiving: true,
    });
    return response.data;
  }

  useEffect(() => {
    const fetchMissions = async () => {
      try {
        if (!user || !user.email) {
          console.error("Email do usuário não disponível.");
          return;
        }
        const response = await api.get(
          `getUserMissions?username=${encodeURIComponent(user.username)}`
        );
        setMissions(response.data.missions);
      } catch (error) {
        console.error("Erro ao buscar missões:", error);
      }
    };

    fetchMissions();
  }, []);

  return (
    <>
      <SidebarNavbar />
      <Box className="container-quests">
        <Text className="text-title-quests">Missões</Text>
        {missions.map((userMission) => (
          <Box key={userMission.mission.id} className="item-quests">
            <Box className="texts-quests">
              <Text>{userMission.mission.description}</Text>
            </Box>
            <Box className="progress-throphy-quests">
              <Box className="progressBar-text-quests">
                <Text>{userMission.progress}%</Text>
                <Progress
                  value={userMission.progress}
                  className="progressBar-quests"
                />
              </Box>
              <Box className="quest-reward">
                <Image src={cuboGeloIcon} />
                {userMission.mission.rewardCube}
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    </>
  );
};

export default QuestsPage;
