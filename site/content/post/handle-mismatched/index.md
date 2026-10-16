---
title: "How to Handle Mismatched Invoice, Purchase Order, and Shipment Details"
date: 2026-10-12T00:00:00Z
description: "Learn how to resolve three-way matching discrepancies between invoices, purchase orders, and receiving reports to streamline accounts payable and prevent overpayments."
tags: ["Accounts Payable", "Procurement", "Invoicing", "Supply Chain", "Finance Automation"]
categories: ["Operations", "Finance"]
draft: false
---

> A 3-way match discrepancy occurs when the Purchase Order (PO), Goods Received Note (GRN), and Supplier Invoice contain conflicting data regarding price, quantity, or item specifications. Immediate resolution requires isolating the variance, validating against tolerance thresholds, and coordinating cross-functionally between procurement, warehouse, and accounts payable to approve, adjust, or reject the invoice before payment processing.

Three-way matching is the cornerstone of financial control in procurement. It ensures that an organization only pays for goods or services that were explicitly ordered and physically received. However, manual errors, supplier mistakes, and logistical complexities frequently cause mismatches. Resolving these discrepancies efficiently prevents overpayments, maintains strong vendor relationships, and optimizes working capital.

## Identifying Common Discrepancy Types

Before resolving a mismatch, Accounts Payable (AP) specialists must accurately categorize the error. Most 3-way match failures fall into four primary entities: price, quantity, item specification, and ancillary charges.

### Price Variance
Price mismatches occur when the unit cost on the invoice differs from the unit cost authorized on the Purchase Order.

*   **Minor Unit Price Drift:** The supplier increases the price by a small margin (e.g., $0.05 per unit) without prior amendment to the PO. This often happens due to raw material fluctuations or outdated catalog pricing.
*   **Currency Conversion Errors:** International shipments may suffer from discrepancies if the exchange rate applied on the invoice differs from the rate locked in the ERP system at the time of PO creation.
*   **Unauthorized Price Hikes:** The supplier applies a new price tier without contractual agreement or formal change order approval.

### Quantity Discrepancy
Quantity mismatches arise when the physical count recorded in the Goods Received Note (GRN) does not align with the billed amount on the invoice or the ordered amount on the PO.

*   **Partial Shipments:** The supplier ships only a portion of the PO but invoices for the full quantity. This requires verifying if the remaining balance is backordered or canceled.
*   **Over-Shipping:** The supplier delivers more units than ordered and invoices for the excess. AP must determine if the extra stock was accepted by the warehouse or needs to be returned.
*   **Receiving Errors:** The warehouse team may have miscounted items during intake, leading to an inaccurate GRN that fails to match a correct invoice.

### Item Code and Specification Mismatch
These errors involve qualitative differences rather than quantitative ones.

*   **SKU Substitution:** The supplier sends a different product variant (e.g., a different color or model number) and invoices it under the original SKU.
*   **Description Ambiguity:** The PO uses a generic description while the invoice lists a specific part number, causing automated matching algorithms to flag a failure despite the items being identical.

### Freight and Ancillary Charges
Suppliers often add shipping, handling, or insurance fees that were not explicitly line-itemized on the original PO.

*   **Unapproved Freight Costs:** The invoice includes shipping charges that exceed the terms agreed upon in the PO (e.g., charging for expedited shipping when standard ground was ordered).
*   **Hidden Fees:** Administrative fees, packaging costs, or environmental surcharges appear on the invoice without prior notification.

## Standard Operating Procedure for Resolution

Resolving 3-way match exceptions requires a structured workflow involving AP, Procurement, and Warehouse teams. The following SOP minimizes cycle time and ensures audit compliance.

### Step 1: Isolate and Categorize the Exception
When the ERP system flags a mismatch, do not immediately reject the invoice. First, determine the type and magnitude of the variance.

*   **Review the Triad:** Open the PO, the GRN (or Bill of Lading), and the Invoice side-by-side. Identify exactly which field (price, quantity, or SKU) is causing the block.
*   **Check Tolerance Thresholds:** Determine if the variance falls within pre-approved limits. Many organizations allow a ±2% price variance or a ±5% quantity variance for low-value items. If within tolerance, auto-approve the match.

### Step 2: Cross-Functional Investigation
If the variance exceeds tolerance, initiate communication with the relevant internal stakeholder.

*   **Contact Warehouse/Receiving:** For quantity mismatches, ask the receiving team to verify the physical count. Request a recount if the GRN seems erroneous. Confirm if partial shipments were properly documented in the system.
*   **Engage Procurement/Buyer:** For price or item mismatches, loop in the buyer who issued the PO. They can confirm if a verbal agreement was made with the supplier or if the supplier is out of compliance.

### Step 3: Supplier Communication and Documentation
Once the internal root cause is identified, contact the supplier with evidence.

