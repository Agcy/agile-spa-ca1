Cypress.Commands.add('goToActorPage', (actorId) => {
    cy.visit(`/actors/${actorId}`)
})
