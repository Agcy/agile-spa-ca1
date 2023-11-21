Cypress.Commands.add('goToActorPage', (actorId) => {
    cy.visit(`/actors/${actorId}`)
})

Cypress.Commands.add('goToMoviePage', (movieId) => {
    cy.visit(`/movies/${movieId}`)
})
