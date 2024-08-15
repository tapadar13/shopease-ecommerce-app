import { Facebook, Instagram, Mail, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-600 p-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">ShopEase</h3>
            <p className="text-sm">Your one-stop shop for all your needs.</p>
          </div>
          <div>
            <h4 className="text-md font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-primary">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-md font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-primary">
                  Shipping Info
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary">
                  Returns
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary">
                  Order Status
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary">
                  Payment Options
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-md font-semibold mb-4">Connect With Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary">
                <Mail className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200 text-sm text-center">
          <p className="text-primary">
            &copy; 2024 ShopEase. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
