// Testing GET methods

describe('API GET requests', () => {
    it('GETs all products list', () => {
        cy.request('GET', 'https://automationexercise.com/api/productsList')
    })
})