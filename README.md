# 🚀 Klay

> **Proyecto demostrativo de habilidades avanzadas de ingeniería de software y diseño de producto**, con proyección a convertirse en un **SaaS basado en RAG (Retrieval-Augmented Generation)**.

---

## 🧠 Visión del Proyecto

Este proyecto nace con un doble objetivo:

1. **Demostrar habilidades técnicas avanzadas** en arquitectura de software moderna.
2. **Explorar y validar una idea de SaaS** basada en RAG, orientada a resolver un problema real de negocio.

No es solo un experimento técnico: es una base sólida, extensible y desacoplada, pensada para evolucionar hacia un producto real.

---

## 🎯 Objetivos Clave

* Mostrar **arquitectura limpia (Clean Architecture)** aplicada a un caso real.
* Aplicar **principios SOLID** de forma pragmática.
* Diseñar un **monolito modular** con **vertical slicing**.
* Implementar y combinar **patrones de diseño** (Repository, Orchestrator, Strategy, Adapter, etc.).
* Desacoplar completamente la **lógica de negocio** de las **tecnologías concretas**.
* Demostrar dominio de **TypeScript** como lenguaje para sistemas complejos y escalables.
* Sentar las bases técnicas de un **SaaS RAG-ready**.

---

## 🧱 Arquitectura General

### Principios Arquitectónicos

* **Clean Architecture**
* **Dependency Rule** (las dependencias apuntan hacia el dominio)
* **Technology-agnostic core**
* **High cohesion, low coupling**
* **Testabilidad como first-class citizen**

### Enfoque Estructural

* **Monolito Modular** (no microservicios prematuros)
* **Vertical Slicing** (features completas, no capas técnicas horizontales)
* **Bounded Contexts claros**

```text
src/
 ├── modules/
 │   ├── ingestion/
 │   │   ├── domain/
 │   │   ├── application/
 │   │   ├── infrastructure/
 │   │   └── api/
 │   ├── retrieval/
 │   ├── generation/
 │   └── billing/
 ├── shared/
 └── bootstrap/
```

---

## 🧩 Vertical Slices (Feature-Oriented Design)

Cada feature contiene todo lo necesario para funcionar:

* **Domain** → entidades, value objects, reglas de negocio
* **Application** → casos de uso, orquestadores
* **Infrastructure** → implementaciones tecnológicas
* **API / Interface** → controladores, handlers, DTOs

Esto permite:

* Evolución independiente por feature
* Menor fricción cognitiva
* Escalabilidad organizacional

---

## 🔌 Desacoplamiento Tecnológico

La lógica de negocio **no depende de**:

* Frameworks
* Bases de datos
* Proveedores de IA
* Sistemas de mensajería

Todo acceso externo se realiza mediante **interfaces (ports)**.

```ts
// Domain Port
export interface VectorStore {
  upsert(vectors: Vector[]): Promise<void>
  search(query: Embedding, k: number): Promise<Vector[]>
}
```

```ts
// Infrastructure Adapter
export class PineconeVectorStore implements VectorStore {
  // implementación concreta
}
```

Cambiar de tecnología implica **cambiar implementaciones, no reglas de negocio**.

---

## 🧠 Patrones de Diseño Utilizados

* **Repository Pattern** – Persistencia desacoplada
* **Orchestrator / Use Case** – Coordinación de flujos complejos
* **Strategy** – Variantes de embeddings, chunking, ranking
* **Adapter** – Integración con LLMs, vectores, storage
* **Factory** – Resolución de dependencias según contexto
* **CQRS ligero** – Separación lectura/escritura cuando aporta valor

Todos los patrones se aplican **por necesidad, no por moda**.

---

## 🤖 RAG (Retrieval-Augmented Generation)

### Flujo Simplificado

1. Ingesta de información
2. Chunking y normalización
3. Generación de embeddings
4. Almacenamiento vectorial
5. Recuperación contextual
6. Generación con LLM

La arquitectura permite:

* Cambiar proveedor de LLM
* Cambiar estrategia de retrieval
* Añadir rerankers
* Introducir feedback loops

Sin afectar al core del sistema.

---

## 🛠️ Stack Tecnológico (Intercambiable)

> Las tecnologías concretas **no definen la arquitectura**.

* **Language**: TypeScript
* **Runtime**: Node / Bun / Deno
* **API**: REST / GraphQL / tRPC
* **Vector DB**: Pinecone / Weaviate / Qdrant
* **LLMs**: OpenAI / Anthropic / OSS
* **DB**: PostgreSQL / MongoDB
* **Infra**: Docker / Cloud / Local

---

## 🧪 Testing & Calidad

* Unit tests sobre dominio
* Tests de casos de uso
* Mocks vía interfaces
* Testabilidad garantizada por diseño

```text
✔ Dominio testeado sin frameworks
✔ Infra reemplazable
✔ Alta confianza en refactors
```

---

## 📈 Proyección a SaaS

Este proyecto está diseñado para evolucionar hacia:

* Multi-tenancy
* Billing por uso
* Feature flags
* Observabilidad
* Escalado progresivo

El objetivo es **validar la idea mientras se construye con estándares de producción**.

---

## 👥 Audiencia

Este repositorio está pensado para:

* **Reclutadores técnicos** → arquitectura, decisiones, trade-offs
* **Ingenieros senior** → diseño, patrones, escalabilidad
* **Product builders** → visión de SaaS y validación temprana

---

## 📝 Disclaimer

Este no es un proyecto "hello world".

Es una **demostración deliberada de diseño, arquitectura y criterio técnico**, con foco en:

* Pensar sistemas complejos
* Construir para el cambio
* Priorizar mantenibilidad y evolución

---

## 📌 Estado del Proyecto

* [ ] MVP técnico
* [ ] Validación de problema
* [ ] Primeros usuarios
* [ ] Iteración de producto

---

## 🤝 Contribuciones

Feedback técnico y de producto es más que bienvenido.

---

## 📄 Licencia

MIT

**Built with ❤️ using Clean Architecture and Feature-Sliced Design**
