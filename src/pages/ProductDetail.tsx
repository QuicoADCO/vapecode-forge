import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { ShoppingCart, ArrowLeft } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [product, setProduct] = useState<any>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      loadProduct();
    }
  }, [id]);

  const loadProduct = async () => {
    const { data, error } = await supabase
      .from("products")
      .select("*, categories(name)")
      .eq("id", id)
      .eq("active", true)
      .maybeSingle();

    if (error || !data) {
      toast.error("Producto no encontrado");
      navigate("/products");
    } else {
      setProduct(data);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 pt-24 pb-20 text-center">
          <p className="text-muted-foreground">Cargando...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return null;
  }

  const images = product.images && product.images.length > 0 
    ? product.images 
    : ["/placeholder.svg"];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-24 pb-20">
        <Button 
          variant="ghost" 
          onClick={() => navigate("/products")}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver a Productos
        </Button>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-muted rounded-lg overflow-hidden">
              <img
                src={images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            {images.length > 1 && (
              <div className="flex gap-4">
                {images.map((img: string, idx: number) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 ${
                      selectedImage === idx ? "border-primary" : "border-transparent"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {product.brand && (
              <p className="text-muted-foreground">{product.brand}</p>
            )}
            <h1 className="text-4xl font-bold">{product.name}</h1>
            
            {product.categories && (
              <p className="text-sm text-muted-foreground">
                Categoría: {product.categories.name}
              </p>
            )}

            <div className="text-4xl font-bold text-primary">
              ${product.price.toFixed(2)}
            </div>

            {product.nicotine_level && (
              <div>
                <p className="text-sm font-semibold mb-1">Nivel de Nicotina</p>
                <p className="text-muted-foreground">{product.nicotine_level}</p>
              </div>
            )}

            {product.description && (
              <div>
                <p className="text-sm font-semibold mb-2">Descripción</p>
                <p className="text-muted-foreground leading-relaxed">
                  {product.description}
                </p>
              </div>
            )}

            <div className="flex items-center gap-4">
              {product.stock > 0 ? (
                <>
                  <p className="text-sm">
                    <span className="font-semibold">Stock disponible:</span> {product.stock} unidades
                  </p>
                </>
              ) : (
                <p className="text-destructive font-semibold">Agotado</p>
              )}
            </div>

            <Button 
              size="lg" 
              className="w-full md:w-auto"
              disabled={product.stock === 0}
              onClick={() => {
                addItem({
                  id: product.id,
                  name: product.name,
                  price: product.price,
                  image: images[0],
                  brand: product.brand,
                  stock: product.stock,
                });
                toast.success("Producto agregado al carrito");
              }}
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              Agregar al Carrito
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;