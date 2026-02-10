# Commerce Models Design Document

## Complete Reference Guide for E-Commerce Business Models

**Version:** 1.0  
**Last Updated:** 2025  
**Purpose:** Comprehensive design specifications for implementing 20 commerce models

---

## Table of Contents

1. [Direct-to-Consumer (DTC)](#1-direct-to-consumer-dtc)
2. [Subscription Commerce](#2-subscription-commerce)
3. [Marketplace](#3-marketplace)
4. [B2B (Business-to-Business)](#4-b2b-business-to-business)
5. [Wholesale](#5-wholesale)
6. [Dropshipping](#6-dropshipping)
7. [White Label / Private Label](#7-white-label--private-label)
8. [Print-on-Demand](#8-print-on-demand)
9. [Rental / Leasing](#9-rental--leasing)
10. [Recommerce / Resale](#10-recommerce--resale)
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

---

## 1. Direct-to-Consumer (DTC)

### 1.1 Overview

**Definition:** A business model where brands manufacture and sell products directly to end consumers, bypassing traditional retail intermediaries like wholesalers, distributors, and retailers.

**Core Value Proposition:**
- Complete control over brand experience
- Direct customer relationships and data ownership
- Higher profit margins
- Faster feedback loops for product development

### 1.2 Business Model Canvas

```
+------------------+------------------+------------------+
|  Key Partners    |  Key Activities  | Value Proposition|
|------------------|------------------|------------------|
| - Manufacturers  | - Product dev    | - Authentic brand|
| - Logistics      | - Marketing      |   experience     |
| - Payment proc.  | - Customer svc   | - Quality control|
| - Tech providers | - Fulfillment    | - Fair pricing   |
+------------------+------------------+------------------+
|  Key Resources   |                  | CustomerRels    |
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
+------------------+------------------+------------------+
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

#### Customer Lifecycle Flow
```
[Awareness] -> [Consideration] -> [Purchase] -> [Retention] -> [Advocacy]
     |               |                |              |              |
     v               v                v              v              v
  Ads/Social    Product Pages     Checkout      Reorders      Reviews
  Content       Comparisons       Experience    Email mkt     Referrals
  SEO           Reviews           Unboxing      Loyalty       UGC
```

### 1.4 Technical Architecture

```
+------------------------------------------------------------------+
|                        FRONTEND LAYER                             |
|------------------------------------------------------------------|
|  Storefront (Web)  |  Mobile App  |  Progressive Web App (PWA)   |
+------------------------------------------------------------------+
                              |
                              v
+------------------------------------------------------------------+
|                         API LAYER                                 |
|------------------------------------------------------------------|
|  REST APIs  |  GraphQL  |  Webhooks  |  Real-time (WebSockets)   |
+------------------------------------------------------------------+
                              |
                              v
+------------------------------------------------------------------+
|                      COMMERCE ENGINE                              |
|------------------------------------------------------------------|
|  Product    |  Order      |  Customer   |  Inventory  |  Pricing |
|  Catalog    |  Management |  Management |  Management |  Engine  |
+------------------------------------------------------------------+
                              |
                              v
+------------------------------------------------------------------+
|                    INTEGRATION LAYER                              |
|------------------------------------------------------------------|
|  Payment    |  Shipping   |  Email/SMS  |  Analytics  |  CRM     |
|  Gateways   |  Carriers   |  Providers  |  Platforms  |  Systems |
+------------------------------------------------------------------+
                              |
                              v
+------------------------------------------------------------------+
|                      DATA LAYER                                   |
|------------------------------------------------------------------|
|  Product DB  |  Order DB  |  Customer DB  |  Analytics DB  | CDN |
+------------------------------------------------------------------+
```

### 1.5 Data Models

#### Product Model
```typescript
interface Product {
  id: string;
  title: string;
  handle: string;
  description: string;
  status: 'draft' | 'published' | 'archived';
  
  // Categorization
  categories: Category[];
  collections: Collection[];
  tags: string[];
  
  // Variants & Options
  options: ProductOption[];
  variants: ProductVariant[];
  
  // Media
  images: ProductImage[];
  thumbnail: string;
  
  // Pricing
  prices: Price[];
  
  // Inventory
  inventoryQuantity: number;
  allowBackorder: boolean;
  
  // SEO
  metaTitle: string;
  metaDescription: string;
  
  // Timestamps
  createdAt: Date;
  updatedAt: Date;
}

interface ProductVariant {
  id: string;
  title: string;
  sku: string;
  barcode: string;
  
  options: OptionValue[];
  prices: Price[];
  
  inventoryQuantity: number;
  manageInventory: boolean;
  allowBackorder: boolean;
  
  weight: number;
  dimensions: {
    length: number;
    width: number;
    height: number;
  };
}
```

#### Customer Model
```typescript
interface Customer {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  
  // Authentication
  hasAccount: boolean;
  passwordHash: string;
  
  // Addresses
  addresses: Address[];
  defaultShippingAddress: Address;
  defaultBillingAddress: Address;
  
  // Order History
  orders: Order[];
  totalSpent: number;
  orderCount: number;
  
  // Marketing
  acceptsMarketing: boolean;
  marketingOptInLevel: string;
  
  // Segmentation
  tags: string[];
  groups: CustomerGroup[];
  
  // Timestamps
  createdAt: Date;
  updatedAt: Date;
  lastOrderAt: Date;
}
```

#### Order Model
```typescript
interface Order {
  id: string;
  displayId: number;
  status: OrderStatus;
  
  // Customer
  customerId: string;
  email: string;
  
  // Items
  items: LineItem[];
  
  // Pricing
  subtotal: number;
  shippingTotal: number;
  discountTotal: number;
  taxTotal: number;
  total: number;
  currency: string;
  
  // Addresses
  shippingAddress: Address;
  billingAddress: Address;
  
  // Fulfillment
  fulfillmentStatus: FulfillmentStatus;
  fulfillments: Fulfillment[];
  
  // Payment
  paymentStatus: PaymentStatus;
  payments: Payment[];
  
  // Discounts
  discounts: Discount[];
  
  // Timestamps
  createdAt: Date;
  updatedAt: Date;
  canceledAt: Date;
}
```

### 1.6 Key Features & Components

#### Homepage Components
```
+------------------------------------------------------------------+
|  NAVIGATION BAR                                                   |
|  Logo | Categories | Search | Account | Cart                      |
+------------------------------------------------------------------+
|  HERO SECTION                                                     |
|  - Full-width imagery or video                                    |
|  - Brand message / Value proposition                              |
|  - Primary CTA                                                    |
+------------------------------------------------------------------+
|  FEATURED PRODUCTS / NEW ARRIVALS                                 |
|  - Product cards with quick-add                                   |
|  - Carousel or grid layout                                        |
+------------------------------------------------------------------+
|  CATEGORY SHOWCASE                                                |
|  - Visual category cards                                          |
|  - Link to collection pages                                       |
+------------------------------------------------------------------+
|  SOCIAL PROOF                                                     |
|  - Customer reviews / testimonials                                |
|  - Press mentions / Awards                                        |
|  - User-generated content                                         |
+------------------------------------------------------------------+
|  BRAND STORY                                                      |
|  - Mission / Values                                               |
|  - Sustainability / Quality messaging                             |
+------------------------------------------------------------------+
|  NEWSLETTER SIGNUP                                                |
|  - Email capture                                                  |
|  - Incentive offer                                                |
+------------------------------------------------------------------+
|  FOOTER                                                           |
|  - Navigation links                                               |
|  - Contact info                                                   |
|  - Social links                                                   |
|  - Legal links                                                    |
+------------------------------------------------------------------+
```

#### Product Detail Page Components
```
+------------------------------------------------------------------+
|  BREADCRUMB NAVIGATION                                            |
+------------------------------------------------------------------+
|  +------------------------+  +--------------------------------+   |
|  |                        |  |  PRODUCT TITLE                 |   |
|  |    PRODUCT GALLERY     |  |  Brand name                    |   |
|  |                        |  |  Rating (stars + count)        |   |
|  |    [Main Image]        |  |--------------------------------|   |
|  |                        |  |  PRICE                         |   |
|  |    [Thumbnails]        |  |  $XX.XX (compare at $XX.XX)    |   |
|  |                        |  |--------------------------------|   |
|  +------------------------+  |  VARIANT SELECTORS             |   |
|                              |  - Size                        |   |
|                              |  - Color                       |   |
|                              |--------------------------------|   |
|                              |  QUANTITY SELECTOR             |   |
|                              |--------------------------------|   |
|                              |  [ADD TO CART] Button          |   |
|                              |  [BUY NOW] Button              |   |
|                              |--------------------------------|   |
|                              |  TRUST BADGES                  |   |
|                              |  - Free shipping               |   |
|                              |  - Returns policy              |   |
|                              |  - Secure checkout             |   |
|                              +--------------------------------+   |
+------------------------------------------------------------------+
|  PRODUCT TABS                                                     |
|  - Description | Specifications | Reviews | FAQs                 |
+------------------------------------------------------------------+
|  RELATED PRODUCTS                                                 |
|  - "You may also like"                                            |
|  - "Frequently bought together"                                   |
+------------------------------------------------------------------+
```

### 1.7 UI/UX Requirements

#### Design Principles
1. **Brand-First:** Every touchpoint reinforces brand identity
2. **Simplicity:** Remove friction from purchase journey
3. **Trust:** Build confidence through transparency
4. **Mobile-First:** Optimize for mobile shopping
5. **Speed:** Fast load times critical for conversion

#### Key Metrics to Design For
| Metric | Target | Design Impact |
|--------|--------|---------------|
| Conversion Rate | 2-4% | Simplified checkout, clear CTAs |
| Cart Abandonment | <70% | Trust signals, progress indicators |
| Bounce Rate | <40% | Engaging hero, fast load times |
| Time on Site | 3-5 min | Quality content, easy navigation |
| Pages per Session | 4-6 | Clear navigation, recommendations |

#### Responsive Breakpoints
```css
/* Mobile First Approach */
/* Base: 0-639px (Mobile) */
/* sm: 640px-767px (Large Mobile) */
/* md: 768px-1023px (Tablet) */
/* lg: 1024px-1279px (Desktop) */
/* xl: 1280px-1535px (Large Desktop) */
/* 2xl: 1536px+ (Extra Large) */
```

### 1.8 Implementation Checklist

#### Phase 1: Foundation
- [ ] Product catalog setup
- [ ] Basic storefront pages (home, collection, product, cart)
- [ ] Checkout flow implementation
- [ ] Payment gateway integration
- [ ] Order management basics

#### Phase 2: Enhancement
- [ ] Customer accounts
- [ ] Search & filtering
- [ ] Reviews & ratings
- [ ] Email notifications
- [ ] Analytics integration

#### Phase 3: Optimization
- [ ] SEO optimization
- [ ] Performance optimization
- [ ] A/B testing setup
- [ ] Personalization
- [ ] Advanced analytics

#### Phase 4: Growth
- [ ] Loyalty program
- [ ] Referral program
- [ ] Advanced marketing automation
- [ ] International expansion
- [ ] Mobile app

---

## 2. Subscription Commerce

### 2.1 Overview

**Definition:** A business model where customers pay a recurring fee at regular intervals (weekly, monthly, annually) in exchange for products or services.

**Subscription Types:**
1. **Replenishment:** Auto-delivery of consumable products
2. **Curation:** Curated selection of products delivered regularly
3. **Access:** Membership providing exclusive access/benefits

### 2.2 Business Model Canvas

```
+------------------+------------------+------------------+
|  Key Partners    |  Key Activities  | Value Proposition|
|------------------|------------------|------------------|
| - Product        | - Curation/      | - Convenience    |
|   suppliers      |   Selection      | - Discovery      |
| - Fulfillment    | - Retention      | - Value/Savings  |
| - Payment proc.  |   marketing      | - Personalization|
| - Analytics      | - Churn analysis | - Exclusivity    |
+------------------+------------------+------------------+
|  Key Resources   |                  | CustomerRels    |
|------------------|                  |------------------|
| - Subscriber     |                  | - Ongoing comms  |
|   data           |                  | - Feedback loops |
| - Curation       |                  | - Community      |
|   expertise      |                  | - Customization  |
| - Retention      |                  |   options        |
|   systems        |                  |                  |
+------------------+------------------+------------------+
|  Cost Structure                     | Revenue Streams  |
|-------------------------------------|------------------|
| - Product/inventory costs           | - Recurring fees |
| - Customer acquisition (CAC)        | - One-time adds  |
| - Fulfillment & packaging           | - Gift subs      |
| - Platform & technology             | - Upgrades       |
+-------------------------------------+------------------+
```

### 2.3 User Flows

#### Subscription Signup Flow
```
[Landing Page] -> [Plan Selection] -> [Customization] -> [Account Creation]
                         |                   |                   |
                         v                   v                   v
                   Choose tier         Select preferences    Email/Password
                   Choose frequency    Choose products       Address
                   View pricing        Answer quiz           Payment info
                                                                  |
                                                                  v
                                                          [Confirmation]
                                                                  |
                                                                  v
                                                          [Welcome Email]
                                                                  |
                                                                  v
                                                          [First Delivery]
```

#### Subscription Management Flow
```
[Account Dashboard]
        |
        +-> [View Upcoming Deliveries] -> [Modify] -> [Confirm Changes]
        |
        +-> [Skip Delivery] -> [Select Date] -> [Confirm Skip]
        |
        +-> [Swap Products] -> [Browse Options] -> [Confirm Swap]
        |
        +-> [Change Frequency] -> [Select New Interval] -> [Confirm]
        |
        +-> [Update Payment] -> [Enter New Method] -> [Verify]
        |
        +-> [Pause Subscription] -> [Select Duration] -> [Confirm Pause]
        |
        +-> [Cancel Subscription] -> [Retention Offer] -> [Exit Survey]
```

### 2.4 Technical Architecture

```
+------------------------------------------------------------------+
|                     SUBSCRIPTION LAYER                            |
|------------------------------------------------------------------|
|  Plan         |  Billing      |  Delivery     |  Retention       |
|  Management   |  Engine       |  Scheduler    |  Engine          |
+------------------------------------------------------------------+
                              |
                              v
+------------------------------------------------------------------+
|                     CORE COMPONENTS                               |
|------------------------------------------------------------------|
|  Subscription  |  Recurring    |  Dunning     |  Analytics       |
|  Records       |  Payments     |  Management  |  & Reporting     |
+------------------------------------------------------------------+
                              |
                              v
+------------------------------------------------------------------+
|                     DATA MODELS                                   |
|------------------------------------------------------------------|
|  Plans  |  Subscriptions  |  Billing Cycles  |  Payment Methods |
+------------------------------------------------------------------+
```

### 2.5 Data Models

#### Subscription Plan Model
```typescript
interface SubscriptionPlan {
  id: string;
  name: string;
  description: string;
  
  // Pricing
  price: number;
  currency: string;
  billingInterval: 'weekly' | 'monthly' | 'quarterly' | 'annually';
  billingIntervalCount: number;
  
  // Trial
  trialPeriodDays: number;
  
  // Products
  products: SubscriptionProduct[];
  isCustomizable: boolean;
  maxProducts: number;
  
  // Features
  features: string[];
  
  // Status
  isActive: boolean;
  
  // Timestamps
  createdAt: Date;
  updatedAt: Date;
}

interface SubscriptionProduct {
  productId: string;
  quantity: number;
  isRequired: boolean;
  isSwappable: boolean;
  swapOptions: string[]; // Product IDs
}
```

#### Customer Subscription Model
```typescript
interface CustomerSubscription {
  id: string;
  customerId: string;
  planId: string;
  
  // Status
  status: 'active' | 'paused' | 'cancelled' | 'past_due' | 'trialing';
  
  // Billing
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  nextBillingDate: Date;
  
  // Payment
  paymentMethodId: string;
  
  // Customization
  selectedProducts: SelectedProduct[];
  preferences: SubscriptionPreferences;
  
  // Shipping
  shippingAddressId: string;
  
  // History
  billingHistory: BillingRecord[];
  deliveryHistory: DeliveryRecord[];
  
  // Retention
  pauseCount: number;
  skipCount: number;
  
  // Timestamps
  startedAt: Date;
  cancelledAt: Date;
  pausedAt: Date;
  resumesAt: Date;
}

interface BillingRecord {
  id: string;
  subscriptionId: string;
  amount: number;
  currency: string;
  status: 'succeeded' | 'failed' | 'pending' | 'refunded';
  invoiceUrl: string;
  paidAt: Date;
  failureReason: string;
}
```

### 2.6 Key Features & Components

#### Subscription Landing Page
```
+------------------------------------------------------------------+
|  HERO SECTION                                                     |
|  - Value proposition                                              |
|  - "How it works" summary                                         |
|  - Primary CTA: "Get Started"                                     |
+------------------------------------------------------------------+
|  HOW IT WORKS                                                     |
|  [1. Choose Plan] -> [2. Customize] -> [3. Receive] -> [4. Enjoy] |
+------------------------------------------------------------------+
|  PLAN COMPARISON                                                  |
|  +----------------+  +----------------+  +----------------+       |
|  |  BASIC         |  |  STANDARD      |  |  PREMIUM       |       |
|  |  $X/month      |  |  $XX/month     |  |  $XXX/month    |       |
|  |  - Feature 1   |  |  - Feature 1   |  |  - Feature 1   |       |
|  |  - Feature 2   |  |  - Feature 2   |  |  - Feature 2   |       |
|  |                |  |  - Feature 3   |  |  - Feature 3   |       |
|  |                |  |                |  |  - Feature 4   |       |
|  |  [Select]      |  |  [Select]      |  |  [Select]      |       |
|  +----------------+  +----------------+  +----------------+       |
+------------------------------------------------------------------+
|  SOCIAL PROOF                                                     |
|  - Subscriber count                                               |
|  - Testimonials                                                   |
|  - Unboxing photos/videos                                         |
+------------------------------------------------------------------+
|  FAQs                                                             |
|  - Shipping questions                                             |
|  - Cancellation policy                                            |
|  - Customization options                                          |
+------------------------------------------------------------------+
```

#### Subscriber Dashboard
```
+------------------------------------------------------------------+
|  WELCOME BACK, [NAME]                                             |
|  Subscriber since [DATE] | [PLAN NAME]                            |
+------------------------------------------------------------------+
|  NEXT DELIVERY                                                    |
|  +------------------------------------------------------------+  |
|  |  Arriving: [DATE]                                           |  |
|  |  +----------+  +----------+  +----------+                   |  |
|  |  | Product 1|  | Product 2|  | Product 3|                   |  |
|  |  +----------+  +----------+  +----------+                   |  |
|  |  [Swap Items]  [Skip This Delivery]  [Edit Delivery Date]   |  |
|  +------------------------------------------------------------+  |
+------------------------------------------------------------------+
|  QUICK ACTIONS                                                    |
|  [Manage Products] [Update Payment] [Change Address] [Gift Sub]   |
+------------------------------------------------------------------+
|  DELIVERY HISTORY                                                 |
|  | Date       | Status    | Items | Actions                  |   |
|  |------------|-----------|-------|--------------------------|   |
|  | Jan 2025   | Delivered | 5     | [View] [Reorder]        |   |
|  | Dec 2024   | Delivered | 5     | [View] [Reorder]        |   |
+------------------------------------------------------------------+
|  BILLING                                                          |
|  Next charge: $XX.XX on [DATE]                                    |
|  [View Invoices] [Update Payment Method]                          |
+------------------------------------------------------------------+
```

### 2.7 Retention Features

#### Churn Prevention Triggers
```
+------------------+---------------------------+------------------------+
| Trigger          | Action                    | Timing                 |
+------------------+---------------------------+------------------------+
| Skip 2+ times    | Offer pause option        | After 2nd skip         |
| Failed payment   | Dunning email sequence    | Day 1, 3, 7, 14        |
| Cancel intent    | Retention offer modal     | Before cancellation    |
| Low engagement   | Re-engagement campaign    | 30 days no login       |
| Anniversary      | Loyalty reward            | 6 month, 1 year        |
+------------------+---------------------------+------------------------+
```

#### Cancellation Flow with Retention
```
[Cancel Request]
       |
       v
[Exit Survey] --> "Why are you cancelling?"
       |
       +-> Too expensive --> [Offer discount/downgrade]
       |
       +-> Don't use enough --> [Offer pause/reduce frequency]
       |
       +-> Product quality --> [Offer exchange/feedback]
       |
       +-> Other reason --> [Offer contact support]
       |
       v
[Retention Offer Accepted?]
       |
       +-> Yes --> [Update subscription] --> [Thank you]
       |
       +-> No --> [Confirm cancellation] --> [Win-back email scheduled]
```

### 2.8 Key Metrics

| Metric | Definition | Target | Calculation |
|--------|------------|--------|-------------|
| MRR | Monthly Recurring Revenue | Growth | Sum of monthly subscription values |
| Churn Rate | % subscribers lost | <5%/mo | Lost / Starting subscribers |
| LTV | Customer Lifetime Value | 3x+ CAC | ARPU x Average lifetime |
| CAC | Customer Acquisition Cost | <LTV/3 | Marketing spend / New subs |
| ARPU | Avg Revenue Per User | Increase | Total revenue / Total subs |

### 2.9 Implementation Checklist

#### Phase 1: Core Subscription
- [ ] Subscription plan configuration
- [ ] Recurring billing integration
- [ ] Subscription signup flow
- [ ] Basic subscriber dashboard
- [ ] Order generation from subscriptions

#### Phase 2: Management
- [ ] Skip/pause functionality
- [ ] Product swapping
- [ ] Frequency changes
- [ ] Payment method updates
- [ ] Cancellation flow

#### Phase 3: Retention
- [ ] Dunning management
- [ ] Retention offers
- [ ] Exit surveys
- [ ] Win-back campaigns
- [ ] Loyalty rewards

---

## 3. Marketplace

### 3.1 Overview

**Definition:** A platform that connects multiple third-party sellers with buyers, facilitating transactions between them while typically not holding inventory.

**Marketplace Types:**
1. **Horizontal:** Wide range of products/categories (Amazon, eBay)
2. **Vertical:** Specialized in specific niche (Etsy, StockX)
3. **Service:** Connects service providers with customers (Airbnb, Uber)
4. **Hybrid:** Combination of own inventory + third-party sellers

### 3.2 Business Model Canvas

```
+------------------+------------------+------------------+
|  Key Partners    |  Key Activities  | Value Proposition|
|------------------|------------------|------------------|
| - Sellers        | - Seller         | FOR BUYERS:      |
| - Payment proc.  |   recruitment    | - Wide selection |
| - Logistics      | - Quality        | - Price compare  |
|   providers      |   control        | - Trust/safety   |
| - Verification   | - Dispute        |------------------|
|   services       |   resolution     | FOR SELLERS:     |
|                  | - Platform dev   | - Customer access|
|                  |                  | - Infrastructure |
+------------------+------------------+------------------+
|  Key Resources                      | Revenue Streams  |
|-------------------------------------|------------------|
| - Platform technology               | - Transaction fee|
| - Seller network                    | - Listing fees   |
| - Buyer base                        | - Subscription   |
| - Trust & safety systems            | - Advertising    |
| - Data & algorithms                 | - Premium tools  |
+-------------------------------------+------------------+
```

### 3.3 User Flows

#### Buyer Flow
```
[Homepage] -> [Search/Browse] -> [Product Listing] -> [View Seller Profile]
                                        |                      |
                                        v                      v
                               [Compare Options]        [Seller Reviews]
                                        |                      |
                                        +----------+-----------+
                                                   |
                                                   v
                                            [Add to Cart]
                                                   |
                                                   v
                                            [Checkout]
                                                   |
                            +----------------------+----------------------+
                            |                      |                      |
                            v                      v                      v
                    [Single Seller]        [Multi-Seller]         [Split Orders]
                                                   |
                                                   v
                                          [Order Confirmation]
                                                   |
                                                   v
                                          [Track Orders by Seller]
```

#### Seller Flow
```
[Seller Registration] -> [Verification] -> [Store Setup] -> [Product Listing]
                                                                    |
                                                                    v
                                                          [Inventory Management]
                                                                    |
                                          +-------------------------+-----------------+
                                          |                         |                 |
                                          v                         v                 v
                                   [Order Received]         [Manage Pricing]   [Analytics]
                                          |
                                          v
                                   [Fulfill Order]
                                          |
                                          v
                                   [Ship & Track]
                                          |
                                          v
                                   [Payment Released]
```

### 3.4 Technical Architecture

```
+------------------------------------------------------------------+
|                      MARKETPLACE LAYER                            |
|------------------------------------------------------------------|
|  Seller        |  Commission   |  Dispute      |  Review         |
|  Management    |  Engine       |  Resolution   |  System         |
+------------------------------------------------------------------+
                              |
                              v
+------------------------------------------------------------------+
|                      MULTI-TENANT CORE                            |
|------------------------------------------------------------------|
|  Product    |  Order      |  Inventory  |  Shipping   |  Payment |
|  Catalog    |  Splitting  |  Per Seller |  Aggregator |  Split   |
+------------------------------------------------------------------+
                              |
                              v
+------------------------------------------------------------------+
|                      TRUST & SAFETY                               |
|------------------------------------------------------------------|
|  Seller       |  Product    |  Fraud       |  Content           |
|  Verification |  Moderation |  Detection   |  Filtering         |
+------------------------------------------------------------------+
```

### 3.5 Data Models

#### Seller Model
```typescript
interface Seller {
  id: string;
  
  // Business Info
  businessName: string;
  businessType: 'individual' | 'company';
  taxId: string;
  
  // Contact
  email: string;
  phone: string;
  
  // Verification
  verificationStatus: 'pending' | 'verified' | 'rejected' | 'suspended';
  verificationDocuments: Document[];
  verifiedAt: Date;
  
  // Store
  storeName: string;
  storeSlug: string;
  storeDescription: string;
  storeLogo: string;
  storeBanner: string;
  
  // Performance
  rating: number;
  reviewCount: number;
  totalSales: number;
  responseTime: number; // hours
  shipOnTimeRate: number; // percentage
  
  // Financials
  commissionRate: number;
  payoutMethod: PayoutMethod;
  payoutSchedule: 'daily' | 'weekly' | 'biweekly' | 'monthly';
  
  // Status
  status: 'active' | 'inactive' | 'suspended' | 'banned';
  
  // Timestamps
  createdAt: Date;
  updatedAt: Date;
}

interface SellerProduct {
  id: string;
  sellerId: string;
  
  // Product Info (can be linked to master catalog or independent)
  masterProductId?: string;
  title: string;
  description: string;
  
  // Seller-specific
  price: number;
  compareAtPrice: number;
  quantity: number;
  sku: string;
  
  // Shipping
  shippingProfile: ShippingProfile;
  processingTime: number; // days
  
  // Status
  status: 'active' | 'inactive' | 'pending_review' | 'rejected';
  moderationNotes: string;
  
  // Performance
  views: number;
  sales: number;
  conversionRate: number;
}
```

#### Marketplace Order Model
```typescript
interface MarketplaceOrder {
  id: string;
  customerId: string;
  
  // Order totals
  subtotal: number;
  shippingTotal: number;
  taxTotal: number;
  platformFeeTotal: number;
  total: number;
  
  // Split by seller
  sellerOrders: SellerOrder[];
  
  // Timestamps
  createdAt: Date;
}

interface SellerOrder {
  id: string;
  parentOrderId: string;
  sellerId: string;
  
  // Items
  items: LineItem[];
  
  // Financials
  subtotal: number;
  shippingAmount: number;
  taxAmount: number;
  commissionAmount: number;
  sellerPayout: number;
  
  // Status
  status: OrderStatus;
  fulfillmentStatus: FulfillmentStatus;
  
  // Shipping
  shippingMethod: string;
  trackingNumber: string;
  trackingUrl: string;
  
  // Timestamps
  shippedAt: Date;
  deliveredAt: Date;
}
```

### 3.6 Key Features & Components

#### Marketplace Homepage
```
+------------------------------------------------------------------+
|  NAVIGATION                                                       |
|  Logo | Categories | Search | Sell on [Platform] | Account | Cart |
+------------------------------------------------------------------+
|  HERO / PROMOTIONS                                                |
|  - Featured sellers                                               |
|  - Platform promotions                                            |
+------------------------------------------------------------------+
|  CATEGORY NAVIGATION                                              |
|  [Cat 1] [Cat 2] [Cat 3] [Cat 4] [Cat 5] [More]                   |
+------------------------------------------------------------------+
|  TRENDING / FEATURED PRODUCTS                                     |
|  - Product cards with seller info                                 |
|  - Seller rating badge                                            |
+------------------------------------------------------------------+
|  TOP SELLERS                                                      |
|  - Seller cards with stats                                        |
|  - Quick links to stores                                          |
+------------------------------------------------------------------+
|  BUYER PROTECTION INFO                                            |
|  - Trust badges                                                   |
|  - How protection works                                           |
+------------------------------------------------------------------+
```

#### Product Listing (Marketplace)
```
+------------------------------------------------------------------+
|  PRODUCT GALLERY          |  PRODUCT INFO                         |
|                           |  Title                                |
|  [Image]                  |  Price: $XX.XX                        |
|                           |  Shipping: $X.XX (or Free)            |
|  [Thumbs]                 |  ------------------------------------ |
|                           |  SELLER INFO                          |
|                           |  [Logo] Seller Name                   |
|                           |  Rating: 4.8 (1,234 reviews)          |
|                           |  Ships from: Location                 |
|                           |  Response time: < 24 hours            |
|                           |  [Visit Store] [Message Seller]       |
|                           |  ------------------------------------ |
|                           |  [ADD TO CART]                        |
|                           |  [BUY NOW]                            |
+------------------------------------------------------------------+
|  SELLER'S OTHER PRODUCTS                                          |
+------------------------------------------------------------------+
|  COMPARE WITH OTHER SELLERS (if applicable)                       |
|  | Seller      | Price  | Rating | Shipping | Stock |            |
|  |-------------|--------|--------|----------|-------|            |
|  | Seller A    | $XX.XX | 4.8    | Free     | In    |            |
|  | Seller B    | $XX.XX | 4.5    | $3.99    | In    |            |
+------------------------------------------------------------------+
```

#### Seller Dashboard
```
+------------------------------------------------------------------+
|  SELLER DASHBOARD                                                 |
+------------------------------------------------------------------+
|  KEY METRICS                                                      |
|  +------------+  +------------+  +------------+  +------------+   |
|  | Sales      |  | Orders     |  | Views      |  | Rating     |   |
|  | $X,XXX     |  | XX         |  | X,XXX      |  | 4.8        |   |
|  | +XX%       |  | +XX%       |  | +XX%       |  | (XXX)      |   |
|  +------------+  +------------+  +------------+  +------------+   |
+------------------------------------------------------------------+
|  ORDERS REQUIRING ACTION                                          |
|  | Order #    | Date     | Items | Status      | Action       |  |
|  |------------|----------|-------|-------------|--------------|  |
|  | #12345     | Today    | 2     | Pending     | [Ship Now]   |  |
|  | #12344     | Yest.    | 1     | Processing  | [Update]     |  |
+------------------------------------------------------------------+
|  QUICK ACTIONS                                                    |
|  [Add Product] [Manage Inventory] [View Analytics] [Payouts]      |
+------------------------------------------------------------------+
|  PERFORMANCE ALERTS                                               |
|  - Late shipment warning (2 orders)                               |
|  - New review requiring response                                  |
+------------------------------------------------------------------+
```

### 3.7 Commission & Fee Structure

```typescript
interface CommissionStructure {
  // Base commission
  baseRate: number; // e.g., 15%
  
  // Category-specific rates
  categoryRates: {
    categoryId: string;
    rate: number;
  }[];
  
  // Volume discounts
  volumeTiers: {
    minAmount: number;
    rate: number;
  }[];
  
  // Additional fees
  listingFee: number;
  paymentProcessingFee: number;
  paymentProcessingPercentage: number;
}

// Example calculation
function calculateFees(order: SellerOrder, structure: CommissionStructure) {
  const subtotal = order.subtotal;
  
  // Commission
  const commissionRate = getCategoryRate(order.items) || structure.baseRate;
  const commission = subtotal * commissionRate;
  
  // Payment processing
  const paymentFee = structure.paymentProcessingFee + 
                     (subtotal * structure.paymentProcessingPercentage);
  
  // Seller receives
  const sellerPayout = subtotal - commission - paymentFee;
  
  return { commission, paymentFee, sellerPayout };
}
```

### 3.8 Trust & Safety Features

#### Seller Verification Levels
```
Level 1: Basic (Email verified)
  - Limited listings
  - Higher commission
  - Standard support

Level 2: Verified (ID + Business docs)
  - Increased listings
  - Standard commission
  - Priority support
  - Trust badge

Level 3: Premium (Track record + Volume)
  - Unlimited listings
  - Lower commission
  - Dedicated support
  - Premium badge
  - Featured placement
```

#### Dispute Resolution Flow
```
[Issue Reported] -> [Auto-Resolution Attempt] -> [Seller Response Period]
                                                         |
                    +------------------------------------+
                    |                                    |
                    v                                    v
            [Seller Resolves]                   [Escalate to Platform]
                    |                                    |
                    v                                    v
            [Case Closed]                       [Platform Review]
                                                         |
                            +----------------------------+-------------------+
                            |                            |                   |
                            v                            v                   v
                    [Refund Buyer]            [Side with Seller]    [Partial Resolution]
                            |                            |                   |
                            v                            v                   v
                    [Seller Warning]            [Case Closed]       [Both Parties Notified]
```

### 3.9 Implementation Checklist

#### Phase 1: Core Marketplace
- [ ] Seller registration & onboarding
- [ ] Multi-vendor product catalog
- [ ] Order splitting by seller
- [ ] Basic seller dashboard
- [ ] Commission calculation

#### Phase 2: Trust & Quality
- [ ] Seller verification system
- [ ] Product moderation
- [ ] Review & rating system
- [ ] Dispute resolution
- [ ] Buyer protection policies

#### Phase 3: Growth
- [ ] Seller analytics
- [ ] Promotional tools
- [ ] Advertising platform
- [ ] Seller tiers/programs
- [ ] API for seller integrations

---

## 4. B2B (Business-to-Business)

### 4.1 Overview

**Definition:** Commerce between businesses, where companies sell products or services to other businesses rather than individual consumers.

**Key Differentiators from B2C:**
- Larger order values
- Longer sales cycles
- Relationship-based selling
- Custom pricing and contracts
- Payment terms (Net 30/60/90)
- Approval workflows

### 4.2 Business Model Canvas

```
+------------------+------------------+------------------+
|  Key Partners    |  Key Activities  | Value Proposition|
|------------------|------------------|------------------|
| - Suppliers      | - Account mgmt   | - Bulk pricing   |
| - Distributors   | - Quote mgmt     | - Custom catalogs|
| - Logistics      | - Contract       | - Credit terms   |
| - Credit agencies|   negotiation    | - Dedicated svc  |
| - ERP providers  | - Relationship   | - Integration    |
|                  |   building       | - Reliability    |
+------------------+------------------+------------------+
|  Key Resources                      | Customer Segments|
|-------------------------------------|------------------|
| - Sales team                        | - Small business |
| - Product expertise                 | - Mid-market     |
| - Credit facilities                 | - Enterprise     |
| - Integration capabilities          | - Government     |
| - Customer relationships            | - Resellers      |
+-------------------------------------+------------------+
```

### 4.3 User Flows

#### Company Registration Flow
```
[Request Account] -> [Company Info] -> [Verification] -> [Credit Check]
                           |                                   |
                           v                                   v
                    - Company name                      - Credit application
                    - Tax ID / VAT                      - Trade references
                    - Industry                          - Bank references
                    - Company size                      - Financial statements
                                                              |
                                                              v
                                                    [Account Approval]
                                                              |
                            +-----------------------------+---+
                            |                             |
                            v                             v
                    [Approved]                    [Pending/Rejected]
                            |                             |
                            v                             v
                    [Assign Pricing Tier]         [Manual Review]
                            |
                            v
                    [Welcome & Onboarding]
```

#### B2B Purchase Flow
```
[Browse Catalog] -> [Build Cart/List] -> [Request Quote] -> [Quote Review]
        |                   |                                     |
        v                   v                                     v
  Custom catalog      Saved lists                           Negotiate
  Contract prices     Quick reorder                         Approve/Reject
                                                                 |
                                                                 v
                                                    [Convert to Order]
                                                                 |
                                                                 v
                                                    [Approval Workflow]
                                                                 |
                            +------------------------------+-----+
                            |                              |
                            v                              v
                    [Auto-Approved]              [Requires Manager]
                    (Under threshold)                     |
                            |                             v
                            v                    [Manager Review]
                    [Order Placed]                        |
                            |              +--------------+-------------+
                            |              |              |             |
                            v              v              v             v
                    [Payment Terms]   [Approve]     [Reject]     [Modify]
                    (Net 30/60/90)
```

### 4.4 Data Models

#### Company Account Model
```typescript
interface CompanyAccount {
  id: string;
  
  // Company Info
  companyName: string;
  legalName: string;
  taxId: string;
  vatNumber: string;
  dunsNumber: string;
  
  // Classification
  industry: string;
  companySize: 'small' | 'medium' | 'large' | 'enterprise';
  accountType: 'prospect' | 'customer' | 'partner' | 'reseller';
  
  // Contact
  primaryContact: Contact;
  billingContact: Contact;
  shippingContacts: Contact[];
  
  // Addresses
  headquarters: Address;
  billingAddress: Address;
  shippingAddresses: Address[];
  
  // Pricing
  pricingTierId: string;
  customPricing: CustomPrice[];
  contractId: string;
  
  // Credit
  creditStatus: 'none' | 'pending' | 'approved' | 'suspended';
  creditLimit: number;
  creditUsed: number;
  paymentTerms: 'prepay' | 'net15' | 'net30' | 'net60' | 'net90';
  
  // Users
  users: CompanyUser[];
  
  // Sales
  salesRepId: string;
  
  // Status
  status: 'active' | 'inactive' | 'suspended' | 'pending_approval';
  
  createdAt: Date;
  updatedAt: Date;
}

interface CompanyUser {
  id: string;
  companyId: string;
  
  // User Info
  email: string;
  firstName: string;
  lastName: string;
  title: string;
  phone: string;
  
  // Permissions
  role: 'admin' | 'buyer' | 'approver' | 'viewer';
  permissions: Permission[];
  
  // Approval
  approvalLimit: number; // Max order value can approve
  requiresApproval: boolean;
  approverIds: string[]; // Who can approve their orders
  
  // Status
  status: 'active' | 'inactive' | 'pending_invite';
}
```

#### Quote Model
```typescript
interface Quote {
  id: string;
  quoteNumber: string;
  
  // Parties
  companyId: string;
  requestedBy: string; // User ID
  salesRepId: string;
  
  // Items
  items: QuoteItem[];
  
  // Pricing
  subtotal: number;
  discountTotal: number;
  shippingEstimate: number;
  taxEstimate: number;
  total: number;
  
  // Terms
  paymentTerms: string;
  validUntil: Date;
  deliveryTerms: string;
  
  // Status
  status: 'draft' | 'sent' | 'viewed' | 'negotiating' | 'accepted' | 'rejected' | 'expired';
  
  // Negotiation
  revisions: QuoteRevision[];
  notes: string;
  
  // Conversion
  orderId: string;
  convertedAt: Date;
  
  createdAt: Date;
  updatedAt: Date;
}

interface QuoteItem {
  productId: string;
  variantId: string;
  sku: string;
  
  quantity: number;
  unitPrice: number;
  discountPercent: number;
  lineTotal: number;
  
  notes: string;
}
```

### 4.5 Key Features & Components

#### B2B Storefront Features
```
+------------------------------------------------------------------+
|  B2B SPECIFIC NAVIGATION                                          |
|  Logo | Catalog | Quick Order | Quotes | Orders | Account         |
+------------------------------------------------------------------+
|  COMPANY DASHBOARD                                                |
|  +------------------------------------------------------------+  |
|  |  Welcome, [User] from [Company]                             |  |
|  |  Credit Available: $XX,XXX / $XX,XXX                        |  |
|  |  Payment Terms: Net 30                                      |  |
|  +------------------------------------------------------------+  |
+------------------------------------------------------------------+
|  QUICK ACTIONS                                                    |
|  [Quick Order] [Reorder] [Saved Lists] [Request Quote]            |
+------------------------------------------------------------------+
|  RECENT ORDERS                     |  PENDING APPROVALS           |
|  - Order details                   |  - Orders awaiting approval  |
|  - Track shipments                 |  - Approve/Reject actions    |
|  - Reorder button                  |                              |
+------------------------------------------------------------------+
```

#### Quick Order Pad
```
+------------------------------------------------------------------+
|  QUICK ORDER                                                      |
+------------------------------------------------------------------+
|  Enter SKUs or product names to quickly build your order          |
|                                                                   |
|  | SKU / Search       | Qty | Unit Price | Line Total | Actions ||
|  |--------------------|-----|------------|------------|---------|  |
|  | [ABC-123        ]  | [5] | $45.00     | $225.00    | [X]     |  |
|  | [DEF-456        ]  | [10]| $32.00     | $320.00    | [X]     |  |
|  | [                ]  | [ ] |            |            |         |  |
|  +----------------------------------------------------------------+
|                                                                   |
|  [Upload CSV] [Load Saved List v] [Clear All]                     |
|                                                                   |
|  Subtotal: $545.00                                                |
|  [ADD ALL TO CART]  [REQUEST QUOTE]                               |
+------------------------------------------------------------------+
```

#### Approval Workflow Interface
```
+------------------------------------------------------------------+
|  ORDER APPROVAL REQUIRED                                          |
+------------------------------------------------------------------+
|  Order #12345 from John Smith requires your approval              |
|                                                                   |
|  Order Value: $15,750.00                                          |
|  User's Limit: $10,000.00                                         |
|  Reason: Exceeds user purchase limit                              |
|                                                                   |
|  +------------------------------------------------------------+  |
|  |  ORDER SUMMARY                                              |  |
|  |  - 50x Product A @ $150.00 = $7,500.00                      |  |
|  |  - 25x Product B @ $330.00 = $8,250.00                      |  |
|  |                              Subtotal: $15,750.00           |  |
|  +------------------------------------------------------------+  |
|                                                                   |
|  [APPROVE]  [REJECT]  [REQUEST CHANGES]                           |
|                                                                   |
|  Notes: [                                                      ]  |
+------------------------------------------------------------------+
```

### 4.6 Pricing Tiers Structure

```typescript
interface B2BPricingTier {
  id: string;
  name: string; // e.g., "Silver", "Gold", "Platinum"
  
  // Qualification
  minAnnualSpend: number;
  minOrderValue: number;
  
  // Discounts
  baseDiscount: number; // % off list price
  categoryDiscounts: {
    categoryId: string;
    discount: number;
  }[];
  
  // Volume discounts (on top of tier)
  volumeBreaks: {
    minQuantity: number;
    discount: number;
  }[];
  
  // Benefits
  paymentTerms: string[];
  freeShippingThreshold: number;
  dedicatedSupport: boolean;
  priorityFulfillment: boolean;
}

// Price calculation
function calculateB2BPrice(
  product: Product,
  quantity: number,
  tier: B2BPricingTier,
  customPricing?: CustomPrice
): number {
  // Check for custom negotiated price first
  if (customPricing) {
    return customPricing.price * quantity;
  }
  
  // Base price with tier discount
  let unitPrice = product.listPrice * (1 - tier.baseDiscount);
  
  // Apply category discount if applicable
  const categoryDiscount = tier.categoryDiscounts
    .find(cd => cd.categoryId === product.categoryId);
  if (categoryDiscount) {
    unitPrice = product.listPrice * (1 - categoryDiscount.discount);
  }
  
  // Apply volume discount
  const volumeBreak = tier.volumeBreaks
    .filter(vb => quantity >= vb.minQuantity)
    .sort((a, b) => b.minQuantity - a.minQuantity)[0];
  if (volumeBreak) {
    unitPrice = unitPrice * (1 - volumeBreak.discount);
  }
  
  return unitPrice * quantity;
}
```

### 4.7 Implementation Checklist

#### Phase 1: Core B2B
- [ ] Company account registration
- [ ] Multi-user accounts with roles
- [ ] Custom pricing tiers
- [ ] Quote request system
- [ ] Payment terms (Net 30/60)

#### Phase 2: Advanced Features
- [ ] Approval workflows
- [ ] Quick order pad
- [ ] Saved lists / favorites
- [ ] Bulk ordering (CSV upload)
- [ ] Reorder functionality

#### Phase 3: Enterprise
- [ ] Contract management
- [ ] Custom catalogs per company
- [ ] Credit management
- [ ] EDI/PunchOut integration
- [ ] Sales rep assignment

---

## 5. Wholesale

### 5.1 Overview

**Definition:** Selling products in large quantities at discounted prices, typically to retailers, resellers, or other businesses for resale.

**Key Characteristics:**
- High volume, lower margins
- Minimum order quantities (MOQs)
- Tiered volume pricing
- Often separate from retail operations

### 5.2 Data Models

#### Wholesale Pricing Model
```typescript
interface WholesaleProduct {
  productId: string;
  
  // Wholesale-specific
  wholesaleEnabled: boolean;
  wholesalePrice: number;
  msrp: number; // Manufacturer's Suggested Retail Price
  
  // Minimums
  minimumOrderQuantity: number;
  casePackQuantity: number; // Must order in multiples
  
  // Volume pricing
  volumePricing: VolumeTier[];
  
  // Availability
  wholesaleOnly: boolean; // Not available for retail
  leadTime: number; // Days
}

interface VolumeTier {
  minQuantity: number;
  maxQuantity: number;
  unitPrice: number;
  discount: number; // Percentage off wholesale price
}

// Example volume pricing
const volumeTiers: VolumeTier[] = [
  { minQuantity: 12, maxQuantity: 47, unitPrice: 10.00, discount: 0 },
  { minQuantity: 48, maxQuantity: 95, unitPrice: 9.00, discount: 10 },
  { minQuantity: 96, maxQuantity: 239, unitPrice: 8.00, discount: 20 },
  { minQuantity: 240, maxQuantity: null, unitPrice: 7.00, discount: 30 },
];
```

### 5.3 Key Features

#### Wholesale Portal
```
+------------------------------------------------------------------+
|  WHOLESALE PORTAL                                                 |
+------------------------------------------------------------------+
|  [Apply for Wholesale Account]  (for non-customers)               |
|  OR                                                               |
|  [Login to Wholesale Account]   (for existing)                    |
+------------------------------------------------------------------+

After Login:
+------------------------------------------------------------------+
|  WHOLESALE DASHBOARD                                              |
+------------------------------------------------------------------+
|  Your Pricing Tier: Gold (15% off wholesale)                      |
|  Minimum Order: $500                                              |
+------------------------------------------------------------------+
|  PRODUCT CATALOG                                                  |
|  +------------------------------------------------------------+  |
|  |  [Product Image]                                            |  |
|  |  Product Name                                               |  |
|  |  SKU: ABC-123                                               |  |
|  |  MSRP: $25.00                                               |  |
|  |  ----------------------------------------                   |  |
|  |  YOUR PRICING:                                              |  |
|  |  12-47 units:  $10.00/ea                                    |  |
|  |  48-95 units:  $9.00/ea  (10% off)                          |  |
|  |  96-239 units: $8.00/ea  (20% off)                          |  |
|  |  240+ units:   $7.00/ea  (30% off)                          |  |
|  |  ----------------------------------------                   |  |
|  |  MOQ: 12 units | Case Pack: 12                              |  |
|  |  Qty: [  24  ] [ADD TO ORDER]                               |  |
|  +------------------------------------------------------------+  |
+------------------------------------------------------------------+
```

### 5.4 Implementation Checklist

- [ ] Wholesale customer registration
- [ ] Wholesale pricing structure
- [ ] Minimum order quantities
- [ ] Volume discount tiers
- [ ] Separate wholesale portal/catalog
- [ ] Order minimums enforcement
- [ ] Wholesale-only products

---

## 6. Dropshipping

### 6.1 Overview

**Definition:** A retail fulfillment method where the store doesn't keep products in stock. Instead, when a customer places an order, the store purchases the item from a third-party supplier who ships directly to the customer.

### 6.2 Technical Architecture

```
+------------------------------------------------------------------+
|  CUSTOMER                                                         |
|  Places order on your store                                       |
+------------------------------------------------------------------+
           |
           v
+------------------------------------------------------------------+
|  YOUR STORE                                                       |
|  - Receives order                                                 |
|  - Processes payment                                              |
|  - Forwards order to supplier                                     |
+------------------------------------------------------------------+
           |
           v
+------------------------------------------------------------------+
|  SUPPLIER / DROPSHIP PARTNER                                      |
|  - Receives order details                                         |
|  - Picks, packs, ships                                            |
|  - Sends tracking info                                            |
+------------------------------------------------------------------+
           |
           v
+------------------------------------------------------------------+
|  CUSTOMER                                                         |
|  Receives product (branded as your store or neutral)              |
+------------------------------------------------------------------+
```

### 6.3 Data Models

```typescript
interface DropshipSupplier {
  id: string;
  name: string;
  
  // Integration
  integrationType: 'api' | 'email' | 'csv' | 'manual';
  apiEndpoint: string;
  apiCredentials: EncryptedCredentials;
  
  // Products
  products: DropshipProduct[];
  
  // Shipping
  shippingMethods: ShippingMethod[];
  processingTime: number; // days
  
  // Branding
  blindShipping: boolean; // Ships without supplier branding
  customPackingSlip: boolean;
  
  // Financials
  currency: string;
  paymentTerms: string;
}

interface DropshipProduct {
  id: string;
  supplierId: string;
  supplierSku: string;
  
  // Your store's product
  storeProductId: string;
  
  // Costs
  supplierCost: number;
  shippingCost: number;
  
  // Inventory (synced from supplier)
  supplierStock: number;
  lastInventorySync: Date;
  
  // Mapping
  variantMappings: {
    storeVariantId: string;
    supplierVariantSku: string;
  }[];
}

interface DropshipOrder {
  id: string;
  storeOrderId: string;
  supplierId: string;
  
  // Status
  status: 'pending' | 'sent' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  
  // Supplier details
  supplierOrderId: string;
  supplierInvoice: string;
  
  // Shipping
  trackingNumber: string;
  trackingUrl: string;
  carrier: string;
  
  // Costs
  productCost: number;
  shippingCost: number;
  totalCost: number;
  
  // Profit
  customerPaid: number;
  profit: number;
  
  // Timeline
  sentToSupplierAt: Date;
  confirmedAt: Date;
  shippedAt: Date;
  deliveredAt: Date;
}
```

### 6.4 Order Flow

```
[Customer Order] -> [Payment Captured] -> [Auto-Route to Supplier]
                                                    |
                           +------------------------+
                           |                        |
                           v                        v
                    [API Integration]        [Manual/Email]
                           |                        |
                           v                        v
                    [Order Confirmed]        [Await Confirmation]
                           |                        |
                           +------------------------+
                                     |
                                     v
                           [Tracking Received]
                                     |
                                     v
                           [Customer Notified]
                                     |
                                     v
                              [Delivered]
```

### 6.5 Implementation Checklist

- [ ] Supplier management system
- [ ] Product/variant mapping
- [ ] Automated order forwarding
- [ ] Inventory sync from suppliers
- [ ] Tracking integration
- [ ] Profit calculation
- [ ] Supplier performance tracking

---

## 7. White Label / Private Label

### 7.1 Overview

**Definition:** Selling products manufactured by third parties under your own brand name.

**Types:**
- **White Label:** Generic products sold by multiple brands
- **Private Label:** Products made exclusively for your brand

### 7.2 Key Considerations

```
+------------------------------------------------------------------+
|  WHITE LABEL vs PRIVATE LABEL                                     |
+------------------------------------------------------------------+
|                                                                   |
|  WHITE LABEL                    PRIVATE LABEL                     |
|  - Same product, your brand     - Exclusive to your brand         |
|  - Lower MOQs                   - Higher MOQs                     |
|  - Faster to market             - Custom formulation/design       |
|  - Less differentiation         - Unique selling proposition      |
|  - Lower upfront cost           - Higher upfront investment       |
|                                                                   |
+------------------------------------------------------------------+
```

### 7.3 Implementation Focus

For white/private label, the commerce platform needs:
- Strong brand presentation
- Quality product descriptions (you control the narrative)
- Customer education content
- Brand story integration

---

## 8. Print-on-Demand

### 8.1 Overview

**Definition:** Products are printed/customized only when ordered, eliminating inventory risk.

### 8.2 Technical Architecture

```
+------------------------------------------------------------------+
|  DESIGN TOOLS                                                     |
|  - Design upload interface                                        |
|  - Product mockup generator                                       |
|  - Design placement editor                                        |
+------------------------------------------------------------------+
           |
           v
+------------------------------------------------------------------+
|  PRODUCT CONFIGURATOR                                             |
|  - Base product selection                                         |
|  - Color/size options                                             |
|  - Design preview                                                 |
+------------------------------------------------------------------+
           |
           v
+------------------------------------------------------------------+
|  ORDER PROCESSING                                                 |
|  - Print file generation                                          |
|  - Order routing to printer                                       |
|  - Quality specifications                                         |
+------------------------------------------------------------------+
           |
           v
+------------------------------------------------------------------+
|  PRINT FULFILLMENT                                                |
|  - Production queue                                               |
|  - Print execution                                                |
|  - Quality check                                                  |
|  - Ship to customer                                               |
+------------------------------------------------------------------+
```

### 8.3 Data Models

```typescript
interface PODProduct {
  id: string;
  baseProductId: string; // Blank product template
  
  // Design
  designId: string;
  designPlacement: {
    area: 'front' | 'back' | 'sleeve' | 'all-over';
    position: { x: number; y: number };
    size: { width: number; height: number };
    rotation: number;
  }[];
  
  // Print specifications
  printMethod: 'dtg' | 'sublimation' | 'screen' | 'embroidery';
  colorProfile: string;
  resolution: number; // DPI
  
  // Mockups
  mockupImages: {
    color: string;
    imageUrl: string;
  }[];
}

interface Design {
  id: string;
  creatorId: string;
  
  // Files
  sourceFile: string; // High-res original
  printFile: string; // Print-ready version
  previewFile: string; // Web preview
  
  // Specs
  dimensions: { width: number; height: number };
  resolution: number;
  colorMode: 'rgb' | 'cmyk';
  hasTransparency: boolean;
  
  // Usage
  allowedProducts: string[];
}
```

### 8.4 Implementation Checklist

- [ ] Design upload system
- [ ] Product mockup generator
- [ ] Print provider integration
- [ ] Order routing logic
- [ ] Production status tracking
- [ ] Quality management

---

## 9. Rental / Leasing

### 9.1 Overview

**Definition:** Customers pay to temporarily use products rather than purchasing outright.

### 9.2 Data Models

```typescript
interface RentalProduct {
  id: string;
  productId: string;
  
  // Rental terms
  rentalPeriods: RentalPeriod[];
  minRentalDays: number;
  maxRentalDays: number;
  
  // Pricing
  dailyRate: number;
  weeklyRate: number;
  monthlyRate: number;
  
  // Deposit
  securityDeposit: number;
  
  // Insurance
  insuranceRequired: boolean;
  insuranceRate: number; // per day
}

interface RentalPeriod {
  name: string; // "Weekend", "Week", "Month"
  days: number;
  price: number;
  discount: number; // vs daily rate
}

interface RentalItem {
  id: string;
  productId: string;
  
  // Physical item tracking
  serialNumber: string;
  condition: 'new' | 'excellent' | 'good' | 'fair';
  
  // Availability
  status: 'available' | 'rented' | 'maintenance' | 'retired';
  currentRentalId: string;
  
  // History
  totalRentals: number;
  totalRevenue: number;
  maintenanceHistory: MaintenanceRecord[];
}

interface Rental {
  id: string;
  customerId: string;
  itemId: string;
  
  // Dates
  startDate: Date;
  endDate: Date;
  actualReturnDate: Date;
  
  // Pricing
  basePrice: number;
  insurancePrice: number;
  deposit: number;
  lateFees: number;
  damageFees: number;
  totalPrice: number;
  
  // Status
  status: 'reserved' | 'active' | 'returned' | 'overdue' | 'cancelled';
  
  // Condition
  conditionAtCheckout: string;
  conditionAtReturn: string;
  damageReport: string;
}
```

### 9.3 Rental Flow

```
[Browse] -> [Check Availability] -> [Select Dates] -> [Reserve]
                                                          |
                                                          v
                                                   [Pay Deposit + Rental]
                                                          |
                                                          v
                                                   [Pick Up / Receive]
                                                          |
                                                          v
                                                   [Use Period]
                                                          |
                                                          v
                                                   [Return]
                                                          |
                                                          v
                                                   [Condition Check]
                                                          |
                            +-----------------------------+----+
                            |                                  |
                            v                                  v
                    [Good Condition]                   [Damage Found]
                            |                                  |
                            v                                  v
                    [Refund Deposit]               [Deduct from Deposit]
                            |                                  |
                            +----------------------------------+
                                             |
                                             v
                                    [Rental Complete]
```

### 9.4 Implementation Checklist

- [ ] Availability calendar
- [ ] Date-based pricing
- [ ] Deposit handling
- [ ] Check-out/check-in process
- [ ] Condition tracking
- [ ] Overdue management
- [ ] Maintenance scheduling

---

## 10. Recommerce / Resale

### 10.1 Overview

**Definition:** Selling pre-owned, refurbished, or returned products.

### 10.2 Data Models

```typescript
interface UsedProduct {
  id: string;
  originalProductId: string;
  
  // Condition
  condition: 'new_with_tags' | 'like_new' | 'very_good' | 'good' | 'fair';
  conditionNotes: string;
  
  // Authenticity (for luxury)
  authenticated: boolean;
  authenticatedBy: string;
  authenticationCertificate: string;
  
  // Source
  source: 'trade_in' | 'consignment' | 'buyback' | 'return' | 'purchased';
  sourceDetails: string;
  originalPurchaseDate: Date;
  originalPrice: number;
  
  // Pricing
  resalePrice: number;
  originalRetailPrice: number;
  savingsPercent: number;
  
  // Images
  actualImages: string[]; // Photos of actual item
  
  // Unique identifiers
  serialNumber: string;
  itemId: string; // Unique per physical item
}

interface TradeInRequest {
  id: string;
  customerId: string;
  
  // Item info
  productId: string;
  condition: string;
  photos: string[];
  description: string;
  
  // Quote
  estimatedValue: number;
  finalValue: number;
  
  // Status
  status: 'submitted' | 'quoted' | 'accepted' | 'shipped' | 'received' | 'inspected' | 'completed' | 'rejected';
  
  // Credit
  creditType: 'store_credit' | 'cash' | 'gift_card';
  creditAmount: number;
  creditIssued: boolean;
}
```

### 10.3 Condition Grading System

```
+------------------------------------------------------------------+
|  CONDITION GRADES                                                 |
+------------------------------------------------------------------+
|                                                                   |
|  NEW WITH TAGS (NWT)                                              |
|  - Never worn/used                                                |
|  - Original tags attached                                         |
|  - Original packaging                                             |
|  - Discount: 10-20% off retail                                    |
|                                                                   |
|  LIKE NEW / EXCELLENT                                             |
|  - Worn once or twice                                             |
|  - No visible wear                                                |
|  - May not have original tags                                     |
|  - Discount: 30-40% off retail                                    |
|                                                                   |
|  VERY GOOD                                                        |
|  - Light wear                                                     |
|  - Minor imperfections                                            |
|  - Fully functional                                               |
|  - Discount: 40-50% off retail                                    |
|                                                                   |
|  GOOD                                                             |
|  - Moderate wear                                                  |
|  - Visible signs of use                                           |
|  - Fully functional                                               |
|  - Discount: 50-60% off retail                                    |
|                                                                   |
|  FAIR                                                             |
|  - Significant wear                                               |
|  - Noticeable flaws                                               |
|  - Still functional                                               |
|  - Discount: 60-70%+ off retail                                   |
|                                                                   |
+------------------------------------------------------------------+
```

### 10.4 Implementation Checklist

- [ ] Condition grading system
- [ ] Actual item photography
- [ ] Unique item inventory
- [ ] Trade-in/buyback program
- [ ] Authentication system (luxury)
- [ ] Consignment management
- [ ] Sustainability messaging

---

## 11. Social Commerce

### 11.1 Overview

**Definition:** Selling products directly through social media platforms.

### 11.2 Platform Integration Architecture

```
+------------------------------------------------------------------+
|  YOUR COMMERCE PLATFORM                                           |
|  (Product catalog, inventory, orders)                             |
+------------------------------------------------------------------+
           |
           | Product Feed Sync
           |
+----------+----------+----------+----------+----------+
|          |          |          |          |          |
v          v          v          v          v          v
[Instagram] [TikTok]  [Facebook] [Pinterest] [YouTube] [WhatsApp]
Shopping    Shop      Shop       Shopping    Shopping   Business
           |          |          |          |          |
           +----------+----------+----------+----------+
                               |
                               v
                      [Order Received]
                               |
                               v
                      [Sync to Platform]
                               |
                               v
                      [Fulfill & Track]
```

### 11.3 Key Components

```typescript
interface SocialCatalogSync {
  platform: 'instagram' | 'tiktok' | 'facebook' | 'pinterest';
  
  // Connection
  accountId: string;
  accessToken: string;
  catalogId: string;
  
  // Sync settings
  autoSync: boolean;
  syncFrequency: 'realtime' | 'hourly' | 'daily';
  
  // Product mapping
  productMappings: {
    productId: string;
    platformProductId: string;
    status: 'active' | 'pending' | 'rejected';
    rejectionReason: string;
  }[];
  
  // Performance
  impressions: number;
  clicks: number;
  purchases: number;
  revenue: number;
}

interface SocialPost {
  id: string;
  platform: string;
  
  // Content
  type: 'post' | 'story' | 'reel' | 'live';
  content: string;
  media: string[];
  
  // Products
  taggedProducts: {
    productId: string;
    position: { x: number; y: number };
  }[];
  
  // Performance
  views: number;
  engagement: number;
  clicks: number;
  conversions: number;
  revenue: number;
  
  postedAt: Date;
}
```

### 11.4 Implementation Checklist

- [ ] Product feed generation
- [ ] Platform API integrations
- [ ] Order sync from platforms
- [ ] Inventory sync to platforms
- [ ] Performance tracking
- [ ] Content management tools

---

## 12. Headless Commerce

### 12.1 Overview

**Definition:** Architecture where the frontend (presentation) is decoupled from the backend (commerce engine), connected via APIs.

### 12.2 Architecture Diagram

```
+------------------------------------------------------------------+
|                      PRESENTATION LAYER                           |
|------------------------------------------------------------------|
|  Web App    | Mobile App  | PWA    | Kiosk   | Voice | IoT       |
|  (React)    | (Native)    |        |         |       |           |
+------------------------------------------------------------------+
           |              |           |          |        |
           +-------+------+-----------+----------+--------+
                   |
                   v
+------------------------------------------------------------------+
|                         API GATEWAY                               |
|------------------------------------------------------------------|
|  REST APIs  |  GraphQL  |  WebSockets  |  Webhooks               |
+------------------------------------------------------------------+
                   |
                   v
+------------------------------------------------------------------+
|                      COMMERCE ENGINE                              |
|------------------------------------------------------------------|
|  Products | Cart | Checkout | Orders | Customers | Inventory     |
+------------------------------------------------------------------+
                   |
                   v
+------------------------------------------------------------------+
|                      INTEGRATION LAYER                            |
|------------------------------------------------------------------|
|  Payments | Shipping | Search | CMS | Email | Analytics          |
+------------------------------------------------------------------+
```

### 12.3 API Design Principles

```typescript
// RESTful API Structure
const apiEndpoints = {
  // Products
  'GET    /store/products': 'List products',
  'GET    /store/products/:id': 'Get product',
  'GET    /store/collections/:handle': 'Get collection',
  
  // Cart
  'POST   /store/carts': 'Create cart',
  'GET    /store/carts/:id': 'Get cart',
  'POST   /store/carts/:id/line-items': 'Add item',
  'PUT    /store/carts/:id/line-items/:item_id': 'Update item',
  'DELETE /store/carts/:id/line-items/:item_id': 'Remove item',
  
  // Checkout
  'POST   /store/carts/:id/shipping-methods': 'Set shipping',
  'POST   /store/carts/:id/payment-sessions': 'Init payment',
  'POST   /store/carts/:id/complete': 'Complete order',
  
  // Customers
  'POST   /store/customers': 'Register',
  'GET    /store/customers/me': 'Get profile',
  'GET    /store/customers/me/orders': 'Order history',
};
```

### 12.4 Benefits & Trade-offs

```
+------------------------------------------------------------------+
|  BENEFITS                           | TRADE-OFFS                  |
|-------------------------------------|------------------------------|
| - Complete frontend freedom         | - More complex architecture  |
| - Better performance potential      | - Higher development cost    |
| - Multi-channel from one backend    | - Need frontend expertise    |
| - Independent deployments           | - More integration work      |
| - Best-of-breed tech stack          | - Security responsibility    |
| - Future-proof                      | - Preview/WYSIWYG harder     |
+------------------------------------------------------------------+
```

### 12.5 Implementation Checklist

- [ ] API documentation
- [ ] SDK/client libraries
- [ ] Authentication system
- [ ] Rate limiting
- [ ] Caching strategy
- [ ] Error handling
- [ ] Webhook system
- [ ] Multi-channel support

---

## 13. Omnichannel Commerce

### 13.1 Overview

**Definition:** Unified customer experience across all sales channels (online, mobile, in-store, social).

### 13.2 Channel Integration Architecture

```
+------------------------------------------------------------------+
|                    UNIFIED COMMERCE PLATFORM                      |
+------------------------------------------------------------------+
     |           |           |           |           |
     v           v           v           v           v
+--------+  +--------+  +--------+  +--------+  +--------+
| Web    |  | Mobile |  | Store  |  | Social |  | Market-|
| Store  |  | App    |  | POS    |  | Channels | | places |
+--------+  +--------+  +--------+  +--------+  +--------+
     |           |           |           |           |
     +-----+-----+-----+-----+-----+-----+-----+-----+
                             |
                             v
              +------------------------------+
              |    UNIFIED DATA LAYER        |
              |------------------------------|
              | - Single customer profile    |
              | - Real-time inventory        |
              | - Unified order history      |
              | - Cross-channel cart         |
              | - Consistent pricing         |
              +------------------------------+
```

### 13.3 Key Capabilities

#### Inventory Visibility
```typescript
interface OmnichannelInventory {
  productId: string;
  variantId: string;
  
  // Total availability
  totalAvailable: number;
  
  // By location
  locations: {
    locationId: string;
    locationType: 'warehouse' | 'store' | 'partner';
    available: number;
    reserved: number;
    incoming: number;
    
    // Fulfillment capabilities
    canShip: boolean;
    canPickup: boolean;
    canShipToStore: boolean;
  }[];
  
  // Fulfillment options based on location
  fulfillmentOptions: FulfillmentOption[];
}

interface FulfillmentOption {
  type: 'ship_to_home' | 'pickup_in_store' | 'curbside' | 'ship_to_store' | 'same_day';
  locationId: string;
  available: boolean;
  estimatedDate: Date;
  cost: number;
}
```

#### Unified Customer Profile
```typescript
interface OmnichannelCustomer {
  id: string;
  
  // Profile
  email: string;
  phone: string;
  name: string;
  
  // Cross-channel identification
  identifiers: {
    channel: string;
    identifier: string; // Email, phone, loyalty ID, etc.
  }[];
  
  // Unified history
  orders: Order[]; // All channels
  interactions: Interaction[]; // Store visits, web sessions, etc.
  
  // Preferences
  preferredStore: string;
  preferredChannel: string;
  communicationPreferences: {
    channel: 'email' | 'sms' | 'push' | 'mail';
    enabled: boolean;
  }[];
  
  // Loyalty (cross-channel)
  loyaltyPoints: number;
  loyaltyTier: string;
}
```

### 13.4 Fulfillment Options

```
+------------------------------------------------------------------+
|  FULFILLMENT OPTIONS                                              |
+------------------------------------------------------------------+
|                                                                   |
|  SHIP TO HOME                                                     |
|  - Standard shipping from warehouse                               |
|  - Ship from nearest store                                        |
|  - Express/same-day options                                       |
|                                                                   |
|  BUY ONLINE, PICK UP IN STORE (BOPIS)                             |
|  - Reserve online, pick up at store                               |
|  - Ready in X hours notification                                  |
|  - Dedicated pickup area                                          |
|                                                                   |
|  CURBSIDE PICKUP                                                  |
|  - Like BOPIS but brought to car                                  |
|  - "I'm here" notification                                        |
|                                                                   |
|  SHIP TO STORE                                                    |
|  - Order online, ship to preferred store                          |
|  - Free shipping option                                           |
|  - Try before taking home                                         |
|                                                                   |
|  RESERVE IN STORE                                                 |
|  - Check store availability                                       |
|  - Reserve for in-store purchase                                  |
|  - Try on, purchase in store                                      |
|                                                                   |
|  ENDLESS AISLE                                                    |
|  - In-store ordering of out-of-stock items                        |
|  - Access full catalog from store                                 |
|  - Ship to home or store                                          |
|                                                                   |
+------------------------------------------------------------------+
```

### 13.5 Implementation Checklist

- [ ] Unified inventory system
- [ ] Cross-channel customer profiles
- [ ] Consistent pricing engine
- [ ] BOPIS/curbside capability
- [ ] Store inventory visibility
- [ ] Ship-from-store
- [ ] Cross-channel returns
- [ ] Unified loyalty program

---

## 14. Flash Sales / Daily Deals

### 14.1 Overview

**Definition:** Time-limited offers with significant discounts, creating urgency.

### 14.2 Data Models

```typescript
interface FlashSale {
  id: string;
  name: string;
  
  // Timing
  startTime: Date;
  endTime: Date;
  timezone: string;
  
  // Products
  products: FlashSaleProduct[];
  
  // Limits
  maxPurchasePerCustomer: number;
  totalQuantityLimit: number;
  quantitySold: number;
  
  // Visibility
  showCountdown: boolean;
  showQuantityRemaining: boolean;
  showPercentClaimed: boolean;
  
  // Access
  accessType: 'public' | 'members_only' | 'vip_only' | 'early_access';
  earlyAccessStart: Date; // For VIPs
  
  // Status
  status: 'scheduled' | 'active' | 'ended' | 'sold_out';
}

interface FlashSaleProduct {
  productId: string;
  variantId: string;
  
  // Pricing
  originalPrice: number;
  salePrice: number;
  discountPercent: number;
  
  // Limits
  quantityAvailable: number;
  quantitySold: number;
  maxPerCustomer: number;
}
```

### 14.3 UI Components

```
+------------------------------------------------------------------+
|  FLASH SALE HERO                                                  |
|  +------------------------------------------------------------+  |
|  |  FLASH SALE ENDS IN:                                        |  |
|  |  [ 02 ] : [ 15 ] : [ 43 ]                                   |  |
|  |   HRS      MIN      SEC                                     |  |
|  |                                                             |  |
|  |  UP TO 70% OFF SELECT ITEMS                                 |  |
|  |                                                             |  |
|  |  [SHOP NOW]                                                 |  |
|  +------------------------------------------------------------+  |
+------------------------------------------------------------------+
|  DEAL PRODUCT CARD                                                |
|  +------------------------------------------------------------+  |
|  |  [Image]                                                    |  |
|  |  Product Name                                               |  |
|  |  $29.99  ~~$99.99~~  70% OFF                                |  |
|  |  +----------------------------------------------+           |  |
|  |  |  [============================            ]  |  72%     |  |
|  |  |  72% Claimed                                 |  Claimed  |  |
|  |  +----------------------------------------------+           |  |
|  |  [ADD TO CART]                                              |  |
|  +------------------------------------------------------------+  |
+------------------------------------------------------------------+
```

### 14.4 Implementation Checklist

- [ ] Sale scheduling system
- [ ] Countdown timers
- [ ] Quantity limit enforcement
- [ ] Purchase limits per customer
- [ ] Early access system
- [ ] Real-time stock updates
- [ ] "Almost gone" indicators

---

## 15. Freemium Commerce

### 15.1 Overview

**Definition:** Basic offering is free, with premium features/products available for purchase.

### 15.2 Data Models

```typescript
interface FreemiumTier {
  id: string;
  name: string; // "Free", "Pro", "Enterprise"
  
  // Pricing
  price: number; // 0 for free tier
  billingInterval: 'monthly' | 'annually';
  
  // Feature limits
  limits: {
    featureKey: string;
    limit: number | 'unlimited';
  }[];
  
  // Features included
  features: {
    featureKey: string;
    enabled: boolean;
  }[];
  
  // Trial
  trialDays: number;
}

// Usage tracking for freemium limits
interface UserUsage {
  userId: string;
  tierId: string;
  
  // Current period
  periodStart: Date;
  periodEnd: Date;
  
  // Usage metrics
  usage: {
    featureKey: string;
    used: number;
    limit: number;
    percentUsed: number;
  }[];
  
  // Upgrade triggers
  hitLimitCount: number;
  upgradePromptShown: number;
}
```

### 15.3 Feature Gate Pattern

```typescript
function checkFeatureAccess(userId: string, feature: string): FeatureAccess {
  const user = getUser(userId);
  const tier = getTier(user.tierId);
  const usage = getUsage(userId);
  
  const featureConfig = tier.features.find(f => f.featureKey === feature);
  const limit = tier.limits.find(l => l.featureKey === feature);
  const currentUsage = usage.usage.find(u => u.featureKey === feature);
  
  // Feature not available in tier
  if (!featureConfig?.enabled) {
    return {
      allowed: false,
      reason: 'feature_not_in_tier',
      upgradeRequired: true,
      suggestedTier: getSuggestedUpgrade(feature)
    };
  }
  
  // Check usage limits
  if (limit && currentUsage && currentUsage.used >= limit.limit) {
    return {
      allowed: false,
      reason: 'limit_reached',
      upgradeRequired: true,
      currentUsage: currentUsage.used,
      limit: limit.limit
    };
  }
  
  return { allowed: true };
}
```

### 15.4 Implementation Checklist

- [ ] Tier definition system
- [ ] Feature gating
- [ ] Usage tracking
- [ ] Upgrade prompts
- [ ] Trial management
- [ ] Downgrade handling

---

## 16. Bundling Commerce

### 16.1 Overview

**Definition:** Selling multiple products together as a package at a discount.

### 16.2 Bundle Types

```
+------------------------------------------------------------------+
|  BUNDLE TYPES                                                     |
+------------------------------------------------------------------+
|                                                                   |
|  FIXED BUNDLE                                                     |
|  - Predefined products                                            |
|  - Sold as single unit                                            |
|  - Example: "Skincare Starter Kit"                                |
|                                                                   |
|  MIX-AND-MATCH                                                    |
|  - Customer selects products                                      |
|  - From approved list                                             |
|  - Example: "Build Your Own 6-Pack"                               |
|                                                                   |
|  BOGO (Buy One Get One)                                           |
|  - Buy X, get Y free/discounted                                   |
|  - Example: "Buy 2, Get 1 Free"                                   |
|                                                                   |
|  VOLUME BUNDLE                                                    |
|  - Same product, quantity discount                                |
|  - Example: "3 for $20"                                           |
|                                                                   |
|  CROSS-SELL BUNDLE                                                |
|  - Related products                                               |
|  - "Frequently Bought Together"                                   |
|  - Example: Phone + Case + Charger                                |
|                                                                   |
+------------------------------------------------------------------+
```

### 16.3 Data Models

```typescript
interface Bundle {
  id: string;
  name: string;
  description: string;
  
  // Type
  type: 'fixed' | 'mix_and_match' | 'bogo' | 'volume';
  
  // Products
  products: BundleProduct[];
  
  // Mix and match options
  mixAndMatch?: {
    minProducts: number;
    maxProducts: number;
    allowedProducts: string[];
    allowDuplicates: boolean;
  };
  
  // Pricing
  pricingType: 'fixed_price' | 'percent_discount' | 'fixed_discount';
  bundlePrice: number; // For fixed_price
  discountPercent: number; // For percent_discount
  discountAmount: number; // For fixed_discount
  
  // Calculated
  originalTotal: number;
  savings: number;
  savingsPercent: number;
  
  // Inventory
  manageInventory: 'bundle' | 'components'; // Track as bundle or per component
  
  // Display
  thumbnail: string;
  showSavings: boolean;
}

interface BundleProduct {
  productId: string;
  variantId: string;
  quantity: number;
  required: boolean;
  
  // For mix-and-match
  isDefault: boolean;
  canSwap: boolean;
  swapOptions: string[]; // Variant IDs
}
```

### 16.4 UI Components

```
+------------------------------------------------------------------+
|  FIXED BUNDLE                                                     |
|  +------------------------------------------------------------+  |
|  |  "Complete Skincare Routine" Bundle                         |  |
|  |                                                             |  |
|  |  [Img] [Img] [Img] [Img]                                    |  |
|  |                                                             |  |
|  |  Includes:                                                  |  |
|  |  - Cleanser (Full size)                                     |  |
|  |  - Toner (Full size)                                        |  |
|  |  - Serum (Full size)                                        |  |
|  |  - Moisturizer (Full size)                                  |  |
|  |                                                             |  |
|  |  ~~$120.00~~ $89.99  SAVE 25%                               |  |
|  |                                                             |  |
|  |  [ADD BUNDLE TO CART]                                       |  |
|  +------------------------------------------------------------+  |
+------------------------------------------------------------------+

+------------------------------------------------------------------+
|  MIX AND MATCH BUNDLE                                             |
|  +------------------------------------------------------------+  |
|  |  "Build Your 6-Pack" - Any 6 for $30                        |  |
|  |                                                             |  |
|  |  Selected (4/6):                                            |  |
|  |  [x Item] [x Item] [x Item] [x Item] [ + ] [ + ]            |  |
|  |                                                             |  |
|  |  Choose from:                                               |  |
|  |  [Product Grid with Add buttons]                            |  |
|  |                                                             |  |
|  |  [ADD BUNDLE TO CART]  (disabled until 6 selected)          |  |
|  +------------------------------------------------------------+  |
+------------------------------------------------------------------+
```

### 16.5 Implementation Checklist

- [ ] Bundle configuration
- [ ] Multiple bundle types
- [ ] Dynamic pricing calculation
- [ ] Bundle inventory management
- [ ] Cart handling for bundles
- [ ] Bundle analytics

---

## 17. Affiliate Commerce

### 17.1 Overview

**Definition:** Partners promote products and earn commission on referred sales.

### 17.2 Data Models

```typescript
interface Affiliate {
  id: string;
  
  // Profile
  name: string;
  email: string;
  website: string;
  socialProfiles: {
    platform: string;
    handle: string;
    followers: number;
  }[];
  
  // Status
  status: 'pending' | 'approved' | 'active' | 'suspended' | 'terminated';
  
  // Commission
  commissionTierId: string;
  customCommissionRate: number;
  
  // Tracking
  affiliateCode: string;
  trackingLinks: TrackingLink[];
  
  // Performance
  totalClicks: number;
  totalConversions: number;
  totalRevenue: number;
  totalCommission: number;
  conversionRate: number;
  
  // Payouts
  payoutMethod: PayoutMethod;
  payoutThreshold: number;
  pendingPayout: number;
}

interface TrackingLink {
  id: string;
  affiliateId: string;
  
  // Link
  destinationUrl: string;
  trackingUrl: string;
  shortCode: string;
  
  // Campaign
  campaignName: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  
  // Performance
  clicks: number;
  conversions: number;
  revenue: number;
  commission: number;
}

interface AffiliateCommission {
  id: string;
  affiliateId: string;
  orderId: string;
  
  // Order details
  orderTotal: number;
  commissionableAmount: number;
  
  // Commission
  commissionRate: number;
  commissionAmount: number;
  
  // Status
  status: 'pending' | 'approved' | 'paid' | 'reversed';
  
  // Attribution
  trackingLinkId: string;
  clickedAt: Date;
  convertedAt: Date;
  attributionWindow: number; // days
}
```

### 17.3 Affiliate Dashboard

```
+------------------------------------------------------------------+
|  AFFILIATE DASHBOARD                                              |
+------------------------------------------------------------------+
|  Welcome back, [Affiliate Name]                                   |
+------------------------------------------------------------------+
|  PERFORMANCE OVERVIEW (This Month)                                |
|  +------------+  +------------+  +------------+  +------------+   |
|  | Clicks     |  | Sales      |  | Revenue    |  | Commission |   |
|  | 1,234      |  | 56         |  | $4,521     |  | $452.10    |   |
|  | +12%       |  | +8%        |  | +15%       |  | +15%       |   |
|  +------------+  +------------+  +------------+  +------------+   |
+------------------------------------------------------------------+
|  YOUR LINKS                                                       |
|  | Campaign        | URL                    | Clicks | Conv  |   |
|  |-----------------|------------------------|--------|-------|   |
|  | Instagram Bio   | yourstore.com/ref/abc  | 567    | 23    |   |
|  | Blog Review     | yourstore.com/ref/def  | 234    | 12    |   |
|  | [+ Create New Link]                                       |   |
+------------------------------------------------------------------+
|  COMMISSION HISTORY                                               |
|  | Date      | Order   | Amount   | Commission | Status     |   |
|  |-----------|---------|----------|------------|------------|   |
|  | Jan 15    | #12345  | $89.99   | $8.99      | Pending    |   |
|  | Jan 14    | #12344  | $156.00  | $15.60     | Approved   |   |
+------------------------------------------------------------------+
|  PAYOUTS                                                          |
|  Available Balance: $452.10                                       |
|  Next Payout: Feb 1, 2025 (min $100)                              |
|  [Request Payout]                                                 |
+------------------------------------------------------------------+
```

### 17.4 Implementation Checklist

- [ ] Affiliate registration/approval
- [ ] Link generation & tracking
- [ ] Cookie/attribution tracking
- [ ] Commission calculation
- [ ] Performance reporting
- [ ] Payout management
- [ ] Fraud detection

---

## 18. Crowdfunding / Pre-order

### 18.1 Overview

**Definition:** Selling products before they're available, using customer payments to fund production.

### 18.2 Data Models

```typescript
interface Campaign {
  id: string;
  title: string;
  description: string;
  
  // Timing
  launchDate: Date;
  endDate: Date;
  estimatedDelivery: Date;
  
  // Goals
  fundingGoal: number;
  currentFunding: number;
  percentFunded: number;
  
  // Backers
  backerCount: number;
  
  // Rewards/Tiers
  rewards: CampaignReward[];
  
  // Status
  status: 'draft' | 'preview' | 'active' | 'funded' | 'ended' | 'fulfilled';
  
  // Funding type
  fundingType: 'all_or_nothing' | 'flexible';
  
  // Content
  story: string; // Rich text
  faqs: FAQ[];
  updates: CampaignUpdate[];
  media: {
    type: 'image' | 'video';
    url: string;
  }[];
}

interface CampaignReward {
  id: string;
  campaignId: string;
  
  // Reward details
  title: string;
  description: string;
  
  // Pricing
  price: number;
  retailValue: number;
  savings: number;
  
  // Contents
  includes: {
    productId: string;
    quantity: number;
  }[];
  
  // Limits
  limitedQuantity: boolean;
  quantityAvailable: number;
  quantityClaimed: number;
  
  // Delivery
  estimatedDelivery: Date;
  shippingCost: number;
  
  // Early bird
  isEarlyBird: boolean;
  earlyBirdEnds: Date;
}

interface Backer {
  id: string;
  campaignId: string;
  customerId: string;
  
  // Pledge
  rewardId: string;
  pledgeAmount: number;
  addOns: AddOn[];
  
  // Payment
  paymentStatus: 'pending' | 'charged' | 'refunded';
  chargedAt: Date;
  
  // Fulfillment
  fulfillmentStatus: 'pending' | 'processing' | 'shipped' | 'delivered';
  shippingAddress: Address;
  trackingNumber: string;
  
  // Survey
  surveyCompleted: boolean;
  surveyResponses: Record<string, any>;
  
  createdAt: Date;
}
```

### 18.3 Campaign Page

```
+------------------------------------------------------------------+
|  [Campaign Video/Image]                                           |
|                                                                   |
|  CAMPAIGN TITLE                                                   |
|  Short tagline describing the product                             |
|                                                                   |
|  +------------------------+  +--------------------------------+   |
|  |                        |  |  $45,678                       |   |
|  |  [=================  ] |  |  pledged of $30,000 goal       |   |
|  |  152% Funded           |  |                                |   |
|  |                        |  |  1,234 Backers                 |   |
|  +------------------------+  |                                |   |
|                              |  15 days to go                 |   |
|                              |                                |   |
|                              |  [BACK THIS PROJECT]           |   |
|                              +--------------------------------+   |
+------------------------------------------------------------------+
|  TABS: Story | FAQs | Updates (12) | Comments                     |
+------------------------------------------------------------------+
|  REWARD TIERS                                                     |
|  +------------------------------------------------------------+  |
|  |  EARLY BIRD - $49                                           |  |
|  |  Save 40% - Retail $79                                      |  |
|  |                                                             |  |
|  |  Includes:                                                  |  |
|  |  - 1x Product                                               |  |
|  |  - Exclusive backer color                                   |  |
|  |                                                             |  |
|  |  Est. Delivery: March 2025                                  |  |
|  |  123/200 claimed                                            |  |
|  |                                                             |  |
|  |  [SELECT THIS REWARD]                                       |  |
|  +------------------------------------------------------------+  |
+------------------------------------------------------------------+
```

### 18.4 Implementation Checklist

- [ ] Campaign creation tools
- [ ] Reward tier management
- [ ] Funding progress tracking
- [ ] Backer management
- [ ] Update/communication system
- [ ] Survey collection
- [ ] Fulfillment tracking

---

## 19. Membership / VIP Commerce

### 19.1 Overview

**Definition:** Paid or earned membership providing exclusive access, pricing, or benefits.

### 19.2 Data Models

```typescript
interface MembershipProgram {
  id: string;
  name: string;
  
  // Tiers
  tiers: MembershipTier[];
  
  // Qualification
  qualificationType: 'paid' | 'spend_based' | 'points_based' | 'invite_only';
  
  // Point system (if applicable)
  pointsConfig: {
    earnRate: number; // Points per dollar
    redemptionRate: number; // Points per dollar redemption
    expirationDays: number;
  };
}

interface MembershipTier {
  id: string;
  name: string; // "Silver", "Gold", "Platinum"
  
  // Qualification
  minSpend: number; // Annual spend to qualify
  minPoints: number;
  membershipFee: number; // For paid programs
  
  // Benefits
  benefits: {
    type: 'discount' | 'free_shipping' | 'early_access' | 'exclusive_products' | 'points_multiplier' | 'gift' | 'service';
    description: string;
    value: any; // Depends on type
  }[];
  
  // Perks
  discountPercent: number;
  freeShipping: boolean;
  freeShippingThreshold: number;
  pointsMultiplier: number;
  birthdayReward: any;
  anniversaryReward: any;
  
  // Access
  earlyAccessDays: number;
  exclusiveProducts: string[];
}

interface Membership {
  id: string;
  customerId: string;
  programId: string;
  tierId: string;
  
  // Status
  status: 'active' | 'expired' | 'cancelled';
  
  // Dates
  startDate: Date;
  renewalDate: Date;
  expirationDate: Date;
  
  // Qualification tracking
  currentYearSpend: number;
  lifetimeSpend: number;
  
  // Points
  pointsBalance: number;
  lifetimePoints: number;
  
  // History
  tierHistory: {
    tierId: string;
    startDate: Date;
    endDate: Date;
  }[];
  
  // Benefits used
  benefitsUsed: {
    benefitType: string;
    usedAt: Date;
    value: any;
  }[];
}
```

### 19.3 Member Dashboard

```
+------------------------------------------------------------------+
|  WELCOME, [NAME]                                                  |
|  Gold Member since 2023                                           |
+------------------------------------------------------------------+
|  YOUR STATUS                                                      |
|  +------------------------------------------------------------+  |
|  |  GOLD MEMBER                      Next Tier: PLATINUM       |  |
|  |  [=======================      ]  $1,234 / $2,000           |  |
|  |                                   $766 to Platinum          |  |
|  +------------------------------------------------------------+  |
+------------------------------------------------------------------+
|  YOUR BENEFITS                                                    |
|  +-------------+  +-------------+  +-------------+               |
|  | 15% OFF     |  | FREE        |  | EARLY       |               |
|  | All Orders  |  | Shipping    |  | Access      |               |
|  +-------------+  +-------------+  +-------------+               |
+------------------------------------------------------------------+
|  POINTS BALANCE                                                   |
|  +------------------------------------------------------------+  |
|  |  2,450 Points Available                                     |  |
|  |  Worth $24.50 in rewards                                    |  |
|  |  [REDEEM POINTS]                                            |  |
|  +------------------------------------------------------------+  |
+------------------------------------------------------------------+
|  EXCLUSIVE FOR YOU                                                |
|  [Member-only products carousel]                                  |
+------------------------------------------------------------------+
|  UPCOMING PERKS                                                   |
|  - Birthday reward available in 2 weeks                           |
|  - Member-only sale starts Jan 20                                 |
+------------------------------------------------------------------+
```

### 19.4 Implementation Checklist

- [ ] Membership tier structure
- [ ] Qualification tracking
- [ ] Points earning/redemption
- [ ] Benefit application
- [ ] Member-only products
- [ ] Early access system
- [ ] Expiration/renewal handling
- [ ] Member communications

---

## 20. Hybrid Commerce Models

### 20.1 Overview

**Definition:** Combining multiple commerce models to create comprehensive business approaches.

### 20.2 Common Hybrid Combinations

```
+------------------------------------------------------------------+
|  POPULAR HYBRID MODELS                                            |
+------------------------------------------------------------------+

1. DTC + WHOLESALE
   - Sell direct to consumers via website
   - Also sell to retailers/resellers
   - Separate pricing, catalogs, portals
   
2. MARKETPLACE + DTC
   - Sell own products (like Amazon Basics)
   - Also host third-party sellers
   - Unified customer experience
   
3. SUBSCRIPTION + ONE-TIME
   - Offer subscription options
   - Also allow single purchases
   - Convert one-time to subscribers
   
4. RENTAL + RESALE
   - Rent products
   - Sell used rentals
   - Example: Rent the Runway
   
5. B2B + B2C
   - Serve both businesses and consumers
   - Different pricing, terms, features
   - Single product catalog, dual experience
   
6. MEMBERSHIP + FLASH SALES
   - Members get exclusive flash sale access
   - Creates urgency + loyalty
   - Example: Gilt
   
7. SOCIAL + DTC
   - Own website + social selling
   - Unified inventory, split channels
   - Influencer partnerships
```

### 20.3 Architecture for Hybrid Models

```
+------------------------------------------------------------------+
|                    UNIFIED COMMERCE CORE                          |
|------------------------------------------------------------------|
|  Products | Inventory | Customers | Orders | Payments             |
+------------------------------------------------------------------+
           |
           | Model-Specific Layers
           |
+----------+----------+----------+----------+----------+
|          |          |          |          |          |
v          v          v          v          v          v
[DTC      [B2B       [Market-   [Subscrip- [Rental]   [Membership]
 Layer]    Layer]     place]     tion]
           |          |          |          |          |
           +----------+----------+----------+----------+
                               |
                               v
                      [Unified Reporting]
                      [Single Customer View]
                      [Cross-model Analytics]
```

### 20.4 Implementation Considerations

```typescript
interface HybridConfiguration {
  // Active models
  enabledModels: CommerceModel[];
  
  // Customer experience
  unifiedCustomerProfile: boolean;
  crossModelCart: boolean;
  
  // Pricing
  pricingStrategy: 'channel_specific' | 'unified' | 'hybrid';
  
  // Inventory
  inventoryStrategy: 'shared' | 'allocated' | 'hybrid';
  
  // Fulfillment
  fulfillmentStrategy: 'unified' | 'model_specific';
}

type CommerceModel = 
  | 'dtc'
  | 'b2b'
  | 'wholesale'
  | 'marketplace'
  | 'subscription'
  | 'rental'
  | 'membership'
  | 'dropship'
  | 'social';

// Example: DTC + Subscription hybrid
const dtcSubscriptionHybrid: HybridConfiguration = {
  enabledModels: ['dtc', 'subscription'],
  unifiedCustomerProfile: true,
  crossModelCart: true, // Can have one-time + subscription in same cart
  pricingStrategy: 'hybrid', // Subscribe & save discounts
  inventoryStrategy: 'shared',
  fulfillmentStrategy: 'unified'
};
```

### 20.5 Key Success Factors

```
+------------------------------------------------------------------+
|  HYBRID MODEL SUCCESS FACTORS                                     |
+------------------------------------------------------------------+
|                                                                   |
|  1. UNIFIED DATA                                                  |
|     - Single source of truth for products                         |
|     - Unified customer profiles                                   |
|     - Centralized inventory                                       |
|                                                                   |
|  2. FLEXIBLE ARCHITECTURE                                         |
|     - Modular, composable systems                                 |
|     - API-first approach                                          |
|     - Easy to add/remove models                                   |
|                                                                   |
|  3. CLEAR SEGMENTATION                                            |
|     - Different experiences for different segments                |
|     - Appropriate pricing per channel                             |
|     - Targeted marketing                                          |
|                                                                   |
|  4. OPERATIONAL EXCELLENCE                                        |
|     - Streamlined fulfillment                                     |
|     - Unified customer service                                    |
|     - Cross-trained teams                                         |
|                                                                   |
|  5. ANALYTICS & INSIGHTS                                          |
|     - Cross-model reporting                                       |
|     - Customer journey analysis                                   |
|     - Model performance comparison                                |
|                                                                   |
+------------------------------------------------------------------+
```

---

## Appendix A: Model Selection Guide

### Decision Matrix

| Factor | Best Models |
|--------|-------------|
| Low startup capital | Dropshipping, Print-on-Demand, Affiliate |
| High margins needed | DTC, Membership, B2B |
| Predictable revenue | Subscription, Membership |
| Scale without inventory | Marketplace, Dropshipping |
| Brand building | DTC, Private Label |
| Sustainability focus | Rental, Recommerce |
| Social media strength | Social Commerce, Affiliate |
| Enterprise customers | B2B, Wholesale |
| Testing new products | Crowdfunding, Print-on-Demand |

### Model Complexity Rating

| Model | Implementation Complexity | Operational Complexity |
|-------|---------------------------|------------------------|
| DTC | Low-Medium | Low-Medium |
| Subscription | Medium-High | High |
| Marketplace | High | Very High |
| B2B | Medium-High | Medium |
| Wholesale | Low-Medium | Low |
| Dropshipping | Low | Medium |
| Print-on-Demand | Low | Low |
| Rental | High | Very High |
| Recommerce | Medium | High |
| Social | Medium | Medium |
| Membership | Medium | Medium |
| Flash Sales | Low | Medium |
| Bundling | Low-Medium | Low |
| Affiliate | Medium | Low-Medium |
| Crowdfunding | Medium | Medium |
| Hybrid | Very High | Very High |

---

## Appendix B: Technology Stack Recommendations

### By Model Type

```
DTC / Standard E-commerce:
- Medusa, Shopify, WooCommerce, BigCommerce

Subscription:
- Medusa + custom, Recharge, Bold, Chargebee

Marketplace:
- Medusa + custom, Sharetribe, Mirakl, custom build

B2B:
- Medusa, OroCommerce, Magento B2B, SAP Commerce

Print-on-Demand:
- Printful, Printify, Gooten integrations

Rental:
- Custom builds, Booqable, Rentle

Recommerce:
- Custom builds, Recurate, Archive

Headless:
- Medusa, commercetools, Elastic Path
```

---

## Appendix C: Glossary

| Term | Definition |
|------|------------|
| AOV | Average Order Value |
| ARR | Annual Recurring Revenue |
| CAC | Customer Acquisition Cost |
| COGS | Cost of Goods Sold |
| CVR | Conversion Rate |
| GMV | Gross Merchandise Value |
| LTV | Customer Lifetime Value |
| MOQ | Minimum Order Quantity |
| MRR | Monthly Recurring Revenue |
| NPS | Net Promoter Score |
| SKU | Stock Keeping Unit |
| UGC | User-Generated Content |

---

**Document End**

This design document serves as a comprehensive reference for implementing any of the 20 commerce models covered. Each section provides the necessary context, data models, user flows, and implementation guidance to build robust e-commerce solutions.
