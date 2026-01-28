import React from 'react';

export const Card = ({ children, className = '', title, action, ...props }) => {
    return (
        <div className={`bg-white rounded-xl border border-slate-100 shadow-sm transition-shadow hover:shadow-md ${className}`} {...props}>
            {(title || action) && (
                <div className="px-6 py-4 border-b border-slate-50 flex items-center justify-between">
                    {title && <h3 className="font-bold text-slate-800 text-lg">{title}</h3>}
                    {action && <div>{action}</div>}
                </div>
            )}
            <div className="p-6">
                {children}
            </div>
        </div>
    );
};
