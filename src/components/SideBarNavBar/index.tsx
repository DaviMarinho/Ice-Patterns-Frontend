import React, { useState } from "react";
import {
  Box,
  Text,
  HStack,
  Progress,
  Image,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
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

const SidebarNavbar = () => {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const [isBoosterModalOpen, setIsBoosterModalOpen] = useState(false);
  const [isXpModalOpen, setIsXpModalOpen] = useState(false);
  const [isEnergiaModalOpen, setIsEnergiaModalOpen] = useState(false);
  const [isCuboGeloModalOpen, setIsCuboGeloModalOpen] = useState(false);

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
        <Box className="progressBarContent" onClick={() => setIsXpModalOpen(true)}>
          <Box className="progressBarTexts">
            <Text fontSize="lg">Nivel 1</Text>
            <Text fontSize="lg">50%</Text>
            <Text fontSize="lg">Nivel 2</Text>
          </Box>
          <Progress value={50} className="progressBar" />
        </Box>
        <Box className="icons">
        <HStack spacing="2" onClick={() => setIsBoosterModalOpen(true)}>
        <Image src={fireIcon} onClick={() => setIsBoosterModalOpen(true)}/>
        <Text fontSize="lg">2</Text>
      </HStack>
          <HStack spacing="2" onClick={() => setIsEnergiaModalOpen(true)}>
            <Image src={energiaCheiaIcon} />
            <Image src={energiaCheiaIcon} />
            <Image src={energiaCheiaIcon} />
            <Image src={energiaVaziaIcon} />
            <Image src={energiaVaziaIcon} />
          </HStack>
          <HStack spacing="2" onClick={() => setIsCuboGeloModalOpen(true)}>
            <Image src={cuboGeloIcon} />
            <Text fontSize="lg">500</Text>
          </HStack>
        </Box>
      </Box>

      <div className="divisaoNavbar"></div>
      <BoosterModal isOpen={isBoosterModalOpen} onClose={() => setIsBoosterModalOpen(false)} />
      <XpModal isOpen={isXpModalOpen} onClose={() => setIsXpModalOpen(false)} /*userExp={ Adicione aqui a propriedade de pontos de experiência do usuário }*/ />
      <EnergiaModal isOpen={isEnergiaModalOpen} onClose={() => setIsEnergiaModalOpen(false)} /*userRecharge={ Adicione aqui a propriedade de recarga de energia do usuário }*/ />
      <CuboGeloModal isOpen={isCuboGeloModalOpen} onClose={() => setIsCuboGeloModalOpen(false)} />
    </>
  );
};

export default SidebarNavbar;
