import { Modal, Pressable, TouchableOpacity, View } from "react-native";
import { useState } from "react";
import styled from "styled-components/native";
import { Calendar } from "react-native-calendars";

import { 
  BotaoGradientBackground, 
  ButtonTouchable, 
  LabelInput, 
  MiniTexto, 
  SubTitulo, 
  Texto, 
  TextoInput 
} from "../../Styleguide/styles";

import { CardModal, Linha } from "../modalReceita";
import { BotaoCancelar } from "../modalConfirm";
import CalendarModal from "../CalendarModal";

export default function ModalAdiciona({ modalAddView, setModalAddView, receita, receitas, setReceitas }) {
const hoje = new Date();
const dataFormatada = `${hoje.getDate().toString().padStart(2,'0')}/${(hoje.getMonth()+1).toString().padStart(2,'0')}/${hoje.getFullYear()}`;

  const [valor, setValor] = useState('');
  const [titulo, setTitulo] = useState('');
  const [data, setData] = useState(dataFormatada);
  const [categoria, setCategoria] = useState('');
  const [descricao, setDescricao] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);

  const limparInputs = () => {
    setValor('');
    setTitulo('');
    setData(dataFormatada);
    setCategoria('');
    setDescricao('');
  };

  const adicionarItem = () => {
    if (!titulo || !valor || !data || !descricao || !categoria) {
      alert("Preencha todos os campos para confirmar");
      return;
    }

    const novoItem = {
      id: Date.now().toString(),
      tipo: receita ? 'receita' : 'despesa',
      titulo,
      valor : Number(String(valor).replace(/\./g, '').replace(',', '.')),
      data,
      descricao,
      categoria,
    };

    setReceitas(prev => [...prev, novoItem]);
    alert(`${receita ? 'Receita' : 'Despesa'} adicionada com sucesso!`);
    setModalAddView(false);
    limparInputs();
  };

 const handleChange = (texto) => {
      // Remove tudo que não for número
  const numero = texto.replace(/\D/g, '');

  if (!numero) {
    setValor('');
    return;
  }

  // Transforma em número com 2 casas decimais
  const valor = Number(numero) / 100;

  // Formata com vírgula e ponto de milhar
  const valorFormatado = valor.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  setValor(valorFormatado);
};



  return (
    <Modal
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
          <CardModal>
            <View style={{ flexDirection: "row" }}>
              <SubTitulo>Adicione uma nova </SubTitulo>
              <SubTitulo style={{ color: receita ? "#34A853" : "red" }}>
                {receita ? "receita" : "despesa"}
              </SubTitulo>
            </View>
            <Linha />

            <LabelInput>
              <MiniTexto style={{ marginBottom: -12 }}>Título</MiniTexto>
              <TextoInput
                placeholder="Digite aqui"
                value={titulo}
                onChangeText={setTitulo}
              />
            </LabelInput>

            <LabelInput>
              <MiniTexto style={{ marginBottom: -12 }}>Descrição</MiniTexto>
              <TextoInput
                placeholder="Digite aqui"
                value={descricao}
                onChangeText={setDescricao}
              />
            </LabelInput>

            <View style={{ width: "100%", flexDirection: "row", gap: 10 }}>
              <LabelInput style={{ flex: 1 }}>
                <MiniTexto style={{ marginBottom: -12 }}>Valor</MiniTexto>
                <TextoInput
                  placeholder="R$ 0,00"
                  value={valor}
                  onChangeText={handleChange}
                />
              </LabelInput>

              <LabelInput style={{ flex: 1 }}>
                <MiniTexto style={{ marginBottom: -12 }}>Data</MiniTexto>

                {/* Campo que abre o calendário */}
                <TouchableOpacity onPress={() => setShowCalendar(true)}>
                  <TextoInput
                    placeholder="Selecionar data"
                    value={data}
                    editable={false}
                    pointerEvents="none"
                  />
                </TouchableOpacity>
              </LabelInput>
            </View>

            <LabelInput>
              <MiniTexto style={{ marginBottom: -12 }}>Categoria</MiniTexto>
              <TextoInput
                placeholder="Digite aqui"
                value={categoria}
                onChangeText={setCategoria}
              />
            </LabelInput>

            <View style={{ flexDirection: "row", gap: 16, width: "100%" }}>
              <BotaoCancelar
                style={{ flex: 1, borderColor: "#F0F2F5" }}
                onPress={() => setModalAddView(false)}
              >
                <Texto style={{ alignSelf: "center" }}>Cancelar</Texto>
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
      <CalendarModal showCalendar={showCalendar} setShowCalendar={setShowCalendar} data={data} setData={setData}/>
    </Modal>
  );
}
