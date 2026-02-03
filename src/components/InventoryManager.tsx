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
        <div>Inventory Manager</div>
            <div className="new-product-form-container">
            <h2>Add New Product</h2>
            <NewProductForm createNewProduct={createNewProduct} />
            <AddVariantForm createNewVariant={createNewVariant} products={products} />
        </div>
        </div>
    )
}