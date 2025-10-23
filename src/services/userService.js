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
    console.error("Erro ao cadastrar usuário:", error.response?.data.error || error);
    throw error;
  }
}
  export async function loginUsuario({email, password}) {
    try {
      const response = await api.post("/auth", { email, password });
      return response.data;
    } catch (error) {
      throw error.response?.data?.error || "Erro ao fazer login.";
    }
  }

  export async function editarNomeUsuario({ name, token }) {
  try {
    const response = await api.put(
      "/users",
      { name },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data; // retorna o usuário atualizado
  } catch (error) {
    console.error("Erro ao editar nome do usuário:", error.response?.data || error);
    throw error;
  }
}