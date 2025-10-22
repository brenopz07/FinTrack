import React from 'react';
import { ScrollView, Text, TouchableOpacity, View, useState } from 'react-native';
import styled from 'styled-components/native';
import { Texto } from '../../Styleguide/styles';

// Lista de meses (mantida aqui ou em um arquivo de constantes)
export const meses = [
    "Geral",
    "Out/25",
    "Set/25",
    "Ago/25",
    "Jul/25",
    "Jun/25",
    "Mai/25",
    "Abr/25",
    "Mar/25",
    "Fev/25",
    "Jan/25",
];


export function MesesScroll({ mesSelecionado, handleMesSelecionado, dark}) {
    return (
        <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
                flexDirection: 'row',
                gap: 12,
                alignItems: 'center',
                marginTop: 30,
                height: 35,
                marginHorizontal:30,
                width:'auto',
            }}
            >
            {meses.map((mes, index) => {
                const isSelected = mes === mesSelecionado;
                return (
                    <React.Fragment key={index}>
                        {/* 1. Componente BotaoMes (novo nome) */}
                        <BotaoMes dark={dark}
                            onPress={() => handleMesSelecionado(mes)}
                            isSelected={isSelected}
                            
                            >
                            <Texto dark={dark} style={{ color: isSelected ? (dark ? 'white' : 'white')  : (dark ? 'white' : 'black') }}>
                                {mes}
                            </Texto>
                        </BotaoMes>

                        {/* 2. Divisor Condicional */}
                        {mes === "Geral" && <Divisor />}
                    </React.Fragment>
                );
            })}
        </ScrollView>
        
    );
}

const BotaoMes = styled.TouchableOpacity.attrs(props => ({
    activeOpacity: 0.7,
}))`
    height: 28px;
    border-radius: 999px;
    padding: 3px 10px;
    align-items: center;
    justify-content: center;
    border-width: 1px;
    border-color: ${props => (props.isSelected ? 'transparent' : (props.dark ? 'black' : 'white'))};

    background-color: ${props => (props.isSelected ? '#4285F4' : (!props.dark ? '#f0f2f5' : 'black'))};

    elevation: ${props => (props.isSelected ? 4 : 0)};
    
`;

// Estilo do Divisor
const Divisor = styled.View`
    width: 1px;
    height: 100%; 
    background-color: #F0F2F5; /* Cor do divisor */
    margin: 0 4px;
`;