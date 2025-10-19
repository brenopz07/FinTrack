import { Image, Modal, Pressable, View } from "react-native";
import { CardModal } from "../modalReceita";
import styled from "styled-components/native";

import aviso from '../../assets/aviso.png'
import { SubTitulo, Texto, Titulo } from "../../Styleguide/styles";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

export default function ModalConfirm({modalConfirmView, setModalConfirmView, transacao, receitas, setReceitas, modalView, setModalView, deslogar, setDeslogar, setModalUserView}){
     
  const navigation = useNavigation();

  const excluirReceita = (id) => {
    const novaLista = receitas.filter((transacao) => transacao.id !== id);
    setReceitas(novaLista);
    setModalConfirmView(false);
    setModalView(false);
  };

    return(
        <Modal
          visible={modalConfirmView}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setModalConfirmView(false)}>
            <Pressable
            onPress={() => setModalConfirmView(false)}
            style={{
                flex: 1,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                justifyContent: 'center',         
            }}
            >
                <Pressable onPress={() => {}}>
                    <CardModalConfirm>
                        <View style={{alignItems:'center', gap:16}}>
                            <Image source={aviso} style={{width:66, height:60}}></Image>
                            <View style={{alignItems:'center', marginHorizontal:20}}>
                                <SubTitulo>Tem certeza disso? </SubTitulo>
                                <Texto style={{textAlign:'center'}}>{deslogar ? 'Ao sair, será necessário inserir novamente suas credenciais para acessar.' : 'Essa ação náo pode ser desfeita. Por favor, confirme se deseja prosseguir.'}</Texto>
                            </View>
                            <View style={{flexDirection:'row',gap:16, width:'100%'}}>
                                <BotaoConfirmar onPress={() => {(deslogar) ? (navigation.navigate('Login'), setModalUserView(false)) : (excluirReceita(transacao.id), setModalConfirmView(false))}}>
                                    <Texto style={{alignSelf:'center',color:'#FFFFFF'}}>Confirmar</Texto>
                                </BotaoConfirmar>
                                <BotaoCancelar onPress={() => {setModalConfirmView(false)}}>
                                    <Texto style={{alignSelf:'center', color:'#595959'}}>Cancelar</Texto>
                                </BotaoCancelar>
                            </View>
                        </View>
                    </CardModalConfirm>
                </Pressable>
            </Pressable>
        </Modal>
    );
}

const CardModalConfirm = styled.View`
width: '100%';
height:auto;
padding: 20px;
gap: 24px;
angle: 0 deg;
opacity: 1;
border-radius: 24px;
background: #FFFFFF;
margin-horizontal:30;
`

export const BotaoCancelar = styled.TouchableOpacity`
flex:1;
height: auto;
gap: 10px;
angle: 0 deg;
opacity: 1;
border-radius: 8px;
border-width: 1.5px;
padding-top: 6px;
padding-bottom: 6px;
justify-content:center;
`
export const BotaoConfirmar = styled.TouchableOpacity`
flex:1;
height: auto;
gap: 10px;
angle: 0 deg;
opacity: 1;
border-radius: 8px;
border-width: 1.5px;
padding-top: 6px;
padding-bottom: 6px;
justify-content:center;
background-color: #EA4335;
border-color: #EA4335;
`