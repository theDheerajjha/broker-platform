export const mockLogin = async (email, password) => {
  if (email === "test@liquide.com" && password === "1234") {
    return { status: 200, token: "fake-token" };
  } else if (email && password) {
    return { status: 400 };
  } else {
    return { status: 500 };
  }
}; 