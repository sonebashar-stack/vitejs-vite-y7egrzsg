// @ts-nocheck
import React, { useState, useEffect, useMemo } from 'react';

// --- أيقونات سايبربانك الهندسية ---
const IconTreasury = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>;
const IconIncome = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>;
const IconExpense = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/></svg>;
const IconReports = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>;
const IconVolt = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m13 2-2 10h9L9 22l2-10H2Z"/></svg>;

// الرابط الجديد لجوجل شيت الذي أرفقته
const API_URL = "https://script.google.com/macros/s/AKfycbzgL0DkpMDfAUEyYi1eYK-TQuU8Y2DNakx2sw85kxHICgpMyljppwNgbc3hrRC4MQcc6Q/exec";

if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.innerHTML = `
    #root, body, html { width: 100% !important; max-width: none !important; margin: 0 !important; padding: 0 !important; background-color: #02040a; color: #f0f4f8; font-family: system-ui, -apple-system, sans-serif; direction: rtl; }
    .max-w-4xl, .max-w-6xl, .container { max-width: none !important; width: 100% !important; }
    ::-webkit-scrollbar { width: 6px; height: 6px; }
    ::-webkit-scrollbar-track { background: #02040a; }
    ::-webkit-scrollbar-thumb { background: #1f2937; border-radius: 10px; }
    
    @keyframes pulse-ring {
      0% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7); border-color: rgba(16, 185, 129, 1); }
      70% { box-shadow: 0 0 0 10px rgba(16, 185, 129, 0); border-color: rgba(16, 185, 129, 0.3); }
      100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); border-color: rgba(16, 185, 129, 1); }
    }
  `;
  document.head.appendChild(style);
}

