import { useContext, useEffect, useState } from "react";
import { Box, Text, HStack, Progress, Image } from "@chakra-ui/react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./styles.css";
import icebergLogo from "../../assets/iceberg-logo-sidebar.png";
import homeIcon from "../../assets/house-sidebar.png";
import questIcon from "../../assets/question-sidebar.png";
import storeIcon from "../../assets/shop-sidebar.png";
import userIcon from "../../assets/perfil-sidebar.png";
import logoutIcon from "../../assets/logout-sidebar.png";
import fireIcon from "../../assets/fire-navbar.png";
import energiaCheiaIcon from "../../assets/energia-cheia-navbar.png";
import energiaVaziaIcon from "../../assets/energia-vazia-navbar.png";
import cuboGeloIcon from "../../assets/cubo-gelo-navbar.png";
import { useAuth } from "../../context/AuthContext";
import BoosterModal from "../BoosterModal";
import XpModal from "../ExpModal";
import EnergiaModal from "../EnergyModal";
import CuboGeloModal from "../IceCubeModal";
import api from "../../config/axios";
import UserInformationContext from "../../context/UserContext";
import { Tooltip } from "react-tooltip";

const SidebarNavbar = () => {
  const { signOut, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [isBoosterModalOpen, setIsBoosterModalOpen] = useState(false);
  const [isXpModalOpen, setIsXpModalOpen] = useState(false);
  const [isEnergiaModalOpen, setIsEnergiaModalOpen] = useState(false);
  const [isCuboGeloModalOpen, setIsCuboGeloModalOpen] = useState(false);

  const { userInformations, setUserInformations } = useContext(
    UserInformationContext
  );
  const [shouldFetchUser, setShouldFetchUser] = useState(true);

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
      setShouldFetchUser(false);
    };

    fetchUser();
  }, [user, shouldFetchUser]);

  useEffect(() => {
    setShouldFetchUser(true);
  }, [
    userInformations?.qtBooster,
    userInformations?.qtEnergy,
    userInformations?.qtCube,
  ]);

  return (
    <>
      <Box className="sidebar">
        <Link className="logoSidebar" to="/">
          <Image src={icebergLogo} />
        </Link>

        <Box className="sidebarContentUpper">
          <Link className="sidebarLink" to="/">
            <Image className="iconsSidebar" src={homeIcon} />
            <Text fontSize="lg">Início</Text>
          </Link>
          <Link className="sidebarLink" to="/quests">
            <Image className="iconsSidebar" src={questIcon} />
            <Text fontSize="lg">Missões</Text>
          </Link>
          <Link className="sidebarLink" to="/shop">
            <Image className="iconsSidebar" src={storeIcon} />
            <Text fontSize="lg">Loja</Text>
          </Link>
        </Box>
        <Box className="sidebarContentLower">
          <Link className="sidebarLink" to="/perfil">
            <Image className="iconsSidebar" src={userIcon} />
            <Text fontSize="lg">Perfil</Text>
          </Link>
          <Link className="sidebarLink" to="/" onClick={signOut}>
            <Image className="iconsSidebar" src={logoutIcon} />
            <Text fontSize="lg">Sair</Text>
          </Link>
        </Box>
      </Box>

      <Box className="navbar">
        <Tooltip id="navbar-tooltip" />
        <Box
          className="progressBarContent"
          onClick={() => setIsXpModalOpen(true)}
          data-tooltip-id="navbar-tooltip"
          data-tooltip-content="Seu progresso"
        >
          <Box className="progressBarTexts">
            <Text fontSize="lg">
              Nivel {userInformations?.sublevel.numLevel}
            </Text>
            <Text fontSize="lg">{userInformations?.qtXpOnLevel}%</Text>
            <Text fontSize="lg">
              Nível{" "}
              {userInformations?.sublevel?.numLevel != null
                ? userInformations.sublevel.numLevel + 1
                : "Indisponível"}
            </Text>
          </Box>
          <Progress
            value={userInformations?.qtXpOnLevel}
            className="progressBar"
          />
        </Box>
        <Box className="icons">
          <HStack
            spacing="2"
            className="clickable"
            data-tooltip-id="navbar-tooltip"
            data-tooltip-content="Impulsionadores"
            onClick={() => setIsBoosterModalOpen(true)} 
          >
            <Image src={fireIcon}/>
            <Text fontSize="lg">{userInformations?.qtBooster}</Text>
          </HStack>
          <HStack
            spacing="2"
            className="clickable"
            onClick={() => setIsEnergiaModalOpen(true)}
            data-tooltip-id="navbar-tooltip"
            data-tooltip-content="Energias"
          >
            {[...Array(userInformations?.qtEnergy || 0)].map((_, index) => (
              <Image key={index} src={energiaCheiaIcon} />
            ))}
            {[...Array(5 - (userInformations?.qtEnergy || 0))].map(
              (_, index) => (
                <Image key={index} src={energiaVaziaIcon} />
              )
            )}
          </HStack>
          <HStack
            spacing="2"
            className="clickable"
            onClick={() => setIsCuboGeloModalOpen(true)}
            data-tooltip-id="navbar-tooltip"
            data-tooltip-content="Cubos de gelo"
          >
            <Image src={cuboGeloIcon} />
            <Text fontSize="lg">{userInformations?.qtCube}</Text>
          </HStack>
        </Box>
      </Box>

      <div className="divisaoNavbar"></div>
      <BoosterModal
        isOpen={isBoosterModalOpen}
        onClose={() => {
          setIsBoosterModalOpen(false);
          navigate(location.pathname);
        }}
      />
      <XpModal isOpen={isXpModalOpen} onClose={() => setIsXpModalOpen(false)} />
      <EnergiaModal
        isOpen={isEnergiaModalOpen}
        onClose={() => setIsEnergiaModalOpen(false)}
      />
      <CuboGeloModal
        isOpen={isCuboGeloModalOpen}
        onClose={() => setIsCuboGeloModalOpen(false)}
      />
    </>
  );
};

export default SidebarNavbar;
