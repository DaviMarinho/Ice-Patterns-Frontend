import * as React from "react";
import { useEffect, useState } from "react";
import "./styles.css";
import SidebarNavbar from "../../components/SideBarNavBar";
import {
  Box,
  Image,
  Text,
  Progress,
  Skeleton,
  Stack,
  SkeletonText,
} from "@chakra-ui/react";
import api from "../../config/axios";
import { useAuth } from "../../context/AuthContext";
import cuboGeloIcon from "../../assets/cubo-gelo-navbar.png";

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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMissions = async () => {
      setIsLoading(true);
      if (!user || !user.email) {
        console.error("Email do usuário não disponível.");
        return;
      }
      try {
        const response = await api.get(
          `getUserMissions?username=${encodeURIComponent(user.username)}`
        );
        setMissions(response.data.missions);
      } catch (error) {
        console.error("Erro ao buscar missões:", error);
      }
      setIsLoading(false);
    };

    fetchMissions();
  }, [user]);

  if (isLoading) {
    return (
      <>
        <SidebarNavbar />
        <Box
          height="100vh"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Box
            width="650px"
            height="600px"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Stack justifyContent="center" alignItems="center">
              <Skeleton className="text-title-quests" borderRadius="10px">
              </Skeleton>
              <Skeleton
                height="131px"
                width="650px"
                borderRadius="10px"
                margin="0.25rem"
              />
              <Skeleton
                height="131px"
                width="650px"
                borderRadius="10px"
                margin="0.25rem"
              />
              <Skeleton
                height="131px"
                width="650px"
                borderRadius="10px"
                margin="0.25rem"
              />
            </Stack>
          </Box>
        </Box>
      </>
    );
  }

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
