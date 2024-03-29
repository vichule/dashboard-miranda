describe('Login and form user to create new user', () => {
  it('Correct login', () => {
    cy.visit('/')
    cy.url().should('include', '/login')
    cy.get('input[name=username]').type('admin@admin.co')
    cy.get('input[name=password]').type('adminadmin')
    cy.wait(1000)
    cy.contains('Log In').click()
    cy.wait(2000)
    cy.url().should('include', '/')
  })

  it('Navigates to users and opens new user form ', () => {
    cy.contains('Users').click()
    cy.wait(1000)
    cy.url().should('include', '/users')
    cy.contains('+').click()
    cy.wait(1000)
    cy.url().should('include', '/users/newuser')
  })

  it('Fill all inputs and create new user ', () => {
    cy.get('input[name=first_name]').type('user')
    cy.wait(1000)
    cy.get('input[name=last_name]').type('new')
    cy.wait(1000)
    cy.get('select#job').select('Manager')
    cy.wait(1000)
    cy.get('input[name=email]').type('user@user.com')
    cy.wait(1000)
    cy.get('input[name=phone]').type('6666666666')
    cy.wait(1000)
    cy.get('input[name="start_date"]').click().type('2024-10-02')
    cy.wait(1000)
    cy.get('textarea').type('This is a new user created by cypress')
    cy.get('select#status').select('Active')
    cy.wait(1000)
    cy.contains('Create User').click().then(() =>{
      cy.window()
        .its('store')
        .invoke('getState')
        .its('users')
        .its('data')
        .should('have.length',31)
    })

    cy.wait(2000)
    cy.url().should('include', '/users')
  });
})