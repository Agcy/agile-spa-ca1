let movies;
let movieId; // Enola Holmes movie id
let actors;

describe("Navigation", () => {
    before(() => {
        cy.request(
            `https://api.themoviedb.org/3/discover/movie?api_key=${Cypress.env(
                "TMDB_KEY"
            )}&language=en-US&include_adult=false&include_video=false&page=1`
        )
            .its("body")
            .then((response) => {
                movies = response.results;
            });
        cy.request(
            `https://api.themoviedb.org/3/person/popular?api_key=${Cypress.env(
                "TMDB_KEY"
            )}&language=en-US&include_adult=false&include_video=false&page=1`
        )
            .its("body") // Take the body of HTTP response from TMDB
            .then((response) => {
                actors = response.results;
            });
    });
    beforeEach(() => {
        cy.visit("/");
    });
    describe("From the home page to a movie's details", () => {
        it("navigates to the movie details page and change browser URL", () => {
            cy.get(".MuiCardActions-root").eq(0).contains("More Info").click();
            cy.url().should("include", `/movies/${movies[0].id}`);
        });
    });
    describe("Using the site header", () => {
        describe("when the viewport is desktop scale", () => {
            it("navigate via the button links", () => {
                cy.get("button").contains("MY").click();
                cy.get('li')
                    .next()
                    .get('a[href="/movies/favorites"]')
                    .eq(0)
                    .click()
                cy.get(".MuiBackdrop-root").click("center")
                cy.url().should("include", `/favorites`);
                cy.get("button").contains("Home").click();
                cy.url().should("include", `/`);
            });
        });
        describe(
            "when the viewport is mobile scale",
            {
                viewportHeight: 896,
                viewportWidth: 414,
            },
            () => {
                it("navigate via the dropdown menu", () => {
                    cy.get("header").find("button").click();
                    cy.get("li").contains('Trending').click();
                    cy.url().should("include", `/trending`);
                    cy.get("li").contains('Home').click();
                    cy.url().should("include", `/`);
                });
            }
        );
    });
    describe("From the favourites page to a movie's details", () => {
        beforeEach(() => {
            // Select two favourites and navigate to Favourites page
            cy.get("button[aria-label='add to favorites']").eq(1).click();
            cy.get("button[aria-label='add to favorites']").eq(3).click();
            cy.get("button").contains("MY").click();
            cy.get('li')
                .next()
                .get('a[href="/movies/favorites"]')
                .eq(0)
                .click()
            cy.get(".MuiBackdrop-root").click("center")
        });
        it("navigates between the movies detail page and the Favorite page.", () => {
            cy.get(".MuiCardActions-root").eq(0).contains("More Info").click();

            cy.get("svg[data-testid='ArrowBackIcon'").click();
            cy.url().should("include", `/movies/favorite`);
            cy.get("svg[data-testid='ArrowForwardIcon'").click();
            cy.url().should("include", `/movies/${movies[1].id}`);
        });
    });
    describe("The forward/backward links", () => {
        beforeEach(() => {
            cy.get(".MuiCardActions-root").eq(0).contains("More Info").click();
        });
        it("navigates between the movies detail page and the Home page.", () => {
            cy.get("svg[data-testid='ArrowBackIcon'").click();
            cy.url().should("not.include", `/movies/${movies[0].id}`);
            cy.get("svg[data-testid='ArrowForwardIcon'").click();
            cy.url().should("include", `/movies/${movies[0].id}`);
        });
    });

    describe("To navigate all the pages", () => {
        it("Go to trending movie page", () => {
            cy.get("button").contains("Trending").click();
            cy.url().should("include", "/movies/trending");
            it("from trending to favorite page", () => {
                cy.get("button[aria-label='add to favorite']").eq(0).click();
                cy.get("button").contains("MY").click()
                cy.get('li')
                    .next()
                    .get('a[href="/movies/favorite"]')
                    .eq(0)
                    .click();
                cy.get(".MuiBackdrop-root").click("center")
                cy.get(".MuiCardHeader-content").should("have.length", 1);
            })
        });
        it("Go to upcoming movie page", () => {
            cy.get("button").contains("Upcoming").click();
            cy.url().should("include", "/movies/upcoming");
            it("from upcoming to marked page", () => {
                cy.get("button[aria-label='add previews']").eq(0).click();
                cy.get("button").contains("MY").click()
                cy.get('li')
                    .next()
                    .get('a[href="/movies/marked"]')
                    .eq(0)
                    .click();
                cy.get(".MuiBackdrop-root").click("center")
                cy.get(".MuiCardHeader-content").should("have.length", 1);

            })
        });
        it("Go to actor page and actor detail page", () => {
            cy.get("button").contains("Actor").click();
            cy.url().should("include", "/actor");
            cy.get("a>button").eq(0).contains("Detail").click();
            cy.url().should("include", `/actors/${actors[0].id}`)
            it("from actor to follow page", () => {
                cy.get("button[aria-label='add to follow']").eq(0).click();
                cy.get("button").contains("MY").click()
                cy.get('li')
                    .next()
                    .get('a[href="/movies/follow"]')
                    .eq(0)
                    .click();
                cy.get(".MuiBackdrop-root").click("center")
                cy.get(".MuiCardHeader-content").should("have.length", 1);
            })
        });
    })
});
