# TWTR

**Número da Lista**: 1<br>
**Conteúdo da Disciplina**: Grafos 1<br>

## Alunos
|Matrícula | Aluno |
| -- | -- |
| 16/0123119  |  Guilherme de Oliveira Aguiar |
| 15/0137567  |  Lucas Siqueira Rodrigues |

## Sobre 
O projeto é um clone do twitter onde implementamos um algoritmo de recomendação de pessoas para seguir. O algoritmo é feito a partir de uma busca em largura sendo já iniciado com um usuário logado, onde é possível fazer logout e logar com outros usuários pré-cadastrados e também seguir pessoas da área de recomendação, chamada "Talvez você curta". O sistema vai não vai te recomendar pessoas que você já segue, ele vai analisar as camadas intermediárias a partir do grafo que é criado tendo o usuário logado no momento como nó inicial. Sempre que uma nova pessoa é seguida o BFS é chamado novamente e a lista de recomendações é atualizada, o projeto não possui banco de dados, as alterações só são mantidas enquanto o pagina esta em execução, ao atualizar a pagina por exemplo os dados voltam para o estado inicial, e fizemos um simples deploy, que pode ser acessado pelo link https://grafos1-twtr.netlify.app/ para facilitar o teste do projeto, não sendo necessário nenhuma instalação adicional.

## Screenshots

### Perfil do usuário, com seção de recomendações no topo direito:

<div>
<img src="./img/twtr1.png" alt="drawing" width="700"/>
</div>

<br/>

### Popup de login:

<div>
<img src="./img/twtr2.png" alt="drawing" width="700"/>
</div>

<br/>

### Representação do grafo de usuários:

<div>
<img src="./img/twtr3.png" alt="drawing" width="700"/>
</div>

## Instalação 
**Linguagem**: TypeScript<br>
**Framework**: ReactJS<br>
Não é necessário instalar nada, o deploy da aplicação foi feito pelo netlify na url: https://grafos1-twtr.netlify.app/

Caso queira executar o projeto em sua maquina, é necessário ter o node instalado, recomendamos a utilização do yarn como gerenciador de pacotes, porém também pode ser utilizado com o npm, e siga os seguintes passos:

Clone o repositório
> git clone https://github.com/projeto-de-algoritmos/Grafos1_TWTR.git

Acesse a pasta
> cd Grafos1_TWTR 

Instale as dependências
> yarn

Execute o projeto
> yarn start

## Uso 
Ao iniciar a aplicação, você pode trocar de usuário (a lista de usuários disponíveis esta logo abaixo), clicando na seta ao lado do nome do usuário logado no canto inferior esquerdo e também pode seguir usuários na sua lista de recomendações, o que gera uma nova lista.

#### Usuários disponíveis:
- lucassiqz
- guilherme-aguiar
- caiooliv
- carlinhos
- matheus-rn
- thiagoo
- we11
- an@_maria
- mario
- alex

## Apresentação
A apresentação em video está disponível no link: https://github.com/projeto-de-algoritmos/Grafos1_TWTR/blob/master/Apresentacao.mp4



