import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// cria o contexto
const ThemeContext = createContext();

// provedor do tema global
export function ThemeProvider({ children }) {
  const [dark, setDark] = useState(false);

  // carregar tema salvo no AsyncStorage (mantém entre reinicializações)
  useEffect(() => {
    const carregarTema = async () => {
      try {
        const temaSalvo = await AsyncStorage.getItem("@tema");
        if (temaSalvo !== null) {
          setClaro(temaSalvo === "dark");
        }
      } catch (erro) {
        console.log("Erro ao carregar tema:", erro);
      }
    };

    carregarTema();
  }, []);

  // alternar tema e salvar
  const alternarTema = async () => {
    try {
      const novoTema = !dark;
      setDark(novoTema);
      await AsyncStorage.setItem("@tema", novoTema ? "claro" : "escuro");
    } catch (erro) {
      console.log("Erro ao salvar tema:", erro);
    }
  };

  return (
    <ThemeContext.Provider value={{ dark, alternarTema }}>
      {children}
    </ThemeContext.Provider>
  );
}

// hook para usar o contexto facilmente
export function useTheme() {
  return useContext(ThemeContext);
}
