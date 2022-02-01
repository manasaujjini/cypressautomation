/// <reference types="cypress" />
import HomePage from '../../support/pageObjects/HomePage'
import ProductPage from '../../support/pageObjects/ProductPage'
describe("My first test", function () {

    before(function () {
        //runs once before all tests in the block
        cy.fixture('example').then(function (data) {
            this.data = data

        })
    })
    it("My first test", function () {
        const homePage = new HomePage()
        const productPage = new ProductPage()
        cy.visit(Cypress.env('url'))
        homePage.getNameBox().type(this.data.name)
        homePage.getGender().select(this.data.gender)
        homePage.getTwoWayDataBinding().should('have.value', this.data.name)
        homePage.getNameBox().should('have.attr', 'minlength', '2')
        homePage.getEntrepreneaur().should('be.disabled')
        homePage.getShopTab().click()
        //cy.selectProduct('Blackberry')
        //cy.get('h4.card-title').each((e1, index, $list) => {
        //  if (e1.text().includes('Blackberry')) {
        //    cy.get('.btn.btn-info').eq(index).click()}})
        this.data.productName.forEach(function (element) {
            cy.selectProduct(element)
        })

        productPage.CheckOutButton().click()
        var sum = 0
        cy.get('tr td:nth-child(4) strong').each((element, index, $list) => {
            const text = element.text()
            var res = text.split(" ")
            res = res[1].trim()
            sum = Number(sum) + Number(res)
        }).then(function () {
            cy.log(sum)
        })
        cy.get('h3 strong').then(function (element) {
            const amount = element.text()
            var res = amount.split(" ")
            var total = res[1].trim()
            expect(Number(total)).to.equal(sum)
        })
        cy.get(':nth-child(4) > :nth-child(5) > .btn').click()
        cy.get('#country').type('india')
        cy.get('.suggestions > ul > li > a').click()
        cy.get('#checkbox2').click({ force: true })
        cy.contains('Purchase').click()
        //cy.get('.alert').should('have.text', 'Success! Thank you! Your order will be delivered in next few weeks :-).')
        cy.get('.alert').then(function (element) {
            const text = element.text()
            expect(text.includes('Success')).to.be.true

        })




    })
})