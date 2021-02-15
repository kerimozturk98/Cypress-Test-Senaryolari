describe ('Favorilere tiklanmis mi tiklanmamis mi',function(){
    before(function(){
        cy.SignIn()
        //Mocha Hooks before,after,beforeEach,afterEach
    })

    it('Post olusturma',function(){// only ile sadece bu testi hook layacağız
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

    it.skip('Favori edilmis mi',function(){ //skip bu testi geç demek
        // cy.get('.nav-link').contains('kerimozturk').click()

        cy.get('ul.navbar-nav').children().as('menu')
        cy.get('@menu').contains('kerimozturk').click()
        cy.contains('My Articles').should('be.visible')
        cy.get('.ion-heart').first().click()
        cy.contains('Favorited Articles').click()
        cy.url().should('include','favorites')
        cy.get('.btn-primary').first().then(($fav) => {
            return  $fav.text()
        }).as('favCount') 
        cy.get('@favCount').then(($cnt) => {
            expect(parseInt($cnt)).to.eq(1);
        })
        cy.get('.btn-primary').first().click()
        cy.reload()// Yapılan işlemlerden sonra bir şey dağişiyorsa sayfa yeniden yüklemek için reload kullanıyoruz

        //cy.go(-1) //1 geriye
        //cy.go('foward')// browserda ileri gitmek için 
        //cy.go(1)

    })
})