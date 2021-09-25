import axios from "axios";
import { useEffect, useState } from "react";
import { Challenge } from "../interfaces";
import { API_URL } from "../util";

export const useChallenge = () => {
  const [challenges, setChallenges] = useState<Challenge[]>();

  const fetchChallenges = async () => {
    const { data } = await axios.get(`http://localhost:3000/api/challenges`);
    setChallenges(data);
  };

  useEffect(() => {
    fetchChallenges();
  }, []);

  return { challenges };
};
