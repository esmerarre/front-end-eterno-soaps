# Eterno Soaps Frontend

A modern **Vite + React + TypeScript** frontend for the Eterno Soaps ecommerce platform.
This application supports customer product browsing, cart and checkout flow, a contact form, and an authenticated admin dashboard for inventory management and analytics.

This frontend is designed to integrate with a FastAPI backend and demonstrates full-stack integration, third-party services, and role-based UI access.

## Tech Stack

- React (Vite)
- TypeScript
- CSS
- Recharts (admin analytics & data visualization)
- Stripe Checkout (payments, backend-managed)
- SendGrid (email delivery, backend-managed)

## Features

### Customer Experience
- Browse products and variants
- Filter products by category
- View product details
- Add items to cart
- Secure checkout using Stripe
- Contact form with email delivery

### Admin Dashboard
- Authenticated admin access
- Inventory overview with stock-level indicators
- Create and delete products and variants
- Sales and product analytics dashboards
- Data visualizations built with Recharts
- Admin authentication is intentionally non-persistent; refreshing the page logs the admin out.

## Prerequisites

- Node.js 18+
- npm
- Running backend API

## Setup

Install dependencies:

```sh
npm install
```

Create a `.env` file in the project root:

```
VITE_BACKEND_URL=http://localhost:8000
```

Start the development server:

```sh
npm run dev
```

The app will be available at the Vite default URL (typically http://localhost:5173).

## Environment Variables

This project uses Vite environment variables (must be prefixed with `VITE_`).

Required:

- `VITE_BACKEND_URL` — Base URL for the backend API

## Payments (Stripe Integration)

Stripe is used for secure checkout processing.
All sensitive payment logic and API keys are handled by the backend.

### Checkout Flow

1. User proceeds to checkout from the cart
2. Frontend sends cart data to the backend
3. Backend creates a Stripe Checkout Session
4. User is redirected to Stripe’s hosted checkout page
5. Stripe processes the payment and redirects on success or cancellation

The frontend never handles raw card data.

## Email (Contact Form)

The contact form allows users to send messages directly from the site.

### Email Flow

1. User submits the contact form
2. Frontend sends the form data to the backend
3. Backend sends the email using SendGrid
4. Frontend displays success or error feedback

Email credentials are stored securely on the backend.

## Admin Dashboard & Analytics

The admin dashboard provides tools for managing products and viewing sales data.

### Admin Features

- Inventory overview with stock alerts
- Product and variant creation and deletion
- Expandable analytics sections
- Monthly sales and top-selling product charts

All charts are rendered using Recharts and populated with backend-provided data.

## Data Visualization with Recharts (Admin Dashboard)

The admin dashboard uses Recharts, a React-based charting library, to visualize sales and product performance data. Recharts was chosen for its declarative API, strong TypeScript support, and seamless integration with React component state.

All charts are rendered client-side using data fetched from the backend or derived from application state.

### Step-by-Step Recharts Implementation

#### 1. Installing Recharts

Recharts was added as a project dependency using npm:

```sh
npm install recharts
```

This makes all chart components available throughout the application.

#### 2. Preparing the Data

Before rendering any chart, raw backend data is transformed into a shape Recharts expects.

Each chart consumes an array of objects where:

- Each object represents a data point
- Keys map directly to chart properties (`dataKey`)

Example normalized data structure:

```js
const monthlySalesData = [
	{ month: "Jan", revenue: 4200 },
	{ month: "Feb", revenue: 3800 },
	{ month: "Mar", revenue: 5100 }
];
```

This transformation step is critical to:

- Decouple backend data shape from UI components
- Keep chart components reusable and predictable

#### 3. Creating a Chart Component

Each chart is encapsulated in its own reusable React component.

Example: Monthly Sales Chart

```js
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	Tooltip,
	CartesianGrid,
	ResponsiveContainer
} from "recharts";
```

Encapsulation allows:

- Charts to be reused or swapped
- Admin dashboard layout to remain clean
- Easier testing and debugging

#### 4. Rendering the Chart

The chart is rendered using Recharts’ declarative components:

```jsx
<ResponsiveContainer width="100%" height={300}>
	<LineChart data={monthlySalesData}>
		<CartesianGrid strokeDasharray="3 3" />
		<XAxis dataKey="month" />
		<YAxis />
		<Tooltip />
		<Line
			type="monotone"
			dataKey="revenue"
			stroke="#6b8e23"
			strokeWidth={2}
		/>
	</LineChart>
</ResponsiveContainer>
```

**Key Concepts Used**

- `ResponsiveContainer` ensures charts scale across screen sizes
- `dataKey` links chart visuals to object properties
- Declarative components define layout instead of manual SVG logic

#### 5. Integrating Charts into the Admin Dashboard

Charts are conditionally rendered inside the admin dashboard using local state.

```js
const [showAnalytics, setShowAnalytics] = useState(false);
```

This allows:

- Clean UI with expandable sections
- Reduced render cost when analytics are hidden
- Better user experience for admins

```jsx
{showAnalytics && (
	<div className="chart-grid">
		<MonthlySalesChart />
		<TopSellingProductsChart />
	</div>
)}
```

#### 6. Layout and Styling

Charts are displayed using a responsive CSS grid:

```css
.chart-grid {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
	gap: 1.5rem;
}
```

This ensures:

- Charts adapt to different screen widths
- Admin dashboard remains visually balanced
- No horizontal scrolling on smaller devices

#### 7. Multiple Chart Types

Different chart types were selected based on the data being presented:

| Chart Type         | Use Case                |
|--------------------|-------------------------|
| Line Chart         | Monthly sales trends    |
| Bar Chart          | Top-selling products    |
| Table + Highlights | Inventory stock levels  |

This approach improves clarity and decision-making for admins.

### Summary

Recharts is used in this project to provide:

- Clear visual insights into sales and inventory data
- A responsive and interactive admin experience
- Scalable, reusable chart components
- Clean separation between data, logic, and presentation

The result is an admin dashboard that is both informative and maintainable, suitable for real-world ecommerce operations.

## Routing & Authentication Notes

- Client-side routing is used throughout the app
- Admin views are conditionally rendered based on authentication state
- Admin access is cleared on page refresh
- Unauthorized users cannot access admin functionality

## Project Structure (High-Level)

- `src/App.tsx` — Global state, routing, and data orchestration
- `src/pages/` — Page-level components
- `src/components/` — Reusable UI components and charts
- `src/services/` — API helper functions
- `src/data/` — Static or chart-related data
