import React, { useState, useEffect } from "react";
import { Box, Text, Progress } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import SidebarNavbar from "../../components/SideBarNavBar";
import api from "../../config/axios";
import "./styles.css";
import ExercisePageContent from "../../components/Exercise";
import { useParams } from "react-router-dom";
import useSocket from "../../config/service/socketService";
import { toast } from "../../utils/toast";
import { useAuth } from "../../context/AuthContext";
import { BoosterContext } from "../../context/BoosterContext";

interface Content {
  exercise: Exercise;
  alternatives: Alternative[];
}

interface Alternative {
  num: string;
  exerciseId: string;
  text: string;
  isAnswer: boolean;
}

interface Exercise {
  id: string;
  orderKey: number;
  question: string;
  type: number;
}

const ExercicesPage: React.FC = () => {
  const [exercises, setExercises] = useState<Content[]>([]);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(currentExerciseIndex);
  const [totalPages, setTotalPages] = useState(0);
  const { user } = useAuth();
   const { boosterState, boosterDispatch } = React.useContext(BoosterContext);

  const { level } = useParams();

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
      console.log("Impulsionador desativado");
      toast.warning("Impulsionador desativado.");

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
    if (level) {
      const fetchSublevelContents = async () => {
        try {
          const response = await api.get(
            `getSublevelExercises?sublevelId=${level}`
          );
          const { data } = response;
          setExercises(data.exercises);
          setTotalPages(data.exercises.length);
        } catch (error) {
          console.error("Erro ao buscar conteúdo do subnível:", error);
        }
      };

      fetchSublevelContents();
    }
  }, [level]);

  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
      setCorrectAnswers((prev) => prev + 1);
    }

    if (currentExerciseIndex + 1 < exercises.length) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
    } else {
      navigate("/result", {
        state: { correctAnswers, totalQuestions: exercises.length },
      });
    }
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 0 && newPage < totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <>
      <SidebarNavbar />
      <Box className="container-exercises">
        <Box className="progress-box">
          <Text className="progress-text">
            {currentPage + 1 + "/" + totalPages}
          </Text>
          <Progress
            className="progress-content"
            value={((currentPage + 1) / totalPages) * 100}
            mb={4}
          />
        </Box>
        <Box className="box-exercises">
          {exercises.length > 0 && currentPage < exercises.length && (
            <ExercisePageContent
              exercises={exercises}
              currentExerciseIndex={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              onAnswer={handleAnswer}
            />
          )}
        </Box>
      </Box>
    </>
  );
};

export default ExercicesPage;
