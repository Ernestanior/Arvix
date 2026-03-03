'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { 
  Shield, 
  FileText,
  Building2,
  Mail,
  Phone,
  MapPin,
  ChevronRight
} from 'lucide-react';
import ScrollReveal from '@/components/ui/ScrollReveal';

export default function PrivacyPolicyPage() {
  const t = useTranslations('privacy');

  const SectionCard = ({ title, children, className = '' }: { title: string; children: React.ReactNode; className?: string }) => (
    <div className={`bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 ${className}`}>
      <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
        <ChevronRight className="w-5 h-5 text-amber-400" />
        {title}
      </h2>
      {children}
    </div>
  );

  const ListItems = ({ items }: { items: string[] }) => (
    <ul className="space-y-2 text-gray-300 text-sm">
      {items.map((item, index) => (
        <li key={index} className="flex items-start gap-2">
          <span className="text-amber-400 mt-0.5">•</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0f] via-[#0f0f15] to-[#0a0a0f] relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-4xl mx-auto px-6 py-20 relative z-10">
        {/* 页面标题 */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-6">
            <Shield className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-gray-400">Legal & Compliance</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            {t('title')}
          </h1>
          <p className="text-xl text-gray-400">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* 公司信息 */}
        <ScrollReveal>
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-bold text-white">{t('sections.contact.company')}</h2>
            </div>
            <div className="space-y-2 text-gray-300 text-sm">
              <p className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-blue-400" />
                {t('sections.contact.address')}
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-400" />
                {t('sections.contact.email')}
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-blue-400" />
                {t('sections.contact.phone')}
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* 引言 */}
        <ScrollReveal delay={0.1}>
          <SectionCard title={t('intro.title')}>
            <p className="text-gray-300 text-sm leading-relaxed">
              {t('intro.content')}
            </p>
          </SectionCard>
        </ScrollReveal>

        {/* 信息收集 */}
        <ScrollReveal delay={0.15}>
          <SectionCard title={t('sections.infoCollect.title')} className="mt-6">
            <p className="text-gray-300 text-sm mb-4">{t('sections.infoCollect.content')}</p>
            <ListItems items={t.raw('sections.infoCollect.items')} />
          </SectionCard>
        </ScrollReveal>

        {/* 信息使用 */}
        <ScrollReveal delay={0.2}>
          <SectionCard title={t('sections.infoUse.title')} className="mt-6">
            <p className="text-gray-300 text-sm mb-4">{t('sections.infoUse.content')}</p>
            <ListItems items={t.raw('sections.infoUse.items')} />
          </SectionCard>
        </ScrollReveal>

        {/* 信息共享 */}
        <ScrollReveal delay={0.25}>
          <SectionCard title={t('sections.infoShare.title')} className="mt-6">
            <p className="text-gray-300 text-sm mb-4">{t('sections.infoShare.content')}</p>
            <ListItems items={t.raw('sections.infoShare.items')} />
          </SectionCard>
        </ScrollReveal>

        {/* 数据安全 */}
        <ScrollReveal delay={0.3}>
          <SectionCard title={t('sections.dataSecurity.title')} className="mt-6">
            <p className="text-gray-300 text-sm mb-4">{t('sections.dataSecurity.content')}</p>
            <ListItems items={t.raw('sections.dataSecurity.items')} />
          </SectionCard>
        </ScrollReveal>

        {/* 数据保留 */}
        <ScrollReveal delay={0.35}>
          <SectionCard title={t('sections.dataRetention.title')} className="mt-6">
            <p className="text-gray-300 text-sm">{t('sections.dataRetention.content')}</p>
          </SectionCard>
        </ScrollReveal>

        {/* 用户权利 */}
        <ScrollReveal delay={0.4}>
          <SectionCard title={t('sections.yourRights.title')} className="mt-6">
            <p className="text-gray-300 text-sm mb-4">{t('sections.yourRights.content')}</p>
            <ListItems items={t.raw('sections.yourRights.items')} />
          </SectionCard>
        </ScrollReveal>

        {/* Cookie */}
        <ScrollReveal delay={0.45}>
          <SectionCard title={t('sections.cookies.title')} className="mt-6">
            <p className="text-gray-300 text-sm">{t('sections.cookies.content')}</p>
          </SectionCard>
        </ScrollReveal>

        {/* 第三方链接 */}
        <ScrollReveal delay={0.5}>
          <SectionCard title={t('sections.thirdParty.title')} className="mt-6">
            <p className="text-gray-300 text-sm">{t('sections.thirdParty.content')}</p>
          </SectionCard>
        </ScrollReveal>

        {/* 条款变更 */}
        <ScrollReveal delay={0.65}>
          <SectionCard title={t('sections.changes.title')} className="mt-6">
            <p className="text-gray-300 text-sm">{t('sections.changes.content')}</p>
          </SectionCard>
        </ScrollReveal>

        {/* 最后更新时间 */}
        <div className="text-center mt-12 text-gray-500 text-sm">
          <p>{t('lastUpdated')}: {t('date')}</p>
        </div>
      </div>
    </div>
  );
}
