describe('Calendar', () => {
    beforeEach(() => {
      cy.visit('/');
    });
  
    it('displays calendar days', () => {
      cy.get('.calendarDay').should('have.length', 30);
    });
  
    it('opens modal on image click', () => {
      cy.get('.calendarDay')
        .first()
        .click();
      cy.get('.modal').should('be.visible');
    });
  
    it('closes modal on close button click', () => {
      cy.get('.calendarDay')
        .first()
        .click();
      cy.get('.closeButton').click();
      cy.get('.modal').should('not.be.visible');
    });
  });
  