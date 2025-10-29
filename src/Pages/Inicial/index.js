import React from 'react';
import { View, Image } from 'react-native';
import { Background, BotaoGradientBackground, ButtonText, ButtonTouchable,  MiniTexto, SubTitulo} from '../../Styleguide/styles';
import styled from 'styled-components/native';
import logo from '../../assets/Logo.png'
import image2 from '../../assets/image 2.png'

import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../contexts/ThemeContext';




export default function Inicial(){
    const dark = useTheme()

    const navigation = useNavigation();
    
    return( 
    <Background >
        <ContainerLogo style={{flexDirection:'row', width:249, height:86}}> 
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
            

            <BackCard  dark={dark} style={{ alignSelf:'center'}} >    
            </BackCard>
            <Card dark={dark}>
                <View style={{alignItems:'center'}}>
                    <Image source={image2} style={{width:250, height:250}}></Image>
                    <View style={{alignItems:'center', gap:5}}>
                        <MiniTexto dark={!dark}>
                            Pronto para comecar?
                        </MiniTexto>
                        <SubTitulo dark={!dark} style={{textAlign:'center'}}>
                            Tenha o controle total do seu dinheiro, sem complicações.
                        </SubTitulo>
                    </View>
                        <BotaoGradientBackground style={{marginTop:31}}>
                            <ButtonTouchable onPress={ () => navigation.navigate('Login') }>
                                <ButtonText style={{color:'white'}}>
                                    Comece agora
                                </ButtonText>
                            </ButtonTouchable>
                        </BotaoGradientBackground>
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
top: 85px;
left: 70px;
gap: 20px;
angle: 0 deg;
opacity: 1;
`
const Card = styled.View`
width: 100%;
height: auto;
top: 243px;
gap: 31px;
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
background-color: ${({ dark }) => (!dark ? '#1E1E1E' : '#ffffff')};
`
const BackCard = styled.View`
width: 320;
height: auto;
top: 230px;
angle: 0 deg;
opacity: 1;
border-top-left-radius: 32px;
border-top-right-radius: 32px;
marginBottom:30px;
position:absolute;
bottom:0;
zIndex:0;
 background-color: ${({ dark }) => (!dark ? '#2C2C2CB2' : '#F0F2F580')};
`