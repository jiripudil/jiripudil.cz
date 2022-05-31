describe('jiripudil.cz', () => {
	it('works', () => {
		cy.visit('http://localhost:8000');
		cy.contains('h2', 'whoami');

		cy.contains('a', 'Talks').click()
		cy.url().should('include', '/talks');
		cy.contains('I have given a number of talks at meetups and conferences');
		cy.contains('Naja: slow start');

		cy.contains('a', 'Blog').click();
		cy.url().should('include', '/blog');

		cy.contains('Read more').click();
		cy.url().should('match', /\/blog\/[\w-]+/);
		cy.contains(/This post took \d+/);

		cy.contains('a', 'About me').click();
		cy.contains('#php');
	});
});
