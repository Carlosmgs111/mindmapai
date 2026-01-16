/*
 * Manage files
 * Upload, download, delete, list
 */

import type { FilesApi } from "./@core-contracts/api";
import type { FilesInfrastructurePolicy } from "./@core-contracts/infrastructurePolicies";
import { FilesUseCases } from "./application/UseCases";
import { FilesInfrastructureResolver } from "./infrastructure/composition/Resolver";

export async function filesApiFactory(policy: FilesInfrastructurePolicy): Promise<FilesApi> {
  const { storage, repository } = await FilesInfrastructureResolver.resolve(policy);
  return new FilesUseCases(storage, repository);
}

