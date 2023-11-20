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
        cy.visit("/");
    });

    describe("render into a movie detail page", () => {
        // navigate to movie detail page
        before(() => {
            cy.request(
                `https://api.themoviedb.org/3/movie/${
                    movies[0].id
                }?api_key=${Cypress.env("TMDB_KEY")}`
            )
                .its("body")
                .then((movieDetails) => {
                    movie = movieDetails;
                });

            cy.request(
                `https://api.themoviedb.org/3/movie/${
                    movies[0].id
                }/credits?api_key=${Cypress.env("TMDB_KEY")}`
            )
                .its("body")
                .then((movieCredits) => {
                    credit = movieCredits.cast
                })
        });
        beforeEach(() => {
            cy.visit(`/movies/${movies[0].id}`);
        });

        describe("redirect to the actor", () => {
            before(() => {
                cy.request(
                    `https://api.themoviedb.org/3/person/${credit[0].id}?api_key=${Cypress.env(
                        "TMDB_KEY"
                    )}&language=en-US&page=1`
                ).its("body")
                    .then((movieDetails) => {
                        actor = movieDetails;
                    })
            })
            it(" displays the movie title, overview and genres ", () => {
                cy.get("h3").contains(movie.title);
                cy.get("h3").contains("Overview");
                cy.get("h3").next().contains(movie.overview);
                // cy.get("p")
                //     .next()
                //     .within(() => {
                //         const genreChips = movie.genres.map((g) => g.name);
                //         genreChips.unshift("Genres");
                //         cy.get("span").each(($card, index) => {
                //             cy.wrap($card).contains(genreChips[index]);
                //         });
                //     });
            });
            it(" displays the actor list who be a role in this movie", () => {
                cy.goToActorPage(actor.id)
                cy.get("h3").eq(0).contains(actor.name);
                cy.get("h3").eq(1).contains("Biography");
                cy.get("h3").eq(1).next('p').contains(actor.biography.substring(0,100));
            })
        })

    })
})
