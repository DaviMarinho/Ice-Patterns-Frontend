import * as React from "react";
import "./styles.css";
import SidebarNavbar from "../../components/SideBarNavBar";
import { Box, Image, Text, Progress } from "@chakra-ui/react";
import throphy from "../../assets/throphy-quests.png";

const QuestsPage: React.FC = () => {
  return (
    <>
      <SidebarNavbar />
      <Box className="container-quests">
        <Text className="text-title-quests">Missões</Text>
        <Box className="item-quests">
          <Box className="texts-quests">
            <Text>Faça 8 questões</Text>
          </Box>
          <Box className="progress-throphy-quests">
            <Box className="progressBar-text-quests">
              <Text>45%</Text>
              <Progress value={45} className="progressBar-quests" />
            </Box>
            <Image src={throphy}></Image>
          </Box>
        </Box>
        <Box className="item-quests">
          <Box className="texts-quests">
            <Text>Complete 2 exercícios sem errar nem uma questão</Text>
          </Box>
          <Box className="progress-throphy-quests">
            <Box className="progressBar-text-quests">
              <Text>25%</Text>
              <Progress value={25} className="progressBar-quests" />
            </Box>
            <Image src={throphy}></Image>
          </Box>
        </Box>
        <Box className="item-quests">
          <Box className="texts-quests">
            <Text>Não perca nenhuma energia em um exercício</Text>
          </Box>
          <Box className="progress-throphy-quests">
            <Box className="progressBar-text-quests">
              <Text>100%</Text>
              <Progress value={100} className="progressBar-quests" />
            </Box>
            <Image src={throphy}></Image>
          </Box>
        </Box>
        <Box className="item-quests">
          <Box className="texts-quests">
            <Text>Faça 3 questões avulsas</Text>
          </Box>
          <Box className="progress-throphy-quests">
            <Box className="progressBar-text-quests">
              <Text>75%</Text>
              <Progress value={75} className="progressBar-quests" />
            </Box>
            <Image src={throphy}></Image>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default QuestsPage;
