import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, MapPin, Phone } from "lucide-react";

export default function ContactPage() {
    return (
        <div className="min-h-screen pt-20 pb-16 bg-white">
            <div className="container-mobile mx-auto max-w-5xl">
                {/* Header */}
                <div className="text-center mb-12 sm:mb-16">
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-[0.1em] mb-4">Contact Us</h1>
                    <p className="text-gray-500 max-w-xl mx-auto">
                        We're here to help. Reach out to our team for any questions or inquiries.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
                    {/* Contact Info */}
                    <div className="space-y-8">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-black flex items-center justify-center shrink-0">
                                <Mail className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h3 className="text-sm font-bold uppercase tracking-widest mb-1">Email</h3>
                                <p className="text-gray-600">support@zodak.com</p>
                                <p className="text-gray-400 text-sm">We reply within 24 hours</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-black flex items-center justify-center shrink-0">
                                <Phone className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h3 className="text-sm font-bold uppercase tracking-widest mb-1">Phone</h3>
                                <p className="text-gray-600">+1 (888) ZODAK-00</p>
                                <p className="text-gray-400 text-sm">Mon-Fri, 9AM-6PM EST</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-black flex items-center justify-center shrink-0">
                                <MapPin className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h3 className="text-sm font-bold uppercase tracking-widest mb-1">Headquarters</h3>
                                <p className="text-gray-600">123 Fashion Avenue</p>
                                <p className="text-gray-600">New York, NY 10001</p>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <form className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label className="text-[10px] uppercase tracking-widest font-bold">First Name</Label>
                                <Input className="rounded-none border-gray-200 focus:border-black h-12" />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-[10px] uppercase tracking-widest font-bold">Last Name</Label>
                                <Input className="rounded-none border-gray-200 focus:border-black h-12" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label className="text-[10px] uppercase tracking-widest font-bold">Email</Label>
                            <Input type="email" className="rounded-none border-gray-200 focus:border-black h-12" />
                        </div>

                        <div className="space-y-2">
                            <Label className="text-[10px] uppercase tracking-widest font-bold">Subject</Label>
                            <Input className="rounded-none border-gray-200 focus:border-black h-12" />
                        </div>

                        <div className="space-y-2">
                            <Label className="text-[10px] uppercase tracking-widest font-bold">Message</Label>
                            <textarea
                                className="w-full border border-gray-200 focus:border-black p-4 min-h-[150px] focus:outline-none"
                                placeholder="How can we help?"
                            />
                        </div>

                        <Button className="w-full h-14 bg-black text-white hover:bg-neutral-800 rounded-none uppercase tracking-[0.2em] text-xs font-bold">
                            Send Message
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
}
