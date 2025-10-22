import { Image, Modal, Platform, Pressable, Text, TouchableOpacity, View } from "react-native";
import { MiniTexto, SubTitulo, Texto, TextoInput, Titulo } from "../../Styleguide/styles";
import styled from "styled-components/native";

import { Categoria } from "../lista_financas";

import despesa1 from '../../assets/despesa.png'
import receita1 from '../../assets/receita.png'
import apagar from '../../assets/excluir.png'
import editar from '../../assets/editar.png'
import { useEffect, useState } from "react";
import ModalConfirm from "../modalConfirm";
import CalendarModal from "../CalendarModal";
import { editarTransacao } from "../../services/transactionService";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function ModalReceita({modalView, setModalView, transacao, receitas, setReceitas, dark}){
    const [modalConfirmView,setModalConfirmView] = useState(false);
    const [showCalendar, setShowCalendar] = useState(false)
    const [edit, setEdit] = useState(false)

    const [novoTitulo, setNovoTitulo] = useState(transacao?.titulo);
    const [novaDescricao, setNovaDescricao] = useState(transacao?.descricao);
    const [novaCategoria, setNovaCategoria] = useState(transacao?.categoria);
    const [novaData, setNovaData] = useState(transacao?.data);
    const [novoValor, setNovoValor] = useState(transacao?.valor);

    useEffect(() => {
        console.log(transacao)
    if (transacao){
        setNovoTitulo(transacao.titulo);
        setNovaDescricao(transacao.descricao);
        setNovaCategoria(transacao.categoria);
        setNovaData(transacao.data);
        setNovoValor(transacao.valor);
        setEdit(false); 
    }// garante que o input não fique no modo edição por padrão
    }, [transacao]);


function formatarDataParaISO(dataBR) {
  if (!dataBR) return null;
  const [dia, mes, ano] = dataBR.split("/");
  return new Date(`${ano}-${mes}-${dia}T00:00:00.000Z`).toISOString();
}

const atualizar = async () => {
  try {
    // converter valores e montar payload
    const dataAtualizada = {
      user_id: transacao.user_id ?? null,
      category_id: transacao.category_id, // ✅ usa o ID real da categoria
      name: novoTitulo,
      amount: Number(String(novoValor).replace(/\./g, '').replace(',', '.')),
      type: transacao.tipo === "receita" ? "INCOME" : "EXPENSE", // ✅ backend espera isso
      description: novaDescricao,
      date: formatarDataParaISO(novaData), // ✅ converte formato BR → ISO
      file_url: null,
      file: null,
    };

    console.log("🟡 Enviando dados para atualização:", dataAtualizada);

    // faz a requisição de atualização
    await editarTransacao(transacao.id, dataAtualizada);

    // atualiza estado local da lista
    const listaAtualizada = receitas.map(item => {
      if (item.id === transacao.id) {
        return {
          ...item,
          ...dataAtualizada,
          valor: dataAtualizada.amount,
          data: novaData,
          categoria: transacao.categoria, // mantém o nome visível da categoria
          tipo: transacao.tipo,
        };
      }
      return item;
    });

    setReceitas(listaAtualizada);
    setEdit(false);
    setModalView(false);

    alert("✅ Transação atualizada com sucesso!");
  } catch (error) {
    console.error("Erro ao atualizar transação:", error);
    alert("❌ Erro ao atualizar transação. Verifique os dados e tente novamente.");
  }
};


  const handleChange = (texto) => {
      // Remove tudo que não for número
  const numero = texto.replace(/\D/g, '');

  if (!numero) {
    setNovoValor('');
    return;
  }

  // Transforma em número com 2 casas decimais
  const valor = Number(numero) / 100;

  // Formata com vírgula e ponto de milhar
  const valorFormatado = valor.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  setNovoValor(valorFormatado);
};

     if (!transacao) return null;
    return(
    <Modal
      visible={modalView}
      transparent={true}
      animationType="fade"
      onRequestClose={() => {setModalView(false)}}
    >
      {/* Fundo — fecha ao clicar */}
      <Pressable
        onPress={() => {setModalView(false); setEdit(false)}}
        style={{
          flex: 1,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          justifyContent: 'flex-end',             
        }}
      >
        {/* Conteúdo — não fecha ao clicar */}
        <Pressable onPress={() => {}}>
            <CardModal dark={dark}>
                <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
                    {edit ? (
                <TextoInput
                  value={novoTitulo}
                  onChangeText={setNovoTitulo}
                  style={{
                    fontSize: 18,
                    fontWeight: 'bold',
                    color: transacao.tipo === 'receita' ? '#34A853' : '#EA4335',
                    flex: 1,
                    marginRight: 10,
                  }}
                  autoFocus
                  onSubmitEditing={atualizar}
                  blurOnSubmit={true}
                />
              ) : (
                <SubTitulo style={{ color: transacao.tipo === 'receita' ? '#34A853' : '#EA4335' }}>
                  {transacao.titulo}
                </SubTitulo>
              )}
                
              
                <Categoria style={{backgroundColor:(transacao.tipo === 'despesa') ? '#EA43354D' : '#34A85326'}}>
                    <Image style={{resizeMode:'contain', width: 12, height: 12}} source={(transacao.tipo === 'despesa') ? despesa1 : receita1}/>
                    {edit ? (
                        <TextoInput
                        value={novaCategoria}
                        onChangeText={setNovaCategoria}
                        style={{
                            fontSize: 14,
                            fontWeight: 'bold',
                            color: transacao.tipo === 'receita' ? '#34A853' : '#EA4335',
                            flex: 1,
                            marginRight: 10,
                        }}
                        autoFocus
                        onSubmitEditing={atualizar}
                        blurOnSubmit={true}
                        />
                    ) : (
                    <MiniTexto  
                        style={{width:'auto', color:(transacao.tipo === 'despesa') ? '#EA4335' : '#34A853'}}
                    >
                        {transacao.categoria}
                    </MiniTexto>)}
                </Categoria>
                    
                </View>
                <Linha dark={dark}/>
                <Container>
                    <MiniTexto dark={dark}>Descrição</MiniTexto>
                    {edit ? (
                <TextoInput
                  value={novaDescricao}
                  onChangeText={setNovaDescricao}
                  
                  style={{
                    fontSize: 14,
                    color: !dark ? '#1E1E1E' : '#f0f2f5',
                  }}
                  autoFocus
                  onSubmitEditing={atualizar}
                  blurOnSubmit={true}
                  />
                ) : (
                    <Texto dark={dark}>{transacao.descricao}</Texto>)}

                    <View style={{flexDirection:'row' ,justifyContent:'space-between', marginTop:10, width:'70%'}}>
                        <View>
                            <MiniTexto dark={dark}>Data</MiniTexto>
                            {edit ? (
                                <Pressable onPress={() => setShowCalendar(true)}>
                                <TextoInput
                                    value={novaData}
                                    style={{ marginRight: 10, color: !dark ? '#1E1E1E' : '#f0f2f5', }}
                                    editable={false} // impede edição manual
                                    
                                />
                                </Pressable>
                            ) : (
                                <Texto dark={dark}>{transacao.data}</Texto>
                            )}
                        </View>

                        <View style={{}}>
                            <MiniTexto dark={dark}>Valor</MiniTexto>
                            <View style={{flexDirection:'row'}}>
                                <Texto style={{color: transacao.tipo === 'receita' ? '#34A853' : '#EA4335', alignSelf:'center', marginBottom:2}}>R$</Texto>
                            {edit ? (
                                <TextoInput
                                value={novoValor}
                                onChangeText={handleChange}
                                style={{
                                    fontSize: 14,
                                    color: transacao.tipo === 'receita' ? '#34A853' : '#EA4335',
                                    alignSelf:'center'  
                                }}
                                keyboardType="numeric"
                                autoFocus
                                onSubmitEditing={atualizar}
                                blurOnSubmit={true}
                                />
                            ) : (
                            <Texto style={{color:(transacao.tipo === 'despesa') ? '#EA4335' : '#34A853'}}>{transacao.valor}</Texto>)}
                            </View>
                        </View>
                    </View>
                </Container>
                <View style={{flexDirection:'row',gap:16, width:'100%'}}>
                    <BotaoApagar onPress={() => {setModalConfirmView(true); console.log(dark)}}>
                        <Image source={apagar} style={{width:12, height:13}}></Image>
                        <Texto style={{alignSelf:'center',color:'#EA4335'}}>Apagar</Texto>
                    </BotaoApagar>
                    <BotaoEdit onPress={() => {setEdit(true); console.log(edit)}} >
                        <Image source={editar} style={{width:12, height:13}}></Image>
                        <Texto dark={dark}style={{alignSelf:'center'}}>Editar</Texto>
                    </BotaoEdit>
                </View>
                <ModalConfirm modalConfirmView={modalConfirmView} setModalConfirmView={setModalConfirmView} transacao={transacao} receitas={receitas} setReceitas={setReceitas} modalView={modalView} setModalView={setModalView} dark={dark}/>
            </CardModal>
        </Pressable>
      </Pressable>
      <CalendarModal showCalendar={showCalendar} setShowCalendar={setShowCalendar} data={novaData} setData={setNovaData}/>
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
background-color: ${({ dark }) => (dark ? '#1E1E1E' : '#ffffff')};

`
export const Linha = styled.View`
border: 30px;
border-color:${({ dark }) => (dark ? '#242222ff' : '#f0f2f5')};
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
border-color: ${({ dark }) => (dark ? 'black' : '#f0f2f5')};
shadow-color: #000000;
shadow-offset: 0px 4px;
shadow-opacity: 0.25;
shadow-radius: 4px; 
align-items: center;
justify-content: center;
`