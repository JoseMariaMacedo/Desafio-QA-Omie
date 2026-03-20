# Desafio Técnico | QA Jr

## Sobre o projeto

Este projeto foi desenvolvido para o desafio técnico para a vaga de **Analista de Teste Jr**.

O objetivo é testar o fluxo de adição de produtos ao carrinho em um e-commerce simulado, utilizando **BDD (Gherkin)**, **testes exploratórios** e **automação com Cypress**.

Site utilizado:
https://automationexercise.com/

---

## Parte 1 | BDD (Gherkin)

### 🎯 Funcionalidade: Adicionar produtos ao carrinho

```gherkin
Funcionalidade: Adicionar produtos ao carrinho

    Cenário: Usuário adiciona um produto carrinho com sucesso
        Dado que o usuário acessa a página inicial do site
        E visualiza as categorias de produtos disponíveis (homem, mulher, infantil)
        Quando o usuário selecionar uma categoria de produtos
        E escolhar um produto da lista
        E clicar no botão "Adicionar ao carrinho"
        Então um pop-up deve ser exibido informando que o produto foi adicionado com sucesso
        E o usuário deve ter a opção de "Ver carrinho" ou "Continuar Comprando"

    Cenário: Usuário visualiza os produtos no carrinho
        Dado que o usuário adicionou um ou mais produtos ao carrinho
        Quando o usuário clicar em "Ver carrinho"
        Então o site deve redirecionar para a página do carrinho
        E os produtos adicionados devem ser exibidos corretamente

    Cenário: Usuário tenta finalizar a compra sem estar logado
        Dado que o usuário possui produtos no carrinho
        Quando o usuário tentar finalizar a compra
        Então o site deve solicitar ao usuário que realize o login
        E um pop-up deve ser exibido informando a necessidade de autenticação
        E o usuário deve ter a opção de criar uma conta ou efetuar o login

```

---

## Teste Exploratório – Possíveis erro do usuário

### Cenário: Cliques múltiplos no botão "Adicionar ao carrinho"

**Descrição:**
O usuário pode clicar repetidamente no botão "Adicionar ao carrinho" ao escolher o produto, fazendo com que
o item seja inserido várias vezes.

**Riscos identificados:**

* Duplicação indevida de produtos no carrinho
* Inconsistência na quantidade de itens
* Possível falha de resposta da interface


---

## Parte 2 | Automação com Cypress

### Estrutura do projeto

```
DESAFIO-QA-OMIE/
├── cypress/
│   ├── e2e/              # Arquivos de testes automatizados (.cy.js)
│   │   ├── add_carrinho.cy.js
│   │   └── teste_api.cy.js
│   ├── fixtures/         # Dados estáticos para os testes (Mocks/JSON)
│   └── support/          # Comandos personalizados e configurações globais
├── node_modules/         # Dependências instaladas pelo NPM (Ignorado pelo Git)
├── .gitignore            # Arquivo para ignorar arquivos/pastas no Git
├── cypress.config.js     # Configurações principais do Cypress
├── Etapa01.feature       # Documentação dos cenários em BDD/Gherkin
├── jsconfig.json         # Configurações de auxílio do JavaScript no VS Code
├── LICENSE               # Licença do repositório
├── package-lock.json     # Histórico detalhado das versões das dependências
├── package.json          # Manifesto do projeto e scripts de execução
└── README.md             # Documentação principal do projeto
```

---

### Teste de UI – Adição de produtos ao carrinho

```javascript
describe('Adicionando produtos ao carrinho', () => {

  it('Adicionar dois produtos ao carrinho com sucesso', () => {

    // Acesso ao site de testes
    cy.visit('https://automationexercise.com/');

    // Validar se o site carregou
    cy.contains('Home').should('be.visible');

    // Adicionando produtos ao carrinho usando o ID de cada item na página
    cy.get('[data-product-id="1"]').first().click({force: true});
    cy.contains('Added!').should('be.visible');
    
    // Clicar em continuar para adicionar o próximo produto
    cy.contains('Continue Shopping').click();

    //Adicionando mais produtos ao carrinho validando o comportamento da ferramenta
    cy.get('[data-product-id="3"]').first().click({force: true});
    cy.contains('Added!').should('be.visible');

    //Testando o direcionando a pagina do carrinho
    cy.contains('View Cart').click();

    //Validando o conteúdo presente na página e se os produtos foram adicionados.
    cy.url().should('include', '/view_cart');


    // Verificamos se contém os dois itens
    cy.get('.cart_description').should('have.length', 2);
    cy.get('.cart_description').should('be.visible');

  });

});
```

