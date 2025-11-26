import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export const AgeVerification = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const verified = localStorage.getItem("age_verified");
    if (!verified) {
      setOpen(true);
    }
  }, []);

  const handleVerify = (isOver18: boolean) => {
    if (isOver18) {
      localStorage.setItem("age_verified", "true");
      setOpen(false);
    } else {
      window.location.href = "https://www.google.com";
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center">Verificación de Edad</DialogTitle>
          <DialogDescription className="text-center pt-4">
            Este sitio web contiene productos relacionados con vapeo.
            Debes ser mayor de 18 años para acceder.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 pt-4">
          <Button onClick={() => handleVerify(true)} className="w-full">
            Soy mayor de 18 años
          </Button>
          <Button onClick={() => handleVerify(false)} variant="outline" className="w-full">
            Soy menor de 18 años
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};