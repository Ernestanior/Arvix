'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { 
  Truck, 
  RefreshCw, 
  CreditCard, 
  AlertCircle, 
  CheckCircle,
  Clock,
  FileText,
  Building2
} from 'lucide-react';
import ScrollReveal from '@/components/ui/ScrollReveal';

export default function RefundPolicyPage() {
  const t = useTranslations('refund');
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0f] via-[#0f0f15] to-[#0a0a0f] relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-[100px]" />
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
            <FileText className="w-4 h-4 text-amber-400" />
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
              <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-bold text-white">{t('companyInfo.title')}</h2>
            </div>
            <div className="space-y-2 text-gray-300 pl-13">
              <p><span className="text-gray-500">{t('companyInfo.legalEntity')}:</span> <span className="font-medium text-white">{t('companyInfo.companyName')}</span></p>
              <p><span className="text-gray-500">{t('companyInfo.registeredAddress')}:</span> {t('companyInfo.address')}</p>
              <p><span className="text-gray-500">{t('companyInfo.phone')}:</span> +65 9156 1413</p>
              <p><span className="text-gray-500">{t('companyInfo.email')}:</span> ern@xyvnai.com</p>
            </div>
          </div>
        </ScrollReveal>

        {/* 运输政策 */}
        <ScrollReveal delay={0.1}>
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                <Truck className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">{t('shipping.title')}</h2>
                <p className="text-gray-400 text-sm">{t('shipping.subtitle')}</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-white mb-2">{t('shipping.digitalOnly.title')}</h3>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {t('shipping.digitalOnly.description')}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-white flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  {t('shipping.delivery.title')}
                </h3>
                <ul className="space-y-3 text-gray-300 text-sm pl-7">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 mt-0.5">•</span>
                    <span>
                      <strong className="text-white">{t('shipping.delivery.saas.title')}:</strong> {t('shipping.delivery.saas.description')}
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 mt-0.5">•</span>
                    <span>
                      <strong className="text-white">{t('shipping.delivery.development.title')}:</strong> {t('shipping.delivery.development.description')}
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 mt-0.5">•</span>
                    <span>
                      <strong className="text-white">{t('shipping.delivery.consulting.title')}:</strong> {t('shipping.delivery.consulting.description')}
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-white mb-1">{t('shipping.timeline.title')}</h3>
                    <p className="text-gray-300 text-sm">
                      {t('shipping.timeline.description')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* 退款政策 */}
        <ScrollReveal delay={0.2}>
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                <RefreshCw className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">{t('refund.title')}</h2>
                <p className="text-gray-400 text-sm">{t('refund.subtitle')}</p>
              </div>
            </div>

            <div className="space-y-6">
              {/* SaaS 订阅退款 */}
              <div className="border-l-4 border-amber-500 pl-4">
                <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-amber-400" />
                  {t('refund.saas.title')}
                </h3>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-0.5">✓</span>
                    <span>
                      <strong className="text-white">{t('refund.saas.sevenDay.title')}:</strong> {t('refund.saas.sevenDay.description')}
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-0.5">✓</span>
                    <span>
                      <strong className="text-white">{t('refund.saas.monthly.title')}:</strong> {t('refund.saas.monthly.description')}
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-0.5">✓</span>
                    <span>
                      <strong className="text-white">{t('refund.saas.annual.title')}:</strong> {t('refund.saas.annual.description')}
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 mt-0.5">!</span>
                    <span>
                      <strong className="text-white">{t('refund.saas.special.title')}:</strong> {t('refund.saas.special.description')}
                    </span>
                  </li>
                </ul>
              </div>

              {/* 定制开发退款 */}
              <div className="border-l-4 border-orange-500 pl-4">
                <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-orange-400" />
                  {t('refund.development.title')}
                </h3>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-0.5">✓</span>
                    <span>
                      <strong className="text-white">{t('refund.development.beforeStart.title')}:</strong> {t('refund.development.beforeStart.description')}
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 mt-0.5">~</span>
                    <span>
                      <strong className="text-white">{t('refund.development.inProgress.title')}:</strong> {t('refund.development.inProgress.description')}
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 mt-0.5">✗</span>
                    <span>
                      <strong className="text-white">{t('refund.development.completed.title')}:</strong> {t('refund.development.completed.description')}
                    </span>
                  </li>
                </ul>
              </div>

              {/* 技术咨询退款 */}
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-blue-400" />
                  {t('refund.consulting.title')}
                </h3>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-0.5">✓</span>
                    <span>
                      <strong className="text-white">{t('refund.consulting.unused.title')}:</strong> {t('refund.consulting.unused.description')}
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 mt-0.5">!</span>
                    <span>
                      <strong className="text-white">{t('refund.consulting.partial.title')}:</strong> {t('refund.consulting.partial.description')}
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 mt-0.5">✗</span>
                    <span>
                      <strong className="text-white">{t('refund.consulting.used.title')}:</strong> {t('refund.consulting.used.description')}
                    </span>
                  </li>
                </ul>
              </div>

              {/* 退款流程 */}
              <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4">
                <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  {t('refund.process.title')}
                </h3>
                <ol className="space-y-2 text-gray-300 text-sm list-decimal list-inside">
                  <li>
                    <strong className="text-white">{t('refund.process.step1.title')}:</strong> {t('refund.process.step1.description')}
                  </li>
                  <li>
                    <strong className="text-white">{t('refund.process.step2.title')}:</strong> {t('refund.process.step2.description')}
                  </li>
                  <li>
                    <strong className="text-white">{t('refund.process.step3.title')}:</strong> {t('refund.process.step3.description')}
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* 联系信息 */}
        <ScrollReveal delay={0.3}>
          <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-2xl p-6 text-center">
            <h3 className="text-xl font-bold text-white mb-2">{t('contact.title')}</h3>
            <p className="text-gray-400 mb-4">
              {t('contact.description')}
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <a href="mailto:ern@xyvnai.com" className="text-amber-400 hover:text-amber-300 transition-colors">
                ern@xyvnai.com
              </a>
              <span className="text-gray-600">|</span>
              <a href="tel:+6591561413" className="text-amber-400 hover:text-amber-300 transition-colors">
                +65 9156 1413
              </a>
            </div>
          </div>
        </ScrollReveal>

        {/* 最后更新时间 */}
        <div className="text-center mt-12 text-gray-500 text-sm">
          <p>{t('footer.lastUpdated')}: {t('footer.date')}</p>
          <p className="mt-1">{t('footer.disclaimer')}</p>
        </div>
      </div>
    </div>
  );
}
