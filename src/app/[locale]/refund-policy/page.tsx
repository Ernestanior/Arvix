'use client';

import { motion } from 'framer-motion';
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
            运输与退款政策
          </h1>
          <p className="text-xl text-gray-400">
            Shipping & Refund Policy
          </p>
        </motion.div>

        {/* 公司信息 */}
        <ScrollReveal>
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-bold text-white">公司信息 / Company Information</h2>
            </div>
            <div className="space-y-2 text-gray-300 pl-13">
              <p><span className="text-gray-500">法人实体 / Legal Entity:</span> <span className="font-medium text-white">ARVIX PTE. LTD.</span></p>
              <p><span className="text-gray-500">注册地址 / Registered Address:</span> 1 Jln Membina, Singapore 169479</p>
              <p><span className="text-gray-500">联系电话 / Phone:</span> +65 9156 1413</p>
              <p><span className="text-gray-500">电子邮箱 / Email:</span> ern@xyvnai.com</p>
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
                <h2 className="text-2xl font-bold text-white">运输政策</h2>
                <p className="text-gray-400 text-sm">Shipping Policy</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-white mb-2">数字服务说明 / Digital Services Only</h3>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      ARVIX PTE. LTD. 提供的所有服务均为数字服务，包括 SaaS 订阅服务、网站开发、移动应用开发、技术咨询等。我们不涉及任何实体商品的运输或交付。
                    </p>
                    <p className="text-gray-400 text-sm mt-2">
                      All services provided by ARVIX PTE. LTD. are digital services, including SaaS subscriptions, web development, mobile app development, and technical consulting. We do not ship or deliver any physical goods.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-white flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  服务交付方式 / Service Delivery
                </h3>
                <ul className="space-y-3 text-gray-300 text-sm pl-7">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 mt-0.5">•</span>
                    <span>
                      <strong className="text-white">SaaS 订阅服务:</strong> 付款成功后立即激活，通过在线平台直接访问使用。
                      <span className="text-gray-400 block mt-0.5">Activated immediately after successful payment, accessible via online platform.</span>
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 mt-0.5">•</span>
                    <span>
                      <strong className="text-white">网站/应用开发:</strong> 通过代码仓库（GitHub/GitLab）或安全的文件传输方式交付源代码。
                      <span className="text-gray-400 block mt-0.5">Delivered via code repositories (GitHub/GitLab) or secure file transfer.</span>
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 mt-0.5">•</span>
                    <span>
                      <strong className="text-white">技术咨询服务:</strong> 通过视频会议、电话或电子邮件提供咨询服务。
                      <span className="text-gray-400 block mt-0.5">Provided via video conferencing, phone calls, or email.</span>
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-white mb-1">交付时间 / Delivery Timeline</h3>
                    <p className="text-gray-300 text-sm">
                      具体交付时间取决于服务类型和项目范围，将在服务合同中明确约定。
                      <span className="text-gray-400 block mt-1">Delivery timeline depends on service type and project scope, specified in the service agreement.</span>
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
                <h2 className="text-2xl font-bold text-white">退款政策</h2>
                <p className="text-gray-400 text-sm">Refund Policy</p>
              </div>
            </div>

            <div className="space-y-6">
              {/* SaaS 订阅退款 */}
              <div className="border-l-4 border-amber-500 pl-4">
                <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-amber-400" />
                  SaaS 订阅服务退款 / SaaS Subscription Refunds
                </h3>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-0.5">✓</span>
                    <span>
                      <strong className="text-white">7天无理由退款:</strong> 首次订阅后7天内，如不满意可申请全额退款。
                      <span className="text-gray-400 block mt-0.5">7-day money-back guarantee for first-time subscriptions.</span>
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-0.5">✓</span>
                    <span>
                      <strong className="text-white">月度订阅:</strong> 可随时取消，次月不再扣费。已支付当月费用不退还。
                      <span className="text-gray-400 block mt-0.5">Monthly subscriptions can be cancelled anytime. No refund for current month.</span>
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-0.5">✓</span>
                    <span>
                      <strong className="text-white">年度订阅:</strong> 购买后30天内申请退款，可退还剩余11个月的费用（按比例计算）。
                      <span className="text-gray-400 block mt-0.5">Annual subscriptions: refund remaining months within 30 days (pro-rated).</span>
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 mt-0.5">!</span>
                    <span>
                      <strong className="text-white">特殊情况:</strong> 如服务出现严重故障或不可用时间超过约定 SLA，可申请额外补偿。
                      <span className="text-gray-400 block mt-0.5">Additional compensation available for severe service outages exceeding SLA.</span>
                    </span>
                  </li>
                </ul>
              </div>

              {/* 定制开发退款 */}
              <div className="border-l-4 border-orange-500 pl-4">
                <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-orange-400" />
                  定制开发服务退款 / Custom Development Refunds
                </h3>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-0.5">✓</span>
                    <span>
                      <strong className="text-white">项目启动前:</strong> 签署合同后7天内，项目尚未正式启动，可申请全额退还定金。
                      <span className="text-gray-400 block mt-0.5">Full deposit refund if project hasn't started within 7 days of signing.</span>
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 mt-0.5">~</span>
                    <span>
                      <strong className="text-white">项目进行中途:</strong> 根据已完成工作量按比例退款，需扣除已发生的人员工时和第三方费用。
                      <span className="text-gray-400 block mt-0.5">Pro-rated refund based on completed work, minus incurred costs.</span>
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 mt-0.5">✗</span>
                    <span>
                      <strong className="text-white">项目完成后:</strong> 开发工作已完成并交付源代码后，原则上不予退款。
                      <span className="text-gray-400 block mt-0.5">No refund after project completion and source code delivery.</span>
                    </span>
                  </li>
                </ul>
              </div>

              {/* 技术咨询退款 */}
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-blue-400" />
                  技术咨询服务退款 / Consulting Refunds
                </h3>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-0.5">✓</span>
                    <span>
                      <strong className="text-white">未使用咨询:</strong> 预付的咨询费用如未使用，可在购买后30天内申请全额退款。
                      <span className="text-gray-400 block mt-0.5">Full refund for unused consulting credits within 30 days.</span>
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 mt-0.5">!</span>
                    <span>
                      <strong className="text-white">已使用部分:</strong> 已使用的咨询时长按标准费率扣除，剩余部分可退还。
                      <span className="text-gray-400 block mt-0.5">Used hours deducted at standard rate, remainder refunded.</span>
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 mt-0.5">✗</span>
                    <span>
                      <strong className="text-white">已完成咨询:</strong> 已完成的咨询 session 不予退款，但可在7天内要求补充解答。
                      <span className="text-gray-400 block mt-0.5">No refund for completed sessions, but follow-up available within 7 days.</span>
                    </span>
                  </li>
                </ul>
              </div>

              {/* 退款流程 */}
              <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4">
                <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  退款流程 / Refund Process
                </h3>
                <ol className="space-y-2 text-gray-300 text-sm list-decimal list-inside">
                  <li>
                    <strong className="text-white">提交申请:</strong> 发送邮件至 ern@xyvnai.com，说明退款原因和订单信息。
                    <span className="text-gray-400 block ml-5 mt-0.5">Email ern@xyvnai.com with order details and reason.</span>
                  </li>
                  <li>
                    <strong className="text-white">审核处理:</strong> 我们将在3-5个工作日内审核您的申请。
                    <span className="text-gray-400 block ml-5 mt-0.5">We will review your request within 3-5 business days.</span>
                  </li>
                  <li>
                    <strong className="text-white">退款到账:</strong> 审核通过后，退款将在7-14个工作日内退回原支付账户。
                    <span className="text-gray-400 block ml-5 mt-0.5">Refund processed to original payment method within 7-14 business days.</span>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* 联系信息 */}
        <ScrollReveal delay={0.3}>
          <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-2xl p-6 text-center">
            <h3 className="text-xl font-bold text-white mb-2">有任何疑问？/ Have Questions?</h3>
            <p className="text-gray-400 mb-4">
              如果您对运输或退款政策有任何疑问，请随时联系我们。<br />
              If you have any questions about our shipping or refund policies, please contact us.
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
          <p>最后更新时间 / Last Updated: March 3, 2026</p>
          <p className="mt-1">ARVIX PTE. LTD. 保留最终解释权 / ARVIX PTE. LTD. reserves the right of final interpretation</p>
        </div>
      </div>
    </div>
  );
}
