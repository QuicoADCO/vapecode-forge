import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { AgeVerification } from "@/components/AgeVerification";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
const Index = () => {
  const [featuredProducts, setFeaturedProducts] = useState<any[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    loadFeaturedProducts();
  }, []);
  const loadFeaturedProducts = async () => {
    const {
      data
    } = await supabase.from("products").select("*").eq("featured", true).eq("active", true).limit(4);
    if (data) {
      setFeaturedProducts(data);
    }
  };
  return <div className="min-h-screen bg-background">
      <AgeVerification />
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-subtle opacity-50"></div>
        <div className="container mx-auto relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent animate-fade-in">
              La Nueva Generación
              <br />
              ​del Vapeo
  
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 animate-fade-in">
              Descubre productos premium con tecnología de última generación
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
              <Button size="lg" onClick={() => navigate("/products")} className="text-lg">
                Explorar Productos
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button size="lg" variant="outline" onClick={() => navigate("/auth")}>
                Crear Cuenta
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      {featuredProducts.length > 0 && <section className="py-20 px-4">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Productos Destacados</h2>
              <p className="text-muted-foreground text-lg">
                Los más populares de nuestra colección
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map(product => <ProductCard key={product.id} id={product.id} name={product.name} price={product.price} image={product.images?.[0]} brand={product.brand} stock={product.stock} />)}
            </div>
            <div className="text-center mt-12">
              <Button onClick={() => navigate("/products")} size="lg" variant="outline">
                Ver Todos los Productos
              </Button>
            </div>
          </div>
        </section>}

      {/* Features */}
      <section className="py-20 px-4 bg-card/50">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🚚</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Envío Rápido</h3>
              <p className="text-muted-foreground">
                Recibe tu pedido en 24-48 horas
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">✅</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Productos Originales</h3>
              <p className="text-muted-foreground">
                100% auténticos y garantizados
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🔒</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Pago Seguro</h3>
              <p className="text-muted-foreground">
                Transacciones protegidas
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-border">
        <div className="container mx-auto text-center text-muted-foreground">
          <p>&copy; 2024 VapeCode. Todos los derechos reservados.</p>
          <p className="text-sm mt-2">Venta prohibida a menores de 18 años</p>
        </div>
      </footer>
    </div>;
};
export default Index;