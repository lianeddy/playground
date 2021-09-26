import axios from "axios";
import { useEffect, useState } from "react";
import { Challenge } from "../interfaces";
import { API_URL } from "../util";
import { useIsMounted } from "./useIsMounted";

export const useChallenge = () => {
  const isMounted = useIsMounted();

  const [challenges, setChallenges] = useState<Challenge[]>([]);

  // const fetchChallenges = async (role, studentId?) => {
  //   if (role === "staff") {
  //     const { data } = await axios.get(`${API_URL}/challenges`);
  //     setChallenges(data);
  //   } else {
  //     const { data } = await axios.get(
  //       `${API_URL}/challenges?studentId=${studentId}`
  //     );
  //     setChallenges(data);
  //   }
  // };

  const fetchChallenges = async () => {
    const { data } = await axios.get(`${API_URL}/challenges`);
    setChallenges(data);
  };

  const fetchReviewChallengesStudent = async (studentId) => {
    // const token = localStorage.getItem("tokenStudent");
    const { data } = await axios.get(
      `${API_URL}/review?studentId=${studentId}`
    );
    setChallenges(data);
  };

  const fetchMyCreatedChallenge = async (studentId) => {
    const { data } = await axios.get(
      `${API_URL}/challenges?studentId=${studentId}`
    );
    setChallenges(data);
  };

  const setReviewerChallenge = async ({
    selectedChallengeId,
    reviewerId,
    onClose,
  }) => {
    if (isMounted) {
      const { data } = await axios.put(`${API_URL}/challenges`, {
        selectedChallengeId,
        reviewerId,
      });
      setChallenges(data);
    }
    onClose();
  };

  const setGradeChallenge = async ({ gradeValue, selectedChallengeId }) => {
    let gradingStatus = "";
    if (gradeValue === "5") {
      gradingStatus = "GRADE_FAILED";
    } else if (gradeValue < "5" && gradeValue > "0") {
      gradingStatus = "GRADE_PASSED";
    }
    const { data } = await axios.patch(`${API_URL}/challenges`, {
      gradeValue,
      selectedChallengeId,
      gradingStatus,
    });
    setChallenges(data);
  };

  const postChallenge = async (googleDriveFolder, studentId, name, onClose) => {
    const insertData = {
      studentId,
      name,
      googleDriveFolder,
      gradingStatus: "SUBMITTED",
      grade: "",
      reviewerId: "",
    };
    const { data } = await axios.post(`${API_URL}/challenges`, insertData);
    setChallenges(data);
    onClose();
  };

  // useEffect(() => {
  //   fetchChallenges();

  //   return () => {
  //     setChallenges([]);
  //   };
  // }, []);

  // useEffect(() => {
  //   fetchChallenges(roleType, studentId);
  // }, [roleType]);

  return {
    challenges,
    setReviewerChallenge,
    fetchChallenges,
    setChallenges,
    setGradeChallenge,
    fetchReviewChallengesStudent,
    fetchMyCreatedChallenge,
    postChallenge,
  };
};
