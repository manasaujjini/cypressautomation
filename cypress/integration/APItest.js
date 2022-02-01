/// <reference types="cypress" />
describe("My first test", function () {
    it("My first test", function () {

        cy.request('POST', 'http://216.10.245.166/Library/Addbook.php',
            {
                "name": "Learn Appium Automation with java",
                "isbn": "bcggss",
                "aisle": "22s7",
                "author": "Jhon foe"
            }).then(function (response) {
                expect(response.body).to.have.property('Msg', "successfully added")
                expect(response.status).to.eq(200)
            })

    })
})