let movies; // List of movies from TMDB
let movie; //

// 趋势trending电影页面测试
describe('trending test', () => {

    before(() => {
        // Get the discover movies from TMDB and store them locally.
        cy.request(
            `https://api.themoviedb.org/3/trending/movie/week?api_key=${Cypress.env(
                "TMDB_KEY"
            )}&language=en-US&include_adult=false&include_video=false&page=1`
        )
            .its("body") // Take the body of HTTP response from TMDB
            .then((response) => {
                movies = response.results;
            });
    });
    beforeEach(() => {
        cy.visit("/movies/trending");
    });

    // 测试页面是否成功加载
    describe("The Trending Movies page", () => {
        it('displays the page header and 20 movies', () => {
            cy.get("h3").contains("Trending Movies");
            cy.get(".MuiCardHeader-root").should("have.length", 20);
        });

        // 测试电影卡片显示是否正确
        it('movie cards should including title and poster', () => {
            cy.get(".MuiCardHeader-content").each(($card, index) => {
                cy.wrap($card).find("p").contains(movies[index].title);
            });
        });
    })

    // 测试trending电影详情
    describe("The Trending Movie Details page", () => {
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
        });
        beforeEach(() => {
            cy.visit(`/movies/${movies[0].id}`);
        });
        it(" displays the movie title, overview and genres and ", () => {
            cy.get("h3").contains(movie.title);
            cy.get("h3").contains("Overview");
            cy.get("h3").next().contains(movie.overview);
            cy.get("p")
                .next()
                .within(() => {
                    const genreChips = movie.genres.map((g) => g.name);
                    genreChips.unshift("Genres");
                    cy.get("span").each(($card, index) => {
                        cy.wrap($card).contains(genreChips[index]);
                    });
                });
        });
    });

});

