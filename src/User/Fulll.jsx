import React from 'react';

const PerfumeLandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fdfcfb] to-[#e2d1c3] text-gray-700">
      {/* Header/Navigation */}
      <header className="bg-white bg-opacity-80 backdrop-blur-sm py-4 px-6 fixed w-full z-10">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold font-playfair text-amber-800">LUXE</div>
          <nav className="hidden md:flex space-x-8">
            <a href="#" className="hover:text-amber-700 transition">Home</a>
            <a href="#" className="hover:text-amber-700 transition">Collection</a>
            <a href="#" className="hover:text-amber-700 transition">About</a>
            <a href="#" className="hover:text-amber-700 transition">Contact</a>
          </nav>
          <div className="flex space-x-4">
            <button className="p-2 hover:text-amber-700 transition">
              <i className="fas fa-search"></i>
            </button>
            <button className="p-2 hover:text-amber-700 transition">
              <i className="fas fa-shopping-bag"></i>
            </button>
            <button className="md:hidden p-2 hover:text-amber-700 transition">
              <i className="fas fa-bars"></i>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 font-playfair text-amber-800">
              Fell in love with<br />
              <span className="text-amber-600">Our Signature</span>
            </h1>
            <h2 className="text-3xl md:text-4xl mb-8 font-playfair text-amber-700">Perfume's Essence</h2>
            <p className="text-lg mb-8 max-w-md mx-auto md:mx-0">
              Discover the captivating blend of rare flowers and spices that create our signature scent, loved by thousands around the world.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <button className="bg-amber-700 hover:bg-amber-800 text-white px-8 py-3 rounded-full transition shadow-lg">
                Shop Now
              </button>
              <button className="border border-amber-700 text-amber-700 hover:bg-amber-50 px-8 py-3 rounded-full transition">
                Learn More
              </button>
            </div>
          </div>
          <div className="flex justify-center">
            <img 
              src="../../public/images/" 
              alt="Luxury Perfume Bottle" 
              className="perfume-bottle h-96 w-auto object-contain"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 bg-white bg-opacity-50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16 font-playfair text-amber-800">Why Choose Our Signature</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center ingredient-card">
              <div className="text-amber-700 text-4xl mb-4">
                <i className="fas fa-leaf"></i>
              </div>
              <h3 className="text-xl font-semibold mb-3">Natural Ingredients</h3>
              <p className="text-gray-600">Crafted with the finest natural ingredients sourced from sustainable gardens around the world.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center ingredient-card">
              <div className="text-amber-700 text-4xl mb-4">
                <i className="fas fa-clock"></i>
              </div>
              <h3 className="text-xl font-semibold mb-3">Long Lasting</h3>
              <p className="text-gray-600">Our unique formulation ensures the fragrance lasts throughout the day with just a single application.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center ingredient-card">
              <div className="text-amber-700 text-4xl mb-4">
                <i className="fas fa-heart"></i>
              </div>
              <h3 className="text-xl font-semibold mb-3">Loved by Many</h3>
              <p className="text-gray-600">Join thousands of satisfied customers who have made our signature scent their everyday favorite.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Ingredients Section */}
      <section className="py-16 px-6">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16 font-playfair text-amber-800">Key Ingredients</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-amber-100 h-40 w-40 rounded-full mx-auto flex items-center justify-center mb-4">
                <i className="fas fa-rose text-5xl text-amber-700"></i>
              </div>
              <h3 className="font-semibold">Bulgarian Rose</h3>
            </div>
            <div className="text-center">
              <div className="bg-amber-100 h-40 w-40 rounded-full mx-auto flex items-center justify-center mb-4">
                <i className="fas fa-tree text-5xl text-amber-700"></i>
              </div>
              <h3 className="font-semibold">Sandalwood</h3>
            </div>
            <div className="text-center">
              <div className="bg-amber-100 h-40 w-40 rounded-full mx-auto flex items-center justify-center mb-4">
                <i className="fas fa-lemon text-5xl text-amber-700"></i>
              </div>
              <h3 className="font-semibold">Bergamot</h3>
            </div>
            <div className="text-center">
              <div className="bg-amber-100 h-40 w-40 rounded-full mx-auto flex items-center justify-center mb-4">
                <i className="fas fa-seedling text-5xl text-amber-700"></i>
              </div>
              <h3 className="font-semibold">Vanilla Orchid</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-6 bg-amber-50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16 font-playfair text-amber-800">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex text-amber-400 mb-3">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
              </div>
              <p className="text-gray-600 mb-4">"This is the most beautiful fragrance I've ever worn. I constantly get compliments whenever I wear it."</p>
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-gray-300 mr-3"></div>
                <div>
                  <h4 className="font-semibold">Sarah Johnson</h4>
                  <p className="text-sm text-gray-500">Loyal Customer</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex text-amber-400 mb-3">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
              </div>
              <p className="text-gray-600 mb-4">"The scent is so unique and lasts all day. It's become my signature scent that I wear for every occasion."</p>
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-gray-300 mr-3"></div>
                <div>
                  <h4 className="font-semibold">Michael Thompson</h4>
                  <p className="text-sm text-gray-500">Perfume Enthusiast</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-amber-800 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 font-playfair">Experience the Essence</h2>
          <p className="text-xl max-w-2xl mx-auto mb-8">Join our community of fragrance lovers and discover your new signature scent today.</p>
          <button className="bg-white text-amber-800 hover:bg-amber-100 px-8 py-3 rounded-full transition shadow-lg font-semibold">
            Shop The Collection
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-6">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 font-playfair">LUXE</h3>
            <p className="text-gray-400">Crafting exceptional fragrances that become part of your story.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">SHOP</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition">All Products</a></li>
              <li><a href="#" className="hover:text-white transition">Best Sellers</a></li>
              <li><a href="#" className="hover:text-white transition">New Arrivals</a></li>
              <li><a href="#" className="hover:text-white transition">Offers</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">HELP</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition">FAQ</a></li>
              <li><a href="#" className="hover:text-white transition">Shipping & Returns</a></li>
              <li><a href="#" className="hover:text-white transition">Track Order</a></li>
              <li><a href="#" className="hover:text-white transition">Contact Us</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">CONNECT</h4>
            <div className="flex space-x-4 mb-4">
              <a href="#" className="h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-amber-700 transition">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-amber-700 transition">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-amber-700 transition">
                <i className="fab fa-pinterest"></i>
              </a>
            </div>
            <p className="text-gray-400">Subscribe to our newsletter</p>
            <div className="mt-2 flex">
              <input type="email" placeholder="Your email" className="px-4 py-2 rounded-l-lg bg-gray-800 text-white w-full" />
              <button className="bg-amber-700 hover:bg-amber-800 px-4 rounded-r-lg">
                <i className="fas fa-arrow-right"></i>
              </button>
            </div>
          </div>
        </div>
        <div className="container mx-auto mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>© 2023 LUXE Perfumes. All rights reserved.</p>
        </div>
      </footer>

      {/* Inline Styles */}
      <style jsx>{`
        .font-playfair {
          font-family: 'Playfair Display', serif;
        }
        
        .perfume-bottle {
          filter: drop-shadow(0 10px 15px rgba(0, 0, 0, 0.2));
          transition: all 0.3s ease;
        }
        
        .perfume-bottle:hover {
          transform: translateY(-5px);
          filter: drop-shadow(0 15px 20px rgba(0, 0, 0, 0.25));
        }
        
        .ingredient-card {
          transition: all 0.3s ease;
        }
        
        .ingredient-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        }
      `}</style>

      {/* Font Awesome and Google Fonts */}
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Montserrat:wght@300;400;500;600&display=swap" rel="stylesheet" />
    </div>
  );
};

export default PerfumeLandingPage;