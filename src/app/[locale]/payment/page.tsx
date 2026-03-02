'use client';

import React, { useState } from 'react';
import AirwallexPayment from '@/components/payment/AirwallexPayment';
import { CreditCard, CheckCircle, AlertCircle, Shield, Lock, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * 结算页面
 * 
 * 展示如何在实际业务中使用 Airwallex 支付组件
 */
export default function CheckoutPage() {
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [paymentIntentId, setPaymentIntentId] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  // 示例订单数据
  const order = {
    id: 'order_12345',
    items: [
      { name: 'SaaS 订阅服务 - 月度', price: 100, icon: '📦' },
      { name: '定制开发服务', price: 500, icon: '💻' },
    ],
    total: 600,
    currency: 'TWD',
    customerEmail: 'customer@example.com',
    customerName: 'John Doe',
  };

  /**
   * 支付成功回调
   */
  const handlePaymentSuccess = async (paymentIntentId: string) => {
    setPaymentStatus('success');
    setPaymentIntentId(paymentIntentId);
    
    // 可以在这里调用后端 API 更新订单状态
    console.log('Payment successful:', paymentIntentId);
  };

  /**
   * 支付失败回调
   */
  const handlePaymentError = (error: Error) => {
    setPaymentStatus('error');
    setErrorMessage(error.message);
    
    console.error('Payment failed:', error);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0f] via-[#0f0f15] to-[#0a0a0f] relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-500/5 rounded-full blur-[150px]" />
      </div>

      {/* 网格背景 */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      />

      <div className="max-w-5xl mx-auto px-6 py-16 relative z-10">
        {/* 页面标题 */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-6">
            <Shield className="w-4 h-4 text-amber-400" />
            <span className="text-sm text-gray-400">安全加密支付</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            结算
          </h1>
          <p className="text-xl text-gray-400">由 Airwallex 提供安全支付支持</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 左侧：订单摘要 */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 h-fit relative overflow-hidden">
              {/* 渐变装饰 */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-bold text-white">订单摘要</h2>
                  <span className="text-sm text-gray-500">订单号: {order.id}</span>
                </div>
                
                {/* 订单项目 */}
                <div className="space-y-4 mb-8">
                  {order.items.map((item, index) => (
                    <motion.div 
                      key={index} 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/5 hover:border-white/10 transition-colors"
                    >
                      <span className="text-2xl">{item.icon}</span>
                      <div className="flex-1">
                        <span className="text-gray-200 font-medium block">{item.name}</span>
                      </div>
                      <span className="text-white font-bold">
                        {order.currency} {item.price.toFixed(2)}
                      </span>
                    </motion.div>
                  ))}
                </div>

                {/* 分隔线 */}
                <div className="border-t border-white/10 my-6" />

                {/* 总计 */}
                <div className="flex justify-between items-center p-4 bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-2xl border border-amber-500/20">
                  <span className="text-lg font-semibold text-white">总计金额</span>
                  <div className="text-right">
                    <span className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                      {order.currency} {order.total.toFixed(2)}
                    </span>
                    <span className="text-sm text-gray-500 block mt-1">含税价</span>
                  </div>
                </div>

                {/* 支持的支付方式 */}
                <div className="mt-8 pt-6 border-t border-white/10">
                  <p className="text-sm text-gray-400 mb-4 flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    支持以下支付方式
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {['Visa', 'Mastercard', 'Apple Pay', 'Google Pay'].map((method) => (
                      <span key={method} className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs text-gray-300 hover:bg-white/10 transition-colors">
                        {method}
                      </span>
                    ))}
                    {order.currency === 'TWD' && (
                      <>
                        <span className="px-3 py-1.5 bg-green-500/10 border border-green-500/20 rounded-full text-xs text-green-400">
                          玉山银行
                        </span>
                        <span className="px-3 py-1.5 bg-green-500/10 border border-green-500/20 rounded-full text-xs text-green-400">
                          7-Eleven
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* 右侧：支付区域 */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <AnimatePresence mode="wait">
              {paymentStatus === 'idle' && (
                <motion.div
                  key="idle"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 relative overflow-hidden"
                >
                  {/* 装饰 */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500" />
                  
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center">
                        <CreditCard className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">支付信息</h3>
                        <p className="text-sm text-gray-400">安全加密，快速支付</p>
                      </div>
                    </div>
                    
                    <AirwallexPayment
                      amount={order.total}
                      currency={order.currency}
                      description={`Arvix Pte. Ltd. - ${order.items.map(i => i.name).join(', ')}`}
                      customerEmail={order.customerEmail}
                      customerName={order.customerName}
                      orderId={order.id}
                      onSuccess={handlePaymentSuccess}
                      onError={handlePaymentError}
                      metadata={{
                        company: 'Arvix Pte. Ltd.',
                        orderType: 'saas_subscription',
                      }}
                    />
                  </div>
                </motion.div>
              )}

              {paymentStatus === 'success' && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.5, type: "spring" }}
                  className="bg-green-500/10 border border-green-500/30 rounded-3xl p-10 text-center relative overflow-hidden"
                >
                  {/* 成功动画背景 */}
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-500/5" />
                  <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                  
                  <div className="relative z-10">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                      className="w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-500/30"
                    >
                      <CheckCircle className="w-12 h-12 text-white" />
                    </motion.div>
                    
                    <h2 className="text-3xl font-bold text-white mb-3">
                      支付成功！
                    </h2>
                    <p className="text-gray-400 mb-6">
                      感谢您的购买，我们将尽快为您处理订单。
                    </p>
                    
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-4 mb-6">
                      <p className="text-sm text-gray-500 mb-1">支付单号</p>
                      <p className="text-lg font-mono text-green-400">{paymentIntentId}</p>
                    </div>
                    
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => window.location.reload()}
                      className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white py-4 px-6 rounded-xl transition-all font-semibold"
                    >
                      完成
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {paymentStatus === 'error' && (
                <motion.div
                  key="error"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.5, type: "spring" }}
                  className="bg-red-500/10 border border-red-500/30 rounded-3xl p-10 text-center relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                  
                  <div className="relative z-10">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                      className="w-24 h-24 bg-gradient-to-br from-red-500 to-rose-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-red-500/30"
                    >
                      <AlertCircle className="w-12 h-12 text-white" />
                    </motion.div>
                    
                    <h2 className="text-3xl font-bold text-white mb-3">
                      支付失败
                    </h2>
                    <p className="text-gray-400 mb-6">
                      {errorMessage || '支付过程中出现问题，请重试。'}
                    </p>
                    
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setPaymentStatus('idle')}
                      className="w-full bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 text-white py-4 px-6 rounded-xl transition-all font-semibold"
                    >
                      重试
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* 安全提示 */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="flex items-center justify-center gap-2 text-gray-500 text-sm mb-3">
            <div className="flex items-center gap-1.5">
              <Lock className="w-4 h-4" />
              <span>PCI DSS 合规认证</span>
            </div>
            <span className="text-gray-700">•</span>
            <div className="flex items-center gap-1.5">
              <Shield className="w-4 h-4" />
              <span>端到端加密</span>
            </div>
            <span className="text-gray-700">•</span>
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" />
              <span>由 Airwallex 提供支持</span>
            </div>
          </div>
          <p className="text-gray-600 text-xs">
            Arvix Pte. Ltd. | Singapore
          </p>
        </motion.div>
      </div>
    </div>
  );
}
