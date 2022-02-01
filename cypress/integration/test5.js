/// <reference types="cypress" />
describe("My first test", function () {
    it("My first test", function () {
        cy.visit("https://rahulshettyacademy.com/AutomationPractice/")
        cy.get('tr td:nth-child(2)').each(($e1, index, $list) => {
            const text = $e1.text()
            if (text.includes('Python')) {
                cy.get('tr td:nth-child(2)').eq(index).next().then(function (number) {
                    const numberNum = number.text()
                    expect(numberNum).to.equal('25')
                })
            }

        })


    })
})