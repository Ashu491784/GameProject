import { useState } from "react";
import { auth, database, ref, push, set } from "../../firebase";
import { fetchSignInMethodsForEmail } from "firebase/auth";
import { Link } from "react-router-dom";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const Payment = () => {
  const [email, setEmail] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [selectedPackage, setSelectedPackage] = useState("");
  const [subtotal, setSubtotal] = useState(0);
  const [isValidEmail, setIsValidEmail] = useState(null);
  const [paymentCompleted, setPaymentCompleted] = useState(false);

  const packages = {
    basic: 9,
    pro: 19,
    business: 39,
    annual: 199,
  };

  const verifyEmail = async () => {
    try {
      const methods = await fetchSignInMethodsForEmail(auth, email);
      if (methods.length > 0) setIsValidEmail(true);
      else setIsValidEmail(false);
    } catch (error) {
      console.error("Error verifying email:", error);
      setIsValidEmail(false);
    }
  };

  const handlePackageChange = (e) => {
    const value = e.target.value;
    setSelectedPackage(value);
    setSubtotal(packages[value] || 0);
  };

  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  const handleCardPayment = async (e) => {
    e.preventDefault();
    await verifyEmail();
    if (!isValidEmail) {
      alert("❌ This email is not registered!");
      return;
    }
    alert(
      `✅ Card payment processed for ${email}\nPackage: ${selectedPackage}\nTotal: $${total.toFixed(
        2
      )}`
    );
    setPaymentCompleted(true);
  };

  return (
    <PayPalScriptProvider
      options={{
        "client-id":
          "AUs8wWvV2XFh6k2tUF8IvnRiJ7ZGNWVgd-Nl4d-lDVSeNFShr6sIuLgAj02gTZL-V8ZHTzTrDlMYzkCD",
        currency: "USD",
      }}
    >
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="bg-white dark:bg-slate-900/70 backdrop-blur rounded-2xl shadow-xl ring-1 ring-black/5 dark:ring-white/10 overflow-hidden">
            <div className="px-6 py-5 bg-gradient-to-r from-indigo-500 to-violet-500 text-white">
              <h1 className="text-xl font-semibold">Payment</h1>
              <p className="text-white/80 text-sm">Add your payment details 💰</p>
            </div>

            <form
              className="p-6 space-y-5"
              onSubmit={paymentMethod === "card" ? handleCardPayment : (e) => e.preventDefault()}
            >
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
                  User Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white/90 dark:bg-slate-900/60 px-4 py-2.5 text-slate-900 dark:text-slate-100 placeholder-slate-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
                {isValidEmail === true && <p className="text-green-600 text-sm">✅ Email found</p>}
                {isValidEmail === false && <p className="text-red-600 text-sm">❌ Email not registered</p>}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
                  Payment Method
                </label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  required
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white/90 dark:bg-slate-900/60 px-4 py-2.5 text-slate-900 dark:text-slate-100 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  <option value="" disabled>
                    -- Select a method --
                  </option>
                  <option value="card">Credit / Debit Card</option>
                  <option value="paypal">PayPal</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
                  Package
                </label>
                <select
                  value={selectedPackage}
                  onChange={handlePackageChange}
                  required
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white/90 dark:bg-slate-900/60 px-4 py-2.5 text-slate-900 dark:text-slate-100 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  <option value="" disabled>
                    -- Select a package --
                  </option>
                  <option value="basic">Basic — $7/mo</option>
                  <option value="pro">Prem — $13/mo</option>
                  <option value="business">pro — $39/mo</option>
                  <option value="annual">pro — $52/yr</option>
                </select>
              </div>

              <div className="rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 p-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600 dark:text-slate-300">Subtotal</span>
                  <span className="font-medium text-slate-900 dark:text-slate-100">${subtotal.toFixed(2)}</span>
                </div>
                <div className="mt-2 flex items-center justify-between text-sm">
                  <span className="text-slate-600 dark:text-slate-300">Tax (10%)</span>
                  <span className="font-medium text-slate-900 dark:text-slate-100">${tax.toFixed(2)}</span>
                </div>
                <div className="mt-3 border-t border-slate-200 dark:border-slate-700 pt-3 flex items-center justify-between">
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">Total</span>
                  <span className="text-base font-bold text-slate-900 dark:text-white">${total.toFixed(2)}</span>
                </div>
              </div>

           
              {paymentMethod === "card" && (
                <button
                  type="submit"
                  className="flex-1 inline-flex items-center justify-center rounded-xl bg-indigo-600 px-4 py-2.5 text-white font-medium shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full"
                >
                  Pay Now
                </button>
              )}

              {paymentMethod === "paypal" && (
                <div className="mt-4">
                  <PayPalButtons
                    style={{ layout: "vertical" }}
                    createOrder={(data, actions) => {
                      return actions.order.create({
                        purchase_units: [
                          {
                            amount: {
                              value: total.toFixed(2),
                            },
                          },
                        ],
                      });
                    }}
                    onApprove={async (data, actions) => {
                      const details = await actions.order.capture();
                      alert(`✅ PayPal payment completed by ${details.payer.name.given_name}`);
                      setPaymentCompleted(true);
                    }}
                    onError={(err) => {
                      console.error(err);
                      alert("❌ PayPal payment failed!");
                    }}
                  />
                </div>
              )}

          
              <div className="mt-3 text-center">
                <Link
                  to="/"
                  className="rounded-xl px-4 py-2.5 font-medium text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/60 inline-block"
                >
                  Cancel
                </Link>
              </div>
            </form>

            {paymentCompleted && (
              <p className="text-green-600 text-center mt-4 font-medium">
                Payment successful! 🎉
              </p>
            )}
          </div>
        </div>
      </div>
    </PayPalScriptProvider>
  );
};

export default Payment;
