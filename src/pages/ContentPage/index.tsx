import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  Text,
  Button,
  Progress,
  Container,
  Skeleton,
  Stack,
} from "@chakra-ui/react";
import { useNavigate, useLocation } from "react-router-dom";
import SidebarNavbar from "../../components/SideBarNavBar";
import api from "../../config/axios";
import "./styles.css";
import { useParams } from "react-router-dom";
import UserInformationContext from "../../context/UserContext";

const SublevelContentPage: React.FC = () => {
  const navigate = useNavigate();
  const [sublevelContents, setSublevelContents] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const { level } = useParams();
  const location = useLocation();
  const { userInformations } = useContext(UserInformationContext);
  const [isLoading, setIsLoading] = useState(true);
  const numLevel = location.state?.levelId;

  useEffect(() => {
    if (level) {
      const fetchSublevelContents = async () => {
        setIsLoading(true);
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
        setIsLoading(false);
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
    formattedQuestion = formattedQuestion.replace(
      /<t>/g,
      "<br />&emsp;-&emsp;"
    );
    return { __html: formattedQuestion };
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
            <Stack padding="10px" width="600px" justifyContent="center">
              <Skeleton height="30px" width="800px" borderRadius="10px" />
              <Skeleton height="605px" width="800px" borderRadius="10px" />
            </Stack>
          </Box>
        </Box>
      </>
    );
  }

  const isBase64Image = (data: string) => {
    return /^data:image\/[a-zA-Z]*;base64,/.test(data);
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
                  {isBase64Image(sublevelContents[currentPage]?.text) ? (
                    <img
                      src={sublevelContents[currentPage]?.text}
                      alt="Diagrama UML"
                      style={{ maxWidth: "100%", maxHeight: "100%" }}
                    />
                  ) : (
                    <div
                      dangerouslySetInnerHTML={formatQuestion(
                        sublevelContents[currentPage]?.text
                      )}
                    />
                  )}
                </Box>
              </>
            )}
          </Container>
          <Box mt={4} className="box-bottom">
            <Button colorScheme="blue" m={2} onClick={handlePrevPage}>
              Anterior
            </Button>
            <Button colorScheme="green" m={2} onClick={handleNextPage}>
              Próximo
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default SublevelContentPage;
