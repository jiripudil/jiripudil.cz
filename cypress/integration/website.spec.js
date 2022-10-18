describe('jiripudil.cz', () => {
	it('works', () => {
		cy.visit('http://localhost:8000');
		cy.contains('a', '@jiripudil');
		cy.contains('Hello, I am Jiří Pudil');

		cy.contains('a', 'Talks').click();
		cy.url().should('include', '/talks');
		cy.contains('h1', 'Talks');
		cy.contains('Naja: slow start');

		cy.contains('a', 'Blog').click();
		cy.url().should('include', '/blog');
		cy.contains('h1', 'Blog');

		cy.contains('Read more').click();
		cy.url().should('match', /\/blog\/[\w-]+/);
		cy.contains('Have you found a tpyo in the post?');

		cy.contains('a', 'About').click();
		cy.contains('a', 'voiced alveolar fricative trill');
	});
});
