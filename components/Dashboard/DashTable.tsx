import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
} from "@chakra-ui/react";
import { useChallenge } from "../../hooks";
import { Button } from "@chakra-ui/react";
import PaginationBar from "./PaginationBar";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { LoginAction } from "../../context/actions";
import { useAuthDispatch, useAuthState } from "../../context/context";
import AuthModal from "../Auth/AuthModal";

const DashTable = ({ query }) => {
  const { challenges } = useChallenge();
  // const { query } = useRouter();
  const { user } = useAuthState();
  const dispatch = useAuthDispatch();
  const [modalOpen, setModalOpen] = useState(false);

  console.log(user);

  useEffect(() => {
    if (query.role === "staff") {
      LoginAction(dispatch);
    } else {
      const token = localStorage.getItem("tokenStudent");
      console.log(token);
      if (!token) {
        setModalOpen(true);
      }
    }
  }, [query.role]);

  const renderChallenges = () => {
    return (
      challenges &&
      challenges.map(
        (
          {
            id,
            studentId,
            googleDriveFolder,
            gradingStatus,
            grade,
            reviewerId,
          },
          index
        ) => {
          return (
            <Tr key={index}>
              <Td>{id}</Td>
              <Td>{studentId}</Td>
              <Td>{googleDriveFolder}</Td>
              <Td>{gradingStatus}</Td>
              <Td>{grade}</Td>
              <Td>{reviewerId}</Td>
              <Td>
                <Button colorScheme="red">Delete</Button>
                <Button colorScheme="teal">Set Reviewer</Button>
              </Td>
            </Tr>
          );
        }
      )
    );
  };
  return (
    <Table variant="simple">
      <TableCaption>Imperial to metric conversion factors</TableCaption>
      <Thead>
        <Tr>
          <Th>#</Th>
          <Th>Student ID</Th>
          <Th>Google Drive Folder </Th>
          <Th>Grading Status</Th>
          <Th>Grade</Th>
          <Th>Reviewer ID</Th>
          <Th colSpan={2}>Actions</Th>
        </Tr>
      </Thead>
      <Tbody>{renderChallenges()}</Tbody>
      <PaginationBar
        currentPage={1}
        pageLimit={10}
        totalData={challenges.length}
      />
      {modalOpen ? (
        <AuthModal modalOpen={modalOpen} onClose={() => setModalOpen(false)} />
      ) : null}
    </Table>
  );
};

export default DashTable;
