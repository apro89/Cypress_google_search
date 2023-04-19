/// <reference types="cypress" />


context('Search dogs', () => {
    const searchWord = 'dogs'
    it('Search dogs', () => {
        cy.intercept(`https://www.google.com/search?q=${searchWord}*`).as('search')
        cy.visit('https://www.google.com')
        cy.get('div[class="QS5gu sy4vM"]').eq(1).click()
        cy.get('.gLFyf').should('be.visible')
        cy.get('.gLFyf').type(searchWord)
        cy.get('input[value="Pesquisa Google"]').first().click();
        cy.wait('@search')
         cy.get(`div[data-async-context="query:${searchWord}"] a h3`).each(($el, index) => {
             cy.wrap($el).invoke('text').then(text => {
                cy.wrap(text.toLowerCase())
                .should('contain', 'dog')
            })
        }) 
    })
})