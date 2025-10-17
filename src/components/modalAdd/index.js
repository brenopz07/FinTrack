import { Image, Modal, Platform, Pressable, Text, TouchableOpacity, View } from "react-native";
import { BotaoGradientBackground, ButtonText, ButtonTouchable, LabelInput, MiniTexto, SubTitulo, Texto, TextoInput, Titulo } from "../../Styleguide/styles";
import styled from "styled-components/native";

import { Categoria } from "../lista_financas";

import despesa1 from '../../assets/despesa.png'
import receita1 from '../../assets/receita.png'
import apagar from '../../assets/excluir.png'
import editar from '../../assets/editar.png'
import { useState } from "react";
import ModalConfirm, { BotaoCancelar, BotaoConfirmar } from "../modalConfirm";
import { CardModal, Container, Linha } from "../modalReceita";



export default function ModalAdiciona({modalAddView, setModalAddView, receita, receitas, setReceitas}){
const [valor, setValor] = useState(null);
const [titulo, setTitulo] = useState(null);
const [data, setData] = useState(null);
const [categoria, setCategoria] = useState(null);
const [descricao, setDescricao] = useState(null);


    const limparInputs = () => {
        setValor('');
        setTitulo(null);
        setData(null);
        setCategoria(null);
        setDescricao(null);
};

    const adicionarReceita = () => {
          const novaReceita = {
              id: Date.now().toString(),
              tipo: 'receita',
              titulo : titulo,
              valor: valor,
              data: data,
              descricao: descricao,
              categoria: categoria,
            };

            if(!titulo || !valor || !data || !descricao || !categoria){
                alert("Preencha todos os campos para confirmar");
                return
            }
            
            setReceitas(prev => [...prev, novaReceita]);
            setModalAddView(false);
            limparInputs();
  };

  const adicionarDespesa = () => {
          const novaDespesa = {
              id: Date.now().toString(),
              tipo: 'despesa',
              titulo : titulo,
              valor: valor,
              data: data,
              descricao: descricao,
              categoria: categoria,
            };

            if(!titulo || !valor || !data || !descricao || !categoria){
                alert("Preencha todos os campos para confirmar");
                return
            }

            setReceitas(prev => [...prev, novaDespesa]);
            setModalAddView(false);
            limparInputs();
            
  };
 const handleChange = (texto) => {
    // Remove tudo que não for número ou vírgula/ponto
    const numero = texto.replace(/[^0-9.,]/g, '');
    setValor(numero);
  };
    return(
    <Modal
      visible={modalAddView}
      transparent={true}
      animationType="fade"
      onRequestClose={() => setModalAddView(false)}
    >
      {/* Fundo — fecha ao clicar */}
      <Pressable
        onPress={() => setModalAddView(false)}
        style={{
          flex: 1,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          justifyContent: 'flex-end',             
        }}
      >
        {/* Conteúdo — não fecha ao clicar */}
        <Pressable onPress={() => {}}>
            <CardModal>
                <View style={{flexDirection:'row'}}>
                    <SubTitulo>Adicione uma nova </SubTitulo>
                    <SubTitulo style={{color: receita ? '#34A853' : 'red'}}>
                         {receita ? "receita" : "despesa"}
                    </SubTitulo>
                </View>
                <Linha/>

                <LabelInput>
                    <MiniTexto style={{marginBottom:-12}}>
                        Título
                    </MiniTexto>
                    <View style={{flexDirection:'row'}}>
                        <TextoInput 
                            placeholder='Digite aqui'
                            value={titulo}
                            onChangeText={setTitulo}
                            >
                        </TextoInput>
                    </View>
                </LabelInput>

                <LabelInput>
                    <MiniTexto style={{marginBottom:-12}}>
                        Descrição
                    </MiniTexto>
                    <View style={{flexDirection:'row'}}>
                        <TextoInput 
                            placeholder='Digite aqui'
                            value={descricao}
                            onChangeText={setDescricao}
                            >
                        </TextoInput>
                    </View>
                </LabelInput>

                <View style={{width:'100%', flexDirection:'row', gap:10}}>
                    <LabelInput style={{flex:1}}>
                        <MiniTexto style={{marginBottom:-12}}>
                            Valor
                        </MiniTexto>
                        <View style={{flexDirection:'row'}}>
                            <TextoInput 
                                placeholder='R$ 0,00'
                                value={`R$ ${valor}`}
                                onChangeText={handleChange}
                                >
                            </TextoInput>
                        </View>
                    </LabelInput>

                    <LabelInput style={{flex:1}}>
                        <MiniTexto style={{marginBottom:-12}}>
                            Data
                        </MiniTexto>
                        <View style={{flexDirection:'row'}}>
                            <TextoInput 
                                placeholder='Digite aqui'
                                value={data}
                                onChangeText={setData}
                                >
                            </TextoInput>
                        </View>
                    </LabelInput>
                </View>

                <LabelInput>
                    <MiniTexto style={{marginBottom:-12}}>
                        Categoria
                    </MiniTexto>
                    <View style={{flexDirection:'row'}}>
                        <TextoInput 
                            placeholder='Digite aqui'
                            value={categoria}
                            onChangeText={setCategoria}
                            >
                        </TextoInput>
                    </View>
                </LabelInput>

                <View style={{flexDirection:'row',gap:16, width:'100%'}}>
                    <BotaoCancelar style={{flex:1, borderColor:'#F0F2F5'}} onPress={() => setModalAddView(false)}>
                        <Texto style={{alignSelf:'center'}}>Cancelar</Texto>
                    </BotaoCancelar>
                    <BotaoGradientBackground style={{flex:1.5}}>
                        <ButtonTouchable onPress={()=> receita ? adicionarReceita() : adicionarDespesa()}>
                            <SubTitulo style={{color:'#FFFFFF'}}>Confirmar</SubTitulo>
                        </ButtonTouchable>
                    </BotaoGradientBackground>
                </View>
            </CardModal>
        </Pressable>
      </Pressable>
    </Modal>
    );
}


