import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Text,
  Image,
  Skeleton,
  Stack,
} from "@chakra-ui/react";
import SidebarNavbar from "../../components/SideBarNavBar";
import api from "../../config/axios";
import { useAuth } from "../../context/AuthContext";
import "./styles.css";
import fileIcon from "../../assets/file-signature-solid 1.png";
import circleQuestion from "../../assets/circle-question-solid 1.png";
import { Tooltip } from "react-tooltip";
import { useNavigate } from "react-router-dom";
import cadeado from "../../assets/cadeado.png";
import { toast } from "../../utils/toast";
import { useParams } from "react-router-dom";
import { InfoIcon } from "@chakra-ui/icons";
import UserInformationContext from "../../context/UserContext";

const NivelPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { userInformations, setUserInformations } = useContext(
    UserInformationContext
  );
  const [sublevels, setSublevels] = useState<any[]>([]);
  const { levelId } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!userInformations) {
      return;
    }

    const fetchUser = async () => {
      setIsLoading(true);
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
      setIsLoading(false);
    };

    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    const fetchSublevels = async () => {
      setIsLoading(true);
      try {
        const response = await api.get(
          `getSublevelsPerLevel?levelId=${levelId}`
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
      setIsLoading(false);
    };

    fetchSublevels();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [levelId]);

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
            padding="10px"
            bg="white"
            borderRadius="10px"
            display="flex"
              justifyContent="center"
              alignItems="center"
          >
            <Stack
              padding="10px"
              width="600px"
              justifyContent="center"
              alignItems="center"
            >
              <Skeleton height="50px" width="650px" borderRadius="10px" />
              <Skeleton margin="2rem" height="131px" width="650px" borderRadius="10px" />
              <Skeleton margin="2rem" height="131px" width="650px" borderRadius="10px" />
              <Skeleton margin="2rem" height="131px" width="650px" borderRadius="10px" />
            </Stack>
          </Box>
        </Box>
      </>
    );
  }

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
              boxSize={8}
              cursor="pointer"
              data-tooltip-id="my-tooltip"
              data-tooltip-content="Os conteúdos e exercícios são baseados em referências como Gamma et al (1995) e Refactoring Guru"
            />
            <button
              className="button-header"
              data-tooltip-id="my-tooltip"
              data-tooltip-content={`Complete o desafio para subir para o nível ${
                userInformations?.sublevel?.numLevel != null
                  ? userInformations.sublevel.numLevel + 1
                  : "Indisponível"
              }`}
              disabled={
                false ||
                (userInformations &&
                  userInformations.sublevel &&
                  userInformations.sublevel.numSublevel < 4)
              }
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
                        onClick={() =>
                          navigate("/content/" + sublevel.id, {
                            state: { levelId: sublevel.numLevel },
                          })
                        }
                        src={circleQuestion}
                      />
                      <Image
                        className="icons-tasks"
                        data-tooltip-id="my-tooltip"
                        data-tooltip-content="Exercícios"
                        onClick={() => {
                          if (userInformations?.qtEnergy < 1) {
                            toast.warning(
                              "Você precisa de energia para fazer exercícios."
                            );
                          } else {
                            navigate("/exercise/" + sublevel.id, {
                              state: { levelId: sublevel.numLevel },
                            });
                          }
                        }}
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
