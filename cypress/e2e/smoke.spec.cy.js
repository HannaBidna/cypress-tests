describe('Smoke Tests for Trucks Page', () => {
    before(() => {
      cy.login(Cypress.env('email'), Cypress.env('password'));
    });
  
    beforeEach(() => {
      cy.visit('/fleet/trucks');
    });
  
    it('Page loads successfully', () => {
      cy.url().should('include', '/fleet/trucks');
    });
  
    it('Table and filters are displayed', () => {
      cy.get('div').contains('Trucks').should('be.visible');
      cy.get('button[id=create-truck-btn]').contains('Create new').should('be.visible')
      cy.get('form[role=presentation]').should('be.visible')
      cy.get('[data-qa=search-results]').contains(' results found')
      cy.get('table').should('exist').should('be.visible');
      cy.get('table').within(() => {
      cy.get('thead').should('be.visible');
      cy.get('tbody').should('be.visible');
      cy.get('tbody tr').should('have.length', 5)
      });
      
  
    it('Trucks data is fetched from backend', () => {
      cy.intercept('GET', '/api/v1/trucks?page=1&page_size=10&archived=false').as('getTrucks');
      cy.wait('@getTrucks').its('response.statusCode').should('eq', 200);
      cy.get('@getTrucks').then((interception) => {
        expect(interception.response.body).have.property('number');
        expect(interception.response.body).have.property('status');
        expect(interception.response.body).have.property('driver');
        expect(interception.response.body).have.property('trailer');
        expect(interception.response.body).have.property('available_location');
        expect(interception.response.body).have.property('current_location');
        
      });
    });
  })
})