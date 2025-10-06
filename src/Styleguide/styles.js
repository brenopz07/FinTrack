// ===========================================
// Arquivo: src/Styleguide/styles.js
// ===========================================
import { LinearGradient } from 'expo-linear-gradient';
import styled from 'styled-components/native';
import { Text,Button, TouchableOpacity } from 'react-native'; // Importa o Text padrão para ser estilizado

const GRADIENT_COLORS = {
  blue: '#4285F4', // Início (Esquerda)
  green: '#34A853', // Fim (Direita)
};

// 2. Objeto de atributos para injeção via .attrs()
export const ColorAttrs = {
  colors: ['#4285F4', '#34A853'],
  start: { x: 0, y: 0 }, 
  end: { x: 1, y: 0 }, // Gradiente da esquerda para a direita
};

export const Background = styled(LinearGradient).attrs({
 ...ColorAttrs
})`
  flex: 1; 
`;

export const Titulo = styled.Text`
  color: #262626;
  font-family: 'Poppins_Bold';
  font-size: 30px;
`;

export const SubTitulo = styled.Text`
  color: #262626;
  font-family: 'Poppins_SemiBold';
  font-size: 20px;
`;

export const Texto = styled.Text`
  color: #262626;
  font-family: 'Poppins_Regular';
  font-size: 14px;
`;

export const MiniTexto = styled.Text`
  color: #262626;
  font-family: 'Poppins_Light';
  font-size: 12px;
`;


export const Container = styled.View`
width: 390;
height: 601;
angle: 0 deg;
opacity: 1;
gap: 31px;
top: 243px;
border-top-left-radius: 32px;
border-top-right-radius: 32px;
padding-top: 20px;
padding-right: 30px;
padding-bottom: 20px;
padding-left: 30px;
`;

export const BotaoGradientBackground = styled(LinearGradient).attrs({
  colors: ["#4285F4", "#34A853"],
  start: { x: 0, y: 0 },
  end: { x: 1, y: 0 },
})`
  width: 330px;
  height: 50px;
  border-radius: 12px;
  padding: 10px;
  justify-content: center;
  align-items: center;

    /* Sombras iOS */
  shadow-color: #000;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.25;
  shadow-radius: 4px;

  /* Sombra Android */
  elevation: 5;
`;

 export const ButtonTouchable = styled.TouchableOpacity`
  width: 100%;
  height: 100%;
  border-radius: 12px;
  justify-content: center;
  align-items: center;
`;

export const ButtonText = styled.Text`
  color: white;
  font-family: 'Poppins_SemiBold';
  font-size: 20px;
`;