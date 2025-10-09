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

// Estilo do botão de mês (exportado para uso no map)
const BotaoMes = styled.TouchableOpacity.attrs(props => ({
    activeOpacity: 0.7,
}))`
    width: auto; /* Deixei auto para se ajustar ao conteúdo */
    height: 28px;
    border-radius: 999px;
    padding: 3px 10px;
    align-items: center;
    justify-content: center;
    border-width: 1px;
    border-color: ${props => (props.isSelected ? 'transparent' : '#F0F2F5')};

    background-color: ${props => (props.isSelected ? '#4285F4' : 'white')};

    elevation: ${props => (props.isSelected ? 4 : 0)};
    
`;

// Estilo do Divisor
const Divisor = styled.View`
    width: 1px;
    height: 100%; 
    background-color: #F0F2F5; /* Cor do divisor */
    margin: 0 4px;
`;

// Componente principal rolável (renomeado para MesesScroll)
export function MesesScroll({ mesSelecionado, handleMesSelecionado, TextoComponent }) {
    
    // O TextoComponent (seu styled-component Texto) deve ser passado via prop para este arquivo.
   
    return (
        <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
                flexDirection: 'row',
                paddingHorizontal: 42,
                gap: 12,
                alignItems: 'center',
                marginTop: 30,
                height: 35, /* Garante altura suficiente para o divisor */
            }}
        >
            {meses.map((mes, index) => {
                const isSelected = mes === mesSelecionado;

                return (
                    <React.Fragment key={index}>
                        {/* 1. Componente BotaoMes (novo nome) */}
                        <BotaoMes
                            onPress={() => handleMesSelecionado(mes)}
                            isSelected={isSelected}
                        >
                            <Texto style={{ color: isSelected ? 'white' : 'black' }}>
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