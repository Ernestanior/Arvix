/**
 * Airwallex Payment Intent API Route
 * 
 * 该 API 用于创建 Airwallex Payment Intent，返回 client_secret 供前端使用
 * 
 * @route POST /api/airwallex/create-payment-intent
 * @body { amount: number, currency: string, orderId?: string, description?: string }
 * @response { clientSecret: string, paymentIntentId: string }
 */

import { NextRequest, NextResponse } from 'next/server';

// Airwallex API 配置
const AIRWALLEX_CLIENT_ID = process.env.AIRWALLEX_CLIENT_ID;
const AIRWALLEX_API_KEY = process.env.AIRWALLEX_API_KEY;
const AIRWALLEX_ENV = process.env.AIRWALLEX_ENV || 'staging';

// Airwallex API 基础 URL
const AIRWALLEX_BASE_URL = AIRWALLEX_ENV === 'production' 
  ? 'https://api.airwallex.com' 
  : 'https://api-demo.airwallex.com';

// Payment Intent 类型定义
interface PaymentIntentRequest {
  amount: number;
  currency: string;  // TWD, SGD, USD 等
  orderId?: string;
  description?: string;
  customerEmail?: string;
  customerName?: string;
  metadata?: Record<string, string>;
}

interface PaymentIntentResponse {
  id: string;
  client_secret: string;
  status: string;
  amount: number;
  currency: string;
}

/**
 * 获取 Airwallex Bearer Token
 * 使用 Client ID 和 API Key 进行认证
 */
async function getAirwallexToken(): Promise<string> {
  const response = await fetch(`${AIRWALLEX_BASE_URL}/api/v1/authentication/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-client-id': AIRWALLEX_CLIENT_ID!,
      'x-api-key': AIRWALLEX_API_KEY!,
    },
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Airwallex authentication failed: ${error}`);
  }

  const data = await response.json();
  return data.token;
}

/**
 * 创建 Payment Intent
 * 
 * @param token - Airwallex Bearer Token
 * @param params - 支付参数
 */
async function createPaymentIntent(
  token: string,
  params: PaymentIntentRequest
): Promise<PaymentIntentResponse> {
  // Airwallex API 接受的金额格式：
  // - 对于大多数币种（USD, EUR等）：使用小数表示，如 100.50
  // - 对于零小数位币种（TWD, JPY等）：使用整数表示，如 1000
  const amount = Math.round(params.amount * 100) / 100; // 保留两位小数

  console.log('Creating payment intent:', {
    originalAmount: params.amount,
    currency: params.currency.toUpperCase(),
    finalAmount: amount,
  });

  const response = await fetch(`${AIRWALLEX_BASE_URL}/api/v1/pa/payment_intents/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({
      // 必需参数
      amount: amount,
      currency: params.currency.toUpperCase(),
      
      // 商户订单信息
      merchant_order_id: params.orderId || `order_${Date.now()}`,
      request_id: `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      
      // 支付描述
      descriptor: params.description || 'Arvix Pte. Ltd. Service',
      
      // 客户信息（可选）
      ...(params.customerEmail && {
        customer: {
          email: params.customerEmail,
          ...(params.customerName && { first_name: params.customerName }),
        },
      }),
      
      // 元数据（可选）- 可用于存储额外信息
      metadata: {
        company: 'Arvix Pte. Ltd.',
        ...(params.metadata || {}),
      },
      
      // 支持的支付方式配置
      // 注意: 这些选项在 Drop-in UI 中会显示给用户
      payment_method_options: {
        // 信用卡/借记卡
        card: {
          allowed_networks: ['visa', 'mastercard', 'amex', 'jcb'],
          three_ds: {
            enabled: true,  // 启用 3D Secure 验证
          },
        },
        // Apple Pay
        applepay: {
          enabled: true,
        },
        // Google Pay
        googlepay: {
          enabled: true,
        },
      },
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to create payment intent: ${error}`);
  }

  return response.json();
}

/**
 * POST 请求处理
 */
export async function POST(request: NextRequest) {
  try {
    // 验证环境变量
    if (!AIRWALLEX_CLIENT_ID || !AIRWALLEX_API_KEY) {
      return NextResponse.json(
        { error: 'Airwallex API credentials are not configured' },
        { status: 500 }
      );
    }

    // 解析请求体
    const body: PaymentIntentRequest = await request.json();

    // 验证必需参数
    if (!body.amount || body.amount <= 0) {
      return NextResponse.json(
        { error: 'Invalid amount. Amount must be greater than 0' },
        { status: 400 }
      );
    }

    if (!body.currency) {
      return NextResponse.json(
        { error: 'Currency is required' },
        { status: 400 }
      );
    }

    // 获取 Airwallex Token
    const token = await getAirwallexToken();

    // 创建 Payment Intent
    const paymentIntent = await createPaymentIntent(token, body);

    console.log('Payment Intent created:', {
      id: paymentIntent.id,
      amount: paymentIntent.amount,
      currency: paymentIntent.currency,
    });

    // 返回 client_secret 给前端
    return NextResponse.json({
      success: true,
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
      currency: paymentIntent.currency,
      status: paymentIntent.status,
    });

  } catch (error) {
    console.error('Airwallex Payment Intent Error:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to create payment intent',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

/**
 * OPTIONS 请求处理 (CORS 预检)
 */
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}
