# Artigle-SiteArtigos
* Projeto de um site de Artigos desenvolvido com Node.js, neste site, usuários admnistradores podem cadastrar artigos de diferentes categorias, como por exemplo,
matemática, filosofia, história, e qualquer outra pessoa pode acessá-los, mesmo não estando logada.

## Tecnologias Utilizadas
* JavaScript, Node.js e Express
* HTML, CSS e Bootstrap
* EJS
* MySQL

## Bibliotecas Utilizadas
* Slugfy
* Sequelize
* bcryptjs
* BodyParser
  
## Funcionalidades:
* Administradores podem realiar login;
* Administradores podem cadastrar, consultar, editar, e excluir outros usuários administradores;
* Administradores podem cadastrar, consultar, editar, e excluir categorias;
* Administradores podem cadastrar, consultar, editar, e excluir artigos;
* Usuários não autenticados podem acessar e ler os artigos cadastrados;
* Usuários não autenticados podem filtrar artigos por categorias;
* O site utiliza um sistema de paginação para exibição dos artigos.

## Visualização do Sistema

## Rotas
* GET / : Redireciona o usuário para a página de listagem de artigos;
  
* GET /admin/articles : Lista todos os artigos para o administrador com as categorias associadas;
  * Requer autenticação;
    
* GET /admin/articles/new : Carrega o formulário de criação de um novo artigo com todas as categorias listadas do banco de dados;
  * Requer autenticação;
    
* POST /articles/save :
  * Requer Autenticação;
  * Parâmetros:
    * title: Título do artigo;
    * body: Conteúdo do artigo;
    * categoryId: ID da categoria a qual o artigo pertence;

* POST /articles/delete : Deleta um artigo selecionado após confirmação do usuário;
  * Requer Autenticação;
  * Parâmetros
    * id - ID do artigo a ser deletado;
   
* POST /admin/articles/edit : Carrega o formulário de edição para um artigo existente;
  * Requer Autenticação;
  * Parâmetros:
    * id - ID do artigo a ser editado;
   
* POST /articles/update : Atualiza um artigo existente no banco de dados;
 * Requer Autenticação;
 * Parâmetros:
   * id: ID do artigo;
   * title: Novo título;
   * categoryId: ID da categoria do artigo;
   * body: Conteúdo do artigo;
  
* GET /user/article/read/:slug :  Exibe o artigo selecionado para leitura baseado em seu slug;
  * Parâmetros:
     * slug - Slug do artigo;
   
* GET /user/articles : Redireciona para a primeira página de artigos dos usuários;

* GET /user/articles/page/:num : Gerencia a paginação para artigos de usuários. Exibe um número definido de artigos por página;
  * Parâmetros: num - Número da página;
 
* GET /user/category/:slug : Exibe todos os artigos de uma categoria específica;
  * Parâmetros: slug - Slug da categoria;
 
* GET /admin/categories/new : Carrega o formulário para criar uma nova categoria;
  * Requer Autenticação;
 
* POST /categories/save : Salva uma nova categoria no banco de dados;
  * Requer Autenticação;
  * Parâmetros: title - Título da nova categoria;
 
* GET /admin/categories : Lista todas as categorias para o administrador;
  * Requer Autenricação;
 
* POST /categories/delete : Deleta uma categoria selecionada do banco de dados;
   * Requer Autenticação;
   * Parâmetros:
     * id - ID da categoria a ser deletada;
       
* POST /admin/categories/edit : Carrega o formulário para a edição de uma categoria existente;
  * Requer Autenticação;
  * Parâmetros:
    * id - ID da categoria a ser editada;
   
* POST /categories/update : Atualiza os dados de uma categoria existente no banco de dados;
  * Requer Autenticação;
  * Parâmetros:
    * id: ID da categoria
    * title: Novo título da categoria

* GET /admin/users : Lista todos os usuários cadastrados no sistema para o administrador;
  * Requer Autenticação;
    
* GET /admin/users/create : Permite ao administrador criar novos usuários administradores;
  * Requer Autenticação, porém está atualmente está desativado para facilitar os testes;
 
* GET /login : Carrega a tela de login;

* POST /authenticate : Faz a autenticação do usuário e retorna um JSON com os dados do usuário caso o login seja bem-sucedido;
  * Parâmetros:
    * email: E-mail do usuário
    * password: Senha do usuário
   
* POST /users/delete : Deleta um usuário após confirmação do administrador;
  * Requer Autenticação;
  * Parâmetros:
    * id - ID do usuário a ser deletado;
   
* GET /admin/users/edit/:id : Carrega a tela de edição de usuário baseada no ID do usuário selecionado;
  * Requer autenticação;
  * Parâmetros:
    * id - ID do usuário a ser editado;
   
* POST /users/update : Atualiza o e-mail de um usuário escolhido;
  * Requer Autenticação;
  * Parâmetros:
    * email: Novo e-mail do usuário;
    * id: ID do usuário;
   
* POST /users/create :  Cria um novo usuário se não existir um usuário com o mesmo e-mail;
  * Requer Autenticação, porém para facilitar a realização dos testes, a necessidade de autenticação foi desativada;
  * Parâmetros:
    * email: E-mail do novo usuário
    * password: Senha do novo usuário
