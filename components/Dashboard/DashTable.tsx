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
// import { LoginAction } from "../../context/actions";
import { useAuthDispatch, useAuthState } from "../../context/context";
import AuthModal from "../Auth/AuthModal";
import ReviewerModal from "./ReviewerModal";
import { Form } from "react-bootstrap";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import AddChallengeModal from "./AddChallengeModal";

const gradeRange = [1, 2, 3, 4, 5];

const DashTable = ({ query }) => {
  const { user } = useAuthState();
  const {
    challenges,
    fetchChallenges,
    setChallenges,
    setGradeChallenge,
    fetchReviewChallengesStudent,
    fetchMyCreatedChallenge,
  } = useChallenge();
  // const { query } = useRouter();
  const dispatch = useAuthDispatch();
  const [modalAuthOpen, setModalAuthOpen] = useState(false);
  const [reviewerModalOpen, setReviewerModalOpen] = useState(false);
  const [addChallengeModalOpen, setAddChallengeModalOpen] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState("");
  const [selectedChallengeId, setSelectedChallengeId] = useState("");
  const [tabIndex, setTabIndex] = useState(0);

  useEffect(() => {
    if (query.role === "staff") {
      fetchChallenges();
    } else {
      fetchMyCreatedChallenge(user.id);
    }

    return () => {
      setChallenges([]);
    };
  }, [user, query.role]);

  useEffect(() => {
    if (query.role === "staff") {
      fetchChallenges();
    } else {
      fetchMyCreatedChallenge(user.id);
    }
  }, [reviewerModalOpen, addChallengeModalOpen]);

  useEffect(() => {
    if (tabIndex === 0 && query.role === "student") {
      fetchMyCreatedChallenge(user.id);
    } else if (tabIndex === 1 && query.role === "student") {
      fetchReviewChallengesStudent(user.id);
    }
  }, [tabIndex]);

  const handleSelectedId = (studentId, id) => {
    setSelectedChallengeId(id);
    setSelectedStudentId(studentId);
    setReviewerModalOpen(true);
  };

  const GradeChallenge = (gradeValue, selectedChallengeId) => {
    setGradeChallenge({ gradeValue, selectedChallengeId });
  };

  const renderStaffTable = () => {
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
              <Td>
                <Form.Select
                  onChange={(e) => GradeChallenge(e.currentTarget.value, id)}
                  defaultValue={grade}
                >
                  {gradeRange.map((item, idx) => {
                    return (
                      <option value={item} key={idx}>
                        {item}
                      </option>
                    );
                  })}
                </Form.Select>
              </Td>
              <Td>{reviewerId}</Td>
              <Td>
                <Button colorScheme="red">Grade</Button>
                <Button
                  colorScheme="teal"
                  onClick={() => handleSelectedId(studentId, id)}
                >
                  Set Reviewer
                </Button>
              </Td>
            </Tr>
          );
        }
      )
    );
  };

  const renderStudentTable = () => {
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
                <Button colorScheme="red">Student</Button>
                <Button colorScheme="red">Delete</Button>
              </Td>
            </Tr>
          );
        }
      )
    );
  };
  return (
    <div>
      {query.role === "student" ? (
        <Tabs onChange={(index) => setTabIndex(index)}>
          <TabList>
            <Tab>My Challenges</Tab>
            <Tab>Peer Review</Tab>
          </TabList>
        </Tabs>
      ) : null}
      <Table variant="simple">
        <TableCaption>Imperial to metric conversion factors</TableCaption>
        <Thead>
          <Tr>
            <Th>id</Th>
            <Th>Student ID</Th>
            <Th>Google Drive Folder </Th>
            <Th>Grading Status</Th>
            <Th>Grade</Th>
            <Th>Reviewer ID</Th>
            <Th colSpan={2}>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {query.role === "staff" ? renderStaffTable() : renderStudentTable()}
        </Tbody>
        <Tfoot>
          {query.role === "student" ? (
            <Tr>
              <Button onClick={() => setAddChallengeModalOpen(true)}>
                Add Challenge
              </Button>
            </Tr>
          ) : null}
          <PaginationBar
            currentPage={1}
            pageLimit={10}
            totalData={challenges.length}
          />
        </Tfoot>

        {modalAuthOpen ? (
          <AuthModal
            modalOpen={modalAuthOpen}
            onClose={() => setModalAuthOpen(false)}
          />
        ) : null}
        {reviewerModalOpen ? (
          <ReviewerModal
            modalOpen={reviewerModalOpen}
            onClose={() => setReviewerModalOpen(false)}
            selectedStudentId={selectedStudentId}
            selectedChallengeId={selectedChallengeId}
          />
        ) : null}
        {addChallengeModalOpen ? (
          <AddChallengeModal
            modalOpen={addChallengeModalOpen}
            onClose={() => setAddChallengeModalOpen(false)}
            selectedStudentId={user.id}
            name={user.name}
          />
        ) : null}
      </Table>
    </div>
  );
};

export default DashTable;
