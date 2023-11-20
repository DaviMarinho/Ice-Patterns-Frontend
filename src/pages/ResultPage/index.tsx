import React from "react";
import { Box, Text, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import SidebarNavbar from "../../components/SideBarNavBar";
import "./styles.css";

interface ResultPageProps {
  correctAnswers: number;
  totalQuestions: number;
}

const ResultPage: React.FC<ResultPageProps> = ({ correctAnswers, totalQuestions }) => {
  const navigate = useNavigate();

  return (
    <>
      <SidebarNavbar />
      <Box className="container-result">
        <Text fontSize="xl">Resultado:</Text>
        <Text>
          Respostas corretas: {correctAnswers} / {totalQuestions}
        </Text>
        <Text>
          Respostas incorretas: {totalQuestions - correctAnswers} / {totalQuestions}
        </Text>
        <Button colorScheme="blue" m={2} onClick={() => navigate("/")}>
          Voltar à Página Inicial
        </Button>
      </Box>
    </>
  );
};

export default ResultPage;
