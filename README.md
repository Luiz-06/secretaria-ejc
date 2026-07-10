# Homenagem — Equipe Secretaria EJC

Site estático, responsivo e feito apenas com HTML, CSS e JavaScript. Ele pode ser aberto diretamente no navegador e publicado gratuitamente no GitHub Pages.

## Estrutura do projeto

```text
/
├── index.html
├── style.css
├── script.js
├── assets/
│   ├── integrantes/
│   ├── galeria/
│   ├── videos/
│   └── logo/
└── README.md
```

## Como abrir o site

1. Abra a pasta do projeto.
2. Dê dois cliques no arquivo `index.html`.
3. Digite a senha padrão: `ejc16`.

Não é necessário instalar programas, dependências ou servidor.

## Como trocar a senha

1. Abra o arquivo `script.js` em um editor de texto.
2. No começo do arquivo, encontre esta linha:

```js
const SENHA_CORRETA = "ejc16";
```

3. Troque somente `ejc16` pela nova senha, mantendo as aspas. Exemplo:

```js
const SENHA_CORRETA = "minhaNovaSenha";
```

> Atenção: em um site estático, a senha é apenas uma barreira simples. Ela pode ser encontrada no código-fonte por alguém com conhecimento técnico. Não use o site para guardar conteúdo realmente confidencial.

## Como adicionar ou alterar integrantes

1. Coloque a foto da pessoa na pasta `assets/integrantes/`.
2. Prefira nomes de arquivos sem espaços ou acentos, como `maria-silva.jpg`.
3. Abra o arquivo `script.js`.
4. Encontre a lista chamada `integrantes`.
5. Adicione uma linha seguindo este modelo:

```js
{ nome: "Maria Silva", foto: "assets/integrantes/maria-silva.jpg" },
```

Exemplo com mais pessoas:

```js
const integrantes = [
  { nome: "Maria Silva", foto: "assets/integrantes/maria-silva.jpg" },
  { nome: "João Souza", foto: "assets/integrantes/joao-souza.jpg" }
];
```

Para remover alguém, apague a linha correspondente. Os cards são criados automaticamente; não é necessário editar o HTML.

## Como trocar as fotos existentes

Há duas maneiras:

- Substitua o arquivo dentro da pasta por outro arquivo com exatamente o mesmo nome.
- Ou coloque a nova imagem na pasta e altere o caminho correspondente no `script.js`.

Formatos recomendados para fotos: JPG, JPEG, PNG e WebP. Antes de publicar, comprima as imagens para o site carregar rapidamente em celulares. Uma foto entre 150 KB e 500 KB costuma ser suficiente.

## Como adicionar fotos à galeria

1. Coloque a imagem na pasta `assets/galeria/`.
2. Abra o arquivo `script.js`.
3. Encontre a lista chamada `galeria`.
4. Adicione uma linha antes de `];`:

```js
{ tipo: "foto", arquivo: "assets/galeria/minha-foto.jpg" },
```

## Como adicionar vídeos

1. Coloque o vídeo na pasta `assets/videos/`.
2. Use preferencialmente o formato MP4, que funciona na maioria dos celulares.
3. Na lista `galeria` do arquivo `script.js`, adicione:

```js
{ tipo: "video", arquivo: "assets/videos/meu-video.mp4" },
```

Fotos e vídeos podem aparecer juntos e na ordem desejada. Basta mudar a ordem das linhas dentro da lista.

> Vídeos muito grandes deixam o carregamento lento. Comprima-os antes de publicar. O GitHub normalmente não aceita arquivos individuais maiores que 100 MB.

## Como alterar as mensagens

Abra o arquivo `index.html`. Os comentários mostram claramente:

- onde alterar a mensagem principal;
- onde alterar a mensagem final;
- onde alterar o texto do rodapé.

Edite apenas o texto que aparece entre as tags. Não apague os sinais `<` e `>`.

## Como alterar as cores

Abra o arquivo `style.css`. No começo dele há uma seção chamada `ONDE ALTERAR AS CORES`. As cores principais ficam em variáveis como:

```css
--blue-900: #0b3b68;
--accent-400: #8fd3f4;
--white: #ffffff;
```

Troque o código depois dos dois-pontos e mantenha o ponto e vírgula.

## Como publicar no GitHub Pages

1. Crie uma conta em [github.com](https://github.com), se ainda não tiver uma.
2. Clique em **New repository** e escolha um nome, por exemplo `equipe-secretaria-ejc`.
3. Deixe o repositório como **Public** e crie-o.
4. Na página do repositório, clique em **Add file** e depois em **Upload files**.
5. Envie `index.html`, `style.css`, `script.js`, `README.md` e a pasta `assets` completa.
6. Clique em **Commit changes**.
7. Abra **Settings** do repositório.
8. No menu lateral, abra **Pages**.
9. Em **Build and deployment**, escolha **Deploy from a branch**.
10. Selecione a branch `main`, a pasta `/ (root)` e clique em **Save**.

Depois de alguns minutos, o endereço será parecido com:

```text
https://seu-usuario.github.io/equipe-secretaria-ejc/
```

Use esse endereço para gerar o QR Code.

## Observação sobre proteção de imagens

O site bloqueia clique direito, arrastar imagens e seleção de texto, e adiciona uma marca d'água discreta. Essas medidas dificultam cópias casuais, mas nenhum site consegue impedir capturas de tela ou garantir proteção total de arquivos exibidos no navegador.
