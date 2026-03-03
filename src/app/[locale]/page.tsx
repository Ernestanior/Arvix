'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, TrendingUp, Users, Award, Zap, Shield, Clock, CheckCircle2, Star, Quote, Play, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import HeroSectionEnhanced from '@/components/sections/HeroSectionEnhanced'
import FeaturesGrid from '@/components/sections/FeaturesGrid'
import ServicesSection from '@/components/sections/ServicesSection'
import StatsSection from '@/components/sections/StatsSection'
import ProcessSection from '@/components/sections/ProcessSection'
import PortfolioSectionEnhanced from '@/components/sections/PortfolioSectionEnhanced'
import TechStackSectionEnhanced from '@/components/sections/TechStackSectionEnhanced'
import PricingSection from '@/components/sections/PricingSection'
import FAQSection from '@/components/sections/FAQSection'
import ContactSection from '@/components/sections/ContactSection'
import CTASection from '@/components/sections/CTASection'
import ScrollReveal from '@/components/ui/ScrollReveal';

export default function Home() {
  const [activeTab, setActiveTab] = useState('innovation');
  const t = useTranslations();

  return (
    <>
      <HeroSectionEnhanced />

      {/* Value Proposition */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-orange-600/10" />
        <div className="container mx-auto px-6 relative z-10">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
                {t('home.valueProposition.title')}
                <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-orange-500 bg-clip-text text-transparent">
                  {' '}{t('home.valueProposition.titleHighlight')}
                </span>
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                {t('home.valueProposition.subtitle')}
              </p>
            </div>
          </ScrollReveal>

          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: Zap,
                  key: 'fastDelivery',
                  color: 'from-yellow-500 to-orange-500',
                },
                {
                  icon: Shield,
                  key: 'qualityAssurance',
                  color: 'from-amber-500 to-orange-500',
                },
                {
                  icon: Users,
                  key: 'professionalTeam',
                  color: 'from-pink-500 to-rose-500',
                },
                {
                  icon: TrendingUp,
                  key: 'continuousOptimization',
                  color: 'from-green-500 to-emerald-500',
                },
                {
                  icon: Award,
                  key: 'industryRecognition',
                  color: 'from-orange-500 to-red-500',
                },
                {
                  icon: Clock,
                  key: 'support247',
                  color: 'from-cyan-500 to-teal-500',
                },
              ].map((advantage, index) => (
                <ScrollReveal key={index} delay={index * 0.1}>
                  <motion.div
                    whileHover={{ y: -10, scale: 1.02 }}
                    className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all group overflow-hidden"
                  >
                    {/* 背景装饰 */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${advantage.color} opacity-0 group-hover:opacity-10 transition-opacity`} />
                    
                    {/* 图标 */}
                    <div className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${advantage.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                      <advantage.icon className="w-8 h-8 text-white" />
                    </div>

                    {/* 内容 */}
                    <h3 className="relative text-2xl font-bold text-white mb-3">
                      {t(`home.valueProposition.advantages.${advantage.key}.title`)}
                    </h3>
                    <p className="relative text-gray-400 mb-6 leading-relaxed">
                      {t(`home.valueProposition.advantages.${advantage.key}.desc`)}
                    </p>

                    {/* 特性列表 */}
                    <ul className="relative space-y-2">
                      {(t.raw(`home.valueProposition.advantages.${advantage.key}.features`) as string[]).map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm text-gray-500">
                          <CheckCircle2 className="w-4 h-4 text-green-400" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <FeaturesGrid />
      <ServicesSection />
      <StatsSection />
      <ProcessSection />
      <PortfolioSectionEnhanced />
      <TechStackSectionEnhanced />
      <PricingSection />
      <FAQSection />
      <ContactSection />
      <CTASection />
    </>
  );
}
