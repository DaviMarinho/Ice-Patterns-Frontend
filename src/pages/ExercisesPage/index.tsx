import React, { useState, useEffect } from "react";
import { Box, Text, Progress, Skeleton, Stack } from "@chakra-ui/react";
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
  const [isLoading, setIsLoading] = useState(true);

  const { level } = useParams();

  useEffect(() => {
    if (level) {
      const fetchSublevelContents = async () => {
        setIsLoading(true);
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
        setIsLoading(false);
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

  if (isLoading) {
    return (
      <>
        <SidebarNavbar />
        <Box
          height="100vh"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Box
            width="650px"
            height="600px"
            padding="10px"
            bg="white"
            borderRadius="10px"
            display="flex"
              justifyContent="center"
              alignItems="center"
          >
            <Stack
              padding="10px"
              width="600px"
              justifyContent="center"
            >
              <Skeleton height="30px" width="800px" borderRadius="10px" />
              <Skeleton  height="605px" width="800px" borderRadius="10px" />
            </Stack>
          </Box>
        </Box>
      </>
    );
  }

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
