import * as React from "react";
import "./styles.css";
import SidebarNavbar from "../../components/SideBarNavBar";
import { Box, Image, Text, Button } from "@chakra-ui/react";
import perfil from "../../assets/circle-user-perfil.png";
import icicles from "../../assets/icicles-perfil.png";
import scroll from "../../assets/scroll-perfil.png";
import hearth from "../../assets/heart-perfil.png";

const PerfilPage: React.FC = () => {
  return (
    <>
      <SidebarNavbar />
      <Box className="container-perfil">
        <Box className="person-info">
          <Box className="">
            <Text className="title-perfil">Nome</Text>
            <Text className="info-perfil">Pinguim da Silva</Text>
            <Text className="title-perfil">Profissão</Text>
            <Text className="info-perfil">Estudante</Text>
            <Text className="title-perfil">Sobre mim</Text>
            <Text className="info-perfil">
              Eu sou estudante do polo norte e quero aprender mais sobre padrões
              de projeto.
            </Text>
          </Box>
          <Image src={perfil}></Image>
        </Box>

        <Box className="achievements-perfil">
          <div className="divisao-perfil"></div>
          <Box className="texts-achievements">
            <Text>Conquistas</Text>
            <Text>Ver Todos</Text>
          </Box>

          <Box className="item-perfil">
            <Image src={icicles}></Image>
            <Box className="texts-shop">
              <Text className="text-item">
                Você completou seu primeiro nível do iceberg!
              </Text>
            </Box>
          </Box>
          <Box className="item-perfil">
            <Image src={scroll}></Image>
            <Box className="texts-shop">
              <Text className="text-item">
                Você acertou todas as questões na sua primeira prática!
              </Text>
            </Box>
          </Box>
          <Box className="item-perfil">
            <Image src={hearth}></Image>
            <Box className="texts-shop">
              <Text className="text-item">Você finalizou o iceberg!</Text>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default PerfilPage;
