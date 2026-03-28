'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Airwallex from 'airwallex-payment-elements';
import { CreditCard, Smartphone, Wallet, Loader2 } from 'lucide-react';

interface AirwallexPaymentProps {
  amount: number;
  currency: string;
  description?: string;
  customerEmail?: string;
  customerName?: string;
  orderId?: string;
  onSuccess: (paymentIntentId: string) => void;
  onError: (error: Error) => void;
  metadata?: Record<string, string>;
}

interface PaymentIntentResponse {
  clientSecret: string;
  paymentIntentId: string;
  amount: number;
  currency: string;
}

export default function AirwallexPayment({
  amount,
  currency,
  description,
  customerEmail,
  customerName,
  orderId,
  onSuccess,
  onError,
  metadata,
}: AirwallexPaymentProps) {
  const [loading, setLoading] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [clientSecret, setClientSecret] = useState<string>('');
  const [paymentIntentId, setPaymentIntentId] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [showPaymentForm, setShowPaymentForm] = useState(false);

  const airwallexEnv: any = process.env.NEXT_PUBLIC_AIRWALLEX_ENV === 'prod' ? 'prod' : 'demo';

  useEffect(() => {
    const initAirwallex = () => {
      try {
        // @ts-ignore - Airwallex SDK 类型定义不完整
        Airwallex.loadAirwallex({
          env: airwallexEnv,
        });
        console.log('Airwallex SDK loaded');
        setIsReady(true);
      } catch (err) {
        console.error('Failed to load Airwallex SDK:', err);
        setError('Failed to load payment system. Please refresh.');
      }
    };

    if (typeof window !== 'undefined') {
      initAirwallex();
    }
  }, [airwallexEnv]);

  const createPaymentIntent = useCallback(async (): Promise<PaymentIntentResponse | null> => {
    try {
      const response = await fetch('/api/airwallex/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount,
          currency,
          description,
          customerEmail,
          customerName,
          orderId,
          metadata,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create payment intent');
      }

      return await response.json();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
      onError(err as Error);
      return null;
    }
  }, [amount, currency, description, customerEmail, customerName, orderId, metadata, onError]);

  const handlePaymentClick = async () => {
    setLoading(true);
    setError('');

    try {
      const paymentIntent = await createPaymentIntent();
      
      if (paymentIntent && paymentIntent.clientSecret) {
        setClientSecret(paymentIntent.clientSecret);
        setPaymentIntentId(paymentIntent.paymentIntentId);
        setShowPaymentForm(true);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 mb-4">
        <div className="flex items-center justify-between mb-4">
          <span className="text-gray-400">Amount</span>
          <span className="text-2xl font-bold text-white">
            {currency} {amount.toFixed(2)}
          </span>
        </div>
        
        {description && (
          <div className="text-sm text-gray-500 mb-4">{description}</div>
        )}

        <div className="flex items-center gap-3 text-gray-500 text-sm mb-4">
          <span className="flex items-center gap-1">
            <CreditCard className="w-4 h-4" />
            Cards
          </span>
          <span className="flex items-center gap-1">
            <Smartphone className="w-4 h-4" />
            Apple Pay
          </span>
          <span className="flex items-center gap-1">
            <Wallet className="w-4 h-4" />
            Google Pay
          </span>
        </div>

        {currency === 'TWD' && (
          <div className="text-xs text-gray-600 bg-gray-800/50 rounded-lg p-2">
            <span className="font-medium">Taiwan Local:</span> E.SUN Bank, 7-Eleven
          </div>
        )}
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 mb-4">
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}

      {!showPaymentForm ? (
        <button
          onClick={handlePaymentClick}
          disabled={loading || !isReady}
          className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <CreditCard className="w-5 h-5" />
              Pay {currency} {amount.toFixed(2)}
            </>
          )}
        </button>
      ) : (
        <AirwallexDropInForm
          clientSecret={clientSecret}
          paymentIntentId={paymentIntentId}
          env={airwallexEnv}
          currency={currency}
          onSuccess={onSuccess}
          onError={(err) => {
            setError(err.message);
            onError(err);
          }}
          onCancel={() => setShowPaymentForm(false)}
        />
      )}
    </div>
  );
}

interface AirwallexDropInFormProps {
  clientSecret: string;
  paymentIntentId: string;
  env: 'demo' | 'prod';
  currency: string;
  onSuccess: (paymentIntentId: string) => void;
  onError: (error: Error) => void;
  onCancel: () => void;
}

function AirwallexDropInForm({
  clientSecret,
  paymentIntentId,
  env,
  currency,
  onSuccess,
  onError,
  onCancel,
}: AirwallexDropInFormProps) {
  useEffect(() => {
    let dropInElement: any = null;

    const initDropIn = () => {
      try {
        dropInElement = Airwallex.createElement('dropIn', {
          intent: {
            id: paymentIntentId,
            client_secret: clientSecret,
          },
          currency: currency.toUpperCase(),
        });

        dropInElement.mount('airwallex-dropin-container');

        // 监听成功事件
        window.addEventListener('onSuccess', ((event: CustomEvent) => {
          console.log('Payment success:', event.detail);
          onSuccess(paymentIntentId);
        }) as EventListener);

        // 监听错误事件
        window.addEventListener('onError', ((event: CustomEvent) => {
          console.error('Payment error:', event.detail);
          onError(new Error(event.detail?.message || 'Payment failed'));
        }) as EventListener);

      } catch (err) {
        console.error('Failed to mount Drop-in:', err);
        onError(err instanceof Error ? err : new Error('Failed to initialize payment form'));
      }
    };

    const timer = setTimeout(initDropIn, 300);

    return () => {
      clearTimeout(timer);
      if (dropInElement) {
        try {
          dropInElement.unmount();
        } catch (err) {
          console.error('Error unmounting:', err);
        }
      }
      // 清理事件监听
      window.removeEventListener('onSuccess', (() => {}) as EventListener);
      window.removeEventListener('onError', (() => {}) as EventListener);
    };
  }, [clientSecret, paymentIntentId, currency, onSuccess, onError]);

  return (
    <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6">
      <div id="airwallex-dropin-container" className="min-h-[400px]" />
      
      <button
        onClick={onCancel}
        className="mt-4 w-full py-3 px-4 bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white rounded-xl transition-colors"
      >
        Cancel
      </button>
      
      <p className="mt-4 text-center text-xs text-gray-600">
        Secured by Airwallex. Your payment information is encrypted.
      </p>
    </div>
  );
}
