#linguagem: pt

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


