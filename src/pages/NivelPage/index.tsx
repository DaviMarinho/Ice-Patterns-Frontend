import React, { useEffect, useState } from "react";
import { Box, Text, Image } from "@chakra-ui/react";
import SidebarNavbar from "../../components/SideBarNavBar";
import api from "../../config/axios";
import { useAuth } from "../../context/AuthContext";
import "./styles.css";
import fileIcon from "../../assets/file-signature-solid 1.png";
import circleQuestion from "../../assets/circle-question-solid 1.png";
import { Tooltip } from "react-tooltip";
import { useNavigate } from "react-router-dom";
import cadeado from "../../assets/cadeado.png";
import { userInfo } from "os";

const NivelPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [userInformations, setUserInformations] = useState<any>();
  const [sublevels, setSublevels] = useState<any[]>([]);

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
  }, []);

  const fetchSublevels = async () => {
    try {
      const response = await api.get(
        `getSublevelsPerLevel?levelId=${userInformations?.sublevel.numLevel}`
      );
      const fetchedSublevels = response.data.sublevels;

      if (fetchedSublevels) {
        setSublevels(fetchedSublevels);
      } else {
        console.error("Subníveis não encontrados na resposta da API.");
      }
    } catch (error) {
      console.error("Erro ao buscar subníveis:", error);
    }
  };

  useEffect(() => {
    fetchSublevels();
  }, [userInformations]);

  return (
    <>
      <Tooltip id="my-tooltip" />
      <SidebarNavbar />
      <Box className="container-nivel">
        <Box className="header">
          <Text
            fontSize="lg"
            className="text-header"
          >{`Nível ${userInformations?.sublevel?.numLevel}.${userInformations?.sublevel?.numSublevel}`}</Text>
          <Box className="header-buttons">
            <button
              className="button-header"
              disabled={userInformations?.sublevel?.numSublevel < 4}
              onClick={() =>
                userInformations?.sublevel?.numSublevel === 4 &&
                navigate("/exercise/" + userInformations?.sublevel.id)
              }
            >
              Desafio
            </button>
          </Box>
        </Box>

        <Box m={4}>
          {sublevels.slice(0, 3).map((sublevel, index) => (
            <Box className="tasks" key={index}>
              <Box className="box-tasks">
                <Text className="texts-tasks">{sublevel.name}</Text>
                <Box className="box-icons">
                  {userInformations &&
                  userInformations.sublevel &&
                  userInformations.sublevel.numSublevel !== undefined &&
                  userInformations.sublevel.numSublevel >=
                    sublevel.numSublevel ? (
                    <>
                      <Image
                        className="icons-tasks"
                        data-tooltip-id="my-tooltip"
                        data-tooltip-content="Conteúdo"
                        onClick={() => navigate("/content/" + sublevel.id)}
                        src={circleQuestion}
                      />
                      <Image
                        className="icons-tasks"
                        data-tooltip-id="my-tooltip"
                        data-tooltip-content="Exercícios"
                        onClick={() => navigate("/exercise/" + sublevel.id)}
                        src={fileIcon}
                      />
                    </>
                  ) : (
                    <Image
                      className="icons-tasks"
                      data-tooltip-id="my-tooltip"
                      data-tooltip-content="Bloqueado"
                      src={cadeado}
                    />
                  )}
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </>
  );
};

export default NivelPage;
