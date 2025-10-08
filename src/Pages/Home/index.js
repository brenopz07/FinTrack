import React, { useState } from 'react';
import { View, Image, Text,Platform, ScrollView } from 'react-native';
import { Background, BotaoGradientBackground, ButtonText, ButtonTouchable,  MiniTexto, SubTitulo, Texto, Titulo} from '../../Styleguide/styles';
import styled from 'styled-components/native';
import logo from '../../assets/Logo (1).png';
import user from '../../assets/user.png';
import olho from '../../assets/olhobranco.png';
import addDespesa from '../../assets/addDespesa.png';
import addReceita from '../../assets/addReceita.png';


import { LinearGradient } from 'expo-linear-gradient';

import { useNavigation } from '@react-navigation/native';
import { MesesScroll } from '../../components/seletor';


import { meses } from '../../components/seletor';

export default function Home(){
    const navigation = useNavigation();

    const [mesSelecionado, setMesSelecionado] = useState(meses[0]);
    
    // 2. Defina a função para mudar o estado (acionada pelo onPress)
    const handleMesSelecionado = (mes) => {
        setMesSelecionado(mes);
    };
    
    return( 
    <View style={{backgroundColor: '#FFFFFF', flex:1}}>
        <View>
            <View style={{flexDirection:'row', marginTop:30, marginHorizontal:30, alignContent:'center',justifyContent:'space-between'}}>
                <View style={{flexDirection:'row'}}>
                    <Image source={logo} style={{width:28, height:28, resizeMode:'contain'}}></Image>
                    <SubTitulo style={{paddingLeft:8, color:'#4285F4'}}>FinTrack</SubTitulo>
                </View>
                <Image source={user} style={{alignSelf:'end',resizeMode:'contain'}}></Image>
            </View>
            <Card style={{alignSelf:'center'}}>
                <View style={{flexDirection:'row', gap:10}}>
                    <Texto style={{color:'white'}}>
                        Saldo atual
                    </Texto>
                    <Image source={olho} style={{resizeMode:'contain', width:13, height:9, alignSelf:'center',marginBottom:4}}></Image>
                </View>
                <View style={{flexDirection:'row', alignItems:'flex-start', padding:3}}>
                    <Texto style={{color:'white',justifyContent:'end'}}>R$</Texto><Titulo style={{alignSelf:'start', color:'white', marginTop:-16}}>10.300</Titulo><Texto style={{color:'white'}}>,00</Texto>
                </View>
                <View style={{flexDirection:'row', gap:16,marginTop:-10}}>
                    <BotaoAdd>
                        <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                            <Texto style={{color:'#34A853'}}>Receitas</Texto>
                            <Image source={addReceita}></Image>
                        </View>
                    </BotaoAdd>
                    <BotaoAdd>
                        <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                            <Texto style={{color:'#EA4335'}}>Despesas</Texto>
                            <Image source={addDespesa}></Image>
                        </View>
                    </BotaoAdd>
                </View>
            </Card>
        <MesesScroll
                mesSelecionado={mesSelecionado}
                handleMesSelecionado={handleMesSelecionado}
                TextoComponent={Texto} />
        </View>
    </View>

    )

}

const Card = styled(LinearGradient).attrs({
  colors: ["#4285F4", "#34A853"],
  start: { x: 0, y: 0 },
  end: { x: 1, y: 0 },
})`
width: 330;
height: 144;
gap: 8px;
angle: 0 deg;
opacity: 1;
border-radius: 12px;
padding: 16px;
background: black;
margin-top:29;
`
const BotaoAdd = styled.TouchableOpacity`
width: 141;
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
${Platform.OS === 'ios' && `
    shadow-color: #000;
    shadow-offset: 0px 2px;
    shadow-opacity: 0.2;
    shadow-radius: 4px;
`}

/* Android: Usa elevation */
${Platform.OS === 'android' && `
    elevation: 4; /* Valor para simular a elevação/sombra */
`}
`
const Seletor = styled.TouchableOpacity`
width: 75;
height: 27;
gap: 16px;
angle: 0 deg;
opacity: 1;
border-radius: 999px;
padding-top: 3px;
padding-right: 10px;
padding-bottom: 3px;
padding-left: 10px;
align-items:center;
background-color: ${props => (props.isSelected ? '#4285F4' : 'white')};
`
const Divisor = styled.View`
width: 0;
height: 25px;
angle: 10 deg;
opacity: 1;
border-width: 2px;
border: 2px; 
border: #F0F2F5;
`
