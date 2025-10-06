import React from 'react';
import { View, Text } from 'react-native';
import { BotaoGradientBackground, ButtonText, ButtonTouchable, Container, GradientBackground, SubTitulo, Texto, Titulo } from '../../Styleguide/styles';

export default function Inicial(){
    return(
    <BotaoGradientBackground>
        <ButtonTouchable activeOpacity={0.8}>
            <ButtonText>Comece agora</ButtonText>
      </ButtonTouchable>
    </BotaoGradientBackground>
    )
}