/// <reference types="cypress" />
describe("My first test", function () {
    it("My first test", function () {

        cy.visit('https://rahulshettyacademy.com/angularAppdemo/')

        cy.intercept({
            method: 'GET',
            url: 'https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=shetty'
        },
            {
                statusCode: 200,
                body: [
                    {
                        "book_name": "RestAssured with Java",
                        "isbn": "RSU",
                        "aisle": "2301"
                    }
                ]
            }).as('retrive')
        cy.get('button[class="btn btn-primary"]').click()
        cy.wait('@retrive').should(({ request, response }) => {

            cy.get('tr').should('have.length', response.body.length + 1)
        })
        cy.get('p').should('have.text', 'Oops only 1 Book available')

        //length of the reponse aray = rows of the table 

    })
})