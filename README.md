# 🧠 Klay - Intelligent Knowledge Management Platform

> A sophisticated RAG (Retrieval Augmented Generation) application that transforms documents into interactive mindmaps using AI, with full-text search, semantic embeddings, and conversational AI capabilities.

[![Astro](https://img.shields.io/badge/Astro-5.16-BC52EE?logo=astro)](https://astro.build)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?logo=tailwind-css)](https://tailwindcss.com)

---

## 📋 Table of Contents

- [Features](#-features)
- [Architecture Overview](#-architecture-overview)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Configuration](#environment-configuration)
  - [Running the Project](#running-the-project)
- [Deployment](#-deployment)
  - [Browser Mode (Fully Local)](#browser-mode-fully-local)
  - [Server Mode (Node.js)](#server-mode-nodejs)
  - [API-Only Mode](#api-only-mode)
- [Project Structure](#-project-structure)
- [API Reference](#-api-reference)
- [Development](#-development)
- [Documentation](#-documentation)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Features

### Core Capabilities
- 📄 **PDF Processing**: Upload and extract text from PDF documents
- 🔍 **Semantic Search**: Vector embeddings with cosine similarity search
- 🧩 **Smart Chunking**: 5 different text chunking strategies (fixed, sentence, paragraph, recursive, semantic)
- 🗺️ **AI Mindmaps**: Generate interactive mindmaps from documents using AI
- 💬 **RAG Chat**: Conversational AI with document context
- 📊 **Knowledge Pipeline**: Complete pipeline from upload → extraction → chunking → embedding → storage

### Advanced Features
- 🌐 **Multi-Environment**: Run in browser (fully local) or server (Node.js)
- 🔌 **Multiple AI Providers**: Cohere, HuggingFace, OpenAI, or browser-based transformers
- 💾 **Flexible Storage**: LevelDB (server), IndexedDB (browser), Local filesystem
- 🎨 **Interactive Visualization**: Markmap-powered interactive mindmaps
- ⚡ **Streaming Responses**: Real-time AI generation with streaming
- 🔒 **Privacy-First**: Can run entirely locally without cloud services

---

## 🏗 Architecture Overview

Klay follows a **hybrid architecture** combining Clean Architecture principles for backend and Feature-Sliced Design for frontend:

```
┌─────────────────────────────────────────────────────────┐
│                    FRONTEND (Astro + React)             │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐    │
│  │   Pages     │→ │  Features   │→ │   Shared    │    │
│  │  (Astro)    │  │  (Business) │  │   (Common)  │    │
│  └─────────────┘  └─────────────┘  └─────────────┘    │
└─────────────────────────────────────────────────────────┘
                          ↓ API Calls
┌─────────────────────────────────────────────────────────┐
│              BACKEND (Clean Architecture)               │
│  ┌─────────────────────────────────────────────────┐   │
│  │  API Routes (Astro Endpoints)                   │   │
│  └─────────────────────────────────────────────────┘   │
│  ┌──────────────┐  ┌──────────────┐  ┌───────────┐    │
│  │ Application  │← │   Domain     │→ │   Infra   │    │
│  │  (Use Cases) │  │  (Entities)  │  │ (Adapters)│    │
│  └──────────────┘  └──────────────┘  └───────────┘    │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│                   STORAGE LAYER                         │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌────────┐ │
│  │ LevelDB  │  │IndexedDB │  │ Filesys  │  │  CSV   │ │
│  └──────────┘  └──────────┘  └──────────┘  └────────┘ │
└─────────────────────────────────────────────────────────┘
```

### Key Architectural Patterns
- **Clean Architecture**: Backend modules with clear layer separation
- **Feature-Sliced Design**: Self-contained frontend features
- **Strategy Pattern**: Pluggable chunking and embedding strategies
- **Repository Pattern**: Abstracted data persistence
- **Dependency Injection**: Runtime infrastructure composition

For detailed architecture documentation, see [ARCHITECTURE.md](./ARCHITECTURE.md).

---

## 🛠 Tech Stack

### Frontend
- **Framework**: [Astro 5.16](https://astro.build) - SSR-enabled web framework
- **UI Library**: [React 19](https://react.dev) - Component library
- **Styling**: [TailwindCSS 4.0](https://tailwindcss.com) - Utility-first CSS
- **State Management**: [Nanostores](https://github.com/nanostores/nanostores) - Atomic state management
- **Code Editor**: [CodeMirror 6](https://codemirror.net) - Code editing
- **Visualization**: [Markmap](https://markmap.js.org) - Interactive mindmaps

### Backend
- **Runtime**: Node.js 18+
- **Language**: TypeScript 5.7
- **PDF Processing**: [pdf.js](https://mozilla.github.io/pdf.js/) - PDF text extraction
- **Database**: [LevelDB](https://github.com/Level/level) - Key-value storage
- **File Storage**: Local filesystem + CSV indexing

### AI/ML
- **AI SDK**: [Vercel AI SDK](https://sdk.vercel.ai) - LLM integration (DeepSeek-V3)
- **Embeddings**:
  - [Cohere](https://cohere.com) - Cloud embeddings (1024 dims)
  - [HuggingFace](https://huggingface.co) - BAAI/bge-large-en-v1.5 (1024 dims)
  - [@xenova/transformers](https://github.com/xenova/transformers.js) - Browser ML (384 dims)
- **Vector Search**: Cosine similarity with configurable threshold

### Build Tools
- **Package Manager**: pnpm (preferred) or npm
- **Bundler**: Vite
- **Compiler**: Astro compiler + TypeScript

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: 18.x or higher ([Download](https://nodejs.org))
- **pnpm**: 8.x or higher (recommended) or npm 9+
  ```bash
  npm install -g pnpm
  ```
- **API Keys** (optional, for cloud AI providers):
  - HuggingFace API key ([Get here](https://huggingface.co/settings/tokens))
  - Cohere API key ([Get here](https://dashboard.cohere.com/api-keys))
  - Claude API key ([Get here](https://console.anthropic.com/))

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Klay
   ```

2. **Install dependencies**
   ```bash
   # Using pnpm (recommended)
   pnpm install

   # Or using npm
   npm install
   ```

3. **Create environment file**
   ```bash
   # Copy example env file
   cp .env.example .env
   ```

### Environment Configuration

Create a `.env` file in the root directory:

```env
# AI Provider API Keys (optional for local browser mode)
HF_API_KEY=your_huggingface_api_key
COHERE_API_KEY=your_cohere_api_key
CLAUDE_API_KEY=your_claude_api_key
AI_GATEWAY_API_KEY=your_ai_gateway_key

# Execution Environment
# Options: "server" (Node.js with cloud AI) | "browser" (fully local)
EXEC_ENV=server
PUBLIC_EXEC_ENV=server
```

**Environment Modes:**

| Mode | Description | AI Provider | Storage | Internet Required |
|------|-------------|-------------|---------|-------------------|
| `server` | Full-featured server mode | Cloud APIs (Cohere/HF) | LevelDB + Filesystem | Yes (for AI APIs) |
| `browser` | Privacy-focused local mode | @xenova/transformers | IndexedDB | No (after first load) |

### Running the Project

#### Development Server

```bash
# Start development server with hot reload
pnpm run dev

# Or with npm
npm run dev
```

The application will be available at: **http://localhost:4321**

#### Production Build

```bash
# Build for production
pnpm run build

# Preview production build
pnpm run preview
```

#### File Structure After First Run

After running the project, the following directories will be created:

```
Klay/
├── database/
│   ├── level/           # LevelDB databases (auto-created)
│   │   ├── texts/
│   │   ├── embeddings/
│   │   ├── prompts/
│   │   └── knowledge-assets/
│   └── files.csv        # File metadata index
└── uploads/             # Uploaded PDF files
```

---

## 🌐 Deployment

Klay supports three deployment modes:

### Browser Mode (Fully Local)

**Best for**: Privacy-focused users, offline usage, no server infrastructure

**Setup:**
1. Set environment variables:
   ```env
   EXEC_ENV=browser
   PUBLIC_EXEC_ENV=browser
   ```

2. Build and deploy as static site:
   ```bash
   pnpm run build
   # Deploy the dist/ folder to any static host (Vercel, Netlify, GitHub Pages)
   ```

**Features:**
- ✅ Runs entirely in browser (no server needed)
- ✅ Uses @xenova/transformers for embeddings (384 dims)
- ✅ Data stored in IndexedDB (browser storage)
- ✅ Can work offline after initial load
- ❌ Slower AI processing (browser-based models)
- ❌ Limited embedding dimensions (384 vs 1024)

### Server Mode (Node.js)

**Best for**: Production deployments, better performance, cloud AI integration

**Setup:**
1. Set environment variables:
   ```env
   EXEC_ENV=server
   PUBLIC_EXEC_ENV=server
   HF_API_KEY=your_key
   COHERE_API_KEY=your_key
   ```

2. Build and run:
   ```bash
   pnpm run build
   pnpm run preview
   ```

3. Deploy to Node.js hosting (Vercel, Railway, Render, etc.)

**Features:**
- ✅ Fast cloud-based AI processing
- ✅ High-quality embeddings (1024 dims)
- ✅ LevelDB for efficient storage
- ✅ File system storage for PDFs
- ❌ Requires server infrastructure
- ❌ Internet connection required for AI

### API-Only Mode

**Best for**: Integrating Klay as a backend service

**Setup:**
```bash
# Build the project
pnpm run build

# Run in API mode (no frontend)
pnpm run preview
```

**Access API endpoints at**: `http://localhost:4321/api/*`

See [API Reference](#-api-reference) for available endpoints.

---

## 📁 Project Structure

```
Klay/
├── src/
│   ├── backend/              # Clean Architecture modules
│   │   ├── files/            # File management
│   │   ├── knowledge-base/   # Knowledge pipeline
│   │   │   ├── text-extraction/
│   │   │   ├── chunking/
│   │   │   ├── embeddings/
│   │   │   ├── knowledge-asset/
│   │   │   └── orchestrator/
│   │   ├── mindmaps/         # Mindmap generation
│   │   ├── agents/           # AI/LLM integration
│   │   ├── query-orchestator/# RAG query processing
│   │   └── shared/           # Shared backend utilities
│   │
│   ├── features/             # Feature-Sliced Design
│   │   ├── file-management/  # File upload, selection
│   │   ├── mindmap-management/ # Mindmap visualization
│   │   ├── knowledge-management/ # Knowledge pipeline UI
│   │   └── chat/             # AI chat interface
│   │
│   ├── shared/               # Shared frontend code
│   │   ├── components/       # Reusable UI components
│   │   ├── stores/           # Global state (nanostores)
│   │   └── utils/            # Utility functions
│   │
│   ├── pages/                # Astro pages and API routes
│   │   ├── index.astro       # Home page
│   │   ├── dashboard.astro   # Dashboard page
│   │   └── api/              # API endpoints
│   │       ├── file/
│   │       ├── texts/
│   │       ├── chunking/
│   │       ├── embeddings/
│   │       ├── mindmaps/
│   │       └── knowledge/
│   │
│   ├── layouts/              # Page layouts
│   └── styles/               # Global styles
│
├── database/                 # Data storage (auto-created)
│   ├── level/                # LevelDB databases
│   └── files.csv             # File metadata
│
├── uploads/                  # Uploaded files (auto-created)
├── docs/                     # Documentation
├── public/                   # Static assets
│
├── astro.config.mjs          # Astro configuration
├── tailwind.config.js        # TailwindCSS configuration
├── tsconfig.json             # TypeScript configuration
└── package.json              # Dependencies
```

### Path Aliases

The project uses TypeScript path aliases for clean imports:

```typescript
// Instead of: import { sc } from '../../../shared/utils/sc'
import { sc } from '@/shared/utils/sc'

// Available aliases:
'@/*'         → 'src/*'
'@/features/*' → 'src/features/*'
'@/shared/*'   → 'src/shared/*'
'@/layouts/*'  → 'src/layouts/*'
'@/modules/*'  → 'src/backend/*'
```

---

## 📡 API Reference

### File Management

```http
GET    /api/file              # List all files
POST   /api/file              # Upload file
GET    /api/file/[id]         # Get file by ID
DELETE /api/file/[id]         # Delete file
```

### Text Extraction

```http
GET    /api/texts             # List all texts
GET    /api/texts/[id]        # Get text by ID
```

### Chunking

```http
POST   /api/chunking          # Chunk text
```

**Request Body:**
```json
{
  "text": "Your long text...",
  "strategy": "semantic",  // fixed | sentence | paragraph | recursive | semantic
  "options": {
    "chunkSize": 1000,
    "overlap": 200
  }
}
```

### Embeddings

```http
POST   /api/embeddings        # Generate embeddings
GET    /api/embeddings        # Get all documents
```

**Request Body:**
```json
{
  "chunks": ["chunk1", "chunk2"],
  "provider": "cohere"  // cohere | hugging-face | browser
}
```

### Mindmaps

```http
POST   /api/mindmaps/[fileId]       # Generate mindmap
POST   /api/mindmaps/stream/[fileId] # Stream mindmap generation
```

**Request Body:**
```json
{
  "query": "Generate a mindmap about machine learning concepts"
}
```

### Knowledge Pipeline

```http
POST   /api/knowledge/[fileId]      # Full knowledge ingestion pipeline
```

**Pipeline Steps:**
1. Extract text from PDF
2. Chunk text using selected strategy
3. Generate embeddings
4. Store in vector database

### Chat

```http
POST   /api/chat                    # Chat with AI (RAG-enabled)
```

**Request Body:**
```json
{
  "messages": [
    { "role": "user", "content": "Tell me about the document" }
  ],
  "context": ["relevant", "chunks"]
}
```

For detailed API documentation, see [API_REFERENCE.md](./API_REFERENCE.md).

---

## 💻 Development

### Development Workflow

1. **Start development server**
   ```bash
   pnpm run dev
   ```

2. **Make changes**
   - Frontend: Changes in `src/features/`, `src/shared/`, `src/pages/`
   - Backend: Changes in `src/backend/`
   - Styles: Changes in `src/styles/` or component styles

3. **Hot reload**
   - Frontend changes reload automatically
   - Backend changes may require server restart

4. **Build for production**
   ```bash
   pnpm run build
   ```

### Adding a New Feature

Follow Feature-Sliced Design principles:

```bash
# Create feature directory
mkdir -p src/features/my-feature/{components,stores,lib,types}

# Feature structure:
src/features/my-feature/
├── components/       # Feature-specific UI components
├── stores/          # Feature-specific state (nanostores)
├── lib/             # Feature business logic
└── types/           # Feature TypeScript types
```

**Rules:**
- ✅ Features can import from `shared/`
- ❌ Features CANNOT import from other features
- ✅ Shared code goes in `src/shared/`

### Adding a New Backend Module

Follow Clean Architecture:

```bash
# Create module directory
mkdir -p src/backend/my-module/{@core-contracts,application,domain,infrastructure}

# Module structure:
src/backend/my-module/
├── @core-contracts/  # Interfaces and DTOs
│   ├── api.ts
│   ├── dtos.ts
│   ├── entities.ts
│   └── repositories.ts
├── application/      # Use cases
├── domain/          # Business entities
├── infrastructure/  # External adapters
│   ├── routes/      # API routes
│   ├── repositories/ # Data persistence
│   └── providers/   # External services
└── index.ts         # Public API
```

### Code Quality

```bash
# Type checking
pnpm run astro check

# Build (also runs type checks)
pnpm run build
```

---

## 📚 Documentation

- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - Detailed architecture documentation
- **[DATA_FLOW.md](./DATA_FLOW.md)** - Data flow diagrams and patterns
- **[API_REFERENCE.md](./API_REFERENCE.md)** - Complete API documentation
- **[CLAUDE.md](./CLAUDE.md)** - Development guidelines for AI assistance

### Existing Documentation

- `docs/02-DIAGRAMA-ARQUITECTURA.md` - Architecture diagrams (Spanish)
- `docs/03-DIAGRAMA-FLUJO-DATOS.md` - Data flow diagrams (Spanish)

---

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/my-feature`
3. **Follow the architecture patterns**:
   - Backend: Clean Architecture
   - Frontend: Feature-Sliced Design
4. **Add tests if applicable**
5. **Commit with descriptive messages**
6. **Submit a pull request**

---

## 📄 License

[Your License Here - e.g., MIT]

---

## 🙏 Acknowledgments

- Built with [Astro](https://astro.build)
- Powered by [Cohere](https://cohere.com) and [HuggingFace](https://huggingface.co)
- Visualization by [Markmap](https://markmap.js.org)
- PDF processing by [PDF.js](https://mozilla.github.io/pdf.js/)

---

## 📞 Support

For questions, issues, or feature requests:

1. Check the documentation in `docs/`
2. Review existing issues
3. Open a new issue with detailed information

---

**Built with ❤️ using Clean Architecture and Feature-Sliced Design**
