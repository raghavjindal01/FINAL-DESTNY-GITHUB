import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Download,
  FileText,
  HelpCircle,
  MessageSquareText,
  PackageCheck,
  PackageSearch,
  Printer,
  RotateCcw,
  Search,
  ShieldCheck,
  Truck,
  Upload,
} from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import productOne from "@/assets/3d-print-product1.jpg";
import productTwo from "@/assets/3d-print-product2.jpg";
import productThree from "@/assets/3d-print-product3.jpg";
import productFour from "@/assets/3d-print-product4.jpg";

const activeOrders = [
  {
    id: "ORD-2026-3421",
    title: "Architectural dome display model",
    service: "3D Printing",
    date: "Placed May 8, 2026",
    eta: "Arrives May 15",
    status: "In production",
    progress: 62,
    amount: "₹24,500",
    image: productOne,
    steps: ["Quote approved", "Files checked", "Printing", "Finishing", "Dispatch"],
    currentStep: 2,
  },
  {
    id: "ORD-2026-3398",
    title: "Dual gear drivetrain prototype",
    service: "3D Printing",
    date: "Placed Apr 29, 2026",
    eta: "Review due May 13",
    status: "Client review",
    progress: 84,
    amount: "₹58,000",
    image: productTwo,
    steps: ["CAD checked", "Material set", "Printing", "Fit review", "Dispatch"],
    currentStep: 3,
  },
];

const pastOrders = [
  {
    id: "ORD-2026-3312",
    title: "Ergonomic concept shell",
    service: "3D Printing",
    delivered: "Delivered Apr 22, 2026",
    amount: "₹8,750",
    image: productThree,
  },
  {
    id: "ORD-2026-3274",
    title: "Miniature character figurine",
    service: "3D Printing",
    delivered: "Delivered Apr 10, 2026",
    amount: "₹32,000",
    image: productFour,
  },
  {
    id: "ORD-2026-3199",
    title: "PETG architectural display model",
    service: "3D Printing",
    delivered: "Delivered Mar 26, 2026",
    amount: "₹12,400",
    image: productOne,
  },
];

const updates = [
  ["Today, 11:20 AM", "Print batch 2/3 started on Printer 01."],
  ["Yesterday, 6:45 PM", "Design review notes were resolved by the Destny team."],
  ["May 10, 2026", "Material allocation confirmed for carbon-black PLA."],
];

const summaryCards = [
  { label: "Active orders", value: "2", icon: PackageSearch, tone: "text-primary" },
  { label: "Awaiting review", value: "1", icon: Clock3, tone: "text-cyan-300" },
  { label: "Delivered this year", value: "14", icon: PackageCheck, tone: "text-emerald-300" },
  { label: "Protected files", value: "28", icon: ShieldCheck, tone: "text-secondary" },
];

