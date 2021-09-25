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
import { useStudents } from "../../hooks";

const AuthModal = ({ modalOpen, onClose }) => {
  const { students, setStudentLogin } = useStudents();
  const [selectedStudent, setSelectedStudent] = useState("");

  const loginHandler = () => {
    setStudentLogin(selectedStudent);
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
            {students && students.map((val) => <option>{val.name}</option>)}
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
