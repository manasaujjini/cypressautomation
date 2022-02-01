/// <reference types="cypress" />
describe("My first test", function () {
    it("My first test", function () {
        cy.visit("https://rahulshettyacademy.com/AutomationPractice/")
        cy.get('#opentab').then(function (el) {
            const url = el.prop('href')
            cy.log(url)
            cy.visit(url)
        })


    })
})