import React, { useState } from "react";
import { motion } from "framer-motion";

const Message = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", form);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[radial-gradient(circle_at_20%_10%,rgba(243,0,255,.25),transparent_40%),radial-gradient(circle_at_80%_0%,rgba(0,212,255,.25),transparent_35%)] px-4">
      <motion.div
        className="w-full max-w-lg bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 p-10"
        initial={{ opacity: 0, y: 40, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <h2 className="text-3xl font-bold text-white mb-6 text-center">
          GET IN TOUCH
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex flex-col text-left">
            <label className="text-sm text-gray-200 mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="rounded-lg p-3 bg-black/30 border border-white/20 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-400 outline-none"
              placeholder="Your Name"
              required
            />
          </div>

          <div className="flex flex-col text-left">
            <label className="text-sm text-gray-200 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="rounded-lg p-3 bg-black/30 border border-white/20 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-400 outline-none"
              placeholder="you@example.com"
              required
            />
          </div>

          <div className="flex flex-col text-left">
            <label className="text-sm text-gray-200 mb-1">Message</label>
            <textarea
              name="message"
              rows="4"
              value={form.message}
              onChange={handleChange}
              className="rounded-lg p-3 bg-black/30 border border-white/20 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-400 outline-none resize-none"
              placeholder="Write your message..."
              required
            ></textarea>
          </div>

          <motion.button
            type="submit"
            className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-pink-500 to-blue-500 text-white font-semibold shadow-lg hover:opacity-90 transition"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Send Message
          </motion.button>
        </form>
       
      </motion.div>
    </div>
  );
};

export default Message;
