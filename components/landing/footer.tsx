import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Facebook, Instagram, Linkedin, Twitter, Youtube } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-background border-t border-border pt-20 pb-10">
            <div className="container mx-auto px-6">
                <div className="grid md:grid-cols-4 gap-12 mb-16">
                    <div className="col-span-1 md:col-span-1">
                        <Link href="/" className="inline-block mb-4">
                            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500">
                                KLYP
                            </span>
                        </Link>
                        <p className="text-muted-foreground text-sm mb-6">
                            Turn ideas into viral-ready short videos with AI. KLYP helps creators and businesses generate, schedule, and scale content.
                        </p>
                        <div className="flex gap-4">
                            <Button variant="ghost" size="icon" className="w-8 h-8 text-muted-foreground hover:text-foreground">
                                <Instagram size={18} />
                            </Button>
                            <Button variant="ghost" size="icon" className="w-8 h-8 text-muted-foreground hover:text-foreground">
                                <Youtube size={18} />
                            </Button>
                            <Button variant="ghost" size="icon" className="w-8 h-8 text-muted-foreground hover:text-foreground">
                                <Twitter size={18} />
                            </Button>
                            <Button variant="ghost" size="icon" className="w-8 h-8 text-muted-foreground hover:text-foreground">
                                <Linkedin size={18} />
                            </Button>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-bold mb-6">Product</h4>
                        <ul className="space-y-4 text-sm text-muted-foreground">
                            <li><Link href="#" className="hover:text-foreground">Features</Link></li>
                            <li><Link href="#" className="hover:text-foreground">Pricing</Link></li>
                            <li><Link href="#" className="hover:text-foreground">AI Video Generator</Link></li>
                            <li><Link href="#" className="hover:text-foreground">Scheduler</Link></li>
                            <li><Link href="#" className="hover:text-foreground">Templates</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-6">Company</h4>
                        <ul className="space-y-4 text-sm text-muted-foreground">
                            <li><Link href="#" className="hover:text-foreground">About</Link></li>
                            <li><Link href="#" className="hover:text-foreground">Careers</Link></li>
                            <li><Link href="#" className="hover:text-foreground">Blog</Link></li>
                            <li><Link href="#" className="hover:text-foreground">Press</Link></li>
                            <li><Link href="#" className="hover:text-foreground">Partners</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-6">Resources</h4>
                        <ul className="space-y-4 text-sm text-muted-foreground">
                            <li><Link href="#" className="hover:text-foreground">Help Center</Link></li>
                            <li><Link href="#" className="hover:text-foreground">Documentation</Link></li>
                            <li><Link href="#" className="hover:text-foreground">API</Link></li>
                            <li><Link href="#" className="hover:text-foreground">Status</Link></li>
                            <li><Link href="#" className="hover:text-foreground">Community</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center bg-background text-sm text-muted-foreground">
                    <p>© 2026 KLYP. All rights reserved.</p>
                    <div className="flex gap-8 mt-4 md:mt-0">
                        <Link href="#" className="hover:text-foreground">Privacy Policy</Link>
                        <Link href="#" className="hover:text-foreground">Terms of Service</Link>
                        <Link href="#" className="hover:text-foreground">Cookie Policy</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
