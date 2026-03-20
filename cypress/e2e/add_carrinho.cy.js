/// <reference types="cypress" />

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