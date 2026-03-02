'use client';

import { motion } from 'framer-motion';
import { Check, Star, Zap, Crown } from 'lucide-react';
import ScrollReveal from '../ui/ScrollReveal';
import Button from '../ui/Button';
import { useTranslations } from 'next-intl';

export default function PricingSection() {
  const t = useTranslations('home.pricing');
  
  const plans = [
    {
      icon: Star,
      planKey: 'basic',
      color: 'from-amber-500 to-orange-500',
      popular: false,
    },
    {
      icon: Zap,
      planKey: 'professional',
      color: 'from-orange-500 to-red-500',
      popular: true,
    },
    {
      icon: Crown,
      planKey: 'enterprise',
      color: 'from-violet-500 to-purple-500',
      popular: false,
    },
  ];

  return (
    <section className="py-32 relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16">
            
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {t('title')}
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              {t('subtitle')}
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <ScrollReveal key={index} delay={index * 0.1}>
              <motion.div
                whileHover={{ y: -10, scale: 1.02 }}
                className={`relative ${plan.popular ? 'md:-mt-4 md:mb-4' : ''}`}
              >
                {/* 热门标签 */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-orange-500 to-red-500 text-white text-sm font-medium rounded-full shadow-lg z-10">
                    {t('popular')}
                  </div>
                )}

                {/* 卡片 */}
                <div className={`relative p-8 bg-white/5 backdrop-blur-sm border ${
                  plan.popular ? 'border-orange-500/50' : 'border-white/10'
                } rounded-2xl overflow-hidden h-full flex flex-col`}>
                  {/* 渐变背景 */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${plan.color} opacity-0 hover:opacity-10 transition-opacity duration-500`} />

                  {/* 图标 */}
                  <div className={`w-16 h-16 bg-gradient-to-br ${plan.color} rounded-xl flex items-center justify-center mb-6`}>
                    <plan.icon className="w-8 h-8 text-white" />
                  </div>

                  {/* 标题 */}
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {t(`plans.${plan.planKey}.name`)}
                  </h3>

                  {/* 描述 */}
                  <p className="text-gray-400 text-sm mb-6">
                    {t(`plans.${plan.planKey}.description`)}
                  </p>

                  

                  {/* 功能列表 */}
                  <ul className="space-y-4 mb-8 flex-grow">
                    {(t.raw(`plans.${plan.planKey}.features`) as string[]).map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <div className={`w-5 h-5 rounded-full bg-gradient-to-r ${plan.color} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                          <Check className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-gray-300 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* 按钮 */}
                  <Button
                    variant={plan.popular ? 'primary' : 'outline'}
                    className="w-full"
                    onClick={() => {
                      const contactSection = document.getElementById('contact');
                      if (contactSection) {
                        contactSection.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                  >
                    {t('button')}
                  </Button>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        {/* 底部说明 */}
        <ScrollReveal delay={0.4}>
          <div className="mt-16 text-center space-y-4">
            <p className="text-gray-400">
              {t('notes.pricing')}
            </p>
            <p className="text-gray-500 text-sm">
              {t('notes.support')}
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
