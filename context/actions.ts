const staff = { id: "S-543", user: "staff", role: "staff" };
const student = {
  id: "MI-123",
  name: "Michael",
  email: "michael@mail.com",
};

export const LoginAction = async (dispatch, role) => {
  if (role === "staff") {
    localStorage.setItem("tokenStaff", JSON.stringify(staff));
    dispatch({ type: "LOGIN", payload: staff });
  } else {
    localStorage.setItem("tokenStudent", JSON.stringify(student));
    dispatch({ type: "LOGIN", payload: student });
  }
  // if (data.role === "staff") {
  //   localStorage.setItem("tokenStaff", JSON.stringify(data));
  // } else {
  //   const { data } = await axios.get(`${API_URL}/students?id=${id}`);
  //   LoginAction(dispatch, { ...data, role: "student" });

  //   localStorage.setItem("tokenStudent", JSON.stringify(data));
  // }
  // dispatch({ type: "LOGIN", payload: data });
};
