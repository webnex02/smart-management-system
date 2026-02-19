const ADMIN = {
  email: "admin@gmail.com",
  password: "123456",
};

export const login = async (email, password) => {
  if (email === ADMIN.email && password === ADMIN.password) {
    localStorage.setItem("auth", JSON.stringify({ email }));
    return true;
  }
  throw new Error("Invalid credentials");
};

export const logout = () => {
  localStorage.removeItem("auth");
  window.location.href = "/login";
};

export const isAuthenticated = () => {
  return !!localStorage.getItem("auth");
};
