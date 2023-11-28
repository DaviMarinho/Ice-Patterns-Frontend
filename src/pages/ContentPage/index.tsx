import React, { useState, useEffect } from "react";
import { Box, Text, Button, Progress, Container } from "@chakra-ui/react";
import { useNavigate, useLocation } from "react-router-dom";
import SidebarNavbar from "../../components/SideBarNavBar";
import api from "../../config/axios";
import "./styles.css";
import { useAuth } from "../../context/AuthContext";
import { useParams } from "react-router-dom";
import useSocket from "../../config/service/socketService";
import { toast } from "../../utils/toast";
import { BoosterContext } from "../../context/BoosterContext";

const SublevelContentPage: React.FC = () => {
  const navigate = useNavigate();
  const [sublevelContents, setSublevelContents] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const { user } = useAuth();
  const { level } = useParams();
  const location = useLocation();
  const [userInformations, setUserInformations] = useState<any>();
  const numLevel = location.state?.levelId;
  const { boosterDispatch } = React.useContext(BoosterContext);

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
      console.log("Booster desativado");
      toast.warning("Booster desativado.");

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
  }, [socket, user]);

  async function postReceiveTradeItem(username: string, qtCube: number) {
    const response = await api.post("/receiveTradeItem", {
      username,
      qtCube,
      isReceiving: true,
    });
    return response.data;
  }

  useEffect(() => {
    const fetchUser = async () => {
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
        } else {
          console.error("Usuário não encontrado na resposta da API.");
        }
      } catch (error) {
        console.error("Erro ao buscar usuário:", error);
      }
    };

    fetchUser();
  }, [user]);

  useEffect(() => {
    if (level) {
      const fetchSublevelContents = async () => {
        try {
          const response = await api.get(
            `getSublevelContents?sublevelId=${level}`
          );
          const { data } = response;
          setSublevelContents(data.contents);
          setTotalPages(data.contents.length);
        } catch (error) {
          console.error("Erro ao buscar conteúdo do subnível:", error);
        }
      };

      fetchSublevelContents();
    }
  }, [level, userInformations]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 0 && newPage < totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleNextPage = () => {
    if (currentPage === totalPages - 1) {
      navigate(`/nivel/${numLevel}`);
    } else {
      handlePageChange(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage === 0) {
      navigate(`/nivel/${numLevel}`);
    } else {
      handlePageChange(currentPage - 1);
    }
  };

  const formatQuestion = (question: string) => {
    let formattedQuestion = question;
    formattedQuestion = formattedQuestion.replace(/<q>/g, "<br />");
    formattedQuestion = formattedQuestion.replace(/<tab>/g, "&emsp;");
    formattedQuestion = formattedQuestion.replace(/<t>/g, "<br />&emsp;-&emsp;");
    return { __html: formattedQuestion };
  };

  return (
    <>
      <SidebarNavbar />
      <Box className="box-content">
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
        <Box className="box-inside">
          <Text fontSize="2xl" fontWeight={"bold"}>
            {sublevelContents[currentPage]?.title}
          </Text>
          <Container
            className="container-scrollbar"
            maxW="container.lg"
            maxHeight="400px"
          >
            {sublevelContents.length > 0 && (
              <>
                <Box fontSize="lg" className="text-title">
                  <div
                    dangerouslySetInnerHTML={formatQuestion(
                      sublevelContents[currentPage]?.text
                    )}
                  />
                </Box>
              </>
            )}
          </Container>
          <Box mt={4} className="box-bottom">
            <Button
              colorScheme="blue"
              m={2}
              onClick={handlePrevPage}
            >
              Anterior
            </Button>
            <Button
              colorScheme="green"
              m={2}
              onClick={handleNextPage}
            >
              Próximo
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default SublevelContentPage;
