import api from "./api";

export async function listarCategorias() {
  try {
    const response = await api.get("/categories");
    return response.data;
  } catch (error) {
    console.error("Erro ao cadastrar usuário:", error.response?.data || error);
    throw error;
  }
}