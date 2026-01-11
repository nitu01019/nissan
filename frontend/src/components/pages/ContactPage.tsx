"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { Phone, Mail, MapPin, Clock, Send, Calendar, Car } from "lucide-react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/Button";
import { Input, Textarea, Select } from "@/components/ui/Input";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { contactInfo } from "@/data/navigation";
import { cars } from "@/data/cars";

type FormType = "general" | "test-drive" | "price-quote";

interface FormData {
  name: string;
  email: string;
  phone: string;
  car?: string;
  preferredDate?: string;
  preferredTime?: string;
  message?: string;
}

export const ContactPage: React.FC = () => {
  const searchParams = useSearchParams();
  const initialType = (searchParams.get("type") as FormType) || "general";
  const initialCar = searchParams.get("car") || "";
  
  const [formType, setFormType] = useState<FormType>(initialType);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    defaultValues: { car: initialCar }
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast.success("Your inquiry has been submitted! We'll contact you soon.");
      reset();
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const carOptions = cars.map(car => ({ value: car.slug, label: car.name }));
  const timeSlots = [
    { value: "10:00", label: "10:00 AM" },
    { value: "11:00", label: "11:00 AM" },
    { value: "12:00", label: "12:00 PM" },
    { value: "14:00", label: "2:00 PM" },
    { value: "15:00", label: "3:00 PM" },
    { value: "16:00", label: "4:00 PM" },
    { value: "17:00", label: "5:00 PM" },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative h-[40vh] min-h-[300px] bg-secondary-800">
        <div className="absolute inset-0 bg-gradient-to-r from-secondary-900 to-primary-900/50" />
        <div className="container-custom relative h-full flex items-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">
              Contact <span className="text-primary-400">Us</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl">
              Get in touch with our team for inquiries, test drives, or any assistance you need.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-1 space-y-6"
            >
              <div>
                <h2 className="font-heading text-2xl font-bold text-secondary-800 mb-6">Get In Touch</h2>
                <p className="text-secondary-600 mb-8">
                  Visit our showroom or reach out to us through any of the following channels.
                </p>
              </div>

              {[
                { icon: MapPin, title: "Visit Us", content: `${contactInfo.address.line1}, ${contactInfo.address.line2}, ${contactInfo.address.city}`, color: "bg-primary-500" },
                { icon: Phone, title: "Call Us", content: contactInfo.phone[0], href: `tel:${contactInfo.phone[0]}`, color: "bg-green-500" },
                { icon: Mail, title: "Email Us", content: contactInfo.email[0], href: `mailto:${contactInfo.email[0]}`, color: "bg-blue-500" },
                { icon: Clock, title: "Working Hours", content: `Mon-Sat: ${contactInfo.timing.weekdays}`, color: "bg-orange-500" },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm"
                >
                  <div className={`w-12 h-12 ${item.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-secondary-800">{item.title}</h4>
                    {item.href ? (
                      <a href={item.href} className="text-secondary-600 hover:text-primary-500 transition-colors">
                        {item.content}
                      </a>
                    ) : (
                      <p className="text-secondary-600">{item.content}</p>
                    )}
                  </div>
                </motion.div>
              ))}

              {/* Map */}
              <div className="bg-white rounded-xl overflow-hidden shadow-sm h-64">
                <iframe
                  src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3307.5!2d${contactInfo.mapCoordinates.lng}!3d${contactInfo.mapCoordinates.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzTCsDA1JzAxLjMiTiA3NMKwNDcnNTAuMyJF!5e0!3m2!1sen!2sin!4v1234567890`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-2"
            >
              <div className="bg-white rounded-2xl shadow-xl p-8">
                {/* Form Type Selector */}
                <div className="flex flex-wrap gap-3 mb-8">
                  {[
                    { type: "general" as const, label: "General Inquiry", icon: Mail },
                    { type: "test-drive" as const, label: "Book Test Drive", icon: Calendar },
                    { type: "price-quote" as const, label: "Get Price Quote", icon: Car },
                  ].map((item) => (
                    <button
                      key={item.type}
                      onClick={() => setFormType(item.type)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                        formType === item.type
                          ? "bg-primary-500 text-white"
                          : "bg-gray-100 text-secondary-600 hover:bg-gray-200"
                      }`}
                    >
                      <item.icon className="w-4 h-4" />
                      {item.label}
                    </button>
                  ))}
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <Input
                      label="Full Name"
                      placeholder="John Doe"
                      {...register("name", { required: "Name is required" })}
                      error={errors.name?.message}
                      required
                    />
                    <Input
                      label="Email Address"
                      type="email"
                      placeholder="john@example.com"
                      {...register("email", {
                        required: "Email is required",
                        pattern: { value: /^\S+@\S+$/i, message: "Invalid email" }
                      })}
                      error={errors.email?.message}
                      required
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <Input
                      label="Phone Number"
                      type="tel"
                      placeholder="9876543210"
                      {...register("phone", {
                        required: "Phone is required",
                        pattern: { value: /^[6-9]\d{9}$/, message: "Invalid phone number" }
                      })}
                      error={errors.phone?.message}
                      required
                    />
                    {(formType === "test-drive" || formType === "price-quote") && (
                      <Select
                        label="Select Car"
                        options={carOptions}
                        placeholder="Choose a model"
                        {...register("car")}
                      />
                    )}
                  </div>

                  {formType === "test-drive" && (
                    <div className="grid md:grid-cols-2 gap-6">
                      <Input
                        label="Preferred Date"
                        type="date"
                        {...register("preferredDate")}
                        min={new Date().toISOString().split("T")[0]}
                      />
                      <Select
                        label="Preferred Time"
                        options={timeSlots}
                        placeholder="Select time slot"
                        {...register("preferredTime")}
                      />
                    </div>
                  )}

                  <Textarea
                    label="Message"
                    placeholder={
                      formType === "test-drive"
                        ? "Any specific requirements for your test drive..."
                        : formType === "price-quote"
                        ? "Tell us about your requirements, trade-in vehicle, etc..."
                        : "How can we help you?"
                    }
                    {...register("message")}
                    rows={4}
                  />

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    isLoading={isSubmitting}
                    rightIcon={<Send className="w-5 h-5" />}
                    fullWidth
                  >
                    {formType === "test-drive" ? "Book Test Drive" : formType === "price-quote" ? "Request Quote" : "Send Message"}
                  </Button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactPage;
