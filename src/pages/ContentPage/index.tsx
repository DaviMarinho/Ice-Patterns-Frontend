import React, { useState, useEffect } from "react";
import { Box, Text, Button, Progress, Container } from "@chakra-ui/react";
import { useNavigate, useLocation } from "react-router-dom";
import SidebarNavbar from "../../components/SideBarNavBar";
import api from "../../config/axios";
import "./styles.css";
import { useAuth } from "../../context/AuthContext";

const SublevelContentPage: React.FC = () => {
  const navigate = useNavigate();
  const [sublevelContents, setSublevelContents] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const { user } = useAuth();
  const [userInformations, setUserInformations] = useState<any>();

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
    if (userInformations) {
      const fetchSublevelContents = async () => {
        try {
          const response = await api.get(
            `getSublevelContents?sublevelId=${userInformations?.sublevel.numSublevel}`
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
  }, [userInformations]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 0 && newPage < totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleNextPage = () => {
    handlePageChange(currentPage + 1);
  };

  const handlePrevPage = () => {
    handlePageChange(currentPage - 1);
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
                <Text className="content-text">
                  {sublevelContents[currentPage].text}
                </Text>
              </>
            )}
          </Container>
          <Box mt={4} className="box-bottom">
            <Button
              colorScheme="blue"
              m={2}
              onClick={handlePrevPage}
              isDisabled={currentPage === 0}
            >
              Anterior
            </Button>
            <Button
              colorScheme="green"
              m={2}
              onClick={handleNextPage}
              isDisabled={currentPage === totalPages - 1}
            >
              Responder
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default SublevelContentPage;
