import NewProductForm from "./NewProductForm";
import AddVariantForm from "./AddVariantForm";
import "./InventoryManager.css"
import type { NewProduct, NewVariant, Product } from "../App";

interface InventoryManagerProps {
    createNewProduct: (newProduct: NewProduct) => void;
    createNewVariant: (newVariant: NewVariant) => void;
    products: Product[];
}

export default function InventoryManager({ createNewProduct, createNewVariant, products }: InventoryManagerProps) {
    return (
        <div className="inventory-manager">
      
            <div className="new-product-form-container">
            <h2>Add New Product</h2>
            <div className="manage-products-section">
                <div className="product-form-wrapper">
            <NewProductForm createNewProduct={createNewProduct} />
                </div>
            <div className="products-catalog-container">
            <table className="products-catalog">
                <thead>
                <tr>
                    <th>All Products</th>
                </tr>
                </thead>
                <tbody>
                {products.length === 0 ? (
                    <tr>
                    <td colSpan={1}>No products available</td>
                    </tr>
                ) : (
                    products.map((product, index) => {
 
                    return (
                        <tr className="">
                        <td>{product.name}</td>
                        </tr>
                    );
                    })
                )}
                </tbody>
            </table>
            </div>
            </div>
            <h2>Add New Variant</h2>
            <AddVariantForm createNewVariant={createNewVariant} products={products} />
        </div>
        </div>
    )
}