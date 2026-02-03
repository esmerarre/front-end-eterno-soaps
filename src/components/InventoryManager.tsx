import NewProductForm from "./NewProductForm";
import "./InventoryManager.css"
import type { NewProduct } from "../App";


interface InventoryManagerProps {
    createNewProduct?: (newProduct: NewProduct) => void;
}


export default function InventoryManager({ createNewProduct }: InventoryManagerProps) {
    return (
        <div className="inventory-manager">
        <div>Inventory Manager</div>
            <div className="new-product-form-container">
            <h2>Add New Product</h2>
            <NewProductForm createNewProduct={createNewProduct} />
        </div>
        </div>
    )
}