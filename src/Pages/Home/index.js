import React, { useEffect, useMemo, useState } from 'react';
import { View, Image, Text,Platform, ScrollView, TextInput, TouchableOpacity, FlatList, Modal, Pressable, SafeAreaView } from 'react-native';
import { Background, BotaoGradientBackground, ButtonText, ButtonTouchable,  MiniTexto, SubTitulo, Texto, Titulo} from '../../Styleguide/styles';
import styled from 'styled-components/native';
import logo from '../../assets/Logo (1).png';
import user from '../../assets/user.png';
import olho from '../../assets/olhobranco.png';
import addDespesa from '../../assets/addDespesa.png';
import addReceita from '../../assets/addReceita.png';
import lupa from '../../assets/lupa.png';
import filtro from '../../assets/filtro.png'

import { LinearGradient } from 'expo-linear-gradient';

import { meses, MesesScroll } from '../../components/seletor';

import ListaTransacoes, { modalReceita } from '../../components/lista_financas';
import ModalReceita from '../../components/modalReceita';
import ModalAdiciona from '../../components/modalAdd';
import ModalConfirm from '../../components/modalConfirm';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Home(){

    const [receitas, setReceitas] = useState([]);
    
    const totalReceitas = receitas
    .filter(item => item.tipo === 'receita') // Filtra apenas as receitas
    .reduce((acumulador, item) => acumulador + item.valor, 0); // Soma os valores

    const totalDespesas = receitas
        .filter(item => item.tipo === 'despesa') // Filtra apenas as despesas
        .reduce((acumulador, item) => acumulador + item.valor, 0); // Soma os valores

    const saldoFinal = totalReceitas - totalDespesas;
    const ValorInteiro = Math.floor(saldoFinal);
    const Centavos = Math.round((saldoFinal-ValorInteiro)*100).toString().padStart(2, '0');;

    const [mesSelecionado, setMesSelecionado] = useState(meses[0]);
    
    const [mesDesejado, setMesDesejado] = useState('');

    const [modalView, setModalView] = useState(false); 
    const [modalAddView, setModalAddView] = useState(false); 
    const [receita, setReceita] = useState(false);
    const [despesa, setDespesa] = useState(false);

    const [transacaoSelecionada, setTransacaoSelecionada] = useState(null);


    const handleMesSelecionado = (mes) => {
        setMesSelecionado(mes);
        if (mes === 'Out/25'){setMesDesejado('10')}
        else if (mes === 'Set/25'){setMesDesejado('09')}
        else if (mes === 'Ago/25'){setMesDesejado('08')}
        else if (mes === 'Jul/25'){setMesDesejado('07')}
        else if (mes === 'Jun/25'){setMesDesejado('06')}
        else if (mes === 'Mai/25'){setMesDesejado('05')}
        else if (mes === 'Abr/25'){setMesDesejado('04')}
        else if (mes === 'Mar/25'){setMesDesejado('03')}
        else if (mes === 'Fev/25'){setMesDesejado('02')}
        else if (mes === 'Jan/25'){setMesDesejado('01')}
        else(setMesDesejado(''))
    };

    const handleTransacaoPress = (item) => {
    setTransacaoSelecionada(item); // salva os dados do item
    setModalView(true); // abre o modal
    };

    const transacoesDoMes = useMemo(() => {
    return receitas.filter(item => {
        const mesDaTransacao = item.data.split('/')[1];
        return mesDaTransacao === mesDesejado;
    });
}, [receitas, mesDesejado]); 

/*
const limparReceitas = async () => {
  setReceitas([]); // limpa o estado
  try {
    await AsyncStorage.removeItem('@financas'); // remove do armazenamento local
  } catch (erro) {
    console.log("Erro ao limpar AsyncStorage:", erro);
  }
};
*/

  useEffect(() => {
    const carregarDados = async () => {
      try {
        const dadosSalvos = await AsyncStorage.getItem('@financas');
        if (dadosSalvos) {
          setReceitas(JSON.parse(dadosSalvos));
        }
      } catch (erro) {
        console.log('Erro ao carregar dados: ', erro);
      }
    };
    carregarDados();
  }, []);

  // 🟡 Salvar dados sempre que o estado `receitas` mudar
  useEffect(() => {
    const salvarDados = async () => {
      try {
        await AsyncStorage.setItem('@financas', JSON.stringify(receitas));
      } catch (erro) {
        console.log('Erro ao salvar dados: ', erro);
      }
    };
    salvarDados();
  }, [receitas]);

    return( 
    <View style={{backgroundColor: '#FFFFFF', flex:1, marginBottom:15}}>
        <View>
            <View style={{flexDirection:'row', marginTop:30, marginHorizontal:30, alignContent:'center',justifyContent:'space-between'}}>
                <View style={{flexDirection:'row'}}>
                    <Image source={logo} style={{width:28, height:28, resizeMode:'contain'}}></Image>
                    <SubTitulo style={{paddingLeft:8, color:'#4285F4'}}>FinTrack</SubTitulo>
                </View>
                <TouchableOpacity>
                    <Image source={user} style={{alignSelf:'end',resizeMode:'contain'}}></Image>
                </TouchableOpacity>
            </View>
            <Card style={{alignSelf:'center'}}>
                <View style={{flexDirection:'row', gap:10}}>
                    <Texto style={{color:'white'}}>
                        Saldo atual
                    </Texto>
                    <Image source={olho} style={{resizeMode:'contain', width:13, height:9, alignSelf:'center',marginBottom:4}}></Image>
                </View>
                <View style={{flexDirection:'row', alignItems:'flex-start', padding:3}}>
                    <Texto style={{color:'white',justifyContent:'end'}}>R$</Texto><Titulo style={{alignSelf:'start', color:'white', marginTop:-16}}>{saldoFinal}</Titulo><Texto style={{color:'white'}}>,{Centavos}</Texto>
                </View>
                <View style={{flexDirection:'row', gap:16, marginTop:-10}}>
                    <BotaoAdd onPress={() => {setModalAddView(true); setReceita(true); setDespesa(false)}}>
                        <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                            <Texto style={{color:'#34A853'}}>Receitas</Texto>
                            <Image source={addReceita}></Image>
                        </View>
                    </BotaoAdd>
                    <BotaoAdd onPress={() => {setModalAddView(true); setDespesa(true); setReceita(false)}}>
                        <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                            <Texto style={{color:'#EA4335'}}>Despesas</Texto>
                            <Image source={addDespesa}></Image>
                        </View>
                    </BotaoAdd>
                </View>
            </Card>

            {receitas.length > 0 &&(
            <MesesScroll
                mesSelecionado={mesSelecionado}
                handleMesSelecionado={handleMesSelecionado}
                TextoComponent={Texto} />)}

            {receitas.length > 0 &&(
            <ContainerSearch>
                <SearchBar>
                    <Image source={lupa}></Image>
                    <TextInput style={{marginBottom:-3}}
                        placeholder='Pesquisa...'>
                    </TextInput>
                </SearchBar>
                <TouchableOpacity><Image source={filtro} style={{width:20, height:15, resizeMode:'contain', marginBottom:3}}></Image></TouchableOpacity>
            </ContainerSearch>)}
            
        </View>

        {receitas.length > 0 &&
        (<View style={{flexDirection:'row', justifyContent:'space-between', marginTop:16, marginHorizontal: 30}}>
                <MiniTexto style={{color:'#595959'}}>Informações</MiniTexto>
                <View style={{flex: 1, flexDirection:'row', justifyContent:'flex-end', gap: 30}}>
                    <MiniTexto style={{color:'#595959'}}>Valor</MiniTexto>
                    <MiniTexto style={{color:'#595959'}}>Categoria</MiniTexto>
                </View>
            </View>)}

        {receitas.length === 0 &&(
            <View style={{alignSelf:'center'}}>
                <SubTitulo style={{color:'#4285F4', textAlign:'center', margin:30}}>Adicione suas transacoes e controle o seu dinheiro</SubTitulo>
            </View>
        )}
            
        <ListaTransacoes 
        data={(mesDesejado === '' ? receitas : transacoesDoMes)}
        onTransacaoPress={handleTransacaoPress}/>
        

        <ModalReceita modalView={modalView} setModalView={setModalView} transacao={transacaoSelecionada} receita={receita} setReceita={setReceita} receitas={receitas} setReceitas={setReceitas}/>

        <ModalAdiciona modalAddView={modalAddView} setModalAddView={setModalAddView} despesa={despesa} receita={receita} receitas={receitas} setReceitas={setReceitas}></ModalAdiciona>

     
    </View>

    )

}

