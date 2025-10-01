import RegistrationForm from "@/components/RegistrationForm";
import heroImage from "@/assets/hero-image.jpg";
import { Trophy } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${heroImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="relative z-10 container mx-auto px-4 py-24 text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-r from-primary to-secondary p-4 rounded-full shadow-glow">
              <Trophy className="w-12 h-12 text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
            Fun Run Event 2025
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-2xl mx-auto">
            Bergabunglah dengan ribuan pelari dalam acara lari paling seru tahun ini!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center text-white/80">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-accent rounded-full" />
              <span>Kategori Lengkap</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-accent rounded-full" />
              <span>Jersey Gratis</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-accent rounded-full" />
              <span>Sertifikat Digital</span>
            </div>
          </div>
        </div>
      </section>

      {/* Registration Form Section */}
      <section className="py-16 px-4" style={{ background: 'var(--gradient-hero)' }}>
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Daftar Sekarang</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Isi formulir pendaftaran di bawah ini untuk mengamankan tempat Anda dalam event Fun Run 2025
            </p>
          </div>
          <RegistrationForm />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-border">
        <div className="container mx-auto text-center text-muted-foreground">
          <p>&copy; 2025 Fun Run Event. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
