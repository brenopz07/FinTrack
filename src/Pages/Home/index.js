import React, { useEffect, useMemo, useState } from "react";
import {
  View,
  Image,
  Text,
  Platform,
  ScrollView,
  TextInput,
  TouchableOpacity,
  FlatList,
  Modal,
  Pressable,
  SafeAreaView,
} from "react-native";
import {
  Background,
  BotaoGradientBackground,
  ButtonText,
  ButtonTouchable,
  MiniTexto,
  SubTitulo,
  Texto,
  TextoInput,
  Titulo,
} from "../../Styleguide/styles";
import styled from "styled-components/native";
import logo from "../../assets/Logo (1).png";
import user from "../../assets/user.png";
import olho from "../../assets/olhobranco.png";
import addDespesa from "../../assets/addDespesa.png";
import addReceita from "../../assets/addReceita.png";
import lupa from "../../assets/lupa.png";
import filtro from "../../assets/filtro.png";
import { listarTransacoes } from "../../services/transactionService";
import { LinearGradient } from "expo-linear-gradient";

import { meses, MesesScroll } from "../../components/seletor";

import ListaTransacoes, { modalReceita } from "../../components/lista_financas";
import ModalReceita from "../../components/modalReceita";
import ModalAdiciona from "../../components/modalAdd";
import ModalConfirm from "../../components/modalConfirm";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ModalUser from "../../components/ModalUser";
import { useRoute } from "@react-navigation/native";

import { useTheme } from "../../contexts/ThemeContext";

