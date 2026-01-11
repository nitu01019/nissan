"use client";

import React, { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Send, User, Phone, Mail, Car, MessageSquare, CheckCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { cars } from "@/data/cars";

interface FormData {
  name: string;
  phone: string;
  email: string;
  model: string;
  message: string;
  inquiryType: "sales" | "service" | "testdrive" | "accessories";
}

interface FormErrors {
  name?: string;
  phone?: string;
  email?: string;
  model?: string;
}

const inquiryTypes = [
  { id: "sales", label: "Sales Inquiry", icon: Car },
  { id: "testdrive", label: "Book Test Drive", icon: Car },
  { id: "service", label: "Service Booking", icon: MessageSquare },
  { id: "accessories", label: "Accessories", icon: MessageSquare },
];

export const InquirySection: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    email: "",
    model: "",
    message: "",
    inquiryType: "sales",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const validateForm = useCallback((): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[6-9]\d{9}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = "Please enter a valid 10-digit phone number";
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.model) {
      newErrors.model = "Please select a car model";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm() || !agreedToTerms) return;

    setIsSubmitting(true);

    try {
      // Simulate API call - Replace with actual API endpoint
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In production, send to backend:
      // await fetch('/api/inquiries', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData),
      // });

      setIsSubmitted(true);
      setFormData({
        name: "",
        phone: "",
        email: "",
        model: "",
        message: "",
        inquiryType: "sales",
      });
      setAgreedToTerms(false);

      // Reset success message after 5 seconds
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-primary-900 via-primary-800 to-secondary-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Animated Background Elements */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
        transition={{ duration: 20, repeat: Infinity }}
        className="absolute -top-1/4 -right-1/4 w-[600px] h-[600px] rounded-full bg-primary-500/10 blur-3xl"
      />
      <motion.div
        animate={{ scale: [1.2, 1, 1.2], rotate: [0, -90, 0] }}
        transition={{ duration: 25, repeat: Infinity }}
        className="absolute -bottom-1/4 -left-1/4 w-[500px] h-[500px] rounded-full bg-white/5 blur-3xl"
      />

      <div className="container mx-auto px-4 relative z-10">
        <SectionHeader
          badge="Get in Touch"
          subtitle="Looking for More Information?"
          title="Reach Out!"
          description="Fill out the form below and our team will get back to you within 24 hours."
          light
        />

        <div className="max-w-4xl mx-auto">
          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 md:p-12 text-center border border-white/20"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <CheckCircle className="w-10 h-10 text-white" />
              </motion.div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Thank You for Your Inquiry!
              </h3>
              <p className="text-gray-300 mb-6">
                Our team will contact you shortly. For immediate assistance, call us at{" "}
                <a href="tel:+917889559631" className="text-primary-400 font-semibold hover:underline">
                  +91 78895 59631
                </a>
              </p>
              <Button
                variant="white"
                onClick={() => setIsSubmitted(false)}
              >
                Submit Another Inquiry
              </Button>
            </motion.div>
          ) : (
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              onSubmit={handleSubmit}
              className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 md:p-10 border border-white/20"
            >
              {/* Inquiry Type Selection */}
              <div className="mb-8">
                <label className="block text-white font-medium mb-4">What can we help you with?</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {inquiryTypes.map((type) => (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => handleChange("inquiryType", type.id)}
                      className={`p-4 rounded-xl border-2 transition-all text-center ${
                        formData.inquiryType === type.id
                          ? "bg-primary-500 border-primary-500 text-white"
                          : "bg-white/5 border-white/20 text-white/80 hover:bg-white/10"
                      }`}
                    >
                      <type.icon className="w-6 h-6 mx-auto mb-2" />
                      <span className="text-sm font-medium">{type.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Form Fields */}
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                {/* Model Selection */}
                <div className="md:col-span-2">
                  <label className="block text-white font-medium mb-2">
                    Select Model <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <Car className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <select
                      value={formData.model}
                      onChange={(e) => handleChange("model", e.target.value)}
                      className={`w-full pl-12 pr-4 py-4 rounded-xl bg-white/10 border ${
                        errors.model ? "border-red-500" : "border-white/20"
                      } text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none`}
                    >
                      <option value="" className="text-gray-900">Select a model</option>
                      {cars.map((car) => (
                        <option key={car.id} value={car.name} className="text-gray-900">
                          {car.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  {errors.model && <p className="text-red-400 text-sm mt-1">{errors.model}</p>}
                </div>

                {/* Full Name */}
                <div>
                  <label className="block text-white font-medium mb-2">
                    Full Name <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      placeholder="Enter your full name"
                      className={`w-full pl-12 pr-4 py-4 rounded-xl bg-white/10 border ${
                        errors.name ? "border-red-500" : "border-white/20"
                      } text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent`}
                    />
                  </div>
                  {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-white font-medium mb-2">
                    Phone Number <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleChange("phone", e.target.value.replace(/\D/g, '').slice(0, 10))}
                      placeholder="Enter 10-digit phone number"
                      className={`w-full pl-12 pr-4 py-4 rounded-xl bg-white/10 border ${
                        errors.phone ? "border-red-500" : "border-white/20"
                      } text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent`}
                    />
                  </div>
                  {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone}</p>}
                </div>

                {/* Email */}
                <div className="md:col-span-2">
                  <label className="block text-white font-medium mb-2">
                    Email ID <span className="text-gray-400">(optional)</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      placeholder="Enter your email address"
                      className={`w-full pl-12 pr-4 py-4 rounded-xl bg-white/10 border ${
                        errors.email ? "border-red-500" : "border-white/20"
                      } text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent`}
                    />
                  </div>
                  {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
                </div>

                {/* Message */}
                <div className="md:col-span-2">
                  <label className="block text-white font-medium mb-2">
                    Message <span className="text-gray-400">(optional)</span>
                  </label>
                  <div className="relative">
                    <MessageSquare className="absolute left-4 top-4 text-gray-400 w-5 h-5" />
                    <textarea
                      value={formData.message}
                      onChange={(e) => handleChange("message", e.target.value)}
                      placeholder="Tell us more about your requirement..."
                      rows={4}
                      className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* Terms Checkbox */}
              <div className="mb-8">
                <label className="flex items-start gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                    className="mt-1 w-5 h-5 rounded border-white/30 bg-white/10 text-primary-500 focus:ring-primary-500 focus:ring-offset-0"
                  />
                  <span className="text-gray-300 text-sm group-hover:text-white transition-colors">
                    I have read and understood the{" "}
                    <a href="/privacy" className="text-primary-400 hover:underline">privacy policy</a>{" "}
                    and agree to be contacted by Nissan Dealer Pvt. Ltd regarding my inquiry.
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  fullWidth
                  disabled={isSubmitting || !agreedToTerms}
                  className="py-4"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Submit Inquiry
                    </>
                  )}
                </Button>
              </motion.div>

              {/* Privacy Note */}
              <p className="text-center text-gray-400 text-xs mt-4">
                Your information is secure and will never be shared with third parties.
              </p>
            </motion.form>
          )}
        </div>
      </div>
    </section>
  );
};

export default InquirySection;
