import { Image, Modal, Pressable, TextInput, TouchableOpacity, View } from "react-native";
import styled from "styled-components";
import { ButtonTouchable, SubTitulo, Texto } from "../../Styleguide/styles";
import edit from '../../assets/editar.png';
import tema from '../../assets/tema.png';
import claro from '../../assets/claro.png';
import escuro from '../../assets/escuro.png';
import botao from '../../assets/selecionado.png';
import { useEffect, useState } from "react";
import ModalConfirm from "../modalConfirm";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function ModalUser({ modalUserView, setModalUserView, nome, setNome}) {

  const [modalConfirmView,setModalConfirmView] = useState(false);
  const [selecionado, setSelecionado] = useState(true);
  const [deslogar, setDeslogar] = useState(false);
  const [editNome, setEditNome] = useState(false);
  const [novoNome, setNovoNome] = useState(nome);

const atualizarNome = async () => {
  try {
    setNome(novoNome);
    const usuariosSalvos = await AsyncStorage.getItem('usuarios');
    const usuarios = usuariosSalvos ? JSON.parse(usuariosSalvos) : [];
    const usuarioLogado = await AsyncStorage.getItem('usuarioLogado');
    const user = usuarioLogado ? JSON.parse(usuarioLogado) : null;

    if (user) {
      const usuariosAtualizados = usuarios.map(u =>
        u.email === user.email ? { ...u, nome: novoNome } : u
      );

      await AsyncStorage.setItem('usuarios', JSON.stringify(usuariosAtualizados));
      await AsyncStorage.setItem('usuarioLogado', JSON.stringify({ ...user, nome: novoNome }));
    }

    await AsyncStorage.setItem('@nomeUsuario', novoNome);
    setEditNome(false);
    console.log("Nome atualizado e salvo:", novoNome);
  } catch (erro) {
    console.log("Erro ao salvar nome:", erro);
  }
};

  const alternarTema = () => {
    setSelecionado(!selecionado);
  };


  return (
    <Modal
      visible={modalUserView}
      transparent={true}
      animationType="fade"
      onRequestClose={() => setModalUserView(false)}
    >
      <Pressable
        onPress={() => {setModalUserView(false), setEditNome(false)}}
        style={{
          flex: 1,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          justifyContent: 'flex-start',
        }}
      >
        <Pressable onPress={() => {}}>
          <CardModalUser>
            <Container style={{alignItems:'center'}}>
              <Texto style={{ color: '#595959' }}>Nome</Texto>
              <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems:'center', width:'50%', height:'auto', gap:8 }}>
                {editNome ? (
                    <TextInput
                        value={novoNome}
                        onChangeText={setNovoNome}
                        style={{
                          flex: 1,
                          fontSize: 14,
                          color: '#262626',
                          borderColor: '#C5C5C5',
                          
                        }}
                        autoFocus
                        onBlur={atualizarNome} // 🔹 salva quando o usuário sai do campo
                        placeholder=""
                        placeholderTextColor="#262626"
                    />
                    ) : (
                    <TouchableOpacity
                      style={{}}
                      onPress={() => setEditNome(true)}
                    >
                      <Texto style={{ color: '#262626'}}>
                        {nome || 'Sem nome'}
                      </Texto>
                    </TouchableOpacity>
                  )}

  <TouchableOpacity onPress={() => setEditNome(true)} style={{ paddingHorizontal: 4 }}>
    <Image source={edit} style={{ width: 18, height: 18 }} />
  </TouchableOpacity>
</View>
            </Container>

            <Container>
              <Texto style={{ color: '#595959' }}>Email</Texto>
              <View style={{ flexDirection: 'row', gap: 8, justifyContent: 'center' }}>
                <Texto>{'email' || "breno@gmail.com"}</Texto>
              </View>
            </Container>

            <Linha />

            <Container style={{ justifyContent: 'space-between' }}>
              <Texto style={{ color: '#595959' }}>Tema</Texto>

              {/* 🔹 Botão do tema */}
              <Pressable onPress={alternarTema}>
                <View
                  style={{
                    width: 54,
                    height: 27,
                    position: 'relative',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  {/* Fundo do botão */}
                  <Image
                    source={tema}
                    style={{
                      width: '100%',
                      height: '100%',
                      borderRadius: 12,
                      tintColor: (selecionado) ? null : '#1E1E1E',
                      resizeMode:'contain',
                    }}
                  />

                  {/* Ícone claro */}
                  <Image
                    source={claro}
                    style={{
                      position: 'absolute',
                      left: 8,
                      width: 12,
                      height: 12,
                      zIndex: 1,
                      tintColor: (selecionado) ? 'black' : 'white',
                    }}
                  />

                  {/* Ícone escuro */}
                  <Image
                    source={escuro}
                    style={{
                      position: 'absolute',
                      right: 8,
                      width: 15,
                      height: 15,
                      zIndex: 1,
                      tintColor: (selecionado) ? 'white' : 'black',
                    }}
                  />

                  {/* Botão deslizante */}
                  <Image
                    source={botao}
                    style={{
                      position: 'absolute',
                      left: selecionado ? 1.5 : 25,
                      width: 25,
                      height: 25,
                      zIndex: 0,
                      top: 4.5,
                      
                    }}
                  />
                </View>
              </Pressable>
            </Container>

            <View style={{flexDirection:'row'}}>
                <BotaoSair onPress={()=>{setModalConfirmView(true), setDeslogar(true)}}>
                    <Texto style={{alignSelf:'center',color:'#FFFFFF'}}>Sair</Texto>
                </BotaoSair>
            </View>

            <ModalConfirm modalConfirmView={modalConfirmView} setModalConfirmView={setModalConfirmView} deslogar={deslogar} setDeslogar={setDeslogar} modalUserView={modalUserView} setModalUserView={setModalUserView}/>
          </CardModalUser>
        </Pressable>
      </Pressable>
    </Modal>
    
  );
}

// ---------------- ESTILOS ----------------

export const Container = styled.View`
  padding-top: 12px;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
`;

export const Linha = styled.View`
  border-bottom-width: 1px;
  border-color: #F0F2F5;
`;

const CardModalUser = styled.View`
  width: 75%;
  height: auto;
  gap: 10px;
  padding: 20px;
  border-radius: 24px;
  background-color: #f0f2f5;
  margin-right: 25px;
  margin-top: 40px;
  align-self: flex-end;
`;

export const BotaoSair = styled.TouchableOpacity`
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