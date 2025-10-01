import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { User, Heart, ShoppingBag, CreditCard, ChevronRight, ChevronLeft, Image as ImageIcon } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import sizeChartImage from "@/assets/size-chart.png";

type FormStep = 1 | 2 | 3 | 4 | 5;

interface FormData {
  email: string;
  registeringFor: "self" | "other";
  fullName: string;
  birthDate: string;
  gender: "male" | "female" | "";
  address: string;
  idNumber: string;
  bibName: string;
  registeredFrom: "community" | "company" | "organization" | "personal" | "";
  registeredFromName: string;
  infoSource: "friend" | "social" | "print" | "";
  bloodType: "A" | "B" | "O" | "AB" | "";
  chronicDisease: "yes" | "no" | "";
  underCare: "yes" | "no" | "";
  medication: "yes" | "no" | "";
  complications: "yes" | "no" | "";
  emergencyContact: string;
  jerseySize: "S" | "M" | "L" | "XL" | "XXL" | "XXXL" | "";
  category: "student" | "general" | "";
}

const RegistrationForm = () => {
  const [currentStep, setCurrentStep] = useState<FormStep>(1);
  const [formData, setFormData] = useState<FormData>({
    email: "",
    registeringFor: "self",
    fullName: "",
    birthDate: "",
    gender: "",
    address: "",
    idNumber: "",
    bibName: "",
    registeredFrom: "",
    registeredFromName: "",
    infoSource: "",
    bloodType: "",
    chronicDisease: "",
    underCare: "",
    medication: "",
    complications: "",
    emergencyContact: "",
    jerseySize: "",
    category: "",
  });

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validateStep = (step: FormStep): boolean => {
    switch (step) {
      case 1:
        if (!formData.email || !formData.email.includes("@")) {
          toast({
            title: "Email tidak valid",
            description: "Mohon masukkan alamat email yang valid",
            variant: "destructive",
          });
          return false;
        }
        return true;
      case 2:
        if (!formData.fullName || !formData.birthDate || !formData.gender || 
            !formData.address || !formData.idNumber || !formData.bibName || 
            !formData.registeredFrom || !formData.infoSource) {
          toast({
            title: "Data belum lengkap",
            description: "Mohon lengkapi semua informasi peserta",
            variant: "destructive",
          });
          return false;
        }
        if (formData.registeredFrom !== "personal" && !formData.registeredFromName) {
          toast({
            title: "Nama belum diisi",
            description: "Mohon isi nama komunitas/perusahaan/organisasi",
            variant: "destructive",
          });
          return false;
        }
        if (formData.bibName.length > 10) {
          toast({
            title: "Nama BIB terlalu panjang",
            description: "Maksimal 10 karakter",
            variant: "destructive",
          });
          return false;
        }
        return true;
      case 3:
        if (!formData.bloodType || !formData.chronicDisease || !formData.underCare || 
            !formData.medication || !formData.complications || !formData.emergencyContact) {
          toast({
            title: "Kuesioner belum lengkap",
            description: "Mohon lengkapi semua pertanyaan kuesioner",
            variant: "destructive",
          });
          return false;
        }
        return true;
      case 4:
        if (!formData.jerseySize) {
          toast({
            title: "Ukuran jersey belum dipilih",
            description: "Mohon pilih ukuran jersey Anda",
            variant: "destructive",
          });
          return false;
        }
        return true;
      case 5:
        if (!formData.category) {
          toast({
            title: "Kategori belum dipilih",
            description: "Mohon pilih kategori pendaftar",
            variant: "destructive",
          });
          return false;
        }
        return true;
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 5) as FormStep);
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1) as FormStep);
  };

  const handleSubmit = () => {
    if (validateStep(5)) {
      toast({
        title: "Pendaftaran Berhasil!",
        description: "Terima kasih telah mendaftar. Kami akan mengirimkan konfirmasi ke email Anda.",
      });
      console.log("Form Data:", formData);
    }
  };

  const progress = (currentStep / 5) * 100;

  const stepIcons = [
    { icon: User, label: "Email" },
    { icon: User, label: "Informasi" },
    { icon: Heart, label: "Kuesioner" },
    { icon: ShoppingBag, label: "Race Pack" },
    { icon: CreditCard, label: "Pembayaran" },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="mb-8">
        <Progress value={progress} className="h-2 mb-6" />
        <div className="flex justify-between mb-2">
          {stepIcons.map((item, index) => {
            const StepIcon = item.icon;
            const stepNumber = index + 1;
            return (
              <div key={stepNumber} className="flex flex-col items-center flex-1">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                    currentStep >= stepNumber
                      ? "bg-gradient-to-r from-primary to-secondary text-primary-foreground shadow-glow"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  <StepIcon className="w-5 h-5" />
                </div>
                <span className="text-xs mt-2 text-center font-medium">{item.label}</span>
              </div>
            );
          })}
        </div>
      </div>

      <Card className="p-8 shadow-card">
        {currentStep === 1 && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Masukkan Email
              </h2>
              <p className="text-muted-foreground">Mulai pendaftaran Anda dengan email</p>
            </div>
            <div className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="nama@email.com"
                  value={formData.email}
                  onChange={(e) => updateFormData("email", e.target.value)}
                  className="mt-2"
                />
              </div>
              <div>
                <Label>Mendaftar untuk</Label>
                <RadioGroup
                  value={formData.registeringFor}
                  onValueChange={(value) => updateFormData("registeringFor", value)}
                  className="mt-2"
                >
                  <div className="flex items-center space-x-2 p-4 rounded-lg border border-border hover:border-primary transition-colors">
                    <RadioGroupItem value="self" id="self" />
                    <Label htmlFor="self" className="flex-1 cursor-pointer">
                      Diri sendiri ({formData.email || "email"})
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-4 rounded-lg border border-border hover:border-primary transition-colors">
                    <RadioGroupItem value="other" id="other" />
                    <Label htmlFor="other" className="flex-1 cursor-pointer">
                      Orang lain
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Informasi Peserta
              </h2>
              <p className="text-muted-foreground">Lengkapi data diri Anda</p>
            </div>
            <div className="grid gap-4">
              <div>
                <Label htmlFor="fullName">Nama Lengkap</Label>
                <p className="text-sm text-muted-foreground mb-2">Sesuai data eKTP / Akta Kelahiran</p>
                <Input
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) => updateFormData("fullName", e.target.value)}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="birthDate">Tanggal Lahir</Label>
                  <Input
                    id="birthDate"
                    type="date"
                    value={formData.birthDate}
                    onChange={(e) => updateFormData("birthDate", e.target.value)}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label>Jenis Kelamin</Label>
                  <RadioGroup
                    value={formData.gender}
                    onValueChange={(value) => updateFormData("gender", value)}
                    className="flex gap-4 mt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="male" id="male" />
                      <Label htmlFor="male">Pria</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="female" id="female" />
                      <Label htmlFor="female">Wanita</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
              <div>
                <Label htmlFor="address">Alamat Saat Ini</Label>
                <Textarea
                  id="address"
                  value={formData.address}
                  onChange={(e) => updateFormData("address", e.target.value)}
                  className="mt-2"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="idNumber">No KTP</Label>
                  <Input
                    id="idNumber"
                    value={formData.idNumber}
                    onChange={(e) => updateFormData("idNumber", e.target.value)}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="bibName">Nama di BIB Number</Label>
                  <p className="text-sm text-muted-foreground mb-2">Maksimal 10 Karakter</p>
                  <Input
                    id="bibName"
                    value={formData.bibName}
                    onChange={(e) => updateFormData("bibName", e.target.value)}
                    maxLength={10}
                  />
                </div>
              </div>
              <div>
                <Label>Terdaftar dari</Label>
                <RadioGroup
                  value={formData.registeredFrom}
                  onValueChange={(value) => updateFormData("registeredFrom", value)}
                  className="mt-2 space-y-2"
                >
                  {["community", "company", "organization", "personal"].map((type) => (
                    <div key={type}>
                      <div className="flex items-center space-x-2 p-3 rounded-lg border border-border hover:border-primary transition-colors">
                        <RadioGroupItem value={type} id={type} />
                        <Label htmlFor={type} className="flex-1 cursor-pointer capitalize">
                          {type === "community" && "Komunitas"}
                          {type === "company" && "Perusahaan"}
                          {type === "organization" && "Organisasi"}
                          {type === "personal" && "Personal"}
                        </Label>
                      </div>
                      {formData.registeredFrom === type && type !== "personal" && (
                        <Input
                          placeholder="Nama"
                          value={formData.registeredFromName}
                          onChange={(e) => updateFormData("registeredFromName", e.target.value)}
                          className="mt-2 ml-6"
                        />
                      )}
                    </div>
                  ))}
                </RadioGroup>
              </div>
              <div>
                <Label>Mengetahui informasi pendaftaran dari</Label>
                <RadioGroup
                  value={formData.infoSource}
                  onValueChange={(value) => updateFormData("infoSource", value)}
                  className="mt-2 space-y-2"
                >
                  <div className="flex items-center space-x-2 p-3 rounded-lg border border-border hover:border-primary transition-colors">
                    <RadioGroupItem value="friend" id="friend" />
                    <Label htmlFor="friend" className="flex-1 cursor-pointer">Teman</Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 rounded-lg border border-border hover:border-primary transition-colors">
                    <RadioGroupItem value="social" id="social" />
                    <Label htmlFor="social" className="flex-1 cursor-pointer">Sosial Media</Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 rounded-lg border border-border hover:border-primary transition-colors">
                    <RadioGroupItem value="print" id="print" />
                    <Label htmlFor="print" className="flex-1 cursor-pointer">Media Cetak</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Kuesioner Kesehatan
              </h2>
              <p className="text-muted-foreground">Informasi penting untuk keamanan Anda</p>
            </div>
            <div className="space-y-6">
              <div>
                <Label>Golongan Darah</Label>
                <RadioGroup
                  value={formData.bloodType}
                  onValueChange={(value) => updateFormData("bloodType", value)}
                  className="flex gap-4 mt-2 flex-wrap"
                >
                  {["A", "B", "O", "AB"].map((type) => (
                    <div key={type} className="flex items-center space-x-2 p-3 rounded-lg border border-border hover:border-primary transition-colors flex-1 min-w-[100px]">
                      <RadioGroupItem value={type} id={`blood-${type}`} />
                      <Label htmlFor={`blood-${type}`} className="cursor-pointer">{type}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div>
                <Label>Apakah Anda memiliki penyakit kronis / kondisi medis lainnya?</Label>
                <RadioGroup
                  value={formData.chronicDisease}
                  onValueChange={(value) => updateFormData("chronicDisease", value)}
                  className="flex gap-4 mt-2"
                >
                  <div className="flex items-center space-x-2 p-3 rounded-lg border border-border hover:border-primary transition-colors flex-1">
                    <RadioGroupItem value="yes" id="chronic-yes" />
                    <Label htmlFor="chronic-yes" className="cursor-pointer">Ya</Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 rounded-lg border border-border hover:border-primary transition-colors flex-1">
                    <RadioGroupItem value="no" id="chronic-no" />
                    <Label htmlFor="chronic-no" className="cursor-pointer">Tidak</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label>Apakah saat ini Anda sedang berada di bawah perawatan dokter?</Label>
                <RadioGroup
                  value={formData.underCare}
                  onValueChange={(value) => updateFormData("underCare", value)}
                  className="flex gap-4 mt-2"
                >
                  <div className="flex items-center space-x-2 p-3 rounded-lg border border-border hover:border-primary transition-colors flex-1">
                    <RadioGroupItem value="yes" id="care-yes" />
                    <Label htmlFor="care-yes" className="cursor-pointer">Ya</Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 rounded-lg border border-border hover:border-primary transition-colors flex-1">
                    <RadioGroupItem value="no" id="care-no" />
                    <Label htmlFor="care-no" className="cursor-pointer">Tidak</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label>Apakah Anda diharuskan minum obat untuk penyakit tersebut?</Label>
                <RadioGroup
                  value={formData.medication}
                  onValueChange={(value) => updateFormData("medication", value)}
                  className="flex gap-4 mt-2"
                >
                  <div className="flex items-center space-x-2 p-3 rounded-lg border border-border hover:border-primary transition-colors flex-1">
                    <RadioGroupItem value="yes" id="med-yes" />
                    <Label htmlFor="med-yes" className="cursor-pointer">Ya</Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 rounded-lg border border-border hover:border-primary transition-colors flex-1">
                    <RadioGroupItem value="no" id="med-no" />
                    <Label htmlFor="med-no" className="cursor-pointer">Tidak</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label>Apakah Anda pernah mengalami kejadian buruk atau komplikasi yang terkait dengan penyakit Anda selama berkegiatan fisik?</Label>
                <RadioGroup
                  value={formData.complications}
                  onValueChange={(value) => updateFormData("complications", value)}
                  className="flex gap-4 mt-2"
                >
                  <div className="flex items-center space-x-2 p-3 rounded-lg border border-border hover:border-primary transition-colors flex-1">
                    <RadioGroupItem value="yes" id="comp-yes" />
                    <Label htmlFor="comp-yes" className="cursor-pointer">Ya</Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 rounded-lg border border-border hover:border-primary transition-colors flex-1">
                    <RadioGroupItem value="no" id="comp-no" />
                    <Label htmlFor="comp-no" className="cursor-pointer">Tidak</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label htmlFor="emergencyContact">Nomor Telepon Kontak Darurat</Label>
                <Input
                  id="emergencyContact"
                  type="tel"
                  placeholder="+62"
                  value={formData.emergencyContact}
                  onChange={(e) => updateFormData("emergencyContact", e.target.value)}
                  className="mt-2"
                />
              </div>
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Race Pack
              </h2>
              <p className="text-muted-foreground">Pilih ukuran jersey Anda</p>
            </div>
            
            <div className="bg-muted/50 p-6 rounded-lg mb-6">
              <div className="flex items-start gap-4 mb-4">
                <ImageIcon className="w-5 h-5 text-primary mt-1" />
                <div>
                  <p className="font-medium mb-2">Panduan Ukuran Jersey</p>
                  <p className="text-sm text-muted-foreground mb-4">
                    Jersey dalam ukuran standar. Silahkan dipilih sesuai tabel ukuran yang tertera. 
                    Mohon diperhatikan bahwa penukaran ukuran tidak tersedia setelah pemilihan ini.
                  </p>
                </div>
              </div>
              
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full">
                    <ImageIcon className="w-4 h-4 mr-2" />
                    Lihat Panduan Ukuran
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl">
                  <img src={sizeChartImage} alt="Panduan Ukuran Jersey" className="w-full h-auto" />
                </DialogContent>
              </Dialog>
            </div>

            <div>
              <Label>Pilih Ukuran</Label>
              <RadioGroup
                value={formData.jerseySize}
                onValueChange={(value) => updateFormData("jerseySize", value)}
                className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4"
              >
                {["S", "M", "L", "XL", "XXL", "XXXL"].map((size) => (
                  <div key={size} className="flex items-center justify-center space-x-2 p-4 rounded-lg border-2 border-border hover:border-primary transition-colors cursor-pointer has-[:checked]:border-primary has-[:checked]:bg-primary/5">
                    <RadioGroupItem value={size} id={`size-${size}`} />
                    <Label htmlFor={`size-${size}`} className="cursor-pointer text-lg font-semibold">{size}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </div>
        )}

        {currentStep === 5 && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Pembayaran Pendaftaran
              </h2>
              <p className="text-muted-foreground">Pilih kategori pendaftar</p>
            </div>
            <div>
              <Label>Kategori Pendaftar</Label>
              <RadioGroup
                value={formData.category}
                onValueChange={(value) => updateFormData("category", value)}
                className="mt-4 space-y-4"
              >
                <div className="flex items-center space-x-4 p-6 rounded-lg border-2 border-border hover:border-primary transition-colors cursor-pointer has-[:checked]:border-primary has-[:checked]:bg-primary/5">
                  <RadioGroupItem value="student" id="student" />
                  <div className="flex-1">
                    <Label htmlFor="student" className="cursor-pointer text-lg font-semibold block mb-1">
                      Pelajar
                    </Label>
                    <p className="text-sm text-muted-foreground">Untuk pelajar dan mahasiswa</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 p-6 rounded-lg border-2 border-border hover:border-primary transition-colors cursor-pointer has-[:checked]:border-primary has-[:checked]:bg-primary/5">
                  <RadioGroupItem value="general" id="general" />
                  <div className="flex-1">
                    <Label htmlFor="general" className="cursor-pointer text-lg font-semibold block mb-1">
                      Umum
                    </Label>
                    <p className="text-sm text-muted-foreground">Untuk peserta umum</p>
                  </div>
                </div>
              </RadioGroup>
            </div>

            <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-6 rounded-lg mt-8">
              <h3 className="font-semibold mb-4">Ringkasan Pendaftaran</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Nama:</span>
                  <span className="font-medium">{formData.fullName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Email:</span>
                  <span className="font-medium">{formData.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Ukuran Jersey:</span>
                  <span className="font-medium">{formData.jerseySize}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Kategori:</span>
                  <span className="font-medium capitalize">{formData.category === "student" ? "Pelajar" : "Umum"}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-between mt-8 gap-4">
          {currentStep > 1 && (
            <Button onClick={prevStep} variant="outline" className="flex-1">
              <ChevronLeft className="w-4 h-4 mr-2" />
              Kembali
            </Button>
          )}
          {currentStep < 5 ? (
            <Button onClick={nextStep} className="flex-1 ml-auto bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity">
              Selanjutnya
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button onClick={handleSubmit} className="flex-1 ml-auto bg-gradient-to-r from-accent to-primary hover:opacity-90 transition-opacity">
              Selesaikan Pendaftaran
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
};

export default RegistrationForm;
