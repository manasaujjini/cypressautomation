Feature: End to end Ecommerce validation

    application Regression

    @Delivery
    Scenario: Ecommerce products delivery
        Given I open Ecommerce page
        When I add items to cart
        And validate the total price
        Then select the country, submit and verfy thank you message

    @Filling
    Scenario: Filing the form and go to shop page
        Given I open Ecommerce page
        When I fill the form details
            | name  | gender |
            | Sanju | Male   |
        Then validate the forms behaviour
        And select the shop page

