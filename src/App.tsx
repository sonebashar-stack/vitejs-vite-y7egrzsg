<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>الرملي كلوود - الساحة الحية</title>
    <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;900&display=swap" rel="stylesheet">
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    fontFamily: { sans: ['Cairo', 'sans-serif'], mono: ['monospace'] }
                }
            }
        }
    </script>
    <style>
        body { background-color: #080d14; color: #e2e8f0; overflow: hidden; }
        .flash-green {
            animation: pulse-green 1.5s infinite;
        }
        @keyframes pulse-green {
            0%, 100% { box-shadow: 0 0 0 rgba(16, 185, 129, 0); border-color: rgb(30 41 59 / 0.8); }
            50% { box-shadow: 0 0 25px rgba(16, 185, 129, 0.5); border-color: #10b981; transform: scale(1.02); }
        }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #080d14; }
        ::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 10px; }
    </style>
</head>
<body class="flex flex-col h-screen select-none antialiased tracking-wide">

    <header class="bg-slate-900/80 border-b border-slate-800/80 backdrop-blur-xl sticky top-0 z-40">
        <div class="px-6 py-4 flex justify-between items-center">
            <div class="flex items-center gap-4">
                
                <img src="https://via.placeholder.com/150x150/00ff9d/000000?text=LOGO" alt="Logo" class="w-14 h-14 object-cover rounded-xl border border-sky-500/30 shadow-[0_0_15px_-3px_rgba(56,189,248,0.4)]">
                
                <div>
                    <h1 class="font-black text-white text-2xl leading-tight tracking-wider">الرملي كلوود</h1>
                    <p class="text-xs font-mono text-sky-400/80 tracking-widest mt-1">AWS-NODE-AMMAN • v2.1</p>
                </div>
            </div>
            <div class="flex items-center gap-4" dir="ltr">
                <div class="flex items-center gap-3 px-4 py-2 bg-slate-950/80 border border-slate-700/50 rounded-xl shadow-inner">
                    <div class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]"></div>
                    <span class="font-mono text-slate-300 font-bold text-lg" id="clock">00:00:00</span>
                </div>
            </div>
        </div>
    </header>

    <div class="flex flex-1 overflow-hidden">
        <main class="flex-1 p-8 overflow-y-auto space-y-8">
            
            <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div class="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-lg">
                    <span class="text-slate-400 text-sm font-bold block mb-2">مركبات قيد الانتظار</span>
                    <span class="text-4xl font-black text-amber-500" id="stat-waiting">0</span>
                </div>
                <div class="bg-slate-900 border border-slate-800 p-6 rounded-2xl relative overflow-hidden shadow-lg">
                    <div class="absolute -right-4 -top-4 w-20 h-20 bg-blue-500/10 rounded-full blur-2xl"></div>
                    <span class="text-slate-400 text-sm font-bold block mb-2">تحت الصيانة الحالية</span>
                    <span class="text-4xl font-black text-blue-400" id="stat-working">0</span>
                </div>
                <div class="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-lg">
                    <span class="text-slate-400 text-sm font-bold block mb-2">جاهزة للتسليم</span>
                    <span class="text-4xl font-black text-emerald-400" id="stat-ready">0</span>
                </div>
                <div class="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 p-6 rounded-2xl relative overflow-hidden shadow-lg">
                    <div class="absolute right-0 bottom-0 w-32 h-32 bg-sky-500/10 rounded-full blur-3xl"></div>
                    <span class="text-slate-400 text-sm font-bold block mb-2">إجمالي المركبات بالساحة</span>
                    <span class="text-4xl font-black text-sky-400" id="stat-total">0</span>
                </div>
            </div>

            <div class="bg-slate-900/50 border border-slate-800 rounded-3xl p-8 shadow-2xl">
                <div class="flex items-center gap-3 border-b border-slate-800/80 pb-5 mb-6">
                    <div class="w-3 h-3 rounded-full bg-emerald-500 animate-ping"></div>
                    <h2 class="text-xl font-bold text-white tracking-wide">اللوحة الرقمية لتدفق المركبات الحية</h2>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" id="cars-container">
                    <div class="col-span-full text-center py-16 text-emerald-400 text-lg font-mono tracking-widest animate-pulse">
                        CONNECTING TO CLOUD... ⚡
                    </div>
                </div>
            </div>

        </main>
    </div>

    <script>
        const API_URL = "https://script.google.com/macros/s/AKfycbwwuBg5kT0QTozP3CXLYTE6kF3EeX5T0lAZW7BVITpXRotbxtZ2mXBwWCSzG7I75FnUPQ/exec";
        
        let readyTimestamps = {};
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

        function playSound() {
            try {
                const osc = audioCtx.createOscillator();
                const gain = audioCtx.createGain();
                osc.type = "sine";
                osc.frequency.setValueAtTime(587.33, audioCtx.currentTime);
                osc.connect(gain);
                gain.connect(audioCtx.destination);
                gain.gain.setValueAtTime(0.4, audioCtx.currentTime);
                osc.start();
                gain.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + 0.8);
                osc.stop(audioCtx.currentTime + 0.8);
            } catch(e) { console.log("Audio blocked"); }
        }

        function updateTime() {
            const now = new Date();
            let h = now.getHours(), m = now.getMinutes(), s = now.getSeconds();
            let ampm = h >= 12 ? 'م' : 'ص';
            h = h % 12 || 12;
            document.getElementById('clock').innerText = 
                `${h}:${m < 10 ? '0'+m : m}:${s < 10 ? '0'+s : s} ${ampm}`;
        }
        setInterval(updateTime, 1000);
        updateTime();

        async function fetchLiveYard() {
            try {
                const res = await fetch(API_URL);
                const data = await res.json();
                renderCards(data);
            } catch(e) { console.error("Sync Error", e); }
        }

        function renderCards(cars) {
            const container = document.getElementById('cars-container');
            const now = Date.now();
            let waiting = 0, working = 0, ready = 0;
            let html = '';

            cars.forEach(car => {
                const status = car["حالة السيارة"] || "";
                const id = car["رقم الكرت"] || car["رقم اللوحة"];

                // فلترة السيارات المنتهية
                if (status.includes("مبيت") || status.includes("تم التسليم والدفع") || car["مرحل"] === true || car["مرحل"] === "TRUE") {
                    return;
                }

                // سحب اسم الزبون الأول فقط (يفصل المسافات ويأخذ الكلمة الأولى)
                let fullName = car["اسم الزبون"] || "غير محدد";
                let firstName = fullName.split(' ')[0];

                let statusColor = "bg-slate-800 text-slate-300 border-slate-700";
                let barColor = "bg-slate-600";
                let barWidth = "15%";
                let flashClass = "";
                let cleanStatus = status.replace(/[^أ-يa-zA-Z\s]/g, '');

                if(status.includes("قيد الانتظار")) { 
                    statusColor = "bg-amber-500/10 text-amber-500 border-amber-500/30"; 
                    barColor = "bg-amber-500"; barWidth = "15%";
                    waiting++; 
                }
                else if(status.includes("قيد العمل") || status.includes("قيد الفحص")) { 
                    statusColor = "bg-blue-500/10 text-blue-400 border-blue-500/30"; 
                    barColor = "bg-blue-500"; barWidth = "75%";
                    working++; 
                }
                else if(status.includes("جاهزة")) {
                    if(!readyTimestamps[id]) {
                        readyTimestamps[id] = now;
                        playSound();
                    }
                    const elapsed = now - readyTimestamps[id];
                    if(elapsed < 240000) { // 4 دقائق
                        statusColor = "bg-emerald-500/10 text-emerald-400 border-emerald-500/50";
                        barColor = "bg-emerald-500"; barWidth = "100%";
                        flashClass = "flash-green"; 
                        ready++;
                    } else {
                        return; // طردها
                    }
                } else {
                    if(readyTimestamps[id]) delete readyTimestamps[id];
                }

                html += `
                <div class="bg-slate-950/80 rounded-2xl p-6 flex flex-col gap-5 border border-slate-700/50 hover:border-slate-500 shadow-xl transition-all ${flashClass}">
                    
                    <div class="flex justify-between items-center">
                        <span class="font-mono text-sm text-slate-400 font-bold bg-slate-900 px-3 py-1 rounded-lg border border-slate-800">CRD #${car["رقم الكرت"] || "N/A"}</span>
                        <span class="text-sm px-4 py-1.5 rounded-lg border font-bold tracking-wide ${statusColor}">${cleanStatus}</span>
                    </div>

                    <div class="flex justify-between items-center mt-1">
                        <h3 class="font-black text-white text-2xl tracking-wide">${car["نوع وموديل السيارة"] || "مركبة"}</h3>
                        <span class="font-mono text-sky-400 text-xl font-bold tracking-wider bg-sky-500/10 px-3 py-1 rounded-lg border border-sky-500/20" dir="ltr">${car["رقم اللوحة"] || "---"}</span>
                    </div>

                    <div class="flex justify-between items-center text-sm text-slate-300 bg-slate-900/60 p-3 rounded-xl border border-slate-800/80">
                        <div class="flex items-center gap-2">
                            <span class="text-xl">👤</span>
                            <span class="font-bold text-base text-slate-200">${firstName}</span>
                        </div>
                        <div class="flex items-center gap-2">
                            <div class="w-2.5 h-2.5 rounded-full ${status.includes('قيد العمل') ? 'bg-emerald-500 animate-pulse' : 'bg-slate-500'}"></div>
                            <span class="font-bold text-slate-400">الفني: ${car["الموظف المسؤول"] || "تحت التوزيع"}</span>
                        </div>
                    </div>

                    <div class="bg-slate-900/80 border border-slate-700/60 p-4 rounded-xl min-h-[70px] flex items-center justify-center text-center shadow-inner">
                        <p class="text-base font-bold text-slate-200 leading-relaxed">${car["العمل المطلوب"] || "لم يتم تحديد العمل"}</p>
                    </div>

                    <div class="mt-2">
                        <div class="flex justify-between text-xs text-slate-400 font-bold mb-2 font-mono">
                            <span>PROGRESS</span>
                            <span>${barWidth}</span>
                        </div>
                        <div class="h-2 bg-slate-800 rounded-full overflow-hidden">
                            <div class="h-full ${barColor} rounded-full transition-all duration-700" style="width: ${barWidth}"></div>
                        </div>
                    </div>

                </div>`;
            });

            document.getElementById('stat-waiting').innerText = waiting;
            document.getElementById('stat-working').innerText = working;
            document.getElementById('stat-ready').innerText = ready;
            document.getElementById('stat-total').innerText = waiting + working + ready;

            container.innerHTML = html || `<div class="col-span-full text-center py-16 text-slate-500 text-lg font-bold">الساحة فارغة حالياً.</div>`;
        }

        fetchLiveYard();
        setInterval(fetchLiveYard, 1000);
    </script>
</body>
</html>