import { useState } from 'react';
import { CreditCard, DollarSign, ShieldCheck, Zap, ArrowRight, Wallet as WalletIcon } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export function Payment() {
  const { profile } = useAuth();
  const [amount, setAmount] = useState('0.01');
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'crypto' | 'card'>('crypto');

  const handlePayment = async () => {
    setLoading(true);
    // محاكاة عملية الدفع
    setTimeout(() => {
      setLoading(false);
      alert('تم إرسال طلب الشحن بنجاح! سيتم تحديث رصيدك فور تأكيد العملية.');
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-emerald-900 rounded-2xl p-8 border border-emerald-700 shadow-2xl">
        <div className="flex items-center gap-4 mb-4">
          <div className="bg-white p-3 rounded-xl">
            <CreditCard className="text-emerald-900" size={32} />
          </div>
          <div>
            <h2 className="text-4xl font-bold text-white">شحن الرصيد</h2>
            <p className="text-emerald-200 text-lg">اشحن محفظتك الرقمية للبدء في شراء وتداول البكسلز</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-900 rounded-2xl p-8 border border-slate-700 shadow-xl">
            <h3 className="text-2xl font-bold text-white mb-6">اختر وسيلة الدفع</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <button
                onClick={() => setPaymentMethod('crypto')}
                className={`p-6 rounded-xl border-2 transition-all flex flex-col items-center gap-3 ${
                  paymentMethod === 'crypto'
                    ? 'border-emerald-500 bg-emerald-900 bg-opacity-20'
                    : 'border-slate-700 bg-slate-800 hover:border-slate-600'
                }`}
              >
                <Zap className={paymentMethod === 'crypto' ? 'text-emerald-400' : 'text-slate-400'} size={32} />
                <span className={`font-bold ${paymentMethod === 'crypto' ? 'text-white' : 'text-slate-400'}`}>عملات رقمية (ETH/USDT)</span>
              </button>
              <button
                onClick={() => setPaymentMethod('card')}
                className={`p-6 rounded-xl border-2 transition-all flex flex-col items-center gap-3 ${
                  paymentMethod === 'card'
                    ? 'border-emerald-500 bg-emerald-900 bg-opacity-20'
                    : 'border-slate-700 bg-slate-800 hover:border-slate-600'
                }`}
              >
                <CreditCard className={paymentMethod === 'card' ? 'text-emerald-400' : 'text-slate-400'} size={32} />
                <span className={`font-bold ${paymentMethod === 'card' ? 'text-white' : 'text-slate-400'}`}>بطاقة بنكية (Visa/MasterCard)</span>
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">المبلغ المراد شحنه (ETH)</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <DollarSign className="text-slate-500" size={20} />
                  </div>
                  <input
                    type="number"
                    step="0.001"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-slate-800 border border-slate-600 rounded-xl text-white text-xl font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-slate-400">المبلغ بالشحن</span>
                  <span className="text-white font-bold">{amount} ETH</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-slate-400">رسوم الشبكة</span>
                  <span className="text-white font-bold">0.0005 ETH</span>
                </div>
                <div className="border-t border-slate-700 my-4 pt-4 flex justify-between items-center">
                  <span className="text-xl font-bold text-white">الإجمالي</span>
                  <span className="text-2xl font-bold text-emerald-400">{(parseFloat(amount || '0') + 0.0005).toFixed(4)} ETH</span>
                </div>
              </div>

              <button
                onClick={handlePayment}
                disabled={loading || !amount}
                className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-5 rounded-xl font-bold text-xl hover:from-emerald-700 hover:to-teal-700 transition-all shadow-lg flex items-center justify-center gap-3 disabled:opacity-50"
              >
                {loading ? 'جاري المعالجة...' : (
                  <>
                    إتمام عملية الشحن
                    <ArrowRight size={24} />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-900 rounded-2xl p-8 border border-slate-700 shadow-xl">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <ShieldCheck className="text-emerald-400" size={24} />
              أمان العمليات
            </h3>
            <ul className="space-y-4 text-slate-400 text-sm">
              <li className="flex gap-3">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-1.5 shrink-0"></div>
                تتم جميع العمليات عبر بروتوكولات تشفير آمنة.
              </li>
              <li className="flex gap-3">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-1.5 shrink-0"></div>
                يتم تأكيد عمليات الشحن الرقمية تلقائياً بعد 3 تأكيدات على الشبكة.
              </li>
              <li className="flex gap-3">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-1.5 shrink-0"></div>
                دعم فني متاح على مدار الساعة لحل أي مشاكل في الدفع.
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-blue-900 to-slate-900 rounded-2xl p-8 border border-blue-700 shadow-xl">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <WalletIcon className="text-blue-400" size={24} />
              رصيدك الحالي
            </h3>
            <div className="text-3xl font-bold text-white mb-2">0.0000 ETH</div>
            <p className="text-blue-300 text-sm">مرتبط بالمحفظة: {profile?.username}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
