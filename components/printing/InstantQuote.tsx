import { useState } from "react";
import { motion } from "framer-motion";
import { Calculator, Package, Ruler, Palette } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

const materials = [
  { value: "pla", label: "PLA", price: 8 },
  { value: "petg", label: "PETG", price: 12 },
  { value: "abs", label: "ABS", price: 15 },
];

const qualities = [
  { value: "draft", label: "Draft (0.3mm)", multiplier: 0.7 },
  { value: "standard", label: "Standard (0.2mm)", multiplier: 1 },
  { value: "high", label: "High (0.1mm)", multiplier: 1.5 },
  { value: "rush", label: "Rush 24h (+30%)", multiplier: 1.3 },
];

const formatRupees = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 0,
  }).format(value);

const InstantQuote = () => {
  const [material, setMaterial] = useState("pla");
  const [quality, setQuality] = useState("standard");
  const [quantity, setQuantity] = useState(1);
  const [dimensions, setDimensions] = useState({ x: 50, y: 50, z: 50 });

  const mat = materials.find((m) => m.value === material)!;
  const qual = qualities.find((q) => q.value === quality)!;
  const volume = (dimensions.x * dimensions.y * dimensions.z) / 1000;
  const estimatedWeight = Math.max(volume * 0.08, 10);
  const basePrice = estimatedWeight * mat.price * qual.multiplier;
  const total = Math.max(basePrice * quantity, 250);

  return (
    <section id="quote" className="py-24 gradient-mesh">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="text-gradient-primary">Instant Quote</span> Calculator
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Configure your print settings and get a working estimate. Final quotes are confirmed after file review.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8"
        >
          {/* Configuration */}
          <div className="space-y-6 glass rounded-2xl p-5 sm:p-8">
            <div className="flex items-center gap-3 mb-2">
              <Calculator className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold text-foreground">Configure Print</h3>
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                <Palette className="w-4 h-4 inline mr-1" /> Material
              </label>
              <Select value={material} onValueChange={setMaterial}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {materials.map((m) => (
                    <SelectItem key={m.value} value={m.value}>
                      {m.label} - ₹{m.price}/gram
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                <Ruler className="w-4 h-4 inline mr-1" /> Print Quality
              </label>
              <Select value={quality} onValueChange={setQuality}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {qualities.map((q) => (
                    <SelectItem key={q.value} value={q.value}>
                      {q.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Dimensions (mm)
              </label>
              <div className="grid grid-cols-3 gap-3">
                {(["x", "y", "z"] as const).map((axis) => (
                  <div key={axis}>
                    <span className="text-xs text-muted-foreground uppercase">{axis}</span>
                    <Input
                      type="number"
                      min={1}
                      max={500}
                      value={dimensions[axis]}
                      onChange={(e) =>
                        setDimensions((d) => ({
                          ...d,
                          [axis]: Math.max(1, Number(e.target.value)),
                        }))
                      }
                    />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                <Package className="w-4 h-4 inline mr-1" /> Quantity
              </label>
              <Input
                type="number"
                min={1}
                max={1000}
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
              />
            </div>
          </div>

          {/* Quote Result */}
          <div className="glass rounded-2xl p-5 sm:p-8 flex min-w-0 flex-col justify-between">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-6">Estimated Quote</h3>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Material</span>
                  <span className="text-foreground font-medium">{mat.label}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Quality</span>
                  <span className="text-foreground font-medium">{qual.label}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Estimated weight</span>
                  <span className="text-foreground font-medium">{estimatedWeight.toFixed(0)} g</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Quantity</span>
                  <span className="text-foreground font-medium">×{quantity}</span>
                </div>
                <div className="flex min-w-0 flex-col gap-2 border-t border-border pt-4 sm:flex-row sm:items-end sm:justify-between">
                  <span className="text-muted-foreground">Estimated Total</span>
                  <span className="max-w-full break-words text-left font-bold leading-none text-gradient-primary text-3xl sm:text-4xl sm:text-right">
                    ₹{formatRupees(total)}
                  </span>
                </div>
              </div>

              <p className="text-xs text-muted-foreground mb-2">
                * Final price may vary based on model complexity, supports, infill, and post-processing.
                Minimum order ₹250.
              </p>
            </div>

            <Button size="lg" className="w-full glow-primary mt-4" asChild>
              <Link to="/dashboard">Proceed to Order</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default InstantQuote;
