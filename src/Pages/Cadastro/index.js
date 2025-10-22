import React, { useState } from "react";
import { View, Image, TouchableOpacity, Alert } from "react-native";
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
import styled, { withTheme } from "styled-components/native";
import { cadastrarUsuario } from "../../services/userService";
import logo from "../../assets/Logo.png";
import vector from "../../assets/Vector.png";

import error from "../../assets/Error icon.png";
import olho from "../../assets/olho.png";

import { useNavigation } from "@react-navigation/native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from "../../contexts/ThemeContext";

export default function Cadastro() {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [nome, setNome] = useState("");
  const [confirmaSenha, setConfirmaSenha] = useState("");

  const [visualizarSenha, setVisualizarSenha] = useState(true);
  const [visualizarConfirmaSenha, setVisualizarConfirmaSenha] = useState(true);

  const [mensagem, setMensagem] = useState("");

  const dark = useTheme();

  const mostrarSenha = () => {
    setVisualizarSenha(false);
  };

  const naoMostrarSenha = () => {
    setVisualizarSenha(true);
  };

  const mostrarConfirmaSenha = () => {
    setVisualizarConfirmaSenha(false);
  };

  const naoMostrarConfirmaSenha = () => {
    setVisualizarConfirmaSenha(true);
  };
  const handleCadastro = async () => {
    if (!email.trim() || !senha.trim() || !confirmaSenha.trim() || !nome.trim()) {
      setMensagem("Por favor, preencha todos os campos.");
      return;
    }
  
    if (senha !== confirmaSenha) {
      setMensagem("As senhas não coincidem.");
      return;
    }
  
    if (senha.length < 6) {
      setMensagem("A senha deve ter no mínimo 6 caracteres.");
      return;
    }
  
    try {
      await cadastrarUsuario({ name: nome, email, password: senha });
      Alert.alert("Sucesso", "Cadastro realizado com sucesso!");
      navigation.navigate("Login");
    } catch (error) {
      const msg = error.response?.data?.error || "Erro ao cadastrar usuário.";
      Alert.alert("Erro", msg);
    }
  };
  return (
    <Background>
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
          <Image source={vector} style={{ width: 8, height: 16 }}></Image>
        </TouchableOpacity>
        <View style={{ gap: 8, flexDirection: "row" }}>
          <MiniTexto 
            style={{ color: "#F0F2F5", alignSelf: "center", marginTop: 4 }}
          >
            {" "}
            Já tem conta?{" "}
          </MiniTexto>
          <BotaoLogin onPress={() => navigation.navigate("Login")}>
            <Texto style={{ color: "#F0F2F5" }}>Login</Texto>
          </BotaoLogin>
        </View>
      </View>
      <ContainerLogo
        style={{
          flexDirection: "row",
          width: 249,
          height: 86,
          justifyContent: "center",
          marginTop:-15,
        }}
      >
        <Image
          source={logo}
          style={{ width: 80, height: 80, resizeMode: "contain" }}
        ></Image>
        {/* Novo View para agrupar 'Fin' e 'Track' lado a lado do logo */}
        <View
          style={{
            flexDirection: "column",
            justifyContent: "center",
            gap: -80,
          
          }}
        >
          <TextoLogo style={{ color: "#FFFFFF" }}>Fin</TextoLogo>
          {/* Novo componente de texto para 'Track' */}
          <TextoLogo style={{ color: "#FFFFFF", marginTop: -40 }}>
            Track
          </TextoLogo>
        </View>
      </ContainerLogo>

      <BackCard dark={dark} style={{ alignSelf: "center" }}></BackCard>
      <Card dark={dark}>
        <View style={{ alignItems: "center" }}>
          <View style={{ alignItems: "center", gap: 5, paddingTop: 50 }}>
            <SubTitulo dark={dark} style={{ textAlign: "center" }}>
              Seja bem vindo!
            </SubTitulo>
            <MiniTexto dark={dark}>
              Se junte a nós e tenha controle do seu dinheiro.
            </MiniTexto>
          </View>

          <View style={{ paddingTop: 32, gap: 16 }}>
            <LabelInput dark={dark}>
              <MiniTexto dark={dark} style={{ marginBottom: -12 }}>Email</MiniTexto>
              <TextoInput
                placeholder="Digite aqui"
                value={email}
                onChangeText={setEmail}
                placeholderTextColor={!dark ? '#1E1E1E' : '#ffffff'}
                style={{color:!dark ? '#1E1E1E' : '#f0f2f5'}}
              ></TextoInput>
            </LabelInput>

            <LabelInput dark={dark}>
              <MiniTexto dark={dark} style={{ marginBottom: -12 }}>Nome</MiniTexto>
              <TextoInput
                placeholder="Digite aqui"
                value={nome}
                onChangeText={setNome}
                placeholderTextColor={!dark ? '#1E1E1E' : '#ffffff'}
                style={{color:!dark ? '#1E1E1E' : '#f0f2f5'}}
              ></TextoInput>
            </LabelInput>

            <LabelInput dark={dark}>
              <MiniTexto dark={dark} style={{ marginBottom: -12 }}>Senha</MiniTexto>
              <View style={{ flexDirection: "row" }}>
                <TextoInput
                  placeholder="Digite aqui"
                  value={senha}
                  onChangeText={setSenha}
                  secureTextEntry={visualizarSenha}
                  placeholderTextColor={!dark ? '#1E1E1E' : '#ffffff'}
                  style={{color:!dark ? '#1E1E1E' : '#f0f2f5'}}
                ></TextoInput>
                <TouchableOpacity
                  style={{ position: "absolute", right: 10 }}
                  onPressIn={mostrarSenha}
                  onPressOut={naoMostrarSenha}
                  placeholderTextColor={!dark ? '#1E1E1E' : '#ffffff'}
                  
                >
                  <Image source={olho} style={{ marginTop: 0 }}></Image>
                </TouchableOpacity>
              </View>
            </LabelInput>

            <LabelInput dark={dark}>
              <MiniTexto dark={dark} style={{ marginBottom: -12 }}>
                Confirme a senha
              </MiniTexto>
              <View style={{ flexDirection: "row" }}>
                <TextoInput
                  placeholder="Digite aqui"
                  value={confirmaSenha}
                  onChangeText={setConfirmaSenha}
                  secureTextEntry={visualizarConfirmaSenha}
                  placeholderTextColor={!dark ? '#1E1E1E' : '#ffffff'}
                  style={{color:!dark ? '#1E1E1E' : '#f0f2f5'}}
                ></TextoInput>
                <TouchableOpacity
                  style={{ position: "absolute", right: 10 }}
                  onPressIn={mostrarConfirmaSenha}
                  onPressOut={naoMostrarConfirmaSenha}
                >
                  <Image source={olho} style={{ marginTop: 0 }}></Image>
                </TouchableOpacity>
              </View>
            </LabelInput>

            {mensagem !== "" && (
              <View
                style={{
                  flexDirection: "row",
                  position: "absolute",
                  left: 4,
                  gap: 3,
                  bottom: 340,
                }}
              >
                <Image
                  source={error}
                  style={{
                    width: 11,
                    height: 11,
                    resizeMode: "contain",
                    marginTop: 4,
                  }}
                ></Image>
                <MiniTexto style={{ color: "red" }}>{mensagem}</MiniTexto>
              </View>
            )}

            <BotaoGradientBackground>
              <ButtonTouchable onPress={handleCadastro}>
                <ButtonText style={{color:'white'}}>Cadastrar</ButtonText>
              </ButtonTouchable>
            </BotaoGradientBackground>
          </View>
        </View>
      </Card>
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
  top: 30px;
  left: 70px;
  gap: 20px;
  angle: 0 deg;
  opacity: 1;
`;
const Card = styled.View`
  width: 100%;
  height: 540px;
  gap: 32px;
  angle: 0 deg;
  opacity: 1;
  border-top-left-radius: 32px;
  border-top-right-radius: 32px;
  padding-top: 20px;
  padding-right: 30px;
  padding-bottom: 20px;
  padding-left: 30px;
  position: absolute;
  bottom: 0;
 background-color: ${({ dark }) => (dark ? '#1E1E1E' : '#ffffff')};
`;
const BackCard = styled.View`
  width: 320;
  height: 540px;
  angle: 0 deg;
  opacity: 1;
  border-top-left-radius: 32px;
  border-top-right-radius: 32px;
  position: absolute;
  bottom: 13;
  zindex: 0;
   background-color: ${({ dark }) => (dark ? '#2C2C2CB2' : '#F0F2F580')};
`;
const BotaoLogin = styled.TouchableOpacity`
  width: 49;
  height: 29;
  gap: 10px;
  angle: 0 deg;
  opacity: 1;
  padding-top: 4px;
  padding-right: 6px;
  padding-bottom: 4px;
  padding-left: 6px;
  border-radius: 6px;
  background: #ffffff33;
  backdrop-filter: blur(100px);
`;
