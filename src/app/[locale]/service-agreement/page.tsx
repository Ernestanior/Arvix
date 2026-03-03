'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { 
  FileSignature, 
  FileText,
  Building2,
  Mail,
  Phone,
  MapPin,
  ChevronRight,
  User
} from 'lucide-react';
import ScrollReveal from '@/components/ui/ScrollReveal';

export default function ServiceAgreementPage() {
  const t = useTranslations('agreement');

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
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-pink-500/10 rounded-full blur-[100px]" />
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
            <FileSignature className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-gray-400">Legal & Compliance</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            {t('title')}
          </h1>
          <p className="text-xl text-gray-400">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* 协议双方 */}
        <ScrollReveal>
          <SectionCard title={t('sections.parties.title')}>
            <p className="text-gray-300 text-sm mb-6">{t('sections.parties.content')}</p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white/5 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Building2 className="w-5 h-5 text-purple-400" />
                  <h3 className="font-semibold text-white">{t('sections.parties.provider.label')}</h3>
                </div>
                <p className="text-white font-medium">{t('sections.parties.provider.name')}</p>
                <p className="text-gray-400 text-sm">{t('sections.parties.provider.address')}</p>
                <p className="text-gray-400 text-sm">{t('sections.parties.provider.contact')}</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-3">
                  <User className="w-5 h-5 text-pink-400" />
                  <h3 className="font-semibold text-white">{t('sections.parties.client.label')}</h3>
                </div>
                <p className="text-gray-300 text-sm">{t('sections.parties.client.description')}</p>
              </div>
            </div>
          </SectionCard>
        </ScrollReveal>

        {/* 服务范围 */}
        <ScrollReveal delay={0.1}>
          <SectionCard title={t('sections.scope.title')} className="mt-6">
            <p className="text-gray-300 text-sm mb-4">{t('sections.scope.content')}</p>
            <ListItems items={t.raw('sections.scope.items')} />
          </SectionCard>
        </ScrollReveal>

        {/* 交付物 */}
        <ScrollReveal delay={0.15}>
          <SectionCard title={t('sections.deliverables.title')} className="mt-6">
            <p className="text-gray-300 text-sm mb-4">{t('sections.deliverables.content')}</p>
            <ListItems items={t.raw('sections.deliverables.items')} />
          </SectionCard>
        </ScrollReveal>

        {/* 项目时间线 */}
        <ScrollReveal delay={0.2}>
          <SectionCard title={t('sections.timeline.title')} className="mt-6">
            <p className="text-gray-300 text-sm mb-4">{t('sections.timeline.content')}</p>
            <ListItems items={t.raw('sections.timeline.items')} />
          </SectionCard>
        </ScrollReveal>

        {/* 付款条款 */}
        <ScrollReveal delay={0.25}>
          <SectionCard title={t('sections.payment.title')} className="mt-6">
            <p className="text-gray-300 text-sm mb-4">{t('sections.payment.content')}</p>
            <ListItems items={t.raw('sections.payment.items')} />
          </SectionCard>
        </ScrollReveal>

        {/* 修改和变更 */}
        <ScrollReveal delay={0.3}>
          <SectionCard title={t('sections.revisions.title')} className="mt-6">
            <p className="text-gray-300 text-sm mb-4">{t('sections.revisions.content')}</p>
            <ListItems items={t.raw('sections.revisions.items')} />
          </SectionCard>
        </ScrollReveal>

        {/* 验收标准 */}
        <ScrollReveal delay={0.35}>
          <SectionCard title={t('sections.acceptance.title')} className="mt-6">
            <p className="text-gray-300 text-sm mb-4">{t('sections.acceptance.content')}</p>
            <ListItems items={t.raw('sections.acceptance.items')} />
          </SectionCard>
        </ScrollReveal>

        {/* 质保条款 */}
        <ScrollReveal delay={0.4}>
          <SectionCard title={t('sections.warranty.title')} className="mt-6">
            <p className="text-gray-300 text-sm mb-4">{t('sections.warranty.content')}</p>
            <ListItems items={t.raw('sections.warranty.items')} />
          </SectionCard>
        </ScrollReveal>

        {/* 知识产权归属 */}
        <ScrollReveal delay={0.45}>
          <SectionCard title={t('sections.ownership.title')} className="mt-6">
            <p className="text-gray-300 text-sm mb-4">{t('sections.ownership.content')}</p>
            <ListItems items={t.raw('sections.ownership.items')} />
          </SectionCard>
        </ScrollReveal>

        {/* 保密条款 */}
        <ScrollReveal delay={0.5}>
          <SectionCard title={t('sections.confidentiality.title')} className="mt-6">
            <p className="text-gray-300 text-sm mb-4">{t('sections.confidentiality.content')}</p>
            <ListItems items={t.raw('sections.confidentiality.items')} />
          </SectionCard>
        </ScrollReveal>

        {/* 协议终止 */}
        <ScrollReveal delay={0.55}>
          <SectionCard title={t('sections.termination.title')} className="mt-6">
            <p className="text-gray-300 text-sm mb-4">{t('sections.termination.content')}</p>
            <ListItems items={t.raw('sections.termination.items')} />
          </SectionCard>
        </ScrollReveal>

        {/* 争议解决 */}
        <ScrollReveal delay={0.6}>
          <SectionCard title={t('sections.dispute.title')} className="mt-6">
            <p className="text-gray-300 text-sm mb-4">{t('sections.dispute.content')}</p>
            <ListItems items={t.raw('sections.dispute.items')} />
          </SectionCard>
        </ScrollReveal>

        {/* 联系方式 */}
        <ScrollReveal delay={0.65}>
          <SectionCard title={t('sections.contact.title')} className="mt-6">
            <p className="text-gray-300 text-sm mb-4">{t('sections.contact.content')}</p>
            <div className="space-y-2 text-gray-300 text-sm">
              <p className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-purple-400" />
                {t('sections.contact.company')}
              </p>
              <p className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-purple-400" />
                {t('sections.contact.address')}
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-purple-400" />
                {t('sections.contact.email')}
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-purple-400" />
                {t('sections.contact.phone')}
              </p>
            </div>
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
