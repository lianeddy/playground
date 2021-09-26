import axios from "axios";
import { useEffect, useState } from "react";
// import { LoginAction } from "../context/actions";
import { useAuthDispatch } from "../context/context";
import { Student } from "../interfaces";
import { API_URL } from "../util";

export const useStudents = () => {
  const dispatch = useAuthDispatch();

  const [students, setStudents] = useState<Student[]>([]);

  const fetchStudents = async () => {
    const { data } = await axios.get(`${API_URL}/students`);
    setStudents(data);
  };

  const fetchReviewer = async (studentId) => {
    console.log(studentId);
    const { data } = await axios.get(
      `${API_URL}/students?student_id=${studentId}`
    );
    setStudents(data);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return { students, fetchReviewer };
};
