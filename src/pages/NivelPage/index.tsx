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
import useSocket from "../../config/service/socketService";
import { toast } from "../../utils/toast";
import { useParams } from "react-router-dom";
import { InfoIcon } from "@chakra-ui/icons";

const NivelPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [userInformations, setUserInformations] = useState<any>();
  const [sublevels, setSublevels] = useState<any[]>([]);
  const { levelId } = useParams();

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
        `getSublevelsPerLevel?levelId=${levelId}` // Use levelId to fetch the sublevels
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
  }, [levelId]);

  return (
    <>
      <Tooltip id="my-tooltip" />
      <SidebarNavbar />
      <Box className="container-nivel">
        <Box className="header">
          <Box>
            <Text
              fontSize="lg"
              className="text-header"
            >{`Seu nível: ${userInformations?.sublevel?.numLevel}.${userInformations?.sublevel?.numSublevel}`}</Text>
            <Text
              fontSize="lg"
              className="text-header"
            >{`Página atual: ${levelId}`}</Text>
          </Box>
          <Box className="header-buttons">
             <InfoIcon
                boxSize={8} // Ajuste o tamanho conforme necessário
                cursor="pointer"
                data-tooltip-id="my-tooltip"
                data-tooltip-content="Os conteúdos e exercícios são baseados em referências como Gamma et al e Refactoring Guru"
              />
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
                  userInformations.sublevel.numLevel !== undefined &&
                  userInformations.sublevel.numSublevel !== undefined &&
                  (userInformations.sublevel.numLevel > sublevel.numLevel ||
                    (userInformations.sublevel.numLevel === sublevel.numLevel &&
                      userInformations.sublevel.numSublevel >=
                        sublevel.numSublevel)) ? (
                    <>
                      <Image
                        className="icons-tasks"
                        data-tooltip-id="my-tooltip"
                        data-tooltip-content="Conteúdo"
                        onClick={() => navigate("/content/" + sublevel.id, { state: { levelId: sublevel.numLevel } })}
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
