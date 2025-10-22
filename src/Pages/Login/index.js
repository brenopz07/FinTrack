import React, {useState} from 'react';
import { View, Image, TouchableOpacity, Alert } from 'react-native';
import { Background, BotaoGradientBackground, ButtonText, ButtonTouchable,  LabelInput,  MiniTexto, SubTitulo, Texto, TextoInput} from '../../Styleguide/styles';
import styled, { withTheme } from 'styled-components/native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import logo from '../../assets/Logo.png';
import vector from '../../assets/Vector.png';
import checkboxTrue from '../../assets/Checkbox.png'
import checkboxFalse from '../../assets/Subtract.png'
import error from '../../assets/Error icon.png'
import visualizar from '../../assets/olho.png'
import { loginUsuario } from '../../services/userService';
import { DarkTheme, useNavigation } from '@react-navigation/native';

import AuthRoutes from '../../Routes/auth.routes';
import AppRoutes from '../../Routes';
import { useTheme } from '../../contexts/ThemeContext';

export default function Login(){

const navigation = useNavigation();

const [selecionado, setSelecionado] = useState(false);
const [email, setEmail] = useState(null);
const [senha, setSenha] = useState(null);

const [mensagem, setMensagem] = useState('');

const[visualizarSenha, setVisualizarSenha] = useState(true);

const [conectado, setConectado] = useState(false);

const dark = useTheme();


const mostrarSenha = () => {
    setVisualizarSenha(false)
}

const naoMostrarSenha = () => {
    setVisualizarSenha(true)
}

const handleSelect = () => {
        setSelecionado(!selecionado); 
    };
    
    // Função principal de Login
    const handleLogin = async () => {
        if (!email || !senha) {
          setMensagem('Preencha todos os campos');
          setConectado(false);
          return;
        }
      
        try {
          const data = await loginUsuario({ email, password: senha });
      
      
          await AsyncStorage.setItem('token', data.token);
          await AsyncStorage.setItem('usuarioLogado', JSON.stringify({
            id: data.id,
            nome: data.name,
            email: data.email,
          }));
    
          setMensagem('');
          if (selecionado) {
            setConectado(true);
          }
      
          navigation.navigate('Home', { 
            nome: data.name,
            email: data.email,
          });
      
          setEmail('');
          setSenha('');
      
        } catch (error) {
          console.log('Erro no login:', error);
          const mensagemErro = error || 'Não foi possível fazer login.';
          Alert.alert('Erro', mensagemErro);
          setMensagem(mensagemErro);
          setConectado(false);
        }
      };

    return(
    <Background>
        <View style={{marginHorizontal:30, marginTop:25, justifyContent:'space-between', flexDirection:'row', alignItems:'center'}}>
            <TouchableOpacity onPress={ () => navigation.navigate('Inicial') }>
                <Image source={vector} style={{width:8, height:16}}></Image>
            </TouchableOpacity>
            <View style={{gap:8, flexDirection:'row'}}>
                <MiniTexto style={{color:'#F0F2F5', alignSelf:'center', marginTop:4}}> Não tem conta ainda? </MiniTexto>
                <BotaoCadastrar onPress={ () => navigation.navigate('Cadastro') }>
                    <Texto style={{color:'#F0F2F5'}}>Cadastre-se</Texto>
                </BotaoCadastrar>
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
            

            <BackCard dark={dark} style={{alignSelf:'center'}}>    
            </BackCard>
            <Card dark={dark}>
                <View style={{alignItems:'center'}}>
                    
                    <View style={{alignItems:'center', gap:5, paddingTop:50}}>
                        <SubTitulo dark={dark} style={{textAlign:'center'}}>
                            Seja bem vindo de volta!
                        </SubTitulo>
                        <MiniTexto dark={dark}>
                            Preencha as informações
                        </MiniTexto>
                    </View>

                    <View style={{paddingTop:32, gap:16}}>
                        <LabelInput dark={dark}>
                            <MiniTexto dark={dark} style={{marginBottom:-12}}>
                                Email
                            </MiniTexto>
                            <TextoInput 
                                placeholder='Digite aqui'
                                value={email}
                                onChangeText={setEmail}
                                placeholderTextColor={!dark ? '#1E1E1E' : '#ffffff'}
                                style={{color:!dark ? '#1E1E1E' : '#f0f2f5'}}
                                >
                            </TextoInput>
                        </LabelInput>

                        <LabelInput dark={dark}>
                            <MiniTexto dark={dark} style={{marginBottom:-12}}>
                                Senha
                            </MiniTexto>
                            <View style={{flexDirection:'row'}}>
                                <TextoInput dark={dark}
                                    placeholder='Digite aqui'
                                    value={senha}
                                    onChangeText={setSenha}
                                    secureTextEntry={visualizarSenha}
                                    placeholderTextColor={!dark ? '#1E1E1E' : '#ffffff'}
                                    style={{color:!dark ? '#1E1E1E' : '#f0f2f5'}}
                                    >
                                </TextoInput>
                                <TouchableOpacity style={{position: 'absolute',right: 10}} onPressIn={mostrarSenha} onPressOut={naoMostrarSenha}>
                                    <Image source={visualizar} style={{marginTop:0}}>
                                    </Image>
                                </TouchableOpacity>
                            </View>
                        </LabelInput>

                        {mensagem !== '' && (
                            <View style={{flexDirection:'row',position: 'absolute',bottom: 118,left: 4, gap:3}}>
                                <Image source={error} style={{width:11, height:11, resizeMode:'contain', marginTop:3}}></Image>               
                                <MiniTexto
                                style={{
                                    color: 'red',
                                }}
                                >
                                {mensagem}
                                </MiniTexto>
                            </View>
                        )}

                        <MiniTexto dark={dark} style={{alignSelf:'flex-end'}}>
                            Esqueceu a senha?
                        </MiniTexto>

                        <BotaoGradientBackground>
                            <ButtonTouchable>
                                <ButtonText style={{color: 'white'}} onPress={() => {handleLogin(), console.log(conectado)}}>
                                    Confirmar
                                </ButtonText>
                            </ButtonTouchable>
                        </BotaoGradientBackground>
                        
                        <View style={{flexDirection:'row', gap:5, alignItems:'center', borderRadius:2}}>
                            <TouchableOpacity onPress={handleSelect}>
                                <Image source={!selecionado ? checkboxTrue : checkboxFalse} style={{width:12, height:12, resizeMode:'contain', marginBottom:1.8, marginLeft:3 }}></Image>
                            </TouchableOpacity>
                            <MiniTexto dark={dark}>
                                Continuar conectado
                            </MiniTexto>
                        </View>
                    </View>
                        <AppRoutes conectado={conectado}/>
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
top: 50px;
left: 70px;
gap: 20px;
angle: 0 deg;
opacity: 1;
`
const Card = styled.View`
width: 100%;
height: 480px;
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

`
const BackCard = styled.View`
width: 320;
height: 480px;
angle: 0 deg;
opacity: 1;
border-top-left-radius: 32px;
border-top-right-radius: 32px;
position:absolute;
bottom: 13;
 background-color: ${({ dark }) => (dark ? '#2C2C2CB2' : '#F0F2F580')};
zIndex:0;
`
const BotaoCadastrar = styled.TouchableOpacity`
width: 102;
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
backdrop-filter: blur(100px);
`
