'use client';

import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { 
  Github, 
  Twitter, 
  Linkedin, 
  Mail, 
  Phone, 
  MapPin,
  Send,
  ArrowRight,
  Heart
} from 'lucide-react';
import { useState } from 'react';

export default function FooterEnhanced() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const t = useTranslations();

  const currentYear = new Date().getFullYear();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
      setSubscribed(false);
    }, 3000);
  };

  const footerLinks = {
    services: [
      { label: t('footer.webDevelopment'), href: '/services#web' },
      { label: t('footer.appDevelopment'), href: '/services#app' },
      { label: t('footer.miniprogramDevelopment'), href: '/services#miniapp' },
      { label: t('footer.technicalConsulting'), href: '/services#consulting' },
    ],
    company: [
      { label: t('footer.aboutUs'), href: '/about' },
      { label: t('footer.successCases'), href: '/portfolio' },
      { label: t('footer.servicePricing'), href: '/pricing' },
      { label: t('footer.teamIntro'), href: '/about#team' },
      { label: t('footer.joinUs'), href: '/about#careers' },
    ],
    resources: [
      { label: t('footer.techBlog'), href: '/blog' },
      { label: t('footer.caseStudies'), href: '/case-studies' },
      { label: t('footer.devDocs'), href: '/docs' },
      { label: t('footer.helpCenter'), href: '/help' },
      { label: t('footer.apiDocs'), href: '/api-docs' },
    ],
    legal: [
      { label: t('footer.privacyPolicy'), href: '/privacy' },
      { label: t('footer.termsOfUse'), href: '/terms' },
      { label: t('footer.refundPolicy'), href: '/refund-policy' },
      { label: t('footer.serviceAgreement'), href: '/agreement' },
      { label: t('footer.cookiePolicy'), href: '/cookies' },
    ],
  };

  const socialLinks = [
    { icon: Github, href: 'https://github.com', label: 'GitHub', color: 'hover:text-gray-400' },
    { icon: Twitter, href: 'https://twitter.com', label: 'Twitter', color: 'hover:text-amber-400' },
    { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn', color: 'hover:text-blue-600' },
    { icon: Mail, href: 'mailto:sky19920128@gmail.com', label: 'Email', color: 'hover:text-red-400' },
  ];

  return (
    <footer className="relative bg-gradient-to-b from-gray-900 to-black text-white overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(245,158,11,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(245,158,11,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />

      <div className="relative z-10">
        {/* 主要内容区 */}
        <div className="max-w-7xl mx-auto px-6 md:px-8 pt-20 pb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
            {/* 公司信息和订阅 */}
            <div className="lg:col-span-4">
              <Link href="/" className="inline-block mb-6">
                <motion.h3 
                  className="text-3xl font-bold bg-gradient-to-r from-amber-400 via-orange-400 to-red-400 bg-clip-text text-transparent"
                  whileHover={{ scale: 1.05 }}
                >
                  ARVIX
                </motion.h3>
              </Link>
              <p className="text-gray-400 mb-6 leading-relaxed">
                {t('footer.companyDescription')}
              </p>



              {/* 邮件订阅 */}
              {/* <div className="mb-6">
                <h4 className="text-sm font-semibold text-white mb-3">{t('footer.subscribeNewsletter')}</h4>
                <form onSubmit={handleSubscribe} className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t('footer.enterEmail')}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-amber-500/50 transition-all"
                    required
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg hover:shadow-lg hover:shadow-amber-500/50 transition-all group"
                  >
                    <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </form>
                {subscribed && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm text-green-400 mt-2"
                  >
                    ✓ {t('footer.subscribeSuccess')}
                  </motion.p>
                )}
              </div> */}

              {/* 社交媒体 */}
              <div>
                <h4 className="text-sm font-semibold text-white mb-3">{t('footer.followUs')}</h4>
                <div className="flex gap-3">
                  {socialLinks.map((social, idx) => (
                    <motion.a
                      key={idx}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className={`w-10 h-10 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center text-gray-400 ${social.color} transition-all`}
                      aria-label={social.label}
                    >
                      <social.icon className="w-5 h-5" />
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>

            {/* 链接区域 */}
            <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-8">
              {/* 服务 */}
              <div>
                <h4 className="font-semibold text-white mb-4 flex items-center gap-2">
                  <div className="w-1 h-4 bg-gradient-to-b from-amber-500 to-orange-500 rounded-full" />
                  {t('footer.services')}
                </h4>
                <ul className="space-y-3">
                  {footerLinks.services.map((link, idx) => (
                    <li key={idx}>
                      <Link
                        href={link.href}
                        className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group"
                      >
                        <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                        <span>{link.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 公司 */}
              <div>
                <h4 className="font-semibold text-white mb-4 flex items-center gap-2">
                  <div className="w-1 h-4 bg-gradient-to-b from-amber-500 to-orange-500 rounded-full" />
                  {t('footer.company')}
                </h4>
                <ul className="space-y-3">
                  {footerLinks.company.map((link, idx) => (
                    <li key={idx}>
                      <Link
                        href={link.href}
                        className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group"
                      >
                        <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                        <span>{link.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 资源 */}
              <div>
                <h4 className="font-semibold text-white mb-4 flex items-center gap-2">
                  <div className="w-1 h-4 bg-gradient-to-b from-amber-500 to-orange-500 rounded-full" />
                  {t('footer.resources')}
                </h4>
                <ul className="space-y-3">
                  {footerLinks.resources.map((link, idx) => (
                    <li key={idx}>
                      <Link
                        href={link.href}
                        className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group"
                      >
                        <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                        <span>{link.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 联系方式 */}
              <div>
                <h4 className="font-semibold text-white mb-4 flex items-center gap-2">
                  <div className="w-1 h-4 bg-gradient-to-b from-amber-500 to-orange-500 rounded-full" />
                  {t('footer.contact')}
                </h4>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3 text-gray-400">
                    <Mail className="w-4 h-4 mt-1 flex-shrink-0 text-amber-400" />
                    <a href="mailto:ern@xyvnai.com" className="hover:text-white transition-colors">
                      ern@xyvnai.com
                    </a>
                  </li>
                  <li className="flex items-start gap-3 text-gray-400">
                    <Phone className="w-4 h-4 mt-1 flex-shrink-0 text-amber-400" />
                    <a href="tel:+6591561413" className="hover:text-white transition-colors">
                      +65 9156 1413
                    </a>
                  </li>
                  <li className="flex items-start gap-3 text-gray-400">
                    <MapPin className="w-4 h-4 mt-1 flex-shrink-0 text-amber-400" />
                    <span>1 Jln Membina, Singapore 169479</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* 分隔线 */}
          <div className="border-t border-white/10 mb-8" />

          {/* 底部信息 */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <span>{t('footer.copyright', { year: currentYear })}</span>

            </div>

            <div className="flex flex-wrap justify-center gap-6">
              {footerLinks.legal.map((link, idx) => (
                <Link
                  key={idx}
                  href={link.href}
                  className="text-gray-400 hover:text-white text-sm transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* 底部装饰条 */}
        <div className="h-1 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500" />
      </div>
    </footer>
  );
}
