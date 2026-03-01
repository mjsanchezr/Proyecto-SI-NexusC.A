import { useState } from 'react';
import { Users, UserPlus, GraduationCap, ClipboardCheck, BarChart2, Calendar, ChevronRight, Search, HeartPulse, Sparkles } from 'lucide-react';
import { HRDetailModal } from './HRDetailModal';

export function HRManagerDashboard({ onNavigate }: { onNavigate?: (menu: string) => void }) {
    const today = new Date().toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    const [selectedDetail, setSelectedDetail] = useState<any | null>(null);

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* HR Command Center Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h2 className="text-sm font-black text-rose-600 uppercase tracking-widest mb-2 flex items-center gap-2">
                        <HeartPulse size={14} /> Gestión de Capital Humano
                    </h2>
                    <h1 className="text-4xl font-black text-gray-900 tracking-tight">Gerencia de RRHH</h1>
                    <p className="text-gray-500 font-medium mt-2 flex items-center gap-2">
                        <Calendar size={18} className="text-gray-400" />
                        {today.charAt(0).toUpperCase() + today.slice(1)}
                    </p>
                </div>
                <div className="flex flex-col sm:flex-row bg-white p-2 rounded-3xl sm:rounded-2xl border border-gray-100 shadow-sm gap-2 sm:gap-0">
                    <button
                        onClick={() => onNavigate?.('employees')}
                        className="w-full sm:w-auto px-6 py-2.5 bg-rose-600 text-white rounded-xl font-bold text-xs tracking-wider uppercase shadow-lg shadow-rose-100 transition-all text-center"
                    >
                        Plantilla
                    </button>
                    <button
                        onClick={() => onNavigate?.('employees')}
                        className="w-full sm:w-auto px-6 py-2.5 text-gray-400 font-bold text-xs tracking-wider uppercase hover:text-gray-600 sm:hover:bg-gray-50 rounded-xl transition-all text-center"
                    >
                        Reclasificación
                    </button>
                </div>
            </div>

            {/* Strategic HR Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <PremiumHRCard
                    title="Total Empleados"
                    value="250"
                    desc="Activos en Nómina"
                    icon={<Users size={24} />}
                    color="rose"
                    onClick={() => onNavigate?.('employees')}
                />
                <PremiumHRCard
                    title="Índice Retención"
                    value="94.2%"
                    desc="Anual Proyectado"
                    icon={<Sparkles size={24} />}
                    color="blue"
                    onClick={() => onNavigate?.('hr')}
                />
                <PremiumHRCard
                    title="Evaluaciones"
                    value="78%"
                    desc="Meta Q1 alcanzada"
                    icon={<ClipboardCheck size={24} />}
                    color="emerald"
                    onClick={() => setSelectedDetail({ type: 'employee', name: 'Evaluación Trimestral Q1', role: 'Global Dashboard', progress: '78%' })}
                />
                <PremiumHRCard
                    title="Vacantes"
                    value="12"
                    desc="4 URGENTES"
                    icon={<UserPlus size={24} />}
                    color="amber"
                    onClick={() => onNavigate?.('recruitment')}
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Organizational Distribution */}
                <div className="lg:col-span-2 bg-white p-6 lg:p-8 rounded-3xl lg:rounded-[2.5rem] shadow-xl shadow-gray-100 border border-gray-50 flex flex-col">
                    <div className="flex items-center justify-between mb-10">
                        <div>
                            <h3 className="text-xl font-black text-gray-800 tracking-tight">Estructura por Áreas</h3>
                            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mt-1">Carga Operativa y Headcount</p>
                        </div>
                        <div className="p-3 bg-gray-50 rounded-2xl">
                            <BarChart2 className="text-rose-600" size={20} />
                        </div>
                    </div>

                    <div className="space-y-8 flex-1">
                        <AreaProgressRow label="Ventas & Marketing" count={85} progress={85} color="bg-rose-500" />
                        <AreaProgressRow label="Operaciones & Planta" count={120} progress={60} color="bg-blue-500" />
                        <AreaProgressRow label="Administración & Finanzas" count={30} progress={45} color="bg-indigo-500" />
                        <AreaProgressRow label="Logística & Almacén" count={15} progress={90} color="bg-emerald-500" />
                    </div>
                </div>

                {/* Talent Academy & Hiring */}
                <div className="space-y-8">
                    <div className="bg-slate-900 p-6 lg:p-8 rounded-3xl lg:rounded-[2.5rem] shadow-2xl shadow-rose-900/10 text-white">
                        <h3 className="text-lg font-black mb-8 flex items-center gap-3">
                            <GraduationCap className="text-rose-400" size={22} /> Nexus Academy
                        </h3>
                        <div className="space-y-5">
                            <AcademyCourseItem
                                title="Inducción Corporativa"
                                participants={45}
                                status="Activo"
                                onClick={() => setSelectedDetail({ type: 'training', label: 'Inducción Corporativa', progress: '45%' })}
                            />
                            <AcademyCourseItem
                                title="Safety & Compliance"
                                participants={12}
                                status="Completado"
                                onClick={() => setSelectedDetail({ type: 'training', label: 'Safety & Compliance', progress: '100%' })}
                            />
                            <AcademyCourseItem
                                title="Leadership Basics"
                                participants={28}
                                status="Programado"
                                onClick={() => setSelectedDetail({ type: 'training', label: 'Leadership Basics', progress: '0%' })}
                            />
                        </div>
                        <button
                            onClick={() => onNavigate?.('training')}
                            className="w-full mt-8 py-3 bg-white/10 hover:bg-white/20 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all"
                        >
                            Ver Malla Curricular
                        </button>
                    </div>

                    <div className="bg-white p-6 lg:p-8 rounded-3xl lg:rounded-[2.5rem] shadow-xl shadow-gray-100 border border-gray-50">
                        <h4 className="text-sm font-black text-gray-800 mb-6 flex items-center gap-2">
                            Pipeline Selección <Search size={14} className="text-gray-400" />
                        </h4>
                        <div className="space-y-4">
                            <HiringStage
                                label="Sourcing"
                                count={24}
                                color="bg-blue-100 text-blue-600"
                                onClick={() => onNavigate?.('recruitment')}
                            />
                            <HiringStage
                                label="Entrevistas"
                                count={8}
                                color="bg-amber-100 text-amber-600"
                                onClick={() => setSelectedDetail({ type: 'job', title: 'Entrevistas de Canal', department: 'Operaciones' })}
                            />
                            <HiringStage
                                label="Oferta"
                                count={3}
                                color="bg-emerald-100 text-emerald-600"
                                onClick={() => onNavigate?.('recruitment')}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <HRDetailModal
                isOpen={!!selectedDetail}
                onClose={() => setSelectedDetail(null)}
                data={selectedDetail}
            />
        </div>
    );
}

