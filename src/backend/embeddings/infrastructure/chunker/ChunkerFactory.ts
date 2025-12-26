// src/lib/chunking/ChunkerFactory.ts

import { FixedSizeChunker } from './strategies/FixedSizeChunker';
import { SentenceChunker } from './strategies/SentenceChunker';
import { ParagraphChunker } from './strategies/ParagraphChunker';
import { RecursiveChunker } from './strategies/RecursiveChunker';
import { SemanticChunker } from './strategies/SemanticChunker';
import type { ChunkingConfig } from '../../@core-contracts/chunking';
import type { EmbeddingProvider } from '../../@core-contracts/providers';

export class ChunkerFactory {
  static create(config: ChunkingConfig, embeddingProvider?: EmbeddingProvider) {
    switch (config.strategy) {
      case 'fixed':
        return new FixedSizeChunker(
          config.chunkSize || 1000,
          config.chunkOverlap || 200
        );

      case 'sentence':
        return new SentenceChunker(
          config.maxChunkSize || 1000,
          config.chunkOverlap || 1
        );

      case 'paragraph':
        return new ParagraphChunker(
          config.maxChunkSize || 1500,
          config.minChunkSize || 100
        );

      case 'recursive':
        return new RecursiveChunker(
          config.chunkSize || 1000,
          config.chunkOverlap || 200,
          config.separators
        );

      case 'semantic':
        if (!embeddingProvider) {
          throw new Error('EmbeddingProvider required for semantic chunking');
        }
        return new SemanticChunker(
          embeddingProvider,
          config.maxChunkSize || 1000
        );

      default:
        throw new Error(`Unknown chunking strategy: ${config.strategy}`);
    }
  }
}