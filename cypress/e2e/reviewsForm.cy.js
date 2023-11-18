let movies; // List of movies from TMDB
let movie; //

// 评论测试
// 测试添加到favorites并评论功能 add to favorite and submit review
describe('review test', () => {

    before(() => {
        // Get the discover movies from TMDB and store them locally.
        cy.request(
            `https://api.themoviedb.org/3/discover/movie?api_key=${Cypress.env(
                "TMDB_KEY"
            )}&language=en-US&include_adult=false&include_video=false&page=1`
        )
            .its("body") // Take the body of HTTP response from TMDB
            .then((response) => {
                movies = response.results;
            });
    });
    beforeEach(() => {
        cy.visit("/");
    });

    describe("Selecting favourite movie", () => {
        it("selected movie card shows the red heart", () => {
            cy.get(".MuiCardHeader-root").eq(1).find("svg").should("not.exist");
            cy.get("button[aria-label='add to favorites']").eq(1).click();
            cy.get(".MuiCardHeader-root").eq(1).find("svg");
        });
    });

    describe("The review page", () => {
        beforeEach(() => {
            // Select two favourites and navigate to Favourites page
            cy.get("button[aria-label='add to favorites']").eq(1).click();
            cy.get("button[aria-label='add to favorites']").eq(3).click();
            cy.get("button").contains("Favorites").click();

            // 用垃圾桶（remove）图标定位review
            cy.get('button[aria-label="remove from favorites"]')
                .next()
                .get('a[href="/reviews/form"]')
                .eq(0)
                .click()

        });

        // passability test
        describe("review page passability test", () => {
            it('allows user to input then reset the review', () => {
                // 填写名字和评论内容
                cy.get('input[name="author"]').type('hpl');
                cy.get('textarea[name="review"]').type('my all time favourite movie !!!!!!!!!');
                cy.get("li").eq(0).click(); // 选择第一个5分

                // 点击重置按钮
                cy.get('button[type="reset"]').click();

                // 验证表单是否被重置
                cy.get('input[name="author"]').should('have.value', '');
                cy.get('textarea[name="review"]').should('have.value', '');
                cy.get('#select-rating').contains('Average'); // 替换为默认评分值
            });

            it('allows user to submit a review', () => {
                // 填写评论者的名字和评论内容
                cy.get('input[name="author"]').type('jhc');
                cy.get('textarea[name="review"]').type('I dont like the movie in the genre');
                cy.get("li").eq(4).click(); // 给第五个1分

                // 提交表单
                cy.get('button[type="submit"]').click();

                // 验证评论是否成功发布
                cy.get('h4').contains('Thank you for submitting a review');
            });
        });


        // failure test
        describe("review page error test", () => {

            // submit directly
            it("submit the review form directly", () => {
                cy.get('button[type="submit"]').click();
                cy.get('p').contains("Name is required")
                cy.get('p').contains("Review cannot be empty.")
            })

            // submit only author name
            it("submit only with author name", () => {
                cy.get('input[name="author"]').type('hpl')
                cy.get('button[type="submit"]').click();
                cy.get('p').contains("Review cannot be empty.")
            })

            // submit with author name but review text is too short
            it("submit with author name and short review text", () => {
                cy.get('input[name="author"]').type('jhc')
                cy.get('textarea[name="review"]').type('nice')
                cy.get('button[type="submit"]').click();
                cy.get('p').contains("Review is too short")
            })
        })
    })
})