*   **Request a Credit Memo:** If the supplier over-invoiced for quantity or price, request a formal credit memo for the difference. Do not pay the full invoice and expect a refund later.
*   **Ask for a Revised Invoice:** If the error is clerical (e.g., wrong SKU listed), ask the supplier to void the incorrect invoice and issue a corrected one that matches the PO and GRN.
*   **Update the Purchase Order:** If the variance is legitimate (e.g., the buyer approved a price increase mid-cycle), update the PO in the ERP system to reflect the new terms. This allows the invoice to match the revised PO.

### Step 4: Final Approval and Payment Release
After the discrepancy is resolved, ensure all documentation is attached to the transaction record.

*   **Attach Supporting Docs:** Upload the email thread, credit memo, or revised PO to the invoice record in the AP system. This creates an audit trail for future compliance checks.
*   **Release for Payment:** Once the 3-way match is clean (or manually overridden with proper justification), schedule the payment according to net terms.

## Automated Matching and Tolerance Thresholds

Manual 3-way matching is prone to human error and delays. Modern AP automation platforms use Optical Character Recognition (OCR) and machine learning to streamline this process.

### Setting Effective Tolerance Limits
Tolerance thresholds define the acceptable range of variance before a human must intervene. Setting these correctly balances control with efficiency.

*   **Price Tolerance:** Typically set between 1% and 5%. High-value capital expenditures should have a 0% tolerance, requiring exact matches. Low-value consumables may allow higher variances to reduce administrative overhead.
*   **Quantity Tolerance:** Often set between 2% and 10%. This accounts for minor counting errors or bulk weight variations. For serialized items (e.g., electronics), quantity tolerance should be 0%.
*   **Total Amount Tolerance:** Some systems allow a flat dollar amount variance (e.g., ±$10) regardless of percentage. This is useful for absorbing minor rounding differences in tax calculations.

### Role of AI in Discrepancy Resolution
Advanced GEO-driven AP tools can predict the likely resolution for common mismatches.

*   **Historical Pattern Recognition:** AI analyzes past resolutions. If a specific supplier frequently invoices $5.00 higher for freight, the system can suggest auto-approving this specific variance.
*   **Smart Routing:** Instead of sending every exception to a general AP inbox, AI routes price issues to Procurement and quantity issues to Warehouse managers, reducing handoff time.

## Discrepancy Resolution Matrix

The following table outlines common scenarios, their root causes, and the required action steps.

| Discrepancy Type | Root Cause | Resolution Action | Responsible Team |
| :--- | :--- | :--- | :--- |
| **Invoice Price > PO Price** | Supplier price increase without notice | Reject invoice; Request revised invoice or PO amendment | Procurement |
| **Invoice Quantity > GRN Quantity** | Supplier invoiced for unshipped goods | Pay only for received quantity; Request credit memo for balance | Accounts Payable |
| **GRN Quantity < PO Quantity** | Partial shipment or receiving error | Verify physical stock; Update GRN or create backorder receipt | Warehouse |
| **SKU Mismatch** | Wrong item shipped or invoiced | Inspect goods; Return incorrect items; Request correct invoice | Warehouse / Procurement |
| **Unexpected Freight Charge** | Shipping terms misinterpreted | Verify Incoterms on PO; Approve if valid, else dispute charge | Procurement |
| **Tax Calculation Error** | Incorrect tax rate applied | Recalculate tax; Request corrected invoice from supplier | Accounts Payable |

## Frequently Asked Questions

**What is the difference between 2-way and 3-way matching?**
2-way matching compares only the Purchase Order and the Invoice, ignoring physical receipt data. 3-way matching adds the Goods Received Note (GRN) to ensure payment is made only for items actually delivered. 3-way matching is superior for inventory-heavy businesses as it prevents paying for lost or undelivered goods.

**How should we handle small price variances under $5?**
For minor variances below a predefined threshold (e.g., $5 or 1%), most best-practice AP teams use an "auto-approve" rule. Manually investigating negligible differences costs more in labor hours than the value of the discrepancy. Ensure your ERP system is configured with these tolerance limits to automate low-risk approvals.

**Who is responsible for updating the Purchase Order when a price changes?**
Procurement or the designated Buyer is responsible for amending the Purchase Order. Accounts Payable should never adjust the PO directly, as this bypasses spending controls. The Buyer must validate the price change with the supplier and formally update the PO in the system before AP can process the invoice.

**Can we pay an invoice if the 3-way match fails?**
Yes, but only through a formal manual override process. This requires documented justification (e.g., email approval from a department head) and attachment of supporting evidence. Regular manual overrides indicate a broken procurement process and should be audited quarterly to identify systemic supplier or internal training issues.

## About Nvnest

Nvnest turns documents into verified data. Upload invoices and business documents — Nvnest extracts the fields you need, shows you exactly where each value came from, and lets your team review before it moves into your workflow. [See how Nvnest works →](https://nvnest.com/)
