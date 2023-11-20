let actors; // List of movies from TMDB
let actor; //

// 主页面测试
// 即将上映电影页面测试
describe('upcoming test', () => {

    before(() => {
        // Get the discover movies from TMDB and store them locally.
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
        cy.visit("/actor");
    });

    // 测试页面是否成功加载
    describe("The Actor page", () => {
        it('displays the page header and 20 people', () => {
            cy.get("h3").contains("Popular Actor");
            cy.get(".MuiCardHeader-root").should("have.length", 20);
        });

        // 测试演员卡片显示是否正确
        it('movie cards should including title and poster', () => {
            cy.get(".MuiCardHeader-content").each(($card, index) => {
                cy.wrap($card).find("p").contains(actors[index].name);
            });
        });
    });

})
