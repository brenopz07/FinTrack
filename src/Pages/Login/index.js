import React, {useState} from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { Background, BotaoGradientBackground, ButtonText, ButtonTouchable,  LabelInput,  MiniTexto, SubTitulo, Texto, TextoInput} from '../../Styleguide/styles';
import styled, { withTheme } from 'styled-components/native';
import logo from '../../assets/Logo.png';
import vector from '../../assets/Vector.png';
import checkboxTrue from '../../assets/Checkbox.png'
import checkboxFalse from '../../assets/Subtract.png'

export default function Inicial(){

const [selecionado, setSelecionado] = useState(null);

const handleSelect = () => {
        setSelecionado(!selecionado); 
    };

    return(

    <Background>
        <View style={{marginHorizontal:30, marginTop:25, justifyContent:'space-between', flexDirection:'row', alignItems:'center'}}>
            <Image source={vector} style={{width:8, height:16}}></Image>
            <View style={{gap:8, flexDirection:'row'}}>
                <MiniTexto style={{color:'#F0F2F5', alignSelf:'center', marginTop:4}}> Não tem conta ainda? </MiniTexto>
                <BotaoCadastrar>
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
            

            <BackCard style={{alignSelf:'center'}}>    
            </BackCard>
            <Card>
                <View style={{alignItems:'center'}}>
                    
                    <View style={{alignItems:'center', gap:5, paddingTop:50}}>
                        <SubTitulo style={{textAlign:'center'}}>
                            Seja bem vindo de volta!
                        </SubTitulo>
                        <MiniTexto>
                            Preencha as informações
                        </MiniTexto>
                    </View>

                    <View style={{paddingTop:32, gap:16}}>
                        <LabelInput>
                            <MiniTexto style={{marginBottom:-12}}>
                                Email
                            </MiniTexto>
                            <TextoInput >
                            </TextoInput>
                        </LabelInput>

                        <LabelInput>
                            <MiniTexto style={{marginBottom:-12}}>Senha
                            </MiniTexto>
                            <TextoInput >
                            </TextoInput>
                        </LabelInput>

                        <MiniTexto style={{alignSelf:'flex-end'}}>
                            Esqueceu a senha?
                        </MiniTexto>

                        <BotaoGradientBackground>
                            <ButtonTouchable>
                                <ButtonText>
                                    Confirmar
                                </ButtonText>
                            </ButtonTouchable>
                        </BotaoGradientBackground>
                        
                        <View style={{flexDirection:'row', gap:5, alignItems:'center', borderRadius:2}}>
                            <TouchableOpacity onPress={handleSelect}>
                                <Image source={selecionado ? checkboxTrue : checkboxFalse} style={{width:12, height:12, resizeMode:'contain', marginBottom:1.8, marginLeft:3 }}></Image>
                            </TouchableOpacity>
                            <MiniTexto>
                                Continuar conectado
                            </MiniTexto>
                        </View>

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
background: #FFFFFF;

`
const BackCard = styled.View`
width: 320;
height: 480px;
angle: 0 deg;
opacity: 1;
border-top-left-radius: 32px;
border-top-right-radius: 32px;
position:absolute;
bottom: 10;
background: #FFFFFF33;
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
