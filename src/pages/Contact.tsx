import React from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const Contact: React.FC = () => {
  return (
    <div className="space-y-16">
      {/* Header */}
      <section className="text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 md:text-6xl">Get in Touch</h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-500 md:text-xl">
          Have questions about our services or need more information? Our team is here to help. Reach out to us anytime.
        </p>
      </section>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        {/* Contact Form */}
        <section className="lg:col-span-7">
          <Card className="border-none shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl">Send us a Message</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">First Name</label>
                    <Input placeholder="John" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Last Name</label>
                    <Input placeholder="Doe" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Email Address</label>
                  <Input type="email" placeholder="john@example.com" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Subject</label>
                  <Input placeholder="How can we help?" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Message</label>
                  <Textarea placeholder="Tell us more about your inquiry..." className="min-h-[150px]" />
                </div>
                <Button className="w-full bg-blue-600 py-6 text-lg hover:bg-blue-700">
                  <Send className="mr-2 h-5 w-5" />
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </section>

        {/* Contact Info */}
        <aside className="space-y-8 lg:col-span-5">
          <Card className="border-none bg-slate-900 text-white shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl">Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="rounded-xl bg-white/10 p-3">
                  <Mail className="h-6 w-6 text-blue-400" />
                </div>
                <div>
                  <p className="font-bold">Email Us</p>
                  <p className="text-slate-400">support@hivservice.com</p>
                  <p className="text-slate-400">info@hivservice.com</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="rounded-xl bg-white/10 p-3">
                  <Phone className="h-6 w-6 text-blue-400" />
                </div>
                <div>
                  <p className="font-bold">Call Us</p>
                  <p className="text-slate-400">+1 (555) 123-4567</p>
                  <p className="text-slate-400">Mon-Fri, 9am-6pm EST</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="rounded-xl bg-white/10 p-3">
                  <MapPin className="h-6 w-6 text-blue-400" />
                </div>
                <div>
                  <p className="font-bold">Visit Us</p>
                  <p className="text-slate-400">123 Health Plaza, Suite 400</p>
                  <p className="text-slate-400">New York, NY 10001</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none bg-blue-600 text-white shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <MessageSquare className="h-6 w-6" />
                Live Support
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-6 text-blue-100">
                Need immediate assistance? Our counselors are available for live chat support during business hours.
              </p>
              <Button variant="secondary" className="w-full">
                Start Live Chat
              </Button>
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  );
};