const Card = styled(LinearGradient).attrs({
  colors: ["#4285F4", "#34A853"],
  start: { x: 0, y: 0 },
  end: { x: 1, y: 0 },
})`
width: 85%;
height: 144;
gap: 8px;
angle: 0 deg;
opacity: 1;
border-radius: 12px;
padding: 16px;
background: black;
margin-top:29;
margin-right:30;
margin-left:30;
`
const BotaoAdd = styled.TouchableOpacity`
flex:1;
height: 38;
justify-content: space-between;
angle: 0 deg;
opacity: 1;
border-radius: 999px;
padding-top: 8px;
padding-right: 8px;
padding-bottom: 8px;
padding-left: 16px;
background: white;
${Platform.OS === 'ios' && `
    shadow-color: #000;
    shadow-offset: 0px 2px;
    shadow-opacity: 0.2;
    shadow-radius: 4px;
`}

/* Android: Usa elevation */
${Platform.OS === 'android' && `
    elevation: 4; /* Valor para simular a elevação/sombra */
`}`


const SearchBar = styled.View`
    flex-direction: row;
    align-items: center;
    height: 37px; 
    background-color: white;
    border-radius: 999px; 
    border-width: 2px;
    border-color: #F0F2F5;
    padding-left:12;
    gap:12;
    width:78%;
    margin-left:30;
`;

const ContainerSearch = styled.View`
    flex-direction:row;
    align-items:center;
    height: 37;
    gap: 8px;
    angle: 0 deg;
    opacity: 1;
    padding-right: 0px;
    margin-top:30;
`
