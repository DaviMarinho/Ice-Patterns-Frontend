import * as React from "react";
import "./styles.css";
import SidebarNavbar from "../../components/SideBarNavBar";
import { Box, Image, Text, Button } from "@chakra-ui/react";
import iceCubeShop from "../../assets/cubo-gelo-transparente-shop.png";
import energyShop from "../../assets/energia-cheia-shop.png";
import fireShop from "../../assets/fire-solid-shop.png";

const ShopPage: React.FC = () => {
  return (
    <>
      <SidebarNavbar />
      <Box className="container-shop">
        <Text className="text-title-shop">Loja</Text>
        <Box className="item-shop">
          <Image src={fireShop}></Image>
          <Box className="texts-shop">
            <Text>Impulsionadores</Text>
            <Text className="text-minor">Impulsionadores são itens que...</Text>
          </Box>
          <Box className="price-shop">
            <Image src={iceCubeShop}></Image>
            <Text>150</Text>
          </Box>
        </Box>
        <Box className="item-shop">
          <Image src={energyShop}></Image>
          <Box className="texts-shop">
            <Text>Energia</Text>
            <Text className="text-minor">As energias fazem com que...</Text>
          </Box>
          <Box className="price-shop">
            <Image src={iceCubeShop}></Image>
            <Text>250</Text>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ShopPage;
