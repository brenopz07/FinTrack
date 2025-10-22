import { Modal, Pressable, TouchableOpacity, View } from "react-native";
import { useState } from "react";
import styled from "styled-components/native";
import { Calendar } from "react-native-calendars";
import { useEffect } from "react";
import { listarCategorias } from "../../services/categoryService";
import { Picker } from "@react-native-picker/picker"; // precisa instalar se não tiver
import { cadastrarTransacao } from "../../services/transactionService";
import {
  BotaoGradientBackground,
  ButtonTouchable,
  LabelInput,
  MiniTexto,
  SubTitulo,
  Texto,
  TextoInput,
} from "../../Styleguide/styles";

import { CardModal, Linha } from "../modalReceita";
import { BotaoCancelar } from "../modalConfirm";
import CalendarModal from "../CalendarModal";

export default function ModalAdiciona({
  modalAddView,
  setModalAddView,
  receita,
  receitas,
  setReceitas,
  dark
}) {
  const hoje = new Date();
  const dataFormatada = `${hoje.getDate().toString().padStart(2, "0")}/${(
    hoje.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}/${hoje.getFullYear()}`;

  const [valor, setValor] = useState("");
  const [titulo, setTitulo] = useState("");
  const [data, setData] = useState(dataFormatada);
  const [categorias, setCategorias] = useState([]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("");

  const [descricao, setDescricao] = useState("");
  const [showCalendar, setShowCalendar] = useState(false);
  useEffect(() => {
    async function carregarCategorias() {
      try {
        const data = await listarCategorias();
        setCategorias(data);
      } catch (error) {
        console.error("Erro ao carregar categorias:", error);
      }
    }

    carregarCategorias();
  }, []);

  const limparInputs = () => {
    setValor("");
    setTitulo("");
    setCategoriaSelecionada("")
    setData(dataFormatada);
    setDescricao("");
  };

  const adicionarItem = async () => {
    if (!titulo || !valor || !data || !descricao || !categoriaSelecionada) {
      alert("Preencha todos os campos para confirmar");
      return;
    }

    try {
      const valorNumerico = Number(
        String(valor).replace(/\./g, "").replace(",", ".")
      );

      const [dia, mes, ano] = data.split("/");
      const dataISO = new Date(`${ano}-${mes}-${dia}T12:00:00Z`).toISOString();

      const novaTransacao = {
        category_id: categoriaSelecionada,
        name: titulo,
        amount: valorNumerico,
        type: receita ? "income" : "expense",
        description: descricao,
        date: dataISO,
      };

      await cadastrarTransacao(novaTransacao);

      alert(`${receita ? "Receita" : "Despesa"} cadastrada com sucesso!`);
      setModalAddView(false);
      limparInputs();
    } catch (error) {
      console.error("Erro ao cadastrar transação:", error);
      alert("Não foi possível cadastrar a transação.");
    }
  };
  const handleChange = (texto) => {
    // Remove tudo que não for número
    const numero = texto.replace(/\D/g, "");

    if (!numero) {
      setValor("");
      return;
    }

    // Transforma em número com 2 casas decimais
    const valor = Number(numero) / 100;

    // Formata com vírgula e ponto de milhar
    const valorFormatado = valor.toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    setValor(valorFormatado);
  };

  return (
    <Modal dark={dark}
      visible={modalAddView}
      transparent
      animationType="fade"
      onRequestClose={() => setModalAddView(false)}
    >
      <Pressable
        onPress={() => setModalAddView(false)}
        style={{
          flex: 1,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          justifyContent: "flex-end",
        }}
      >
        <Pressable onPress={() => {}}>
          <CardModal dark={dark}>
            <View style={{ flexDirection: "row" }}>
              <SubTitulo dark={dark}>Adicione uma nova </SubTitulo>
              <SubTitulo style={{ color: receita ? "#34A853" : "red" }}>
                {receita ? "receita" : "despesa"}
              </SubTitulo>
            </View>
            <Linha dark={dark} />

            <LabelInput dark={dark}>
              <MiniTexto dark={dark} style={{ marginBottom: -12 }}>Título</MiniTexto>
              <TextoInput
                placeholder="Digite aqui"
                value={titulo}
                onChangeText={setTitulo}
                placeholderTextColor={(!dark ? '#1E1E1E' : '#f0f2f5')}
                style={{color:!dark ? '#1E1E1E' : '#f0f2f5'}}
              />
            </LabelInput>

            <LabelInput dark={dark}>
              <MiniTexto dark={dark} style={{ marginBottom: -12 }}>Descrição</MiniTexto>
              <TextoInput
                placeholder="Digite aqui"
                value={descricao}
                onChangeText={setDescricao}
                placeholderTextColor={(!dark ? '#1E1E1E' : '#f0f2f5')}
                style={{color:!dark ? '#1E1E1E' : '#f0f2f5'}}
              />
            </LabelInput>

            <View style={{ width: "100%", flexDirection: "row", gap: 10 }}>
              <LabelInput dark={dark} style={{ flex: 1 }}>
                <MiniTexto dark={dark} style={{ marginBottom: -12 }}>Valor</MiniTexto>
                <TextoInput
                  placeholder="R$ 0,00"
                  value={valor}
                  onChangeText={handleChange}
                  placeholderTextColor={(!dark ? '#1E1E1E' : '#f0f2f5')}
                  style={{color:!dark ? '#1E1E1E' : '#f0f2f5'}}
                />
              </LabelInput>

              <LabelInput dark={dark} style={{ flex: 1 }}>
                <MiniTexto dark={dark} style={{ marginBottom: -12 }}>Data</MiniTexto>

                {/* Campo que abre o calendário */}
                <TouchableOpacity onPress={() => setShowCalendar(true)}>
                  <TextoInput dark={dark}
                    placeholder="Selecionar data"
                    value={data}
                    editable={false}
                    pointerEvents="none"
                  />
                </TouchableOpacity>
              </LabelInput>
            </View>

            <LabelInput dark={dark} style={{height:'auto'}}>
              <MiniTexto dark={dark} style={{ marginBottom: 0 }}>Categoria</MiniTexto>
              <Picker
                selectedValue={categoriaSelecionada}
                onValueChange={(itemValue) =>
                setCategoriaSelecionada(itemValue)
                }
                style={{
                  backgroundColor: (dark ? '#1E1E1E' : '#f0f2f5'),
                  borderRadius: 8,
                  height: "10px",
                }}
              >
                <Picker.Item  style={{color:(!dark ? '#1E1E1E' : '#f0f2f5'), backgroundColor:(dark ? '#1E1E1E' : '#f0f2f5')}} label="Selecione uma categoria" value="" />
                {categorias.map((cat) => (
                  <Picker.Item key={cat.id} label={cat.name} value={cat.id} style={{color:(!dark ? '#1E1E1E' : '#f0f2f5'), backgroundColor:(dark ? '#1E1E1E' : '#f0f2f5')}} />
                ))}
              </Picker>
            </LabelInput>

            <View style={{ flexDirection: "row", gap: 16, width: "100%" }}>
              <BotaoCancelar dark={dark}
                style={{ flex: 1, borderColor:(dark ? 'black' : '#f0f2f5') }}
                onPress={() => setModalAddView(false)}
              >
                <Texto dark={dark} style={{ alignSelf: "center" }}>Cancelar</Texto>
              </BotaoCancelar>

              <BotaoGradientBackground style={{ flex: 1.5 }}>
                <ButtonTouchable onPress={adicionarItem}>
                  <SubTitulo style={{ color: "#FFFFFF" }}>Confirmar</SubTitulo>
                </ButtonTouchable>
              </BotaoGradientBackground>
            </View>
          </CardModal>
        </Pressable>
      </Pressable>
      <CalendarModal
        showCalendar={showCalendar}
        setShowCalendar={setShowCalendar}
        data={data}
        setData={setData}
      />
    </Modal>
  );
}
