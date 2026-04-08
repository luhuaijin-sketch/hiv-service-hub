import React from 'react';
import { motion } from 'motion/react';
import { Shield, Heart, Users, Globe, Award } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const About: React.FC = () => {
  const values = [
    { title: 'Accuracy', description: 'All our content is reviewed by medical professionals to ensure the highest standards of accuracy.', icon: Shield },
    { title: 'Compassion', description: 'We approach every topic with empathy and respect for the diverse experiences of those affected by HIV.', icon: Heart },
    { title: 'Accessibility', description: 'Our goal is to make complex medical information easy to understand for everyone.', icon: Globe },
    { title: 'Community', description: 'We believe in the power of shared knowledge and community support in overcoming health challenges.', icon: Users },
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="rounded-3xl bg-blue-600 px-6 py-16 text-white md:px-12 md:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-extrabold tracking-tight md:text-6xl">Our Mission</h1>
          <p className="mt-6 text-lg text-blue-100 md:text-xl">
            To provide the most professional, comprehensive, and accessible information hub for HIV services, prevention, and treatment worldwide.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        <div className="space-y-6">
          <h2 className="text-3xl font-bold tracking-tight">Who We Are</h2>
          <p className="text-lg leading-relaxed text-slate-600">
            HIV Service Hub was founded by a group of healthcare professionals, social workers, and advocates dedicated to improving the lives of those affected by HIV. We recognized a need for a centralized, high-quality information portal that bridges the gap between complex medical research and everyday health needs.
          </p>
          <p className="text-lg leading-relaxed text-slate-600">
            Our team works tirelessly to curate the latest evidence-based information, ensuring that our readers have access to the most current prevention strategies, treatment options, and support services available.
          </p>
        </div>
        <div className="rounded-3xl bg-slate-100 p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="rounded-2xl bg-blue-600 p-3 text-white">
              <Award className="h-6 w-6" />
            </div>
            <h3 className="text-2xl font-bold">Our Commitment</h3>
          </div>
          <ul className="space-y-4 text-slate-600">
            <li className="flex items-start gap-3">
              <div className="mt-1.5 h-2 w-2 rounded-full bg-blue-600" />
              <span>Evidence-based medical information updated regularly.</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="mt-1.5 h-2 w-2 rounded-full bg-blue-600" />
              <span>Zero tolerance for stigma and discrimination.</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="mt-1.5 h-2 w-2 rounded-full bg-blue-600" />
              <span>Focus on holistic health and well-being.</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="mt-1.5 h-2 w-2 rounded-full bg-blue-600" />
              <span>Collaborations with global health organizations.</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Values Grid */}
      <section>
        <h2 className="mb-12 text-center text-3xl font-bold tracking-tight">Our Core Values</h2>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value, idx) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card className="h-full border-none bg-white shadow-sm transition-shadow hover:shadow-md">
                <CardHeader>
                  <div className="mb-4 rounded-xl bg-blue-50 p-3 text-blue-600 w-fit">
                    <value.icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-500">{value.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};
