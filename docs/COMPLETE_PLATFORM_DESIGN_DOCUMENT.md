# Complete Platform Design Document

## Comprehensive Reference Guide for All Implemented Models, Patterns & Features

**Version:** 2.0  
**Last Updated:** 2025  
**Purpose:** Exhaustive design specifications for the complete e-commerce platform covering 50+ models and 300+ UI patterns

---

## Table of Contents

### Part I: Commerce Business Models (20 Models)
1. [Direct-to-Consumer (DTC)](#1-direct-to-consumer-dtc)
2. [Subscription Commerce](#2-subscription-commerce)
3. [Marketplace](#3-marketplace)
4. [B2B (Business-to-Business)](#4-b2b-business-to-business)
5. [Wholesale](#5-wholesale)
6. [Dropshipping](#6-dropshipping)
7. [White Label / Private Label](#7-white-label--private-label)
8. [Print-on-Demand](#8-print-on-demand)
9. [Rental / Leasing](#9-rental--leasing)
10. [Recommerce / Resale (Trade-In)](#10-recommerce--resale-trade-in)
11. [Social Commerce](#11-social-commerce)
12. [Headless Commerce](#12-headless-commerce)
13. [Omnichannel Commerce](#13-omnichannel-commerce)
14. [Flash Sales / Daily Deals](#14-flash-sales--daily-deals)
15. [Freemium Commerce](#15-freemium-commerce)
16. [Bundling Commerce](#16-bundling-commerce)
17. [Affiliate Commerce](#17-affiliate-commerce)
18. [Crowdfunding / Pre-order](#18-crowdfunding--pre-order)
19. [Membership / VIP Commerce](#19-membership--vip-commerce)
20. [Hybrid Commerce Models](#20-hybrid-commerce-models)

### Part II: Alternative Commerce Models (10 Models)
21. [Try-Before-You-Buy (TBYB)](#21-try-before-you-buy-tbyb)
22. [Consignment](#22-consignment)
23. [Auctions](#23-auctions)
24. [Services & Bookings](#24-services--bookings)
25. [Digital Products & Downloads](#25-digital-products--downloads)
26. [Events & Ticketing](#26-events--ticketing)
27. [Gift Cards & Vouchers](#27-gift-cards--vouchers)
28. [Referral Commerce](#28-referral-commerce)
29. [Loyalty & Rewards](#29-loyalty--rewards)
30. [Multi-Tenant Platform](#30-multi-tenant-platform)

### Part III: Payment & Financial Models (8 Models)
31. [Digital Wallet](#31-digital-wallet)
32. [Buy Now Pay Later (BNPL)](#32-buy-now-pay-later-bnpl)
33. [Installment Plans](#33-installment-plans)
34. [Store Credits](#34-store-credits)
35. [Escrow Payments](#35-escrow-payments)
36. [Invoicing & Net Terms](#36-invoicing--net-terms)
37. [Disputes & Refunds](#37-disputes--refunds)
38. [Multi-Currency](#38-multi-currency)

### Part IV: Identity & Verification Models (5 Models)
39. [KYC (Know Your Customer)](#39-kyc-know-your-customer)
40. [Age Verification](#40-age-verification)
41. [Residency Verification](#41-residency-verification)
42. [Digital Identity Wallet](#42-digital-identity-wallet)
43. [Consent Management](#43-consent-management)

### Part V: Logistics & Delivery Models (6 Models)
44. [Standard Shipping](#44-standard-shipping)
45. [Same-Day / Express Delivery](#45-same-day--express-delivery)
46. [Store Pickup (BOPIS)](#46-store-pickup-bopis)
47. [Delivery Slots & Scheduling](#47-delivery-slots--scheduling)
48. [Real-Time Tracking](#48-real-time-tracking)
49. [Returns & Exchanges](#49-returns--exchanges)

### Part VI: Content & CMS Models (4 Models)
50. [Blog & Articles](#50-blog--articles)
51. [FAQ & Help Center](#51-faq--help-center)
52. [Points of Interest (POI)](#52-points-of-interest-poi)
53. [Dynamic CMS Pages](#53-dynamic-cms-pages)

### Part VII: UI Component Patterns (100+ Patterns)
- [Navigation Patterns](#navigation-patterns)
- [Product Display Patterns](#product-display-patterns)
- [Cart & Checkout Patterns](#cart--checkout-patterns)
- [Form Patterns](#form-patterns)
- [Interactive Patterns](#interactive-patterns)
- [Marketing Patterns](#marketing-patterns)
- [Trust & Social Proof Patterns](#trust--social-proof-patterns)
- [Loading & Error Patterns](#loading--error-patterns)

### Part VIII: Data Models & Architecture
- [Core Data Models](#core-data-models)
- [API Architecture](#api-architecture)
- [State Management](#state-management)
- [Caching Strategy](#caching-strategy)

---

# Part I: Commerce Business Models

---

## 1. Direct-to-Consumer (DTC)

### 1.1 Overview

**Definition:** A business model where brands manufacture and sell products directly to end consumers, bypassing traditional retail intermediaries like wholesalers, distributors, and retailers.

**Core Value Proposition:**
- Complete control over brand experience
- Direct customer relationships and data ownership
- Higher profit margins (40-60% vs 20-30% with retail)
- Faster feedback loops for product development

### 1.2 Business Model Canvas

```
+------------------+------------------+------------------+
|  Key Partners    |  Key Activities  | Value Proposition|
|------------------|------------------|------------------|
| - Manufacturers  | - Product dev    | - Authentic brand|
| - 3PL providers  | - Marketing      |   experience     |
| - Payment proc.  | - Customer svc   | - Quality control|
| - Tech providers | - Fulfillment    | - Fair pricing   |
+------------------+------------------+------------------+
|  Key Resources   |                  | Customer Rels    |
|------------------|                  |------------------|
| - Brand identity |                  | - Direct comms   |
| - Product catalog|                  | - Personalization|
| - Customer data  |                  | - Community      |
| - E-comm platform|                  | - Loyalty program|
+------------------+------------------+------------------+
|  Cost Structure                     | Revenue Streams  |
|-------------------------------------|------------------|
| - Manufacturing & inventory         | - Product sales  |
| - Marketing & customer acquisition  | - Upsells/cross  |
| - Technology & platform             | - Subscriptions  |
| - Fulfillment & shipping            | - Services       |
+-------------------------------------+------------------+
```

### 1.3 User Flows

#### Primary Purchase Flow
```
[Landing Page] -> [Browse/Search] -> [Product Detail] -> [Add to Cart]
       |                                                       |
       v                                                       v
[Category Page] <------------------------------------ [Cart Review]
                                                              |
                                                              v
                                                      [Checkout]
                                                              |
                                                              v
                                                    [Order Confirmation]
                                                              |
                                                              v
                                                    [Tracking & Delivery]
```

### 1.4 Technical Architecture

#### Data Models

```typescript
// Product Model
interface Product {
  id: string;
  title: string;
  handle: string;
  description: string;
  subtitle?: string;
  thumbnail?: string;
  images: ProductImage[];
  status: 'draft' | 'proposed' | 'published' | 'rejected';
  options: ProductOption[];
  variants: ProductVariant[];
  categories: ProductCategory[];
  collection_id?: string;
  type?: ProductType;
  tags: ProductTag[];
  metadata?: Record<string, any>;
  created_at: string;
  updated_at: string;
}

// Variant Model
interface ProductVariant {
  id: string;
  product_id: string;
  title: string;
  sku?: string;
  barcode?: string;
  ean?: string;
  upc?: string;
  inventory_quantity: number;
  allow_backorder: boolean;
  manage_inventory: boolean;
  hs_code?: string;
  origin_country?: string;
  mid_code?: string;
  material?: string;
  weight?: number;
  length?: number;
  height?: number;
  width?: number;
  options: ProductOptionValue[];
  prices: MoneyAmount[];
  calculated_price?: CalculatedPrice;
}

// Price Model
interface MoneyAmount {
  id: string;
  currency_code: string;
  amount: number; // In whole units (10 = $10.00)
  min_quantity?: number;
  max_quantity?: number;
  price_list_id?: string;
}

// Cart Model
interface Cart {
  id: string;
  region_id: string;
  customer_id?: string;
  email?: string;
  billing_address?: Address;
  shipping_address?: Address;
  items: LineItem[];
  shipping_methods: ShippingMethod[];
  payment_session?: PaymentSession;
  discounts: Discount[];
  subtotal: number;
  discount_total: number;
  shipping_total: number;
  tax_total: number;
  total: number;
}

// Order Model
interface Order {
  id: string;
  display_id: number;
  status: OrderStatus;
  fulfillment_status: FulfillmentStatus;
  payment_status: PaymentStatus;
  customer_id: string;
  email: string;
  billing_address: Address;
  shipping_address: Address;
  items: LineItem[];
  shipping_methods: ShippingMethod[];
  payments: Payment[];
  subtotal: number;
  discount_total: number;
  shipping_total: number;
  tax_total: number;
  total: number;
  created_at: string;
}

// Customer Model
interface Customer {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
  has_account: boolean;
  addresses: Address[];
  orders: Order[];
  metadata?: Record<string, any>;
  created_at: string;
}
```

### 1.5 Implementation Components

#### Routes
- `/` - Homepage
- `/store` - Product catalog
- `/products/$handle` - Product detail page
- `/cart` - Shopping cart
- `/checkout` - Checkout flow
- `/order/$orderId/confirmed` - Order confirmation
- `/account/orders` - Order history

#### Key Components
- `ProductCard` - Product display card
- `ProductActions` - Add to cart/wishlist
- `ProductOptionSelect` - Variant selector
- `Cart` - Cart drawer/panel
- `CheckoutProgress` - Step indicator
- `AddressForm` - Address input

### 1.6 Metrics & KPIs

| Metric | Target | Measurement |
|--------|--------|-------------|
| Conversion Rate | 2-4% | Orders / Visitors |
| AOV (Average Order Value) | $50-150 | Revenue / Orders |
| CAC (Customer Acquisition Cost) | < $30 | Marketing Spend / New Customers |
| LTV (Lifetime Value) | 3x CAC | Total Revenue / Customers |
| Cart Abandonment | < 70% | Abandoned / Started Checkouts |
| Return Rate | < 10% | Returns / Orders |

---

## 2. Subscription Commerce

### 2.1 Overview

**Definition:** Customers pay recurring fees (weekly, monthly, annually) for products or services delivered on a regular schedule.

**Types:**
- **Replenishment:** Auto-ship consumables (razors, vitamins, pet food)
- **Curation:** Curated boxes of products (Birchbox, Stitch Fix)
- **Access:** Membership for exclusive products/pricing

### 2.2 Business Model Canvas

```
+------------------+------------------+------------------+
|  Key Partners    |  Key Activities  | Value Proposition|
|------------------|------------------|------------------|
| - Product        | - Curation       | - Convenience    |
|   suppliers      | - Fulfillment    | - Discovery      |
| - Payment        | - Retention      | - Savings        |
|   processors     | - Personalization| - Exclusive      |
| - Logistics      | - Churn mgmt     |   access         |
+------------------+------------------+------------------+
|  Cost Structure                     | Revenue Streams  |
|-------------------------------------|------------------|
| - Product/inventory costs           | - Monthly fees   |
| - Shipping & packaging              | - Annual plans   |
| - Customer acquisition              | - Add-ons        |
| - Tech platform                     | - Upgrades       |
+-------------------------------------+------------------+
```

### 2.3 User Flows

#### Subscription Signup Flow
```
[Browse Plans] -> [Select Plan] -> [Choose Frequency] -> [Customize]
                                                              |
                                                              v
                                                      [Payment Setup]
                                                              |
                                                              v
                                                    [Confirmation]
                                                              |
                                                              v
                                                    [First Delivery]
```

#### Subscription Management Flow
```
[My Subscriptions] -> [View Details] -> [Actions Menu]
                                              |
                    +------------+------------+------------+
                    v            v            v            v
                [Skip]      [Pause]     [Upgrade]    [Cancel]
                    |            |            |            |
                    v            v            v            v
              [Confirm]   [Set Duration] [Select Plan] [Retention]
```

### 2.4 Data Models

```typescript
// Subscription Plan Model
interface SubscriptionPlan {
  id: string;
  name: string;
  description: string;
  features: string[];
  billing_interval: 'weekly' | 'monthly' | 'quarterly' | 'yearly';
  price: number;
  currency_code: string;
  trial_days?: number;
  setup_fee?: number;
  is_popular?: boolean;
  metadata?: Record<string, any>;
}

// Active Subscription Model
interface Subscription {
  id: string;
  customer_id: string;
  plan_id: string;
  plan: SubscriptionPlan;
  status: 'active' | 'paused' | 'cancelled' | 'past_due' | 'trialing';
  current_period_start: string;
  current_period_end: string;
  next_billing_date: string;
  cancel_at_period_end: boolean;
  cancelled_at?: string;
  pause_start?: string;
  pause_end?: string;
  payment_method_id?: string;
  created_at: string;
}

// Subscription Event Model
interface SubscriptionEvent {
  id: string;
  subscription_id: string;
  type: 'created' | 'renewed' | 'paused' | 'resumed' | 'cancelled' | 'upgraded' | 'downgraded';
  data?: Record<string, any>;
  created_at: string;
}
```

### 2.5 Implementation Components

#### Routes
- `/subscriptions` - Browse subscription plans
- `/account/subscriptions` - Manage active subscriptions
- `/account/subscriptions/$id` - Subscription details

#### Key Components
- `SubscriptionPlanCard` - Plan offering display
- `PlanComparison` - Compare plans side by side
- `BillingCycleSelector` - Monthly/annual toggle
- `SubscriptionStatus` - Active subscription info
- `NextBillingCard` - Next billing date display
- `PauseSubscriptionModal` - Pause subscription
- `UpgradeDowngradeFlow` - Change subscription tier

### 2.6 Metrics & KPIs

| Metric | Target | Measurement |
|--------|--------|-------------|
| MRR (Monthly Recurring Revenue) | Growth 10%+ | Sum of monthly subscriptions |
| Churn Rate | < 5% monthly | Cancellations / Active Subs |
| LTV | $200+ | Avg Revenue per Customer |
| Activation Rate | > 80% | Active Users / Signups |
| Expansion Revenue | 20%+ of MRR | Upgrades - Downgrades |

---

## 3. Marketplace

### 3.1 Overview

**Definition:** Platform that connects multiple third-party sellers with buyers, facilitating transactions between them.

**Types:**
- **Horizontal:** Wide product range (Amazon, eBay)
- **Vertical:** Niche/specific category (Etsy, StockX)
- **Hybrid:** Own inventory + third-party sellers

### 3.2 Data Models

```typescript
// Vendor Model
interface Vendor {
  id: string;
  name: string;
  handle: string;
  description: string;
  logo?: string;
  banner?: string;
  rating: number;
  review_count: number;
  verified: boolean;
  status: 'pending' | 'active' | 'suspended';
  commission_rate: number;
  payment_info?: PaymentInfo;
  contact: VendorContact;
  shipping_zones: ShippingZone[];
  created_at: string;
}

// Vendor Product Relationship
interface VendorProduct {
  id: string;
  vendor_id: string;
  product_id: string;
  vendor: Vendor;
  product: Product;
  vendor_sku?: string;
  vendor_price: number;
  stock_quantity: number;
  fulfillment_type: 'vendor' | 'platform';
}

// Vendor Review Model
interface VendorReview {
  id: string;
  vendor_id: string;
  customer_id: string;
  order_id: string;
  rating: number;
  title: string;
  content: string;
  response?: string;
  responded_at?: string;
  created_at: string;
}

// Payout Model
interface VendorPayout {
  id: string;
  vendor_id: string;
  amount: number;
  currency_code: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  orders: string[];
  commission_deducted: number;
  net_amount: number;
  payout_method: string;
  created_at: string;
  completed_at?: string;
}
```

### 3.3 Implementation Components

#### Routes
- `/vendors` - Vendor directory
- `/vendors/$handle` - Vendor profile
- `/vendors/$handle/products` - Vendor products
- `/vendors/$handle/reviews` - Vendor reviews

#### Key Components
- `VendorCard` - Vendor display card
- `VendorGrid` - Vendor listing grid
- `VendorHeader` - Vendor profile header
- `VendorFilters` - Filter vendors
- `VendorRating` - Rating display
- `VendorProducts` - Vendor product listing

---

## 4. B2B (Business-to-Business)

### 4.1 Overview

**Definition:** Companies selling products or services to other businesses rather than individual consumers.

**Key Characteristics:**
- Larger order values
- Longer sales cycles
- Custom pricing and negotiations
- Net payment terms (Net 30, Net 60)
- Account-based relationships
- Approval workflows

### 4.2 Data Models

```typescript
// Company Model
interface Company {
  id: string;
  name: string;
  legal_name: string;
  tax_id?: string;
  industry?: string;
  employee_count?: string;
  annual_revenue?: string;
  billing_address: Address;
  shipping_addresses: Address[];
  payment_terms: 'net_15' | 'net_30' | 'net_60' | 'net_90' | 'prepaid';
  credit_limit?: number;
  credit_available?: number;
  status: 'pending' | 'approved' | 'suspended';
  users: CompanyUser[];
  price_list_id?: string;
  created_at: string;
}

// Company User Model
interface CompanyUser {
  id: string;
  company_id: string;
  customer_id: string;
  role: 'admin' | 'buyer' | 'approver' | 'viewer';
  spending_limit?: number;
  can_approve_orders: boolean;
  requires_approval: boolean;
  approval_threshold?: number;
  email: string;
  name: string;
}

// Quote Model
interface Quote {
  id: string;
  company_id: string;
  requested_by: string;
  status: 'draft' | 'submitted' | 'under_review' | 'quoted' | 'accepted' | 'rejected' | 'expired';
  items: QuoteItem[];
  notes?: string;
  valid_until?: string;
  quoted_total?: number;
  discount_percentage?: number;
  created_at: string;
  quoted_at?: string;
}

// Quote Item Model
interface QuoteItem {
  id: string;
  quote_id: string;
  variant_id: string;
  product_title: string;
  variant_title: string;
  quantity: number;
  unit_price?: number;
  requested_price?: number;
}

// Purchase Order Model
interface PurchaseOrder {
  id: string;
  po_number: string;
  company_id: string;
  created_by: string;
  status: 'draft' | 'pending_approval' | 'approved' | 'rejected' | 'submitted' | 'fulfilled' | 'cancelled';
  items: PurchaseOrderItem[];
  shipping_address: Address;
  billing_address: Address;
  notes?: string;
  internal_notes?: string;
  subtotal: number;
  tax_total: number;
  shipping_total: number;
  total: number;
  approved_by?: string;
  approved_at?: string;
  created_at: string;
}

// Approval Request Model
interface ApprovalRequest {
  id: string;
  company_id: string;
  type: 'purchase_order' | 'quote' | 'user' | 'address';
  reference_id: string;
  requested_by: string;
  status: 'pending' | 'approved' | 'rejected';
  approvers: string[];
  approved_by?: string;
  rejected_by?: string;
  reason?: string;
  created_at: string;
  resolved_at?: string;
}
```

### 4.3 Implementation Components

#### Routes
- `/business` - B2B dashboard
- `/business/register` - Business registration
- `/business/dashboard` - Metrics & overview
- `/business/quotes` - Quote management
- `/business/approvals` - Approval workflows
- `/business/orders` - B2B orders
- `/business/invoices` - Invoice management
- `/business/team` - Team management

#### Key Components
- `CompanySelector` - Select operating company
- `QuoteRequestForm` - Request quote form
- `QuoteCard` - Quote display
- `PurchaseOrderForm` - PO creation
- `POLineItems` - PO line items
- `ApprovalCard` - Approval request display
- `ApprovalWorkflow` - Workflow visualization
- `TeamMemberTable` - Team listing
- `PaymentTermsBadge` - Payment terms badge
- `TaxExemptionBanner` - Tax exemption status
- `VolumePricingTable` - Volume discount tiers
- `BulkOrderForm` - Bulk order entry
- `BusinessSidebar` - B2B account navigation

---

## 5. Wholesale

### 5.1 Overview

**Definition:** Selling products in bulk quantities at discounted prices, typically to retailers or other businesses for resale.

**Key Features:**
- Minimum order quantities (MOQs)
- Tiered volume pricing
- Bulk discounts
- Separate wholesale portal

### 5.2 Data Models

```typescript
// Volume Pricing Model
interface VolumePricingTier {
  id: string;
  product_id?: string;
  category_id?: string;
  min_quantity: number;
  max_quantity?: number;
  discount_type: 'percentage' | 'fixed_amount' | 'fixed_price';
  discount_value: number;
  price_list_id?: string;
}

// MOQ Configuration
interface MOQConfig {
  product_id?: string;
  category_id?: string;
  global?: boolean;
  min_quantity: number;
  increment?: number;
  message?: string;
}

// Wholesale Order Model
interface WholesaleOrder extends Order {
  company_id: string;
  po_number?: string;
  payment_terms: string;
  volume_discount_applied: number;
  wholesale_price_list_id: string;
}
```

### 5.3 Implementation Components

#### Key Components
- `BulkDiscountTable` - Volume pricing display
- `VolumePricingTable` - Tiered pricing
- `BulkOrderForm` - Bulk quantity entry
- `MOQIndicator` - Minimum order display

---

## 6. Dropshipping

### 6.1 Overview

**Definition:** Retailer sells products without holding inventory; when orders come in, supplier ships directly to customer.

**Key Characteristics:**
- Zero inventory risk
- Lower margins
- Less control over fulfillment
- Supplier relationship critical

### 6.2 Data Models

```typescript
// Supplier Model
interface Supplier {
  id: string;
  name: string;
  code: string;
  contact_email: string;
  contact_phone?: string;
  api_endpoint?: string;
  api_key?: string;
  fulfillment_sla_days: number;
  return_policy: string;
  shipping_methods: SupplierShippingMethod[];
  status: 'active' | 'inactive';
}

// Supplier Product Model
interface SupplierProduct {
  id: string;
  supplier_id: string;
  product_id: string;
  supplier_sku: string;
  cost_price: number;
  stock_quantity: number;
  lead_time_days: number;
  last_sync_at: string;
}

// Dropship Order Model
interface DropshipOrder {
  id: string;
  order_id: string;
  supplier_id: string;
  supplier_order_id?: string;
  items: DropshipOrderItem[];
  status: 'pending' | 'sent_to_supplier' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  tracking_number?: string;
  tracking_url?: string;
  created_at: string;
}
```

---

## 7. White Label / Private Label

### 7.1 Overview

**Definition:** Selling products manufactured by third parties under your own brand name.

**Types:**
- **White Label:** Generic product, multiple brands sell same item
- **Private Label:** Exclusive product made specifically for your brand

### 7.2 Data Models

```typescript
// Private Label Product
interface PrivateLabelProduct extends Product {
  manufacturer_id: string;
  manufacturer_sku: string;
  brand_id: string;
  original_product_id?: string; // If white label
  customization: ProductCustomization;
}

// Product Customization
interface ProductCustomization {
  branding: {
    logo_placement?: string;
    packaging_design_id?: string;
    label_design_id?: string;
  };
  modifications?: {
    color_options?: string[];
    size_options?: string[];
    material_changes?: string;
  };
}
```

---

## 8. Print-on-Demand

### 8.1 Overview

**Definition:** Products (apparel, accessories, books) are customized and printed only when an order is placed.

**Key Characteristics:**
- Zero inventory
- Unlimited design variety
- Lower margins
- Longer production times

### 8.2 Data Models

```typescript
// Design Model
interface Design {
  id: string;
  creator_id: string;
  title: string;
  file_url: string;
  preview_url: string;
  file_type: 'png' | 'svg' | 'ai' | 'psd';
  dimensions: {
    width: number;
    height: number;
    dpi: number;
  };
  print_areas: PrintArea[];
  status: 'draft' | 'approved' | 'rejected';
}

// Print Area Configuration
interface PrintArea {
  id: string;
  name: string;
  position: 'front' | 'back' | 'left_sleeve' | 'right_sleeve' | 'all_over';
  max_width_inches: number;
  max_height_inches: number;
  bleed_inches: number;
}

// POD Product Model
interface PODProduct extends Product {
  base_product_id: string;
  design_id: string;
  print_provider_id: string;
  production_time_days: number;
  print_cost: number;
}
```

---

## 9. Rental / Leasing

### 9.1 Overview

**Definition:** Customers pay to temporarily use products rather than purchasing outright.

**Key Characteristics:**
- Recurring revenue from single inventory item
- Complex logistics (returns, cleaning, maintenance)
- Insurance/damage considerations
- Sustainability appeal

### 9.2 Data Models

```typescript
// Rental Product Model
interface RentalProduct {
  id: string;
  product_id: string;
  product: Product;
  rental_type: 'daily' | 'weekly' | 'monthly' | 'event';
  pricing: RentalPricing[];
  deposit_amount: number;
  deposit_currency: string;
  available_quantity: number;
  total_quantity: number;
  min_rental_period: number;
  max_rental_period?: number;
  cleaning_fee?: number;
  late_fee_per_day?: number;
  damage_policy: string;
  pickup_locations?: Location[];
  delivery_available: boolean;
}

// Rental Pricing
interface RentalPricing {
  duration_type: 'day' | 'week' | 'month';
  duration_count: number;
  price: number;
  currency_code: string;
}

// Rental Reservation
interface RentalReservation {
  id: string;
  rental_product_id: string;
  customer_id: string;
  status: 'pending' | 'confirmed' | 'active' | 'returned' | 'cancelled' | 'overdue';
  start_date: string;
  end_date: string;
  pickup_type: 'store' | 'delivery';
  pickup_location_id?: string;
  delivery_address?: Address;
  rental_total: number;
  deposit_total: number;
  deposit_status: 'held' | 'released' | 'partial_refund' | 'forfeited';
  condition_at_checkout?: ConditionReport;
  condition_at_return?: ConditionReport;
  late_fees?: number;
  damage_charges?: number;
}

// Condition Report
interface ConditionReport {
  id: string;
  reservation_id: string;
  type: 'checkout' | 'return';
  photos: string[];
  notes: string;
  condition_rating: 'excellent' | 'good' | 'fair' | 'poor';
  damage_noted: boolean;
  damage_description?: string;
  inspector_id: string;
  created_at: string;
}
```

### 9.3 Implementation Components

#### Routes
- `/rentals` - Rental product catalog
- `/rentals/$handle` - Rental product details

#### Key Components
- `RentalPricingTable` - Pricing display
- `AvailabilityCalendar` - Date selection
- `DepositInfo` - Deposit requirements
- `ConditionChecklist` - Pre-rental inspection

---

## 10. Recommerce / Resale (Trade-In)

### 10.1 Overview

**Definition:** Selling pre-owned, refurbished, or returned products, often at discounted prices. Includes trade-in programs.

**Key Characteristics:**
- Sustainability appeal
- Quality grading systems
- Authentication for luxury
- Can be peer-to-peer or company-managed

### 10.2 Data Models

```typescript
// Trade-In Program Model
interface TradeInProgram {
  id: string;
  name: string;
  description: string;
  eligible_categories: string[];
  eligible_brands: string[];
  credit_type: 'cash' | 'store_credit' | 'both';
  bonus_percentage?: number;
  terms_conditions: string;
  status: 'active' | 'paused' | 'ended';
}

// Trade-In Item Model
interface TradeInItem {
  id: string;
  program_id: string;
  customer_id: string;
  product_category: string;
  brand: string;
  model?: string;
  condition_reported: 'like_new' | 'good' | 'fair' | 'poor';
  condition_verified?: 'like_new' | 'good' | 'fair' | 'poor' | 'rejected';
  photos: string[];
  description: string;
  estimated_value: number;
  final_value?: number;
  status: 'submitted' | 'received' | 'evaluating' | 'valued' | 'accepted' | 'rejected' | 'returned';
  shipping_label_url?: string;
  tracking_number?: string;
  credit_issued?: StoreCreditTransaction;
  created_at: string;
}

// Pre-Owned Product
interface PreOwnedProduct extends Product {
  original_product_id?: string;
  condition: 'new_open_box' | 'like_new' | 'very_good' | 'good' | 'acceptable';
  condition_notes: string;
  original_price: number;
  authenticity_verified: boolean;
  authentication_certificate?: string;
  previous_owners?: number;
  warranty_remaining?: string;
  defects?: string[];
  included_accessories?: string[];
  photos_of_actual_item: string[];
}
```

### 10.3 Implementation Components

#### Routes
- `/trade-in` - Trade-in program landing
- `/trade-in/$handle` - Item evaluation form
- `/consignment` - Consignment marketplace
- `/consignment/$handle` - Consignment item detail

---

## 11. Social Commerce

### 11.1 Overview

**Definition:** Selling products directly through social media platforms, integrating shopping into the social experience.

**Platforms:**
- Instagram Shopping
- TikTok Shop
- Facebook Shops
- Pinterest Shopping

### 11.2 Data Models

```typescript
// Social Media Integration
interface SocialIntegration {
  id: string;
  platform: 'instagram' | 'tiktok' | 'facebook' | 'pinterest';
  account_id: string;
  account_name: string;
  access_token: string;
  refresh_token?: string;
  catalog_id?: string;
  pixel_id?: string;
  status: 'active' | 'disconnected' | 'pending';
  last_sync_at?: string;
}

// Shoppable Content
interface ShoppablePost {
  id: string;
  platform: string;
  post_id: string;
  post_url: string;
  media_url: string;
  media_type: 'image' | 'video' | 'carousel';
  caption: string;
  tagged_products: TaggedProduct[];
  engagement: {
    likes: number;
    comments: number;
    shares: number;
    saves: number;
  };
  conversions: {
    clicks: number;
    add_to_carts: number;
    purchases: number;
    revenue: number;
  };
  posted_at: string;
}

// Product Tag
interface TaggedProduct {
  product_id: string;
  position?: { x: number; y: number };
  start_time?: number; // For videos
  end_time?: number;
}
```

### 11.3 Implementation Components

#### Key Components
- `InstagramFeed` - Embedded Instagram feed
- `UGCGallery` - User-generated content display
- `ShopTheLook` - Shop from styled images
- `ImageHotspots` - Clickable product tags on images

---

## 12. Headless Commerce

### 12.1 Overview

**Definition:** Architecture where the frontend (presentation layer) is decoupled from the backend (commerce engine), connected via APIs.

**Key Characteristics:**
- Complete frontend flexibility
- Multi-channel from single backend
- Better performance potential
- API-first approach

### 12.2 Architecture

```
+------------------+     +------------------+     +------------------+
|   Frontend(s)    |     |   API Gateway    |     |  Commerce Engine |
|------------------|     |------------------|     |------------------|
| - Web (React)    | --> | - Authentication | --> | - Products       |
| - Mobile App     |     | - Rate Limiting  |     | - Orders         |
| - Kiosk          |     | - Caching        |     | - Customers      |
| - Voice (Alexa)  |     | - Routing        |     | - Inventory      |
+------------------+     +------------------+     +------------------+
                                  |
                                  v
                         +------------------+
                         |   Integrations   |
                         |------------------|
                         | - Payment (Stripe)|
                         | - Shipping (UPS) |
                         | - CRM (Salesforce)|
                         | - ERP (SAP)      |
                         +------------------+
```

### 12.3 API Structure

```typescript
// SDK Client Interface
interface MedusaSDK {
  store: {
    products: {
      list: (query?: ProductQuery) => Promise<PaginatedProducts>;
      retrieve: (id: string) => Promise<Product>;
    };
    carts: {
      create: (data: CreateCartInput) => Promise<Cart>;
      retrieve: (id: string) => Promise<Cart>;
      update: (id: string, data: UpdateCartInput) => Promise<Cart>;
      addLineItem: (cartId: string, data: AddLineItemInput) => Promise<Cart>;
      updateLineItem: (cartId: string, lineId: string, data: UpdateLineItemInput) => Promise<Cart>;
      removeLineItem: (cartId: string, lineId: string) => Promise<Cart>;
      complete: (cartId: string) => Promise<Order>;
    };
    customers: {
      create: (data: CreateCustomerInput) => Promise<Customer>;
      retrieve: () => Promise<Customer>;
      update: (data: UpdateCustomerInput) => Promise<Customer>;
    };
    regions: {
      list: () => Promise<Region[]>;
    };
  };
}
```

---

## 13. Omnichannel Commerce

### 13.1 Overview

**Definition:** Unified, seamless customer experience across all channels (online, mobile, physical stores, social).

**Key Capabilities:**
- Cross-channel cart persistence
- Unified customer profiles
- Real-time inventory visibility
- Flexible fulfillment options (BOPIS, Ship-from-Store)

### 13.2 Data Models

```typescript
// Channel Model
interface Channel {
  id: string;
  name: string;
  type: 'web' | 'mobile_app' | 'store' | 'marketplace' | 'social' | 'call_center';
  status: 'active' | 'inactive';
  config: ChannelConfig;
}

// Store Location Model
interface StoreLocation {
  id: string;
  name: string;
  code: string;
  address: Address;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  phone: string;
  email: string;
  hours: StoreHours[];
  services: ('pickup' | 'returns' | 'appointments' | 'alterations')[];
  inventory_location_id: string;
  status: 'open' | 'closed' | 'temporarily_closed';
}

// Unified Cart Model
interface OmnichannelCart extends Cart {
  channel_id: string;
  fulfillments: CartFulfillment[];
}

// Cart Fulfillment
interface CartFulfillment {
  id: string;
  type: 'ship' | 'pickup' | 'delivery';
  location_id?: string;
  items: string[]; // Line item IDs
  scheduled_date?: string;
  scheduled_time_slot?: string;
}
```

### 13.3 Implementation Components

#### Routes
- `/stores` - Store locator
- `/checkout` - Multi-fulfillment checkout

#### Key Components
- `StoreLocator` - Find nearby stores
- `StoreAvailability` - Check in-store stock
- `FulfillmentSelector` - Choose ship/pickup/delivery
- `DeliverySlotPicker` - Schedule delivery

---

## 14. Flash Sales / Daily Deals

### 14.1 Overview

**Definition:** Time-limited offers with significant discounts, creating urgency and driving quick purchases.

**Key Mechanics:**
- Countdown timers
- Limited quantities
- Exclusive access
- Deep discounts (50-90% off)

### 14.2 Data Models

```typescript
// Flash Sale Model
interface FlashSale {
  id: string;
  name: string;
  description: string;
  starts_at: string;
  ends_at: string;
  status: 'scheduled' | 'active' | 'ended';
  products: FlashSaleProduct[];
  access_type: 'public' | 'members_only' | 'early_access';
  banner_image?: string;
  terms?: string;
}

// Flash Sale Product
interface FlashSaleProduct {
  id: string;
  flash_sale_id: string;
  product_id: string;
  variant_id?: string;
  original_price: number;
  sale_price: number;
  discount_percentage: number;
  quantity_available: number;
  quantity_sold: number;
  limit_per_customer?: number;
}
```

### 14.3 Implementation Components

#### Routes
- `/flash-sales` - Flash sales landing page

#### Key Components
- `FlashSaleBanner` - Sale announcement
- `CountdownTimer` - Time remaining
- `StockUrgency` - Limited stock indicator
- `FlashSaleBar` - Top bar notification
- `ProductLaunchTimer` - Upcoming sale countdown

---

## 15. Freemium Commerce

### 15.1 Overview

**Definition:** Basic product/service offered free, with premium features or products available for purchase.

**Key Characteristics:**
- Low barrier to entry
- Convert free users to paid
- Clear upgrade path
- Feature gating

### 15.2 Data Models

```typescript
// Feature Model
interface Feature {
  id: string;
  name: string;
  description: string;
  tier_required: 'free' | 'basic' | 'premium' | 'enterprise';
  usage_limit?: number;
  usage_period?: 'daily' | 'weekly' | 'monthly';
}

// Usage Tracking
interface UsageRecord {
  id: string;
  customer_id: string;
  feature_id: string;
  period_start: string;
  period_end: string;
  usage_count: number;
  limit: number;
}

// Upgrade Prompt
interface UpgradePrompt {
  feature_id: string;
  trigger: 'limit_reached' | 'feature_blocked' | 'trial_ending';
  message: string;
  cta_text: string;
  target_tier: string;
}
```

---

## 16. Bundling Commerce

### 16.1 Overview

**Definition:** Selling multiple products together as a package, typically at a discount compared to individual purchase.

**Types:**
- **Pure Bundling:** Only available as bundle
- **Mixed Bundling:** Available separately or as bundle
- **Cross-category:** Products from different categories
- **Customizable:** Customer selects items

### 16.2 Data Models

```typescript
// Bundle Model
interface Bundle {
  id: string;
  name: string;
  description: string;
  handle: string;
  thumbnail?: string;
  bundle_type: 'fixed' | 'customizable' | 'mix_match';
  pricing_type: 'fixed' | 'calculated' | 'percentage_discount';
  fixed_price?: number;
  discount_percentage?: number;
  items: BundleItem[];
  min_items?: number;
  max_items?: number;
  status: 'draft' | 'active' | 'archived';
}

// Bundle Item
interface BundleItem {
  id: string;
  bundle_id: string;
  product_id?: string;
  variant_id?: string;
  category_id?: string; // For customizable
  quantity: number;
  is_required: boolean;
  sort_order: number;
}

// Bundle Selection (for customizable)
interface BundleSelection {
  bundle_id: string;
  selections: {
    slot_id: string;
    variant_id: string;
    quantity: number;
  }[];
  total_price: number;
}
```

### 16.3 Implementation Components

#### Routes
- `/bundles` - Bundle offerings
- `/bundles/$handle` - Bundle detail/builder

#### Key Components
- `BundleCard` - Bundle display card
- `BundleBuilder` - Customizable bundle creator
- `BundleSavings` - Savings display

---

## 17. Affiliate Commerce

### 17.1 Overview

**Definition:** Partners (affiliates) promote products and earn commission on sales they generate through tracked referral links.

**Commission Models:**
- Percentage of sale
- Fixed amount per sale
- Tiered based on volume
- Recurring for subscriptions

### 17.2 Data Models

```typescript
// Affiliate Model
interface Affiliate {
  id: string;
  customer_id: string;
  code: string;
  status: 'pending' | 'approved' | 'suspended';
  commission_rate: number;
  commission_type: 'percentage' | 'fixed';
  tier: 'bronze' | 'silver' | 'gold' | 'platinum';
  payment_info: PaymentInfo;
  stats: AffiliateStats;
  created_at: string;
}

// Affiliate Stats
interface AffiliateStats {
  total_clicks: number;
  total_orders: number;
  total_revenue: number;
  total_commission: number;
  pending_commission: number;
  conversion_rate: number;
  last_30_days: {
    clicks: number;
    orders: number;
    revenue: number;
    commission: number;
  };
}

// Affiliate Link
interface AffiliateLink {
  id: string;
  affiliate_id: string;
  url: string;
  short_code: string;
  destination_url: string;
  campaign?: string;
  clicks: number;
  conversions: number;
  created_at: string;
}

// Commission Record
interface CommissionRecord {
  id: string;
  affiliate_id: string;
  order_id: string;
  order_total: number;
  commission_amount: number;
  commission_rate: number;
  status: 'pending' | 'approved' | 'paid' | 'cancelled';
  approved_at?: string;
  paid_at?: string;
}
```

### 17.3 Implementation Components

#### Key Components
- `AffiliateBanner` - Affiliate promotion banner
- `ReferralWidget` - Share referral links
- `ReferralShareButtons` - Social sharing

---

## 18. Crowdfunding / Pre-order

### 18.1 Overview

**Definition:** Selling products before they're manufactured or available, using customer payments to fund production.

**Key Characteristics:**
- Validates demand before production
- Customers fund development
- Tiered rewards/pricing
- Delivery timeline management

### 18.2 Data Models

```typescript
// Campaign Model
interface Campaign {
  id: string;
  name: string;
  handle: string;
  description: string;
  short_description: string;
  video_url?: string;
  images: string[];
  goal_amount: number;
  goal_currency: string;
  current_amount: number;
  backer_count: number;
  starts_at: string;
  ends_at: string;
  status: 'draft' | 'active' | 'funded' | 'failed' | 'completed';
  funding_type: 'all_or_nothing' | 'flexible';
  rewards: CampaignReward[];
  updates: CampaignUpdate[];
  faqs: FAQ[];
  estimated_delivery: string;
  created_at: string;
}

// Campaign Reward
interface CampaignReward {
  id: string;
  campaign_id: string;
  title: string;
  description: string;
  price: number;
  retail_value?: number;
  items_included: string[];
  quantity_available?: number;
  quantity_claimed: number;
  estimated_delivery: string;
  shipping_type: 'included' | 'additional' | 'digital';
  limit_per_backer?: number;
  sort_order: number;
}

// Backer Model
interface Backer {
  id: string;
  campaign_id: string;
  customer_id: string;
  reward_id: string;
  amount: number;
  add_ons?: BackerAddOn[];
  shipping_address?: Address;
  status: 'pledged' | 'charged' | 'refunded' | 'fulfilled';
  created_at: string;
}

// Pre-Order Model
interface PreOrder {
  id: string;
  product_id: string;
  variant_id?: string;
  customer_id: string;
  quantity: number;
  unit_price: number;
  total: number;
  deposit_amount?: number;
  deposit_paid: boolean;
  balance_due?: number;
  estimated_ship_date: string;
  status: 'pending' | 'confirmed' | 'ready_to_ship' | 'shipped' | 'cancelled';
  payment_type: 'full' | 'deposit' | 'pay_later';
  charge_date?: string;
  created_at: string;
}
```

### 18.3 Implementation Components

#### Routes
- `/campaigns` - Campaign listings
- `/campaigns/$handle` - Campaign detail
- `/preorders` - Pre-order products
- `/preorders/$handle` - Pre-order detail

#### Key Components
- `CampaignCard` - Campaign preview
- `CampaignProgress` - Funding progress bar
- `RewardCard` - Reward tier display
- `BackerCount` - Number of backers
- `WaitlistSignup` - Join waitlist form

---

## 19. Membership / VIP Commerce

### 19.1 Overview

**Definition:** Customers pay fee or qualify for exclusive access to products, pricing, content, or experiences.

**Types:**
- **Paid Membership:** Fee for access (Amazon Prime, Costco)
- **Tiered Loyalty:** Earn status through spending
- **Invite-Only:** Exclusive communities

### 19.2 Data Models

```typescript
// Membership Tier Model
interface MembershipTier {
  id: string;
  name: string;
  handle: string;
  description: string;
  price?: number; // For paid tiers
  price_interval?: 'monthly' | 'yearly';
  qualification_type: 'paid' | 'spending' | 'points' | 'invite';
  spending_threshold?: number;
  points_threshold?: number;
  benefits: MembershipBenefit[];
  badge_image?: string;
  color?: string;
  sort_order: number;
}

// Membership Benefit
interface MembershipBenefit {
  id: string;
  tier_id: string;
  type: 'discount' | 'free_shipping' | 'early_access' | 'exclusive_products' | 'points_multiplier' | 'free_gift' | 'priority_support';
  value?: number; // e.g., 10 for 10% discount
  description: string;
}

// Customer Membership
interface CustomerMembership {
  id: string;
  customer_id: string;
  tier_id: string;
  tier: MembershipTier;
  status: 'active' | 'expired' | 'cancelled';
  started_at: string;
  expires_at?: string;
  renewal_date?: string;
  lifetime_spending: number;
  current_year_spending: number;
  points_balance: number;
  next_tier?: MembershipTier;
  progress_to_next_tier?: number;
}
```

### 19.3 Implementation Components

#### Routes
- `/memberships` - Membership tiers
- `/memberships/$handle` - Tier detail
- `/loyalty` - Loyalty program
- `/account/loyalty` - Member dashboard

#### Key Components
- `MembershipCard` - Tier display
- `TierProgress` - Progress to next tier
- `LoyaltyPointsCard` - Points balance
- `PointsEarnedBanner` - Points notification
- `RedeemPointsModal` - Points redemption
- `BenefitsList` - Member benefits

---

## 20. Hybrid Commerce Models

### 20.1 Overview

**Definition:** Combining two or more commerce models to create unique business approaches.

**Common Combinations:**
- DTC + Wholesale
- Subscription + Marketplace
- Rental + Recommerce
- B2B + B2C
- Membership + Flash Sales

### 20.2 Architecture Considerations

```typescript
// Multi-Model Customer
interface HybridCustomer extends Customer {
  customer_type: 'individual' | 'business' | 'both';
  company_id?: string;
  membership_id?: string;
  affiliate_id?: string;
  subscriptions: Subscription[];
  rental_history: RentalReservation[];
  trade_ins: TradeInItem[];
}

// Multi-Model Order
interface HybridOrder extends Order {
  order_type: 'standard' | 'subscription' | 'rental' | 'preorder' | 'b2b' | 'wholesale';
  company_id?: string;
  subscription_id?: string;
  rental_id?: string;
  campaign_id?: string;
}

// Multi-Model Cart
interface HybridCart extends Cart {
  items: HybridLineItem[];
}

interface HybridLineItem extends LineItem {
  item_type: 'product' | 'subscription' | 'rental' | 'service' | 'digital';
  subscription_interval?: string;
  rental_dates?: { start: string; end: string };
  service_booking?: { date: string; time: string };
}
```

---

# Part II: Alternative Commerce Models

---

## 21. Try-Before-You-Buy (TBYB)

### 21.1 Overview

**Definition:** Customers can try products at home before deciding to purchase, typically with a trial period.

### 21.2 Data Models

```typescript
// TBYB Program
interface TBYBProgram {
  id: string;
  name: string;
  trial_days: number;
  max_items: number;
  deposit_required: boolean;
  deposit_percentage?: number;
  eligible_categories: string[];
  return_shipping: 'free' | 'customer_pays';
  membership_required: boolean;
}

// Trial Order
interface TrialOrder {
  id: string;
  customer_id: string;
  program_id: string;
  items: TrialItem[];
  status: 'pending' | 'shipped' | 'trial_active' | 'return_pending' | 'completed';
  trial_start_date: string;
  trial_end_date: string;
  deposit_held?: number;
  items_kept: string[];
  items_returned: string[];
  final_charge?: number;
}
```

### 21.3 Routes
- `/try-before-you-buy` - TBYB program
- `/try-before-you-buy/$handle` - TBYB product selection

---

## 22. Consignment

### 22.1 Overview

**Definition:** Sellers provide products to the platform; payment is made only when items sell.

### 22.2 Data Models

```typescript
// Consignment Item
interface ConsignmentItem {
  id: string;
  seller_id: string;
  product: ConsignmentProduct;
  agreed_price: number;
  commission_rate: number;
  seller_payout: number;
  status: 'submitted' | 'received' | 'listed' | 'sold' | 'returned' | 'expired';
  listing_duration_days: number;
  listed_at?: string;
  expires_at?: string;
  sold_at?: string;
}

// Consignment Seller
interface ConsignmentSeller {
  id: string;
  customer_id: string;
  status: 'pending' | 'approved' | 'suspended';
  total_items_consigned: number;
  total_items_sold: number;
  total_earnings: number;
  pending_payouts: number;
  rating?: number;
}
```

### 22.3 Routes
- `/consignment` - Consignment marketplace
- `/consignment/$handle` - Item detail

---

## 23. Auctions

### 23.1 Overview

**Definition:** Products sold to highest bidder within a time limit.

### 23.2 Data Models

```typescript
// Auction Model
interface Auction {
  id: string;
  title: string;
  description: string;
  product_id?: string;
  images: string[];
  starting_price: number;
  reserve_price?: number;
  buy_now_price?: number;
  current_bid?: number;
  bid_count: number;
  bid_increment: number;
  starts_at: string;
  ends_at: string;
  status: 'scheduled' | 'active' | 'ended' | 'sold' | 'cancelled';
  winner_id?: string;
  winning_bid?: number;
  auto_extend: boolean;
  extension_minutes?: number;
}

// Bid Model
interface Bid {
  id: string;
  auction_id: string;
  bidder_id: string;
  amount: number;
  max_bid?: number; // For proxy bidding
  status: 'active' | 'outbid' | 'winning' | 'won' | 'cancelled';
  created_at: string;
}
```

### 23.3 Routes
- `/auctions` - Auction listings
- `/auctions/$handle` - Auction detail with live bidding

---

## 24. Services & Bookings

### 24.1 Overview

**Definition:** Selling services with appointment/booking functionality.

### 24.2 Data Models

```typescript
// Service Model
interface BookingService {
  id: string;
  name: string;
  handle: string;
  description: string;
  duration_minutes: number;
  price: number;
  currency_code: string;
  buffer_before?: number;
  buffer_after?: number;
  max_capacity?: number;
  category_id?: string;
  providers: ServiceProvider[];
  locations: ServiceLocation[];
  images: string[];
}

// Service Provider
interface ServiceProvider {
  id: string;
  name: string;
  email: string;
  bio?: string;
  avatar?: string;
  services: string[];
  availability: ProviderAvailability[];
  rating?: number;
  review_count?: number;
}

// Provider Availability
interface ProviderAvailability {
  day_of_week: number; // 0-6
  start_time: string; // HH:mm
  end_time: string;
  breaks?: { start: string; end: string }[];
}

// Time Slot
interface TimeSlot {
  provider_id: string;
  date: string;
  start_time: string;
  end_time: string;
  available: boolean;
  capacity_remaining?: number;
}

// Booking Model
interface Booking {
  id: string;
  service_id: string;
  provider_id: string;
  customer_id: string;
  date: string;
  start_time: string;
  end_time: string;
  status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled' | 'no_show';
  location_type: 'in_person' | 'virtual';
  location_id?: string;
  meeting_url?: string;
  notes?: string;
  price: number;
  payment_status: 'pending' | 'paid' | 'refunded';
  reminder_sent: boolean;
  created_at: string;
}
```

### 24.3 Implementation Components

#### Routes
- `/services` - Service catalog
- `/services/$handle` - Service detail
- `/providers` - Provider directory
- `/providers/$id` - Provider profile
- `/account/bookings` - Booking history
- `/account/bookings/$id` - Booking detail

#### Key Components
- `ServiceCard` - Service display
- `ProviderCard` - Provider display
- `AvailabilityCalendar` - Date picker
- `TimeSlotPicker` - Time selection
- `BookingForm` - Complete booking form
- `BookingConfirmation` - Confirmation display
- `BookingReminder` - Reminder notification
- `RescheduleModal` - Reschedule booking

---

## 25. Digital Products & Downloads

### 25.1 Overview

**Definition:** Selling downloadable content, software, licenses, or digital assets.

### 25.2 Data Models

```typescript
// Digital Asset Model
interface DigitalAsset {
  id: string;
  product_id: string;
  name: string;
  file_url: string;
  file_size: number;
  file_type: string;
  download_limit?: number;
  expiry_days?: number;
  version?: string;
  requirements?: string;
}

// License Key Model
interface LicenseKey {
  id: string;
  digital_asset_id: string;
  order_id: string;
  customer_id: string;
  key: string;
  status: 'active' | 'revoked' | 'expired';
  activations: LicenseActivation[];
  max_activations?: number;
  expires_at?: string;
  created_at: string;
}

// License Activation
interface LicenseActivation {
  id: string;
  license_key_id: string;
  device_identifier: string;
  device_name?: string;
  activated_at: string;
  deactivated_at?: string;
}

// Customer Download
interface CustomerDownload {
  id: string;
  customer_id: string;
  digital_asset_id: string;
  order_id: string;
  download_count: number;
  download_limit?: number;
  expires_at?: string;
  last_download_at?: string;
}
```

### 25.3 Implementation Components

#### Routes
- `/account/downloads` - Digital downloads
- `/account/licenses` - License keys

#### Key Components
- `DownloadButton` - Download trigger
- `DownloadCard` - Download display
- `LicenseKeyDisplay` - License key with copy
- `ExpiryBadge` - Expiration status

---

## 26. Events & Ticketing

### 26.1 Overview

**Definition:** Selling tickets or registrations for events.

### 26.2 Data Models

```typescript
// Event Model
interface Event {
  id: string;
  title: string;
  slug: string;
  description: string;
  short_description: string;
  images: string[];
  event_type: 'in_person' | 'virtual' | 'hybrid';
  venue_id?: string;
  virtual_platform?: string;
  virtual_url?: string;
  start_date: string;
  end_date: string;
  timezone: string;
  ticket_types: TicketType[];
  capacity?: number;
  sold_count: number;
  status: 'draft' | 'published' | 'cancelled' | 'completed';
  organizer: EventOrganizer;
  categories: string[];
  tags: string[];
}

// Ticket Type Model
interface TicketType {
  id: string;
  event_id: string;
  name: string;
  description?: string;
  price: number;
  quantity_available?: number;
  quantity_sold: number;
  sales_start?: string;
  sales_end?: string;
  min_per_order?: number;
  max_per_order?: number;
  includes: string[];
}

// Event Registration
interface EventRegistration {
  id: string;
  event_id: string;
  customer_id: string;
  tickets: EventTicket[];
  total: number;
  status: 'pending' | 'confirmed' | 'checked_in' | 'cancelled';
  confirmation_code: string;
  created_at: string;
}

// Event Ticket
interface EventTicket {
  id: string;
  registration_id: string;
  ticket_type_id: string;
  attendee_name?: string;
  attendee_email?: string;
  qr_code: string;
  checked_in: boolean;
  checked_in_at?: string;
}

// Venue Model
interface Venue {
  id: string;
  name: string;
  slug: string;
  description: string;
  address: Address;
  capacity: number;
  images: string[];
  amenities: string[];
  accessibility: string[];
  contact: VenueContact;
}
```

### 26.3 Implementation Components

#### Routes
- `/events` - Event listings
- `/events/$slug` - Event detail
- `/venues` - Venue directory
- `/venues/$slug` - Venue detail

#### Key Components
- `EventCard` - Event display
- `EventCalendar` - Calendar view
- `TicketSelector` - Ticket type selection
- `VenueCard` - Venue display
- `VenueGallery` - Venue images

---

## 27. Gift Cards & Vouchers

### 27.1 Overview

**Definition:** Selling prepaid store credit in card/voucher form.

### 27.2 Data Models

```typescript
// Gift Card Config
interface GiftCardConfig {
  enabled: boolean;
  denominations: number[];
  custom_amount: {
    enabled: boolean;
    min: number;
    max: number;
  };
  designs: GiftCardDesign[];
  delivery_options: ('email' | 'physical')[];
  expiry_months?: number;
}

// Gift Card Design
interface GiftCardDesign {
  id: string;
  name: string;
  image_url: string;
  category: 'birthday' | 'holiday' | 'thank_you' | 'celebration' | 'general';
}

// Gift Card Model
interface GiftCard {
  id: string;
  code: string;
  balance: number;
  original_value: number;
  currency_code: string;
  design_id?: string;
  recipient_email?: string;
  recipient_name?: string;
  sender_name?: string;
  message?: string;
  delivery_date?: string;
  delivered: boolean;
  status: 'active' | 'depleted' | 'expired' | 'cancelled';
  expires_at?: string;
  created_at: string;
}

// Gift Card Transaction
interface GiftCardTransaction {
  id: string;
  gift_card_id: string;
  type: 'purchase' | 'redemption' | 'refund' | 'adjustment';
  amount: number;
  balance_after: number;
  order_id?: string;
  notes?: string;
  created_at: string;
}
```

### 27.3 Implementation Components

#### Routes
- `/gift-cards` - Gift card purchase page

#### Key Components
- `GiftCardDesignPicker` - Design selection
- `GiftCardAmountSelector` - Amount selection
- `GiftCardMessageForm` - Personalization
- `GiftCardBalance` - Balance checker

---

## 28. Referral Commerce

### 28.1 Overview

**Definition:** Customers earn rewards for referring new customers.

### 28.2 Data Models

```typescript
// Referral Program
interface ReferralProgram {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'paused' | 'ended';
  referrer_reward: ReferralReward;
  referee_reward: ReferralReward;
  minimum_order_value?: number;
  max_referrals?: number;
  terms: string;
}

// Referral Reward
interface ReferralReward {
  type: 'discount_percentage' | 'discount_fixed' | 'store_credit' | 'free_product' | 'points';
  value: number;
  product_id?: string;
  expires_days?: number;
}

// Referral
interface Referral {
  id: string;
  program_id: string;
  referrer_id: string;
  referee_id?: string;
  referee_email: string;
  code: string;
  status: 'pending' | 'signed_up' | 'converted' | 'rewarded' | 'expired';
  order_id?: string;
  referrer_reward_issued: boolean;
  referee_reward_issued: boolean;
  created_at: string;
  converted_at?: string;
}
```

### 28.3 Implementation Components

#### Routes
- `/referrals` - Referral program page

#### Key Components
- `ReferralCard` - Program details
- `ReferralShareButtons` - Share via social/email
- `ReferralWidget` - Inline referral prompt
- `ReferralStats` - Referral statistics

---

## 29. Loyalty & Rewards

### 29.1 Overview

**Definition:** Points-based reward system for customer retention.

### 29.2 Data Models

```typescript
// Loyalty Program
interface LoyaltyProgram {
  id: string;
  name: string;
  description: string;
  currency_name: string; // e.g., "Points", "Stars"
  earn_rate: number; // Points per dollar
  redemption_rate: number; // Dollars per point
  tiers: LoyaltyTier[];
  earn_rules: EarnRule[];
  redemption_options: RedemptionOption[];
  expiry_months?: number;
}

// Loyalty Tier
interface LoyaltyTier {
  id: string;
  name: string;
  min_points?: number;
  min_spending?: number;
  benefits: string[];
  earn_multiplier: number;
  badge_image?: string;
  color: string;
}

// Earn Rule
interface EarnRule {
  id: string;
  action: 'purchase' | 'review' | 'referral' | 'birthday' | 'signup' | 'social_share';
  points: number;
  multiplier?: number;
  limit_per_day?: number;
  limit_per_month?: number;
}

// Loyalty Account
interface LoyaltyAccount {
  id: string;
  customer_id: string;
  program_id: string;
  points_balance: number;
  lifetime_points: number;
  tier_id: string;
  tier: LoyaltyTier;
  points_to_next_tier?: number;
  points_expiring_soon?: number;
  expiring_date?: string;
}

// Redemption Option
interface RedemptionOption {
  id: string;
  name: string;
  description: string;
  type: 'discount' | 'product' | 'shipping' | 'experience';
  points_required: number;
  value?: number;
  product_id?: string;
}

// Points Transaction
interface PointsTransaction {
  id: string;
  loyalty_account_id: string;
  type: 'earn' | 'redeem' | 'expire' | 'adjust';
  points: number;
  balance_after: number;
  description: string;
  order_id?: string;
  expires_at?: string;
  created_at: string;
}
```

### 29.3 Implementation Components

#### Routes
- `/loyalty` - Loyalty program page
- `/account/loyalty` - Member dashboard

#### Key Components
- `LoyaltyPointsCard` - Points balance
- `TierProgress` - Progress to next tier
- `PointsEarnedBanner` - Earn notification
- `RedeemPointsModal` - Redemption flow
- `PointsHistory` - Transaction history
- `EarnOpportunities` - Ways to earn

---

## 30. Multi-Tenant Platform

### 30.1 Overview

**Definition:** Single platform serving multiple independent stores/tenants.

### 30.2 Data Models

```typescript
// Tenant Model
interface Tenant {
  id: string;
  name: string;
  slug: string;
  domain?: string;
  logo?: string;
  favicon?: string;
  status: TenantStatus;
  settings: TenantSettings;
  features: string[];
  created_at: string;
}

// Tenant Settings
interface TenantSettings {
  branding: {
    primary_color: string;
    secondary_color: string;
    font_family?: string;
  };
  locale: LocaleConfig;
  commerce: {
    currency_code: string;
    tax_inclusive: boolean;
  };
  contact: {
    email: string;
    phone?: string;
    address?: Address;
  };
}

// Node Hierarchy (for CityOS)
interface NodeHierarchy {
  current: NodeMetadata;
  ancestors: NodeMetadata[];
  children: NodeMetadata[];
  siblings: NodeMetadata[];
}

// Node Metadata
interface NodeMetadata {
  id: string;
  code: string;
  name: string;
  type: NodeType;
  level: number;
  parent_id?: string;
  coordinates?: Coordinates;
  boundaries?: GeoJSON;
  metadata?: Record<string, any>;
}

// Governance Chain
interface GovernanceChain {
  authorities: GovernanceAuthority[];
  regions: Region[];
  countries: Country[];
}

// Platform Context
interface PlatformContext {
  tenant: Tenant;
  nodeHierarchy: NodeHierarchy;
  governance: GovernanceChain;
  capabilities: Capabilities;
  systems: SystemsRegistry;
  locale: LocaleConfig;
}
```

### 30.3 Implementation Components

#### Routes
- `/platform` - Platform dashboard

#### Key Components
- `PlatformDashboard` - Main dashboard
- `TenantCard` - Tenant display
- `SystemsGrid` - Systems overview
- `NodeHierarchyTree` - Hierarchy visualization
- `GovernancePanel` - Governance info
- `CapabilitiesPanel` - Platform capabilities

---

# Part III: Payment & Financial Models

---

## 31. Digital Wallet

### 31.1 Data Models

```typescript
// Wallet Model
interface Wallet {
  id: string;
  customer_id: string;
  balance: number;
  currency_code: string;
  status: 'active' | 'frozen' | 'closed';
  created_at: string;
}

// Wallet Transaction
interface WalletTransaction {
  id: string;
  wallet_id: string;
  type: 'top_up' | 'payment' | 'refund' | 'withdrawal' | 'transfer' | 'adjustment';
  amount: number;
  balance_after: number;
  reference_type?: 'order' | 'refund' | 'manual';
  reference_id?: string;
  description: string;
  created_at: string;
}
```

### 31.2 Implementation Components

#### Routes
- `/account/wallet` - Wallet dashboard

#### Key Components
- `WalletBalance` - Balance display
- `WalletTopUp` - Add funds
- `WalletCard` - Wallet summary
- `TransactionHistory` - Transaction list
- `TransactionCard` - Transaction detail

---

## 32. Buy Now Pay Later (BNPL)

### 32.1 Data Models

```typescript
// BNPL Provider
interface BNPLProvider {
  id: string;
  name: string;
  logo: string;
  min_order: number;
  max_order: number;
  installment_options: BNPLOption[];
}

// BNPL Option
interface BNPLOption {
  installments: number;
  interval: 'weekly' | 'biweekly' | 'monthly';
  interest_rate: number;
  fees?: number;
}
```

### 32.2 Implementation Components

#### Key Components
- `BNPLSelector` - Provider/plan selection
- `BNPLBadge` - "Pay in 4" badge
- `InstallmentPreview` - Payment preview

---

## 33. Installment Plans

### 33.1 Data Models

```typescript
// Installment Plan
interface InstallmentPlan {
  id: string;
  order_id: string;
  customer_id: string;
  total_amount: number;
  installment_amount: number;
  installments_total: number;
  installments_paid: number;
  interest_rate: number;
  fees: number;
  status: 'active' | 'completed' | 'defaulted' | 'cancelled';
  schedule: InstallmentScheduleItem[];
  created_at: string;
}

// Schedule Item
interface InstallmentScheduleItem {
  installment_number: number;
  due_date: string;
  amount: number;
  principal: number;
  interest: number;
  status: 'pending' | 'paid' | 'overdue' | 'failed';
  paid_at?: string;
}
```

### 33.2 Implementation Components

#### Routes
- `/account/installments` - Installment plans

#### Key Components
- `InstallmentPlan` - Plan summary
- `InstallmentSchedule` - Payment timeline
- `InstallmentCalculator` - Calculate payments

---

## 34. Store Credits

### 34.1 Data Models

```typescript
// Store Credit Account
interface StoreCreditAccount {
  id: string;
  customer_id: string;
  balance: number;
  currency_code: string;
}

// Store Credit Transaction
interface StoreCreditTransaction {
  id: string;
  account_id: string;
  type: 'credit' | 'debit' | 'expire';
  amount: number;
  balance_after: number;
  source: 'return' | 'trade_in' | 'gift_card' | 'promotion' | 'manual' | 'referral';
  reference_id?: string;
  description: string;
  expires_at?: string;
  created_at: string;
}
```

### 34.2 Implementation Components

#### Routes
- `/account/store-credits` - Credits balance
- `/account/credits` - Credits history

#### Key Components
- `CreditBalance` - Balance display
- `CreditHistory` - Transaction history

---

## 35. Escrow Payments

### 35.1 Data Models

```typescript
// Escrow Transaction
interface EscrowTransaction {
  id: string;
  order_id: string;
  buyer_id: string;
  seller_id: string;
  amount: number;
  currency_code: string;
  status: 'held' | 'released' | 'refunded' | 'disputed';
  held_at: string;
  release_conditions: string[];
  released_at?: string;
  dispute_id?: string;
}
```

### 35.2 Implementation Components

#### Key Components
- `EscrowStatus` - Escrow state display

---

## 36. Invoicing & Net Terms

### 36.1 Data Models

```typescript
// Invoice Model
interface Invoice {
  id: string;
  invoice_number: string;
  company_id: string;
  order_ids: string[];
  status: 'draft' | 'sent' | 'viewed' | 'paid' | 'overdue' | 'cancelled';
  issue_date: string;
  due_date: string;
  subtotal: number;
  tax_total: number;
  total: number;
  amount_paid: number;
  amount_due: number;
  payment_terms: string;
  notes?: string;
  line_items: InvoiceLineItem[];
  payments: InvoicePayment[];
  pdf_url?: string;
}

// Invoice Line Item
interface InvoiceLineItem {
  description: string;
  quantity: number;
  unit_price: number;
  tax_rate?: number;
  total: number;
}
```

### 36.2 Implementation Components

#### Routes
- `/business/invoices` - Invoice management
- `/account/statements` - Account statements

#### Key Components
- `InvoiceCard` - Invoice display
- `InvoiceTable` - Line items
- `PaymentStatusBadge` - Status indicator
- `InvoiceDownload` - PDF download
- `StatementDownload` - Statement export

---

## 37. Disputes & Refunds

### 37.1 Data Models

```typescript
// Dispute Model
interface Dispute {
  id: string;
  order_id: string;
  customer_id: string;
  type: 'not_received' | 'not_as_described' | 'damaged' | 'unauthorized' | 'duplicate' | 'other';
  reason: string;
  amount: number;
  currency_code: string;
  status: 'open' | 'under_review' | 'evidence_required' | 'resolved_merchant' | 'resolved_customer' | 'escalated';
  evidence: DisputeEvidence[];
  resolution?: DisputeResolution;
  created_at: string;
  resolved_at?: string;
}

// Dispute Evidence
interface DisputeEvidence {
  id: string;
  dispute_id: string;
  submitted_by: 'customer' | 'merchant';
  type: 'text' | 'image' | 'document' | 'tracking';
  content: string;
  file_url?: string;
  created_at: string;
}

// Refund Model
interface Refund {
  id: string;
  order_id: string;
  customer_id: string;
  amount: number;
  currency_code: string;
  reason: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  refund_method: 'original_payment' | 'store_credit' | 'manual';
  created_at: string;
  completed_at?: string;
}
```

### 37.2 Implementation Components

#### Routes
- `/account/disputes` - Dispute management

#### Key Components
- `DisputeForm` - File dispute
- `DisputeStatus` - Status tracking
- `RefundTracker` - Refund status

---

## 38. Multi-Currency

### 38.1 Data Models

```typescript
// Currency Configuration
interface CurrencyConfig {
  code: string;
  symbol: string;
  symbol_position: 'before' | 'after';
  decimal_digits: number;
  decimal_separator: string;
  thousand_separator: string;
}

// Exchange Rate
interface ExchangeRate {
  from_currency: string;
  to_currency: string;
  rate: number;
  updated_at: string;
}

// Price Display
interface PriceDisplay {
  amount: number;
  currency_code: string;
  formatted: string;
  original_amount?: number;
  original_currency?: string;
}
```

### 38.2 Implementation Components

#### Key Components
- `Price` - Formatted price display
- `CurrencySelector` - Currency picker
- `PriceRange` - Min-max display

---

# Part IV: Identity & Verification Models

---

## 39. KYC (Know Your Customer)

### 39.1 Data Models

```typescript
// KYC Verification
interface KYCVerification {
  id: string;
  customer_id: string;
  status: 'pending' | 'in_progress' | 'approved' | 'rejected' | 'expired';
  level: 'basic' | 'standard' | 'enhanced';
  documents: KYCDocument[];
  checks: KYCCheck[];
  submitted_at: string;
  verified_at?: string;
  expires_at?: string;
  rejection_reason?: string;
}

// KYC Document
interface KYCDocument {
  id: string;
  type: 'passport' | 'drivers_license' | 'national_id' | 'utility_bill' | 'bank_statement';
  file_url: string;
  status: 'pending' | 'verified' | 'rejected';
  extracted_data?: Record<string, any>;
  rejection_reason?: string;
}

// KYC Check
interface KYCCheck {
  type: 'identity' | 'address' | 'sanctions' | 'pep' | 'fraud';
  status: 'pending' | 'passed' | 'failed' | 'review';
  details?: Record<string, any>;
  checked_at: string;
}
```

### 39.2 Implementation Components

#### Routes
- `/verify/kyc` - KYC verification flow

#### Key Components
- `KYCFlow` - Multi-step verification
- `DocumentUploader` - Document upload
- `VerificationStatus` - Status badge

---

## 40. Age Verification

### 40.1 Data Models

```typescript
// Age Verification
interface AgeVerification {
  id: string;
  customer_id: string;
  method: 'date_of_birth' | 'document' | 'third_party';
  date_of_birth?: string;
  verified_age?: number;
  minimum_age_required: number;
  status: 'pending' | 'verified' | 'failed';
  verified_at?: string;
}
```

### 40.2 Implementation Components

#### Routes
- `/verify/age` - Age verification

#### Key Components
- `AgeGate` - Age verification gate

---

## 41. Residency Verification

### 41.1 Data Models

```typescript
// Residency Verification
interface ResidencyVerification {
  id: string;
  customer_id: string;
  address: Address;
  documents: ResidencyDocument[];
  status: 'pending' | 'verified' | 'rejected';
  zone?: ResidencyZone;
  verified_at?: string;
}
```

### 41.2 Implementation Components

#### Routes
- `/verify/residency` - Residency verification

#### Key Components
- `ResidencyVerifier` - Address verification form

---

## 42. Digital Identity Wallet

### 42.1 Data Models

```typescript
// Digital Credential
interface DigitalCredential {
  id: string;
  customer_id: string;
  type: 'age' | 'identity' | 'residency' | 'membership' | 'license';
  issuer: string;
  issued_at: string;
  expires_at?: string;
  status: 'active' | 'expired' | 'revoked';
  claims: Record<string, any>;
  verification_url?: string;
}

// Identity Wallet
interface IdentityWallet {
  customer_id: string;
  credentials: DigitalCredential[];
  verifications: Verification[];
}
```

### 42.2 Implementation Components

#### Routes
- `/account/identity` - Identity management

#### Key Components
- `IdentityWallet` - Credentials display
- `CredentialCard` - Individual credential
- `VerifiedBadge` - Verified indicator

---

## 43. Consent Management

### 43.1 Data Models

```typescript
// Consent Record
interface ConsentRecord {
  id: string;
  customer_id: string;
  consent_type: 'marketing_email' | 'marketing_sms' | 'marketing_push' | 'data_processing' | 'cookies' | 'third_party_sharing';
  granted: boolean;
  granted_at?: string;
  revoked_at?: string;
  source: 'signup' | 'settings' | 'popup' | 'checkout';
  ip_address?: string;
  version: string;
}

// Consent Configuration
interface ConsentConfig {
  required_consents: string[];
  optional_consents: string[];
  consent_texts: Record<string, string>;
  cookie_categories: CookieCategory[];
}
```

### 43.2 Implementation Components

#### Routes
- `/account/consents` - Consent preferences

#### Key Components
- `ConsentToggle` - Consent checkbox
- `CookieConsent` - Cookie banner
- `PrivacyPreferences` - Preference center

---

# Part V: Logistics & Delivery Models

---

## 44. Standard Shipping

### 44.1 Data Models

```typescript
// Shipping Option
interface ShippingOption {
  id: string;
  name: string;
  description?: string;
  price: number;
  currency_code: string;
  estimated_days_min: number;
  estimated_days_max: number;
  carrier?: string;
  service_level?: string;
}

// Shipment
interface Shipment {
  id: string;
  order_id: string;
  carrier: string;
  service: string;
  tracking_number?: string;
  tracking_url?: string;
  status: 'pending' | 'label_created' | 'in_transit' | 'out_for_delivery' | 'delivered' | 'exception';
  estimated_delivery?: string;
  shipped_at?: string;
  delivered_at?: string;
  items: ShipmentItem[];
  label_url?: string;
}
```

---

## 45. Same-Day / Express Delivery

### 45.1 Data Models

```typescript
// Express Delivery Option
interface ExpressDeliveryOption extends ShippingOption {
  cutoff_time: string; // HH:mm
  delivery_window: {
    start: string;
    end: string;
  };
  coverage_zones: string[];
  surcharge?: number;
}

// Driver Model
interface Driver {
  id: string;
  name: string;
  phone: string;
  photo_url?: string;
  vehicle_type: string;
  current_location?: Coordinates;
  status: 'available' | 'on_delivery' | 'offline';
}
```

### 45.2 Implementation Components

#### Key Components
- `DriverCard` - Driver information
- `LiveMap` - Real-time location
- `EstimatedArrival` - ETA display

---

## 46. Store Pickup (BOPIS)

### 46.1 Data Models

```typescript
// Pickup Order
interface PickupOrder {
  id: string;
  order_id: string;
  location_id: string;
  status: 'pending' | 'preparing' | 'ready' | 'picked_up' | 'cancelled';
  pickup_person: {
    name: string;
    email: string;
    phone?: string;
  };
  ready_at?: string;
  picked_up_at?: string;
  pickup_code?: string;
  notes?: string;
}
```

### 46.2 Implementation Components

#### Key Components
- `StoreAvailability` - Check stock at stores
- `StoreLocator` - Find pickup locations
- `PickupInstructions` - Pickup info

---

## 47. Delivery Slots & Scheduling

### 47.1 Data Models

```typescript
// Delivery Slot
interface DeliverySlot {
  id: string;
  date: string;
  start_time: string;
  end_time: string;
  capacity: number;
  booked: number;
  available: boolean;
  price?: number;
  zone_id?: string;
}

// Scheduled Delivery
interface ScheduledDelivery {
  id: string;
  order_id: string;
  slot_id: string;
  date: string;
  time_window: {
    start: string;
    end: string;
  };
  instructions?: string;
  status: 'scheduled' | 'confirmed' | 'in_transit' | 'delivered' | 'failed';
}
```

### 47.2 Implementation Components

#### Routes
- `/delivery-slots` - Slot selection

#### Key Components
- `DeliverySlotPicker` - Date/time selection
- `DeliveryInstructions` - Special instructions input

---

## 48. Real-Time Tracking

### 48.1 Data Models

```typescript
// Tracking Event
interface TrackingEvent {
  id: string;
  shipment_id: string;
  status: string;
  description: string;
  location?: string;
  timestamp: string;
}

// Live Tracking
interface LiveTracking {
  shipment_id: string;
  driver_id?: string;
  current_location?: Coordinates;
  eta?: string;
  distance_remaining?: number;
  status: string;
  last_updated: string;
}
```

### 48.2 Implementation Components

#### Routes
- `/track` - Order tracking
- `/account/deliveries` - Delivery history
- `/account/deliveries/$id` - Delivery detail

#### Key Components
- `DeliveryTracker` - Tracking timeline
- `DeliveryTimeline` - Status timeline
- `LiveMap` - Real-time map
- `PackageStatus` - Current status
- `ProofOfDelivery` - Delivery confirmation

---

## 49. Returns & Exchanges

### 49.1 Data Models

```typescript
// Return Request
interface ReturnRequest {
  id: string;
  order_id: string;
  customer_id: string;
  items: ReturnItem[];
  reason: string;
  reason_category: 'wrong_item' | 'damaged' | 'not_as_described' | 'changed_mind' | 'too_large' | 'too_small' | 'other';
  status: 'pending' | 'approved' | 'rejected' | 'shipped' | 'received' | 'processed' | 'completed';
  refund_method: 'original_payment' | 'store_credit' | 'exchange';
  exchange_for?: string;
  shipping_label_url?: string;
  tracking_number?: string;
  photos?: string[];
  notes?: string;
  created_at: string;
}

// Return Item
interface ReturnItem {
  line_item_id: string;
  quantity: number;
  reason?: string;
  condition?: 'unopened' | 'like_new' | 'used' | 'damaged';
}
```

### 49.2 Implementation Components

#### Routes
- `/returns` - Returns policy/landing
- `/returns/create` - Create return request
- `/returns/$id` - Return detail
- `/account/orders` - Order history with return option

#### Key Components
- `ReturnForm` - Return request form
- `ReturnLabelGenerator` - Get shipping label
- `ReturnStatus` - Status tracking
- `ExchangeSelector` - Select exchange item

---

# Part VI: Content & CMS Models

---

## 50. Blog & Articles

### 50.1 Data Models

```typescript
// Blog Post
interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featured_image?: string;
  author: Author;
  categories: string[];
  tags: string[];
  status: 'draft' | 'published' | 'archived';
  published_at?: string;
  reading_time?: number;
  seo: SEOConfig;
}

// Author
interface Author {
  id: string;
  name: string;
  bio?: string;
  avatar?: string;
  social_links?: Record<string, string>;
}
```

### 50.2 Implementation Components

#### Routes
- `/blog` - Blog listing
- `/blog/$slug` - Blog post detail

#### Key Components
- `BlogCard` - Post preview card
- `BlogGrid` - Post listing grid
- `BlogPost` - Full post display
- `AuthorBio` - Author information

---

## 51. FAQ & Help Center

### 51.1 Data Models

```typescript
// FAQ Category
interface FAQCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  questions: FAQ[];
  sort_order: number;
}

// FAQ
interface FAQ {
  id: string;
  question: string;
  answer: string;
  category_id: string;
  helpful_count?: number;
  not_helpful_count?: number;
  sort_order: number;
}

// Help Article
interface HelpArticle {
  id: string;
  title: string;
  slug: string;
  content: string;
  category_id: string;
  related_articles?: string[];
  tags: string[];
}
```

### 51.2 Implementation Components

#### Routes
- `/faq` - FAQ page
- `/help` - Help center

#### Key Components
- `FAQAccordion` - Expandable FAQ
- `FAQSearch` - Search FAQs
- `HelpCategories` - Category navigation

---

## 52. Points of Interest (POI)

### 52.1 Data Models

```typescript
// POI Model
interface POI {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  address: Address;
  coordinates: Coordinates;
  images: string[];
  hours?: OperatingHours[];
  contact?: ContactInfo;
  amenities?: string[];
  rating?: number;
  review_count?: number;
  node_id?: string;
}

// Operating Hours
interface OperatingHours {
  day: number;
  open: string;
  close: string;
  closed?: boolean;
}
```

### 52.2 Implementation Components

#### Routes
- `/poi/$slug` - POI detail

#### Key Components
- `POICard` - POI preview
- `POIGrid` - POI listing
- `POIDetail` - Full POI page
- `POIList` - List view

---

## 53. Dynamic CMS Pages

### 53.1 Data Models

```typescript
// CMS Page
interface CMSPage {
  id: string;
  title: string;
  slug: string;
  template: string;
  sections: PageSection[];
  seo: SEOConfig;
  status: 'draft' | 'published';
  published_at?: string;
}

// Page Section
interface PageSection {
  id: string;
  type: SectionType;
  data: Record<string, any>;
  settings?: SectionSettings;
  sort_order: number;
}

// Section Types
type SectionType = 
  | 'hero'
  | 'features'
  | 'testimonials'
  | 'stats'
  | 'faq'
  | 'cta'
  | 'trust_badges'
  | 'product_grid'
  | 'team'
  | 'timeline'
  | 'pricing'
  | 'gallery'
  | 'text'
  | 'video'
  | 'form';

// SEO Configuration
interface SEOConfig {
  title?: string;
  description?: string;
  keywords?: string[];
  og_image?: string;
  no_index?: boolean;
}
```

### 53.2 Implementation Components

#### Routes
- `/cms/$` - Dynamic CMS pages
- `/about` - About page
- `/terms` - Terms page
- `/privacy` - Privacy page
- `/contact` - Contact page

#### Key Components
- `PageRenderer` - Dynamic page rendering
- `PageSkeleton` - Loading state
- `PageError` - Error display
- CMS Block components for each section type

---

# Part VII: UI Component Patterns

---

## Navigation Patterns

### Components Implemented

| Component | File | Description |
|-----------|------|-------------|
| `Navbar` | `navbar.tsx` | Main navigation with logo, menu, search, cart, account |
| `MegaMenu` | In navbar | 4-column dropdown with categories |
| `MobileMenu` | `drawer.tsx` | Left-slide mobile navigation |
| `Breadcrumbs` | `breadcrumbs.tsx` | Hierarchical navigation |
| `AccountSidebar` | `AccountSidebar.tsx` | Account section navigation |
| `BusinessSidebar` | `BusinessSidebar.tsx` | B2B account navigation |
| `Footer` | `footer.tsx` | Site footer with links, newsletter |
| `PlatformNav` | `PlatformNav.tsx` | Platform-specific navigation |
| `Pagination` | `pagination.tsx` | Page navigation |
| `Tabs` | `tabs.tsx` | Tabbed navigation |
| `QuickLinksBar` | `quick-links-bar.tsx` | Quick action links |
| `SkipLinks` | `skip-links.tsx` | Accessibility skip navigation |

---

## Product Display Patterns

### Components Implemented

| Component | File | Description |
|-----------|------|-------------|
| `ProductCard` | `product-card.tsx` | Product preview card |
| `ImageGallery` | `image-gallery.tsx` | Product image carousel with zoom |
| `ProductVideoGallery` | `product-video-gallery.tsx` | Video showcase |
| `Product360Viewer` | `product-360-viewer.tsx` | 3D rotation viewer |
| `VariantMatrix` | `variant-matrix.tsx` | Size/color selection grid |
| `ProductOptionSelect` | `product-option-select.tsx` | Variant selector |
| `ProductBadges` | `product-badges.tsx` | New, Sale, Bestseller badges |
| `StockUrgency` | `stock-urgency.tsx` | Low stock warnings |
| `ProductLaunchTimer` | `product-launch-timer.tsx` | Launch countdown |
| `Price` | `price.tsx` | Formatted price display |
| `Rating` | `rating.tsx` | Star rating display |
| `QuantitySelector` | `quantity-selector.tsx` | Quantity +/- |
| `ZoomLens` | `zoom-lens.tsx` | Image magnifier |
| `ImageHotspots` | `image-hotspots.tsx` | Clickable product tags |
| `ImageComparison` | `image-comparison.tsx` | Before/after slider |
| `SwatchTooltip` | `swatch-tooltip.tsx` | Color swatch info |
| `MaterialInfo` | `material-info.tsx` | Material specifications |
| `FitFinder` | `fit-finder.tsx` | Size recommendation |
| `SizePredictor` | `size-predictor.tsx` | Sizing guide |
| `ARPreview` | `ar-preview.tsx` | AR try-on preview |

---

## Cart & Checkout Patterns

### Components Implemented

| Component | File | Description |
|-----------|------|-------------|
| `Cart` | `cart.tsx` | Cart drawer/panel |
| `MiniCart` | `mini-cart.tsx` | Cart preview |
| `CartSavings` | `cart-savings.tsx` | Savings display |
| `CheckoutProgress` | `checkout-progress.tsx` | Step indicator |
| `AddressForm` | `address-form.tsx` | Address input |
| `ShippingItemSelector` | `shipping-item-selector.tsx` | Shipping method selection |
| `PaymentContainer` | `payment-container.tsx` | Payment wrapper |
| `PaymentButton` | `payment-button.tsx` | Payment submit |
| `StripeCardContainer` | `stripe-card-container.tsx` | Stripe elements |
| `CheckoutTrustSignals` | `checkout-trust-signals.tsx` | Security badges |
| `ExpressCheckout` | `express-checkout.tsx` | One-click checkout |
| `PaymentMethodsIcons` | `payment-methods-icons.tsx` | Payment logos |
| `GiftOptions` | `gift-options.tsx` | Gift wrapping |
| `OrderNotes` | `order-notes.tsx` | Special instructions |
| `DeliverySlots` | `delivery-slots.tsx` | Delivery time picker |

---

## Form Patterns

### Components Implemented

| Component | File | Description |
|-----------|------|-------------|
| `Input` | `input.tsx` | Text input |
| `Textarea` | `textarea.tsx` | Multi-line input |
| `Select` | `select.tsx` | Dropdown with search |
| `Checkbox` | `checkbox.tsx` | Checkbox input |
| `Radio` | `radio.tsx` | Radio button |
| `Switch` | `switch.tsx` | Toggle switch |
| `Slider` | `slider.tsx` | Range slider |
| `PasswordStrength` | `password-strength.tsx` | Password meter |
| `DynamicForm` | `DynamicForm.tsx` | Dynamic form renderer |
| `DocumentUploader` | `DocumentUploader.tsx` | File upload |
| `TaxCertificateUpload` | `TaxCertificateUpload.tsx` | Document upload |

---

## Interactive Patterns

### Components Implemented

| Component | File | Description |
|-----------|------|-------------|
| `Modal` | `modal.tsx` | Dialog with sizes |
| `Drawer` | `drawer.tsx` | Slide-out panel |
| `Accordion` | `accordion.tsx` | Expandable sections |
| `Tooltip` | `tooltip.tsx` | Hover tooltips |
| `Popover` | `popover.tsx` | Popover menu |
| `DropdownMenu` | `dropdown-menu.tsx` | Dropdown menu |
| `FocusTrap` | `focus-trap.tsx` | Modal focus management |
| `Stepper` | `stepper.tsx` | Multi-step form |
| `InfiniteScroll` | `infinite-scroll.tsx` | Lazy loading |
| `ContentCarousel` | `content-carousel.tsx` | Sliding content |
| `LookbookSlider` | `lookbook-slider.tsx` | Lookbook carousel |
| `MasonryGrid` | `masonry-grid.tsx` | Masonry layout |
| `ParallaxSection` | `parallax-section.tsx` | Parallax effect |
| `SplitScreen` | `split-screen.tsx` | Two-column layout |
| `ScratchCard` | `scratch-card.tsx` | Interactive scratch-off |

---

## Marketing Patterns

### Components Implemented

| Component | File | Description |
|-----------|------|-------------|
| `HeroBanner` | `HeroBanner.tsx` | Full-width hero |
| `AnnouncementBanner` | `AnnouncementBanner.tsx` | Announcements |
| `FlashSaleBanner` | `FlashSaleBanner.tsx` | Flash sale highlight |
| `FlashSaleBar` | `flash-sale-bar.tsx` | Top bar notification |
| `CountdownTimer` | `CountdownTimer.tsx` | Time remaining |
| `WelcomeDiscount` | `welcome-discount.tsx` | First-time offer |
| `WaitlistSignup` | `waitlist-signup.tsx` | Waitlist entry |
| `ReferralWidget` | `referral-widget.tsx` | Referral prompt |
| `ReferralShareButtons` | `ReferralShareButtons.tsx` | Social sharing |
| `AffiliateBanner` | `affiliate-banner.tsx` | Affiliate promo |
| `Newsletter` | `newsletter.tsx` | Email subscription |
| `InstagramFeed` | `instagram-feed.tsx` | Social feed |
| `UGCGallery` | `ugc-gallery.tsx` | User content |

---

## Trust & Social Proof Patterns

### Components Implemented

| Component | File | Description |
|-----------|------|-------------|
| `Badge` | `badge.tsx` | Status badges |
| `VerifiedBadge` | `VerifiedBadge.tsx` | Verified indicator |
| `StarRating` | `StarRating.tsx` | Interactive rating |
| `ReviewCard` | `ReviewCard.tsx` | Review display |
| `ReviewStats` | `ReviewStats.tsx` | Review metrics |
| `ReviewFilters` | `ReviewFilters.tsx` | Filter reviews |
| `ReviewGallery` | `ReviewGallery.tsx` | Photo reviews |
| `PhotoReviews` | `photo-reviews.tsx` | User photos |
| `VendorRating` | `VendorRating.tsx` | Seller rating |
| `TrustSignals` | `checkout-trust-signals.tsx` | Security badges |

---

## Loading & Error Patterns

### Components Implemented

| Component | File | Description |
|-----------|------|-------------|
| `Skeleton` | `skeleton.tsx` | Loading skeletons |
| `Loading` | `loading.tsx` | Spinner/loading |
| `Spinner` | In loading.tsx | Animated spinner |
| `LoadingOverlay` | In loading.tsx | Full-page loading |
| `PageSkeleton` | `PageSkeleton.tsx` | Page loading state |
| `ErrorBoundary` | `error-boundary.tsx` | React error boundary |
| `ErrorFallback` | `error-fallback.tsx` | Error display |
| `PageError` | `PageError.tsx` | Page-level error |
| `Alert` | `alert.tsx` | Alert messages |

---

# Part VIII: Data Models & Architecture

---

## Core Data Models

### Complete Type Definitions

All core types are defined in:
- `/lib/types/global.ts` - Global types
- `/lib/cms/types.ts` - CMS types
- `/lib/cityos/types.ts` - Platform types
- `/lib/payload/types.ts` - Payload CMS types
- `/lib/hooks/*.ts` - Domain-specific types

---

## API Architecture

### Data Fetching Patterns

```typescript
// Query Hook Pattern
export function useProducts(options?: ProductQueryOptions) {
  return useInfiniteQuery({
    queryKey: queryKeys.products.list(options),
    queryFn: ({ pageParam }) => listProducts({ ...options, offset: pageParam }),
    getNextPageParam: (lastPage) => lastPage.nextOffset,
    initialPageParam: 0,
  });
}

// Mutation Hook Pattern
export function useAddToCart() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ cartId, variantId, quantity }) => 
      addToCart(cartId, variantId, quantity),
    onMutate: async (variables) => {
      // Optimistic update
      await queryClient.cancelQueries({ queryKey: queryKeys.cart.detail(variables.cartId) });
      const previousCart = queryClient.getQueryData(queryKeys.cart.detail(variables.cartId));
      queryClient.setQueryData(
        queryKeys.cart.detail(variables.cartId),
        (old) => addItemOptimistically(old, variables)
      );
      return { previousCart };
    },
    onError: (err, variables, context) => {
      // Rollback on error
      queryClient.setQueryData(
        queryKeys.cart.detail(variables.cartId),
        context?.previousCart
      );
    },
    onSettled: (data, error, variables) => {
      // Refetch after mutation
      queryClient.invalidateQueries({ queryKey: queryKeys.cart.detail(variables.cartId) });
    },
  });
}
```

---

## State Management

### Context Providers

| Context | Purpose |
|---------|---------|
| `CityOSProvider` | Multi-tenant platform context |
| `ThemeProvider` | Theme management |
| `CustomerContext` | Customer authentication |
| `ToastProvider` | Toast notifications |
| `CartContext` | Cart state |

---

## Caching Strategy

### Multi-Level Caching

1. **React Query Cache**
   - In-memory cache
   - Automatic background refetching
   - Optimistic updates

2. **API Client Cache**
   - In-memory with TTL (60s default)
   - Pattern-based invalidation

3. **LocalStorage**
   - Cart persistence
   - Theme preference
   - Locale preference

---

# Appendix A: Implementation Checklist

## Complete Feature Checklist

### Commerce Models
- [x] Direct-to-Consumer (DTC)
- [x] Subscription Commerce
- [x] Marketplace
- [x] B2B (Business-to-Business)
- [x] Wholesale
- [x] Dropshipping
- [x] White Label / Private Label
- [x] Print-on-Demand
- [x] Rental / Leasing
- [x] Recommerce / Resale / Trade-In
- [x] Social Commerce
- [x] Headless Commerce
- [x] Omnichannel Commerce
- [x] Flash Sales / Daily Deals
- [x] Freemium Commerce
- [x] Bundling Commerce
- [x] Affiliate Commerce
- [x] Crowdfunding / Pre-order
- [x] Membership / VIP Commerce
- [x] Hybrid Commerce Models

### Alternative Models
- [x] Try-Before-You-Buy (TBYB)
- [x] Consignment
- [x] Auctions
- [x] Services & Bookings
- [x] Digital Products & Downloads
- [x] Events & Ticketing
- [x] Gift Cards & Vouchers
- [x] Referral Commerce
- [x] Loyalty & Rewards
- [x] Multi-Tenant Platform

### Payment Models
- [x] Digital Wallet
- [x] Buy Now Pay Later (BNPL)
- [x] Installment Plans
- [x] Store Credits
- [x] Escrow Payments
- [x] Invoicing & Net Terms
- [x] Disputes & Refunds
- [x] Multi-Currency

### Identity Models
- [x] KYC (Know Your Customer)
- [x] Age Verification
- [x] Residency Verification
- [x] Digital Identity Wallet
- [x] Consent Management

### Logistics Models
- [x] Standard Shipping
- [x] Same-Day / Express Delivery
- [x] Store Pickup (BOPIS)
- [x] Delivery Slots & Scheduling
- [x] Real-Time Tracking
- [x] Returns & Exchanges

### Content Models
- [x] Blog & Articles
- [x] FAQ & Help Center
- [x] Points of Interest (POI)
- [x] Dynamic CMS Pages

---

# Appendix B: File Structure

```
apps/storefront/src/
|-- routes/
|   |-- $countryCode/
|   |   |-- index.tsx                  # Homepage
|   |   |-- store.tsx                  # Product catalog
|   |   |-- products/$handle.tsx       # Product detail
|   |   |-- cart.tsx                   # Cart
|   |   |-- checkout.tsx               # Checkout
|   |   |-- account/                   # Account routes (40+ pages)
|   |   |-- business/                  # B2B routes (10+ pages)
|   |   |-- vendors/                   # Marketplace routes
|   |   |-- services/                  # Service routes
|   |   |-- subscriptions/             # Subscription routes
|   |   |-- rentals/                   # Rental routes
|   |   |-- auctions/                  # Auction routes
|   |   |-- bundles/                   # Bundle routes
|   |   |-- campaigns/                 # Campaign routes
|   |   |-- events/                    # Event routes
|   |   |-- preorders/                 # Pre-order routes
|   |   |-- trade-in/                  # Trade-in routes
|   |   |-- try-before-you-buy/        # TBYB routes
|   |   |-- consignment/               # Consignment routes
|   |   |-- memberships/               # Membership routes
|   |   |-- verify/                    # Verification routes
|   |   |-- returns/                   # Returns routes
|   |   |-- cms/                       # CMS routes
|   |   |-- ... (30+ more route files)
|
|-- components/
|   |-- ui/                            # 100+ UI primitives
|   |-- account/                       # Account components
|   |-- b2b/                           # B2B components
|   |-- bookings/                      # Booking components
|   |-- cms/                           # CMS components
|   |-- content/                       # Content components
|   |-- delivery/                      # Delivery components
|   |-- digital/                       # Digital product components
|   |-- finance/                       # Finance components
|   |-- identity/                      # Identity components
|   |-- invoices/                      # Invoice components
|   |-- marketplace/                   # Marketplace components
|   |-- navigation/                    # Navigation components
|   |-- payments/                      # Payment components
|   |-- platform/                      # Platform components
|   |-- promotions/                    # Promotion components
|   |-- reviews/                       # Review components
|   |-- subscriptions/                 # Subscription components
|   |-- wishlists/                     # Wishlist components
|   |-- ... (core components)
|
|-- lib/
|   |-- hooks/                         # 15+ hook files
|   |-- data/                          # Data fetching functions
|   |-- utils/                         # Utility functions
|   |-- context/                       # Context providers
|   |-- cms/                           # CMS integration
|   |-- cityos/                        # Platform integration
|   |-- payload/                       # Payload CMS client
|   |-- mock/                          # Mock data
|   |-- theme/                         # Theme system
|   |-- types/                         # Type definitions
```

---

# Appendix C: Component Count Summary

| Category | Count |
|----------|-------|
| Routes/Pages | 130+ |
| UI Components | 100+ |
| Domain Components | 150+ |
| Hooks | 80+ |
| Data Functions | 50+ |
| Type Definitions | 200+ |
| **Total** | **700+** |

---

# Appendix D: Technology Stack

| Layer | Technology |
|-------|------------|
| Frontend Framework | TanStack Start (React) |
| Styling | Tailwind CSS |
| State Management | React Query (TanStack Query) |
| Routing | TanStack Router |
| Commerce Backend | Medusa 2.0 |
| CMS | Payload CMS |
| Icons | @medusajs/icons |
| Payments | Stripe |
| Type System | TypeScript |

---

**Document Version:** 2.0  
**Total Models Documented:** 53  
**Total Components Documented:** 300+  
**Total Data Models Documented:** 100+
