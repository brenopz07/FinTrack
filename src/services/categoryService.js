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

export async function novaCategoria({name}) {
  try {
    const response = await api.post("/categories", {name});
    return response.data;
  } catch (error) {
    console.error("Erro ao cadastrar usuário:", error.response?.data || error);
    throw error;
  }
}

export async function editarCategoria({id, name}) {
  try {
const body={name}
    const response = await api.post(`/categories/${id}`, body,  {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao cadastrar usuário:", error.response?.data.error || error);
    throw error;
  }
}