import { Image, Modal, Platform, Pressable, Text, TouchableOpacity, View } from "react-native";
import { MiniTexto, SubTitulo, Texto, Titulo } from "../../Styleguide/styles";
import styled from "styled-components/native";

import { Categoria } from "../lista_financas";

import despesa1 from '../../assets/despesa.png'
import receita1 from '../../assets/receita.png'
import apagar from '../../assets/excluir.png'
import editar from '../../assets/editar.png'
import { useEffect, useState } from "react";
import ModalConfirm from "../modalConfirm";

import { financas } from "../../data/financas";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function ModalReceita({modalView, setModalView, transacao, receitas, setReceitas}){

  const [modalConfirm,setModalConfirm] = useState(false);

     if (!transacao) return null;
    return(
    <Modal
      visible={modalView}
      transparent={true}
      animationType="fade"
      onRequestClose={() => setModalView(false)}
    >
      {/* Fundo — fecha ao clicar */}
      <Pressable
        onPress={() => setModalView(false)}
        style={{
          flex: 1,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          justifyContent: 'flex-end',             
        }}
      >
        {/* Conteúdo — não fecha ao clicar */}
        <Pressable onPress={() => {}}>
            <CardModal>
                <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
                    <SubTitulo style={{color:(transacao.tipo === 'receita') ? '#34A853' : '#EA4335'}}>{transacao.titulo}</SubTitulo>
                    <Categoria style={{backgroundColor:(transacao.tipo === 'despesa') ? '#EA43354D' : '#34A85326', width:'auto'}}>
                        <Image style={{resizeMode:'contain', width: 12, height: 12}} source={(transacao.tipo === 'despesa') ? despesa1 : receita1}/>
                        <MiniTexto  
                            style={{width:'auto', color:(transacao.tipo === 'despesa') ? '#EA4335' : '#34A853'}}
                        >
                            {transacao.categoria}
                        </MiniTexto>
                    </Categoria>
                </View>
                <Linha/>
                <Container>
                    <MiniTexto>Descrição</MiniTexto>
                    <Texto>{transacao.descricao}</Texto>
                    <View style={{flexDirection:'row' ,justifyContent:'space-between', marginTop:10, width:'70%'}}>
                        <View>
                            <MiniTexto>Data</MiniTexto>
                            <Texto>{transacao.data}</Texto>
                        </View>
                        <View style={{alignItems:'flex-start'}}>
                            <MiniTexto>Valor</MiniTexto>
                            <Texto style={{color:(transacao.tipo === 'despesa') ? '#EA4335' : '#34A853'}}>R${transacao.valor}</Texto>
                        </View>
                    </View>
                </Container>
                <View style={{flexDirection:'row',gap:16, width:'100%'}}>
                    <BotaoApagar onPress={() => {setModalConfirm(true)}}>
                        <Image source={apagar} style={{width:12, height:13}}></Image>
                        <Texto style={{alignSelf:'center',color:'#EA4335'}}>Apagar</Texto>
                    </BotaoApagar>
                    <BotaoEdit>
                        <Image source={editar} style={{width:12, height:13}}></Image>
                        <Texto style={{alignSelf:'center'}}>Editar</Texto>
                    </BotaoEdit>
                </View>
                <ModalConfirm modalConfirm={modalConfirm} setModalConfirm={setModalConfirm} transacao={transacao} listaFinancas={listaFinancas}
          setListaFinancas={setListaFinancas}/>
            </CardModal>
        </Pressable>
      </Pressable>
    </Modal>
    );
}

export const CardModal = styled.View`
width: 100%;
height: auto;
gap: 16px;
angle: 0 deg;
opacity: 1;
padding: 30px;
border-top-left-radius: 32px;
border-top-right-radius: 32px;
background: #FFFFFF;

`
export const Linha = styled.View`
border: 30px;
border-color:#F0F2F5;
width: 100%;
height: 0px;
angle: 0 deg;
border-width: 3px;
`
export const Container = styled.View`
width: 100%;
height: auto;
`
const BotaoApagar = styled.TouchableOpacity`
flex-direction:row;
flex:1;
height: 43;
gap: 10px;
angle: 0 deg;
opacity: 1;
border-radius: 12px;
border-width: 2px;
padding: 10px;
border: 2px; 
border-color: #EA4335;
shadow-color: #000000;
shadow-offset: 0px 4px;
shadow-opacity: 0.25;
shadow-radius: 4px; 
align-items: center;
justify-content: center;
`
const BotaoEdit = styled.TouchableOpacity`
flex-direction:row;
flex:1;
height: 43;
gap: 10px;
angle: 0 deg;
opacity: 1;
border-radius: 12px;
border-width: 2px;
padding: 10px;
border: 2px; 
border-color: #F0F2F5;
shadow-color: #000000;
shadow-offset: 0px 4px;
shadow-opacity: 0.25;
shadow-radius: 4px; 
align-items: center;
justify-content: center;
`