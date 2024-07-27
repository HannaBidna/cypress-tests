describe('Dims & Payload Validation', () => {
  before(() => {
    cy.login(Cypress.env('email'), Cypress.env('password'));
  });

  beforeEach(() => {
    cy.visit('/fleet/trucks');
  });

  it('Dims & payload data is displayed correctly', () => {
    cy.intercept('GET', '/api/v1/trucks?page=1&page_size=10&archived=false').as('getTrucks');
    cy.wait('@getTrucks').its('response.statusCode').should('eq', 200);
    cy.wait('@getTrucks').then((interception) => {
      const trucksData = interception.response.body.data;
      const items = response.items;


      cy.get('div[class=v-table__wrapper] tbody tr').each(($row, index) => {
        const item = items[index];
        if (item.trailer) {
          const trailer = item.trailer;
          cy.wrap($row).within(() => {
            cy.get('[data-qa=truck-trailer-dims]').should('contain.text', trailer.length.toString());
            cy.get('[data-qa=truck-trailer-dims]').should('contain.text', trailer.min_height.toString());
            cy.get('[data-qa=truck-trailer-dims]').should('contain.text', trailer.min_width.toString());
            cy.get('[data-qa=truck-trailer-dims]').siblings().should('contain.text', trailer.payload.toString() + ' lbs');
          });
        } else {
          cy.log(`Property with index ${index} is null.`);
        }
      });
    });
  });
})
