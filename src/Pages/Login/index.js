import React, { useState, useEffect } from "react";
import { View, Image, TouchableOpacity, Alert, KeyboardAvoidingView, ScrollView, Platform, KeyboardAvoidingViewBase, Keyboard } from "react-native";
import {
  Background,
  BotaoGradientBackground,
  ButtonText,
  ButtonTouchable,
  LabelInput,
  MiniTexto,
  SubTitulo,
  Texto,
  TextoInput,
} from "../../Styleguide/styles";
import styled from "styled-components/native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import logo from "../../assets/Logo.png";
import vector from "../../assets/Vector.png";
import checkboxTrue from "../../assets/Checkbox.png";
import checkboxFalse from "../../assets/Subtract.png";
import error from "../../assets/Error icon.png";
import visualizar from "../../assets/olho.png";
import { loginUsuario } from "../../services/userService";
import { useNavigation } from "@react-navigation/native";
import AppRoutes from "../../Routes";
import { useTheme } from "../../contexts/ThemeContext";

import { Animated, Easing } from "react-native";

export default function Login() {
  const navigation = useNavigation();
  const dark = useTheme();

  const [selecionado, setSelecionado] = useState(false);
  const [email, setEmail] = useState(null);
  const [senha, setSenha] = useState(null);
  const [mensagem, setMensagem] = useState("");
  const [visualizarSenha, setVisualizarSenha] = useState(true);
  const [conectado, setConectado] = useState(false);

  const mostrarSenha = () => setVisualizarSenha(false);
  const naoMostrarSenha = () => setVisualizarSenha(true);
  const handleSelect = () => setSelecionado(!selecionado);

  const handleLogin = async () => {
    if (!email || !senha) {
      setMensagem("Preencha todos os campos");
      setConectado(false);
      return;
    }
    try {
      const data = await loginUsuario({ email, password: senha });
      await AsyncStorage.setItem("token", data.token);
      await AsyncStorage.setItem(
        "usuarioLogado",
        JSON.stringify({ id: data.id, nome: data.name, email: data.email })
      );
      setMensagem("");
      if (selecionado) setConectado(true);
      navigation.navigate("Home", { nome: data.name, email: data.email });
      setEmail("");
      setSenha("");
    } catch (error) {
      console.log("Erro no login:", error);
      const mensagemErro = error || "Não foi possível fazer login.";
      Alert.alert("Erro", mensagemErro);
      setMensagem(mensagemErro);
      setConectado(false);
    }
  };

  useEffect(() => {
    const verificarLogin = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        const usuarioLogado = await AsyncStorage.getItem("usuarioLogado");
        if (token && usuarioLogado) {
          const user = JSON.parse(usuarioLogado);
          navigation.navigate("Home", { nome: user.nome, email: user.email });
        }
      } catch (error) {
        console.log("Erro ao verificar login:", error);
      }
    };
    verificarLogin();
  }, []);


// logo abaixo dos seus outros states:
const [translateY] = useState(new Animated.Value(0));

