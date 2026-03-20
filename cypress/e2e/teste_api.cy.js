describe('Teste API - Listar produtos', () => {
  it('Deve validar o retorno da API de Lista de Produtos', () => {
    cy.request({
      method: 'GET',
      url: 'https://automationexercise.com/api/productsList'
    }).then((response) => {

      expect(response.status).to.eq(200);

      expect(response.body).to.not.be.null;

      cy.log('A API retornou o Status Code esperado: ' + response.status);
    });
  });
});