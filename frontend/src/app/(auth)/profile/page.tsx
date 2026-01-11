"use client";

/**
 * User Profile Page
 */

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { User, Mail, Phone, Camera, LogOut, Settings, Car, Heart, Clock, ChevronRight, Loader2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import toast from 'react-hot-toast';

export default function ProfilePage() {
  const router = useRouter();
  const { user, isLoading: authLoading, logout, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '' });

  React.useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
    if (user) {
      setFormData({ name: user.name, phone: user.phone || '' });
    }
  }, [user, authLoading, router]);

  const handleLogout = async () => {
    await logout();
    toast.success('Logged out successfully');
    router.push('/');
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const response = await updateProfile(formData);
      if (response.success) {
        toast.success('Profile updated');
        setIsEditing(false);
      } else {
        toast.error(response.message);
      }
    } catch {
      toast.error('Update failed');
    } finally {
      setIsSaving(false);
    }
  };

  if (authLoading || !user) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-red-500" />
      </div>
    );
  }

  const menuItems = [
    { icon: Car, label: 'My Inquiries', href: '/profile/inquiries', count: 3 },
    { icon: Heart, label: 'Saved Cars', href: '/profile/saved', count: 2 },
    { icon: Clock, label: 'Test Drive Bookings', href: '/profile/bookings', count: 1 },
    { icon: Settings, label: 'Settings', href: '/profile/settings' },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full max-w-md mx-auto">
      <div className="bg-gray-800/50 backdrop-blur-xl rounded-3xl border border-gray-700/50 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-br from-red-600 to-red-700 p-6 text-center relative">
          <div className="absolute top-4 right-4">
            <button onClick={() => setIsEditing(!isEditing)} className="text-white/80 hover:text-white text-sm">
              {isEditing ? 'Cancel' : 'Edit'}
            </button>
          </div>
          
          <div className="relative inline-block">
            <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto">
              {user.avatar ? (
                <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover" />
              ) : (
                <span className="text-white text-3xl font-bold">{user.name.charAt(0).toUpperCase()}</span>
              )}
            </div>
            {isEditing && (
              <button className="absolute bottom-0 right-0 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg">
                <Camera className="w-4 h-4 text-gray-700" />
              </button>
            )}
          </div>
          
          {isEditing ? (
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(p => ({ ...p, name: e.target.value }))}
              className="mt-4 bg-white/20 border border-white/30 rounded-lg px-4 py-2 text-white text-center w-full max-w-[200px] focus:outline-none focus:border-white"
            />
          ) : (
            <h1 className="text-xl font-bold text-white mt-4">{user.name}</h1>
          )}
          <p className="text-white/80 text-sm mt-1">{user.email}</p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Contact Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-gray-900/50 rounded-xl">
              <Mail className="w-5 h-5 text-gray-500" />
              <div className="flex-1">
                <p className="text-xs text-gray-500">Email</p>
                <p className="text-white text-sm">{user.email}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-gray-900/50 rounded-xl">
              <Phone className="w-5 h-5 text-gray-500" />
              <div className="flex-1">
                <p className="text-xs text-gray-500">Phone</p>
                {isEditing ? (
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData(p => ({ ...p, phone: e.target.value }))}
                    placeholder="Add phone number"
                    className="bg-transparent text-white text-sm w-full focus:outline-none"
                  />
                ) : (
                  <p className="text-white text-sm">{user.phone || 'Not added'}</p>
                )}
              </div>
            </div>
          </div>

          {/* Save Button */}
          {isEditing && (
            <motion.button
              onClick={handleSave}
              disabled={isSaving}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold py-3 rounded-xl disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isSaving ? <><Loader2 className="w-4 h-4 animate-spin" />Saving...</> : 'Save Changes'}
            </motion.button>
          )}

          {/* Menu Items */}
          <div className="pt-4 space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.label}
                onClick={() => router.push(item.href)}
                className="w-full flex items-center gap-3 p-3 bg-gray-900/30 hover:bg-gray-900/50 rounded-xl transition-colors"
              >
                <item.icon className="w-5 h-5 text-red-500" />
                <span className="flex-1 text-left text-white text-sm">{item.label}</span>
                {item.count && (
                  <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">{item.count}</span>
                )}
                <ChevronRight className="w-4 h-4 text-gray-500" />
              </button>
            ))}
          </div>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 p-3 text-red-500 hover:bg-red-500/10 rounded-xl transition-colors mt-4"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
