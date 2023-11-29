import * as React from "react";
import "./styles.css";
import SidebarNavbar from "../../components/SideBarNavBar";
import { Box, Image, Text } from "@chakra-ui/react";
import icebergFull from "../../assets/iceberg-full.png";
import cadeado from "../../assets/cadeado.png";
import { useAuth } from "../../context/AuthContext";
import api from "../../config/axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

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
      <SidebarNavbar />
      <Box className="container">
        <Box className="iceberg-niveis">
          <Image className="iceberg-full" src={icebergFull} />
          <Box className="niveis">
            {[1, 2, 3].map((nivel) => (
              <Box className="conjunto-nivel" key={nivel}>
                <Box
                  className="textLock"
                  onClick={() => navigate(`/nivel/${nivel}`)}
                >
                  {userInformations?.sublevel?.numLevel !== undefined &&
                    userInformations.sublevel.numLevel < nivel && (
                      <Image src={cadeado}/>
                      )}
                  <button className="button-nivel-pequeno" onClick={() => navigate(`/nivel/${userInformations?.sublevel.numLevel}`)}>
                    <Text className="textNivel">{`Nível ${nivel}`}</Text>
                    {/* {`Nível ${nivel}`} */}
                  </button>
                </Box>
                <div className="linha"></div>
              </Box>
            ))}
          </Box>
        </Box>

        <div className="button-container">
          <button className="button-nivel" onClick={() => navigate(`/nivel/${userInformations?.sublevel.numLevel}`)}>
            Vamos lá!
          </button>
        </div>
      </Box>
    </>
  );
};

export default HomePage;
