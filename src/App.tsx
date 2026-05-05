/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutGrid, 
  Dumbbell, 
  ShoppingBag, 
  Trophy, 
  User, 
  Coins,
  ArrowRight,
  Footprints,
  Heart,
  Timer,
  Flame,
  Zap,
  CheckCircle2,
  Play,
  Pause,
  Square
} from 'lucide-react';
import { Screen, Mission, MarketItem } from './types';

export default function App() {
  const [activeScreen, setActiveScreen] = useState<Screen>('dashboard');
  const [coins, setCoins] = useState(14285);
  const [isWorkingOut, setIsWorkingOut] = useState(false);

  return (
    <div className="min-h-screen bg-surface flex flex-col max-w-md mx-auto relative overflow-hidden">
      {/* Top Bar */}
      <header className="sticky top-0 z-40 flex justify-between items-center px-5 h-16 bg-surface border-b border-outline-variant">
        <div className="w-10 h-10 rounded-full bg-surface-container border border-outline-variant flex items-center justify-center text-primary-fixed">
          <User className="w-6 h-6" fill="currentColor" fillOpacity={0.2} />
        </div>
        <h1 className="font-display text-2xl font-bold text-primary-fixed tracking-tighter neon-glow">
          FITCAT
        </h1>
        <button className="w-10 h-10 flex items-center justify-center text-primary-fixed hover:text-primary-fixed-dim transition-colors">
          <Coins className="w-6 h-6" />
        </button>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto pb-24">
        <AnimatePresence mode="wait">
          {activeScreen === 'dashboard' && (
            <Dashboard 
              key="dashboard" 
              coins={coins} 
              onStartWorkout={() => setActiveScreen('train')} 
            />
          )}
          {activeScreen === 'train' && (
            <Train 
              key="train" 
              onFinish={() => setActiveScreen('dashboard')} 
            />
          )}
          {activeScreen === 'market' && (
            <Market 
              key="market" 
              coins={coins} 
            />
          )}
          {activeScreen === 'ranks' && (
            <Ranks key="ranks" />
          )}
        </AnimatePresence>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto h-20 bg-surface-container border-t border-outline-variant flex justify-around items-center px-4 z-50">
        <NavButton 
          active={activeScreen === 'dashboard'} 
          onClick={() => setActiveScreen('dashboard')} 
          icon={<LayoutGrid className="w-6 h-6" />} 
          label="DASHBOARD" 
        />
        <NavButton 
          active={activeScreen === 'train'} 
          onClick={() => setActiveScreen('train')} 
          icon={<Dumbbell className="w-6 h-6" />} 
          label="TRAIN" 
        />
        <NavButton 
          active={activeScreen === 'market'} 
          onClick={() => setActiveScreen('market')} 
          icon={<ShoppingBag className="w-6 h-6" />} 
          label="MARKET" 
        />
        <NavButton 
          active={activeScreen === 'ranks'} 
          onClick={() => setActiveScreen('ranks')} 
          icon={<Trophy className="w-6 h-6" />} 
          label="RANKS" 
        />
      </nav>
    </div>
  );
}

