import * as React from "react";
import "./styles.css";
import SidebarNavbar from "../../components/SideBarNavBar";
import { Box, Image, Text, Spinner } from "@chakra-ui/react";
import icebergFull from "../../assets/iceberg-full.png";
import cadeado from "../../assets/cadeado.png";
import { useAuth } from "../../context/AuthContext";
import api from "../../config/axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Tooltip } from "react-tooltip";
interface Sublevel {
  id: string;
  numSublevel: number;
  numLevel: number;
  name: string;
}

interface UserInformation {
  username: string;
  email: string;
  name: string;
  qtBooster: number;
  qtEnergy: number;
  qtCube: number;
  qtXpOnLevel: number;
  qtXpTotal: number;
  sublevel: Sublevel;
}

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [userInformations, setUserInformations] = useState<UserInformation>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
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
  }, [user]);

  if (isLoading) {
    return (
      <>
        <SidebarNavbar />
        <Box
          className="container"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Spinner size="xl" />
        </Box>
      </>
    );
  }

  return (
    <>
      <Tooltip id="my-tooltip" />
      <SidebarNavbar />
      <Box className="container">
        <Box className="iceberg-niveis">
          <Image className="iceberg-full" src={icebergFull} />
          <Box className="niveis">
            {[1, 2, 3].map((nivel) => (
              <Box className="conjunto-nivel" key={nivel}>
                <Box
                  className="textLock"
                  onClick={() => {
                    if (
                      userInformations?.sublevel?.numLevel !== undefined &&
                      userInformations.sublevel.numLevel >= nivel
                    ) {
                      navigate(`/nivel/${nivel}`);
                    }
                  }}
                >
                  {userInformations?.sublevel?.numLevel !== undefined &&
                    userInformations.sublevel.numLevel < nivel && (
                      <Image src={cadeado} />
                    )}
                  {nivel === 3 ? (
                    <button
                      data-tooltip-id="my-tooltip"
                      data-tooltip-content="Módulo em construção, desculpe o transtorno."
                      className="button-nivel-pequeno"
                      onClick={() => {
                        if (
                          userInformations?.sublevel?.numLevel !== undefined &&
                          userInformations.sublevel.numLevel >= nivel
                        ) {
                          navigate(
                            `/nivel/${userInformations?.sublevel.numLevel}`
                          );
                        }
                      }}
                    >
                      <Text className="textNivel">{`Nível ${nivel}`}</Text>
                    </button>
                  ) : (
                    <button
                      className="button-nivel-pequeno"
                      onClick={() => {
                        if (
                          userInformations?.sublevel?.numLevel !== undefined &&
                          userInformations.sublevel.numLevel >= nivel
                        ) {
                          navigate(
                            `/nivel/${userInformations?.sublevel.numLevel}`
                          );
                        }
                      }}
                    >
                      <Text className="textNivel">{`Nível ${nivel}`}</Text>
                    </button>
                  )}
                </Box>
                <div className="linha"></div>
              </Box>
            ))}
          </Box>
        </Box>

        <div className="button-container">
          <button
            className="button-nivel"
            onClick={() =>
              navigate(`/nivel/${userInformations?.sublevel.numLevel}`)
            }
          >
            Vamos lá!
          </button>
        </div>
      </Box>
    </>
  );
};

export default HomePage;
