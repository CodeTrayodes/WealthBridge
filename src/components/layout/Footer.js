'use client';

import React from 'react';
import { Globe, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-muted/30 border-t border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground">WealthBridge</h3>
                <p className="text-xs text-orange-600 font-medium">भारतीय Wealth Platform</p>
              </div>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-md">
              Empowering Global Indians with intelligent wealth management solutions. 
              Track, grow, and optimize your investments across borders with AI-powered insights.
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Contact</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>hello@wealthbridge.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>Mumbai, India</span>
              </div>
            </div>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Legal</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div><a href="#" className="hover:text-orange-600 transition-colors">Privacy Policy</a></div>
              <div><a href="#" className="hover:text-orange-600 transition-colors">Terms of Service</a></div>
              <div><a href="#" className="hover:text-orange-600 transition-colors">Disclaimer</a></div>
            </div>
          </div>
        </div>

        <div className="border-t border-border/50 mt-8 pt-6 text-center text-sm text-muted-foreground">
          <p>&copy; 2025 WealthBridge. All rights reserved. Built with ❤️ for Global Indians.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
