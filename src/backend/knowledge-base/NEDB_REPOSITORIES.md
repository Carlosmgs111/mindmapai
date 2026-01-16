# NeDB Repository Implementations

This document describes the NeDB repository implementations for all backend modules in the knowledge-base system.

## Overview

NeDB is a lightweight JavaScript database with a MongoDB-like API. All repositories have been implemented using `nedb-promises` which provides Promise-based APIs for better async/await support.

## Installation

The dependency has been added to `package.json`:

```bash
pnpm install
# or
npm install
```

## Database Location

All NeDB databases are stored in:
```
/database/nedb/*.db
```

Each module has its own database file:
- `knowledge-assets.db` - Knowledge asset metadata
- `embeddings.db` - Vector embeddings and documents
- `texts.db` - Extracted text documents
- `agents.db` - AI agent configurations
- `prompts.db` - Prompt templates
- `files.db` - File metadata

## Module Implementations

### 1. Knowledge Asset Repository

**Location:** `knowledge-asset/infrastructure/repositories/NeDBRepository.ts`

**Features:**
- Automatic upsert (update if exists, insert if new)
- Indexed queries on id, fileId, textId, embeddingsCollectionId
- Timestamp management (createdAt, updatedAt)

**Usage:**
```typescript
import { NeDBRepository } from './infrastructure/repositories/NeDBRepository';

const repo = new NeDBRepository();

// Save a knowledge asset
await repo.saveKnowledgeAsset({
  id: 'asset-123',
  name: 'My Document',
  fileId: 'file-456',
  textId: 'text-789',
  embeddingsCollectionId: 'collection-001',
  metadata: { author: 'John Doe' },
  createdAt: new Date(),
  updatedAt: new Date()
});

// Get all assets
const assets = await repo.getAllKnowledgeAssets();

// Get by ID
const asset = await repo.getKnowledgeAssetById('asset-123');

// Delete
const deleted = await repo.deleteKnowledgeAsset('asset-123');

// Compact database (optional, after many deletions)
await repo.compact();
```

### 2. Embeddings Vector Store

**Location:** `embeddings/infrastructure/repositories/NeDBVectorStore.ts`

**Features:**
- Vector similarity search using cosine similarity
- Collection-based namespacing
- Configurable similarity threshold
- Batch insert support
- Automatic fallback to manual cosine similarity if 'ai' package unavailable

**Usage:**
```typescript
import { NeDBVectorStore } from './infrastructure/repositories/NeDBVectorStore';

const config = {
  dimensions: 1024,
  similarityThreshold: 0.7
};

const vectorStore = new NeDBVectorStore(config);
await vectorStore.initialize();

// Add a document
await vectorStore.addDocument({
  id: 'doc-1',
  content: 'Sample text',
  embedding: [0.1, 0.2, 0.3, ...], // 1024 dimensions
  metadata: { source: 'pdf' }
}, 'collection-1');

// Batch add documents
await vectorStore.addDocuments([doc1, doc2, doc3], 'collection-1');

// Search for similar vectors
const results = await vectorStore.search(
  queryEmbedding, // [0.1, 0.2, ...]
  5,              // topK
  'collection-1'  // collectionId
);

// Get all documents in a collection
const docs = await vectorStore.getAllDocuments('collection-1');

// Count documents
const count = await vectorStore.count('collection-1');

// Clear a collection
await vectorStore.clear('collection-1');

// Close (compacts database)
await vectorStore.close();
```

### 3. Text Extraction Repository

**Location:** `text-extraction/infrastructure/repository/NeDBRepository.ts`

**Features:**
- Store extracted text with metadata
- Query by sourceId
- Full-text search capabilities

**Usage:**
```typescript
import { NeDBRepository } from './infrastructure/repository/NeDBRepository';

const repo = new NeDBRepository();

// Save extracted text
await repo.saveText({
  id: 'text-123',
  content: 'Extracted text content...',
  sourceId: 'file-456',
  metadata: {
    author: 'John Doe',
    title: 'Document Title',
    numpages: 10
  }
});

// Get all texts
const texts = await repo.getAllTexts();

// Get by ID
const text = await repo.getTextById('text-123');

// Get by source
const sourceTexts = await repo.getTextsBySourceId('file-456');

// Delete
await repo.deleteTextById('text-123');

// Purge all
await repo.purge();
```

### 4. Agents Repository

**Location:** `agents/infrastructure/Repositories/NeDBAgentRepository.ts`

**Features:**
- Store AI agent configurations
- Indexed by id and name

