
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { useFonts,Poppins_400Regular, Poppins_700Bold, Poppins_300Light, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import Routes from './src/Routes/index';
import { View } from 'react-native';


export default function App() {
  let [fontsLoaded] = useFonts({
    Poppins_Regular: Poppins_400Regular,
    Poppins_Bold: Poppins_700Bold,
    Poppins_Light: Poppins_300Light,
    Poppins_SemiBold: Poppins_600SemiBold,
  });

  // Exibe uma tela de carregamento ou SplashScreen enquanto a fonte é carregada
  if (!fontsLoaded) {
    return <View />; // Ou um componente de loading real
  }
  return (
    <NavigationContainer>
        <Routes />
    </NavigationContainer>
  );
}
