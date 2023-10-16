import React from "react";
import {
  Box,
  Text,
  HStack,
  Progress,
  Image,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
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

const SidebarNavbar = () => {
  return (
    <>
      <Box className="sidebar">
        <Box className="logoSidebar" as={Link} to="/home">
          <Image src={icebergLogo} />
        </Box>

        <Box className="sidebarContentUpper">
          <Link className="sidebarLink" to="/inicio">
            <Image className="iconsSidebar" src={homeIcon} />
            <Text fontSize="lg">Início</Text>
          </Link>
          <Link className="sidebarLink" to="/missoes">
            <Image className="iconsSidebar" src={questIcon} />
            <Text fontSize="lg">Missões</Text>
          </Link>
          <Link className="sidebarLink" to="/loja">
            <Image className="iconsSidebar" src={storeIcon} />
            <Text fontSize="lg">Loja</Text>
          </Link>
        </Box>
        <Box className="sidebarContentLower">
          <Link className="sidebarLink" to="/perfil">
            <Image className="iconsSidebar" src={userIcon} />
            <Text fontSize="lg">Perfil</Text>
          </Link>
          <Link className="sidebarLink" to="/sair">
            <Image className="iconsSidebar" src={logoutIcon} />
            <Text fontSize="lg">Sair</Text>
          </Link>
        </Box>
      </Box>

      <Box className="navbar">
        <Box className="progressBarContent">
          <Box className="progressBarTexts">
            <Text fontSize="lg">Nivel 1</Text>
            <Text fontSize="lg">50%</Text>
            <Text fontSize="lg">Nivel 2</Text>
          </Box>
          <Progress value={50} className="progressBar" />
        </Box>
        <Box className="icons">
          <HStack spacing="2">
            <Image src={fireIcon} />
            <Text fontSize="lg">2</Text>
          </HStack>
          <HStack spacing="2">
            <Image src={energiaCheiaIcon} />
            <Image src={energiaCheiaIcon} />
            <Image src={energiaCheiaIcon} />
            <Image src={energiaVaziaIcon} />
            <Image src={energiaVaziaIcon} />
          </HStack>
          <HStack spacing="2">
            <Image src={cuboGeloIcon} />
            <Text fontSize="lg">500</Text>
          </HStack>
        </Box>
      </Box>

      <div className="divisaoNavbar"></div>
    </>
  );
};

export default SidebarNavbar;
