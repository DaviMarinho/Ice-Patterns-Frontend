import * as React from "react";
import "./styles.css";
import SidebarNavbar from "../../components/SideBarNavBar";
import { Box, Image, Text, Spinner } from "@chakra-ui/react";
import icebergFull from "../../assets/iceberg-full.png";
import cadeado from "../../assets/cadeado.png";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Tooltip } from "react-tooltip";
import UserInformationContext from "../../context/UserContext";

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { userInformations } = useContext(
    UserInformationContext
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      if(!userInformations){
        setIsLoading(true);
      }
      
      setIsLoading(false);
    };

    fetchUser();
  }, [user, userInformations]);

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
