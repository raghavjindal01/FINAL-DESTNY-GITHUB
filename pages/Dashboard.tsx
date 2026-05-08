import { useMemo, useState } from "react";
import {
  AlertTriangle,
  BarChart3,
  Bell,
  Boxes,
  CheckCircle2,
  ClipboardList,
  Download,
  FileBox,
  History,
  Home,
  LogOut,
  MoreHorizontal,
  Package,
  Plus,
  Printer,
  Search,
  Settings,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import destnyLogo from "@/assets/destny-logo.png";

type SectionId =
  | "overview"
  | "quotes"
  | "orders"
  | "jobs"
  | "files"
  | "customers"
  | "inventory"
  | "printers"
  | "analytics"
  | "notifications"
  | "settings";

const navItems: { id: SectionId; label: string; icon: typeof Home }[] = [
  { id: "overview", label: "Overview", icon: Home },
  { id: "quotes", label: "Quote Requests", icon: ClipboardList },
  { id: "orders", label: "Orders", icon: Package },
  { id: "jobs", label: "Print Jobs", icon: Printer },
  { id: "files", label: "Files", icon: FileBox },
  { id: "customers", label: "Customers", icon: Users },
  { id: "inventory", label: "Inventory", icon: Boxes },
  { id: "printers", label: "Printers", icon: Printer },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "settings", label: "Settings", icon: Settings },
];

const metrics = [
  { label: "Total orders this month", value: "184", action: "Orders", detail: "See all orders across your operation" },
  { label: "Active print jobs running", value: "26", action: "Jobs", detail: "Monitor jobs currently in production" },
  { label: "Completed orders delivered", value: "138", action: "Completed", detail: "Review finished work and satisfaction" },
  { label: "Pending quotes", value: "17", action: "Review", detail: "Respond to new quote submissions" },
  { label: "Total customers", value: "142", action: "View", detail: "View all registered customers" },
  { label: "Revenue this month", value: "₹5.8L", action: "Track", detail: "Track total sales performance" },
];

const quotes = [
  ["QR-2026-1847", "Tech Innovations Inc.", "PLA", "50", "Mar 25, 2026", "₹24,500", "New"],
  ["QR-2026-1846", "Design Studio Co.", "PETG", "15", "Mar 22, 2026", "₹8,570", "Under Review"],
  ["QR-2026-1845", "Manufacturing Plus", "ABS", "100", "Mar 30, 2026", "₹11,120", "Approved"],
  ["QR-2026-1844", "Prototype Labs", "PETG", "25", "Mar 20, 2026", "₹5,050", "Rejected"],
];

const orders = [
  ["ORD-2026-3421", "Tech Innovations Inc.", "PLA", "50", "Mar 25, 2026", "₹24,500", "Paid", "New"],
  ["ORD-2026-3420", "Design Studio Co.", "PETG", "15", "Mar 22, 2026", "₹8,570", "Pending", "Under Review"],
  ["ORD-2026-3419", "Manufacturing Plus", "ABS", "100", "Mar 30, 2026", "₹11,120", "Paid", "Approved"],
  ["ORD-2026-3418", "Prototype Labs", "PETG", "25", "Mar 20, 2026", "₹5,050", "Partial", "Rejected"],
];

const jobs = [
  ["PJ-2026-8821", "ORD-2026-3421", "Printer 01", "PLA", "Layer 0.2mm, infill 20%", "3h 45m", "Printing"],
  ["PJ-2026-8820", "ORD-2026-3420", "Printer 04", "Resin", "Layer 0.05mm, infill 100%", "5h 20m", "Queued"],
  ["PJ-2026-8819", "ORD-2026-3419", "Printer 02", "ABS", "Layer 0.3mm, infill 25%", "6h 15m", "Completed"],
  ["PJ-2026-8818", "ORD-2026-3418", "Printer 03", "PETG", "Layer 0.2mm, infill 30%", "4h 30m", "Failed"],
];

