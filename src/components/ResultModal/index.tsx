import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Text,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Image,
} from "@chakra-ui/react";
import cuboGeloIcon from "../../assets/cubo-gelo-navbar.png";
import { useNavigate } from "react-router-dom";
import SidebarNavbar from "../SideBarNavBar";
import "./styles.css";
import { useAuth } from "../../context/AuthContext";
import api from "../../config/axios";
import { BoosterContext } from "../../context/BoosterContext";
import xpIcon from "../../assets/XP-Icon.svg";
import UserInformationContext from '../../context/UserContext';

interface ResultModalProps {
  isOpen: boolean;
  onClose: () => void;
  correctAnswers: number;
  totalQuestions: number;
  exercises: any[];
}

const ResultModal: React.FC<ResultModalProps> = ({
  isOpen,
  correctAnswers,
  totalQuestions,
  exercises,
}) => {
  const { boosterState } = useContext(BoosterContext);
  const { user } = useAuth();
  const navigate = useNavigate();
  const { userInformations, setUserInformations } = useContext(UserInformationContext);
  const [rewards, setRewards] = useState<React.ReactNode | null>(null);


  const percentageCorrect = parseFloat(
    ((correctAnswers / totalQuestions) * 100).toFixed(2)
  );

  useEffect(() => {
    if(!userInformations){
      return;
    }

    const fetchData = async () => {
      try {
        if (!user || !user.email) {
          console.error("Email do usuário não disponível.");
          return;
        }

        const response = await api.get(
          `get-user?userEmail=${encodeURIComponent(user.email)}`
        );
        const fetchedUser = response.data;

        if (fetchedUser) {
          setUserInformations(fetchedUser);

          const val = getLastExerciseId();
          const lastExerciseId = await getUserExercise(
            fetchedUser.username,
            val
          );

          if (
            lastExerciseId &&
            lastExerciseId.exerciseDone === false &&
            percentageCorrect >= 60
          ) {
            const rewardsJSX = (
              <Box>
                <Text style={{ fontWeight: "bold" }}>Recompensas:</Text>
                {userInformations.sublevel.numSublevel !== 4 && (
                  <Text className="result-rewards">
                    <Image className="icon-result" src={xpIcon} /> = 30
                  </Text>
                )}
                {userInformations.sublevel.numSublevel === 4 && (
                  <Text>Você subiu de nível!</Text>
                )}
                <Text className="result-rewards">
                  <Image className="icon-result" src={cuboGeloIcon} /> ={" "}
                  {boosterState.boosterActive ? "50 x 2" : "50"}
                </Text>
              </Box>
            );

            setRewards(rewardsJSX);
          } else if (percentageCorrect >= 60) {
            const rewardsJSX = (
              <Box>
                <Text style={{ fontWeight: "bold" }}>Recompensas:</Text>
                <Text className="result-rewards">
                  <Image className="icon-result" src={cuboGeloIcon} /> ={" "}
                  {boosterState.boosterActive ? "5 x 2" : "5"}
                </Text>
              </Box>
            );

            setRewards(rewardsJSX);
          }
        } else {
          console.error("Usuário não encontrado na resposta da API.");
        }
      } catch (error) {
        console.error("Erro ao buscar usuário:", error);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, percentageCorrect, boosterState]);

  async function postConsumeEnergy(username: string, qtEnergy: number) {
    const response = await api.post("/receiveTradeItem", {
      username,
      qtEnergy,
      isReceiving: false,
    });
    return response.data;
  }


  function getLastExerciseId(): string {
    if (exercises.length === 0) {
      throw new Error("No exercises provided");
    }

    const lastExercise = exercises[exercises.length - 1];
    return lastExercise.exercise.id;
  }

  async function getUserExercise(username: string, exerciseId: string) {
    const response = await api.get(
      `getUserExercise?username=${encodeURIComponent(
        username
      )}&exerciseId=${encodeURIComponent(exerciseId)}`
    );
    return response.data;
  }

  async function postSolveExercises(
    username: string,
    exercises: { exerciseId: number }[]
  ) {
    const response = await api.post("/solveExercises", {
      username,
      exercises,
    });
    return response.data;
  }

  const handleBackToHome = async () => {
    if(!userInformations){
      return;
    }

    const val = getLastExerciseId();

    const lastExerciseId = await getUserExercise(
      userInformations.username,
      val
    );

    if (percentageCorrect >= 60) {
      await postConsumeEnergy(userInformations.username, 1);
    } else {
      if (userInformations.qtEnergy > 1) {
        await postConsumeEnergy(userInformations.username, 2);
      } else {
        await postConsumeEnergy(userInformations.username, 1);
      }
    }

    if (
      lastExerciseId &&
      lastExerciseId.exerciseDone === false &&
      percentageCorrect >= 60
    ) {
      await levelUpUser();

      if (boosterState.boosterActive) {
        await postReceiveTradeItem(userInformations.username, 100);
      } else {
        await postReceiveTradeItem(userInformations.username, 50);
      }

      const exercisesToPost = exercises.map((exercise) => ({
        exerciseId: exercise.exercise.id,
      }));

      await postSolveExercises(userInformations.username, exercisesToPost);
    } else if (
      lastExerciseId &&
      lastExerciseId.exerciseDone === true &&
      percentageCorrect >= 60
    ) {
      if (boosterState.boosterActive) {
        await postReceiveTradeItem(userInformations.username, 10);
      } else {
        await postReceiveTradeItem(userInformations.username, 5);
      }
    }

    navigate("/");
  };

  const levelUpUser = async () => {
    if(!userInformations){
      return;
    }

    let xp = 0;
    if (userInformations.sublevel.numSublevel !== 4) {
      xp = 30;
      try {
        await api.post(`changeXpPoints`, {
          username: userInformations.username,
          qtXp: xp,
        });
      } catch (error) {
        console.error("Erro ao mudar a quantidade de experiência:", error);
      }
    } else {
      xp = 10;
      try {
        await api.post(`changeXpPoints`, {
          username: userInformations.username,
          qtXp: xp,
        });
      } catch (error) {
        console.error("Erro ao mudar a quantidade de experiência:", error);
      }
    }

    try {
      await api.post(`levelUp`, {
        username: userInformations.username,
      });
    } catch (error) {
      console.error("Erro ao mudar a quantidade de experiência:", error);
    }
  };

  async function postReceiveTradeItem(username: string, qtCube: number) {
    const response = await api.post("/receiveTradeItem", {
      username,
      qtCube,
      isReceiving: true,
    });
    return response.data;
  }

  return (
    <>
      <SidebarNavbar />
      <Modal isOpen={isOpen} onClose={handleBackToHome}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Resultado:</ModalHeader>
          <ModalCloseButton />
          <ModalBody
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              lineHeight: "2em",
            }}
          >
            <Text>
              {percentageCorrect >= 60
                ? "Você completou uma série de exercícios! Parabéns!"
                : "Tente novamente, você vai conseguir na próxima!"}
            </Text>
            <Text>Você teve {percentageCorrect}% de acerto</Text>
            {rewards}
            <Button colorScheme="blue" m={2} onClick={handleBackToHome}>
              Voltar à Página Inicial
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ResultModal;