function NavButton({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) {
  return (
    <button 
      onClick={onClick}
      className={`flex flex-col items-center justify-center transition-all duration-300 px-3 py-1 rounded-lg ${
        active 
          ? 'text-surface bg-primary-fixed shadow-[0_0_15px_rgba(195,244,0,0.5)] scale-105' 
          : 'text-on-surface-variant hover:text-on-surface'
      }`}
    >
      {icon}
      <span className="font-display text-[10px] font-bold mt-1 tracking-wider">{label}</span>
    </button>
  );
}

function Dashboard({ coins, onStartWorkout }: { coins: number, onStartWorkout: () => void }) {
  const missions: Mission[] = [
    {
      id: '1',
      title: 'STEP GOAL',
      subtitle: '10,000 Steps',
      current: 8450,
      goal: 10000,
      reward: 500,
      icon: 'steps',
      active: true
    },
    {
      id: '2',
      title: 'CARDIO BURN',
      subtitle: '30 Min Cardio',
      current: 10,
      goal: 30,
      reward: 300,
      icon: 'cardio',
      active: false
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="p-5 space-y-8"
    >
      {/* Hero Stats */}
      <section className="text-center py-6 space-y-2">
        <p className="font-display text-xs font-bold text-on-surface-variant tracking-widest uppercase">TOTAL FC COINS</p>
        <div className="flex items-center justify-center gap-2 font-display text-4xl font-bold text-primary-fixed neon-glow tracking-tighter">
          <Coins className="w-8 h-8" />
          {coins.toLocaleString()}
        </div>
      </section>

      {/* Mascot Area */}
      <section className="relative aspect-square flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-primary-fixed/10 blur-[80px] rounded-full" />
        <motion.img 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ 
            scale: [1, 1.03, 1],
            y: [0, -12, 0],
            opacity: 1 
          }}
          transition={{ 
            scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
            y: { duration: 5, repeat: Infinity, ease: "easeInOut" },
            opacity: { duration: 0.8 }
          }}
          src="https://lh3.googleusercontent.com/aida/ADBb0ugRFLmwWVGXnXGrb0TLhczb_9KC3lnu6X7PuhQ8ZJgw0FbEQnBZBl_2RwyILZzvJTEgKmz8fPcms0xXYCobESx9TLZFsIDV-Bvm7lt9_bdsAsN0Bcn3n3rVEHU4Voh7uX633bi2yfPCNMneM8FUjHxTtXHLwZPbgjvrrPUSZm1-CVzqiYGgF9-pQgx05aSQAHNOIMMQI0eplZyWoFtKQDxQILyKNBp0QQsKuoF7Hyo7a_T4k1pP4Lmn2JAZzIQTcF0WT9YDxRgw" 
          alt="FitCat Mascot"
          className="w-full max-w-[300px] object-contain relative z-10 neon-glow"
        />
      </section>

      {/* Daily Missions */}
      <section className="space-y-4">
        <h2 className="font-display text-xl font-bold text-on-surface">DAILY MISSIONS</h2>
        <div className="space-y-4">
          {missions.map((mission) => (
            <div 
              key={mission.id}
              className={`bg-surface-container border border-outline-variant p-4 rounded-xl relative overflow-hidden group hover:border-primary-fixed/50 transition-colors ${mission.active ? 'border-primary-fixed/30 shadow-[inset_0_0_20px_rgba(195,244,0,0.05)]' : ''}`}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${mission.active ? 'bg-primary-fixed text-surface shadow-[0_0_10px_rgba(195,244,0,0.3)]' : 'bg-surface-variant text-on-surface-variant'}`}>
                    {mission.icon === 'steps' ? <Footprints className="w-6 h-6" /> : <Heart className="w-6 h-6" />}
                  </div>
                  <div>
                    <h3 className="font-display text-xs font-bold text-on-surface tracking-wider">{mission.title}</h3>
                    <p className="text-sm text-on-surface-variant font-medium">{mission.subtitle}</p>
                  </div>
                </div>
                <div className={`font-display text-[10px] font-bold px-3 py-1 rounded-full border ${mission.active ? 'text-primary-fixed border-primary-fixed/30 bg-primary-fixed/10 neon-glow' : 'text-on-surface-variant border-outline-variant bg-surface-variant/30'}`}>
                  +{mission.reward} FC
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between font-display text-[10px] font-bold">
                  <span className={mission.active ? 'text-primary-fixed' : 'text-on-surface-variant'}>{mission.current.toLocaleString()} / {mission.goal.toLocaleString()}</span>
                  <span className="text-on-surface-variant">{Math.floor((mission.current / mission.goal) * 100)}%</span>
                </div>
                {/* Segmented Progress Bar */}
                <div className="flex h-2 gap-[2px]">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div 
                      key={i}
                      className={`flex-1 h-full rounded-sm transition-all duration-500 ${
                        i < (mission.current / mission.goal) * 5 
                          ? 'bg-primary-fixed shadow-[0_0_5px_rgba(195,244,0,0.8)]' 
                          : 'bg-[#262626]'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Start Workout Button */}
      <button 
        onClick={onStartWorkout}
        className="w-full bg-primary-fixed text-surface font-display font-bold text-sm py-4 rounded-xl flex items-center justify-center gap-3 tracking-[0.2em] shadow-[0_0_20px_rgba(195,244,0,0.3)] hover:neon-glow transition-all active:scale-95"
      >
        <Play className="w-5 h-5 fill-current" />
        START WORKOUT
      </button>
    </motion.div>
  );
}

function Train({ onFinish }: { onFinish: () => void }) {
  const [elapsed, setElapsed] = useState(1934); // 32:14 in seconds
  const [bpm, setBpm] = useState(148);
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);

  // Bluetooth Connection Logic
  const connectSensor = async () => {
    if (!navigator.bluetooth) {
      alert("This browser doesn't support Web Bluetooth. Please try Chrome or Edge.");
      return;
    }

    try {
      setIsConnecting(true);
      // Filter for standard heart rate service
      const device = await navigator.bluetooth.requestDevice({
        filters: [{ services: ['heart_rate'] }]
      });

      const server = await device.gatt?.connect();
      const service = await server?.getPrimaryService('heart_rate');
      const characteristic = await service?.getCharacteristic('heart_rate_measurement');

      await characteristic?.startNotifications();
      
      characteristic?.addEventListener('characteristicvaluechanged', (event: any) => {
        const value = event.target.value;
        // The heart rate measurement value format: [flags, heartRate, ...]
        // Flags bit 0: 0 = UINT8, 1 = UINT16
        const flags = value.getUint8(0);
        const rate = (flags & 0x01) ? value.getUint16(1, true) : value.getUint8(1);
        setBpm(rate);
      });

      setIsConnected(true);
      device.addEventListener('gattserverdisconnected', () => {
        setIsConnected(false);
        alert("Sensor disconnected.");
      });
    } catch (error) {
      console.error("Connection failed:", error);
      alert("Failed to connect sensor.");
    } finally {
      setIsConnecting(false);
    }
  };

  useEffect(() => {
    const timer = setInterval(() => setElapsed(e => e + 1), 1000);
    // Simulation only if not connected
    let bpmTimer: any;
    if (!isConnected) {
      bpmTimer = setInterval(() => setBpm(b => b + (Math.random() > 0.5 ? 1 : -1)), 2500);
    }
    return () => {
      clearInterval(timer);
      if (bpmTimer) clearInterval(bpmTimer);
    };
  }, [isConnected]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="p-5 flex flex-col gap-6"
    >
      <div className="text-center space-y-1">
        <div className="flex items-center justify-center gap-2 mb-2">
          {isConnected ? (
            <div className="flex items-center gap-1.5 bg-primary-fixed/20 text-primary-fixed border border-primary-fixed/30 px-3 py-1 rounded-full text-[10px] font-bold neon-glow">
              <Zap className="w-3 h-3 fill-current" />
              SENSOR CONNECTED
            </div>
          ) : (
            <button 
              onClick={connectSensor}
              disabled={isConnecting}
              className="flex items-center gap-1.5 bg-surface-container border border-outline-variant text-on-surface-variant px-3 py-1 rounded-full text-[10px] font-bold hover:border-primary-fixed/50 transition-all active:scale-95 disabled:opacity-50"
            >
              <Heart className="w-3 h-3" />
              {isConnecting ? "SEARCHING..." : "CONNECT HR SENSOR"}
            </button>
          )}
        </div>
        <h2 className="font-display text-[10px] font-bold text-on-surface-variant tracking-[0.2em]">ACTIVE MISSION</h2>
        <h1 className="font-display text-2xl font-bold text-on-surface">NEON NIGHT RUN</h1>
      </div>

      {/* BPM Gauge */}
      <div className="relative flex justify-center items-center py-6">
        <div className="relative w-64 h-64">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" fill="none" stroke="#262626" strokeWidth="8" strokeDasharray="2 4" strokeLinecap="round" />
            <motion.circle 
              cx="50" cy="50" r="45" fill="none" stroke="#c3f400" strokeWidth="8" 
              strokeDasharray="282" strokeDashoffset={282 - (282 * 0.75)} 
              strokeLinecap="round" className="neon-glow"
              initial={{ strokeDashoffset: 282 }}
              animate={{ strokeDashoffset: 282 - (282 * 0.75) }}
              transition={{ duration: 1.5 }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center space-y-1">
            <Heart className="w-8 h-8 text-primary-fixed fill-current neon-glow animate-pulse" />
            <span className="font-display text-5xl font-bold text-on-surface tracking-tighter">{bpm}</span>
            <span className="font-display text-[10px] font-bold text-on-surface-variant tracking-wider">BPM</span>
          </div>
          
          <div className="absolute bottom-0 right-8 w-24 h-24 rounded-full border-2 border-primary-fixed overflow-hidden bg-surface-container-high neon-glow-strong z-20 shadow-[0_0_20px_rgba(195,244,0,0.4)]">
            {/* Video Lead Indicator */}
            <div className="absolute top-3 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1 bg-black/60 px-2 py-0.5 rounded-full border border-white/10">
              <div className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse shadow-[0_0_5px_#dc2626]" />
              <span className="text-[8px] font-bold text-white tracking-[0.2em]">LIVE</span>
            </div>

            <motion.img 
              animate={{ 
                y: [0, -8, 0],
                scale: [1.1, 1.25, 1.1],
                rotate: [-2, 2, -2],
                filter: bpm > 150 ? ["brightness(1) contrast(1.1)", "brightness(1.2) contrast(1.2)", "brightness(1) contrast(1.1)"] : ["brightness(1)", "brightness(1.1)", "brightness(1)"]
              }}
              transition={{ 
                duration: bpm > 140 ? 0.35 : 0.7, 
                repeat: Infinity,
                ease: "easeInOut" 
              }}
              src="https://lh3.googleusercontent.com/aida/ADBb0ugRFLmwWVGXnXGrb0TLhczb_9KC3lnu6X7PuhQ8ZJgw0FbEQnBZBl_2RwyILZzvJTEgKmz8fPcms0xXYCobESx9TLZFsIDV-Bvm7lt9_bdsAsN0Bcn3n3rVEHU4Voh7uX633bi2yfPCNMneM8FUjHxTtXHLwZPbgjvrrPUSZm1-CVzqiYGgF9-pQgx05aSQAHNOIMMQI0eplZyWoFtKQDxQILyKNBp0QQsKuoF7Hyo7a_T4k1pP4Lmn2JAZzIQTcF0WT9YDxRgw" 
              alt="Active Mascot Feed" 
              className="w-full h-full object-cover scale-110"
            />

            {/* Scanline Effect Overlay to simulate Video Screen */}
            <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.2)_50%),linear-gradient(90deg,rgba(255,0,0,0.05),rgba(0,255,0,0.02),rgba(0,0,255,0.05))] bg-[length:100%_3px,4px_100%]" />
          </div>
        </div>
      </div>

      {/* Stats Bento Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-surface-container border border-outline-variant p-5 rounded-2xl flex flex-col justify-between h-32">
          <div className="flex justify-between items-center text-on-surface-variant">
            <span className="font-display text-[10px] font-bold tracking-widest">ELAPSED</span>
            <Timer className="w-4 h-4" />
          </div>
          <span className="font-display text-3xl font-bold text-on-surface">{formatTime(elapsed)}</span>
        </div>
        <div className="bg-surface-container border border-outline-variant p-5 rounded-2xl flex flex-col justify-between h-32">
          <div className="flex justify-between items-center text-on-surface-variant">
            <span className="font-display text-[10px] font-bold tracking-widest">KCAL</span>
            <Flame className="w-4 h-4 text-primary-fixed" />
          </div>
          <span className="font-display text-3xl font-bold text-primary-fixed neon-glow">412</span>
        </div>
        <div className="col-span-2 bg-surface-container border border-outline-variant p-5 rounded-2xl space-y-4">
          <div className="flex justify-between items-center text-on-surface-variant">
            <span className="font-display text-[10px] font-bold tracking-widest">CURRENT PACE</span>
            <Zap className="w-4 h-4" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-display text-4xl font-bold text-on-surface">5'45"</span>
            <span className="font-display text-xs font-bold text-on-surface-variant">/KM</span>
          </div>
          <div className="flex h-1.5 gap-1.5 w-full">
            {[1,1,1,0,0].map((v, i) => (
              <div key={i} className={`flex-1 h-full rounded-full ${v ? 'bg-primary-fixed neon-glow' : 'bg-[#262626]'}`} />
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <button 
          onClick={onFinish}
          className="w-full bg-primary-fixed text-surface font-display font-bold text-sm py-4 rounded-xl flex items-center justify-center gap-3 tracking-[0.2em] shadow-[0_0_20px_rgba(195,244,0,0.3)] active:scale-95 transition-all"
        >
          <Square className="w-5 h-5 fill-current" />
          FINISH WORKOUT
        </button>
        <button 
          className="w-full border-2 border-primary-fixed text-primary-fixed font-display font-bold text-sm py-4 rounded-xl flex items-center justify-center gap-3 tracking-[0.2em] hover:bg-primary-fixed hover:text-surface active:scale-95 transition-all"
        >
          <Pause className="w-5 h-5" />
          PAUSE
        </button>
      </div>
    </motion.div>
  );
}

function Market({ coins }: { coins: number }) {
  const items: MarketItem[] = [
    {
      id: '1',
      name: 'Cyber Sunglasses',
      price: 850,
      category: 'headwear',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA-ePOoakmfG93ao5xcbTvOXMR8tvpPna_mbBHCqvS2CxwM8rofAklGRMs1G8x1cd8PPuxAOT1dg5elej4_3ctC7qCufw2y6H_wz4RXqu38cCrKc8EoG2TDw-1vGwKqBnrYIm3hfX5AC1V16QlWzzhj1uFnKGlVR1-ee6tSiaQIzOWAKoKBTGwfu8v2lHmvPg_Zh8X-pu6YWthKNcRn4NA2Ai3iYF5ZYEbAVTUFS3OMpMYy2UYKXJ8XyRBpAvWavX2L_UL8BkCpIyg',
      owned: false
    },
    {
      id: '2',
      name: 'Neon Sneakers',
      price: 1200,
      category: 'footwear',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuArdAgKP2XbREIKawc1FFid3UejM03Wfg_KFP7vpU4mmzqjQ6qzeWmQoJZVnqrshs6mS8bUKLIF7znrl7LORzHq6U_NWfe5dj2t36pmgcpUBe8k0EcQsGqUS7yGi7KGl39fv_qEhIMPvvEaTCld8JTZLDrho4Bla9rU79aF2sWhXc8Xgyt0vRVZbn_J2DgtiRFcHKtA_uzb60HpvFpiETpwKfgpECgssihi6-hhUDT_FeSNTPxwK3qoHFtL7t8fHkA5gxfFJqOWCZQ',
      owned: true
    },
    {
      id: '3',
      name: 'XP Power Drink',
      price: 150,
      category: 'boosts',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuClsjwgKsTSFZQ062V0eYM42bHD1j6jqBhwwTOqqt8M8Ah2-2jMO3hrlPWQfHH3_CIlIgAOpPCUhk27RXR4M94pDWGX-bQ2t8UfIxe2LoMpXt6uvYBV1kF5tMZCv31wA3njhr0QjaIRFm43SDPjIdz6v4ZFKsORRCU5hm2dFV04SE3rr72L24MiivWDL1itLpIHKRDZlr-1eWGyCLklOb0gmFBJFzdoeCLVCGijxC1O6msNMnsp5bmxbnOuh2Um4_-ILAb3IaCfVu4',
      owned: false
    },
    {
      id: '4',
      name: 'Titanium Collar',
      price: 2400,
      category: 'headwear',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD3sGeCY10EdLC0E-ks24bBj4LaPW-KBfsbqmKUAyGXyUURFteUjbWukDU_sHnK-GiAEPGpTJ854CeZoX15ifMo5qhx74zyHBAPXh0ISlTWntBsPjFn05YO7u0jh_DnVTV9eg4Uv7638wQRrjLr9soVdH-HhPza5dy5HdYEenXscOStdmxlFRxFS0ESXUFa99o2Ro1M8jyA74uEVg2GBvFWAHDlD0XG16d85Z6Aaa7u741ym2LUVbcLB9RVaVWNjcQ23mVDEGykhR8',
      owned: false,
      rare: true
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="p-5 space-y-6"
    >
      {/* Wallet Summary */}
      <section className="bg-surface-container border border-outline-variant rounded-2xl p-5 flex justify-between items-center relative overflow-hidden group">
        <div className="absolute inset-0 bg-primary-fixed/5 group-hover:bg-primary-fixed/10 transition-colors pointer-events-none" />
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-primary-fixed flex items-center justify-center text-surface shadow-[0_0_15px_rgba(195,244,0,0.4)]">
            <Coins className="w-7 h-7" />
          </div>
          <div className="flex flex-col">
            <span className="font-display text-[10px] font-bold text-on-surface-variant tracking-[0.1em]">BALANCE</span>
            <span className="font-display text-3xl font-bold text-primary-fixed neon-glow tracking-tighter">{coins.toLocaleString()}</span>
          </div>
        </div>
        <button className="font-display text-[10px] font-bold text-primary-fixed border border-primary-fixed/30 px-4 py-2 rounded-lg bg-primary-fixed/10 hover:bg-primary-fixed hover:text-surface transition-all tracking-wider uppercase">
          Add Funds
        </button>
      </section>

      {/* Filters */}
      <section className="flex gap-2 overflow-x-auto pb-2 -mx-5 px-5 no-scrollbar">
        {['All Gear', 'Headwear', 'Footwear', 'Boosts'].map((tab, idx) => (
          <button 
            key={tab} 
            className={`whitespace-nowrap px-6 py-3 rounded-full font-display text-[10px] font-bold tracking-[0.1em] uppercase transition-all ${
              idx === 0 
                ? 'bg-primary-fixed text-surface shadow-[0_0_12px_rgba(195,244,0,0.4)]' 
                : 'bg-surface-container text-on-surface-variant border border-outline-variant hover:border-primary-fixed/50'
            }`}
          >
            {tab}
          </button>
        ))}
      </section>

      {/* Shop Grid */}
      <section className="grid grid-cols-2 gap-4">
        {items.map((item) => (
          <div 
            key={item.id}
            className={`bg-surface-container border rounded-2xl overflow-hidden flex flex-col group cursor-pointer transition-all ${
              item.owned ? 'border-primary-fixed shadow-[0_0_15px_rgba(195,244,0,0.1)]' : 'border-outline-variant hover:border-primary-fixed/50'
            }`}
          >
            <div className="aspect-square bg-surface-container-low p-4 relative flex items-center justify-center overflow-hidden">
               {item.owned && (
                <div className="absolute top-2 right-2 bg-primary-fixed text-surface font-display text-[8px] font-bold px-1.5 py-0.5 rounded shadow-[0_0_8px_rgba(195,244,0,0.5)] z-10">OWNED</div>
              )}
               {item.rare && !item.owned && (
                <div className="absolute top-2 left-2 bg-[#7df4ff] text-surface font-display text-[8px] font-bold px-1.5 py-0.5 rounded shadow-[0_0_8px_rgba(125,244,255,0.5)] z-10 tracking-widest uppercase">RARE</div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <img 
                src={item.image} 
                className="w-full h-full object-contain filter drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)] group-hover:scale-110 transition-transform duration-500" 
                alt={item.name} 
              />
            </div>
            <div className="p-4 flex flex-col gap-1.5 border-t border-outline-variant">
              <h3 className="font-display text-[10px] font-bold text-on-surface tracking-wider uppercase truncate">{item.name}</h3>
              {item.owned ? (
                <div className="flex items-center gap-1 text-on-surface-variant">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span className="font-display text-[10px] font-bold uppercase">IN CLOSET</span>
                </div>
              ) : (
                <div className="flex items-center gap-1 text-primary-fixed">
                  <Coins className="w-4 h-4" />
                  <span className="font-display text-sm font-bold">{item.price}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </section>
    </motion.div>
  );
}

function Ranks() {
  const players = [
    { name: 'FitMaster99', score: 'Level 42', rank: 1, xp: '1.2M XP' },
    { name: 'CyberDash', score: 'Level 38', rank: 2, xp: '980K XP' },
    { name: 'NeonSprinter', score: 'Level 35', rank: 3, xp: '820K XP' },
    { name: 'You', score: 'Level 12', rank: 142, xp: '45K XP' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="p-5 space-y-6"
    >
      <div className="text-center py-4 bg-primary-fixed/10 border border-primary-fixed/20 rounded-2xl neon-glow">
        <h2 className="font-display text-xs font-bold text-primary-fixed tracking-widest uppercase mb-1">YOUR RANK</h2>
        <div className="font-display text-4xl font-bold text-on-surface tracking-tighter">#142</div>
      </div>

      <div className="space-y-3">
        {players.map((player) => (
          <div 
            key={player.name}
            className={`flex items-center justify-between p-4 border rounded-xl ${
              player.name === 'You' ? 'bg-primary-fixed/5 border-primary-fixed shadow-[inset_0_0_15px_rgba(195,244,0,0.05)]' : 'bg-surface-container border-outline-variant'
            }`}
          >
            <div className="flex items-center gap-4">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-display text-xs font-bold ${
                player.rank <= 3 ? 'bg-primary-fixed text-surface' : 'bg-surface-variant text-on-surface-variant'
              }`}>
                {player.rank}
              </div>
              <div className="flex flex-col">
                <span className="font-display text-sm font-bold text-on-surface uppercase">{player.name}</span>
                <span className="text-[10px] text-on-surface-variant font-bold">{player.xp}</span>
              </div>
            </div>
            <div className={`font-display text-xs font-bold ${player.name === 'You' ? 'text-primary-fixed' : 'text-on-surface-variant'}`}>
              {player.score}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
