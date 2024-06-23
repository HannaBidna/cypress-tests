describe('The Internet Herokuapp Tests', () => {
    const baseUrl = Cypress.config('baseUrl');
  
    it('Add/Remove Elements', () => {
      cy.visit(`${baseUrl}/add_remove_elements/`);
      cy.get('button').contains('Add Element').click();
      cy.get('.added-manually').should('be.visible');
      cy.get('.added-manually').click();
      cy.get('.added-manually').should('not.exist');
      cy.get('button').contains('Add Element').click();
      cy.get('button').contains('Delete').click();
    });
  
    it('Checkboxes', () => {
      cy.visit(`${baseUrl}/checkboxes`);
      cy.get('input[type="checkbox"]').eq(0).should('not.be.checked');
      cy.get('input[type="checkbox"]').eq(0).check().should('be.checked');
      cy.get('input[type="checkbox"]').eq(1).should('be.checked');
      cy.get('input[type="checkbox"]').eq(1).uncheck().should('not.be.checked');
    });
  
    it('Dropdown', () => {
      cy.visit(`${baseUrl}/dropdown`);
      cy.get('#dropdown').select('Option 1').should('have.value', '1');
      cy.get('#dropdown').select('Option 2').should('have.value', '2');
    });
  
    it('Form Authentication', () => {
      cy.visit(`${baseUrl}/login`);
      cy.get('#username').type('tomsmith');
      cy.get('#password').type('SuperSecretPassword!');
      cy.get('button').contains('Login').click();
      cy.get('#flash').should('contain', 'You logged into a secure area!');
      cy.get('.button').contains('Logout').click();
      cy.get('#flash').should('contain', 'You logged out of the secure area!');
    });
  
    it('Horizontal Slider', () => {
      cy.visit(`${baseUrl}/horizontal_slider`);
      cy.get('input[type="range"]').invoke('val', 3).trigger('change');
      cy.get('#range').should('contain', '3');
    });
  
    it('Hovers', () => {
      cy.visit(`${baseUrl}/hovers`);
      cy.get('.figure').first().realHover();
      cy.get('.figure').first().find('.figcaption').should('be.visible').and('contain', 'name: user1');
    });
  
  
    it('Inputs', () => {
      cy.visit(`${baseUrl}/inputs`);
      cy.get('input').type('123').should('have.value', '123');
      cy.get('input').clear().type('-123').should('have.value', '-123');
    });
  });
