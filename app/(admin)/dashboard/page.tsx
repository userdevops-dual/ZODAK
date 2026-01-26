import { db } from "@/lib/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, ShoppingBag, Users, TrendingUp, Package } from "lucide-react";
// Rebuild trigger

async function getStats() {
    try {
        const [orders, users, products] = await Promise.all([
            db.order.findMany({
                include: { items: true }
            }),
            db.user.count(),
            db.product.count()
        ]);

        const totalRevenue = orders.reduce((sum, order) => sum + Number(order.total), 0);
        const pendingOrders = orders.filter(o => o.status === "PENDING").length;
        const completedOrders = orders.filter(o => o.status === "DELIVERED").length;

        return {
            totalRevenue,
            totalOrders: orders.length,
            totalUsers: users,
            totalProducts: products,
            pendingOrders,
            completedOrders
        };
    } catch (error) {
        console.error("Failed to fetch stats:", error);
        return {
            totalRevenue: 0,
            totalOrders: 0,
            totalUsers: 0,
            totalProducts: 0,
            pendingOrders: 0,
            completedOrders: 0
        };
    }
}

async function getRecentOrders() {
    try {
        const orders = await db.order.findMany({
            include: {
                user: true,
                items: {
                    include: { product: true }
                }
            },
            orderBy: { createdAt: 'desc' },
            take: 5
        });
        return orders;
    } catch {
        return [];
    }
}

export default async function AdminDashboard() {
    const stats = await getStats();
    const recentOrders = await getRecentOrders();

    const statCards = [
        { label: "Total Revenue", value: `$${stats.totalRevenue.toFixed(2)}`, icon: DollarSign, change: `${stats.totalOrders} orders` },
        { label: "Total Orders", value: stats.totalOrders.toString(), icon: ShoppingBag, change: `${stats.pendingOrders} pending` },
        { label: "Total Customers", value: stats.totalUsers.toString(), icon: Users, change: "Registered users" },
        { label: "Products", value: stats.totalProducts.toString(), icon: Package, change: "In catalog" }
    ];

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold uppercase tracking-tight">Dashboard Overview</h1>
                <div className="text-sm text-neutral-500">Last updated: {new Date().toLocaleString()}</div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((stat) => (
                    <Card key={stat.label} className="rounded-none border-gray-100 shadow-sm">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium uppercase tracking-wider text-muted-foreground">{stat.label}</CardTitle>
                            <stat.icon className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stat.value}</div>
                            <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Recent Orders Table */}
            <div className="mt-8 border rounded-none bg-white p-6 shadow-sm">
                <h2 className="text-lg font-bold uppercase tracking-wide mb-4">Recent Orders</h2>
                {recentOrders.length === 0 ? (
                    <div className="h-32 flex items-center justify-center text-neutral-400 border-2 border-dashed border-neutral-100">
                        No orders yet
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-gray-100">
                                    <th className="text-left py-3 px-2 text-[10px] uppercase tracking-widest text-gray-500">Order ID</th>
                                    <th className="text-left py-3 px-2 text-[10px] uppercase tracking-widest text-gray-500">Customer</th>
                                    <th className="text-left py-3 px-2 text-[10px] uppercase tracking-widest text-gray-500">Items</th>
                                    <th className="text-left py-3 px-2 text-[10px] uppercase tracking-widest text-gray-500">Total</th>
                                    <th className="text-left py-3 px-2 text-[10px] uppercase tracking-widest text-gray-500">Status</th>
                                    <th className="text-left py-3 px-2 text-[10px] uppercase tracking-widest text-gray-500">Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentOrders.map((order) => (
                                    <tr key={order.id} className="border-b border-gray-50 hover:bg-gray-50">
                                        <td className="py-3 px-2 font-mono text-xs">{order.id.slice(0, 8)}</td>
                                        <td className="py-3 px-2">{order.user?.email || "Guest"}</td>
                                        <td className="py-3 px-2">{order.items.length} items</td>
                                        <td className="py-3 px-2 font-bold">${Number(order.total).toFixed(2)}</td>
                                        <td className="py-3 px-2">
                                            <span className={`text-[10px] uppercase tracking-widest px-2 py-1 ${order.status === "DELIVERED" ? "bg-green-100 text-green-700" :
                                                order.status === "SHIPPED" ? "bg-blue-100 text-blue-700" :
                                                    order.status === "PROCESSING" ? "bg-purple-100 text-purple-700" :
                                                        order.status === "CANCELLED" ? "bg-red-100 text-red-700" :
                                                            "bg-yellow-100 text-yellow-700"
                                                }`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="py-3 px-2 text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
