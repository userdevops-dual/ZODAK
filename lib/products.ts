export interface Product {
    id: string;
    name: string;
    price: number;
    description: string;
    images: string[];
    category: string;
    gender: "men" | "women" | "kids";
    sizes: string[];
    colors: string[];
    stockLimit: number;
    badge?: string;
}

export const products: Product[] = [
    {
        id: "h1",
        name: "Essential Heavyweight Hoodie",
        price: 89.00,
        description: "A premium 500GSM organic cotton hoodie. Featuring a structured fit, double-lined hood, and hidden side-seam pockets. Designed for maximum comfort and durability.",
        images: [
            "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=1200&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1200&auto=format&fit=crop"
        ],
        category: "Hoodies",
        gender: "men",
        sizes: ["S", "M", "L", "XL"],
        colors: ["Black", "Charcoal", "Cream"],
        stockLimit: 20,
        badge: "New Arrival"
    },
    {
        id: "h2",
        name: "Oversized Studio Hoodie",
        price: 95.00,
        description: "Extreme oversized silhouette with dropped shoulders. Crafted from brushed-back fleece for a soft, lived-in feel from the first wear.",
        images: [
            "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?q=80&w=1200&auto=format&fit=crop"
        ],
        category: "Hoodies",
        gender: "women",
        sizes: ["XS", "S", "M", "L"],
        colors: ["Grey Marl", "Vintage Blue"],
        stockLimit: 15,
        badge: "Limited Edition"
    },
    {
        id: "h3",
        name: "Minimalist Zip-Up",
        price: 79.00,
        description: "A clean, zip-front hoodie with premium YKK hardware. Minimalist branding and a refined fit makes it perfect for layering.",
        images: [
            "https://images.unsplash.com/photo-1578932750294-f5075e85f44a?q=80&w=1200&auto=format&fit=crop"
        ],
        category: "Hoodies",
        gender: "men",
        sizes: ["M", "L", "XL"],
        colors: ["Olive", "Sand"],
        stockLimit: 12
    },
    {
        id: "h4",
        name: "Cropped Signature Hoodie",
        price: 85.00,
        description: "Modern cropped length with a raw-edge finish. Designed for a high-fashion aesthetic without compromising on cozy comfort.",
        images: [
            "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1200&auto=format&fit=crop"
        ],
        category: "Hoodies",
        gender: "women",
        sizes: ["XS", "S", "M"],
        colors: ["Lavender", "Black"],
        stockLimit: 10,
        badge: "Staff Pick"
    },
    {
        id: "h5",
        name: "Heritage Washed Hoodie",
        price: 110.00,
        description: "Vintage-inspired wash treatment for a unique, faded look. Each piece is individually garment-dyed for a one-of-a-kind finish.",
        images: [
            "https://images.unsplash.com/photo-1610476402324-f7614d6402ec?q=80&w=1200&auto=format&fit=crop"
        ],
        category: "Hoodies",
        gender: "men",
        sizes: ["S", "M", "L", "XL"],
        colors: ["Faded Red", "Washed Clay"],
        stockLimit: 8,
        badge: "Sale"
    },
    {
        id: "h6",
        name: "Tech Fleece Pulse",
        price: 125.00,
        description: "Engineered thermal fleece for lightweight warmth. Features laser-cut detailing and reflective accents for a futuristic techwear look.",
        images: [
            "https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?q=80&w=1200&auto=format&fit=crop"
        ],
        category: "Hoodies",
        gender: "men",
        sizes: ["M", "L", "XL"],
        colors: ["Electric Blue", "Stealth Black"],
        stockLimit: 15
    },
    {
        id: "h7",
        name: "Velour Luxe Hoodie",
        price: 140.00,
        description: "Ultra-soft velour fabric with a premium sheen. Elevated loungewear that brings luxury to your everyday rotation.",
        images: [
            "https://images.unsplash.com/photo-1520333789090-1afc82db536a?q=80&w=1200&auto=format&fit=crop"
        ],
        category: "Hoodies",
        gender: "women",
        sizes: ["XS", "S", "M"],
        colors: ["Emerald", "Wine"],
        stockLimit: 7
    },
    {
        id: "h8",
        name: "Graphic Icon Hoodie",
        price: 89.00,
        description: "Featuring a high-density screen-printed graphic on the chest. Relaxed fit with a slightly shorter length for a modern look.",
        images: [
            "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1200&auto=format&fit=crop"
        ],
        category: "Hoodies",
        gender: "men",
        sizes: ["S", "M", "L"],
        colors: ["White", "Navy"],
        stockLimit: 25
    },
    {
        id: "h9",
        name: "Eco-Loopback Hoodie",
        price: 75.00,
        description: "Made from 100% recycled textile waste. Unbrushed loopback interior for breathable wear throughout the year.",
        images: [
            "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?q=80&w=1200&auto=format&fit=crop"
        ],
        category: "Hoodies",
        gender: "kids",
        sizes: ["6-8Y", "8-10Y", "10-12Y"],
        colors: ["Ocean", "Leaf"],
        stockLimit: 30
    },
    {
        id: "h10",
        name: "Monochrome Patch Hoodie",
        price: 99.00,
        description: "Subtle tone-on-tone rubberized patch on the arm. A sophisticated take on the classic hoodie for a refined minimalist aesthetic.",
        images: [
            "https://images.unsplash.com/photo-1534030347209-467a5b0ad3e6?q=80&w=1200&auto=format&fit=crop"
        ],
        category: "Hoodies",
        gender: "men",
        sizes: ["S", "M", "L", "XL"],
        colors: ["Slate", "Obsidian"],
        stockLimit: 12
    }
];

export function getProductById(id: string) {
    return products.find(p => p.id === id);
}

export function getProductsByCategory(category: string) {
    return products.filter(p => p.category.toLowerCase() === category.toLowerCase());
}

export function getProductsByGender(gender: string) {
    return products.filter(p => p.gender.toLowerCase() === gender.toLowerCase());
}
