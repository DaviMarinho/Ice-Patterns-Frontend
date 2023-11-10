import * as React from "react";
import "./styles.css";
import SidebarNavbar from "../../components/SideBarNavBar";
import { Box, Image, Text, Button } from "@chakra-ui/react";
import perfil from "../../assets/circle-user-perfil.png";
import icicles from "../../assets/icicles-perfil.png";
import scroll from "../../assets/scroll-perfil.png";
import hearth from "../../assets/heart-perfil.png";
import { useAuth } from "../../context/AuthContext";
import { AxiosResponse } from "axios";
import  api from '../../config/axios';
import { useEffect, useState } from "react";

const PerfilPage: React.FC = () => {
  const { user } = useAuth();

  const [achievements, setAchievements] = useState([]);

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const { data }: AxiosResponse<any[]> = await api.get('getUserAchievements');
        console.log(data);
      } catch (error) {
        console.error("Erro ao buscar achievements:", error);
      }
    };

    fetchAchievements();
  }, []);

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
            <Text>Ver Todos</Text>
          </Box>

          {achievements.map((achievement: any, index: any) => (
            <Box key={index} className="item-perfil">
              <Image src={achievement.imageSrc}></Image>
              <Box className="texts-shop">
                <Text className="text-item">{achievement.description}</Text>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </>
  );
};

export default PerfilPage;