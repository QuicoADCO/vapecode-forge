import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image?: string;
  brand?: string;
  stock: number;
}

export const ProductCard = ({ id, name, price, image, brand, stock }: ProductCardProps) => {
  return (
    <Link to={`/product/${id}`}>
      <Card className="group overflow-hidden hover:shadow-glow transition-all duration-300 h-full">
        <div className="aspect-square overflow-hidden bg-muted">
          <img
            src={image || "/placeholder.svg"}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
        </div>
        <CardContent className="p-4">
          {brand && <p className="text-sm text-muted-foreground mb-1">{brand}</p>}
          <h3 className="font-semibold text-lg mb-2 line-clamp-2">{name}</h3>
          <div className="flex items-center justify-between">
            <p className="text-2xl font-bold text-primary">${price.toFixed(2)}</p>
            {stock > 0 ? (
              <p className="text-sm text-muted-foreground">Stock: {stock}</p>
            ) : (
              <p className="text-sm text-destructive">Sin stock</p>
            )}
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <Button className="w-full" disabled={stock === 0}>
            <ShoppingCart className="w-4 h-4 mr-2" />
            {stock > 0 ? "Ver Producto" : "Sin Stock"}
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
};