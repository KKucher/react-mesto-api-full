export const apiOptions = {
  // baseUrl: "http://localhost:3003",
  // baseUrl: "http://api.mesto.students.nomoreparties.xyz",
  // baseUrl: "https://mesto.nomoreparties.co/v1/cohort-15",
  baseUrl: `${window.location.protocol}${process.env.REACT_APP_API_URL || '//localhost:3001'}`,
  headers: {
    // authorization: `Bearer ${localStorage.getItem("token")}`,
    // authorization: "805da766-1e17-442b-aa98-c904fbf55e62",
    "Content-Type": "application/json",
  },
};
