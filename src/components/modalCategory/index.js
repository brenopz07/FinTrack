import React, { useEffect, useState } from "react";
import { Modal, Pressable, TextInput, TouchableOpacity, View, FlatList, Alert } from "react-native";
import styled from "styled-components/native";
import { Texto, SubTitulo } from "../../Styleguide/styles";
import {
  listarCategorias,
  novaCategoria,
  editarCategoria,
} from "../../services/categoryService";
import api from "../../services/api"; // ✅ corrigido para import padrão

export default function ModalCategory({ modalCategoryView, setModalCategoryView, dark }) {
  const [categorias, setCategorias] = useState([]);
  const [nova, setNova] = useState("");
  const [editandoId, setEditandoId] = useState(null);
  const [novoNome, setNovoNome] = useState("");

  // 🔹 Buscar categorias
  const carregarCategorias = async () => {
    try {
      const categoriasResponse = await listarCategorias();
      setCategorias(categoriasResponse || []);
    } catch (erro) {
      console.log("Erro ao carregar categorias:", erro);
    }
  };

  // 🔹 Adicionar nova categoria
  const adicionarCategoria = async () => {
    if (!nova.trim()) return;
    try {
      await novaCategoria({ name: nova });
      setNova("");
      carregarCategorias();
    } catch (erro) {
      console.log("Erro ao adicionar categoria:", erro);
    }
  };

  // 🔹 Editar categoria existente
  const salvarEdicao = async (id) => {
    if (!novoNome.trim()) return;
    try {
      await editarCategoria({ id, name: novoNome });
      setEditandoId(null);
      setNovoNome("");
      carregarCategorias();
    } catch (erro) {
      console.log("Erro ao editar categoria:", erro);
    }
  };

  // 🔹 Excluir categoria
  const excluirCategoria = async (id) => {
    try {
      await api.delete(`/categories/${id}`);
      carregarCategorias();
    } catch (erro) {
      console.error("Erro ao excluir categoria:", erro);
      Alert.alert("❌ Não foi possível excluir", "Confira se não há transações com essa categoria.");
    }
  };

  useEffect(() => {
    if (modalCategoryView) carregarCategorias();
  }, [modalCategoryView]);

  return (
    <Modal
      visible={modalCategoryView}
      transparent={true}
      animationType="fade"
      onRequestClose={() => setModalCategoryView(false)}
    >
      <Pressable
        onPress={() => setModalCategoryView(false)}
        style={{
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.5)",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Pressable onPress={() => {}}>
          <CardModalCategory dark={dark}>
            <SubTitulo dark={dark} style={{ textAlign: "center" }}>
              Categorias
            </SubTitulo>

            {/* Campo para nova categoria */}
            <View style={{ flexDirection: "row", marginVertical: 10, gap: 8 }}>
              <InputCategoria
                placeholder="Nova categoria"
                placeholderTextColor={dark ? "#c5c5c5" : "#595959"}
                value={nova}
                onChangeText={setNova}
                dark={dark}
              />
              <BotaoAdicionar onPress={adicionarCategoria}>
                <Texto style={{ color: "#fff" }}>+</Texto>
              </BotaoAdicionar>
            </View>

            {/* Lista de categorias */}
            <FlatList
              data={categorias}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingVertical: 6,
                  }}
                >
                  {editandoId === item.id ? (
                    <>
                      <InputCategoria
                        value={novoNome}
                        onChangeText={setNovoNome}
                        dark={dark}
                        style={{ flex: 1 }}
                        autoFocus
                        onSubmitEditing={() => salvarEdicao(item.id)}
                      />
                      <TouchableOpacity onPress={() => salvarEdicao(item.id)}>
                        <Texto style={{ color: "#007AFF", marginLeft: 6 }}>✔</Texto>
                      </TouchableOpacity>
                    </>
                  ) : (
                    <>
                      <Texto dark={dark} style={{ flex: 1 }}>
                        • {item.name}
                      </Texto>
                      <TouchableOpacity
                        onPress={() => {
                          setEditandoId(item.id);
                          setNovoNome(item.name);
                        }}
                      >
                        <Texto style={{ color: "#007AFF", marginRight: 8 }}>✎</Texto>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => excluirCategoria(item.id)}>
                        <Texto style={{ color: "#EA4335" }}>✕</Texto>
                      </TouchableOpacity>
                    </>
                  )}
                </View>
              )}
            />

            <TouchableOpacity
              onPress={() => setModalCategoryView(false)}
              style={{ alignSelf: "center", marginTop: 16 }}
            >
              <Texto style={{ color: "#007AFF" }}>Fechar</Texto>
            </TouchableOpacity>
          </CardModalCategory>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const CardModalCategory = styled.View`
  width: 280px;
  max-height: 400px;
  background-color: ${({ dark }) => (dark ? "#1E1E1E" : "#ffffff")};
  border-radius: 20px;
  padding: 20px;
  elevation: 10;
`;

const InputCategoria = styled.TextInput`
  flex: 1;
  border-width: 1px;
  border-color: #c5c5c5;
  border-radius: 8px;
  padding: 6px 10px;
  color: ${({ dark }) => (dark ? "#f0f2f5" : "#1E1E1E")};
`;

const BotaoAdicionar = styled.TouchableOpacity`
  width: 35px;
  height: 35px;
  background-color: #007aff;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
`;
