import React, { useEffect, useState } from "react";
import { Box, Text, Button, Image, Progress } from "@chakra-ui/react";
import SidebarNavbar from "../../components/SideBarNavBar";
import api from "../../config/axios";
import { useAuth } from "../../context/AuthContext";
import "./styles.css";
import fileIcon from "../../assets/file-signature-solid 1.png";
import circleQuestion from "../../assets/circle-question-solid 1.png";
import { Tooltip } from 'react-tooltip'
import { useNavigate } from "react-router-dom";

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [userInformations, setUserInformations] = useState<any>();

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

  return (
    <>
      <Tooltip id="my-tooltip" />
      <SidebarNavbar />
      <Box className="container-nivel">
        <Box className="header">
          <Text
            fontSize="lg"
            className="text-header"
          >{`Nível ${userInformations?.sublevel?.numSublevel}`}</Text>
          <Box className="header-buttons">
            <button className="button-header">Exercícios Gerais</button>
            <button className="button-header">Desafio</button>
          </Box>
        </Box>

        <Box m={4}>
          <Box className="tasks">
            <Box className="box-tasks">
              <Text className="texts-tasks">Padrões de Projeto</Text>
              <Box className="box-icons">
                <Image className="icons-tasks" data-tooltip-id="my-tooltip" data-tooltip-content="Conteúdo" onClick={() => navigate('/content')} src={circleQuestion} />
                <Image className="icons-tasks" data-tooltip-id="my-tooltip" data-tooltip-content="Exercícios" onClick={() => navigate('/exercise')} src={fileIcon} />
              </Box>
            </Box>
          </Box>
          <Box className="tasks">
            <Box className="box-tasks">
              <Text className="texts-tasks">Singleton</Text>
              <Box className="box-icons">
                <Image className="icons-tasks" data-tooltip-id="my-tooltip" data-tooltip-content="Conteúdo" onClick={() => navigate('/content')} src={circleQuestion} />
                <Image className="icons-tasks" data-tooltip-id="my-tooltip" data-tooltip-content="Exercícios" onClick={() => navigate('/exercise')} src={fileIcon} />
              </Box>
            </Box>
          </Box>
          <Box className="tasks">
            <Box className="box-tasks">
              <Text className="texts-tasks">Facade</Text>
              <Box className="box-icons">
                <Image className="icons-tasks" data-tooltip-id="my-tooltip" data-tooltip-content="Conteúdo" onClick={() => navigate('/content')} src={circleQuestion} />
                <Image className="icons-tasks" data-tooltip-id="my-tooltip" data-tooltip-content="Exercícios" onClick={() => navigate('/exercise')} src={fileIcon} />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default HomePage;
