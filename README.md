# Marca aí 📱

O **Marca aí** é o aplicativo definitivo para agendamento de serviços de beleza, bem-estar e saúde.

## 🚀 Como começar

### Pré-requisitos
- Node.js instalado
- App **Expo Go** no seu celular (para testar em dispositivo real)

### Instalação
1. Entre na pasta do projeto:
   ```bash
   cd scheduly-app
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```

### Executando o App
Rode o comando abaixo:
```bash
npx expo start
```
Escaneie o QR Code com o app Expo Go no seu celular ou pressione `w` para abrir no navegador.

## 📁 Estrutura do Projeto (Arquitetura Modular)

O projeto segue uma estrutura baseada em funcionalidades (*Features*), facilitando a escala e manutenção:

```text
src/
├── api/          # Configuração do Axios e serviços base
├── assets/       # Imagens, ícones e fontes
├── components/   # Componentes globais reutilizáveis (UI Kit)
├── config/       # Variáveis de ambiente e constantes
├── features/     # Módulos de negócio (Ex: auth, bookings, profile)
│   └── auth/     # Telas, hooks e store de autenticação
├── hooks/        # React hooks globais
├── navigation/   # Configuração e stacks de navegação
├── store/        # Gerenciamento de estado (Zustand)
├── theme/        # Design system (Cores, Tipografia)
├── types/        # Tipagem TypeScript centralizada
└── utils/        # Funções utilitárias e formatadores
```

## 🎨 Design System
Utilizamos um esquema de cores vibrante (Rosa/Roxo) focado no mercado de estética, com componentes personalizados para garantir uma interface fluida e moderna.

## 🛠️ Tecnologias
- **React Native** (Via Expo)
- **TypeScript**
- **Expo Router** (Navegação baseada em arquivos)
- **Zustand** (Estado global)
- **Axios** (Integração com API)