export default function App() {
  const [activeTab, setActiveTab] = useState('treasury'); // الأقسام: treasury, incomes, expenses, reports
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // محرك جلب وفرز البيانات (يفصل المقبوضات عن المصروفات)
  useEffect(() => {
    let isMounted = true;
    async function fetchQuantumData() {
      try {
        const res = await fetch(API_URL);
        const data = await res.json();
        
        if (Array.isArray(data) && isMounted) {
          const getCleanValue = (row, possibleKeys) => {
             const rowKeys = Object.keys(row);
             for (let pKey of possibleKeys) {
                const foundKey = rowKeys.find(k => k.trim() === pKey);
                if (foundKey && row[foundKey] !== undefined && row[foundKey] !== "") return row[foundKey];
             }
             return null;
          };

          const tempIncomes = [];
          const tempExpenses = [];

          data.forEach((row, idx) => {
             const customer = getCleanValue(row, ["اسم الزبون", "الزبون"]);
             const expenseDesc = getCleanValue(row, ["بيان المصروف", "المصروف", "البيان"]);
             const dateVal = getCleanValue(row, ["التاريخ", "تاريخ الإغلاق", "تاريخ الترحيل"]) || new Date().toLocaleDateString('en-GB');

             // إذا كان هناك عميل أو لوحة، فهذه مقبوضات (سيارات)
             if (customer || getCleanValue(row, ["رقم اللوحة", "اللوحة"])) {
                 const rawAmount = String(getCleanValue(row, ["المبلغ", "المبلغ المدفوع", "القيمة"]) || "0").replace(/[^\d.]/g, '');
                 tempIncomes.push({
                     id: getCleanValue(row, ["رقم الكرت", "ID"]) || idx + 1,
                     date: dateVal,
                     customer: customer || "غير محدد",
                     plate: getCleanValue(row, ["رقم اللوحة", "اللوحة"]) || "-",
                     carModel: getCleanValue(row, ["نوع وموديل السيارة", "الموديل", "نوع السيارة"]) || "-",
                     task: getCleanValue(row, ["العمل المطلوب", "تفاصيل الشغل", "العطل"]) || "-",
                     employee: getCleanValue(row, ["الموظف المسؤول", "المستلم", "الفني"]) || "-",
                     paymentMethod: getCleanValue(row, ["طريقة الدفع", "الدفع"]) || "كاش",
                     amount: parseFloat(rawCost) || parseFloat(rawAmount) || 0,
                 });
             } 
             // إذا كان هناك بيان مصروف، فهذه مصروفات
             else if (expenseDesc) {
                 const rawAmount = String(getCleanValue(row, ["قيمة المصروف", "المبلغ", "القيمة"]) || "0").replace(/[^\d.]/g, '');
                 tempExpenses.push({
                     id: idx + 1,
                     date: dateVal,
                     description: expenseDesc,
                     amount: parseFloat(rawAmount) || 0,
                 });
             }
          });

          setIncomes(tempIncomes.reverse());
          setExpenses(tempExpenses.reverse());
          setIsLoading(false);
        }
      } catch (err) {
        console.error("الربط السحابي معطل:", err);
        setIsLoading(false);
      }
    }
    fetchQuantumData();
    const loop = setInterval(fetchQuantumData, 10000);
    return () => { isMounted = false; clearInterval(loop); };
  }, []);

  // الحسابات المالية للخزينة
  const accounting = useMemo(() => {
    let totalCash = 0, totalCliq = 0, totalExpenses = 0;

    incomes.forEach(inc => {
      if (String(inc.paymentMethod).includes('كليك') || String(inc.paymentMethod).toUpperCase().includes('CLIQ')) {
        totalCliq += inc.amount;
      } else {
        totalCash += inc.amount;
      }
    });

    expenses.forEach(exp => {
      totalExpenses += exp.amount;
    });

    const netProfit = (totalCash + totalCliq) - totalExpenses;
    return { totalCash, totalCliq, totalExpenses, netProfit };
  }, [incomes, expenses]);

  // تجميع البيانات حسب الأيام لصفحة (تفاصيل الأيام)
  const groupedReports = useMemo(() => {
     const groups = {};
     incomes.forEach(inc => {
         const d = inc.date;
         if (!groups[d]) groups[d] = { incomes: [], expenses: [] };
         groups[d].incomes.push(inc);
     });
     expenses.forEach(exp => {
         const d = exp.date;
         if (!groups[d]) groups[d] = { incomes: [], expenses: [] };
         groups[d].expenses.push(exp);
     });
     
     // تحويل الكائن إلى مصفوفة مرتبة
     return Object.keys(groups).map(date => ({
         date,
         incomes: groups[date].incomes,
         expenses: groups[date].expenses
     })).sort((a, b) => new Date(b.date.split('/').reverse().join('-')) - new Date(a.date.split('/').reverse().join('-')));
  }, [incomes, expenses]);

  return (
    <div className="min-h-screen w-full bg-[#02040a] flex flex-col font-sans select-none overflow-hidden">
      
      {/* --- البار العلوي --- */}
      <header className="w-full bg-[#090d16] border-b border-[#162235] px-6 py-4 flex flex-row justify-between items-center shadow-[0_4px_30px_rgba(0,0,0,0.5)] z-20 relative">
        <div className="flex items-center gap-4">
          <img src="/logo.png" alt="Logo" className="h-10 w-auto object-contain drop-shadow-[0_0_15px_rgba(16,185,129,0.3)]" onError={(e) => e.target.style.display = 'none'} />
          <div className="bg-gradient-to-br from-emerald-500 to-teal-600 text-black p-2.5 rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.3)] animate-pulse">
            <IconVolt />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono font-black px-2 py-0.5 rounded-md tracking-widest">AL-RAMLI GATEWAY</span>
            </div>
            <h1 className="text-xl font-black text-white tracking-wider font-mono">RAMLI ENTERPRISE <span className="text-emerald-400 font-light text-sm">v4.0 OS</span></h1>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="font-mono text-xs bg-[#05080f] border border-[#1b2b44] px-4 py-2 rounded-xl text-slate-300 shadow-inner flex items-center gap-3 font-bold tracking-widest">
            <span className="text-emerald-400 animate-ping text-[6px]">●</span>
            <span>AMMAN ZONE</span>
            <span className="text-white text-sm font-black">{currentTime.toLocaleTimeString('ar-JO')}</span>
          </div>
        </div>
      </header>

      <div className="flex flex-1 w-full overflow-hidden relative z-10">
        
        {/* --- القائمة الجانبية (المطابقة لـ AppSheet) --- */}
        <aside className="w-20 bg-[#04070d] border-l border-[#131f33] flex flex-col items-center py-6 gap-6 shadow-2xl z-20">
          <SidebarButton id="treasury" active={activeTab} setActive={setActiveTab} icon={<IconTreasury />} label="الخزينة اليومية" color="emerald" />
          <SidebarButton id="incomes" active={activeTab} setActive={setActiveTab} icon={<IconIncome />} label="المقبوضات" color="cyan" />
          <SidebarButton id="expenses" active={activeTab} setActive={setActiveTab} icon={<IconExpense />} label="المصروفات" color="rose" />
          <SidebarButton id="reports" active={activeTab} setActive={setActiveTab} icon={<IconReports />} label="تفاصيل الأيام" color="indigo" />
        </aside>

        {/* --- شاشات العرض الرئيسية --- */}
        <main className="flex-1 p-6 overflow-y-auto w-full bg-[#02040a] relative z-10">
          {isLoading ? (
             <div className="flex h-full items-center justify-center text-cyan-400 font-mono tracking-widest animate-pulse text-sm">SYNCING WITH APPSHEET CORE...</div>
          ) : (
            <>
              {activeTab === 'treasury' && <TreasuryView accounting={accounting} incomes={incomes} expenses={expenses} />}
              {activeTab === 'incomes' && <IncomesView incomes={incomes} />}
              {activeTab === 'expenses' && <ExpensesView expenses={expenses} />}
              {activeTab === 'reports' && <ReportsView groupedReports={groupedReports} />}
            </>
          )}
        </main>
      </div>
    </div>
  );
}

