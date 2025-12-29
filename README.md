# Tá Marcado! 📱

O **Tá Marcado!** é o aplicativo definitivo para agendamento de serviços de beleza, bem-estar e saúde. Projetado para oferecer uma experiência premium e intuitiva, conectando clientes aos melhores profissionais de forma rápida e elegante.

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
├── api/          # Configuração do Axios (apiClient com Interceptors)
├── assets/       # Imagens, ícones e fontes
├── components/   # Componentes globais reutilizáveis (UI Kit)
├── config/       # Configurações de API e constantes
├── features/     # Módulos de negócio (Ex: auth, home, bookings)
│   ├── auth/     # Fluxo de Login e Cadastro
│   ├── home/     # Tela principal e lista de profissionais
│   └── bookings/ # Fluxo de agendamento e histórico
├── hooks/        # React hooks globais
├── navigation/   # Configuração e stacks de navegação
├── services/     # Camada de comunicação com a API (Services)
├── theme/        # Design system (Cores Premium: Azul/Amarelo)
├── types/        # Tipagem TypeScript centralizada
└── utils/        # Funções utilitárias e formatadores
```

## 🎨 Design System (Estética Premium)
Utilizamos um esquema de cores inspirado no profissionalismo e confiança:
- **Azul Marinho Profundo (#002366)**: Cor dominante que passa segurança e elegância.
- **Amarelo Vibrante (#FCD12A)**: Cor de destaque para ações principais e cabeçalhos, trazendo energia e visibilidade.
- **Branco Gelo**: Para garantir máxima leitura e contraste.

## 🛠️ Tecnologias
- **React Native** (Via Expo)
- **TypeScript**
- **Expo Router** (Navegação moderna baseada em arquivos)
- **Axios** (Integração real com a Scheduly API)
- **Lucide / Ionicons** (Iconografia consistente)

---
© 2025 - Tá Marcado!
