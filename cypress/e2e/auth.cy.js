describe('template spec', () => {

  it.only('Auth navegation simulation', () => {
    cy.visit('/')
    cy.url().should('include', '/login')
    cy.get('input[name=username]').type('admin@admin.co')
    cy.get('input[name=password]').type('adminadmin')
    cy.wait(1000)
    cy.contains('Log In').click()
    cy.wait(2000)

    cy.url().should('include', '/')
    cy.contains('Bookings').click()
    cy.url().should('include', '/bookings')
    cy.wait(1000)

    cy.contains('Rooms').click()
    cy.url().should('include', '/rooms')
    cy.wait(1000)

    cy.contains('Contact').click()
    cy.url().should('include', '/contact')
    cy.wait(1000)

    cy.contains('Users').click()
    cy.url().should('include', '/users')
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