function PremiumHRCard({ title, value, desc, icon, color, onClick }: any) {
    const accents: any = {
        rose: 'text-rose-600 bg-rose-50 shadow-rose-100',
        blue: 'text-blue-600 bg-blue-50 shadow-blue-100',
        emerald: 'text-emerald-600 bg-emerald-50 shadow-emerald-100',
        amber: 'text-amber-600 bg-amber-50 shadow-amber-100',
    };

    return (
        <div
            onClick={onClick}
            className={`bg-white p-6 lg:p-8 rounded-3xl lg:rounded-[2.25rem] shadow-xl shadow-gray-100 border border-gray-50 group transition-all duration-500 ${onClick ? 'cursor-pointer hover:-translate-y-2' : ''}`}
        >
            <div className={`w-14 h-14 rounded-2xl ${accents[color]} flex items-center justify-center mb-8 shadow-inner transition-transform group-hover:scale-110 duration-500`}>{icon}</div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{title}</p>
            <h3 className="text-3xl lg:text-4xl font-black text-gray-800 tracking-tighter">{value}</h3>
            <p className="text-[10px] font-bold text-gray-400 mt-2 uppercase tracking-wide truncate">{desc}</p>
        </div>
    );
}

function AreaProgressRow({ label, count, progress, color }: any) {
    return (
        <div>
            <div className="flex justify-between items-end mb-2">
                <div>
                    <p className="text-sm font-black text-gray-800 tracking-tight">{label}</p>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Capacidad Actual</p>
                </div>
                <div className="text-right">
                    <p className="text-sm font-black text-gray-900">{count}</p>
                    <p className="text-[9px] font-bold text-gray-400 uppercase">FTEs</p>
                </div>
            </div>
            <div className="w-full h-2 bg-gray-50 rounded-full overflow-hidden border border-gray-100">
                <div className={`h-full ${color} rounded-full transition-all duration-1000 shadow-[0_0_10px_rgba(0,0,0,0.05)]`} style={{ width: `${progress}%` }} />
            </div>
        </div>
    );
}

function AcademyCourseItem({ title, participants, status, onClick }: any) {
    return (
        <div className="group cursor-pointer" onClick={onClick}>
            <div className="flex justify-between items-start mb-2">
                <h4 className="text-xs font-black text-white group-hover:text-rose-400 transition-colors tracking-tight">{title}</h4>
                <ChevronRight size={14} className="text-gray-600 group-hover:text-rose-400 transition-colors" />
            </div>
            <div className="flex justify-between items-center text-[9px] font-bold text-gray-500 uppercase tracking-widest">
                <span>{participants} Inscritos</span>
                <span className={status === 'Completado' ? 'text-emerald-500' : 'text-blue-400'}>{status}</span>
            </div>
        </div>
    );
}

function HiringStage({ label, count, color, onClick }: any) {
    return (
        <div
            onClick={onClick}
            className={`flex items-center justify-between p-3 rounded-2xl bg-gray-50 border border-gray-50 hover:border-gray-100 transition-all ${onClick ? 'cursor-pointer hover:bg-gray-100' : ''}`}
        >
            <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest">{label}</span>
            <div className={`w-8 h-8 rounded-xl ${color} flex items-center justify-center font-black text-xs`}>
                {count}
            </div>
        </div>
    );
}

