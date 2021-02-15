describe ('Favorilere tiklanmis mi tiklanmamis mi',function(){
    it('Login Girisi',function(){
        cy.visit('https://react-redux.realworld.io/#/login')
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

    it('Post olusturma',function(){
        // cy.contains('New Post').click()
        cy.get('ul.navbar-nav').children().contains('New Post').click() // alt elementlere ulaşmak için children kullanıyoruz
        
        cy.hash().should('include','#/editor') //url hash ettik 
        cy.get('form').within($form =>{
        //cy.location('hash').should('include','/#/editor') üstteki ile aynı
        cy.get('input').first().type('Test')
        cy.get('input').eq(1).type('Test 1') // 1'den soraki elemente erişmek için eq kullanılır array gibi index yapısı vardır.
        cy.get('textarea').last().type('Test 2')//last() sonuncuya erişmemizi sağlar.
        cy.contains('Publish Article').click()
        })
        cy.url().should('include','article')//o anda aktif olan sayfanın url'ni döndürür
    })

    it('Favori edilmis mi',function(){
        // cy.get('.nav-link').contains('kerimozturk').click()

        cy.get('ul.navbar-nav').children().contains('kerimozturk').click()
        cy.contains('My Articles').should('be.visible')
        cy.get('.ion-heart').first().click()
        cy.contains('Favorited Articles').click()
        cy.url().should('include','favorites')
        cy.get('.ion-heart').first().click()
        cy.reload()// Yapılan işlemlerden sonra bir şey dağişiyorsa sayfa yeniden yüklemek için reload kullanıyoruz
        cy.contains('No articles are here... yet.').should('be.visible')
        cy.go('back') //browserda geri  yapmak
        //cy.go(-1) //1 geriye
        //cy.go('foward')// browserda ileri gitmek için 
        //cy.go(1)

    })
})