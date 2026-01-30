# 5 Story Points – Mudanças Médias

> **Esforço:** 1–2 dias
> **Risco:** Moderado
> **Testes:** Testes unitários, de integração e E2E recomendados
> **Complexidade:** Média

---

## 📋 Exemplo 1: Exportação CSV para Pedidos

### História de Usuário

> Como **administrador da loja** eu quero **exportar todos os pedidos exibidos como CSV** para que **eu possa processar os dados no Excel**.

### Contexto

A visão geral de pedidos atualmente exibe até 100 pedidos. Um novo botão de exportação deve baixá-los como arquivo CSV. Filtros ativos devem ser respeitados.

### Arquitetura Técnica

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   ExportButton  │────▶│   OrderService  │────▶│   CSV-Generator │
│   (Frontend)    │     │   (Chamada API) │     │   (Backend)     │
└─────────────────┘     └─────────────────┘     └─────────────────┘
         │                                               │
         │◀──────────────── Download Blob ◀──────────────┘
```

### Especificação da API

```http
GET /api/orders/export?status=pending&from=2024-01-01
Accept: text/csv

Resposta:
Content-Type: text/csv; charset=utf-8
Content-Disposition: attachment; filename="pedidos-2024-01-15.csv"
```

### Formato CSV

```csv
NoPedido;Data;Cliente;Itens;Total
PED-2024-001;15/01/2024;João Silva;3;R$749,99
PED-2024-002;15/01/2024;Maria Santos;1;R$149,99
```

### Critérios de Aceite

- [ ] Botão "Exportar como CSV" no canto superior direito da visão geral de pedidos
- [ ] Colunas: No Pedido, Data, Cliente, Número de Itens, Total
- [ ] Formatação brasileira (Data: DD/MM/AAAA, Números: 1.234,56)
- [ ] UTF-8 com BOM para compatibilidade com Excel
- [ ] Nome do arquivo: `pedidos-AAAA-MM-DD.csv`
- [ ] Spinner de carregamento durante geração
- [ ] Tratamento de erro para > 10.000 linhas

### Cenários de Teste

1. **Happy Path:** Exportar 50 pedidos → CSV correto
2. **Exportação Vazia:** Sem pedidos → Mostrar mensagem informativa
3. **Dados Grandes:** 5.000 pedidos → Performance < 3s
4. **Caracteres Especiais:** Nomes de clientes com acentos → correto no Excel

---

## 📋 Exemplo 2: Paginação no Lado do Servidor

### História de Usuário

> Como **usuário** eu quero **navegar por listas grandes** para que **a página carregue rapidamente e fique organizada**.

### Contexto

A lista de produtos atualmente carrega todos os 5.000+ itens de uma vez, causando longos tempos de carregamento. Paginação no lado do servidor com 20 itens por página deve ser implementada.

### Mudanças na API

```typescript
// Novo endpoint
GET /api/articles?page=1&limit=20&sort=name:asc

// Resposta
{
  "data": [...],
  "meta": {
    "total": 5432,
    "page": 1,
    "limit": 20,
    "totalPages": 272
  }
}
```

### Componente de UI

```
┌────────────────────────────────────────────────┐
│  ◀ Voltar   1  2  3  ...  271  272   Próximo ▶ │
│           Mostrando 1-20 de 5.432 itens        │
└────────────────────────────────────────────────┘
```

### Critérios de Aceite

- [ ] Backend: Endpoint com parâmetros `page`, `limit`, `sort`
- [ ] Frontend: Componente de paginação com números de página
- [ ] Sincronização de URL: `?page=2` é refletido na URL
- [ ] Deep Link: Acesso direto à página 5 funciona
- [ ] Estado de carregamento durante mudança de página (skeleton)
- [ ] Ir para página 1 ao mudar filtro
- [ ] Mobile: Paginação simplificada (apenas Anterior/Próximo)

---

## 📋 Exemplo 3: Upload de Foto de Perfil

### História de Usuário

> Como **usuário registrado** eu quero **fazer upload de uma foto de perfil** para que **meu perfil pareça mais pessoal**.

### Critérios de Aceite

- [ ] Drag & drop ou seleção de arquivo
- [ ] Formatos permitidos: JPG, PNG, WebP
- [ ] Tamanho máximo: 5 MB
- [ ] Preview antes do upload (opção de corte)
- [ ] Indicador de progresso durante upload
- [ ] Lado do servidor: Redimensionar para máx 400x400px
- [ ] Imagem antiga é automaticamente excluída
- [ ] Fallback: Avatar com iniciais quando não há imagem

### Tratamento de Erros

| Erro           | Mensagem                                     |
| -------------- | -------------------------------------------- |
| Formato errado | "Apenas JPG, PNG ou WebP permitidos"         |
| Muito grande   | "A imagem deve ter 5 MB ou menos"            |
| Upload falhou  | "Upload falhou. Por favor, tente novamente." |

---

## ✅ Por que 5 Pontos?

| Critério    | Avaliação                         |
| ----------- | --------------------------------- |
| Arquitetura | Frontend + Backend                |
| Componentes | 3–5 arquivos novos/alterados      |
| Lógica      | Complexidade moderada             |
| Testes      | Unitário + Integração necessários |
| Risco       | Gerenciável                       |
