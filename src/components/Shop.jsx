import React, { useState } from 'react';
import { FaCrown, FaStar, FaCheck, FaGem, FaRegSmileBeam } from 'react-icons/fa';
import { Link } from "react-router-dom";

const Shop = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);

  const plans = [
    {
      id: 1,
      name: "Free Tier",
      price: "$0",
      period: "Forever Free",
      features: [
        "Access to 2-3 games only",
        "Contains ads",
        "Limited downloads (1 game per day)",
        "Requires account signup"
      ],
      cta: "GET STARTED",
      popular: false,
      icon: <FaRegSmileBeam className="text-blue-400" />
    },
    {
      id: 2,
      name: "Basic",
      price: "$7",
      period: "per month",
      features: [
        "Access to 10+ games",
        "No ads",
        "Some offline play support",
        "Priority support"
      ],
      cta: "BUY NOW",
      popular: false,
      icon: <FaStar className="text-green-400" />
    },
    {
      id: 3,
      name: "Premium",
      price: "$13",
      period: "per month",
      features: [
        "Unlimited downloads",
        "Access to all exclusive new games",
        "Multiplayer support + cloud save",
        "Completely ad-free experience"
      ],
      cta: "BUY NOW",
      popular: true,
      icon: <FaCrown className="text-yellow-400" />
    },
    {
      id: 4,
      name: "Unlimited Pro",
      price: "$52",
      period: "per year",
      features: [
        "All Premium features + Exclusive games",
        "Early access to beta/new releases",
        "Extra skins & customizations",
        "Global leaderboard access",
        "VIP support"
      ],
      cta: "BUY NOW",
      popular: false,
      icon: <FaGem className="text-purple-400" />
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-700 to-pink-400 text-white">
      <header className="pt-16 pb-8 text-center px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500">
          Choose Your Plan
        </h1>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
          Unlock the full gaming experience with our premium plans. Select the one that fits your play style.
        </p>
      </header>

      <section className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan) => (
            <div 
              key={plan.id} 
              className={`relative rounded-2xl overflow-hidden transition-all duration-300 transform hover:scale-105 hover:shadow-2xl
                ${plan.popular 
                  ? 'border-2 border-yellow-400 shadow-lg shadow-yellow-500/20 ring-2 ring-yellow-500 ring-opacity-20' 
                  : 'border border-gray-700 backdrop-blur-sm bg-gray-800/30'
                }`}
              onMouseEnter={() => setSelectedPlan(plan.id)}
              onMouseLeave={() => setSelectedPlan(null)}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-yellow-500 text-gray-900 px-4 py-1 rounded-full text-sm font-bold z-10">
                  MOST POPULAR
                </div>
              )}
              
              <div className="p-6 flex flex-col h-full">
                <div className="flex justify-center mb-4">
                  <div className="p-3 rounded-full bg-gray-700/50 text-2xl">
                    {plan.icon}
                  </div>
                </div>
                
                <h2 className="text-2xl font-bold text-center mb-2">{plan.name}</h2>
                
                <div className="text-center mb-4">
                  <span className="text-4xl font-extrabold">{plan.price}</span>
                  <span className="text-gray-400 ml-2">{plan.period}</span>
                </div>
                <ul className="space-y-3 mb-6 flex-grow">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <FaCheck className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <button className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-300
                  ${plan.popular 
                    ? 'bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-gray-900' 
                    : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700'
                  }`}
                > <Link to="/Payment"> {plan.cta}</Link>
                 
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 py-12 max-w-4xl">
        <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              q: "Can I switch plans anytime?",
              a: "Yes, you can upgrade or downgrade your plan at any time."
            },
            {
              q: "Do you offer refunds?",
              a: "We offer a 14-day money-back guarantee on all paid plans."
            },
            {
              q: "Is there a free trial?",
              a: "Yes, we offer a 7-day free trial for our Premium plan."
            },
            {
              q: "Can I cancel anytime?",
              a: "Absolutely, no long-term contracts required."
            }
          ].map((faq, i) => (
            <div key={i} className="bg-gray-800/30 p-5 rounded-xl border border-gray-700">
              <h3 className="font-semibold text-lg mb-2">{faq.q}</h3>
              <p className="text-gray-400">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="text-center py-8 text-gray-400 text-sm">
        <p>Questions? Contact us at support@gamehub.com</p>
        <p className="mt-2">© 2025 GameHub. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Shop;