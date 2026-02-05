# VerifyLive 🛡️

![Quality Shield](https://img.shields.io/github/actions/workflow/status/AIExxplorer/verifylive/ci-quality.yml?label=Quality%20Shield&style=flat-square&logo=github)
[![Deploy Status](https://img.shields.io/badge/deploy-vercel-success)](https://verifylive.vercel.app)
[![Hackathon](https://img.shields.io/badge/GEMINI%203-HACKATHON-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev/competition)

> **🏆 Competidor Oficial do HACKATHON DO GEMINI 3**  
> _Biometric Liveness Detection & Anti-Deepfake System powered by Gemini 3 Multimodal._  
> _Full Compliance with LGPD, Lei Felca & International Biometric Standards._

<div align="center">

```text
   █████╗ ██╗███████╗██╗  ██╗██╗  ██╗
   ██╔══██╗██║██╔════╝╚██╗██╔╝╚██╗██╔╝
   ███████║██║█████╗   ╚███╔╝  ╚███╔╝
   ██╔══██║██║██╔══╝   ██╔██╗  ██╔██╗
   ██║  ██║██║███████╗██╔╝ ██╗██╔╝ ██╗
   ╚═╝  ╚═╝╚═╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝
```

**Desenvolvido por [AIExxplorer](https://github.com/AIExxplorer) | [Artificial Universe](https://artificialuniverse.tech)**

</div>

---

## 📋 Índice

- [🎯 Visão Geral](#-visão-geral)
- [✨ Principais Funcionalidades](#-principais-funcionalidades)
- [🏗️ Arquitetura Técnica](#️-arquitetura-técnica)
- [🔒 Segurança & Compliance](#-segurança--compliance)
- [🚀 Instalação & Configuração](#-instalação--configuração)
- [📱 Fluxo do Usuário](#-fluxo-do-usuário)
- [🧠 Integração com Gemini 3](#-integração-com-gemini-3)
- [📊 Banco de Dados](#-banco-de-dados)
- [🎥 Demo & Links](#-demo--links)
- [🤝 Contribuindo](#-contribuindo)
- [📝 Licença](#-licença)

---

## 🎯 Visão Geral

**VerifyLive** é um sistema de verificação biométrica de nível forense, desenvolvido para o **Gemini 3 Hackathon**. Utiliza as capacidades da **Era da Ação (Action Era)** do **Gemini 3 Multimodal API** para realizar raciocínio semântico profundo em streams de vídeo, detectando deepfakes e garantindo prova de vida (liveness) em tempo real.

### 🎯 Objetivos do Projeto

| Objetivo                      | Descrição                                                                      |
| ----------------------------- | ------------------------------------------------------------------------------ |
| **Verificação de Identidade** | Confirmar que o usuário é uma pessoa real, não uma foto, vídeo ou deepfake     |
| **Detecção Anti-Deepfake**    | Utilizar IA forense para identificar manipulações sintéticas em vídeo          |
| **Compliance Regulatório**    | Atender às exigências da LGPD, Lei Felca e padrões internacionais de biometria |
| **Auditoria Imutável**        | Manter logs criptografados e rastreáveis de todas as verificações              |
| **Experiência Premium**       | Interface intuitiva, responsiva e acessível para todos os dispositivos         |

### 🏆 Alinhamento com o Tema do Hackathon

Este projeto se alinha com os temas **Action Era** e **Omni-Agent** através de:

- **Multimodalidade Nativa**: Processamento direto de streams de vídeo/áudio através do Gemini 3
- **Thought Signatures**: Raciocínio forense explicável para cada decisão de liveness
- **Sinergia Humano-IA**: Empoderamento de auditores de compliance com relatórios forenses gerados por IA

---

## ✨ Principais Funcionalidades

### 🔐 Autenticação Segura

- **Google OAuth 2.0** integrado via Supabase Auth
- Sessões seguras com tokens de refresh automático
- Proteção de rotas server-side

### 📄 Verificação de Documentos

- **Upload de PDF** (CNH Digital, Identidade Gov.br)
- **Captura via Câmera** (Frente e Verso)
- Suporte a RG, CNH e Passaporte
- Validação de tipo MIME e tamanho máximo (5MB)

### 🎥 Liveness Detection (Prova de Vida)

- **5 Desafios de Verificação**:
  1. 😐 **Rosto Neutro** - Posição inicial
  2. 👉 **Virar à Direita** - Verificação 3D
  3. 😊 **Sorrir** - Verificação muscular/expressão
  4. 🔍 **Aproximar** - Verificação de profundidade
  5. 🤚 **Prova de Posse** - Mão visível (anti-deepfake)

### 🧠 Análise Forense com Gemini 3

- Raciocínio multimodal sobre 5 frames capturados
- Detecção de artefatos de deepfake (moiré, blur, distorções)
- Score de confiança (0-100%) com explicação
- Relatório forense exportável

### 📊 Dashboard de Status

- **Badge "Unverified"** para contas pendentes
- **Dashboard "Verified"** após conclusão bem-sucedida
- Histórico de verificações com timestamps
- Prevenção de re-verificação (anti-loop)

---

## 🏗️ Arquitetura Técnica

### Stack Tecnológico Completo

```mermaid
graph TD
    subgraph Frontend [Frontend (Next.js 16+)]
        UI[User Interface] -->|Stream| Camera[Camera Feed / MediaPipe]
        UI -->|Auth| Auth[Supabase Auth]
        UI -->|i18n| I18n[Language Context]
        Camera -->|Landmarks| FaceMesh[FaceMesh Detector]
    end

    subgraph Backend [Server Actions]
        Verify[verifyLiveness.ts] -->|Frames + Prompt| Gemini[Gemini 3 API]
        Upload[uploadDocument.ts] -->|File| Storage[Supabase Storage]
        Log[completeVerification.ts] -->|Result| DB[Supabase DB]
    end

    subgraph Database [Supabase]
        DB -->|Profiles| ProfilesTable[verifylive_profiles]
        DB -->|Audit| AuditTable[verifylive_audit_logs]
        Storage -->|Docs| DocsBucket[verifylive-docs]
    end

    UI --> Verify
    UI --> Upload
    Verify -->|JSON Analysis| UI
```

### 🌍 Internacionalização (i18n)

- **Suporte Multilíngue**: Português (PT), Inglês (EN) e Espanhol (ES).
- **Detecção Automática**: Preferência do navegador ou seleção manual.
- **Switcher Flutuante**: Interface minimalista com Glassmorphism.

### Badges Tecnológicos

![Next.js](https://img.shields.io/badge/Next.js-16+-000000?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5+-3178C6?style=flat-square&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-19+-61DAFB?style=flat-square&logo=react&logoColor=black)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-Backend-3ECF8E?style=flat-square&logo=supabase&logoColor=white)
![Gemini](https://img.shields.io/badge/Gemini%203-AI-4285F4?style=flat-square&logo=google&logoColor=white)
![MediaPipe](https://img.shields.io/badge/MediaPipe-Vision-FF6F00?style=flat-square&logo=google&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-Deploy-000000?style=flat-square&logo=vercel&logoColor=white)

---

## 🔒 Segurança & Compliance

### 🇧🇷 Lei Geral de Proteção de Dados (LGPD)

| Requisito                   | Implementação                                              |
| --------------------------- | ---------------------------------------------------------- |
| **Consentimento Explícito** | Modal de termos obrigatório antes da verificação           |
| **Finalidade Específica**   | Dados usados exclusivamente para verificação de identidade |
| **Minimização de Dados**    | Apenas dados estritamente necessários são coletados        |
| **Transparência**           | Links diretos para legislação oficial (Planalto.gov)       |
| **Direito de Acesso**       | Histórico de auditoria disponível para o usuário           |
| **Segurança**               | Criptografia AES-256 em repouso, TLS 1.3 em trânsito       |
| **Auto-TTL**                | Exclusão automática de dados brutos após 24h               |

### 👶 Lei Felca / ECA (Proteção de Menores)

| Medida                      | Descrição                                                        |
| --------------------------- | ---------------------------------------------------------------- |
| **Detecção de Idade**       | Flags automáticos para usuários aparentemente menores de 16 anos |
| **Consenso do Responsável** | Fluxo bloqueado para menores sem token de guardião               |
| **Auditoria Criptográfica** | Todas as decisões de idade são assinadas e logadas               |

### 🔐 Medidas de Segurança Técnicas

```
┌────────────────────────────────────────────────────────────┐
│                   CAMADAS DE SEGURANÇA                     │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  1. AUTENTICAÇÃO                                           │
│     ├── Google OAuth 2.0 (PKCE Flow)                      │
│     ├── Tokens JWT com refresh automático                 │
│     └── Session cookies HTTPOnly + Secure                 │
│                                                            │
│  2. AUTORIZAÇÃO                                            │
│     ├── Row Level Security (RLS) no Supabase              │
│     ├── Políticas por usuário (auth.uid())                │
│     └── Service Role Key isolada no servidor              │
│                                                            │
│  3. CRIPTOGRAFIA                                           │
│     ├── Em trânsito: TLS 1.3                              │
│     ├── Em repouso: AES-256 (Supabase Storage)            │
│     └── Hashing: bcrypt para dados sensíveis             │
│                                                            │
│  4. VALIDAÇÃO                                              │
│     ├── Validação de MIME type (image/jpeg, pdf)          │
│     ├── Limite de tamanho (5MB por arquivo)               │
│     └── Sanitização de inputs                             │
│                                                            │
│  5. AUDITORIA                                              │
│     ├── Logs imutáveis em verifylive_audit_logs           │
│     ├── Registro de IP e User-Agent                       │
│     └── Timestamps com timezone UTC                       │
│                                                            │
│  6. PROTEÇÃO ANTI-FRAUDE                                   │
│     ├── Detecção de Deepfake via Gemini 3                 │
│     ├── 5 desafios de liveness (movimento 3D)             │
│     └── Verificação de consistência facial                │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

### 📜 Referências Legais Implementadas

- [Lei 13.709/2018 - LGPD](https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/L13709.htm)
- [Lei 14.063/2020 - Assinatura Eletrônica](https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2020/lei/L14063.htm)
- [Lei 8.069/1990 - ECA (Estatuto da Criança e do Adolescente)](https://www.planalto.gov.br/ccivil_03/leis/l8069.htm)

---

## 🚀 Instalação & Configuração

### Pré-requisitos

- Node.js 20+
- npm 10+ ou pnpm
- Projeto no Supabase (PostgreSQL + Auth + Storage)
- Chave de API do Google AI (Gemini)

### 1. Clonar o Repositório

```bash
git clone https://github.com/AIExxplorer/verifylive.git
cd verifylive
```

### 2. Instalar Dependências

```bash
npm install
```

### 3. Configurar Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Google AI (Gemini)
GEMINI_API_KEY=your-gemini-api-key

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Configurar Supabase

Execute o schema SQL no Supabase SQL Editor:

```sql
-- Veja o arquivo supabase_schema.sql completo no repositório
```

Configure o **Google OAuth Provider** em:
`Authentication > Providers > Google`

Crie os buckets de storage:

- `verifylive-docs` (Privado)
- `verifylive-proofs` (Privado)

### 5. Executar em Desenvolvimento

```bash
npm run dev
```

Acesse: [http://localhost:3000](http://localhost:3000)

### 6. Build de Produção

```bash
npm run build
npm start
```

---

## 📱 Fluxo do Usuário

```
┌─────────────────────────────────────────────────────────────────┐
│                      JORNADA DO USUÁRIO                         │
└─────────────────────────────────────────────────────────────────┘

    ┌──────────────┐
    │   ACESSO     │
    │  (Página)    │
    └──────┬───────┘
           │
           ▼
    ┌──────────────┐      NÃO       ┌──────────────┐
    │  Logado?     │ ────────────▶  │   LOGIN      │
    │              │                │  (Google)    │
    └──────┬───────┘                └──────┬───────┘
           │ SIM                           │
           ▼                               │
    ┌──────────────┐                       │
    │  Verificado? │ ◀─────────────────────┘
    │              │
    └──────┬───────┘
           │
     SIM   │   NÃO
           │
    ┌──────┴───────┐          ┌──────────────┐
    │  DASHBOARD   │          │  COMPLIANCE  │
    │  VERIFICADO  │          │   (Modal)    │
    │  ✅ Selo     │          └──────┬───────┘
    └──────────────┘                 │
                                     ▼
                              ┌──────────────┐
                              │  DOCUMENTOS  │
                              │  (Seleção)   │
                              └──────┬───────┘
                                     │
                         ┌───────────┴───────────┐
                         │                       │
                    ┌────▼────┐            ┌────▼────┐
                    │ CÂMERA  │            │  PDF    │
                    │ (F + V) │            │ Upload  │
                    └────┬────┘            └────┬────┘
                         │                      │
                         └───────────┬──────────┘
                                     │
                                     ▼
                              ┌──────────────┐
                              │  LIVENESS    │
                              │  INTRO       │
                              └──────┬───────┘
                                     │
                                     ▼
                              ┌──────────────┐
                              │   5 STEPS    │
                              │  LIVENESS    │
                              │  (Câmera)    │
                              └──────┬───────┘
                                     │
                                     ▼
                              ┌──────────────┐
                              │  ANALYZING   │
                              │  (Gemini 3)  │
                              └──────┬───────┘
                                     │
                                     ▼
                              ┌──────────────┐
                              │   RESULT     │
                              │   ✅ / ❌    │
                              └──────────────┘
```

---

## 🧠 Integração com Gemini 3

### Prompt Forense Utilizado

```typescript
const prompt = `
Analyze this sequence of 5 video frames for liveness. 
The user was asked to perform the following challenges in order:
1. Neutral Face
2. Turn Right (3D check)
3. Smile/Expression (Muscle check)
4. Zoom In (Depth check)
5. Hold ID/Hand (Possession/Occlusion check)

FORENSIC ANALYSIS REQUIRED:
- **Consistency**: Do features remain consistent across angles/lighting?
- **3D Structure**: Does the face rotate naturally or warp like a 2D texture?
- **Micro-expressions**: Are eye movements and muscle flexes natural?
- **Artifacts**: Look for screen moire, edge blurring, or glitching.

Return JSON with:
- is_real: boolean
- confidence: number (0-100)
- anomalies: string[] (list suspicious elements)
- reasoning: string (brief explanation of the verdict)
`;
```

### Resposta Esperada

```json
{
  "is_real": true,
  "confidence": 98,
  "anomalies": [],
  "reasoning": "Features consistent across all 5 angles. Natural 3D rotation detected. No deepfake artifacts found."
}
```

---

## 📊 Banco de Dados

### Schema Principal

```sql
-- Perfis de Verificação
CREATE TABLE verifylive_profiles (
  id UUID REFERENCES auth.users PRIMARY KEY,
  updated_at TIMESTAMPTZ,
  username TEXT UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  is_verified BOOLEAN DEFAULT FALSE,
  verified_at TIMESTAMPTZ
);

-- Logs de Auditoria (Imutáveis)
CREATE TABLE verifylive_audit_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  user_id UUID REFERENCES auth.users(id),
  action TEXT NOT NULL,
  status TEXT NOT NULL,
  confidence NUMERIC,
  metadata JSONB,
  ip_address TEXT,
  user_agent TEXT
);
```

### Políticas RLS

- Usuários podem ver/editar apenas seus próprios perfis
- Logs de auditoria são inseridos via Service Role (imutáveis para o usuário)
- Storage protegido por políticas de owner

---

## 🎥 Demo & Links

| Recurso                    | Link                                                       |
| -------------------------- | ---------------------------------------------------------- |
| 🌐 **Live Demo**           | [verifylive.vercel.app](https://verifylive.vercel.app)     |
| 📹 **Vídeo Demo**          | [YouTube](https://youtube.com) _(Em breve)_                |
| 🏆 **Devpost**             | [Link para Submissão](https://devpost.com)                 |
| 📂 **Repositório**         | [GitHub](https://github.com/AIExxplorer/verifylive)        |
| 🔗 **Artificial Universe** | [artificialuniverse.tech](https://artificialuniverse.tech) |

---

## 🤝 Contribuindo

Este projeto utiliza **Husky** para git hooks e **Commitlint** para commits convencionais.

### Padrão de Commits

```bash
feat: nova funcionalidade
fix: correção de bug
docs: atualização de documentação
style: formatação (sem mudança de lógica)
refactor: refatoração de código
test: adição de testes
chore: tarefas de manutenção
```

### 🌳 Estrutura de Branches (GitFlow)

Este projeto segue um fluxo de trabalho **GitFlow Simplificado**:

```
                    ┌──────────────┐
                    │     main     │  ← Produção (Estável)
                    └──────┬───────┘
                           │
                    ┌──────▼───────┐
                    │   develop    │  ← Integração (Default Dev)
                    └──────┬───────┘
                           │
          ┌────────────────┼────────────────┐
          │                │                │
   ┌──────▼──────┐  ┌──────▼──────┐  ┌──────▼──────┐
   │ feature/*   │  │   test/qa   │  │  hotfix/*   │
   └─────────────┘  └─────────────┘  └─────────────┘
```

| Branch      | Propósito                                    |
| ----------- | -------------------------------------------- |
| `main`      | Código em produção, releases estáveis        |
| `develop`   | Branch de integração, recebe PRs de features |
| `test/qa`   | Homologação e testes de QA                   |
| `feature/*` | Novas funcionalidades                        |
| `hotfix/*`  | Correções urgentes em produção               |

### 📋 Templates de Comunidade

Este repositório inclui templates padronizados para facilitar contribuições:

| Template                                                     | Descrição                                    |
| ------------------------------------------------------------ | -------------------------------------------- |
| [Bug Report](.github/ISSUE_TEMPLATE/bug_report.md)           | Reporte de bugs com contexto técnico         |
| [Feature Request](.github/ISSUE_TEMPLATE/feature_request.md) | Sugestão de novas features                   |
| [Pull Request](.github/PULL_REQUEST_TEMPLATE.md)             | Template para PRs com checklist de qualidade |

### Fluxo de Contribuição

1. **Fork** o repositório
2. Crie uma branch a partir de `develop` (`git checkout -b feature/minha-feature develop`)
3. Faça seus commits seguindo **Conventional Commits** (Husky validará)
4. Push para sua branch (`git push origin feature/minha-feature`)
5. Abra um **Pull Request** apontando para `develop`
6. Aguarde revisão e aprovação

> 📖 **Guia Completo:** Veja [CONTRIBUTING.md](CONTRIBUTING.md) para instruções detalhadas.

---

## 📝 Licença

Este projeto está licenciado sob a [MIT License](LICENSE).

```
MIT License

Copyright (c) 2026 AIExxplorer / Artificial Universe

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software...
```

---

<div align="center">

### 🛡️ VerifyLive

_Biometric Identity Verification for the AI Era_

**Built with ❤️ for Gemini 3 Hackathon**

```text
   █████╗ ██╗███████╗██╗  ██╗██╗  ██╗
   ██╔══██╗██║██╔════╝╚██╗██╔╝╚██╗██╔╝
   ███████║██║█████╗   ╚███╔╝  ╚███╔╝
   ██╔══██║██║██╔══╝   ██╔██╗  ██╔██╗
   ██║  ██║██║███████╗██╔╝ ██╗██╔╝ ██╗
   ╚═╝  ╚═╝╚═╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝
```

**[⬆ Voltar ao Topo](#verifylive-️)**

</div>
