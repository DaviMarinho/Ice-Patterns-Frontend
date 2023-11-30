import * as React from "react";
import "./styles.css";
import SidebarNavbar from "../../components/SideBarNavBar";
import { Box, Image, Skeleton, Stack, Text } from "@chakra-ui/react";
import perfil from "../../assets/circle-user-perfil.png";
import icicles from "../../assets/iceberg-logo.png";
import { useAuth } from "../../context/AuthContext";
import api from "../../config/axios";
import { useEffect, useState } from "react";
interface Achievement {
  id: string;
  name: string;
  description: string;
}

const PerfilPage: React.FC = () => {
  const { user } = useAuth();
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAchievements = async () => {
      setIsLoading(true);
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
      setIsLoading(false);
    };

    fetchAchievements();
  }, [user?.username]);

  if (isLoading) {
    return (
      <>
        <SidebarNavbar />
        <Box className="container-perfil">
          <Box className="person-info">
            <Box className="">
              <Text className="title-perfil">Nome</Text>
              <Skeleton height="20px" />
              <Text className="title-perfil">Username</Text>
              <Skeleton height="20px" />
              <Text className="title-perfil">Email</Text>
              <Skeleton height="20px" />
            </Box>
            <Image src={perfil}></Image>
          </Box>

          <Box className="achievements-perfil">
            <div className="divisao-perfil"></div>

            <Stack justifyContent="center" alignItems="flex-start">
              <Skeleton
                height="50px"
                width="150px"
                borderRadius="10px"
              ></Skeleton>
              <Skeleton
                height="118px"
                width="600px"
                borderRadius="10px"
                margin="0.25rem"
              />
              <Skeleton
                height="118px"
                width="600px"
                borderRadius="10px"
                margin="0.25rem"
              />
              <Skeleton
                height="118px"
                width="600px"
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
            {[...achievements].reverse().map((achievement: Achievement, index: number) => (
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