const files = [
  ["FILE-001", "mechanical_part_v2.stl", "STL", "24.5 MB", "ORD-2026-3421", "John Smith", "Mar 15, 2026", "v2.0"],
  ["FILE-002", "prototype_design.obj", "OBJ", "18.2 MB", "QUO-2026-1284", "Sarah Johnson", "Mar 14, 2026", "v1.0"],
  ["FILE-003", "assembly_blueprint.step", "STEP", "42.8 MB", "ORD-2026-3419", "Mike Chen", "Mar 10, 2026", "v3.1"],
  ["FILE-004", "specifications.pdf", "PDF", "2.1 MB", "CUST-485", "Emily Davis", "Mar 12, 2026", "v1.0"],
];

const customers = [
  ["CUST-485", "John Smith", "Tech Innovations Inc.", "john@techinnovations.com", "24", "₹1,24,500", "Repeat, Priority"],
  ["CUST-486", "Sarah Johnson", "Design Studio Co.", "sarah@designstudio.com", "8", "₹32,800", "Repeat"],
  ["CUST-487", "Mike Chen", "Manufacturing Plus", "mike@manufacturingplus.com", "45", "₹2,89,500", "VIP, Priority"],
  ["CUST-488", "Emily Davis", "Prototype Labs", "emily@prototypelabs.com", "12", "₹56,700", "Repeat"],
];

const inventory = [
  ["MAT-001", "PLA", "Black", "45.2 kg", "10 kg", "2.3 kg/week", "In Stock", "Mar 10, 2026"],
  ["MAT-002", "ABS", "White", "8.5 kg", "10 kg", "1.8 kg/week", "Low Stock", "Mar 5, 2026"],
  ["MAT-003", "PETG", "Red", "22.8 kg", "15 kg", "1.2 kg/week", "In Stock", "Mar 12, 2026"],
  ["MAT-004", "Resin", "Clear", "3.2 L", "5 L", "0.8 L/week", "Low Stock", "Mar 8, 2026"],
];

const printers = [
  ["PRT-001", "Printer 01", "Prusa i3 MK3S+", "250 x 210 x 210mm", "PLA, ABS +1", "Busy", "PJ-2026-8821", "Mar 10, 2026"],
  ["PRT-002", "Printer 02", "Creality CR-10 V3", "300 x 300 x 400mm", "PLA, ABS +1", "Available", "0 jobs", "Mar 12, 2026"],
  ["PRT-003", "Printer 03", "Ultimaker S5", "330 x 240 x 300mm", "PLA, ABS +2", "Maintenance", "3 jobs", "Mar 15, 2026"],
  ["PRT-004", "Printer 04", "Formlabs Form 3", "145 x 145 x 185mm", "Resin", "Offline", "1 job", "Mar 8, 2026"],
];

const notifications = [
  ["Print Job Completed", "PJ-2026-8819 has been completed successfully on Printer 02", "success"],
  ["Low Stock Alert", "ABS White is running low. Current stock: 8.5 kg", "warning"],
  ["New Quote Request", "QUO-2026-1289 received from Design Studio Co", "info"],
  ["Print Job Failed", "PJ-2026-8818 failed on Printer 03. Reason: Nozzle clog", "danger"],
  ["Delayed Delivery", "ORD-2026-3420 may be delayed due to material shortage", "warning"],
  ["Payment Received", "Payment confirmed for ORD-2026-3421 (₹24,500)", "success"],
];

const statusTone = (status: string) => {
  const lower = status.toLowerCase();
  if (lower.includes("low") || lower.includes("pending") || lower.includes("review") || lower.includes("queued") || lower.includes("busy") || lower.includes("partial") || lower.includes("new")) return "bg-secondary/15 text-secondary border-secondary/30";
  if (lower.includes("failed") || lower.includes("rejected") || lower.includes("offline")) return "bg-destructive/15 text-destructive border-destructive/30";
  if (lower.includes("approved") || lower.includes("paid") || lower.includes("completed") || lower.includes("available") || lower.includes("in stock")) return "bg-primary/15 text-primary border-primary/30";
  return "bg-muted text-muted-foreground border-border";
};