// ==========================================
// 🕹️ مكون القائمة الجانبية الموحد
// ==========================================
const SidebarButton = ({ id, active, setActive, icon, label, color }) => {
  const isActive = active === id;
  const colorMap = {
    emerald: 'bg-emerald-500 text-black shadow-[0_0_20px_rgba(16,185,129,0.4)]',
    cyan: 'bg-cyan-500 text-black shadow-[0_0_20px_rgba(6,182,212,0.4)]',
    rose: 'bg-rose-500 text-black shadow-[0_0_20px_rgba(244,63,94,0.4)]',
    indigo: 'bg-indigo-500 text-black shadow-[0_0_20px_rgba(99,102,241,0.4)]',
  };

  return (
    <button onClick={() => setActive(id)} className={`p-3.5 rounded-2xl transition-all duration-300 relative group ${isActive ? colorMap[color] : 'text-slate-500 hover:bg-slate-900 hover:text-white'}`}>
      {icon}
      <span className="absolute right-24 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg text-xs text-white font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none">
        {label}
      </span>
    </button>
  );
};

// ==========================================
// 1️⃣ شاشة الخزينة اليومية
// ==========================================
const TreasuryView = ({ accounting, incomes, expenses }) => (
  <div className="w-full space-y-6 animate-fade-in">
    <div className="flex items-center gap-3 border-b border-[#162235] pb-4 mb-6">
      <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-lg"><IconTreasury /></div>
      <h2 className="text-xl font-black text-white uppercase tracking-widest">الخزينة اليومية الموحدة</h2>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 w-full">
      <div className="bg-[#090d16] border border-[#16243a] p-6 rounded-2xl shadow-xl hover:border-emerald-500/30 transition">
        <span className="text-slate-400 text-xs font-black block tracking-wider uppercase mb-2">إجمالي الكاش بالدرج</span>
        <span className="text-4xl font-black text-emerald-400 font-mono block">{accounting.totalCash.toFixed(2)} <span className="text-xs text-slate-500">JOD</span></span>
      </div>
      <div className="bg-[#090d16] border border-[#16243a] p-6 rounded-2xl shadow-xl hover:border-cyan-500/30 transition">
        <span className="text-slate-400 text-xs font-black block tracking-wider uppercase mb-2">إجمالي حوالات كليك</span>
        <span className="text-4xl font-black text-cyan-400 font-mono block">{accounting.totalCliq.toFixed(2)} <span className="text-xs text-slate-500">JOD</span></span>
      </div>
      <div className="bg-[#090d16] border border-[#16243a] p-6 rounded-2xl shadow-xl hover:border-rose-500/30 transition">
        <span className="text-slate-400 text-xs font-black block tracking-wider uppercase mb-2">إجمالي المصروفات</span>
        <span className="text-4xl font-black text-rose-400 font-mono block">{accounting.totalExpenses.toFixed(2)} <span className="text-xs text-slate-500">JOD</span></span>
      </div>
      <div className="bg-[#04070d] border border-emerald-500/40 p-6 rounded-2xl shadow-[0_0_25px_rgba(16,185,129,0.05)] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-3xl rounded-full"></div>
        <span className="text-emerald-400 text-xs font-black block tracking-wider uppercase mb-2 relative z-10">صافي الأرباح</span>
        <span className="text-4xl font-black text-white font-mono block relative z-10">{accounting.netProfit.toFixed(2)} <span className="text-xs text-emerald-500">JOD</span></span>
      </div>
    </div>
  </div>
);

