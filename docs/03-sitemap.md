# 03 — Sitemap Completo

## Hierarquia de rotas

```
/                                     Home
│
├── /o-movimento                      O Movimento (overview)
│   ├── /o-movimento/historia         História do movimento
│   ├── /o-movimento/missao           Missão, visão, valores
│   ├── /o-movimento/governanca       Estrutura organizacional
│   └── /o-movimento/manifesto        Manifesto completo
│
├── /projetos                         Projetos e Ações (listagem)
│   ├── /projetos?categoria=seguranca         Filtro por categoria
│   ├── /projetos?categoria=sustentabilidade
│   ├── /projetos?categoria=urbanismo
│   └── /projetos/[slug]              Detalhe de cada projeto
│       Exemplos:
│       /projetos/reforma-posto-policial
│       /projetos/gestao-integrada-orla
│       /projetos/monitoramento-cameras
│       /projetos/manutencao-urbana
│       /projetos/apoio-operacional-temporada
│       /projetos/seguranca-urbana
│
├── /impacto                          Dashboard de Impacto
│   └── /impacto?ano=2024             Filtro temporal
│
├── /parceiros                        Parceiros (listagem)
│   ├── /parceiros?categoria=empresas
│   ├── /parceiros?categoria=condominios
│   ├── /parceiros?categoria=restaurantes
│   ├── /parceiros?categoria=comercio
│   ├── /parceiros?categoria=patrocinadores
│   └── /parceiros/[slug]             Perfil do parceiro
│
├── /transparencia                    Transparência e Prestação de Contas
│   ├── /transparencia/relatorios     Relatórios anuais
│   ├── /transparencia/investimentos  Demonstrativo financeiro
│   ├── /transparencia/resultados     Resultados alcançados
│   └── /transparencia/[ano]          Arquivo por ano
│       /transparencia/2024
│       /transparencia/2023
│
├── /noticias                         Blog institucional (listagem)
│   ├── /noticias/categoria/[slug]    Listagem por categoria
│   │   /noticias/categoria/seguranca
│   │   /noticias/categoria/sustentabilidade
│   │   /noticias/categoria/urbanismo
│   │   /noticias/categoria/comunidade
│   │   /noticias/categoria/eventos
│   └── /noticias/[slug]             Post individual
│
├── /participar                       Adesão ao movimento
│   ├── /participar/morador           Formulário morador
│   ├── /participar/empresa           Formulário empresa
│   ├── /participar/instituicao       Formulário instituição
│   └── /participar/parceiro          Formulário parceiro/patrocinador
│
└── /contato                          Contato geral
```

---

## Rotas de sistema (não indexadas)

```
/api/contact                          POST formulário de contato
/api/membership                       POST adesão
/api/newsletter                       POST newsletter
/api/revalidate                       POST webhook ISR
/sitemap.xml                          Gerado automaticamente
/robots.txt                           Gerado automaticamente
```

---

## Prioridades de indexação (sitemap)

| Rota | Prioridade | Frequência |
|------|-----------|------------|
| / | 1.0 | daily |
| /o-movimento | 0.9 | weekly |
| /projetos | 0.9 | weekly |
| /projetos/[slug] | 0.8 | weekly |
| /impacto | 0.8 | monthly |
| /parceiros | 0.7 | weekly |
| /transparencia | 0.7 | monthly |
| /noticias | 0.8 | daily |
| /noticias/[slug] | 0.7 | weekly |
| /participar | 0.9 | monthly |
| /contato | 0.6 | monthly |

---

## Estratégia de URLs

- Todas em português, sem acentos, hifenizadas
- Sem trailing slash exceto raiz
- Canonical definido em toda página dinâmica
- Paginação via `?pagina=2` (rel prev/next no head)
- Filtros via query params (não indexados)
- Slugs gerados automaticamente pelo CMS com proteção de duplicatas

---

## Redirects planejados

```javascript
// next.config.ts
redirects: [
  { source: '/sobre', destination: '/o-movimento', permanent: true },
  { source: '/blog', destination: '/noticias', permanent: true },
  { source: '/contato-nos', destination: '/contato', permanent: true },
  { source: '/parceiros-patrocinadores', destination: '/parceiros', permanent: true },
]
```

---

## Páginas legais (footer)

```
/privacidade                          Política de privacidade
/cookies                              Política de cookies
/termos                               Termos de uso
/acessibilidade                       Declaração de acessibilidade
```
