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
import { Button, ButtonGroup } from "@chakra-ui/react";
import PaginationBar from "./PaginationBar";

const DashTable = () => {
  const { challenges } = useChallenge();

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
      <Tfoot justifyContent="center">
        <PaginationBar
          currentPage={1}
          pageLimit={10}
          totalData={challenges.length}
        />
      </Tfoot>
    </Table>
  );
};

export default DashTable;
