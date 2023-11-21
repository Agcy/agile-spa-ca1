let movies;
const movieId = 497582; // Enola Holmes movie id

describe("The marked feature", () => {
    before(() => {
        cy.request(
            `https://api.themoviedb.org/3/movie/upcoming?api_key=${Cypress.env(
                "TMDB_KEY"
            )}&language=en-US&page=1`
        )
            .its("body")
            .then((response) => {
                movies = response.results;
            });
    });
    beforeEach(() => {
        cy.visit("/movies/upcoming");
    });

    describe("The favourites page", () => {
        beforeEach(() => {
            // Select two favourites and navigate to Favourites page
            cy.get("button[aria-label='add previews']").eq(1).click();
            cy.get("button[aria-label='add previews']").eq(3).click();
            cy.get("button").contains("MY").click()
            cy.get('li')
                .next()
                .get('a[href="/movies/marked"]')
                .eq(0)
                .click()
        });
        it("only the marked movies are listed", () => {
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
        it("removes deleted movies", () => {
            cy.get(".MuiBackdrop-root").click("center")
            cy.get(".MuiCardHeader-content").should("have.length", 2)
            cy.get("button[aria-label='remove from previews']").eq(0).click();
            cy.get(".MuiCardHeader-content").should("have.length", 1)
            cy.get("button[aria-label='remove from previews']").eq(0).click();
            cy.get(".MuiCardHeader-content").should("have.length", 0)
        });
    });
});
