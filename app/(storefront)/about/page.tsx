import Image from "next/image";

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-white">
            {/* Hero */}
            <section className="relative h-[60vh] sm:h-[70vh] flex items-center justify-center bg-gray-100 overflow-hidden">
                {/* Video Background */}
                <div className="absolute inset-0 z-0">
                    <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="w-full h-full object-cover blur-sm scale-105"
                    >
                        <source src="/videos/about-video.mp4" type="video/mp4" />
                    </video>
                    <div className="absolute inset-0 bg-black/40" />
                </div>

                <div className="relative z-10 text-center space-y-4 px-4">
                    <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold uppercase tracking-[0.15em] text-white">Our Story</h1>
                    <p className="text-lg sm:text-xl text-neutral-200 uppercase tracking-widest font-light">Luxury Redefined</p>
                </div>
            </section>

            {/* Mission */}
            <section className="container-mobile mx-auto py-16 sm:py-24 max-w-4xl text-center">
                <h2 className="text-2xl sm:text-3xl font-bold uppercase tracking-widest mb-8">Our Mission</h2>
                <p className="text-gray-600 leading-relaxed text-lg">
                    ZODAK was founded with a singular vision: to create timeless, premium fashion that transcends trends.
                    We believe in the power of minimalism, quality craftsmanship, and sustainable practices.
                    Every piece in our collection is designed to be worn for years, not seasons.
                </p>
            </section>

            {/* Values */}
            <section className="bg-black text-white py-16 sm:py-24">
                <div className="container-mobile mx-auto max-w-5xl">
                    <h2 className="text-2xl sm:text-3xl font-bold uppercase tracking-widest mb-12 text-center">Our Values</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center space-y-4">
                            <div className="text-5xl font-bold tracking-tighter">01</div>
                            <h3 className="text-lg font-bold uppercase tracking-wider">Quality</h3>
                            <p className="text-neutral-400 text-sm">Premium materials and expert craftsmanship in every piece.</p>
                        </div>
                        <div className="text-center space-y-4">
                            <div className="text-5xl font-bold tracking-tighter">02</div>
                            <h3 className="text-lg font-bold uppercase tracking-wider">Sustainability</h3>
                            <p className="text-neutral-400 text-sm">Ethical sourcing and eco-conscious production methods.</p>
                        </div>
                        <div className="text-center space-y-4">
                            <div className="text-5xl font-bold tracking-tighter">03</div>
                            <h3 className="text-lg font-bold uppercase tracking-wider">Timelessness</h3>
                            <p className="text-neutral-400 text-sm">Designs that transcend seasons and fleeting trends.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="container-mobile mx-auto py-16 sm:py-24 max-w-5xl">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    <div>
                        <div className="text-4xl sm:text-5xl font-bold">2020</div>
                        <p className="text-sm uppercase tracking-widest text-gray-500 mt-2">Founded</p>
                    </div>
                    <div>
                        <div className="text-4xl sm:text-5xl font-bold">50+</div>
                        <p className="text-sm uppercase tracking-widest text-gray-500 mt-2">Countries</p>
                    </div>
                    <div>
                        <div className="text-4xl sm:text-5xl font-bold">1M+</div>
                        <p className="text-sm uppercase tracking-widest text-gray-500 mt-2">Customers</p>
                    </div>
                    <div>
                        <div className="text-4xl sm:text-5xl font-bold">100%</div>
                        <p className="text-sm uppercase tracking-widest text-gray-500 mt-2">Sustainable</p>
                    </div>
                </div>
            </section>
        </div>
    );
}
