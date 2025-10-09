import React from 'react';
import { ScrollView, FlatList, View, Text, Image } from 'react-native';

import { MiniTexto, Texto } from '../../Styleguide/styles';
import styled from 'styled-components';
import despesa from '../../assets/despesa.png';
import receita from '../../assets/receita.png';



const ListaTransacoes = ({ data }) => {
    const renderTransacaoItem = ({ item }) => (
        <CardLista>
            <View style={{alignItems:'flex-start', justifyContent:'center'}}>
                {/* O numberOfLines é a solução para truncar texto com '...' */}
                <Texto numberOfLines={1}>{item.titulo}</Texto> 
                <MiniTexto>{item.data}</MiniTexto>
            </View>
            <View style={{flex: 1, flexDirection:'row', justifyContent:'flex-end', gap: 8}}>
                <Texto tipo={item.tipo}>
                    R$ {item.valor.toFixed(2)}
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

 export const Container = styled.View`
width: 330;
height: 495;
angle: 0 deg;
opacity: 1;
margin-horizontal:40;
margin-bottom:15;
`;

export const CardLista = styled.View`
flex-direction:row;
margin-top:12;
justify-content:space-between;
height:60;
width: 330;
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

