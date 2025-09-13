import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "emailjs-com";

const Message = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    if (!form.name.trim()) {
      newErrors.name = "Name is required";
    } else if (form.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }
    
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    if (!form.message.trim()) {
      newErrors.message = "Message is required";
    } else if (form.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);

      emailjs.send(
        "service_6a8wp77",   
        "template_lk8lm75",  
        {
          name: form.name,
          email: form.email,
          message: form.message,
        },
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
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[radial-gradient(circle_at_20%_10%,rgba(243,0,255,.25),transparent_40%),radial-gradient(circle_at_80%_0%,rgba(0,212,255,.25),transparent_35%)] px-4">
      <motion.div
        className="w-full max-w-lg bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 p-8 md:p-10"
        initial={{ opacity: 0, y: 40, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <h2 className="text-3xl font-bold text-white mb-2 text-center">
          GET IN TOUCH
        </h2>
        <p className="text-gray-300 text-center mb-6">
          We'd love to hear from you. Send us a message!
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
              Your message has been sent successfully! We'll get back to you soon.🍃
            </motion.div>
          )}
        </AnimatePresence>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex flex-col text-left">
            <label htmlFor="name" className="text-sm text-gray-200 mb-1 flex items-center">
              Name
              <span className="text-red-400 ml-1">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              className={`rounded-lg p-3 bg-black/30 border ${errors.name ? 'border-red-500' : 'border-white/20'} text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-400 outline-none transition-colors`}
              placeholder="Your Name"
            />
            {errors.name && (
              <motion.span 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-400 text-xs mt-1 flex items-center"
              >
                {errors.name}
              </motion.span>
            )}
          </div>

          <div className="flex flex-col text-left">
            <label htmlFor="email" className="text-sm text-gray-200 mb-1 flex items-center">
              Email
              <span className="text-red-400 ml-1">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className={`rounded-lg p-3 bg-black/30 border ${errors.email ? 'border-red-500' : 'border-white/20'} text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-400 outline-none transition-colors`}
              placeholder="you@example.com"
            />
            {errors.email && (
              <motion.span 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-400 text-xs mt-1 flex items-center"
              >
                {errors.email}
              </motion.span>
            )}
          </div>

          <div className="flex flex-col text-left">
            <label htmlFor="message" className="text-sm text-gray-200 mb-1 flex items-center">
              Message
              <span className="text-red-400 ml-1">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              rows="4"
              value={form.message}
              onChange={handleChange}
              className={`rounded-lg p-3 bg-black/30 border ${errors.message ? 'border-red-500' : 'border-white/20'} text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-400 outline-none resize-none transition-colors`}
              placeholder="Write your message..."
            ></textarea>
            {errors.message && (
              <motion.span 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-400 text-xs mt-1 flex items-center"
              >
                {errors.message}
              </motion.span>
            )}
          </div>

          <motion.button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-pink-500 to-blue-500 text-white font-semibold shadow-lg hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            whileHover={!isSubmitting ? { scale: 1.05 } : {}}
            whileTap={!isSubmitting ? { scale: 0.95 } : {}}
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Sending...
              </>
            ) : (
              "Send Message"
            )}
          </motion.button>
        </form>
        
        <p className="text-gray-400 text-xs mt-6 text-center">
          Fields marked with <span className="text-red-400">*</span> are required
        </p>
      </motion.div>
    </div>
  );
};

export default Message;
