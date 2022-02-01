/// <reference types="cypress" />
describe("My first test", function () {
    it("My first test", function () {
        cy.visit("https://rahulshettyacademy.com/seleniumPractise/#/")
        cy.get('.search-keyword').type('ca')
        cy.wait(2000)
        cy.get('.product:visible').should('have.length', 4)
        cy.get('.products').as('productLocator')
        cy.get('@productLocator').find('.product').should('have.length', 4)
        cy.get(':nth-child(4) > .product-action > button').click()
        cy.get('@productLocator').find('.product').eq(2).contains('ADD TO CART').click().then(function () {
            console.log('okay')
            cy.log("@productLocator", cy.get('.product').first())
        })
        cy.get('@productLocator').find('.product').each(($e1, index, $list) => {

            if ($e1.find('h4.product-name').text().includes('Cashews')) {
                cy.wrap($e1).find('button').click()
            }
        })

        //assert if logo text is correctly displayed
        cy.get('.brand').should('have.text', 'GREENKART')

        //this is to print in logs
        cy.get('.brand').then(function (logoelement) {
            cy.log(logoelement.text())
        })




    })
})