---

### ⚠️ Observação técnica

O site utiliza interação via **hover** para exibir o botão de adicionar ao carrinho.

Durante a automação, foi identificado que o método `.trigger('mouseover')` do Cypress pode não simular corretamente o comportamento real do usuário em todos os casos. Isso porque ao tentar adicionar mais de um produto ao teste, percebi que o Cypress continuava simulando sobre o primeiro item.

Por esse motivo, foi utilizada a abordagem com `{ force: true }`, com isso foi possível chegar ao resultado esperado, conseguindo adicionar outros itens ao teste, não dependendo somente o primeiro produto. 

---

### 🌐 Teste de API

```javascript
describe('Teste de API - Lista de Produtos', () => {

  it('Deve retornar status 200 ao buscar produtos', () => {

    cy.request({
      method: 'GET',
      url: 'https://automationexercise.com/api/productsList'
    }).then((response) => {
      expect(response.status).to.eq(200);
    });

  });

});
```

---

## Parte 3 | Bug Report

### Título: Erro ao remover produtos do carrinho

### Descrição:

Ao adicionar mais de uma unidades do mesmo produto, o sistema não permite ajustar a quantidade diretamente no carrinho.
O usuário só pode remover o item completamente, sendo necessário retornar à página de produtos para adicioná-lo novamente.
Isso impacta negativamente a experiência do usuário e aumenta a chance de erros durante a compra.

### Passos para reproduzir:

1. Acessar a página inicial.
2. Adicionar dois ou mais produtos igual ao carrinho.
3. Tentar diminuir a quantidade do produto adicionado.

### ❌ Resultado atual:

O site não permite remover ou subtrair a quantidade dos itens inseridos, o usuário só pode excluir o produto adicionado. 

### ✅ Resultado esperado:

O site deve permitir que o usuário adicione ou remova a quantidade de produtos diretamente no carrinho, sem que seja necessário retornar a página inicial para adição ou excluir totalmente o produto para correção. 


---

## Como executar o projeto

### 1. Instalar dependências

```bash
npm install cypress --save-dev
```

### 2. Abrir o Cypress

```bash
npx cypress open
```

### 3. Executar os testes

Selecionar os arquivos:

```
Arquivo responsável pelo teste de adicionar e validar os produtos no carrinho
add_carrinho.cy.js
```
```
Arquivo do teste de API
teste_api.cy.js
```
---

## 📚 Referências e Estudos

Para o desenvolvimento deste projeto, foram consultadas as seguintes fontes:

### BDD (Behavior Driven Development)
* [Conceitos de BDD e Gherkin](https://www.youtube.com/watch?v=wad38bC7JjI) - Mentalidade de teste e escrita de cenários.

### Cypress (Automação de Testes)
* [Documentação Oficial do Cypress](https://docs.cypress.io/api/table-of-contents) - Consulta técnica de comandos e API.
* [Cypress do Zero ao Pipeline (Agilizei)](https://www.youtube.com/watch?v=VyiFjUloYM4&list=PLBHHiNoJsoNxnovuGjHsC0oZpN99PMhT9) - Estruturação de projetos e boas práticas.
* [Talking About Testing (Walmyr Filho)](https://www.youtube.com/watch?v=WrVb_XgnDdU&list=PLnUo-Rbc3jjy314Ik21RJvYaCoPRHyG9O) - Fundamentos e seletores estáveis.
* [Automação E2E na Prática](https://www.youtube.com/watch?v=WC-85_vOSws) - Fluxos de interface e validações.

---

## Autor: José Maria Macedo
