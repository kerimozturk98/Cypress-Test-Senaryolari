//cypress MOCA test framework'ünü kullanır
describe('Login',function(){
    it('Sing in',function(){
        cy.visit('https://react-redux.realworld.io/#/login')
        cy.get('input[type = "email"]').type('kerim_648@hotmail.com')
        cy.get('input[type = "password"]').type('K12345678')
        cy.get('.btn').contains('Sign in').should('be.visible').click()
        
    })
})