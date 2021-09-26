import { useState } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
} from "@chakra-ui/react";
import { useChallenge } from "../../hooks";

const AddChallengeModal = ({ modalOpen, onClose, selectedStudentId, name }) => {
  const { postChallenge } = useChallenge();
  const [input, setInput] = useState("");

  const handlePost = () => {
    postChallenge(input, selectedStudentId, name, onClose);
  };
  return (
    <Modal motionPreset="slideInBottom" isOpen={modalOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent pb={5}>
        <ModalHeader>Add Challenge</ModalHeader>
        <ModalBody>
          <Input
            placeholder="Google Drive Link"
            onChange={(e) => setInput(e.currentTarget.value)}
            value={input}
          />
        </ModalBody>
        <ModalFooter>
          <Button onClick={handlePost}>Confirm</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddChallengeModal;
