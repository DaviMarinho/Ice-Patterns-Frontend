import * as React from "react";
import { useEffect, useState } from "react";
import "./styles.css";
import SidebarNavbar from "../../components/SideBarNavBar";
import { Box, Image, Text, Progress } from "@chakra-ui/react";
import throphy from "../../assets/throphy-quests.png";
import api from "../../config/axios";
import { useAuth } from "../../context/AuthContext";
import useSocket from "../../config/service/socketService";
import { toast } from "../../utils/toast";

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

  const socket = useSocket();

  useEffect(() => {
    if (!socket) return;
  
    const handleConquista = () => {
      console.log("Conquista recebida");
      toast.success("Nova conquista desbloqueada.");
    };
  
    const handleMissao = () => {
      console.log("Missão recebida");
      toast.success("Nova missão recebida.");
    };
  
    const handleBoosterDesativar = () => {
      console.log("Booster desativado");
      toast.warning("Booster desativado.");
    };
  
    socket.on("conquista", handleConquista);
    socket.on("missao", handleMissao);
    socket.on("booster desativar", handleBoosterDesativar);
  
    return () => {
      socket.off("conquista", handleConquista);
      socket.off("missao", handleMissao);
      socket.off("booster desativar", handleBoosterDesativar);
    };
  }, [socket]);

  useEffect(() => {
    const fetchMissions = async () => {
      try {
        if (!user || !user.email) {
          console.error("Email do usuário não disponível.");
          return;
        }
        const response = await api.get(`getUserMissions?username=${encodeURIComponent(user.username)}`);
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
                <Progress value={userMission.progress} className="progressBar-quests" />
              </Box>
              <Image src={throphy}></Image>
            </Box>
            <Box>
            {userMission.mission.rewardCube}
            </Box>
          </Box>
        ))}
      </Box>
    </>
  );
};

export default QuestsPage;