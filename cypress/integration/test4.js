/// <reference types="cypress" />
describe("My first test", function () {
    it("My first test", function () {
        cy.visit("https://rahulshettyacademy.com/AutomationPractice/")
        cy.get('#alertbtn').click()
        cy.get('#confirmbtn').click()
        // window alert 
        cy.on('window:alert', (str) => {
            //mocha
            expect(str).to.equal('Hello , share this practice page and share your knowledge')
        })
        cy.on('window:confirm', (str) => {
            //mocha
            expect(str).to.equal('Hello , Are you sure you want to confirm?')
        })
        cy.get('#opentab').invoke('removeAttr', 'target').click()

        // asertion for browser navigation
        cy.url().should('include', 'rahulshettyacademy')
        cy.go('back')


    })
})