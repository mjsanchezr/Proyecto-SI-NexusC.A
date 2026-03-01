import { useState } from 'react';
import { DollarSign, PieChart, TrendingUp, AlertCircle, FileSpreadsheet } from 'lucide-react';
import {
    PieChart as RePieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend
} from 'recharts';
import { Button } from '@/app/components/ui/button';
import { AdjustBudgetModal } from './AdjustBudgetModal';
import { DeviationDetailModal } from './DeviationDetailModal';

const BUDGET_DATA = [
    { name: 'Operaciones', value: 450000, color: '#1e40af' },
    { name: 'Marketing', value: 120000, color: '#3b82f6' },
    { name: 'RRHH', value: 80000, color: '#8b5cf6' },
    { name: 'Tecnología', value: 150000, color: '#10b981' },
];

export function BudgetControlPage() {
    const [isAdjustModalOpen, setIsAdjustModalOpen] = useState(false);
    const [viewingDeviation, setViewingDeviation] = useState<any>(null);

    const DEVIATIONS = [
        {
            area: "Mantenimiento Valencia",
            diff: "+12%",
            status: "critical",
            reason: "Reparaciones de emergencia en flota de distribución tras incidentes climáticos."
        },
        {
            area: "Marketing Digital",
            diff: "-8%",
            status: "positive",
            reason: "Optimización de campañas publicitarias mediante el uso de IA y segmentación avanzada."
        },
        {
            area: "Suministros Oficina",
            diff: "+5%",
            status: "warning",
            reason: "Ajuste inflacionario imprevisto por parte de proveedores de papelería corporativa."
        },
        {
            area: "Tecnología e Infraestructura",
            diff: "+2%",
            status: "warning",
            reason: "Migración de servidores Q2 para mejorar la escalabilidad del sistema Nexus."
        }
    ];

    return (
        <div className="space-y-10 animate-in fade-in duration-500">
            {/* Header section with executive style */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h2 className="text-sm font-black text-blue-600 uppercase tracking-widest mb-2">Gobernanza Financiera</h2>
                    <h1 className="text-4xl font-black text-gray-900 tracking-tight">Control Presupuestario</h1>
                    <p className="text-gray-500 font-medium mt-2">Vigilancia estratégica de asignaciones y ejecución de capital corporativo.</p>
                </div>

                <Button
                    className="bg-slate-900 hover:bg-black text-white px-8 py-6 rounded-2xl shadow-xl shadow-gray-200 transition-all hover:-translate-y-1 font-black flex items-center gap-3"
                    onClick={() => setIsAdjustModalOpen(true)}
                >
                    <FileSpreadsheet size={20} />
                    Ajustar Asignaciones
                </Button>
            </div>

            {/* Stats Summary Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <BudgetStat title="Fondo Anual" value="$1.5M" trend="Total Auditado" icon={<DollarSign size={24} />} color="blue" />
                <BudgetStat title="Ejecutado Q1-Q2" value="$642K" trend="42.8% de meta" icon={<TrendingUp size={24} />} color="emerald" />
                <BudgetStat title="Remanente Operativo" value="$858K" trend="Disponible" icon={<PieChart size={24} />} color="purple" />
                <BudgetStat title="Riesgos Detectados" value="2" trend="Acción Urgente" icon={<AlertCircle size={24} />} color="red" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Visual Distribution Chart */}
                <div className="lg:col-span-2 bg-white p-6 lg:p-10 rounded-3xl lg:rounded-[2.5rem] shadow-xl shadow-gray-100 border border-gray-50 flex flex-col">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
                        <div>
                            <h3 className="text-xl font-black text-gray-800 tracking-tight">Distribución del Capital</h3>
                            <p className="text-xs text-gray-400 font-bold uppercase mt-1 tracking-widest">Desglose por área estratégica</p>
                        </div>
                        <div className="flex gap-2 p-1 bg-slate-50 rounded-xl">
                            <button className="px-4 py-1.5 bg-white shadow-sm rounded-lg text-[10px] font-black text-blue-600 uppercase tracking-wider">Actual</button>
                            <button className="px-4 py-1.5 text-[10px] font-black text-gray-400 uppercase tracking-wider">Histórico</button>
                        </div>
                    </div>

                    <div className="h-[400px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <RePieChart>
                                <Pie
                                    data={BUDGET_DATA}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={70}
                                    outerRadius={100}
                                    paddingAngle={10}
                                    dataKey="value"
                                    animationBegin={200}
                                    animationDuration={1500}
                                >
                                    {BUDGET_DATA.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                                    ))}
                                </Pie>
                                <Tooltip
                                    formatter={(val: number) => [`$${(val / 1000).toFixed(0)}k`, 'Asignación']}
                                    contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', padding: '15px', fontWeight: 'bold' }}
                                />
                                <Legend
                                    iconType="circle"
                                    layout="horizontal"
                                    verticalAlign="bottom"
                                    align="center"
                                    formatter={(value: any) => <span className="text-[10px] sm:text-sm font-black text-gray-600 uppercase tracking-wider ml-1 sm:ml-2">{value}</span>}
                                />
                            </RePieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Tracking Deviations List */}
                <div className="bg-white p-6 lg:p-10 rounded-3xl lg:rounded-[2.5rem] shadow-xl shadow-gray-100 border border-gray-50">
                    <div className="flex items-center justify-between mb-10">
                        <h3 className="text-xl font-black text-gray-800 tracking-tight">Alertas de Ejecución</h3>
                        <ActivityTrackerBadge />
                    </div>

                    <div className="space-y-8">
                        {DEVIATIONS.map((dev, idx) => (
                            <DeviationItem
                                key={idx}
                                {...dev}
                                onClick={() => setViewingDeviation(dev)}
                            />
                        ))}
                    </div>

                    <Button variant="outline" className="w-full mt-10 p-6 border-2 border-slate-100 text-slate-800 rounded-2xl font-black text-sm hover:bg-slate-50 transition-all">
                        Generar Informe de Auditoría
                    </Button>
                </div>
            </div>

            {/* Modals */}
            <AdjustBudgetModal
                isOpen={isAdjustModalOpen}
                onClose={() => setIsAdjustModalOpen(false)}
            />

            <DeviationDetailModal
                isOpen={!!viewingDeviation}
                onClose={() => setViewingDeviation(null)}
                deviation={viewingDeviation}
            />
        </div>
    );
}

