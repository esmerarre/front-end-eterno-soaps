

import {
 BarChart,
 Bar,
 XAxis,
 YAxis,
 Tooltip,
 ResponsiveContainer,
} from "recharts";


interface InventoryItem {
 productName: string;
 variantLabel: string;
 stockQuantity: number;
}


interface Props {
 data: InventoryItem[];
}


export default function InventoryStockChart({ data }: Props) {
 return (
   <ResponsiveContainer width="100%" height={300}>
     <BarChart data={data}>
       <XAxis dataKey="variantLabel" />
       <YAxis />
       <Tooltip />
       <Bar dataKey="stockQuantity" />
     </BarChart>
   </ResponsiveContainer>
 );
}
