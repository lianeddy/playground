import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import { useState } from "react";
import { Form } from "react-bootstrap";
// import { LoginAction } from "../../context/actions";
import { useAuthDispatch } from "../../context/context";
import { useStudents } from "../../hooks";

const AuthModal = ({ modalOpen, onClose }) => {
  const { students } = useStudents();
  const [selectedStudent, setSelectedStudent] = useState("");
  const dispatch = useAuthDispatch();

  const loginHandler = () => {
    // LoginAction(dispatch, {id: selectedStudent, role: 'student'});
    onClose();
  };
  return (
    <Modal
      motionPreset="slideInBottom"
      isOpen={modalOpen}
      onClose={onClose}
      closeOnOverlayClick={false}
    >
      <ModalOverlay />
      <ModalContent pb={5}>
        <ModalHeader>Login now</ModalHeader>
        <ModalBody>
          <Form.Select
            aria-label="Default select example"
            onChange={(e) => setSelectedStudent(e.currentTarget.value)}
          >
            <option>Select Student Auth</option>
            {students &&
              students.map((val) => <option value={val.id}>{val.name}</option>)}
          </Form.Select>
        </ModalBody>
        <ModalFooter>
          <Button onClick={loginHandler}>Login</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AuthModal;
