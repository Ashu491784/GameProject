import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "emailjs-com";

const Message = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    else if (form.name.trim().length < 2) newErrors.name = "Name must be at least 2 characters";

    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = "Please enter a valid email address";

    if (!form.message.trim()) newErrors.message = "Message is required";
    else if (form.message.trim().length < 10) newErrors.message = "Message must be at least 10 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      emailjs
        .send(
          "service_6a8wp77",
          "template_lk8lm75",
          { name: form.name, email: form.email, message: form.message },
          "ekiz1fWR465xl3Ztv"
        )
        .then(() => {
          setIsSubmitting(false);
          setIsSubmitted(true);
          setForm({ name: "", email: "", message: "" });
          setTimeout(() => setIsSubmitted(false), 5000);
        })
        .catch((err) => {
          console.error("FAILED...", err);
          setIsSubmitting(false);
          alert("Sorry, there was an error sending your message. Please try again later.");
        });
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center px-4 py-16">
      <div className="container mx-auto grid md:grid-cols-2 gap-10 items-start">
        
        <section className="space-y-8">
          <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 mb-6">
            Game Experiences
          </h2>

          <motion.div 
            className="bg-gray-800 p-6 rounded-xl shadow-lg"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex text-yellow-400 mb-3">
              {[...Array(5)].map((_, i) => (
                <i key={i} className="fas fa-star"></i>
              ))}
            </div>
            <p className="text-gray-300 mb-4 italic">
              “One of the most immersive gaming experiences ever – every moment feels alive!”
            </p>
            <div className="flex items-center">
              <div className="h-12 w-12 rounded-full bg-pink-500 mr-3 flex items-center justify-center">
                <img src="../../public/images/sachi.jpg" alt="review" className="w-full h-full object-cover transform transition duration-500 group-hover:scale-110"></img>
              </div>
              <div>
                <h4 className="font-semibold text-white">Nimnada Hettiarachchi</h4>
                <p className="text-gray-400 text-sm">Loyal Customer for 2 years</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="bg-gray-800 p-6 rounded-xl shadow-lg"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex text-yellow-400 mb-3">
              {[...Array(5)].map((_, i) => (
                <i key={i} className="fas fa-star"></i>
              ))}
            </div>
            <p className="text-gray-300 mb-4 italic">
              “The graphics are stunning, the battles are thrilling, and the adventure never ends.”
            </p>
            <div className="flex items-center">
              <div className="h-12 w-12 rounded-full bg-blue-500 mr-3 flex items-center justify-center">
                <img src="../../public/images/sir.jpg" alt="review2" className="w-full h-full object-cover transform transition duration-500 group-hover:scale-110"></img>
              </div>
              <div>
                <h4 className="font-semibold text-white">Uditha Landekubura</h4>
                <p className="text-gray-400 text-sm">Lecture of IBA Campus</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="bg-gray-800 p-6 rounded-xl shadow-lg"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="flex text-yellow-400 mb-3">
              {[...Array(5)].map((_, i) => (
                <i key={i} className="fas fa-star"></i>
              ))}
            </div>
            <p className="text-gray-300 mb-4 italic">
              “A must-play for every gamer who loves action, strategy, and epic challenges.”
            </p>
            <div className="flex items-center">
              <div className="h-12 w-12 rounded-full bg-purple-500 mr-3 flex items-center justify-center">
                <img src="../../public/images/pramu.jpg" alt="review3" className="w-full h-full object-cover transform transition duration-500 group-hover:scale-110"></img>
              </div>
              <div>
                <h4 className="font-semibold text-white">Pramudi Prarthana</h4>
                <p className="text-gray-400 text-sm">New Customer</p>
              </div>
            </div>
          </motion.div>
        </section>
        <motion.div
          className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 p-8 md:p-10"
          initial={{ opacity: 0, y: 40, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <h2 className="text-3xl font-bold text-white mb-2 text-center">CONTACT US</h2>
          <p className="text-gray-300 text-center mb-6">
            Have questions about our Games? Need help finding your signature scent? We're here to help!
          </p>

          <AnimatePresence>
            {isSubmitted && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mb-6 p-4 bg-green-900/30 border border-green-500/50 rounded-lg text-green-300 text-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 inline-block mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Thank you for your message! We'll respond within 24 hours. 🍃
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="space-y-5">
            {["name", "email", "message"].map((field) => (
              <div key={field} className="flex flex-col text-left">
                <label htmlFor={field} className="text-sm text-gray-200 mb-1 flex items-center">
                  {field === "name" && "Full Name"}
                  {field === "email" && "Email Address"}
                  {field === "message" && "Your Message"}
                  <span className="text-red-400 ml-1">*</span>
                </label>
                {field !== "message" ? (
                  <input
                    type={field === "email" ? "email" : "text"}
                    id={field}
                    name={field}
                    value={form[field]}
                    onChange={handleChange}
                    placeholder={
                      field === "name" 
                        ? "Enter your full name" 
                        : "your.email@example.com"
                    }
                    className={`rounded-lg p-3 bg-black/30 border ${
                      errors[field] ? "border-red-500" : "border-white/20"
                    } text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-400 outline-none transition-colors`}
                  />
                ) : (
                  <textarea
                    id={field}
                    name={field}
                    rows="4"
                    value={form[field]}
                    onChange={handleChange}
                    placeholder="Tell us about your fragrance preferences or ask a question..."
                    className={`rounded-lg p-3 bg-black/30 border ${
                      errors[field] ? "border-red-500" : "border-white/20"
                    } text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-400 outline-none resize-none transition-colors`}
                  />
                )}
                {errors[field] && (
                  <motion.span
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 text-xs mt-1 flex items-center"
                  >
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-3 w-3 mr-1" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {errors[field]}
                  </motion.span>
                )}
              </div>
            ))}

            <motion.button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold shadow-lg hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              whileHover={!isSubmitting ? { scale: 1.05 } : {}}
              whileTap={!isSubmitting ? { scale: 0.95 } : {}}
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Sending...
                </>
              ) : (
                <>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5 mr-2" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Send Message
                </>
              )}
            </motion.button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm">Prefer to call us?</p>
            <a href="tel:+11234567890" className="text-pink-400 hover:text-pink-300 font-medium">+ (95) 71-5769-145</a>
            <p className="text-gray-400 text-xs mt-6">
              Fields marked with <span className="text-red-400">*</span> are required
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Message;