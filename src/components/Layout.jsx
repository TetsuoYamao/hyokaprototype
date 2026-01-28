import React from 'react';
import { useMockData } from '../context/MockDataContext';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { LayoutDashboard, List, User, LogOut, FileText, CheckCircle, RefreshCcw } from 'lucide-react';

export const Layout = () => {
    const { userRole, switchPersona, data } = useMockData();
    const location = useLocation();

    // Determine current active section for title
    const getPageTitle = () => {
        if (location.pathname === '/') return '評価一覧';
        if (location.pathname.includes('/manager')) return '上司：評価管理';
        return '期初目標設定';
    };

    return (
        <div className="flex h-screen bg-slate-50 text-slate-900 font-sans">
            {/* Sidebar */}
            <aside className="w-64 bg-slate-900 text-white flex flex-col shadow-xl z-10 transition-all duration-300">
                <div className="p-6 border-b border-slate-800">
                    <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                        EvalPro
                    </h1>
                    <p className="text-xs text-slate-400 mt-1">人事評価システム Prototype</p>
                </div>

                <nav className="flex-1 overflow-y-auto py-4">
                    <ul className="space-y-1 px-3">
                        <li>
                            <NavLink
                                to="/"
                                className={({ isActive }) =>
                                    `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${isActive ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/50' : 'text-slate-400 hover:text-white hover:bg-slate-800'
                                    }`
                                }
                            >
                                <List size={18} />
                                <span>評価一覧</span>
                            </NavLink>
                        </li>
                        {userRole === 'manager' && (
                            <li>
                                <NavLink
                                    to="/manager/inbox"
                                    className={({ isActive }) =>
                                        `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${isActive ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/50' : 'text-slate-400 hover:text-white hover:bg-slate-800'
                                        }`
                                    }
                                >
                                    <CheckCircle size={18} />
                                    <span>承認トレイ</span>
                                </NavLink>
                            </li>
                        )}
                    </ul>

                    <div className="mt-8 px-6">
                        <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Persona Switcher</div>
                        <div className="bg-slate-800 rounded-lg p-1 flex">
                            <button
                                onClick={() => switchPersona('employee')}
                                className={`flex-1 flex items-center justify-center py-1.5 rounded-md text-xs font-medium transition-all ${userRole === 'employee' ? 'bg-indigo-500 text-white shadow-sm' : 'text-slate-400 hover:text-slate-300'}`}
                            >
                                Me
                            </button>
                            <button
                                onClick={() => switchPersona('manager')}
                                className={`flex-1 flex items-center justify-center py-1.5 rounded-md text-xs font-medium transition-all ${userRole === 'manager' ? 'bg-emerald-500 text-white shadow-sm' : 'text-slate-400 hover:text-slate-300'}`}
                            >
                                Manager
                            </button>
                        </div>
                    </div>
                </nav>

                <div className="p-4 border-t border-slate-800 bg-slate-900/50">
                    <div className="flex items-center gap-3">
                        <img
                            src={userRole === 'employee' ? data.currentUser.avatar : `https://ui-avatars.com/api/?name=Manager+User&background=10b981&color=fff`}
                            alt="User"
                            className="w-9 h-9 rounded-full ring-2 ring-slate-700"
                        />
                        <div className="overflow-hidden">
                            <p className="text-sm font-medium truncate text-white">
                                {userRole === 'employee' ? data.currentUser.name : '上司 花子'}
                            </p>
                            <p className="text-xs text-slate-400 truncate">
                                {userRole === 'employee' ? '開発部' : '開発部長'}
                            </p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto bg-slate-50/50 relative">
                <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-slate-200/60 px-8 py-4 flex items-center justify-between shadow-sm">
                    <h2 className="text-xl font-bold text-slate-800">{getPageTitle()}</h2>
                    <div className="flex items-center gap-4">
                        {/* Header actions if any */}
                    </div>
                </header>

                <div className="p-8 max-w-5xl mx-auto animate-fade-in">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};
