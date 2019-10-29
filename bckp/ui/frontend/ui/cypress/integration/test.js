describe('URL test', function() {
  it('Visit Application page', function() {
    cy.visit('http://127.0.0.1:8080/#/')
  })
})

describe('Store select test', function() {
  it('select the listed options', function() {
   cy.visit('http://127.0.0.1:8080/#/');
   cy.get('select').select('DTV5 store').should('have.value', '8e1f466e-6d28-4369-b596-65b7167c4815')

 })
})

describe('Button test', function() {
  it('Click Go', function() {
    cy.visit('http://127.0.0.1:8080/#/');
    cy.contains('Go');
    cy.get('button').first().click();
  })
})

describe('Payment test', function() {
  it('Click Pay', function() {
    cy.visit('http://127.0.0.1:8080/#/pay');
    cy.contains('Pay');
    cy.get('input').type('150')
    cy.get('input').should('have.value', '150')
    cy.get('button').first().click();
  })
})

describe('Back-end API test', function() {
  it('Check API', function() {
   cy.request('POST', 'http://localhost:3000/api/pay', { storeid: '8e1f466e-6d28-4369-b596-65b7167c4815', amount: '150', username: '71297141' })
     .then((response) => {
         expect(response.status).to.eq(200)    
  })
 })
})


describe('Logout test', function() {
  it('Click logout', function() {
    cy.visit('http://127.0.0.1:8080/#/');
    cy.contains('logout');
    cy.get('button').last().click();
  })
})

describe('Logout test', function() {
  it('Click logout', function() {
    cy.visit('http://127.0.0.1:8080/#/pay');
    cy.contains('logout');
    cy.get('button').last().click();
  })
})

