import api from "./api";

export async function cadastrarTransacao({
  category_id,
  name,
  amount,
  type,
  description,
  date,
}) {
  try {
    const formData = new FormData();

    formData.append("category_id", category_id);
    formData.append("name", name);
    formData.append("amount", amount);
    formData.append("type", type); 
    formData.append("description", description);
    formData.append("date", date);
    formData.append("file", null); 

    const response = await api.post("/transactions", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Erro ao cadastrar transação:", error.response?.data || error);
    throw error.response?.data?.message || "Erro ao cadastrar transação.";
  }
}
export async function listarTransacoes() {
  try {
    const response = await api.get("/transactions");
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Erro ao listar transações.";
  }
}