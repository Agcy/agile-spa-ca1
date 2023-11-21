let actors;
const actorId = 976; // Jason Statham actor id

describe("The following feature", () => {
    before(() => {
        cy.request(
            `https://api.themoviedb.org/3/person/popular?api_key=${Cypress.env(
                "TMDB_KEY"
            )}&language=en-US&page=1`
        )
            .its("body")
            .then((response) => {
                actors = response.results;
            });
    });
    beforeEach(() => {
        cy.visit("/actors");
    });

    describe("Selecting following", () => {
        it("selected actor card shows the red button and red avatar", () => {
            cy.get("button[aria-label='add to followed actors']>button").eq(3).contains("Follow");
            cy.get("button[aria-label='add to followed actors']").eq(3).click();
            cy.get("button[aria-label='add to followed actors']>button").eq(3).contains("Unfollow");
        });
    });

    describe("The following page", () => {
        beforeEach(() => {
            // Select two favourites and navigate to Favourites page
            cy.get("button[aria-label='add to followed actors']").eq(1).click();
            cy.get("button[aria-label='add to followed actors']").eq(4).click();
            cy.get("button").contains("MY").click()
            cy.get('li')
                .next()
                .get('a[href="/actors/followed"]')
                .eq(0)
                .click()
        });
        it("only the followed actors are listed", () => {
            cy.get(".MuiCardHeader-content").should("have.length", 2);
            cy.get(".MuiCardHeader-content")
                .eq(0)
                .find("p")
                .contains(actors[1].name);
            cy.get(".MuiCardHeader-content")
                .eq(1)
                .find("p")
                .contains(actors[4].name);
        });
        it("removes deleted actors", () => {
            cy.get(".MuiBackdrop-root").click("center")
            cy.get(".MuiCardHeader-content").should("have.length", 2)
            cy.get("button[aria-label='remove from following']").eq(0).click();
            cy.get(".MuiCardHeader-content").should("have.length", 1)
            cy.get("button[aria-label='remove from following']").eq(0).click();
            cy.get(".MuiCardHeader-content").should("have.length", 0)
        });
    });
});
