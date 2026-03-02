'use client';

import { motion } from 'framer-motion';
import { TrendingUp, Users, Award, Zap } from 'lucide-react';
import ScrollReveal from '../ui/ScrollReveal';
import AnimatedCounter from '../AnimatedCounter';
import { useTranslations } from 'next-intl';

export default function StatsSection() {
  const t = useTranslations('home.statsSection');
  
  const stats = [
    {
      icon: TrendingUp,
      value: 150,
      suffix: '+',
      statKey: 'projects',
      color: 'from-amber-500 to-orange-500',
    },
    {
      icon: Users,
      value: 80,
      suffix: '+',
      statKey: 'clients',
      color: 'from-orange-500 to-red-500',
    },
    
    {
      icon: Zap,
      value: 24,
      suffix: 'h',
      statKey: 'response',
      color: 'from-cyan-500 to-teal-500',
    },
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-500/5 to-transparent" />
      
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <ScrollReveal key={index} delay={index * 0.1}>
              <motion.div
                whileHover={{ y: -10, scale: 1.02 }}
                className="relative group"
              >
                {/* 卡片 */}
                <div className="relative p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden">
                  {/* 渐变背景 */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                  
                  {/* 图标 */}
                  <div className={`w-16 h-16 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <stat.icon className="w-8 h-8 text-white" />
                  </div>

                  {/* 数值 */}
                  <div className="mb-2">
                    <span className={`text-5xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                      <AnimatedCounter 
                        end={stat.value} 
                        suffix={stat.suffix}
                        duration={2000}
                      />
                    </span>
                  </div>

                  {/* 标签 */}
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {t(`items.${stat.statKey}.label`)}
                  </h3>

                  {/* 描述 */}
                  <p className="text-gray-400 text-sm">
                    {t(`items.${stat.statKey}.description`)}
                  </p>

                  {/* 装饰线 */}
                  <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${stat.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500`} />
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        {/* 底部说明 */}
        <ScrollReveal delay={0.5}>
          <div className="mt-16 text-center">
            <p className="text-gray-500 text-sm">
              {t('note')}
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
