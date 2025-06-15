
import React from 'react';

const Shop = () => {
  const plans = [
    {
      name: "Basic",
      features: [
        "An Al chatbot that can understand your queries",
        "Personalized recommendations based on your preferences",
        "Ability to explore the app and its features without any cost"
      ],
      cta: "GET START©"
    },
    {
      name: "Premium",
      features: [
        "Advanced Al chatbot that can understand complex queries",
        "An analytics dashboard to track your conversations",
        "Priority support to solve issues quickly"
      ],
      cta: "GET START©"
    },
    {
      name: "Enterprise",
      features: [
        "Custom Al chatbot that can understand your queries",
        "Personalized recommendations based on your preferences",
        "Ability to explore the app and its features without any cost"
      ],
      cta: "CREATEER #5"
    }
  ];

  const allFeatures = [
    "An Al chatbot that can understand your queries",
    "Personalized recommendations based on your preferences",
    "Ability to explore the app and its features without any cost",
    "An advanced Al chatbot that can understand complex queries",
    "An analytics dashboard to track your conversations",
    "Priority support to solve issues quickly",
    "An Al chatbot that can understand your queries",
    "Personalized recommendations based on your preferences",
    "Ability to explore the app and its features without any cost"
  ];

  return (
    <div className="">
             <video src='public\videos\galaxy.mp4' 
        autoPlay 
         muted 
          loop
         playsInline
        className='w-full h-full object-cover absolute 
        top-0 first-letter:left-0 -z-10'>
        </video>
  
      <header className="py-8 text-center">
        <h1 className="text-4xl font-bold text-yellow-50">AI Chatbot Solutions</h1>
      </header>
      <section className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div key={index} className="bg-transparent rounded-xl shadow-lg overflow-hidden border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-200 mb-4">#{plan.name}</h2>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-green-500 mr-2">•</span>
                      <span className="text-gray-100">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button className="w-full py-3 px-4 border-2 border-gray-50 rounded-lg text-gray-100 font-medium hover:bg-blue-950 hover:text-white transition-all duration-300">
                  {plan.cta}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Divider */}
      <div className="container mx-auto px-4">
        <hr className="border-t-2 border-gray-300 my-8" />
      </div>

      {/* Features List */}
      <section className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allFeatures.map((feature, index) => (
            <div 
              key={index} 
              className="flex items-start bg-gray-50 p-4 rounded-lg hover:bg-white hover:shadow-sm transition-all"
            >
              <span className="text-green-500 mr-2">•</span>
              <p className="text-gray-700">{feature}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 text-center">
        <div className="animate-bounce flex flex-col items-center">
          <span className="text-gray-500 mb-1">Scroll for details</span>
          <div className="w-8 h-8 border-r-2 border-b-2 border-gray-400 transform rotate-45"></div>
        </div>
      </footer>
    </div>
  );
};

export default Shop;