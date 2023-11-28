import React, { useState, useEffect } from "react";
import { Box, Text, Progress } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import SidebarNavbar from "../../components/SideBarNavBar";
import api from "../../config/axios";
import "./styles.css";
import ExercisePageContent from "../../components/Exercise";
import { useParams } from "react-router-dom";

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

  const { level } = useParams();

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
