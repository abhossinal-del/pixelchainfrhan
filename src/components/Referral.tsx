import { useState } from 'react';
import { Users, Copy, Check, Gift, Share2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export function Referral() {
  const { profile } = useAuth();
  const [copied, setCopied] = useState(false);

  const referralCode = profile?.id.slice(0, 8).toUpperCase() || 'PIXEL-REF';
  const referralLink = `${window.location.origin}?ref=${referralCode}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-900 via-pink-900 to-purple-900 rounded-2xl p-8 border border-purple-700 shadow-2xl">
        <div className="flex items-center gap-4 mb-4">
          <div className="bg-white p-3 rounded-xl">
            <Users className="text-purple-900" size={32} />
          </div>
          <div>
            <h2 className="text-4xl font-bold text-white">نظام الإحالة</h2>
            <p className="text-purple-200 text-lg">شارك الرابط واربح 5% من كل عملية شراء يقوم بها أصدقاؤك</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 text-center">
          <div className="bg-purple-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
            <Gift className="text-white" size={24} />
          </div>
          <h3 className="text-white font-bold text-xl mb-2">أرباح الإحالة</h3>
          <p className="text-3xl font-bold text-emerald-400">0.0000 ETH</p>
          <p className="text-slate-400 text-sm mt-2">إجمالي ما ربحته من أصدقائك</p>
        </div>

        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 text-center">
          <div className="bg-pink-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="text-white" size={24} />
          </div>
          <h3 className="text-white font-bold text-xl mb-2">الأصدقاء المسجلون</h3>
          <p className="text-3xl font-bold text-white">0</p>
          <p className="text-slate-400 text-sm mt-2">عدد الأشخاص الذين سجلوا عبر رابطك</p>
        </div>

        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 text-center">
          <div className="bg-blue-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
            <Share2 className="text-white" size={24} />
          </div>
          <h3 className="text-white font-bold text-xl mb-2">معدل التحويل</h3>
          <p className="text-3xl font-bold text-white">0%</p>
          <p className="text-slate-400 text-sm mt-2">نسبة نجاح الإحالات الخاصة بك</p>
        </div>
      </div>

      <div className="bg-slate-900 rounded-2xl p-8 border border-slate-700 shadow-xl">
        <h3 className="text-2xl font-bold text-white mb-6">رابط الإحالة الخاص بك</h3>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 bg-slate-800 border border-slate-600 rounded-xl p-4 flex items-center justify-between">
            <code className="text-purple-400 font-mono break-all">{referralLink}</code>
            <button
              onClick={copyToClipboard}
              className="ml-4 p-2 hover:bg-slate-700 rounded-lg transition-colors text-slate-300 hover:text-white"
            >
              {copied ? <Check className="text-emerald-400" size={24} /> : <Copy size={24} />}
            </button>
          </div>
          <button
            onClick={copyToClipboard}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-xl font-bold hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg flex items-center justify-center gap-2"
          >
            {copied ? 'تم النسخ!' : 'نسخ الرابط'}
          </button>
        </div>
        <p className="text-slate-500 mt-4 text-sm">
          * يتم احتساب الأرباح تلقائياً وإضافتها إلى محفظتك عند قيام أي شخص يسجل عبر رابطك بشراء بكسل.
        </p>
      </div>
    </div>
  );
}