export default function Home() {
  const route = useRoute();
  const { nome, email } = route.params || {};
  const [nomeUsuario, setNomeUsuario] = useState(nome || "");
  const [emailUsuario, setEmailUsuario] = useState(email || "");

  const [receitas, setReceitas] = useState([]);
  const [mesSelecionado, setMesSelecionado] = useState(meses[0]);
  const [mesDesejado, setMesDesejado] = useState("");

  const [modalView, setModalView] = useState(false);
  const [modalAddView, setModalAddView] = useState(false);

  const [receita, setReceita] = useState(false);
  const [despesa, setDespesa] = useState(false);

  const [transacaoSelecionada, setTransacaoSelecionada] = useState(null);

  const [modalUserView, setModalUserView] = useState(false);

  const { dark , alternarTema } = useTheme()
  


  const handleMesSelecionado = (mes) => {
    setMesSelecionado(mes);
    if (mes === "Out/25") {
      setMesDesejado("10");
    } else if (mes === "Set/25") {
      setMesDesejado("09");
    } else if (mes === "Ago/25") {
      setMesDesejado("08");
    } else if (mes === "Jul/25") {
      setMesDesejado("07");
    } else if (mes === "Jun/25") {
      setMesDesejado("06");
    } else if (mes === "Mai/25") {
      setMesDesejado("05");
    } else if (mes === "Abr/25") {
      setMesDesejado("04");
    } else if (mes === "Mar/25") {
      setMesDesejado("03");
    } else if (mes === "Fev/25") {
      setMesDesejado("02");
    } else if (mes === "Jan/25") {
      setMesDesejado("01");
    } else setMesDesejado("");
  };

  const handleTransacaoPress = (item) => {
    setTransacaoSelecionada(item); // salva os dados do item
    setModalView(true); // abre o modal
  };

  const transacoesDoMes = useMemo(() => {
    return receitas.filter((item) => {
      const mesDaTransacao = item.data.split("/")[1];
      return mesDaTransacao === mesDesejado;
    });
  }, [receitas, mesDesejado]);

  const totalReceitas = receitas
    .filter((item) => item.tipo === "receita") // Filtra apenas as receitas
    .reduce((acumulador, item) => acumulador + item.valor, 0); // Soma os valores

  const totalDespesas = receitas
    .filter((item) => item.tipo === "despesa") // Filtra apenas as despesas
    .reduce((acumulador, item) => acumulador + item.valor, 0); // Soma os valores

  const saldoFinal = totalReceitas - totalDespesas;
  const ValorInteiro = Math.floor(saldoFinal);
  const Centavos = Math.round((saldoFinal - ValorInteiro) * 100)
    .toString()
    .padStart(2, "0");

  const totalReceitasDoMes = transacoesDoMes
    .filter((item) => item.tipo === "receita") // Filtra apenas as receitas
    .reduce((acumulador, item) => acumulador + item.valor, 0); // Soma os valores

  const totalDespesasDoMes = transacoesDoMes
    .filter((item) => item.tipo === "despesa") // Filtra apenas as despesas
    .reduce((acumulador, item) => acumulador + item.valor, 0); // Soma os valores

  const ReceitaInteiro = Math.floor(totalReceitasDoMes);
  const ReceitaCentavos = Math.round(
    (totalReceitasDoMes - ReceitaInteiro) * 100
  )
    .toString()
    .padStart(2, "0");

  const DespesaInteiro = Math.floor(totalDespesasDoMes);
  const DespesaCentavos = Math.round(
    (totalDespesasDoMes - DespesaInteiro) * 100
  )
    .toString()
    .padStart(2, "0");

  /*
    const limparReceitas = async () => {
        setReceitas([]); // limpa o estado
        try {
            await AsyncStorage.removeItem('@financas'); // remove do armazenamento local
            } catch (erro) {
                console.log("Erro ao limpar AsyncStorage:", erro);
                }
                };
                */

  useEffect(() => {
    const carregarUsuario = async () => {
      try {
        const usuarioSalvo = await AsyncStorage.getItem("usuarioLogado");
        if (usuarioSalvo) {
          const usuario = JSON.parse(usuarioSalvo);
          setEmailUsuario(usuario.email);
          setNomeUsuario(usuario.nome);
        }
      } catch (erro) {
        console.log("Erro ao carregar usuário logado:", erro);
      }
    };

    carregarUsuario();
  }, []);



useEffect(() => {
  const carregarTransacoes = async () => {
    if (!emailUsuario) return;

    try {
      const transacoesAPI = await listarTransacoes(); 

      const transacoesMapeadas = transacoesAPI.map((t) => ({
        id: t.id,
        titulo: t.name,
        valor: t.amount,
        tipo: t.type === "income" ? "receita" : "despesa",
        data: new Date(t.date).toLocaleDateString("pt-BR"), 
        categoria: t.category?.name || "",
        descricao: t.description || null,
      }));

      setReceitas(transacoesMapeadas);
    } catch (erro) {
      console.log("Erro ao carregar transações:", erro);
    }
  };

  carregarTransacoes();
}, [emailUsuario]);

  return (
    <View style={{ backgroundColor: dark ? '#1E1E1E' : '#FFFFFF', flex: 1, marginBottom: 15 }}>
      <View>
        <View
          style={{
            flexDirection: "row",
            marginTop: 30,
            marginHorizontal: 30,
            alignContent: "center",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <Image
              source={logo}
              style={{ width: 28, height: 28, resizeMode: "contain" }}
            ></Image>
            <SubTitulo style={{ paddingLeft: 8, color: "#4285F4" }}>
              FinTrack
            </SubTitulo>
          </View>
          <TouchableOpacity onPress={() => setModalUserView(true)}>
            <Image
              source={user}
              style={{ alignSelf: "end", resizeMode: "contain" }}
            ></Image>
          </TouchableOpacity>
        </View>

        <Card style={{ alignSelf: "center" }}>
          {mesSelecionado == "Geral" && (
            <View style={{ flexDirection: "row", gap: 10, marginLeft: 8 }}>
              <Texto style={{ color: "white" }}>Saldo atual</Texto>
              <Image
                source={olho}
                style={{
                  resizeMode: "contain",
                  width: 13,
                  height: 9,
                  alignSelf: "center",
                  marginBottom: 4,
                }}
              ></Image>
            </View>
          )}

          {mesSelecionado == "Geral" && (
            <View
              style={{
                flexDirection: "row",
                alignItems: "flex-start",
                padding: 3,
                marginLeft: 8,
              }}
            >
              <Texto style={{ color: "white", justifyContent: "end" }}>
                R$
              </Texto>
              <Titulo
                style={{ alignSelf: "start", color: "white", marginTop: -16 }}
              >
                {ValorInteiro}
              </Titulo>
              <Texto style={{ color: "white" }}>,{Centavos}</Texto>
            </View>
          )}

          {mesSelecionado != "Geral" && (
            <View style={{ flexDirection: "row", gap: 10 }}>
              <Texto style={{ color: "white", flex: 1, marginLeft: 8 }}>
                Receita mensal
              </Texto>
              <Texto style={{ color: "white", flex: 1 }}>Despesa mensal</Texto>
            </View>
          )}

          {mesSelecionado != "Geral" && (
            <View style={{ flexDirection: "row", marginLeft: 8 }}>
              <View style={{ flexDirection: "row", padding: 3, flex: 1 }}>
                <Texto style={{ color: "white" }}>R$</Texto>
                <Titulo
                  style={{ alignSelf: "start", color: "white", marginTop: -16 }}
                >
                  {ReceitaInteiro}
                </Titulo>
                <Texto style={{ color: "white" }}>,{ReceitaCentavos}</Texto>
              </View>
              <View style={{ flexDirection: "row", padding: 3, flex: 1 }}>
                <Texto style={{ color: "white" }}>R$</Texto>
                <Titulo
                  style={{ alignSelf: "start", color: "white", marginTop: -16 }}
                >
                  {DespesaInteiro}
                </Titulo>
                <Texto style={{ color: "white" }}>,{DespesaCentavos}</Texto>
              </View>
            </View>
          )}

          <View
            style={{
              flexDirection: "row",
              gap: 16,
              marginTop: -10,
              marginHorizontal: 8,
            }}
          >
            <BotaoAdd
              onPress={() => {
                setModalAddView(true);
                setReceita(true);
                setDespesa(false);
                console.log(transacoesDoMes);
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Texto style={{ color: "#34A853" }}>Receitas</Texto>
                <Image source={addReceita}></Image>
              </View>
            </BotaoAdd>
            <BotaoAdd
              onPress={() => {
                setModalAddView(true);
                setDespesa(true);
                setReceita(false);
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Texto style={{ color: "#EA4335" }}>Despesas</Texto>
                <Image source={addDespesa}></Image>
              </View>
            </BotaoAdd>
          </View>
        </Card>

        <MesesScroll dark={dark}
          mesSelecionado={mesSelecionado}
          handleMesSelecionado={handleMesSelecionado}
          TextoComponent={Texto}
        />

        {receitas.length > 0 && (
          <ContainerSearch dark={dark}>
            <SearchBar dark={dark} style={{ borderColor:(dark ? 'black' : '#f0f2f5') }}>
              <Image source={lupa}></Image>
              <TextoInput 
                style={{ marginBottom: -4, color:'red', textAlign:'center' }}
                placeholder="Pesquisa..."
                placeholderTextColor={(dark ? '#f0f2f5' : '#1E1E1E')}
              ></TextoInput>
            </SearchBar>
            <TouchableOpacity>
              <Image
                source={filtro}
                style={{
                  width: 20,
                  height: 15,
                  resizeMode: "contain",
                  marginBottom: 3,
                }}
              ></Image>
            </TouchableOpacity>
          </ContainerSearch>
        )}
      </View>

      {receitas.length > 0 && (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 16,
            marginHorizontal: 30,
          }}
        >
          <MiniTexto dark={dark}>Informações</MiniTexto>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "flex-end",
              gap: 30,
            }}
          >
            <MiniTexto dark={dark}>Valor</MiniTexto>
            <MiniTexto dark={dark}>Categoria</MiniTexto>
          </View>
        </View>
      )}

      {receitas.length === 0 && (
        <View style={{ alignSelf: "center" }}>
          <SubTitulo style={{ color: "#4285F4", margin: 30 }}>
            Seja bem-vindo, {nomeUsuario}!
          </SubTitulo>
        </View>
      )}

      <ListaTransacoes dark={dark}
        data={mesDesejado === "" ? receitas : transacoesDoMes}
        onTransacaoPress={handleTransacaoPress}
      />

      <ModalReceita 
        modalView={modalView}
        setModalView={setModalView}
        transacao={transacaoSelecionada}
        receita={receita}
        setReceita={setReceita}
        receitas={receitas}
        setReceitas={setReceitas}
        dark={dark}
      />

      <ModalAdiciona
        modalAddView={modalAddView}
        setModalAddView={setModalAddView}
        despesa={despesa}
        receita={receita}
        receitas={receitas}
        setReceitas={setReceitas}
        dark={dark}
      ></ModalAdiciona>

      <ModalUser
        modalUserView={modalUserView}
        setModalUserView={setModalUserView}
        nome={nomeUsuario}
        setNome={setNomeUsuario}
        dark={dark}
        alternarTema={alternarTema}
      />
    </View>
  );
}

const Card = styled(LinearGradient).attrs({
  colors: ["#4285F4", "#34A853"],
  start: { x: 0, y: 0 },
  end: { x: 1, y: 0 },
})`
  width: 85%;
  height: 144;
  gap: 8px;
  angle: 0 deg;
  opacity: 1;
  border-radius: 12px;
  padding: 16px;
  background: black;
  margin-top: 29;
  margin-right: 30;
  margin-left: 30;
`;
const BotaoAdd = styled.TouchableOpacity`
  flex: 1;
  height: 38;
  justify-content: space-between;
  angle: 0 deg;
  opacity: 1;
  border-radius: 999px;
  padding-top: 8px;
  padding-right: 8px;
  padding-bottom: 8px;
  padding-left: 16px;
  background: white;
  ${Platform.OS === "ios" &&
  `
    shadow-color: #000;
    shadow-offset: 0px 2px;
    shadow-opacity: 0.2;
    shadow-radius: 4px;
`}

  /* Android: Usa elevation */
${Platform.OS === "android" &&
  `
    elevation: 4; /* Valor para simular a elevação/sombra */
`}
`;

const SearchBar = styled.View`
  flex-direction: row;
  align-items: center;
  height: 37px;
  color: ${({ dark }) => (dark ? 'white' : '#1E1E1E')};
  border-radius: 999px;
  border-width: 2px;
  border-color: #F0F2F5;
  padding-left: 12;
  gap: 12;
  width: 78%;
  margin-left: 30;
`;

const ContainerSearch = styled.View`
  flex-direction: row;
  align-items: center;
  height: 37;
  gap: 8px;
  angle: 0 deg;
  opacity: 1;
  padding-right: 0px;
  margin-top: 30;
`;
