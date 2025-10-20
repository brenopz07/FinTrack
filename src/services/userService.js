import api from "./api";

export async function cadastrarUsuario({ name, email, password }) {
  try {
    const response = await api.post("/users", {
      name,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao cadastrar usuário:", error.response?.data || error);
    throw error;
  }
}
  export async function loginUsuario({email, password}) {
    try {
      const response = await api.post("/auth", { email, password });
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || "Erro ao fazer login.";
    }
  }