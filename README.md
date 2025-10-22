# 💰 FinTrack

O **FinTrack** é um aplicativo mobile desenvolvido em **React Native com Expo**, criado para **gerenciar suas finanças pessoais de forma prática e intuitiva**.  
Com ele, você pode **controlar receitas e despesas, organizar categorias, visualizar saldo atualizado** e manter um histórico completo de transações.

---

## 🚀 Funcionalidades Principais

- **Cadastro de Usuário e Login Seguro**
  - Autenticação integrada ao back-end com token.
- **Gerenciamento de Transações**
  - Adicione **receitas e despesas** com valores, categorias e descrições.
  - Acompanhe o **saldo total** atualizado automaticamente.
- **Categorias Personalizadas**
  - Crie, **edite** e **exclua categorias** conforme suas necessidades.
  - Caso uma categoria esteja vinculada a uma transação, o app alerta você.
- **Modo Escuro (Dark Mode)**
  - Interface adaptável para o tema claro ou escuro.

---

## 🛠️ Tecnologias Utilizadas

- **React Native (Expo)**
- **Styled Components**
- **Axios** (com baseURL configurável)
- **AsyncStorage**
- **React Navigation**
- **TypeScript**

---

## ⚙️ Como executar o projeto

### 1️⃣ Instalar dependências

```bash
npm i --force
```

---

### 2️⃣ Conectar com o Back-End

Antes de iniciar o app, verifique se o [**back-end FinTrack**](https://github.com/meloluvert/fintrack-backend/tree/develop) está rodando.  
Quando o servidor iniciar, ele exibirá um endereço local, por exemplo:

```
http://192.168.0.105:3333
```

Vá até o arquivo:

```
src/services/api.ts
```

E substitua a `baseURL` pelo endereço mostrado **(incluindo /v1 no final)**:

```typescript
export const api = axios.create({
  baseURL: "http://192.168.0.105:3333/v1",
});
```

---

### 3️⃣ Executar o App

Para iniciar o projeto, rode:

```bash
npm run start
```

Depois:
- **Leia o QR Code** com o aplicativo **Expo Go** (disponível para Android e iOS)  
  ou  
- **Execute via USB** se estiver com o celular conectado e o modo desenvolvedor ativado.

---

## 📱 Dica
Certifique-se de que:
- O **celular e o computador** estejam na **mesma rede Wi-Fi**.
- O **back-end** esteja rodando **antes** do app mobile.
---

## 🧩 Repositórios Relacionados

- 📦 **Back-End:** [FinTrack Backend](https://github.com/meloluvert/fintrack-backend)