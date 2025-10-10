import { Modal, Platform, Pressable, View } from "react-native";
import { Texto, Titulo } from "../../Styleguide/styles";
import styled from "styled-components/native";
import { financas } from "../../data/financas";
export default function ModalReceita({modalView, setModalView, transacao}){
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
                <Titulo>{transacao.data}</Titulo>
            </CardModal>
        </Pressable>
      </Pressable>
    </Modal>
    );
}

const CardModal = styled.View`
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
