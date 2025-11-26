import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { ShoppingBag } from "lucide-react";

const Cart = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-24 pb-20">
        <h1 className="text-4xl font-bold mb-8">Carrito de Compras</h1>
        
        <Card>
          <CardContent className="py-20 text-center">
            <ShoppingBag className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <p className="text-xl text-muted-foreground mb-6">
              Tu carrito está vacío
            </p>
            <Button onClick={() => navigate("/products")}>
              Explorar Productos
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Cart;