**Usage:**
```typescript
import { NeDBAgentRepository } from './infrastructure/Repositories/NeDBAgentRepository';

const repo = new NeDBAgentRepository();

// Save agent
await repo.saveAgentById('agent-1', {
  id: 'agent-1',
  model: 'gpt-4',
  name: 'Research Agent',
  description: 'Specialized in research tasks',
  instructions: 'You are a research assistant...',
  tools: ['search', 'summarize']
});

// Get agent
const agent = await repo.getAgentById('agent-1');

// Get all agents
const agents = await repo.getAllAgents();

// Delete
await repo.deleteAgentById('agent-1');
```

### 5. Prompts Repository

**Location:** `agents/infrastructure/Repositories/NeDBPromptRepository.ts`

**Features:**
- Store prompt templates
- Retrieve as string or full DTO

**Usage:**
```typescript
import { NeDBPromptRepository } from './infrastructure/Repositories/NeDBPromptRepository';

const repo = new NeDBPromptRepository();

// Save prompt
await repo.savePromptById('prompt-1', {
  id: 'prompt-1',
  systemPrompt: 'You are a helpful assistant',
  userPrompt: 'Answer the following question: {question}',
  template: 'Combined template...'
});

// Get as string (returns template field)
const promptStr = await repo.getPromptById('prompt-1');

// Get as DTO
const promptDTO = await repo.getPromptDTOById('prompt-1');

// Get all prompts
const prompts = await repo.getAllPrompts();

// Delete
await repo.deletePromptById('prompt-1');
```

### 6. Files Repository

**Location:** `files/infrastructure/repository/NeDBRepository.ts`

**Features:**
- Store file metadata (not file contents)
- Search by type or name pattern
- Indexed queries

**Usage:**
```typescript
import { NeDBRepository } from './infrastructure/repository/NeDBRepository';

const repo = new NeDBRepository();

// Save file metadata
await repo.saveFile({
  id: 'file-1',
  name: 'document.pdf',
  type: 'application/pdf',
  size: 1024000,
  lastModified: Date.now(),
  url: '/uploads/document.pdf'
});

// Get all files
const files = await repo.getAllFiles();

// Get by type
const pdfs = await repo.getFilesByType('application/pdf');

// Search by name
const results = await repo.searchFilesByName('document');

// Count
const total = await repo.count();

// Delete
await repo.deleteFile('file-1');

// Purge all
await repo.purge();
```

## Shared Configuration Utility

**Location:** `shared/config/nedb-repositories.ts`

Provides centralized database management:

```typescript
import { getNeDB, closeNeDB, closeAllNeDB, compactAllNeDB } from '@/modules/shared/config/nedb-repositories';

// Get a database instance (singleton pattern)
const db = getNeDB('my-database', {
  timestampData: true,
  autoload: true
});

// Close a specific database
await closeNeDB('my-database');

// Close all databases
await closeAllNeDB();

// Compact all databases
await compactAllNeDB();
```

## Performance Considerations

### Indexing
All repositories automatically create indexes on frequently queried fields. This happens during construction via `ensureIndexes()`.

### Compaction
NeDB databases can grow in size over time. Use the `compact()` method periodically to reclaim space:

```typescript
await repo.compact();
```

Or use the global utility:
```typescript
import { compactAllNeDB } from '@/modules/shared/config/nedb-repositories';
await compactAllNeDB();
```

### Memory Usage
NeDB loads the entire database into memory. For large datasets (>100MB), consider:
- Regular compaction
- Data archiving/cleanup strategies
- Splitting into multiple collections

## Migration from LevelDB

All modules previously used LevelDB. The NeDB implementations maintain the same interfaces, so migration is straightforward:

**Before:**
```typescript
import { LevelDBRepository } from './infrastructure/repositories/LevelDBRepository';
const repo = new LevelDBRepository();
```

**After:**
```typescript
import { NeDBRepository } from './infrastructure/repositories/NeDBRepository';
const repo = new NeDBRepository();
```

## Testing

Example test structure:

```typescript
import { NeDBRepository } from './NeDBRepository';

describe('NeDBRepository', () => {
  let repo: NeDBRepository;

  beforeEach(() => {
    // Use in-memory database for tests
    repo = new NeDBRepository(':memory:');
  });

  it('should save and retrieve an item', async () => {
    await repo.saveItem(item);
    const retrieved = await repo.getItemById(item.id);
    expect(retrieved).toEqual(item);
  });

  // More tests...
});
```

## Troubleshooting

### Database file is locked
Only one process can access a NeDB file at a time. Ensure:
- No other instances are running
- Previous instances were properly closed
- Use the singleton pattern via `getNeDB()`

### Performance degradation
- Run `compact()` regularly
- Check database file size
- Review query patterns and ensure proper indexing

### Data corruption
NeDB is crash-resistant but not perfect. For critical data:
- Implement regular backups
- Use atomic operations
- Handle errors appropriately

## Additional Resources

- [nedb-promises documentation](https://github.com/bajankristof/nedb-promises)
- [Original NeDB](https://github.com/louischatriot/nedb)
