import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
// import { LoginAction } from "../../context/actions";
import { useAuthDispatch } from "../../context/context";
import { useChallenge, useStudents } from "../../hooks";

const ReviewerModal = ({
  modalOpen,
  onClose,
  selectedStudentId,
  selectedChallengeId,
}) => {
  const { students, fetchReviewer } = useStudents();
  const { setReviewerChallenge } = useChallenge();
  const [selectedReviewer, setSelectedReviewer] = useState("");
  const dispatch = useAuthDispatch();

  useEffect(() => {
    fetchReviewer(selectedStudentId);
  }, []);

  const setReviewerAction = (reviewerId) => {
    setReviewerChallenge({ selectedChallengeId, reviewerId, onClose });
  };
  return (
    <Modal motionPreset="slideInBottom" isOpen={modalOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent pb={5}>
        <ModalHeader>Set Reviewer</ModalHeader>
        <ModalBody>
          <Form.Select
            aria-label="Default select example"
            onChange={(e) => setSelectedReviewer(e.currentTarget.value)}
          >
            <option>Select Student Reviewer</option>
            {students &&
              students.map((val) => (
                <option value={val.id} key={val.id}>
                  {val.name}
                </option>
              ))}
          </Form.Select>
        </ModalBody>
        <ModalFooter>
          <Button onClick={() => setReviewerAction(selectedReviewer)}>
            Confirm
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ReviewerModal;
