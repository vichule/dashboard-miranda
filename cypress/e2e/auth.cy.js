describe('template spec', () => {

  it('Login navegation simulation', () => {
    cy.visit('/')
    cy.url().should('include', '/login')
    cy.get('input[name=username]').type('admin@admin.co')
    cy.get('input[name=password]').type('adminadmin')
    cy.wait(1000)
    cy.contains('Log In').click()
    cy.wait(2000)
    cy.contains('Bookings').click()
    cy.wait(1000)
    cy.contains('Rooms').click()
    cy.wait(1000)
    cy.contains('Contact').click()
    cy.wait(1000)
    cy.contains('Users').click()
    cy.wait(1000)
    cy.get('button[id=logout]').click()
    cy.url().should('include', '/login')
    cy.wait(2000)
    cy.visit('/bookings')
    cy.url().should('include', '/login')
    cy.wait(1000)
    cy.get('input[name=username]').type('admin@admin.co')
    cy.get('input[name=password]').type('adminnimda')
    cy.wait(1000)
    cy.contains('Log In').click()
    cy.url().should('include', '/login')

  })


})