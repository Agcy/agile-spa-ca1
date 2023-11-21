let movies;
const movieId = 497582; // Enola Holmes movie id

describe("The favourites feature", () => {
    before(() => {
        cy.request(
            `https://api.themoviedb.org/3/trending/movie/week?api_key=${Cypress.env(
                "TMDB_KEY"
            )}&language=en-US&page=1`
        )
            .its("body")
            .then((response) => {
                movies = response.results;
            });
    });
    beforeEach(() => {
        cy.visit("/movies/trending");
    });

    describe("Selecting trending movies favourites", () => {
        it("selected trending movie card shows the red heart", () => {
            cy.get(".MuiCardHeader-root").eq(1).find("svg").should("not.exist");
            cy.get("button[aria-label='add to favorites']").eq(1).click();
            cy.get(".MuiCardHeader-root").eq(1).find("svg");
        });
    });

    describe("The favourites page", () => {
        beforeEach(() => {
            // Select two favourites and navigate to Favourites page
            cy.get("button[aria-label='add to favorites']").eq(1).click();
            cy.get("button[aria-label='add to favorites']").eq(3).click();
            cy.get("button").contains("MY").click()
            cy.get('li')
                .next()
                .get('a[href="/movies/favorites"]')
                .eq(0)
                .click()
        });
        it("only the tagged movies are listed", () => {
            cy.get(".MuiCardHeader-content").should("have.length", 2);
            cy.get(".MuiCardHeader-content")
                .eq(0)
                .find("p")
                .contains(movies[1].title);
            cy.get(".MuiCardHeader-content")
                .eq(1)
                .find("p")
                .contains(movies[3].title);
        });
        it("removes deleted movies from favorite page", () => {
            cy.get(".MuiBackdrop-root").click("center")
            cy.get(".MuiCardHeader-content").should("have.length", 2)
            cy.get("button[aria-label='remove from favorites']").eq(0).click();
            cy.get(".MuiCardHeader-content").should("have.length", 1)
            cy.get("button[aria-label='remove from favorites']").eq(0).click();
            cy.get(".MuiCardHeader-content").should("have.length", 0)
        });
    });
});
