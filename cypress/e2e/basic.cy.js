describe("empty spec", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("opens the index page", () => {
    // Paper renders the home page as a blog roll with the site bio
    cy.contains("Great coffee with a conscience");
  });

  it("navigates to the product page", () => {
    cy.get('a[href="/products/"]').eq(0).click();
    cy.url().should("include", "/products");
    cy.get("h1").contains(/Our Coffee/i);
  });

  it("navigates to the values page", () => {
    cy.get('a[href="/values/"]').eq(0).click();
    cy.url().should("include", "/values");
    cy.get("h1").contains(/Values/i);
  });

  it("navigates to the contact page", () => {
    cy.get('a[href="/contact/"]').eq(0).click();
    cy.url().should("include", "/contact");
    cy.get("h1").contains(/Contact/i);
  });

  it("navigates to the blog page", () => {
    cy.get('a[href="/post/"]').eq(0).click();
    cy.url().should("include", "/post");
    cy.get("main h2").should("have.length", 3);
  });
});

describe("validate blog", () => {
  it("should have only 3 blog posts by default", () => {
    cy.visit("/post");
    cy.get("main h2").should("have.length", 3);
    cy.contains("A beginners’ guide to brewing with Chemex");
    cy.contains("Just in: small batch of Jamaican Blue Mountain in store next week");
    cy.contains("Making sense of the SCAA’s new Flavor Wheel");
  });
});
