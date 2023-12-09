// ExercisePageContent.tsx

import React, { useEffect, useState } from "react";
import "./styles.css";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Button } from "@chakra-ui/react";
import ResultModal from "../ResultModal";

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

interface ExercisePageContentProps {
  exercises: Content[];
  currentExerciseIndex: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
  onAnswer: (isCorrect: boolean) => void;
}

const ExercisePageContent: React.FC<ExercisePageContentProps> = ({
  exercises,
  currentExerciseIndex,
  totalPages,
  onPageChange,
  onAnswer,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [correctAnswers, setCorrectAnswers] = useState<any>(0);
  const [exerciseImage, setExerciseImage] = useState<string>();
  const [exerciseText, setExerciseText] = useState<string>("");

  const [correctlyAnswered, setCorrectlyAnswered] = useState<string[]>([]);
  const location = useLocation();
  const numLevel = location.state?.levelId;

  const handleAnswer = () => {
    if (selectedAnswer !== null) {
      const currentExercise = exercises[currentExerciseIndex];
      const isCorrect =
        currentExercise.alternatives.find((a) => a.num === selectedAnswer)
          ?.isAnswer || false;

      if (
        isCorrect &&
        !correctlyAnswered.includes(currentExercise.exercise.id)
      ) {
        setCorrectAnswers(correctAnswers + 1);
        setCorrectlyAnswered([
          ...correctlyAnswered,
          currentExercise.exercise.id,
        ]);
      }

      if (currentExerciseIndex !== exercises.length - 1) {
        onPageChange(currentExerciseIndex + 1);
        setSelectedAnswer(null);
      }

      if (currentExerciseIndex === exercises.length - 1) {
        setIsModalOpen(true);
      }
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    navigate("/");
  };

  const handleNextPage = () => {
    onPageChange(currentExerciseIndex + 1);
    setSelectedAnswer(null);
  };

  const handlePrevPage = () => {
    if (currentExerciseIndex === 0) {
      navigate(`/nivel/${numLevel}`);
    } else {
      onPageChange(currentExerciseIndex - 1);
    }
  };

  const formatQuestion = (question: string) => {
    let formattedQuestion = question;
    formattedQuestion = formattedQuestion.replace(/<q>/g, "<br />");
    formattedQuestion = formattedQuestion.replace(/<tab>/g, "&emsp;");
    formattedQuestion = formattedQuestion.replace(
      /<t>/g,
      "<br />&emsp;-&emsp;"
    );
    return { __html: formattedQuestion };
  };

  const extractTextAndImage = (combinedString: string) => {
    const separatorIndex = combinedString.indexOf("data");
    const text = combinedString.substring(0, separatorIndex);
    const imageBase64 = combinedString.substring(separatorIndex);

    setExerciseText(text);
    setExerciseImage(imageBase64);
  };

  useEffect(() => {
    const currentExercise = exercises[currentExerciseIndex];
    extractTextAndImage(currentExercise.exercise.question);
  }, [currentExerciseIndex, exercises]);

  return (
    <Box>
      <Box fontSize="lg" className="text-title">
        <div dangerouslySetInnerHTML={formatQuestion(exerciseText || "")} />
      </Box>

      {exerciseImage && (
        <Box>
          <img
            src={exerciseImage}
            alt="Exercise"
            style={{ maxWidth: "100%", maxHeight: "100%" }}
          />
        </Box>
      )}

      <Box className="options-content">
        {exercises[currentExerciseIndex].alternatives.map((alternative) => {
          if (exercises[currentExerciseIndex].exercise.type === 0) {
            return (
              <Box
                key={alternative.num}
                className="option"
                onChange={() => setSelectedAnswer(alternative.num)}
              >
                <input
                  type="radio"
                  id={alternative.num}
                  name="answer"
                  checked={selectedAnswer === alternative.num}
                  onChange={() => setSelectedAnswer(alternative.num)}
                />
                <label
                  htmlFor={alternative.num}
                  style={{
                    width: "100%",
                    cursor: "pointer",
                  }}
                >
                  {alternative.text}
                </label>
              </Box>
            );
          } else if (exercises[currentExerciseIndex].exercise.type === 1) {
            return (
              <Box key={alternative.num} className="option">
                <input
                  type="radio"
                  id={alternative.num}
                  name="answer"
                  checked={selectedAnswer === alternative.num}
                  onChange={() => setSelectedAnswer(alternative.num)}
                />
                <label
                  htmlFor={alternative.num}
                  style={{
                    width: "100%",
                    cursor: "pointer",
                  }}
                >
                  {alternative.text}
                </label>
              </Box>
            );
          }
        })}
      </Box>

      <Box mt={4} className="box-bottom">
        <Button colorScheme="blue" m={2} onClick={handlePrevPage}>
          Anterior
        </Button>

        <Button
          colorScheme="green"
          m={2}
          onClick={() => {
            handleAnswer();
            handleNextPage();
          }}
          isDisabled={selectedAnswer === null}
          title={
            selectedAnswer === null
              ? "Você tem que selecionar uma opção antes de prosseguir."
              : ""
          }
        >
          Responder
        </Button>
      </Box>
      <ResultModal
        isOpen={isModalOpen}
        onClose={closeModal}
        correctAnswers={correctAnswers}
        totalQuestions={exercises.length}
        exercises={exercises}
      />
    </Box>
  );
};

export default ExercisePageContent;
