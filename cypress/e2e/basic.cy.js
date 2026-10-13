describe("home page", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("opens the index page with the blog roll", () => {
    // Paper renders the home page as a blog roll of the site's posts
    cy.get("main h2").should("have.length", 2);
    cy.contains(
      "How Freight Forwarders Can Automate Bill of Lading Data Extraction for 99% Accuracy"
    );
    cy.contains(
      "How to Handle Mismatched Invoice, Purchase Order, and Shipment Details"
    );
  });

  it("links to each post", () => {
    cy.get('a[href="/post/automate-bill-of-lading/"]').should("exist");
    cy.get('a[href="/post/handle-mismatched/"]').should("exist");
  });
});

describe("validate blog", () => {
  it("lists the published posts", () => {
    cy.visit("/post");
    cy.get("main h2").should("have.length", 2);
    cy.contains(
      "How Freight Forwarders Can Automate Bill of Lading Data Extraction for 99% Accuracy"
    );
    cy.contains(
      "How to Handle Mismatched Invoice, Purchase Order, and Shipment Details"
    );
  });
});
