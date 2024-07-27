describe('Filter Functional Test', () => {
    before(() => {
      cy.login(Cypress.env('email'), Cypress.env('password'));
    });
  
    beforeEach(() => {
      cy.visit('/fleet/trucks');
    });
  
    it('Filter by status works correctly', () => {
      cy.intercept('GET', '/api/v1/trucks?number=Truck1&page=1&page_size=10&archived=false').as('getTrucks');
      cy.wait('@getTrucks').its('response.statusCode').should('eq', 200);
  

      cy.get('.status-filter').select('Active');
  
      cy.intercept('GET', '/api/v1/trucks?number=Truck1&page=1&page_size=10&archived=false').as('getActiveTrucks');
      cy.wait('@getActiveTrucks').then((interception) => {
        const activeTrucks = interception.response.body.data;
  

        activeTrucks.forEach((truck, index) => {
          cy.get(`.v-data-table__wrapper .v-data-table__tbody tr:nth-child(${index + 1})`)
            .within(() => {
              cy.get('.status-column').should('contain', 'Active');
            });
        });
      });
    });
  });