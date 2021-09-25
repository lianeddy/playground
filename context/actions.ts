const staff = { user: "staff", role: "staff" };

export const LoginAction = async (dispatch, data = staff) => {
  if (data.role === "staff") {
    localStorage.setItem("tokenStaff", JSON.stringify(data));
  } else {
    localStorage.setItem("tokenStudent", JSON.stringify(data));
  }
  dispatch({ type: "LOGIN", payload: data });
};
