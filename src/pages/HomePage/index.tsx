import * as React from "react";
import "./styles.css";
import SidebarNavbar from "../../components/SideBarNavBar";
import { Box, Image, Text } from "@chakra-ui/react";
import icebergFull from "../../assets/iceberg-full.png";
import cadeado from "../../assets/cadeado.png";
import { useAuth } from "../../context/AuthContext";
import api from "../../config/axios";
import { useNavigate } from "react-router-dom";
import { toast } from "../../utils/toast";
import useSocket from "../../config/service/socketService";
import { useEffect, useState, useContext } from "react";
import { BoosterContext } from "../../context/BoosterContext";

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
  const { boosterState, boosterDispatch } = useContext(BoosterContext);
  const [userInformations, setUserInformations] = useState<UserInformation>();
  const socket = useSocket();

  useEffect(() => {
    
    if (!socket) return;

    if (!user || !user.email) {
      console.error("Email do usuário não disponível.");
      return;
    }

    const handleConquista = () => {
      console.log("Conquista recebida");
      toast.success("Nova conquista alcançada!");
    };

    const handleMissao = (dados: any) => {
      console.log("Missão recebida");
      toast.success("Você completou uma missão!");

      postReceiveTradeItem(user.username, dados.rewardCube);
    };

    const handleBoosterDesativar = () => {
      console.log("Booster desativado");
      toast.warning("Booster desativado.");

      boosterDispatch({ type: 'DEACTIVATE_BOOSTER' });
    };

    socket.on("conquista", handleConquista);
    socket.on("missao", (dados) => handleMissao(dados));
    socket.on("booster desativar", handleBoosterDesativar);

    return () => {
      socket.off("conquista", handleConquista);
      socket.off("missao", handleMissao);
      socket.off("booster desativar", handleBoosterDesativar);
    };
  }, [socket, user, boosterDispatch, boosterState]);

  async function postReceiveTradeItem(username: string, qtCube: number) {
    const response = await api.post("/receiveTradeItem", {
      username,
      qtCube,
      isReceiving: true,
    });
    return response.data;
  }

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
                  <Text className="textNivel">{`Nível ${nivel}`}</Text>
                  {userInformations?.sublevel?.numLevel !== undefined &&
                    userInformations.sublevel.numLevel < nivel && (
                      <Image src={cadeado} />
                    )}
                </Box>
                <div className="linha"></div>
              </Box>
            ))}
          </Box>
        </Box>

        <div className="button-container">
          <button className="button-nivel" onClick={() => navigate(`/nivel/${userInformations?.sublevel.numLevel}`)}>
            Nível
          </button>
        </div>
      </Box>
    </>
  );
};

export default HomePage;
