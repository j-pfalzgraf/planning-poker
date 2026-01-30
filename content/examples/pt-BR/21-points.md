# 21 Story Points – Mudanças Muito Grandes

> **Esforço:** 1–2 semanas
> **Risco:** Alto
> **Testes:** Suíte de testes abrangente + revisão QA

---

## Exemplo 1: Permissões Baseadas em Papéis

**Título:** Implementar Sistema de Papéis e Permissões

**Descrição:**
Introdução de papéis (Admin, Gerente, Usuário) com permissões granulares. Elementos de UI e endpoints de API são protegidos de acordo.

**Critérios de Aceite:**

- [ ] Papéis: Admin, Gerente, Usuário, Visitante
- [ ] Permissões por funcionalidade (CRUD)
- [ ] UI de admin para gerenciamento de papéis
- [ ] Frontend: Exibição condicional de elementos
- [ ] Backend: Middleware para autorização
- [ ] Log de auditoria para mudanças de permissão
- [ ] Migração de usuários existentes

---

## Exemplo 2: Multi-Tenancy

**Título:** Introduzir Suporte Multi-Tenant

**Descrição:**
A aplicação deve suportar múltiplos tenants (empresas) independentes. Separação estrita de dados.

**Critérios de Aceite:**

- [ ] ID do Tenant em todas as tabelas relevantes
- [ ] Detecção de tenant baseada em subdomínio ou header
- [ ] Alternador de tenant para super admins
- [ ] Dados isolados por tenant
- [ ] Configuração específica por tenant
- [ ] Migração de dados existentes

---

## Exemplo 3: Internacionalização (i18n)

**Título:** Suporte Completo Multi-Idioma (EN, PT, ES)

**Descrição:**
Toda a aplicação deve estar disponível em três idiomas. Troca dinâmica de idioma sem recarregar.

**Critérios de Aceite:**

- [ ] Todos os textos de UI externalizados
- [ ] Arquivos de idioma para EN, PT, ES
- [ ] Alternador de idioma no header
- [ ] Idioma salvável nas configurações do usuário
- [ ] Formatos de data e número localizados
- [ ] Suporte RTL preparado

---

## Por que 21 Pontos?

- Mudanças amplas em todo o sistema
- Impacto na arquitetura
- Alto risco de regressões
- Migração complexa
- Testes intensivos necessários
