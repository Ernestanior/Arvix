'use client';

import { motion } from 'framer-motion';
import { Target, Heart, Zap, Users, Award, TrendingUp, Code2, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import StatsSection from '@/components/sections/StatsSection';
import TechStackSectionEnhanced from '@/components/sections/TechStackSectionEnhanced';
import ProcessSectionEnhanced from '@/components/sections/ProcessSectionEnhanced';
import CTASection from '@/components/sections/CTASection';
import ScrollReveal from '@/components/ui/ScrollReveal';

export default function AboutPage() {
  const values = [
    {
      icon: Target,
      title: '专注极致',
      desc: '追求每一个细节的完美，不妥协于平庸',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Heart,
      title: '用户至上',
      desc: '以用户体验为核心，创造真正有价值的产品',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: Zap,
      title: '持续创新',
      desc: '拥抱新技术，不断探索更好的解决方案',
      color: 'from-orange-500 to-red-500',
    },
    {
      icon: Users,
      title: '团队协作',
      desc: '开放沟通，互相信任，共同成长',
      color: 'from-green-500 to-emerald-500',
    },
  ];

  const milestones = [
    { year: '2020', title: '公司成立', desc: '在新加坡创立，专注数字产品开发' },
    { year: '2021', title: '团队扩张', desc: '团队规模扩大到 20+ 人' },
    { year: '2022', title: '业务突破', desc: '服务客户超过 100 家企业' },
    { year: '2023', title: '技术升级', desc: '全面采用最新技术栈' },
    { year: '2024', title: '持续增长', desc: '项目成功率达 99%' },
  ];

  const team = [
    {
      role: '技术团队',
      count: '15+',
      desc: '资深工程师',
      skills: ['前端开发', '后端开发', '移动开发', 'DevOps'],
    },
    {
      role: '设计团队',
      count: '8+',
      desc: 'UI/UX 设计师',
      skills: ['用户研究', '交互设计', '视觉设计', '品牌设计'],
    },
    {
      role: '产品团队',
      count: '5+',
      desc: '产品经理',
      skills: ['需求分析', '产品规划', '项目管理', '数据分析'],
    },
  ];

  const achievements = [
    { icon: Award, label: '行业奖项', value: '12+' },
    { icon: CheckCircle2, label: '成功项目', value: '200+' },
    { icon: Users, label: '服务客户', value: '150+' },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-pink-500/10" />
        <div className="container mx-auto px-6 relative z-10">
          <ScrollReveal>
            <div className="text-center max-w-4xl mx-auto">
              
              
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
                用技术创造
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  {' '}无限可能
                </span>
              </h1>
              
              <p className="text-xl text-gray-400 leading-relaxed mb-8">
                我们是一支充满激情的技术团队，专注于为企业提供高质量的数字产品开发服务
                <br />
                从创意到实现，我们用代码和设计改变世界
              </p>

              <div className="flex flex-wrap gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    const contactSection = document.getElementById('contact');
                    if (contactSection) {
                      contactSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full font-medium hover:shadow-lg hover:shadow-blue-500/50 transition-all flex items-center gap-2"
                >
                  开始合作
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <ScrollReveal>
              <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-sm border border-white/10 rounded-3xl p-10 hover:scale-105 transition-transform">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center mb-6">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-4">我们的使命</h3>
                <p className="text-gray-400 leading-relaxed text-lg">
                  通过创新的技术和卓越的设计，帮助企业实现数字化转型，创造更好的用户体验和商业价值。让每一个产品都成为用户喜爱的作品。
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-sm border border-white/10 rounded-3xl p-10 hover:scale-105 transition-transform">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-6">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-4">我们的愿景</h3>
                <p className="text-gray-400 leading-relaxed text-lg">
                  成为行业领先的数字产品开发团队，以技术创新和用户体验为核心，为客户创造持续的价值，推动行业进步。
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                核心价值观
              </h2>
              <p className="text-xl text-gray-400">
                这些价值观指引着我们的每一个决策
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -10 }}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 group"
                >
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${value.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <value.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">{value.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{value.desc}</p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {achievements.map((item, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-all">
                  <item.icon className="w-10 h-10 text-blue-400 mx-auto mb-4" />
                  <div className="text-4xl font-bold text-white mb-2">{item.value}</div>
                  <div className="text-gray-400 text-sm">{item.label}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                专业团队
              </h2>
              <p className="text-xl text-gray-400">
                汇聚行业精英，打造卓越产品
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {team.map((item, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all">
                  <div className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
                    {item.count}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{item.role}</h3>
                  <p className="text-gray-400 mb-6">{item.desc}</p>
                  <div className="space-y-2">
                    {item.skills.map((skill, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-gray-500">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                        {skill}
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                发展历程
              </h2>
              <p className="text-xl text-gray-400">
                一路走来，感谢有你
              </p>
            </div>
          </ScrollReveal>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500" />
              
              <div className="space-y-8">
                {milestones.map((milestone, index) => (
                  <ScrollReveal key={index} delay={index * 0.1}>
                    <div className="relative pl-20">
                      <div className="absolute left-0 w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center font-bold text-white">
                        {milestone.year}
                      </div>
                      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all">
                        <h3 className="text-2xl font-bold text-white mb-2">{milestone.title}</h3>
                        <p className="text-gray-400">{milestone.desc}</p>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <StatsSection />
      <TechStackSectionEnhanced />
      <ProcessSectionEnhanced />
      <CTASection />
    </>
  );
}
