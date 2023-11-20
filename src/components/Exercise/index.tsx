// ExercisePageContent.tsx

import React, { useState, useEffect } from "react";
import { Box, Text, Button, Progress } from "@chakra-ui/react";
import "./styles.css";

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
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);

  const handleAnswer = () => {
    if (selectedAnswer !== null) {
      const isCorrect =
        exercises[currentExerciseIndex].alternatives.find(
          (a) => a.num === selectedAnswer
        )?.isAnswer || false;
      setIsAnswerCorrect(isCorrect);
    }
  };

  useEffect(() => {
    setIsAnswerCorrect(null);
  }, [currentExerciseIndex]);

  const handleNextPage = () => {
    onPageChange(currentExerciseIndex + 1);
    setSelectedAnswer(null);
  };

  const handlePrevPage = () => {
    onPageChange(currentExerciseIndex - 1);
  };

  return (
    <Box>
      <Text fontSize="lg" className="text-title">
        {exercises[currentExerciseIndex]?.exercise.question}
      </Text>

      <Box className="options-content">
        {exercises[currentExerciseIndex].alternatives.map((alternative) => (
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
                color:
                  isAnswerCorrect !== null && alternative.isAnswer
                    ? "green"
                    : isAnswerCorrect !== null &&
                      selectedAnswer === alternative.num
                    ? "red"
                    : "black",
              }}
            >
              {alternative.text}
            </label>
          </Box>
        ))}
      </Box>

      {isAnswerCorrect !== null && (
        <Text mt={2} color={isAnswerCorrect ? "green" : "red"}>
          {isAnswerCorrect ? "Resposta correta!" : "Resposta incorreta!"}
        </Text>
      )}
      <Box mt={4} className="box-bottom">
        <Button
          colorScheme="blue"
          m={2}
          onClick={handlePrevPage}
          isDisabled={currentExerciseIndex === 0}
        >
          Anterior
        </Button>

        <Button
          colorScheme="green"
          m={2}
          onClick={handleNextPage}
          isDisabled={currentExerciseIndex === exercises.length - 1}
        >
          Próximo
        </Button>
      </Box>
    </Box>
  );
};

export default ExercisePageContent;
