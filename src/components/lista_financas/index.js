import { MiniTexto, Texto } from '../../Styleguide/styles';

import despesa from '../../assets/despesa.png';
import receita from '../../assets/receita.png';
import styled from 'styled-components/native';
import { FlatList, Image, ScrollView, View } from 'react-native';


const ListaTransacoes = ({ data, onTransacaoPress }) => {
    const renderTransacaoItem = ({ item }) => (
        <CardLista
        onPress={() => onTransacaoPress(item)} 
        >
            <View style={{justifyContent:'center'}}>
                {/* O numberOfLines é a solução para truncar texto com '...' */}
                <Texto numberOfLines={1}>{item.titulo}</Texto> 
                <MiniTexto>{item.data}</MiniTexto>
            </View>
            <View style={{flexDirection:'row', gap: 8}}>
                <Texto tipo={item.tipo}>
                    R$ {item.valor}
                </Texto>
                <Categoria style={{backgroundColor:(item.tipo === 'despesa') ? '#EA43354D' : '#34A85326'}}>
                    {/* Ajustado para usar as variáveis 'despesa' e 'receita' importadas */}
                    <Image style={{resizeMode:'contain', width: 12, height: 12}} source={(item.tipo === 'despesa') ? despesa : receita}/>
                    <MiniTexto 
                        numberOfLines={1} 
                        style={{width:58, color:(item.tipo === 'despesa') ? '#EA4335' : '#34A853'}}
                    >
                        {item.categoria}
                    </MiniTexto>
                </Categoria>
            </View>
        </CardLista>
    );

    return (
        <ScrollView 
            horizontal={false} 
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ flexGrow: 1 }} 
        >
            <Container>
                <FlatList
                    data={data} // Usa a prop 'data' recebida
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={renderTransacaoItem}
                    scrollEnabled={false} 
                />
            </Container>
        </ScrollView>
    );
};

export default ListaTransacoes;

const Container = styled.View`
height: 495;
angle: 0 deg;
opacity: 1;
margin-bottom:15;
margin-horizontal:30;
`;

const CardLista = styled.TouchableOpacity`
flex-direction:row;
margin-top:12;
justify-content:space-between;
height:60;
width: 100%;
height: 60;
gap: 8px;
angle: 0 deg;
opacity: 1;
padding-top: 12px;
padding-bottom: 12px;
border-bottom-width: 1px;
border-bottom: 1px;
border-color: #F0F2F5;

`;

export const Categoria = styled.View`
flex-direction:row;
width: 82.5;
height: 21;
gap: 2px;
border-radius: 999px;
padding-top: 3px;
padding-right: 6px;
padding-bottom: 3px;
padding-left: 4.5px;
align-items:center;
margin-right:0;
`;

