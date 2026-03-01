import { useState } from 'react';
import { User, Lock, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import nexusLogo from '@/assets/nexus_logo.png';

// Mock users - En producción estos vendrían de la base de datos
const MOCK_USERS = [
  { username: 'director@nexus.com', password: 'director123' },
  { username: 'gerentegeneral@nexus.com', password: 'gerente123' },
  { username: 'gerente.operaciones@nexus.com', password: 'gerente123' },
  { username: 'supervisor.almacen@nexus.com', password: 'supervisor123' },
  { username: 'gerente.ventas@nexus.com', password: 'gerente123' },
  { username: 'gerente.finanzas@nexus.com', password: 'gerente123' },
  { username: 'gerente.rrhh@nexus.com', password: 'gerente123' },
  { username: 'vendedor@nexus.com', password: 'vendedor123' },
  { username: 'asistente@nexus.com', password: 'asistente123' },
  { username: 'trabajador@nexus.com', password: 'trabajador123' },
];

const DEMO_USERS = [
  { email: 'director@nexus.com', pass: 'director123', label: 'Director', level: 'Estratégico', color: 'indigo' },
  { email: 'gerentegeneral@nexus.com', pass: 'gerente123', label: 'Gerente General', level: 'Estratégico', color: 'indigo' },
  { email: 'gerente.operaciones@nexus.com', pass: 'gerente123', label: 'Gerente Operaciones', level: 'Gerencial', color: 'blue' },
  { email: 'supervisor.almacen@nexus.com', pass: 'supervisor123', label: 'Supervisor Almacén', level: 'Gerencial', color: 'blue' },
  { email: 'gerente.ventas@nexus.com', pass: 'gerente123', label: 'Gerente Ventas', level: 'Gerencial', color: 'blue' },
  { email: 'gerente.finanzas@nexus.com', pass: 'gerente123', label: 'Gerente Finanzas', level: 'Gerencial', color: 'blue' },
  { email: 'gerente.rrhh@nexus.com', pass: 'gerente123', label: 'Gerente RRHH', level: 'Gerencial', color: 'blue' },
  { email: 'vendedor@nexus.com', pass: 'vendedor123', label: 'Vendedor', level: 'Operacional', color: 'slate' },
  { email: 'asistente@nexus.com', pass: 'asistente123', label: 'Asistente', level: 'Operacional', color: 'slate' },
  { email: 'trabajador@nexus.com', pass: 'trabajador123', label: 'Trabajador', level: 'Operacional', color: 'slate' },
];

const SIA_SYSTEMS = [
  { name: 'LMS', fullName: 'Learning Management System', role: 'Gerente RRHH', email: 'gerente.rrhh@nexus.com', pass: 'gerente123', color: 'rose' },
  { name: 'CRM', fullName: 'Customer Relationship Management', role: 'Gerente Ventas', email: 'gerente.ventas@nexus.com', pass: 'gerente123', color: 'indigo' },
  { name: 'ERP', fullName: 'Enterprise Resource Planning', role: 'Gerente Finanzas', email: 'gerente.finanzas@nexus.com', pass: 'gerente123', color: 'emerald' },
  { name: 'SCM/WMS', fullName: 'Supply Chain Management', role: 'Gerente Operaciones', email: 'gerente.operaciones@nexus.com', pass: 'gerente123', color: 'blue' },
  { name: 'BI', fullName: 'Business Intelligence', role: 'Gerente General', email: 'gerentegeneral@nexus.com', pass: 'gerente123', color: 'purple' },
  { name: 'BSC', fullName: 'Balanced Scorecard', role: 'Director', email: 'director@nexus.com', pass: 'director123', color: 'slate' },
  { name: 'WMS', fullName: 'Inventory Control', role: 'Supervisor Almacén', email: 'supervisor.almacen@nexus.com', pass: 'supervisor123', color: 'amber' },
  { name: 'SFA', fullName: 'Sales Force Automation', role: 'Vendedor', email: 'vendedor@nexus.com', pass: 'vendedor123', color: 'sky' },
  { name: 'ECM/OA', fullName: 'Office Automation', role: 'Asistente', email: 'asistente@nexus.com', pass: 'asistente123', color: 'violet' },
  { name: 'Portal', fullName: 'Employee Self-Service', role: 'Trabajador', email: 'trabajador@nexus.com', pass: 'trabajador123', color: 'teal' },
];

interface LoginPageProps {
  onLoginSuccess: (username: string) => void;
}

export function LoginPage({ onLoginSuccess }: LoginPageProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleQuickAccess = (email: string, pass: string) => {
    setUsername(email);
    setPassword(pass);
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!username.trim()) {
      setError('Por favor ingrese su usuario');
      return;
    }

    if (!password.trim()) {
      setError('Por favor ingrese su contraseña');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const user = MOCK_USERS.find(
        (u) => u.username === username && u.password === password
      );

      if (user) {
        onLoginSuccess(username);
      } else {
        setError('Usuario o contraseña incorrectos');
        setIsLoading(false);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-slate-50 p-4 font-sans overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-slate-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" />
      </div>

      <div className="relative w-full max-w-[85rem] grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch justify-center scale-100 lg:scale-90 transition-transform duration-500 origin-center py-8 lg:py-0">
        {/* Sección SI (Izquierda) */}
        <div className="hidden lg:col-span-3 lg:block">
          <div className="bg-white/70 backdrop-blur-xl rounded-[2rem] shadow-xl p-6 h-full flex flex-col border border-gray-100 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-full blur-2xl group-hover:bg-blue-500/10 transition-all duration-700" />

            <div className="relative z-10 h-full flex flex-col">
              <div className="mb-6">
                <h2 className="text-[9px] font-black text-blue-600 uppercase tracking-[0.25em] mb-2 px-1">Sistemas de Información</h2>
                <h3 className="text-xl font-black text-slate-900 tracking-tight italic px-1">SI <span className="text-blue-600">Nexus</span></h3>
              </div>

              <div className="space-y-2.5 overflow-y-auto max-h-[440px] pr-2 custom-scrollbar flex-1 pb-4">
                {SIA_SYSTEMS.map((sia) => (
                  <button
                    key={sia.name}
                    onClick={() => handleQuickAccess(sia.email, sia.pass)}
                    className="w-full text-left p-3.5 rounded-xl bg-slate-50 border border-slate-100 hover:border-blue-200 hover:bg-blue-50/50 transition-all group/item active:scale-[0.98]"
                  >
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-[9px] font-black text-blue-500 uppercase tracking-widest">{sia.name}</span>
                      <div className={`w-1 h-1 rounded-full bg-${sia.color}-500 shadow-sm`} />
                    </div>
                    <p className="text-xs font-black text-slate-800 group-hover/item:text-blue-700 transition-colors uppercase italic">{sia.role}</p>
                    <p className="text-[8px] font-bold text-slate-400 uppercase tracking-tight truncate">{sia.fullName}</p>
                  </button>
                ))}
              </div>

              <div className="mt-4 p-4 bg-blue-50/50 rounded-xl border border-blue-100/50">
                <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest leading-relaxed italic">
                  Núcleo ERP Integrado • 2026
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Sección Login (Centro) */}
        <div className="w-full lg:col-span-4 flex items-center h-full">
          <div className="w-full bg-white rounded-3xl lg:rounded-[2rem] shadow-xl p-6 md:p-10 border border-gray-100 relative overflow-hidden h-full flex flex-col justify-center">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600" />

            <div className="flex justify-center mb-6">
              <img src={nexusLogo} alt="NEXUS C.A." className="h-20 w-auto object-contain" />
            </div>

            <div className="text-center mb-8">
              <h1 className="text-2xl font-black text-slate-900 tracking-tight uppercase italic mb-2">Acceso al <span className="text-blue-700">Sistema</span></h1>
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em]">Autenticación ERP Segura</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="username" className="text-[9px] font-black uppercase tracking-widest text-slate-500 ml-1">Usuario ERP</Label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                    <User size={18} />
                  </div>
                  <Input
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="usuario.erp@nexus.com"
                    className="pl-12 h-14 bg-slate-50/50 border-slate-100 rounded-xl font-black text-slate-900 text-sm focus:ring-blue-600 transition-all placeholder:text-slate-300"
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="password" className="text-[9px] font-black uppercase tracking-widest text-slate-500 ml-1">Pin de Seguridad</Label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                    <Lock size={18} />
                  </div>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="pl-12 h-14 bg-slate-50/50 border-slate-100 rounded-xl font-black text-slate-900 text-sm focus:ring-blue-600 transition-all placeholder:text-slate-300"
                    disabled={isLoading}
                  />
                </div>
              </div>

              {error && (
                <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-rose-600 bg-rose-50 p-4 rounded-xl border border-rose-100 animate-in fade-in slide-in-from-top-1">
                  <AlertCircle size={16} />
                  <span>{error}</span>
                </div>
              )}

              <Button type="submit" className="w-full h-14 bg-blue-700 hover:bg-slate-900 text-white font-black text-[10px] uppercase tracking-[0.3em] rounded-xl shadow-lg shadow-blue-100 transition-all active:scale-95 group mt-2" disabled={isLoading}>
                {isLoading ? <Loader2 className="animate-spin" size={18} /> : <span>Entrar al Portal →</span>}
              </Button>

              <div className="text-center text-[8px] font-black text-slate-300 uppercase tracking-[0.4em] pt-4">
                Nexus Integrated Security
              </div>
            </form>
          </div>
        </div>

        {/* Sección Panel Demo (Derecha) */}
        <div className="w-full lg:col-span-5 flex items-stretch">
          <div className="w-full bg-white/60 backdrop-blur-md rounded-3xl lg:rounded-[2rem] shadow-xl border border-white/50 h-full flex flex-col overflow-hidden max-h-[800px] lg:max-h-[660px]">
            <div className="p-5 lg:p-7 border-b border-white/50 bg-white/30">
              <h2 className="text-lg font-black text-slate-900 flex items-center gap-3 tracking-tight italic uppercase leading-tight">
                <div className="w-3 h-3 bg-blue-600 rounded-full animate-pulse shadow-md shadow-blue-200" />
                Acceso Directo por Nivel Jerárquico
              </h2>
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mt-1.5 px-1">
                Estructura Organizacional ERP Nexus
              </p>
            </div>

            <div className="flex-1 p-4 lg:p-5 overflow-y-auto custom-scrollbar">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                {DEMO_USERS.map((user) => (
                  <button
                    key={user.email}
                    onClick={() => handleQuickAccess(user.email, user.pass)}
                    className="flex flex-col text-left p-3.5 rounded-[1.25rem] border border-transparent bg-white/80 hover:border-blue-100 hover:shadow-xl hover:shadow-blue-50/20 transition-all group relative overflow-hidden active:scale-[0.98]"
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <div className={`w-1.5 h-1.5 rounded-full bg-${user.color}-500 shadow-sm`} />
                        <span className={`text-[7px] font-black px-2 py-1 rounded-lg uppercase tracking-widest ${user.level === 'Estratégico' ? 'bg-indigo-50 text-indigo-600' :
                          user.level === 'Gerencial' ? 'bg-blue-50 text-blue-600' :
                            'bg-slate-50 text-slate-600'
                          }`}>
                          {user.level}
                        </span>
                      </div>
                      <span className="text-[8px] text-slate-300 group-hover:text-blue-500 font-black">
                        {user.pass}
                      </span>
                    </div>
                    <span className="text-[13px] font-black text-slate-900 group-hover:text-blue-800 truncate uppercase tracking-tight line-clamp-1 italic">
                      {user.label}
                    </span>
                    <span className="text-[8px] font-black text-slate-400 truncate mt-0.5">{user.email}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="p-4 bg-slate-50 text-slate-400 text-[8px] font-black text-center uppercase tracking-[0.3em] border-t border-slate-100 mt-auto">
              Nexus Portal ERP • High Security Environment • 2026
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