const Orders = () => (
  <div className="min-h-screen bg-background text-foreground">
    <Navbar />
    <main className="relative overflow-hidden pt-24">
      <div className="fixed inset-0 gradient-mesh pointer-events-none" />

      <section className="relative z-10 border-b border-border/60">
        <div className="container mx-auto px-6 py-10 lg:py-14">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-end">
            <div>
              <Badge variant="outline" className="border-primary/30 bg-primary/10 text-primary">
                Customer workspace
              </Badge>
              <h1 className="mt-5 max-w-3xl font-display text-4xl font-bold tracking-normal sm:text-5xl">
                Your Orders
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
                Track every print, prototype, build, and creative request with clear milestones, documents, invoices, and support in one place.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg" className="glow-primary">
                  <Link to="/3d-printing#quote">
                    Start New Order <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/3d-printing#upload">
                    <Upload className="h-4 w-4" /> Upload Files
                  </Link>
                </Button>
              </div>
            </div>

            <div className="rounded-2xl border border-border/50 bg-card/40 p-5 backdrop-blur-xl">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search order ID, file, or service" className="bg-background/70 pl-10" />
              </div>
              <div className="mt-5 grid grid-cols-2 gap-3">
                {summaryCards.map(({ label, value, icon: Icon, tone }) => (
                  <div key={label} className="rounded-lg border border-border/50 bg-muted/30 p-4">
                    <Icon className={`h-5 w-5 ${tone}`} />
                    <p className="mt-3 font-display text-2xl font-bold">{value}</p>
                    <p className="text-xs text-muted-foreground">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10">
        <div className="container mx-auto grid gap-6 px-6 py-10 xl:grid-cols-[minmax(0,1fr)_360px]">
          <div className="space-y-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="font-display text-2xl font-semibold">Active Orders</h2>
                <p className="mt-1 text-sm text-muted-foreground">Live production status and next checkpoints.</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">All</Button>
                <Button variant="outline" size="sm">Printing</Button>
                <Button variant="outline" size="sm">Review</Button>
              </div>
            </div>

            {activeOrders.map((order) => (
              <Card key={order.id} className="glass border-border/40 rounded-2xl">
                <CardContent className="p-0">
                  <div className="grid gap-0 lg:grid-cols-[220px_minmax(0,1fr)]">
                    <img src={order.image} alt="" className="h-56 w-full object-cover lg:h-full lg:rounded-l-2xl" />
                    <div className="p-5 sm:p-6">
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <Badge variant="outline" className="border-primary/30 bg-primary/10 text-primary">{order.status}</Badge>
                            <span className="text-xs text-muted-foreground">{order.id}</span>
                          </div>
                          <h3 className="mt-3 font-display text-xl font-semibold">{order.title}</h3>
                          <p className="mt-1 text-sm text-muted-foreground">{order.service} • {order.date}</p>
                        </div>
                        <div className="text-left sm:text-right">
                          <p className="font-display text-xl font-semibold">{order.amount}</p>
                          <p className="text-sm text-primary">{order.eta}</p>
                        </div>
                      </div>

                      <div className="mt-6">
                        <div className="mb-2 flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Progress</span>
                          <span className="font-medium">{order.progress}%</span>
                        </div>
                        <Progress value={order.progress} className="h-2 bg-muted" />
                      </div>

                      <div className="mt-6 grid gap-3 md:grid-cols-5">
                        {order.steps.map((step, index) => (
                          <div key={step} className="min-w-0">
                            <div className={`flex h-9 w-9 items-center justify-center rounded-full border ${
                              index <= order.currentStep
                                ? "border-primary/50 bg-primary/15 text-primary"
                                : "border-border bg-muted/30 text-muted-foreground"
                            }`}>
                              {index < order.currentStep ? <CheckCircle2 className="h-4 w-4" /> : index + 1}
                            </div>
                            <p className="mt-2 text-xs text-muted-foreground">{step}</p>
                          </div>
                        ))}
                      </div>

                      <Separator className="my-6 bg-border/60" />

                      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                        <Button variant="outline" className="justify-start">
                          <MessageSquareText className="h-4 w-4" /> Message Team
                        </Button>
                        <Button variant="outline" className="justify-start">
                          <FileText className="h-4 w-4" /> View Brief
                        </Button>
                        <Button variant="outline" className="justify-start">
                          <Download className="h-4 w-4" /> Invoice
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            <div>
              <h2 className="font-display text-2xl font-semibold">Past Orders</h2>
              <div className="mt-4 grid gap-4 md:grid-cols-3">
                {pastOrders.map((order) => (
                  <Card key={order.id} className="glass border-border/40 rounded-2xl">
                    <CardContent className="p-4">
                      <img src={order.image} alt="" className="aspect-[4/3] w-full rounded-lg object-cover" />
                      <div className="mt-4">
                        <Badge variant="outline" className="border-emerald-400/30 bg-emerald-400/10 text-emerald-300">
                          Delivered
                        </Badge>
                        <h3 className="mt-3 font-display font-semibold">{order.title}</h3>
                        <p className="mt-1 text-sm text-muted-foreground">{order.service} • {order.id}</p>
                        <p className="mt-2 text-sm text-primary">{order.delivered}</p>
                      </div>
                      <div className="mt-4 flex items-center justify-between gap-3">
                        <span className="font-semibold">{order.amount}</span>
                        <Button variant="outline" size="sm">
                          <RotateCcw className="h-4 w-4" /> Reorder
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          <aside className="space-y-6">
            <Card className="glass border-border/40 rounded-2xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Truck className="h-5 w-5 text-primary" /> Next Delivery
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-lg border border-border/50 bg-muted/30 p-4">
                  <p className="font-medium">ORD-2026-3421</p>
                  <p className="mt-1 text-sm text-muted-foreground">Expected May 15, 2026 between 10 AM and 2 PM.</p>
                </div>
                <Button className="w-full">Track Shipment</Button>
              </CardContent>
            </Card>

            <Card className="glass border-border/40 rounded-2xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <CalendarDays className="h-5 w-5 text-cyan-300" /> Recent Updates
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {updates.map(([time, update]) => (
                  <div key={time} className="border-l border-primary/40 pl-4">
                    <p className="text-xs text-primary">{time}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{update}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="glass border-border/40 rounded-2xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <HelpCircle className="h-5 w-5 text-secondary" /> Need Help?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <MessageSquareText className="h-4 w-4" /> Contact Support
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Printer className="h-4 w-4" /> Print Consultation
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="h-4 w-4" /> Billing Help
                </Button>
              </CardContent>
            </Card>
          </aside>
        </div>
      </section>
    </main>
    <Footer />
  </div>
);

export default Orders;