function BudgetStat({ title, value, trend, icon, color }: any) {
    const colorMap: any = {
        blue: 'bg-blue-600 text-white',
        emerald: 'bg-emerald-600 text-white',
        purple: 'bg-purple-600 text-white',
        red: 'bg-red-600 text-white'
    };

    return (
        <div className="bg-white p-6 lg:p-8 rounded-3xl lg:rounded-[2rem] shadow-xl shadow-gray-100 border border-gray-50 flex flex-col group hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
                <div className={`p-4 rounded-2xl ${colorMap[color]} shadow-lg shadow-${color}-100 transition-transform group-hover:scale-110`}>
                    {icon}
                </div>
                <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest leading-none bg-slate-50 px-3 py-1.5 rounded-full ring-1 ring-slate-100">{trend}</span>
            </div>
            <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">{title}</p>
            <h3 className="text-3xl font-black text-gray-900 tracking-tighter">{value}</h3>
        </div>
    );
}

function DeviationItem({ area, diff, status, reason, onClick }: any) {
    const statusConfig: any = {
        critical: 'bg-rose-50 text-rose-600 ring-rose-100',
        warning: 'bg-amber-50 text-amber-600 ring-amber-100',
        positive: 'bg-emerald-50 text-emerald-600 ring-emerald-100'
    };

    return (
        <div className="space-y-3 group cursor-pointer" onClick={onClick}>
            <div className="flex items-center justify-between">
                <h4 className="text-sm font-black text-gray-800 tracking-tight group-hover:text-blue-600 transition-colors uppercase">{area}</h4>
                <span className={`text-[10px] font-black px-3 py-1 rounded-full ring-1 ${statusConfig[status]}`}>
                    {status === 'critical' ? '↑ ' : status === 'positive' ? '↓ ' : '↑ '}{diff}
                </span>
            </div>
            <p className="text-xs text-gray-500 font-medium leading-relaxed bg-slate-50 p-4 rounded-2xl border border-transparent group-hover:border-slate-100 transition-all italic">
                "{reason}"
            </p>
        </div>
    );
}

function ActivityTrackerBadge() {
    return (
        <div className="flex items-center gap-2 bg-emerald-50 px-3 py-1.5 rounded-full ring-1 ring-emerald-100">
            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-[9px] font-black text-emerald-700 uppercase tracking-widest">Monitoreo Activo</span>
        </div>
    );
}
