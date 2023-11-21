let movies; // List of movies from TMDB
let movie; //
let actors;
let actor;
let credit

describe('movie detail test', () => {

    before(() => {
        // Get the discover movies from TMDB and store them locally.
        cy.request(
            `https://api.themoviedb.org/3/discover/movie/?api_key=${Cypress.env(
                "TMDB_KEY"
            )}&include_video=false&language=en-US&page=1&sort_by=popularity.desc`
        )
            .its("body") // Take the body of HTTP response from TMDB
            .then((response) => {
                movies = response.results;
            });

        cy.request(
            `https://api.themoviedb.org/3/person/popular?api_key=${Cypress.env(
                "TMDB_KEY"
            )}&language=en-US&page=1`
        ).its("body")
            .then((response) => {
                actors = response.results;
            })
    });
    beforeEach(() => {
        cy.visit("/actors");
    });

    describe("render into a actor detail page", () => {
        // navigate to movie detail page
        before(() => {
            cy.request(
                `https://api.themoviedb.org/3/person/${
                    actors[0].id
                }?api_key=${Cypress.env("TMDB_KEY")}`
            )
                .its("body")
                .then((actorDetails) => {
                    actor = actorDetails;
                });

            cy.request(
                `https://api.themoviedb.org/3/person/${
                    actors[0].id
                }/movie_credits?api_key=${Cypress.env("TMDB_KEY")}`
            )
                .its("body")
                .then((actorCredits) => {
                    credit = actorCredits.cast
                })
        });
        beforeEach(() => {
            cy.visit(`/actors/${actors[0].id}`);
        });

        describe("redirect to the movie", () => {
            before(() => {
                cy.request(
                    `https://api.themoviedb.org/3/movie/${credit[0].id}?api_key=${Cypress.env(
                        "TMDB_KEY"
                    )}&language=en-US&page=1`
                ).its("body")
                    .then((actorDetails) => {
                        movie = actorDetails;
                    })
            })
            it(" displays the actor name, biography ", () => {
                cy.get("h3").contains(actor.name);
                cy.get("h3").contains("Biography");
                cy.get("h3").next().contains(actor.biography);
            });
            it(" displays the movie list which the actor be a role in this movie", () => {
                cy.goToMoviePage(movie.id)
                cy.get("h3").eq(0).contains(movie.title);
                cy.get("h3").eq(1).contains("Overview");
                cy.get("h3").eq(1).next('p').contains(movie.overview.substring(0,100));
            })
        })

    })
})
