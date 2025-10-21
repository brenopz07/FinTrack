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

export async function editarTransacao(
  id,
  { user_id, category_id, name, amount, type, description, date, file_url = null, file = null }
) {
  try {
    // Verifica se a data é string e converte
    let formattedDate = date;

    if (typeof date === "string" && date.includes("/")) {
      // Converte de "DD/MM/YYYY" → "YYYY-MM-DD"
      const [dia, mes, ano] = date.split("/");
      formattedDate = `${ano}-${mes}-${dia}`;
    }

    // Garante que está em formato ISO válido
    const validDate = new Date(formattedDate);
    if (isNaN(validDate)) throw new Error("Data inválida enviada.");

    const body = {
      user_id,
      category_id,
      name,
      amount,
      type,
      description,
      date: validDate.toISOString(), // ← garante formato aceito pelo Prisma
      file_url,
      file,
    };

    const response = await api.put(`/transactions/${id}`, body, {
      headers: { "Content-Type": "application/json" },
    });

    return response.data;
  } catch (error) {
    console.error("Erro ao editar transação:", error.response?.data || error);
    throw error.response?.data?.message || "Erro ao editar transação.";
  }
}


// Excluir transação
export async function excluirTransacao(id) {
  try {
    const response = await api.delete(`/transactions/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao excluir transação:", error.response?.data || error);
    throw error.response?.data?.message || "Erro ao excluir transação.";
  }
}