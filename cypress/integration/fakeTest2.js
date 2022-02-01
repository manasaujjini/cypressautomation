/// <reference types="cypress" />
describe("My first test", function () {
    it("My first test", function () {

        cy.visit('https://rahulshettyacademy.com/angularAppdemo/')

        cy.intercept('GET', 'https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=shetty',
            (req) => {
                req.url = "https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=malhotra"
                req.continue((res) => {
                    expect(req.statusCode).to.equal(403)
                })
            }).as('mockUrl')
        cy.get('button[class="btn btn-primary"]').click()
        cy.wait('@mockUrl')

    })
})