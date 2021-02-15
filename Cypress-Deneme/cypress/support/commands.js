Cypress.Commands.add("SignIn",() =>{
    cy.visit('/#/login')        
        cy.title().should('eq','Conduit') // aktif sayfayı döndürür
        cy.location('protocol').should('eq','https:')//sayfanın protokolünü belittik farklı parametrelerde alabilir
        // cy.get('input[type = "email"]').type('kerim_648@hotmail.com')
        // cy.get('input[type = "password"]').type('K12345678')
        // cy.get('.btn').contains('Sign in').should('be.visible').click()

        cy.get('form').within($form =>{//form elementileri ile birlikte işlem yapabilme
            //cy.get() will only search for elements form, not within 
            cy.get('input[type = "email"]').type('kerim_648@hotmail.com')
            cy.get('input[type = "password"]').type('K12345678')
            cy.root().submit()// form submit edildiğin geçerli olucak. Sumbit Buttonları uniqe olmak zorundadır. 
        })
        cy.contains('Your Feed',{timeout:10000}).should('be.visible')
})
