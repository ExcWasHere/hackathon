import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "Farming Helper - Support Center" },
    { name: "description", content: "Get help with your farming needs" },
  ];
};

export default function SupportPage() {
  const supportCategories = [
    {
      title: "FAQ",
      description: "Find answers to commonly asked questions about farming techniques, equipment, and best practices",
      icon: (
        <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      ),
      links: [
        { text: "Crop Management", href: "#" },
        { text: "Equipment Guide", href: "#" },
        { text: "Pest Control", href: "#" },
        { text: "Soil Health", href: "#" },
      ],
    },
    {
      title: "Contact Us",
      description: "Get personalized support from our team of agricultural experts available 24/7",
      icon: (
        <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
        </svg>
      ),
      links: [
        { text: "Chat Support", href: "#" },
        { text: "Email Us", href: "#" },
        { text: "Schedule Call", href: "#" },
        { text: "Regional Offices", href: "#" },
      ],
    },
    {
      title: "Help Center",
      description: "Access comprehensive guides, video tutorials, and documentation for all your farming needs",
      icon: (
        <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
        </svg>
      ),
      links: [
        { text: "Getting Started", href: "#" },
        { text: "Video Tutorials", href: "#" },
        { text: "User Guides", href: "#" },
        { text: "Common Issues", href: "#" },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-emerald-600 shadow-lg sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-white">TERRATOPIA</h1>
            <div className="hidden md:flex space-x-6">
              <Link to="/" className="text-white hover:text-emerald-200 transition-colors">Home</Link>
              <Link to="/about-us" className="text-white hover:text-emerald-200 transition-colors">About</Link>
            </div>
            <button className="md:hidden text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Support Center</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get the help you need to succeed in your farming endeavors. Our comprehensive support system is designed to assist you at every step.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search for help..."
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-shadow"
            />
            <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Support Categories Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {supportCategories.map((category, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="p-6">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  {category.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2 text-center">{category.title}</h3>
                <p className="text-gray-600 mb-6 text-center">{category.description}</p>
                
                {/* Quick Links */}
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900 mb-2">Quick Links:</h4>
                  {category.links.map((link, linkIndex) => (
                    <Link
                      key={linkIndex}
                      to={link.href}
                      className="block text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 px-3 py-2 rounded-md transition-colors"
                    >
                      {link.text} →
                    </Link>
                  ))}
                </div>
                
                <div className="mt-6 text-center">
                  <Link
                    to={`/support/${category.title.toLowerCase()}`}
                    className="inline-block bg-emerald-600 text-white px-6 py-2 rounded-md hover:bg-emerald-700 transition-colors duration-300"
                  >
                    View All {category.title} Resources
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Emergency Support Banner */}
        <div className="mt-12 bg-red-50 border border-red-200 rounded-lg p-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center mb-4 md:mb-0">
              <svg className="w-8 h-8 text-red-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <div>
                <h3 className="text-lg font-semibold text-red-800">Need Emergency Support?</h3>
                <p className="text-red-600">Our emergency team is available 24/7</p>
              </div>
            </div>
            <Link
              to="/emergency"
              className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition-colors duration-300"
            >
              Get Emergency Help
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link to="/about" className="text-gray-600 hover:text-emerald-600">About Us</Link></li>
                <li><Link to="/careers" className="text-gray-600 hover:text-emerald-600">Careers</Link></li>
                <li><Link to="/blog" className="text-gray-600 hover:text-emerald-600">Blog</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Support</h3>
              <ul className="space-y-2">
                <li><Link to="/faq" className="text-gray-600 hover:text-emerald-600">FAQ</Link></li>
                <li><Link to="/contact" className="text-gray-600 hover:text-emerald-600">Contact</Link></li>
                <li><Link to="/help" className="text-gray-600 hover:text-emerald-600">Help Center</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><Link to="/privacy" className="text-gray-600 hover:text-emerald-600">Privacy Policy</Link></li>
                <li><Link to="/terms" className="text-gray-600 hover:text-emerald-600">Terms of Service</Link></li>
                <li><Link to="/cookies" className="text-gray-600 hover:text-emerald-600">Cookie Policy</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Connect</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-emerald-600">
                  <span className="sr-only">Facebook</span>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-emerald-600">
                    <span className="sr-only">Instagram</span>
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-emerald-600">
                    <span className="sr-only">YouTube</span>
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd" />
                    </svg>
                  </a>
                </div>
                
                <div className="mt-6">
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">Subscribe to our newsletter</h4>
                  <form className="flex space-x-2">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="flex-1 px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                    <button
                      type="submit"
                      className="bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700 transition-colors"
                    >
                      Subscribe
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-center text-gray-600">© 2024 Farming Helper. All rights reserved.</p>
          </div>
      </footer>
    </div>
  );
}

