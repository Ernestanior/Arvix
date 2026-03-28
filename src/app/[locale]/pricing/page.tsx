'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Check, X, Calculator, TrendingUp, Shield, Clock, Users, ArrowRight, Sparkles, DollarSign, Globe, ChevronDown } from 'lucide-react';
import ScrollReveal from '@/components/ui/ScrollReveal';
import FAQSection from '@/components/sections/FAQSection';
import CTASection from '@/components/sections/CTASection';
import { pricingPackages, calculateDiscount, PricingPackage } from '@/data/pricingPackages';
import { currencies, Currency, formatPrice, getCurrency, formatPriceRange } from '@/data/currencyData';
import PricingModeToggle from '@/components/pricing/PricingModeToggle';
import BillingCycleToggle from '@/components/pricing/BillingCycleToggle';
import SubscriptionPricingCard from '@/components/pricing/SubscriptionPricingCard';
import SubscriptionCalculator from '@/components/pricing/SubscriptionCalculator';
import CostComparisonCalculator from '@/components/pricing/CostComparisonCalculator';
import { allSubscriptionPackages, getSubscriptionsByCategory } from '@/data/subscriptionPackages';
import { PricingMode, BillingCycle } from '@/types/pricing';
import { useTranslations } from 'next-intl';

export default function PricingPage() {
  const { locale } = useParams();
  const t = useTranslations('pricing');
  const [selectedCategory, setSelectedCategory] = useState('corporate-website');
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>(getCurrency('USD'));
  const [showCurrencyMenu, setShowCurrencyMenu] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<PricingPackage | null>(null);
  const [showCalculator, setShowCalculator] = useState(false);
  
  // 新增：定价模式状态
  const [pricingMode, setPricingMode] = useState<PricingMode>('subscription');
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('annual');
  
  // 计算器状态
  const [calculatorCategory, setCalculatorCategory] = useState('corporate-website');
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);

  const categories = [
    { id: 'corporate-website', name: t('corporate-website'), icon: '🌐' },
    { id: 'ecommerce', name: t('ecommerce'), icon: '🛍️' },
    { id: 'landing-page', name: t('landing-page'), icon: '🎯' },
    { id: 'admin-system', name: t('admin-system'), icon: '⚙️' },
    { id: 'cross-platform-app', name: t('cross-platform-app'), icon: '📱' },
    { id: 'miniprogram', name: t('miniprogram'), icon: '💬' },
  ];

  const advantages = [
    {
      icon: Shield,
      title: t('advantages.transparent.title'),
      desc: t('advantages.transparent.desc'),
      color: 'from-amber-500 to-orange-500',
    },
    {
      icon: Clock,
      title: t('advantages.ontime.title'),
      desc: t('advantages.ontime.desc'),
      color: 'from-orange-500 to-red-500',
    },
    {
      icon: Users,
      title: t('advantages.dedicated.title'),
      desc: t('advantages.dedicated.desc'),
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: TrendingUp,
      title: t('advantages.continuous.title'),
      desc: t('advantages.continuous.desc'),
      color: 'from-cyan-500 to-teal-500',
    },
  ];

  const filteredPackages = pricingPackages.filter(pkg => pkg.category === selectedCategory);

  // 计算价格范围（±15%）
  const getPriceRange = (basePrice: number) => {
    const minPrice = Math.round(basePrice * 0.85);
    const maxPrice = Math.round(basePrice * 1.15);
    return { minPrice, maxPrice };
  };

  // 定价规则配置
  const pricingRules: Record<string, { base: number; features: { id: string; name: string; price: number; category?: string }[] }> = {
    'corporate-website': {
      base: 30000,
      features: [
        // 页面数量
        { id: 'pages-5', name: '5页以内', price: 0, category: '页面数量' },
        { id: 'pages-10', name: '6-10页', price: 15000, category: '页面数量' },
        { id: 'pages-15', name: '11-15页', price: 30000, category: '页面数量' },
        { id: 'pages-20', name: '16-20页', price: 45000, category: '页面数量' },
        { id: 'pages-30', name: '20页以上', price: 65000, category: '页面数量' },
        
        // 设计风格
        { id: 'design-template', name: '模板定制', price: 0, category: '设计风格' },
        { id: 'design-original', name: '原创设计', price: 12000, category: '设计风格' },
        { id: 'design-premium', name: '高端定制设计', price: 25000, category: '设计风格' },
        
        // 动画效果
        { id: 'animation-basic', name: '基础动画', price: 0, category: '动画效果' },
        { id: 'animation-advanced', name: '高级动画', price: 8000, category: '动画效果' },
        { id: 'animation-3d', name: '3D/WebGL特效', price: 15000, category: '动画效果' },
        
        // 多语言
        { id: 'lang-single', name: '单语言', price: 0, category: '多语言' },
        { id: 'lang-dual', name: '双语言（中英）', price: 6000, category: '多语言' },
        { id: 'lang-triple', name: '三语言（中英日）', price: 12000, category: '多语言' },
        { id: 'lang-multi', name: '四语言及以上', price: 18000, category: '多语言' },
        
        // 内容管理
        { id: 'cms-none', name: '无后台', price: 0, category: '内容管理' },
        { id: 'cms-basic', name: '基础后台', price: 8000, category: '内容管理' },
        { id: 'cms-advanced', name: '高级CMS', price: 18000, category: '内容管理' },
        
        // 功能模块
        { id: 'seo', name: 'SEO优化', price: 5000 },
        { id: 'blog', name: '博客系统', price: 6000 },
        { id: 'news', name: '新闻管理', price: 5000 },
        { id: 'chat', name: '在线客服', price: 3000 },
        { id: 'form', name: '高级表单', price: 4000 },
        { id: 'member', name: '会员系统', price: 12000 },
        { id: 'search', name: '站内搜索', price: 5000 },
        
        // 技术栈
        { id: 'tech-wordpress', name: 'WordPress', price: 0, category: '技术栈' },
        { id: 'tech-nextjs', name: 'Next.js', price: 12000, category: '技术栈' },
        { id: 'tech-custom', name: '定制框架', price: 20000, category: '技术栈' },
      ],
    },
    'ecommerce': {
      base: 80000,
      features: [
        // 平台选择
        { id: 'platform-shopify', name: 'Shopify定制', price: 0, category: '平台选择' },
        { id: 'platform-woo', name: 'WooCommerce', price: 10000, category: '平台选择' },
        { id: 'platform-custom', name: '自建电商平台', price: 100000, category: '平台选择' },
        
        // SKU规模
        { id: 'sku-100', name: '100个SKU以内', price: 0, category: 'SKU规模' },
        { id: 'sku-500', name: '100-500个SKU', price: 20000, category: 'SKU规模' },
        { id: 'sku-1000', name: '500-1000个SKU', price: 40000, category: 'SKU规模' },
        { id: 'sku-unlimited', name: '1000个SKU以上', price: 60000, category: 'SKU规模' },
        
        // 支付网关
        { id: 'payment-1', name: '1个支付网关', price: 6000, category: '支付网关' },
        { id: 'payment-2', name: '2个支付网关', price: 12000, category: '支付网关' },
        { id: 'payment-3', name: '3个支付网关', price: 18000, category: '支付网关' },
        { id: 'payment-5', name: '5个支付网关', price: 30000, category: '支付网关' },
        
        // 物流系统
        { id: 'logistics-basic', name: '基础物流', price: 6000, category: '物流系统' },
        { id: 'logistics-advanced', name: '智能物流', price: 12000, category: '物流系统' },
        { id: 'logistics-multi', name: '多仓库物流', price: 20000, category: '物流系统' },
        
        // 营销功能
        { id: 'coupon', name: '优惠券系统', price: 10000 },
        { id: 'member', name: '会员等级系统', price: 12000 },
        { id: 'points', name: '积分系统', price: 10000 },
        { id: 'recommend', name: '商品推荐', price: 15000 },
        { id: 'review', name: '评价系统', price: 6000 },
        { id: 'wishlist', name: '收藏/心愿单', price: 5000 },
        
        // 高级功能
        { id: 'distribution', name: '分销系统', price: 35000 },
        { id: 'flash-sale', name: '秒杀系统', price: 25000 },
        { id: 'group-buy', name: '拼团功能', price: 20000 },
        { id: 'ai-recommend', name: 'AI推荐引擎', price: 60000 },
        { id: 'live', name: '直播带货', price: 35000 },
        { id: 'multi-store', name: '多商户平台', price: 80000 },
        
        // 数据分析
        { id: 'analytics-basic', name: '基础数据统计', price: 0, category: '数据分析' },
        { id: 'analytics-advanced', name: '高级数据分析', price: 15000, category: '数据分析' },
        { id: 'analytics-bi', name: 'BI商业智能', price: 35000, category: '数据分析' },
      ],
    },
    'landing-page': {
      base: 15000,
      features: [
        // 页面类型
        { id: 'type-single', name: '单页面', price: 0, category: '页面类型' },
        { id: 'type-multi', name: '多页面（2-3页）', price: 8000, category: '页面类型' },
        { id: 'type-campaign', name: '活动专题（5页+）', price: 20000, category: '页面类型' },
        
        // 设计复杂度
        { id: 'design-simple', name: '简约设计', price: 0, category: '设计复杂度' },
        { id: 'design-creative', name: '创意设计', price: 8000, category: '设计复杂度' },
        { id: 'design-premium', name: '高端定制', price: 18000, category: '设计复杂度' },
        
        // 动画效果
        { id: 'animation-none', name: '无动画', price: 0, category: '动画效果' },
        { id: 'animation-basic', name: '基础动画', price: 3000, category: '动画效果' },
        { id: 'animation-advanced', name: '高级动画', price: 8000, category: '动画效果' },
        { id: 'animation-interactive', name: '交互动画', price: 15000, category: '动画效果' },
        
        // 响应式
        { id: 'responsive-mobile', name: '移动端优化', price: 0, category: '响应式' },
        { id: 'responsive-full', name: '全设备适配', price: 5000, category: '响应式' },
        
        // 核心功能
        { id: 'form-basic', name: '基础表单', price: 0 },
        { id: 'form-advanced', name: '高级表单', price: 4000 },
        { id: 'countdown', name: '倒计时', price: 2000 },
        { id: 'video', name: '视频背景', price: 3000 },
        { id: 'popup', name: '弹窗/浮层', price: 2000 },
        { id: 'chat', name: '在线客服', price: 3000 },
        
        // 营销工具
        { id: 'ab-test', name: 'A/B测试', price: 8000 },
        { id: 'analytics', name: '数据追踪', price: 5000 },
        { id: 'pixel', name: '广告像素', price: 3000 },
        { id: 'seo', name: 'SEO优化', price: 4000 },
        
        // 集成功能
        { id: 'crm', name: 'CRM集成', price: 6000 },
        { id: 'email', name: '邮件营销集成', price: 5000 },
        { id: 'payment', name: '支付集成', price: 8000 },
        { id: 'social', name: '社交媒体集成', price: 3000 },
      ],
    },
    'admin-system': {
      base: 80000,
      features: [
        // 系统类型
        { id: 'type-crm', name: 'CRM客户管理', price: 0, category: '系统类型' },
        { id: 'type-erp', name: 'ERP企业资源', price: 50000, category: '系统类型' },
        { id: 'type-oa', name: 'OA办公自动化', price: 30000, category: '系统类型' },
        { id: 'type-hrm', name: 'HRM人力资源', price: 35000, category: '系统类型' },
        { id: 'type-scm', name: 'SCM供应链', price: 45000, category: '系统类型' },
        { id: 'type-wms', name: 'WMS仓库管理', price: 40000, category: '系统类型' },
        { id: 'type-inventory', name: '进销存系统', price: 25000, category: '系统类型' },
        { id: 'type-ticket', name: '工单系统', price: 20000, category: '系统类型' },
        { id: 'type-rms', name: 'RMS餐饮管理', price: 40000, category: '系统类型' },
        { id: 'type-custom', name: '定制管理系统', price: 20000, category: '系统类型' },
        
        // 用户规模
        { id: 'users-10', name: '10人以内', price: 0, category: '用户规模' },
        { id: 'users-50', name: '10-50人', price: 15000, category: '用户规模' },
        { id: 'users-100', name: '50-100人', price: 30000, category: '用户规模' },
        { id: 'users-500', name: '100-500人', price: 60000, category: '用户规模' },
        { id: 'users-unlimited', name: '500人以上', price: 100000, category: '用户规模' },
        
        // 权限管理
        { id: 'auth-basic', name: '基础权限', price: 0, category: '权限管理' },
        { id: 'auth-role', name: '角色权限', price: 10000, category: '权限管理' },
        { id: 'auth-advanced', name: '精细化权限', price: 20000, category: '权限管理' },
        
        // 核心模块
        { id: 'dashboard', name: '数据看板', price: 12000 },
        { id: 'user-mgmt', name: '用户管理', price: 8000 },
        { id: 'dept-mgmt', name: '部门管理', price: 6000 },
        { id: 'workflow', name: '工作流引擎', price: 25000 },
        { id: 'approval', name: '审批流程', price: 15000 },
        { id: 'notification', name: '消息通知', price: 8000 },
        
        // 业务模块 - 通用
        { id: 'customer', name: '客户管理', price: 12000 },
        { id: 'order', name: '订单管理', price: 12000 },
        { id: 'inventory', name: '库存管理', price: 15000 },
        { id: 'finance', name: '财务管理', price: 20000 },
        { id: 'hr', name: '人力资源', price: 18000 },
        { id: 'project', name: '项目管理', price: 15000 },
        { id: 'document', name: '文档管理', price: 10000 },
        
        // 业务模块 - HRM人力资源专用
        { id: 'recruit', name: '招聘管理', price: 12000 },
        { id: 'attendance', name: '考勤打卡', price: 10000 },
        { id: 'salary', name: '薪资核算', price: 15000 },
        { id: 'performance', name: '绩效考核', price: 12000 },
        { id: 'training', name: '培训管理', price: 10000 },
        { id: 'leave', name: '请假审批', price: 8000 },
        { id: 'social-security', name: '社保公积金', price: 10000 },
        
        // 业务模块 - SCM供应链专用
        { id: 'procurement', name: '采购管理', price: 15000 },
        { id: 'supplier-mgmt', name: '供应商管理', price: 12000 },
        { id: 'logistics', name: '物流跟踪', price: 12000 },
        { id: 'quality', name: '质量管理', price: 10000 },
        { id: 'forecast', name: '需求预测', price: 18000 },
        { id: 'contract', name: '合同管理', price: 10000 },
        
        // 业务模块 - WMS仓库管理专用
        { id: 'inbound', name: '入库管理', price: 10000 },
        { id: 'outbound', name: '出库管理', price: 10000 },
        { id: 'stocktaking', name: '盘点管理', price: 8000 },
        { id: 'location', name: '库位管理', price: 10000 },
        { id: 'barcode', name: '条码扫描', price: 8000 },
        { id: 'batch', name: '批次管理', price: 10000 },
        { id: 'expiry', name: '保质期管理', price: 8000 },
        
        // 业务模块 - 进销存专用
        { id: 'purchase', name: '采购入库', price: 10000 },
        { id: 'sales', name: '销售出库', price: 10000 },
        { id: 'stock-alert', name: '库存预警', price: 6000 },
        { id: 'cost', name: '成本核算', price: 12000 },
        { id: 'multi-warehouse', name: '多仓库管理', price: 15000 },
        
        // 业务模块 - 工单系统专用
        { id: 'ticket-create', name: '工单创建', price: 8000 },
        { id: 'ticket-assign', name: '智能派单', price: 10000 },
        { id: 'ticket-track', name: '进度跟踪', price: 8000 },
        { id: 'sla', name: 'SLA管理', price: 10000 },
        { id: 'knowledge-base', name: '知识库', price: 12000 },
        { id: 'satisfaction', name: '满意度评价', price: 6000 },
        
        // 业务模块 - 餐饮专用
        { id: 'pos', name: 'POS收银系统', price: 18000 },
        { id: 'menu', name: '菜单管理', price: 8000 },
        { id: 'table', name: '桌台管理', price: 10000 },
        { id: 'kitchen', name: '厨房打印/KDS', price: 12000 },
        { id: 'reservation', name: '预订管理', price: 10000 },
        { id: 'member-card', name: '会员卡系统', price: 12000 },
        { id: 'supplier', name: '供应商管理', price: 10000 },
        { id: 'recipe', name: '配方成本管理', price: 15000 },
        { id: 'chain', name: '连锁店管理', price: 25000 },
        
        // 数据功能
        { id: 'report-basic', name: '基础报表', price: 0, category: '报表系统' },
        { id: 'report-advanced', name: '高级报表', price: 15000, category: '报表系统' },
        { id: 'report-bi', name: 'BI数据分析', price: 35000, category: '报表系统' },
        
        // 集成功能
        { id: 'api', name: 'API接口', price: 12000 },
        { id: 'import-export', name: '数据导入导出', price: 8000 },
        { id: 'third-party', name: '第三方集成', price: 15000 },
        { id: 'sso', name: '单点登录SSO', price: 12000 },
        
        // 高级功能
        { id: 'mobile', name: '移动端适配', price: 25000 },
        { id: 'multi-tenant', name: '多租户架构', price: 40000 },
        { id: 'microservice', name: '微服务架构', price: 60000 },
      ],
    },
    'cross-platform-app': {
      base: 120000,
      features: [
        // 技术框架
        { id: 'tech-rn', name: 'React Native', price: 0, category: '技术框架' },
        { id: 'tech-flutter', name: 'Flutter', price: 0, category: '技术框架' },
        { id: 'tech-uniapp', name: 'Uni-app', price: -10000, category: '技术框架' },
        
        // 平台支持
        { id: 'platform-basic', name: 'iOS + Android', price: 0, category: '平台支持' },
        { id: 'platform-tablet', name: '+ 平板适配', price: 20000, category: '平台支持' },
        { id: 'platform-web', name: '+ Web版本', price: 30000, category: '平台支持' },
        
        // 页面复杂度
        { id: 'pages-10', name: '10个页面以内', price: 0, category: '页面数量' },
        { id: 'pages-20', name: '10-20个页面', price: 20000, category: '页面数量' },
        { id: 'pages-30', name: '20-30个页面', price: 40000, category: '页面数量' },
        { id: 'pages-50', name: '30个页面以上', price: 60000, category: '页面数量' },
        
        // 用户系统
        { id: 'auth-basic', name: '基础登录注册', price: 0, category: '用户系统' },
        { id: 'auth-social', name: '+ 第三方登录', price: 8000, category: '用户系统' },
        { id: 'auth-advanced', name: '+ 完整用户中心', price: 15000, category: '用户系统' },
        
        // 核心功能
        { id: 'map', name: '地图定位', price: 12000 },
        { id: 'camera', name: '相机/相册', price: 8000 },
        { id: 'scan', name: '扫码功能', price: 5000 },
        { id: 'share', name: '分享功能', price: 5000 },
        { id: 'push', name: '推送通知', price: 6000 },
        
        // 支付功能
        { id: 'payment-1', name: '1个支付方式', price: 10000, category: '支付功能' },
        { id: 'payment-2', name: '2个支付方式', price: 20000, category: '支付功能' },
        { id: 'payment-3', name: '3个支付方式', price: 30000, category: '支付功能' },
        
        // 高级功能
        { id: 'im', name: '即时通讯', price: 40000 },
        { id: 'video', name: '视频播放', price: 15000 },
        { id: 'audio', name: '音频播放', price: 10000 },
        { id: 'offline', name: '离线功能', price: 25000 },
        { id: 'bluetooth', name: '蓝牙功能', price: 20000 },
        
        // 性能优化
        { id: 'optimize-basic', name: '基础优化', price: 0, category: '性能优化' },
        { id: 'optimize-advanced', name: '深度优化', price: 30000, category: '性能优化' },
        { id: 'optimize-native', name: '+ 原生模块', price: 45000, category: '性能优化' },
      ],
    },
    'miniprogram': {
      base: 45000,
      features: [
        // 平台选择
        { id: 'platform-wechat', name: '微信小程序', price: 0, category: '平台选择' },
        { id: 'platform-alipay', name: '+ 支付宝', price: 15000, category: '平台选择' },
        { id: 'platform-douyin', name: '+ 抖音', price: 15000, category: '平台选择' },
        { id: 'platform-all', name: '全平台（微信+支付宝+抖音）', price: 25000, category: '平台选择' },
        
        // 小程序类型
        { id: 'type-display', name: '展示型', price: 0, category: '小程序类型' },
        { id: 'type-service', name: '服务型', price: 10000, category: '小程序类型' },
        { id: 'type-ecommerce', name: '电商型', price: 20000, category: '小程序类型' },
        { id: 'type-community', name: '社区型', price: 30000, category: '小程序类型' },
        
        // 页面数量
        { id: 'pages-5', name: '5个页面以内', price: 0, category: '页面数量' },
        { id: 'pages-10', name: '5-10个页面', price: 8000, category: '页面数量' },
        { id: 'pages-20', name: '10-20个页面', price: 18000, category: '页面数量' },
        { id: 'pages-30', name: '20个页面以上', price: 30000, category: '页面数量' },
        
        // 基础功能
        { id: 'auth', name: '用户授权登录', price: 0 },
        { id: 'share', name: '分享功能', price: 3000 },
        { id: 'template-msg', name: '模板消息', price: 5000 },
        { id: 'customer-service', name: '客服功能', price: 6000 },
        { id: 'location', name: '定位功能', price: 5000 },
        
        // 电商功能
        { id: 'payment', name: '支付功能', price: 12000 },
        { id: 'order', name: '订单管理', price: 10000 },
        { id: 'cart', name: '购物车', price: 8000 },
        { id: 'coupon', name: '优惠券', price: 8000 },
        
        // 高级功能
        { id: 'live', name: '直播功能', price: 35000 },
        { id: 'community', name: '社区功能', price: 25000 },
        { id: 'group-buy', name: '拼团功能', price: 18000 },
        { id: 'distribution', name: '分销系统', price: 30000 },
        { id: 'appointment', name: '预约系统', price: 15000 },
        
        // 后台管理
        { id: 'admin-basic', name: '基础后台', price: 0, category: '后台管理' },
        { id: 'admin-advanced', name: '完整后台', price: 15000, category: '后台管理' },
        { id: 'admin-data', name: '+ 数据分析', price: 25000, category: '后台管理' },
      ],
    },
  };

  // 计算总价
  const calculateTotal = () => {
    const rules = pricingRules[calculatorCategory];
    if (!rules) return 0;
    
    let total = rules.base;
    selectedFeatures.forEach(featureId => {
      const feature = rules.features.find(f => f.id === featureId);
      if (feature) {
        total += feature.price;
      }
    });
    return total;
  };

  // 切换功能选择
  const toggleFeature = (featureId: string) => {
    // 检查是否是互斥的选项（同一类别只能选一个）
    const rules = pricingRules[calculatorCategory];
    const feature = rules.features.find(f => f.id === featureId);
    
    if (feature?.category) {
      // 移除同类别的其他选项
      const newFeatures = selectedFeatures.filter(id => {
        const f = rules.features.find(feat => feat.id === id);
        return f?.category !== feature.category;
      });
      
      // 添加新选项
      if (!selectedFeatures.includes(featureId)) {
        setSelectedFeatures([...newFeatures, featureId]);
      } else {
        setSelectedFeatures(newFeatures);
      }
    } else {
      // 普通切换
      if (selectedFeatures.includes(featureId)) {
        setSelectedFeatures(selectedFeatures.filter(id => id !== featureId));
      } else {
        setSelectedFeatures([...selectedFeatures, featureId]);
      }
    }
  };

  // 重置计算器
  const resetCalculator = () => {
    setSelectedFeatures([]);
  };

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-orange-600/10" />
        <div className="container mx-auto px-6 relative z-10">
          <ScrollReveal>
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
                {t('title')}
                <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-orange-500 bg-clip-text text-transparent">
                  {' '}{t('subtitle')}
                </span>
              </h1>
              
              <p className="text-xl text-gray-400 leading-relaxed mb-8">
                {t('description')}
                <br />
                {t('description2')}
              </p>

              {/* 币种切换器 */}
              <div className="flex justify-center mb-8">
                <div className="relative">
                  <button
                    onClick={() => setShowCurrencyMenu(!showCurrencyMenu)}
                    className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-all relative z-10"
                  >
                    <Globe className="w-5 h-5 text-amber-400" />
                    <span className="text-white font-medium">{t(`currency.${selectedCurrency.code}`)}</span>
                    <span className="text-gray-400">({selectedCurrency.symbol})</span>
                    <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${showCurrencyMenu ? 'rotate-180' : ''}`} />
                  </button>

                  {/* 下拉菜单 - 使用 fixed 定位 */}
                  <AnimatePresence>
                    {showCurrencyMenu && (
                      <>
                        {/* 全屏遮罩 */}
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="fixed inset-0 z-[99998]"
                          onClick={() => setShowCurrencyMenu(false)}
                        />
                        {/* 下拉菜单 */}
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="fixed left-1/2 -translate-x-1/2 mt-2 min-w-[240px] bg-gray-900/98 backdrop-blur-xl border border-white/20 rounded-2xl overflow-hidden shadow-2xl z-[99999]"
                          style={{
                            top: 'calc(50vh - 200px)'
                          }}
                        >
                          {currencies.map((currency) => (
                            <button
                              key={currency.code}
                              onClick={() => {
                                setSelectedCurrency(currency);
                                setShowCurrencyMenu(false);
                              }}
                              className={`w-full px-6 py-3 text-left hover:bg-white/10 transition-all flex items-center justify-between ${
                                selectedCurrency.code === currency.code ? 'bg-white/10' : ''
                              }`}
                            >
                              <span className="text-white font-medium">{t(`currency.${currency.code}`)}</span>
                              <span className="text-gray-400">{currency.symbol}</span>
                            </button>
                          ))}
                        </motion.div>
                      </>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* 定价模式切换 */}
              <PricingModeToggle 
                value={pricingMode} 
                onChange={setPricingMode} 
              />

              <div className="flex flex-wrap gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    const packagesSection = document.getElementById('packages');
                    if (packagesSection) {
                      packagesSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full font-medium hover:shadow-lg hover:shadow-amber-500/50 transition-all flex items-center gap-2"
                >
                  <Sparkles className="w-5 h-5" />
                  {t('viewPackages')}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowCalculator(true)}
                  className="px-8 py-4 bg-white/5 border border-white/10 text-white rounded-full font-medium hover:bg-white/10 transition-all flex items-center gap-2"
                >
                  <Calculator className="w-5 h-5" />
                  {t('priceCalculator')}
                </motion.button>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Advantages */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {advantages.map((item, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -5 }}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-all"
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mx-auto mb-4`}>
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-400">{item.desc}</p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Category Tabs */}
      <section id="packages" className="py-20 relative">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                {t('selectServiceType')}
              </h2>
              <p className="text-xl text-gray-400">
                {t('selectServiceTypeDesc')}
              </p>
            </div>
          </ScrollReveal>

          {/* Category Selector */}
          <div className="flex flex-wrap gap-3 justify-center mb-16">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-full font-medium transition-all flex items-center gap-2 ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg'
                    : 'bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10'
                }`}
              >
                <span className="text-xl">{category.icon}</span>
                {category.name}
              </motion.button>
            ))}
          </div>

          {/* 计费周期切换 - 仅订阅模式显示 */}
          {pricingMode === 'subscription' && (
            <BillingCycleToggle 
              value={billingCycle} 
              onChange={setBillingCycle}
              annualDiscount={17}
            />
          )}

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {pricingMode === 'subscription' ? (
              // 订阅制套餐
              getSubscriptionsByCategory(selectedCategory).length > 0 ? (
                getSubscriptionsByCategory(selectedCategory).map((pkg, index) => (
                  <SubscriptionPricingCard
                    key={pkg.id}
                    package={pkg}
                    billingCycle={billingCycle}
                    currency={selectedCurrency}
                    delay={index * 0.1}
                  />
                ))
              ) : (
                // 暂无订阅套餐提示
                <div className="col-span-full text-center py-20">
                  <div className="max-w-md mx-auto">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-500/20 to-orange-500/20 flex items-center justify-center mx-auto mb-6">
                      <Sparkles className="w-10 h-10 text-amber-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">{t('noSubscriptionTitle')}</h3>
                    <p className="text-gray-400 mb-6">
                      {t('comingSoonDesc')}
                    </p>
                    <button
                      onClick={() => setPricingMode('one-time')}
                      className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full font-medium hover:shadow-lg transition-all inline-flex items-center gap-2"
                    >
                      <ArrowRight className="w-5 h-5" />
                      {t('viewOneTimePackages')}
                    </button>
                  </div>
                </div>
              )
            ) : (
              // 买断制套餐（保留现有代码）
              filteredPackages.map((pkg, index) => (
              <ScrollReveal key={pkg.id} delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -10, scale: 1.02 }}
                  className={`relative bg-white/5 backdrop-blur-sm border rounded-3xl p-8 hover:bg-white/10 transition-all ${
                    pkg.popular ? 'border-orange-500 shadow-lg shadow-orange-500/20' : 'border-white/10'
                  }`}
                >
                  {/* Popular Badge */}
                  {pkg.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <div className="px-4 py-1 bg-gradient-to-r from-orange-500 to-red-500 text-white text-sm font-medium rounded-full">
                        {t('popular')}
                      </div>
                    </div>
                  )}

                  {/* Package Name */}
                  <h3 className="text-2xl font-bold text-white mb-2">{t(`packages.${pkg.id}.name`)}</h3>
                  <p className="text-gray-400 mb-6">{t(`packages.${pkg.id}.description`)}</p>

                  {/* Price */}
                  <div className="mb-6">
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold text-white">
                        {formatPriceRange(getPriceRange(pkg.price).minPrice, getPriceRange(pkg.price).maxPrice, selectedCurrency)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{t('priceDisclaimer')}</p>
                    {pkg.originalPrice && (
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-gray-500 line-through text-sm">
                          {t('originalPrice')} {formatPriceRange(getPriceRange(pkg.originalPrice).minPrice, getPriceRange(pkg.originalPrice).maxPrice, selectedCurrency)}
                        </span>
                        <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs font-medium rounded-full">
                          {t('save')} {calculateDiscount(pkg.price, pkg.originalPrice)}%
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Features */}
                  <ul className="space-y-3 mb-8">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-gray-300">
                        <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{t(`packages.${pkg.id}.features.${idx}`)}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <Link href={`/payment?package=${encodeURIComponent(t(`packages.${pkg.id}.name`))}&price=${Math.round(pkg.price * selectedCurrency.rate)}&currency=${selectedCurrency.code}&basePriceTWD=${pkg.price}`}>
                    <button
                      className={`w-full py-3 rounded-xl font-medium transition-all ${
                        pkg.popular
                          ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white hover:shadow-lg'
                          : 'bg-white/5 border border-white/10 text-white hover:bg-white/10'
                      }`}
                    >
                      {t('selectPackage')}
                    </button>
                  </Link>

                  {/* Best For */}
                  <div className="mt-6 pt-6 border-t border-white/10">
                    <p className="text-xs text-gray-500 mb-2">{t('bestFor')}</p>
                    <div className="flex flex-wrap gap-2">
                      {pkg.bestFor.map((type, idx) => (
                        <span key={idx} className="px-2 py-1 bg-white/5 text-gray-400 text-xs rounded-full">
                          {t(`packages.${pkg.id}.bestFor.${idx}`)}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))
            )}
          </div>
        </div>
      </section>

      {/* 成本对比 - 仅订阅模式显示 */}
      {pricingMode === 'subscription' && getSubscriptionsByCategory(selectedCategory).length > 0 && (
        <section className="py-20 relative">
          <div className="container mx-auto px-6">
            <ScrollReveal>
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  {t('whySubscription')}
                </h2>
                <p className="text-xl text-gray-400">
                  {t('subscriptionComparison')}
                </p>
              </div>
            </ScrollReveal>
            
            <ScrollReveal delay={0.2}>
              <CostComparisonCalculator currency={selectedCurrency} category={selectedCategory} />
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* Package Detail Modal */}
      <AnimatePresence>
        {selectedPackage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6"
            onClick={() => setSelectedPackage(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-gray-900 border border-white/10 rounded-3xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-3xl font-bold text-white mb-2">{selectedPackage.name}</h3>
                  <p className="text-gray-400">{selectedPackage.description}</p>
                </div>
                <button
                  onClick={() => setSelectedPackage(null)}
                  className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-all"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              {/* Price */}
              <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-2xl p-6 mb-8">
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="text-4xl font-bold bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                    {formatPriceRange(getPriceRange(selectedPackage.price).minPrice, getPriceRange(selectedPackage.price).maxPrice, selectedCurrency)}
                  </span>
                </div>
                <p className="text-sm text-gray-400 mb-2">估价范围，具体以需求为准</p>
                {selectedPackage.originalPrice && (
                  <p className="text-green-400 text-sm">
                    相比市场价节省约 {calculateDiscount(selectedPackage.price, selectedPackage.originalPrice)}%
                  </p>
                )}
              </div>

              {/* Includes */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <h4 className="text-lg font-bold text-white mb-4">包含内容</h4>
                  <div className="space-y-3">
                    {selectedPackage.includes.pages && (
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-blue-400" />
                        <span className="text-gray-300">页面数：{selectedPackage.includes.pages}页</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-purple-400" />
                      <span className="text-gray-300">设计：{selectedPackage.includes.design}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-400" />
                      <span className="text-gray-300">技术：{selectedPackage.includes.tech}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-orange-400" />
                      <span className="text-gray-300">支持：{selectedPackage.includes.support}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-pink-400" />
                      <span className="text-gray-300">交付：{selectedPackage.includes.delivery}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-bold text-white mb-4">功能清单</h4>
                  <ul className="space-y-2">
                    {selectedPackage.features.slice(0, 6).map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-gray-300 text-sm">
                        <Check className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Case Study */}
              {selectedPackage.caseStudy && (
                <div className="bg-white/5 rounded-2xl p-6 mb-8">
                  <h4 className="text-lg font-bold text-white mb-3">成功案例</h4>
                  <p className="text-orange-400 font-medium mb-2">{selectedPackage.caseStudy.title}</p>
                  <p className="text-gray-400 text-sm mb-4">{selectedPackage.caseStudy.description}</p>
                  <div className="flex flex-wrap gap-3">
                    {selectedPackage.caseStudy.results.map((result, idx) => (
                      <span key={idx} className="px-3 py-1 bg-green-500/20 text-green-400 text-xs rounded-full">
                        ✓ {result}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA */}
              <div className="flex gap-4">
                <button
                  onClick={() => {
                    setSelectedPackage(null);
                    const contactSection = document.getElementById('contact');
                    if (contactSection) {
                      contactSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full font-medium hover:shadow-lg transition-all"
                >
                  立即咨询
                </button>
                <button
                  onClick={() => setSelectedPackage(null)}
                  className="px-6 py-3 bg-white/5 border border-white/10 text-white rounded-full font-medium hover:bg-white/10 transition-all"
                >
                  关闭
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Price Calculator Modal */}
      <AnimatePresence>
        {showCalculator && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9999] flex items-center justify-center p-6"
            onClick={() => setShowCalculator(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-gray-900 border border-white/10 rounded-3xl p-8 max-w-5xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-3xl font-bold text-white mb-2">
                    {pricingMode === 'subscription' ? t('subscriptionCalculator') : t('priceCalculator')}
                  </h3>
                  <p className="text-gray-400">
                    {pricingMode === 'subscription' 
                      ? t('subscriptionCalculatorDesc') 
                      : t('calculatorDesc')}
                  </p>
                </div>
                <button
                  onClick={() => setShowCalculator(false)}
                  className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-all"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              {pricingMode === 'subscription' ? (
                // 订阅制计算器
                <>
                  <SubscriptionCalculator 
                    currency={selectedCurrency} 
                    category={selectedCategory}
                    onCategoryChange={setSelectedCategory}
                  />
                  
                  {/* 操作按钮 */}
                  <div className="flex gap-4 mt-6">
                    <button
                      onClick={() => {
                        setShowCalculator(false);
                        const contactSection = document.getElementById('contact');
                        if (contactSection) {
                          contactSection.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                      className="flex-1 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full font-medium hover:shadow-lg transition-all"
                    >
                      {pricingMode === 'subscription' ? t('subscribeNow') : t('contactQuote')}
                    </button>
                    <button
                      onClick={() => setShowCalculator(false)}
                      className="px-6 py-3 bg-white/5 border border-white/10 text-white rounded-full font-medium hover:bg-white/10 transition-all"
                    >
                      {t('close')}
                    </button>
                  </div>
                </>
              ) : (
                // 买断制计算器（原有代码）
                <>
                  {/* 类型选择 */}
                  <div className="mb-8">
                <h4 className="text-lg font-bold text-white mb-4">1. 选择项目类型</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => {
                        setCalculatorCategory(category.id);
                        setSelectedFeatures([]);
                      }}
                      className={`p-4 rounded-xl transition-all flex items-center gap-3 ${
                        calculatorCategory === category.id
                          ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg'
                          : 'bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10'
                      }`}
                    >
                      <span className="text-2xl">{category.icon}</span>
                      <span className="font-medium text-sm">{category.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* 功能选择 */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-bold text-white">2. 选择功能模块</h4>
                  <button
                    onClick={resetCalculator}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    重置选择
                  </button>
                </div>
                
                {(() => {
                  const rules = pricingRules[calculatorCategory];
                  if (!rules) return null;

                  // 按类别分组
                  const groupedFeatures: Record<string, typeof rules.features> = {};
                  rules.features.forEach(feature => {
                    const cat = feature.category || '其他';
                    if (!groupedFeatures[cat]) {
                      groupedFeatures[cat] = [];
                    }
                    groupedFeatures[cat].push(feature);
                  });

                  return (
                    <div className="space-y-6">
                      {Object.entries(groupedFeatures).map(([categoryName, features]) => (
                        <div key={categoryName}>
                          <h5 className="text-sm font-medium text-gray-400 mb-3">{categoryName}</h5>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {features.map((feature) => {
                              const isSelected = selectedFeatures.includes(feature.id);
                              return (
                                <button
                                  key={feature.id}
                                  onClick={() => toggleFeature(feature.id)}
                                  className={`p-4 rounded-xl transition-all text-left ${
                                    isSelected
                                      ? 'bg-blue-500/20 border-2 border-blue-500'
                                      : 'bg-white/5 border border-white/10 hover:bg-white/10'
                                  }`}
                                >
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                      <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                                        isSelected ? 'bg-blue-500 border-blue-500' : 'border-gray-600'
                                      }`}>
                                        {isSelected && <Check className="w-3 h-3 text-white" />}
                                      </div>
                                      <span className="text-white font-medium">{feature.name}</span>
                                    </div>
                                    <span className={`text-sm font-medium ${
                                      feature.price === 0 ? 'text-green-400' : 'text-amber-400'
                                    }`}>
                                      {feature.price === 0 ? '包含' : `+${formatPrice(feature.price, selectedCurrency)}`}
                                    </span>
                                  </div>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  );
                })()}
              </div>

              {/* 价格总计 */}
              <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-2xl p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="text-lg font-bold text-white mb-1">预估总价</h4>
                    <p className="text-sm text-gray-400">基于您选择的功能计算</p>
                  </div>
                  <div className="text-right">
                    <div className="text-4xl font-bold bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                      {formatPrice(calculateTotal(), selectedCurrency)}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      基础价 {formatPrice(pricingRules[calculatorCategory]?.base || 0, selectedCurrency)}
                    </p>
                  </div>
                </div>
                
                {selectedFeatures.length > 0 && (
                  <div className="pt-4 border-t border-white/10">
                    <p className="text-sm text-gray-400 mb-2">已选功能：</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedFeatures.map(featureId => {
                        const feature = pricingRules[calculatorCategory]?.features.find(f => f.id === featureId);
                        if (!feature) return null;
                        return (
                          <span key={featureId} className="px-3 py-1 bg-white/10 text-white text-xs rounded-full flex items-center gap-2">
                            {feature.name}
                            <button
                              onClick={() => toggleFeature(featureId)}
                              className="hover:text-red-400 transition-colors"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </span>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* 说明 */}
              <div className="bg-white/5 rounded-2xl p-6 mb-6">
                <h4 className="text-sm font-bold text-white mb-3">💡 温馨提示</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 mt-0.5">•</span>
                    <span>此价格为估算价格，实际价格可能根据具体需求有所调整</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 mt-0.5">•</span>
                    <span>同类别选项（如平台选择）只能选择一个</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 mt-0.5">•</span>
                    <span>价格包含基础维护（3个月），不含服务器和第三方服务费用</span>
                  </li>
                </ul>
              </div>

              {/* 操作按钮 */}
              <div className="flex gap-4">
                <button
                  onClick={() => {
                    setShowCalculator(false);
                    const contactSection = document.getElementById('contact');
                    if (contactSection) {
                      contactSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full font-medium hover:shadow-lg transition-all"
                >
                  获取精准报价
                </button>
                <button
                  onClick={() => setShowCalculator(false)}
                  className="px-6 py-3 bg-white/5 border border-white/10 text-white rounded-full font-medium hover:bg-white/10 transition-all"
                >
                  关闭
                </button>
              </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAQ */}
      <FAQSection />

      {/* CTA */}
      <CTASection />
    </>
  );
}