useEffect(() => {
  const showSub = Keyboard.addListener("keyboardDidShow", (e) => {
    Animated.timing(translateY, {
      toValue: -e.endCoordinates.height / 2, // move o card pra cima metade da altura do teclado
      duration: 250,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  });

  const hideSub = Keyboard.addListener("keyboardDidHide", () => {
    Animated.timing(translateY, {
      toValue: 0,
      duration: 250,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  });

  return () => {
    showSub.remove();
    hideSub.remove();
  };
}, []);


  return (
  <Background>
    {/* TOPO */}
    <View
      style={{
        marginHorizontal: 30,
        marginTop: 25,
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <TouchableOpacity onPress={() => navigation.navigate("Inicial")}>
        <Image source={vector} style={{ width: 8, height: 16 }} />
      </TouchableOpacity>

      <View style={{ gap: 8, flexDirection: "row" }}>
        <MiniTexto style={{ color: "#F0F2F5", alignSelf: "center", marginTop: 4 }}>
          Não tem conta ainda?
        </MiniTexto>
        <BotaoCadastrar onPress={() => navigation.navigate("Cadastro")}>
          <Texto style={{ color: "#F0F2F5" }}>Cadastre-se</Texto>
        </BotaoCadastrar>
      </View>
    </View>

    {/* LOGO */}
    <ContainerLogo style={{ flexDirection: "row", width: 249, height: 86, justifyContent: "center" }}>
      <Image source={logo} style={{ width: 80, height: 80, resizeMode: "contain" }} />
      <View style={{ flexDirection: "column", justifyContent: "center", gap: -50 }}>
        <TextoLogo style={{ color: "#FFFFFF" }}>Fin</TextoLogo>
        <TextoLogo style={{ color: "#FFFFFF", marginTop: -40 }}>Track</TextoLogo>
      </View>
    </ContainerLogo>

    {/* FUNDO DO CARD */}
    <BackCard dark={!dark} style={{ alignSelf: "center" }} />

    {/* ENVOLVE O CARD NO AVOIDINGVIEW */}
    <Animated.View
       style={{
        position:"absolute",
        bottom:0,
        right:0,
        left:0,
        transform: [{ translateY }],
  }}
    >
        <Card
          dark={!dark}
          style={{
          }}
        >
          <View style={{ alignItems: "center" }}>
            <View style={{ alignItems: "center", gap: 5, paddingTop: 50 }}>
              <SubTitulo dark={!dark} style={{ textAlign: "center" }}>
                Seja bem vindo de volta!
              </SubTitulo>
              <MiniTexto dark={!dark}>Preencha as informações</MiniTexto>
            </View>

            {/* CAMPOS */}
            <View style={{ paddingTop: 32, gap: 16 }}>
              <LabelInput dark={!dark}>
                <MiniTexto dark={!dark} style={{ marginBottom: -12 }}>Email</MiniTexto>
                <TextoInput
                  placeholder="Digite aqui"
                  value={email}
                  onChangeText={setEmail}
                  placeholderTextColor={dark ? "#1E1E1E" : "#ffffff"}
                  style={{ color: dark ? "#1E1E1E" : "#f0f2f5" }}
                />
              </LabelInput>

              <LabelInput dark={!dark}>
                <MiniTexto dark={!dark} style={{ marginBottom: -12 }}>Senha</MiniTexto>
                <View style={{ flexDirection: "row" }}>
                  <TextoInput
                    dark={!dark}
                    placeholder="Digite aqui"
                    value={senha}
                    onChangeText={setSenha}
                    secureTextEntry={visualizarSenha}
                    placeholderTextColor={dark ? "#1E1E1E" : "#ffffff"}
                    style={{ color: dark ? "#1E1E1E" : "#f0f2f5" }}
                  />
                  <TouchableOpacity
                    style={{ position: "absolute", right: 10 }}
                    onPressIn={mostrarSenha}
                    onPressOut={naoMostrarSenha}
                  >
                    <Image source={visualizar} />
                  </TouchableOpacity>
                </View>
              </LabelInput>

              {mensagem !== "" && (
                <View style={{ flexDirection: "row", gap: 3 }}>
                  <Image
                    source={error}
                    style={{ width: 11, height: 11, resizeMode: "contain", marginTop: 3 }}
                  />
                  <MiniTexto style={{ color: "red" }}>{mensagem}</MiniTexto>
                </View>
              )}

              <MiniTexto dark={!dark} style={{ alignSelf: "flex-end" }}>Esqueceu a senha?</MiniTexto>

              <BotaoGradientBackground>
                <ButtonTouchable>
                  <ButtonText
                    style={{ color: "white" }}
                    onPress={() => { handleLogin(); console.log(conectado); }}
                  >
                    Confirmar
                  </ButtonText>
                </ButtonTouchable>
              </BotaoGradientBackground>

              <View style={{ flexDirection: "row", gap: 5, alignItems: "center" }}>
                <TouchableOpacity onPress={handleSelect}>
                  <Image
                    source={!selecionado ? checkboxTrue : checkboxFalse}
                    style={{ width: 12, height: 12, resizeMode: "contain" }}
                  />
                </TouchableOpacity>
                <MiniTexto dark={!dark}>Continuar conectado</MiniTexto>
              </View>
            </View>

            <AppRoutes conectado={conectado} />
          </View>
        </Card>
    </Animated.View>
  </Background>
);

}


const TextoLogo = styled.Text`
  font-family: "Poppins_Bold";
  font-size: 48px;
  letter-spacing: 0;
`;
const ContainerLogo = styled.View`
  width: 249px;
  height: 86px;
  top: 50px;
  left: 70px;
  gap: 20px;
  opacity: 1;
`;
const Card = styled.View`
  width: 100%;
  min-height: 480px;
  border-top-left-radius: 32px;
  border-top-right-radius: 32px;
  background-color: ${({ dark }) => (dark ? "#1E1E1E" : "#ffffff")};

`;
const BackCard = styled.View`
  width: 320px;
  height: 480px;
  opacity: 1;
  border-top-left-radius: 32px;
  border-top-right-radius: 32px;
  position: absolute;
  bottom: 13px;
  background-color: ${({ dark }) => (dark ? "#2C2C2CB2" : "#F0F2F580")};
  z-index: 0;
`;
const BotaoCadastrar = styled.TouchableOpacity`
  width: 102px;
  height: 29px;
  gap: 10px;
  padding-top: 4px;
  padding-right: 6px;
  padding-bottom: 4px;
  padding-left: 6px;
  border-radius: 6px;
  background: #ffffff33;
  backdrop-filter: blur(100px);
`;
