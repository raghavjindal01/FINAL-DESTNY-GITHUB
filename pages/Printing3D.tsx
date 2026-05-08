import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PrintingHero from "@/components/printing/PrintingHero";
import FileUploadSection from "@/components/printing/FileUploadSection";
import InstantQuote from "@/components/printing/InstantQuote";
import MaterialsSection from "@/components/printing/MaterialsSection";
import PrintingGallery from "@/components/printing/PrintingGallery";
import PrintingPricing from "@/components/printing/PrintingPricing";

const Printing3D = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <PrintingHero />
      <FileUploadSection />
      <InstantQuote />
      <MaterialsSection />
      <PrintingGallery />
      <PrintingPricing />
      <Footer />
    </div>
  );
};

export default Printing3D;
