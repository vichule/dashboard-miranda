describe('Login w/ site navigation and logout', () => {

  it('Login simulation', () => {
    cy.visit('/')
    cy.url().should('include', '/login')
    cy.get('input[name=username]').type('admin@admin.co')
    cy.get('input[name=password]').type('adminadmin')
    cy.wait(1000)
    cy.contains('Log In').click()
    cy.wait(2000)
    cy.url().should('include', '/')
  })

  it('Navigates to bookings ', () => {
    cy.contains('Bookings').click()
    cy.url().should('include', '/bookings')
    cy.wait(1000)
  })

  it('Navigates to rooms ', () => {
    cy.contains('Rooms').click()
    cy.url().should('include', '/rooms')
    cy.wait(1000)
  })

  it('Navigates to contact ', () => {
    cy.contains('Contact').click()
    cy.url().should('include', '/contact')
    cy.wait(1000)
  })

  it('Navigates to users ', () => {
    cy.contains('Users').click()
    cy.url().should('include', '/users')
    cy.wait(1000)
  })

  it('Logout simulation and send to /login ', () => {
    cy.get('button[id=logout]').click()
    cy.url().should('include', '/login')
    cy.wait(2000)

    cy.visit('/bookings')
    cy.url().should('include', '/login')
    cy.wait(1000)
  })

  it('Login simulation with wrong credentials and send to /login ', () => {  
    cy.get('input[name=username]').type('admin@admin.co')
    cy.get('input[name=password]').type('adminnimda')
    cy.wait(1000)
    cy.contains('Log In').click()
    cy.url().should('include', '/login')
  })
  
})


