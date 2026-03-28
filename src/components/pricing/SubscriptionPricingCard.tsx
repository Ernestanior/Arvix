'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Check, X, Sparkles, TrendingUp } from 'lucide-react';
import { SubscriptionPackage, BillingCycle } from '@/types/pricing';
import { Currency, formatPrice } from '@/data/currencyData';
import { useTranslations } from 'next-intl';

interface SubscriptionPricingCardProps {
  package: SubscriptionPackage;
  billingCycle: BillingCycle;
  currency: Currency;
  delay?: number;
}

export default function SubscriptionPricingCard({
  package: pkg,
  billingCycle,
  currency,
  delay = 0,
}: SubscriptionPricingCardProps) {
  const t = useTranslations('pricing');
  const isPopular = pkg.tags?.includes('popular');
  const isBestValue = pkg.tags?.includes('best-value');
  const isRecommended = pkg.tags?.includes('recommended');
  
  const monthlyPrice = billingCycle === 'monthly' 
    ? pkg.pricing.monthly 
    : Math.round(pkg.pricing.annual / 12);
  
  const setupFee = pkg.pricing.setupFee;
  const monthlyFee = monthlyPrice;
  const annualSavings = pkg.pricing.monthly * 12 - pkg.pricing.annual;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      whileHover={{ y: -10, scale: 1.02 }}
      className={`relative bg-white/5 backdrop-blur-sm border rounded-3xl p-8 hover:bg-white/10 transition-all ${
        isPopular || isBestValue ? 'border-orange-500 shadow-lg shadow-orange-500/20' : 'border-white/10'
      }`}
    >
      {/* 标签 */}
      {(isPopular || isBestValue || isRecommended) && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <div className="px-4 py-1 bg-gradient-to-r from-orange-500 to-red-500 text-white text-sm font-medium rounded-full flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            {isPopular && t('popular')}
            {isBestValue && t('bestValue')}
            {isRecommended && t('recommended')}
          </div>
        </div>
      )}

      {/* 套餐名称 */}
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-white mb-2">{t(`packages.${pkg.id}.name`)}</h3>
        <p className="text-gray-400 text-sm">{t(`packages.${pkg.id}.description`)}</p>
        {pkg.targetAudience && (
          <p className="text-xs text-gray-500 mt-1">{t('bestFor')}{t(`packages.${pkg.id}.targetAudience`)}</p>
        )}
      </div>

      {/* 价格 */}
      <div className="mb-6">
        {/* 月费 */}
        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-4xl font-bold text-white">
            {formatPrice(monthlyPrice, currency)}
          </span>
          <span className="text-gray-400">/{t('monthlyPrice')}</span>
        </div>
        
        {/* 年付节省提示 */}
        {billingCycle === 'annual' && annualSavings > 0 && (
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-green-400" />
            <span className="text-green-400 text-sm">
              {t('billing.save', { discount: Math.round((annualSavings / (pkg.pricing.monthly * 12)) * 100) })} {formatPrice(annualSavings, currency)}
            </span>
          </div>
        )}
        
        {/* 初装费 */}
        <div className="text-sm text-gray-400">
          {t('setupFee')}: {formatPrice(setupFee, currency)}
        </div>
        
        {/* 交易费（电商） */}
        {pkg.pricing.transactionFee && (
          <div className="text-sm text-gray-400">
            {t('transactionFee')}: {pkg.pricing.transactionFee}%
          </div>
        )}
      </div>

      {/* 限制信息 */}
      {pkg.limits && (
        <div className="mb-6 p-4 bg-white/5 rounded-xl">
          <div className="grid grid-cols-2 gap-3 text-sm">
            {pkg.limits.pages && (
              <div>
                <span className="text-gray-400">{t('limits.pages')}：</span>
                <span className="text-white ml-1">{pkg.limits.pages}</span>
              </div>
            )}
            {pkg.limits.products && (
              <div>
                <span className="text-gray-400">{t('limits.products')}：</span>
                <span className="text-white ml-1">{pkg.limits.products}</span>
              </div>
            )}
            {pkg.limits.orders && (
              <div>
                <span className="text-gray-400">{t('limits.orders')}：</span>
                <span className="text-white ml-1">{pkg.limits.orders}/{t('monthlyPrice')}</span>
              </div>
            )}
            {pkg.limits.storage && (
              <div>
                <span className="text-gray-400">{t('limits.storage')}：</span>
                <span className="text-white ml-1">{pkg.limits.storage}</span>
              </div>
            )}
            {pkg.limits.bandwidth && (
              <div>
                <span className="text-gray-400">{t('limits.bandwidth')}：</span>
                <span className="text-white ml-1">{pkg.limits.bandwidth}</span>
              </div>
            )}
            {pkg.limits.users && (
              <div>
                <span className="text-gray-400">{t('limits.users')}：</span>
                <span className="text-white ml-1">{pkg.limits.users}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 功能列表 */}
      <ul className="space-y-3 mb-8">
        {pkg.features.map((feature, idx) => (
          <li key={idx} className="flex items-start gap-2 text-gray-300">
            {feature.included === false ? (
              <X className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" />
            ) : (
              <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
            )}
            <div className="flex-1">
              <span className="text-sm">
                {feature.id === 'pages' && feature.name.match(/\d+/) 
                  ? t('features.pages', { count: feature.name.match(/\d+/)?.[0] || '' })
                  : t(`features.${feature.id}`)}
              </span>
              {typeof feature.included === 'string' && feature.included !== 'unlimited' && feature.included !== 'limited' && (
                <span className="text-xs text-gray-500 ml-2">({feature.included})</span>
              )}
            </div>
          </li>
        ))}
      </ul>

      {/* 支持信息 */}
      <div className="mb-6 p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl">
        <div className="text-sm">
          <div className="flex items-center justify-between mb-1">
            <span className="text-gray-400">{t('support.label')}：</span>
            <span className="text-white">{pkg.supportLevel === 'email' ? t('support.email') : pkg.supportLevel === 'email-phone' ? t('support.emailPhone') : pkg.supportLevel === 'priority' ? t('support.priority') : t('support.dedicated')}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-400">{t('responseTime')}：</span>
            <span className="text-white">{pkg.responseTime}</span>
          </div>
        </div>
      </div>

      {/* CTA按钮 */}
      <Link href={`/payment?package=${encodeURIComponent(t(`packages.${pkg.id}.name`))}&monthlyTWD=${monthlyPrice}&setupFeeTWD=${setupFee}`}>
        <button
          className={`w-full py-3 rounded-xl font-medium transition-all ${
            isPopular || isBestValue
              ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white hover:shadow-lg'
              : 'bg-white/5 border border-white/10 text-white hover:bg-white/10'
          }`}
        >
          {t('selectPackage')}
        </button>
      </Link>
    </motion.div>
  );
}