const DataTable = ({ headers, rows }: { headers: string[]; rows: string[][] }) => (
  <div className="overflow-x-auto rounded-2xl border border-border/50 bg-card/30">
    <table className="w-full min-w-[820px] text-sm">
      <thead className="bg-surface-elevated/70 text-muted-foreground">
        <tr>
          {headers.map((header) => (
            <th key={header} className="px-4 py-3 text-left font-medium whitespace-nowrap">{header}</th>
          ))}
          <th className="px-4 py-3 text-right font-medium">Actions</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row[0]} className="border-t border-border/50 hover:bg-muted/30 transition-colors">
            {row.map((cell, index) => (
              <td key={`${row[0]}-${index}`} className="px-4 py-4 align-top">
                {index === row.length - 1 ? (
                  <Badge variant="outline" className={`${statusTone(cell)} whitespace-nowrap`}>{cell}</Badge>
                ) : (
                  <span className={index === 0 ? "font-medium text-foreground" : "text-muted-foreground"}>{cell}</span>
                )}
              </td>
            ))}
            <td className="px-4 py-4 text-right">
              <Button variant="ghost" size="icon" aria-label={`Actions for ${row[0]}`}>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const Toolbar = ({ search, filters, primary, secondary }: { search: string; filters: string[]; primary: string; secondary?: string }) => (
  <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-[minmax(260px,1fr)_repeat(3,150px)]">
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input placeholder={search} className="pl-10 bg-card/70" />
      </div>
      {filters.map((filter) => (
        <Button key={filter} variant="outline" className="justify-start text-muted-foreground">{filter}</Button>
      ))}
    </div>
    <div className="flex flex-wrap gap-3">
      <Button variant="outline" className="gap-2">
        <Download className="h-4 w-4" /> Export
      </Button>
      {secondary && (
        <Button variant="outline" className="gap-2">
          <History className="h-4 w-4" /> {secondary}
        </Button>
      )}
      <Button className="gap-2 glow-primary">
        <Plus className="h-4 w-4" /> {primary}
      </Button>
    </div>
  </div>
);