// ==========================================
// 2️⃣ شاشة المقبوضات (السيارات)
// ==========================================
const IncomesView = ({ incomes }) => (
  <div className="w-full space-y-6 animate-fade-in">
    <div className="flex items-center gap-3 border-b border-[#162235] pb-4 mb-6">
      <div className="p-2 bg-cyan-500/10 text-cyan-400 rounded-lg"><IconIncome /></div>
      <h2 className="text-xl font-black text-white uppercase tracking-widest">سجل المقبوضات وحركات السيارات</h2>
    </div>

    <div className="bg-[#090d16] border border-[#16243a] rounded-2xl overflow-hidden shadow-2xl">
      <table className="w-full text-right text-sm">
        <thead className="bg-[#04070d] border-b border-[#16243a]">
          <tr>
            <th className="p-4 text-slate-400 font-bold uppercase tracking-wider text-xs">رقم الكرت</th>
            <th className="p-4 text-slate-400 font-bold uppercase tracking-wider text-xs">السيارة واللوحة</th>
            <th className="p-4 text-slate-400 font-bold uppercase tracking-wider text-xs">العميل والموظف</th>
            <th className="p-4 text-slate-400 font-bold uppercase tracking-wider text-xs">طريقة الدفع</th>
            <th className="p-4 text-slate-400 font-bold uppercase tracking-wider text-xs text-left">المبلغ</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#16243a]/50">
          {incomes.map((inc, i) => (
            <tr key={i} className="hover:bg-[#0c1322] transition-colors">
              <td className="p-4 text-slate-500 font-mono font-bold">#{inc.id}</td>
              <td className="p-4">
                <div className="text-white font-bold">{inc.carModel}</div>
                <div className="text-cyan-400 font-mono text-xs mt-1 tracking-widest">{inc.plate}</div>
              </td>
              <td className="p-4">
                <div className="text-slate-300 font-medium">{inc.customer}</div>
                <div className="text-slate-500 text-xs mt-1">بواسطة: {inc.employee}</div>
              </td>
              <td className="p-4">
                <span className="px-2.5 py-1 bg-slate-900 border border-slate-700 text-slate-300 text-[10px] rounded-md font-bold">{inc.paymentMethod}</span>
              </td>
              <td className="p-4 text-left font-mono font-black text-emerald-400 text-base">
                +{inc.amount.toFixed(2)}
              </td>
            </tr>
          ))}
          {incomes.length === 0 && <tr><td colSpan="5" className="p-8 text-center text-slate-500">لا يوجد حركات مقبوضات مسجلة</td></tr>}
        </tbody>
      </table>
    </div>
  </div>
);

// ==========================================
// 3️⃣ شاشة المصروفات
// ==========================================
const ExpensesView = ({ expenses }) => (
  <div className="w-full space-y-6 animate-fade-in">
    <div className="flex items-center gap-3 border-b border-[#162235] pb-4 mb-6">
      <div className="p-2 bg-rose-500/10 text-rose-400 rounded-lg"><IconExpense /></div>
      <h2 className="text-xl font-black text-white uppercase tracking-widest">سجل المصروفات التشغيلية</h2>
    </div>

    <div className="bg-[#090d16] border border-[#16243a] rounded-2xl overflow-hidden shadow-2xl">
      <table className="w-full text-right text-sm">
        <thead className="bg-[#04070d] border-b border-[#16243a]">
          <tr>
            <th className="p-4 text-slate-400 font-bold uppercase tracking-wider text-xs">التاريخ</th>
            <th className="p-4 text-slate-400 font-bold uppercase tracking-wider text-xs">بيان المصروف</th>
            <th className="p-4 text-slate-400 font-bold uppercase tracking-wider text-xs text-left">القيمة</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#16243a]/50">
          {expenses.map((exp, i) => (
            <tr key={i} className="hover:bg-[#0c1322] transition-colors">
              <td className="p-4 text-slate-500 font-mono text-xs">{exp.date}</td>
              <td className="p-4 text-slate-200 font-medium">{exp.description}</td>
              <td className="p-4 text-left font-mono font-black text-rose-400 text-base">
                -{exp.amount.toFixed(2)}
              </td>
            </tr>
          ))}
          {expenses.length === 0 && <tr><td colSpan="3" className="p-8 text-center text-slate-500">لا يوجد مصروفات مسجلة</td></tr>}
        </tbody>
      </table>
    </div>
  </div>
);

