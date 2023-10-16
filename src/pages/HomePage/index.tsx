import * as React from "react";
import "./styles.css";
import SidebarNavbar from "../../components/SideBarNavBar";
import { Box, Image, Text, Button } from "@chakra-ui/react";
import icebergFull from "../../assets/iceberg-full.png";
import cadeado from "../../assets/cadeado.png";

const HomePage: React.FC = () => {
  return (
    <>
      <SidebarNavbar />
      <Box className="container">
        <Box className="iceberg-niveis">
          <Image className="iceberg-full" src={icebergFull} />
          <Box className="niveis">
            <Box className="conjunto-nivel">
              <Box className="textLock">
                <Text className="textNivel">Nível 1</Text>
                <Image src={cadeado} />
              </Box>
              <div className="linha"></div>
            </Box>

            <Box className="conjunto-nivel">
              <Box className="textLock">
                <Text className="textNivel">Nível 2</Text>
                <Image src={cadeado} />
              </Box>
              <div className="linha"></div>
            </Box>

            <Box className="conjunto-nivel">
              <Box className="textLock">
                <Text className="textNivel">Nível 3</Text>
                <Image src={cadeado} />
              </Box>
              <div className="linha"></div>
            </Box>

            <Box className="conjunto-nivel">
              <Box className="textLock">
                <Text className="textNivel">Nível 4</Text>
                <Image src={cadeado} />
              </Box>
              <div className="linha"></div>
            </Box>

            <Box className="conjunto-nivel">
              <Box className="textLock">
                <Text className="textNivel">Nível 5</Text>
                <Image src={cadeado} />
              </Box>
              <div className="linha"></div>
            </Box>

            <Box className="conjunto-nivel">
              <Box className="textLock">
                <Text className="textNivel">Nível 6</Text>
                <Image src={cadeado} />
              </Box>
              <div className="linha"></div>
            </Box>

            <Box className="conjunto-nivel">
              <Box className="textLock">
                <Text className="textNivel">Nível 7</Text>
                <Image src={cadeado} />
              </Box>
              <div className="linha"></div>
            </Box>
          </Box>
        </Box>

        <div className="button-container">
          <button className="button-nivel">Próxima Missão</button>
        </div>
      </Box>
    </>
  );
};

export default HomePage;