const Panel = ({ title, description, children }: { title: string; description: string; children: React.ReactNode }) => (
  <Card className="glass border-border/40 rounded-2xl shadow-2xl shadow-black/20">
    <CardHeader>
      <CardTitle>{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
    </CardHeader>
    <CardContent className="space-y-5">{children}</CardContent>
  </Card>
);

const Dashboard = () => {
  const [active, setActive] = useState<SectionId>("overview");
  const activeLabel = useMemo(() => navItems.find((item) => item.id === active)?.label ?? "Overview", [active]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="fixed inset-0 gradient-mesh pointer-events-none" />
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-72 border-r border-border/60 bg-surface-glass/85 backdrop-blur-2xl lg:block">
        <div className="flex h-full flex-col">
          <Link to="/#home" className="px-6 py-6 flex items-center" aria-label="Destny home">
            <img src={destnyLogo} alt="Destny" className="h-9 w-auto object-contain" width={941} height={277} />
          </Link>
          <nav className="flex-1 space-y-1 px-3">
            {navItems.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActive(id)}
                className={`flex w-full items-center gap-3 rounded-xl border px-3 py-2.5 text-sm transition-all ${
                  active === id
                    ? "border-primary/40 bg-primary/15 text-primary shadow-lg shadow-primary/10"
                    : "border-transparent text-muted-foreground hover:border-border/50 hover:bg-muted/50 hover:text-foreground"
                }`}
              >
                <Icon className="h-4 w-4" />
                {label}
              </button>
            ))}
          </nav>
          <div className="p-4">
            <Link to="/">
              <Button variant="outline" className="w-full gap-2">
                <LogOut className="h-4 w-4" /> Back to Site
              </Button>
            </Link>
          </div>
        </div>
      </aside>

      <main className="relative z-10 lg:pl-72">
        <header className="sticky top-0 z-30 border-b border-border/60 bg-surface-glass/80 backdrop-blur-2xl">
          <div className="flex flex-col gap-4 px-5 py-4 lg:flex-row lg:items-center lg:justify-between lg:px-8">
            <div className="flex items-center justify-between gap-4">
              <div className="lg:hidden">
                <img src={destnyLogo} alt="Destny" className="h-7 w-auto" width={941} height={277} />
              </div>
              <div>
                <p className="text-sm font-medium text-primary tracking-widest uppercase">Operations</p>
                <h1 className="font-display text-2xl sm:text-3xl font-bold">{activeLabel}</h1>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="relative min-w-0 flex-1 lg:w-80">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search orders, customers..." className="pl-10 bg-card/70" />
              </div>
              <Button variant="outline" size="icon" aria-label="Open notifications" onClick={() => setActive("notifications")}>
                <Bell className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="flex gap-2 overflow-x-auto px-5 pb-4 lg:hidden">
            {navItems.map(({ id, label }) => (
              <Button key={id} onClick={() => setActive(id)} variant={active === id ? "default" : "outline"} size="sm" className="shrink-0">
                {label}
              </Button>
            ))}
          </div>
        </header>

        <div className="space-y-6 px-5 py-6 lg:px-8">
          {active === "overview" && (
            <>
              <section>
                <p className="text-muted-foreground">Your business at a glance. Track orders, jobs, and revenue in real time.</p>
                <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {metrics.map((metric) => (
                    <Card key={metric.label} className="glass border-border/40 rounded-2xl hover:border-primary/30 transition-colors">
                      <CardHeader className="pb-3">
                        <CardDescription>{metric.label}</CardDescription>
                        <CardTitle className="text-3xl">{metric.value}</CardTitle>
                      </CardHeader>
                      <CardContent className="flex items-end justify-between gap-4">
                        <p className="text-sm text-muted-foreground">{metric.detail}</p>
                        <Badge className="shrink-0">{metric.action}</Badge>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>

              <section className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
                <Panel title="Printer Status" description="Monitor current printer activity and availability.">
                  <div className="grid gap-3 sm:grid-cols-2">
                    {printers.map((printer) => (
                      <div key={printer[0]} className="rounded-2xl border border-border/50 bg-card/30 p-4">
                        <div className="flex items-center justify-between gap-3">
                          <div>
                            <p className="font-medium">{printer[1]}</p>
                            <p className="text-xs text-muted-foreground">{printer[2]}</p>
                          </div>
                          <Badge variant="outline" className={statusTone(printer[5])}>{printer[5]}</Badge>
                        </div>
                        <p className="mt-3 text-sm text-muted-foreground">Queue: {printer[6]}</p>
                      </div>
                    ))}
                  </div>
                </Panel>

                <Panel title="Material Inventory Alerts" description="Low levels trigger alerts before production stops.">
                  <div className="space-y-3">
                    {inventory.map((material) => (
                      <div key={material[0]} className="flex flex-col gap-3 rounded-2xl border border-border/50 bg-card/30 p-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{material[1]}</span>
                            <Badge variant="outline" className={statusTone(material[6])}>{material[6]}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">Remaining stock: {material[3]} • Usage: {material[5]}</p>
                        </div>
                        <Button variant="outline" size="sm">View Inventory</Button>
                      </div>
                    ))}
                  </div>
                </Panel>
              </section>

              <Panel title="Recent Activity" description="Track recent system updates, print jobs, orders, and alerts.">
                <div className="space-y-3">
                  {[
                    "New quote request received from John Doe",
                    "Print job PJ-204 started on Printer 02",
                    "Order ORD-118 marked as completed",
                    "PLA material stock updated",
                    "Print job PJ-198 completed successfully",
                  ].map((activity) => (
                    <div key={activity} className="flex items-center gap-3 rounded-2xl bg-muted/40 px-4 py-3 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      {activity}
                    </div>
                  ))}
                </div>
              </Panel>
            </>
          )}

          {active === "quotes" && (
            <Panel title="Quote Requests" description="Manage and review incoming customer quotation requests.">
              <Toolbar search="Search customer or quote ID..." filters={["Status", "Material", "Date Range"]} primary="Create Quote" />
              <DataTable headers={["Quote ID", "Customer", "Material", "Qty", "Deadline", "Cost", "Status"]} rows={quotes} />
            </Panel>
          )}

          {active === "orders" && (
            <Panel title="Order Management" description="Track and manage customer orders throughout their lifecycle.">
              <Toolbar search="Search customer or order ID..." filters={["Order Status", "Payment Status", "Date Range"]} primary="Create Order" />
              <DataTable headers={["Order ID", "Customer", "Material", "Qty", "Deadline", "Total", "Payment", "Status"]} rows={orders} />
            </Panel>
          )}

          {active === "jobs" && (
            <Panel title="Print Job Management" description="Track and manage print jobs across all printers.">
              <Toolbar search="Search job or order ID..." filters={["Job Status", "Printer", "Material"]} primary="Create Print Job" secondary="History" />
              <DataTable headers={["Job ID", "Order ID", "Printer", "Material", "Settings", "Duration", "Status"]} rows={jobs} />
            </Panel>
          )}

          {active === "files" && (
            <Panel title="File Management" description="Manage and organize customer design files.">
              <Toolbar search="Search files..." filters={["File Type", "Linked To", "Upload Date"]} primary="Upload Files" />
              <DataTable headers={["File ID", "File Name", "Type", "Size", "Linked To", "Uploaded By", "Upload Date", "Version"]} rows={files} />
            </Panel>
          )}

          {active === "customers" && (
            <Panel title="Customer Management" description="Manage customer records and interaction history.">
              <Toolbar search="Search customer..." filters={["Customer Type", "Tags", "Sort By"]} primary="Create Customer" />
              <DataTable headers={["Customer ID", "Name", "Company", "Contact", "Total Orders", "Total Spend", "Tags"]} rows={customers} />
            </Panel>
          )}

          {active === "inventory" && (
            <Panel title="Material & Inventory" description="Track materials, stock levels, and usage.">
              <Toolbar search="Search materials..." filters={["Material Type", "Color", "Stock Status"]} primary="Add Material" />
              <DataTable headers={["Material ID", "Type", "Color", "Stock Quantity", "Reorder Threshold", "Current Usage", "Status", "Last Restocked"]} rows={inventory} />
            </Panel>
          )}

          {active === "printers" && (
            <Panel title="Printer Management" description="Monitor printer status, workload, and maintenance.">
              <Toolbar search="Search printers..." filters={["Status", "Material Support", "Sort By"]} primary="Add Printer" secondary="Logs" />
              <DataTable headers={["Printer ID", "Name", "Model", "Build Volume", "Supported Materials", "Status", "Current Queue", "Last Maintenance"]} rows={printers} />
            </Panel>
          )}

          {active === "analytics" && (
            <Panel title="Analytics & Reporting" description="Business insights and operational metrics.">
              <div className="grid gap-4 md:grid-cols-4">
                {[
                  ["Monthly Revenue", "₹5.8L", "+12.5% vs last month"],
                  ["Monthly Orders", "185", "+8.2% vs last month"],
                  ["Active Customers", "142", "+15.3% vs last month"],
                  ["Printer Utilization", "68%", "-3.1% vs last month"],
                ].map(([label, value, change]) => (
                  <div key={label} className="rounded-2xl border border-border/50 bg-card/30 p-4">
                    <p className="text-sm text-muted-foreground">{label}</p>
                    <p className="mt-2 font-display text-3xl font-bold">{value}</p>
                    <p className="mt-1 text-xs text-primary">{change}</p>
                  </div>
                ))}
              </div>
              <div className="grid gap-4 xl:grid-cols-2">
                <div className="rounded-2xl border border-border/50 bg-card/30 p-5">
                  <h3 className="font-display font-semibold">Revenue Trend</h3>
                  <div className="mt-5 flex h-64 items-end gap-3">
                    {[38, 44, 52, 58, 67, 75, 68, 80].map((value, index) => (
                      <div key={index} className="flex flex-1 flex-col items-center gap-2">
                        <div className="w-full rounded-t-lg bg-primary/80" style={{ height: `${value}%` }} />
                        <span className="text-xs text-muted-foreground">W{index + 1}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="rounded-2xl border border-border/50 bg-card/30 p-5">
                  <h3 className="font-display font-semibold">Material Usage</h3>
                  <div className="mt-5 space-y-4">
                    {[
                      ["PLA", "72%"],
                      ["ABS", "54%"],
                      ["PETG", "48%"],
                      ["Resin", "36%"],
                    ].map(([label, value]) => (
                      <div key={label}>
                        <div className="mb-2 flex justify-between text-sm"><span>{label}</span><span>{value}</span></div>
                        <div className="h-3 rounded-full bg-muted"><div className="h-full rounded-full bg-primary" style={{ width: value }} /></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Panel>
          )}

          {active === "notifications" && (
            <Panel title="Notifications" description="Stay updated with important events and alerts.">
              <div className="flex gap-3">
                <Button>All</Button>
                <Button variant="outline">Mark All as Read</Button>
              </div>
              <div className="space-y-3">
                {notifications.map(([title, body, tone]) => (
                  <div key={title} className="flex flex-col gap-3 rounded-2xl border border-border/50 bg-card/30 p-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex gap-3">
                      <AlertTriangle className={`mt-1 h-5 w-5 ${tone === "danger" ? "text-destructive" : tone === "warning" ? "text-secondary" : "text-primary"}`} />
                      <div>
                        <h3 className="font-display font-semibold">{title}</h3>
                        <p className="text-sm text-muted-foreground">{body}</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Mark as Read</Button>
                  </div>
                ))}
              </div>
            </Panel>
          )}

          {active === "settings" && (
            <Panel title="Settings & Configuration" description="Manage system settings and preferences.">
              <Tabs defaultValue="general" className="w-full">
                <TabsList className="glass grid h-auto w-full grid-cols-2 gap-1 border border-border/40 p-1 sm:inline-grid sm:w-auto sm:grid-cols-4">
                  <TabsTrigger value="general" className="min-w-0 whitespace-normal px-2 py-2 text-center">General</TabsTrigger>
                  <TabsTrigger value="roles" className="min-w-0 whitespace-normal px-2 py-2 text-center">User Roles</TabsTrigger>
                  <TabsTrigger value="notifications" className="min-w-0 whitespace-normal px-2 py-2 text-center">Notifications</TabsTrigger>
                  <TabsTrigger value="pricing" className="min-w-0 whitespace-normal px-2 py-2 text-center">Pricing</TabsTrigger>
                </TabsList>
                <TabsContent value="general" className="mt-5 grid gap-4 md:grid-cols-2">
                  {["Company Name", "Contact Email", "Phone Number", "Address"].map((label) => (
                    <Input key={label} placeholder={label} />
                  ))}
                  {["Auto-approve quotes under ₹50,000", "Require payment before production", "Send delivery notifications"].map((setting) => (
                    <label key={setting} className="flex items-center justify-between gap-4 rounded-2xl border border-border/50 bg-card/30 p-4 md:col-span-2">
                      <span className="min-w-0 text-sm sm:text-base">{setting}</span>
                      <input type="checkbox" className="h-4 w-4 accent-primary" defaultChecked />
                    </label>
                  ))}
                  <Button className="md:col-span-2">Save Changes</Button>
                </TabsContent>
                <TabsContent value="roles" className="mt-5 space-y-3">
                  {["John Admin - Admin", "Sarah Manager - Manager", "Mike Operator - Operator"].map((role) => (
                    <div key={role} className="flex items-center justify-between gap-4 rounded-2xl border border-border/50 bg-card/30 p-4">
                      <span className="min-w-0 text-sm sm:text-base">{role}</span>
                      <Button variant="outline" size="sm">Edit</Button>
                    </div>
                  ))}
                  <Button className="gap-2"><Plus className="h-4 w-4" /> Add User</Button>
                </TabsContent>
                <TabsContent value="notifications" className="mt-5 space-y-3">
                  {["Print job status changes", "Low stock alerts", "Overdue job alerts", "Payment confirmations"].map((setting) => (
                    <label key={setting} className="flex items-center justify-between gap-4 rounded-2xl border border-border/50 bg-card/30 p-4">
                      <span className="min-w-0 text-sm sm:text-base">{setting}</span>
                      <input type="checkbox" className="h-4 w-4 accent-primary" defaultChecked />
                    </label>
                  ))}
                  <Button>Save Preferences</Button>
                </TabsContent>
                <TabsContent value="pricing" className="mt-5 grid gap-4 md:grid-cols-2">
                  {["Material Cost Multiplier", "Machine Cost per Hour", "Post-processing Fee", "Standard Delivery Fee", "PLA ₹ per kg", "ABS ₹ per kg", "PETG ₹ per kg", "Resin ₹ per kg"].map((label) => (
                    <Input key={label} placeholder={label} />
                  ))}
                  <Button className="md:col-span-2">Save Pricing</Button>
                </TabsContent>
              </Tabs>
            </Panel>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
