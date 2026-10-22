# AERØ — OLDWEB Automotive Visual Archive

Portfólio pessoal inspirado em revistas de tuning, skate e colagem da web independente de 2001–2005. Feito com HTML, CSS e JavaScript puro, sem build ou dependências locais.

## Rodar localmente

1. Extraia a pasta `oldweb-aero-mvp`.
2. Abra `index.html` no navegador. Para uma experiência local mais consistente, use a extensão **Live Server** no VS Code.
3. Não é necessário instalar dependências nem configurar banco de dados.

## Estrutura

```text
oldweb-aero-mvp/
├── index.html
├── style.css
├── app.js
├── README.md
└── assets/
    └── README.txt
```

## O que já funciona

- Navegação entre Home, Works, About e Contact sem framework.
- Layout responsivo para desktop e celular.
- Arquivo de projetos com filtros por categoria.
- Modal de projeto com anterior/próximo e setas do teclado.
- Visual editorial de papel envelhecido, carimbos, recortes, textura granulada e composição assimétrica.
- Respeita a preferência do sistema por movimento reduzido.
- Nenhuma arte real foi inventada: os três projetos são espaços reservados.

## Como adicionar projetos

Abra `app.js` e edite o array `projects` no início do arquivo. Cada projeto tem:

- `id`: número/identificador curto;
- `title`: título real da obra;
- `category`: `livery`, `virtual` ou `concept`;
- `categoryLabel`: rótulo exibido;
- `vehicle`: modelo do carro ou contexto do trabalho;
- `description`: descrição escrita pelo artista;
- `status`: altere `AWAITING ART` quando o trabalho real for inserido.

Para inserir uma obra real, edite o objeto correspondente no array `projects` em `app.js`:

```js
{
  id: "004",
  title: "NOME DA OBRA",
  category: "livery", // livery, virtual ou concept
  categoryLabel: "LIVERY DESIGN",
  vehicle: "MODELO REAL",
  year: "2026",
  description: "Texto escrito pelo artista.",
  image: "assets/images/livery/nome-da-obra.webp",
  alt: "Descrição objetiva da imagem",
  status: "ORIGINAL ART"
}
```

Os caminhos são relativos à raiz do projeto. A função de cartões e o modal reconhecem `image` automaticamente; se o campo estiver vazio, o bloco continua sendo exibido como placeholder.

## Antes de publicar

- Troque os links provisórios de Instagram e Flickr pelos perfis reais.
- Revise nome artístico, descrição, créditos e direitos de uso das imagens.
- Se quiser evitar dependência externa, baixe as fontes licenciadas e sirva-as localmente; no momento, as fontes são carregadas do Google Fonts.
- Publique em GitHub Pages ou Cloudflare Pages. Este MVP é estático e não inclui painel administrativo, autenticação ou upload de arquivos.

## Organização recomendada de imagens

Crie as pastas `assets/images/livery/`, `assets/images/virtual-tuning/`, `assets/images/projects/` e `assets/images/banners/` conforme os trabalhos forem recebidos. O arquivo [assets/README.txt](assets/README.txt) resume as regras para substituir placeholders sem publicar imagens sem autorização.
