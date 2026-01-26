import { AdminSidebar } from "@/components/admin/Sidebar";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await auth();

    // Protect Admin Routes
    if ((session?.user as any)?.role !== "ADMIN") {
        redirect("/");
    }

    return (
        <div className="flex min-h-screen bg-neutral-50">
            <AdminSidebar />
            <main className="flex-1 overflow-auto">
                <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-8 md:hidden">
                    <span className="font-bold uppercase tracking-widest">ZODAK Admin</span>
                </header>
                <div className="p-8 md:p-12">
                    {children}
                </div>
            </main>
        </div>
    );
}
