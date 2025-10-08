import React, {useState} from 'react';
import { View, Image, TouchableOpacity, Alert } from 'react-native';
import { Background, BotaoGradientBackground, ButtonText, ButtonTouchable,  LabelInput,  MiniTexto, SubTitulo, Texto, TextoInput} from '../../Styleguide/styles';
import styled, { withTheme } from 'styled-components/native';

import logo from '../../assets/Logo.png';
import vector from '../../assets/Vector.png';

import error from '../../assets/Error icon.png'
import olho from '../../assets/Vector (1).png'

import { useNavigation } from '@react-navigation/native';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Cadastro(){

const navigation = useNavigation();

const [email, setEmail] = useState('');
const [senha, setSenha] = useState('');
const [nome, setNome] = useState('');
const [confirmaSenha, setConfirmaSenha] = useState('');

const [visualizarSenha, setVisualizarSenha] = useState(true);
const [visualizarConfirmaSenha, setVisualizarConfirmaSenha] = useState(true);

const [mensagem, setMensagem] = useState('');

const mostrarSenha = () => {
    setVisualizarSenha(false)
}

const naoMostrarSenha = () => {
    setVisualizarSenha(true)
}

const mostrarConfirmaSenha = () => {
    setVisualizarConfirmaSenha(false)
}

const naoMostrarConfirmaSenha = () => {
    setVisualizarConfirmaSenha(true)
}


  const handleCadastro = async () => {
        if (!email.trim() || !senha.trim() || !confirmaSenha.trim() || !nome.trim()) {
            setMensagem("Por favor, preencha todos os campos.");
            return;
        }if (senha !== confirmaSenha) {
                setMensagem('As senhas não coincidem');
            return;}
        if (senha.length < 6 && senha.length > 1){
            setMensagem("A senha deve ter no mínimo 6 caracteres.");
            return;
        }else{
         try {
      // Pegar usuários cadastrados
      const usuariosSalvos = await AsyncStorage.getItem('usuarios');
      const usuarios = usuariosSalvos ? JSON.parse(usuariosSalvos) : [];
      // Checar se o email já existe
      const emailExistente = usuarios.find(u => u.email === email);
      if (emailExistente) {
        setMensagem('Este email já está cadastrado');
        return;
      }

      // Adicionar novo usuário
      const novoUsuario = { nome, email, senha };
      usuarios.push(novoUsuario);

      // Salvar no AsyncStorage
      await AsyncStorage.setItem('usuarios', JSON.stringify(usuarios));
      const usuariosAtualizados = await AsyncStorage.getItem('usuarios');
      console.log('Usuários atualizados:', JSON.parse(usuariosAtualizados));
      Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
      navigation.navigate("Login")
      // Limpar campos
      setNome('');
      setEmail('');
      setSenha('');
      setConfirmaSenha('');

    } catch (error) {
      console.log(error);
      Alert.alert('Erro', 'Não foi possível salvar o cadastro');
    }
    }
  };

    return(

    <Background>
        <View style={{marginHorizontal:30, marginTop:25, justifyContent:'space-between', flexDirection:'row', alignItems:'center'}}>
            <TouchableOpacity onPress={ () => navigation.navigate('Inicial') }>
                <Image source={vector} style={{width:8, height:16}}></Image>
            </TouchableOpacity>
            <View style={{gap:8, flexDirection:'row'}}>
                <MiniTexto style={{color:'#F0F2F5', alignSelf:'center', marginTop:4}}> Já tem conta? </MiniTexto>
                <BotaoLogin onPress={ () => navigation.navigate('Login') }>
                    <Texto style={{color:'#F0F2F5'}}>Login</Texto>
                </BotaoLogin>
            </View>
        </View>
        <ContainerLogo style={{flexDirection:'row', width:249, height:86, justifyContent:'center'}}> 
            <Image source={logo} style={{width:80, height:80,resizeMode:'contain'}}></Image>
            {/* Novo View para agrupar 'Fin' e 'Track' lado a lado do logo */}
            <View style={{flexDirection: 'column', justifyContent: 'center', gap:-50}}>
                <TextoLogo style={{color:'#FFFFFF'}}>
                    Fin
                </TextoLogo>
                {/* Novo componente de texto para 'Track' */}
                <TextoLogo style={{color:'#FFFFFF', marginTop:-40}}>
                    Track
                </TextoLogo>
            </View>
        </ContainerLogo>
            

            <BackCard style={{alignSelf:'center'}}>    
            </BackCard>
            <Card>
                <View style={{alignItems:'center'}}>
                    
                    <View style={{alignItems:'center', gap:5, paddingTop:50}}>
                        <SubTitulo style={{textAlign:'center'}}>
                            Seja bem vindo!
                        </SubTitulo>
                        <MiniTexto>
                            Se junte a nós e tenha controle do seu dinheiro.
                        </MiniTexto>
                    </View>

                    <View style={{paddingTop:32, gap:16}}>
                        <LabelInput>
                            <MiniTexto style={{marginBottom:-12}}>
                                Email
                            </MiniTexto>
                            <TextoInput 
                                placeholder='Digite aqui'
                                value={email}
                                onChangeText={setEmail}
                                >
                            </TextoInput>
                        </LabelInput>

                        <LabelInput>
                            <MiniTexto style={{marginBottom:-12}}>
                                Nome
                            </MiniTexto>
                            <TextoInput 
                                placeholder='Digite aqui'
                                value={nome}
                                onChangeText={setNome}
                                >
                            </TextoInput>
                        </LabelInput>

                        <LabelInput>
                            <MiniTexto style={{marginBottom:-12}}>
                                Senha 
                            </MiniTexto>
                            <View style={{flexDirection:'row'}}>
                                <TextoInput 
                                    placeholder='Digite aqui'
                                    value={senha}
                                    onChangeText={setSenha}
                                    secureTextEntry={visualizarSenha}
                                    >
                                </TextoInput>
                                <TouchableOpacity style={{position: 'absolute',right: 10}} onPressIn={mostrarSenha} onPressOut={naoMostrarSenha}>
                                    <Image source={olho} style={{marginTop:0}}>
                                    </Image>
                                </TouchableOpacity>
                            </View>
                        </LabelInput>

                        <LabelInput>
                            <MiniTexto style={{marginBottom:-12}}>
                                Confirme a senha 
                            </MiniTexto>
                            <View style={{flexDirection:'row'}}>
                                <TextoInput 
                                    placeholder='Digite aqui'
                                    value={confirmaSenha}
                                    onChangeText={setConfirmaSenha}
                                    secureTextEntry={visualizarConfirmaSenha}
                                    >
                                </TextoInput>
                                <TouchableOpacity style={{position: 'absolute',right: 10}} onPressIn={mostrarConfirmaSenha} onPressOut={naoMostrarConfirmaSenha}>
                                    <Image source={olho} style={{marginTop:0}}>
                                    </Image>
                                </TouchableOpacity>
                            </View>
                        </LabelInput>

                        {mensagem !== '' && (
                            <View style={{flexDirection:'row',position: 'absolute',left: 4, gap:3, bottom:340}}>
                                <Image source={error} style={{width:11, height:11, resizeMode:'contain', marginTop:4}}></Image>               
                                <MiniTexto
                                style={{color: 'red'}}
                                >
                                {mensagem}
                                </MiniTexto>
                            </View>
                        )}

                        <BotaoGradientBackground>
                            <ButtonTouchable onPress={handleCadastro}>
                                <ButtonText>
                                    Cadastrar
                                </ButtonText>
                            </ButtonTouchable>
                        </BotaoGradientBackground>
                        

                    </View>
                </View>
            </Card>
    </Background>
    )
}


const TextoLogo = styled.Text`
font-family: 'Poppins_Bold';
font-size: 48px;
letter-spacing: 0;
`
const ContainerLogo = styled.View`
width: 249px;
height: 86px;
top: 30px;
left: 70px;
gap: 20px;
angle: 0 deg;
opacity: 1;
`
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
background: #FFFFFF;

`
const BackCard = styled.View`
width: 320;
height: 540px;
angle: 0 deg;
opacity: 1;
border-top-left-radius: 32px;
border-top-right-radius: 32px;
position:absolute;
bottom: 13;
background: #F0F2F580;
zIndex:0;
`
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
background: #FFFFFF33;
backdrop-filter: blur(100px)

`
