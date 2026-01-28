import React from 'react';

export const Badge = ({ status }) => {
    const styles = {
        '未作成': 'bg-slate-100 text-slate-600',
        '作成中': 'bg-blue-50 text-blue-700 border-blue-200',
        '提出済み': 'bg-indigo-50 text-indigo-700 border-indigo-200',
        '差し戻し': 'bg-rose-50 text-rose-700 border-rose-200',
        '完了': 'bg-emerald-50 text-emerald-700 border-emerald-200',
    };

    const icons = {
        '未作成': null,
        '作成中': null,
        '提出済み': '🚀',
        '差し戻し': '↩️',
        '完了': '✅',
    };

    const style = styles[status] || 'bg-gray-100 text-gray-800';

    return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${style.includes('border') ? '' : 'border-transparent'} ${style}`}>
            {icons[status] && <span>{icons[status]}</span>}
            {status}
        </span>
    );
};
