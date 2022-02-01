/// <reference types="cypress" />
import HomePage from '../../../support/pageObjects/HomePage'
import ProductPage from '../../../support/pageObjects/ProductPage'
import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";

// npx cypress run --spec cypress\integration\examples\BDD\ecommerce.feature --headed --browser electron
// npx cypress-tags run -e TAGS="@Filling" --headed --browser electron
const homePage = new HomePage()
const productPage = new ProductPage()
let name

Given('I open Ecommerce page', () => {
    cy.visit(Cypress.env('url'))
})

When('I add items to cart', function () {
    homePage.getShopTab().click()
    this.data.productName.forEach(function (element) {
        cy.selectProduct(element)
    })

    productPage.CheckOutButton().click()
})

And('validate the total price', () => {
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
})

Then('select the country, submit and verfy thank you message', () => {
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

When('I fill the form details', function (dataTable) {
    name = dataTable.rawTable[1][0]
    homePage.getNameBox().type(dataTable.rawTable[1][0])
    homePage.getGender().select(dataTable.rawTable[1][1])
})

Then('validate the forms behaviour', function () {
    homePage.getTwoWayDataBinding().should('have.value', name)
    homePage.getNameBox().should('have.attr', 'minlength', '2')
    homePage.getEntrepreneaur().should('be.disabled')
})

And('select the shop page', function () {
    homePage.getShopTab().click()
})