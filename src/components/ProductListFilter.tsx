// import {useEffect, useState} from "react";
import "./ProductListFilter.css";
// import type { Category } from "../App";
import type { ProductSummary } from "../App";

interface FilterProps {
    onCategorySelect: (categoryId: number | null) => void;
    // categoryProducts: ProductSummary[];
    categories?: { id: number; name: string }[];
    }



export default function ProductListFilter({onCategorySelect, /*categoryProducts,*/ categories}: FilterProps) {

    return (
        <div className="filter-container">
            <select 
                className="filter-select" 
                onChange={(e) => {
                    const selectedId = e.target.value ? Number(e.target.value) : null;
                    onCategorySelect(selectedId);
                }}>
                <option value="">All Products</option>
                {categories && categories.map((category) => (
                    <option key={category.id} value={category.id}>
                        {category.name}
                    </option>
                ))}
            </select>
            {/* <button 
                className="filter-btn" 
                onClick={() => onCategorySelect(null)}>All Products</button>
             */}
        </div>
    )

}