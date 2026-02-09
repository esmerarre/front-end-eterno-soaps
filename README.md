# Eterno Soaps Frontend

A Vite + React + TypeScript frontend for the Eterno Soaps ecommerce website. Includes product browsing, cart and checkout flow, and an admin dashboard for inventory management.

## Prerequisites
- Node.js 18+ 
- npm
- Backend API (see Backend Repository below)

## Setup
1. Install dependencies:
	- `npm install`

2. Create a `.env` file in the project root:
	```
	VITE_BACKEND_URL=http://localhost:8000
	```
	Update the URL to match your backend API base URL.

3. Start the dev server:
	- `npm run dev`

The app will be available at the Vite default (usually http://localhost:5173).

## Environment Variables
This project uses Vite environment variables (must be prefixed with `VITE_`).

Required:
- `VITE_BACKEND_URL` — Base URL for the backend API (used for products, categories, admins, and checkout).

## Backend Repository
- https://github.com/esmerarre/back-end-eterno-soaps

## Project Structure (high-level)
- `src/App.tsx` — App state, routing, and core data fetching
- `src/components/` — UI components (Product, Cart, Admin tools, charts)
- `src/pages/` — Page-level components and layouts
- `src/services/` — API helpers (checkout, contact, product)
- `src/data/` — Static data used by charts/widgets