// ==========================================
// 4️⃣ شاشة تفاصيل الأيام (مطابقة للتقرير المفصل بجوجل شيت)
// ==========================================
const ReportsView = ({ groupedReports }) => (
  <div className="w-full space-y-8 animate-fade-in">
    <div className="flex items-center gap-3 border-b border-[#162235] pb-4 mb-6">
      <div className="p-2 bg-indigo-500/10 text-indigo-400 rounded-lg"><IconReports /></div>
      <h2 className="text-xl font-black text-white uppercase tracking-widest">التقارير اليومية المفصلة</h2>
    </div>

    {groupedReports.map((group, idx) => {
      let dayCash = 0, dayCliq = 0, dayExp = 0;
      group.incomes.forEach(i => { if(i.paymentMethod.includes('كليك')) dayCliq += i.amount; else dayCash += i.amount; });
      group.expenses.forEach(e => dayExp += e.amount);
      const dayNet = (dayCash + dayCliq) - dayExp;

      return (
        <div key={idx} className="bg-[#070b12] border border-[#16243a] rounded-2xl overflow-hidden shadow-2xl mb-8">
          {/* شريط تاريخ اليوم */}
          <div className="bg-[#0f172a] border-b border-[#1e293b] p-4 flex justify-between items-center">
            <h3 className="text-white font-black text-lg tracking-wider">كشف حركات وإغلاق يوم: <span className="text-cyan-400 font-mono ml-2">{group.date}</span></h3>
          </div>

          <div className="p-6 flex flex-col xl:flex-row gap-6">
            
            {/* جدول حركات السيارات (المقبوضات) */}
            <div className="flex-1">
              <h4 className="text-xs font-bold text-slate-400 mb-3 uppercase tracking-widest border-b border-[#16243a] pb-2">المركبات والمقبوضات</h4>
              <table className="w-full text-right text-xs">
                <thead>
                  <tr className="text-slate-500">
                    <th className="pb-2">الكود</th>
                    <th className="pb-2">اللوحة</th>
                    <th className="pb-2">الزبون / الفني</th>
                    <th className="pb-2 text-left">المبلغ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#16243a]/40">
                  {group.incomes.map((inc, i) => (
                    <tr key={i}>
                      <td className="py-2 text-slate-400">#{inc.id}</td>
                      <td className="py-2 text-cyan-400 font-mono">{inc.plate}</td>
                      <td className="py-2 text-slate-300">{inc.customer} <span className="text-slate-600 block text-[9px]">{inc.employee}</span></td>
                      <td className="py-2 text-left text-emerald-400 font-bold">{inc.amount} ({inc.paymentMethod})</td>
                    </tr>
                  ))}
                  {group.incomes.length === 0 && <tr><td colSpan="4" className="py-2 text-slate-600">لا يوجد حركات</td></tr>}
                </tbody>
              </table>
            </div>

            {/* جدول المصروفات */}
            <div className="w-full xl:w-1/3">
              <h4 className="text-xs font-bold text-slate-400 mb-3 uppercase tracking-widest border-b border-[#16243a] pb-2">بيان المصروفات</h4>
              <table className="w-full text-right text-xs">
                <thead>
                  <tr className="text-slate-500">
                    <th className="pb-2">البيان</th>
                    <th className="pb-2 text-left">القيمة</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#16243a]/40">
                  {group.expenses.map((exp, i) => (
                    <tr key={i}>
                      <td className="py-2 text-slate-300">{exp.description}</td>
                      <td className="py-2 text-left text-rose-400 font-bold">{exp.amount}</td>
                    </tr>
                  ))}
                  {group.expenses.length === 0 && <tr><td colSpan="2" className="py-2 text-slate-600">لا يوجد مصاريف</td></tr>}
                </tbody>
              </table>
            </div>

            {/* ملخص اليوم المالي */}
            <div className="w-full xl:w-1/4 bg-[#090d16] border border-[#16243a] rounded-xl p-4 flex flex-col justify-center">
              <h4 className="text-xs font-bold text-slate-400 mb-4 text-center uppercase tracking-widest border-b border-[#16243a] pb-2">الملخص المالي لليوم</h4>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center"><span className="text-slate-300">دخل الكاش:</span><span className="text-emerald-400 font-mono font-bold">{dayCash}</span></div>
                <div className="flex justify-between items-center"><span className="text-slate-300">دخل الكليك:</span><span className="text-cyan-400 font-mono font-bold">{dayCliq}</span></div>
                <div className="flex justify-between items-center"><span className="text-slate-300">المصروفات:</span><span className="text-rose-400 font-mono font-bold">{dayExp}</span></div>
                <div className="flex justify-between items-center pt-3 border-t border-[#16243a]"><span className="text-white font-bold">الصافي:</span><span className="text-white font-mono font-black text-lg">{dayNet}</span></div>
              </div>
            </div>

          </div>
        </div>
      );
    })}
    {groupedReports.length === 0 && <div className="text-center py-10 text-slate-600 font-bold">لا يوجد بيانات مسجلة في النظام</div>}
  </div>
);