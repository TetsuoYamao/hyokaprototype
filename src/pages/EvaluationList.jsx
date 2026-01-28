import React from 'react';
import { useMockData } from '../context/MockDataContext';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, FileText } from 'lucide-react';

export const EvaluationList = () => {
    const { data, userRole } = useMockData();
    const navigate = useNavigate();

    const list = data.evaluationList;

    const handleOpen = (id) => {
        // If manager, check status to decide where to go? 
        // Actually the workflow says manager goes to Inbox.
        // But if they view the list, they might see their own eval?
        // For this prototype, we assume "Employee Persona" sees their own evals here.
        navigate(`/sheet/${id}`);
    };

    if (userRole === 'manager') {
        return (
            <div className="space-y-6">
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-amber-800 text-sm">
                    あなたは現在「上司」モードです。部下の評価を行うにはサイドバーの「承認トレイ」に移動してください。
                </div>
                <Card title="自分の評価目標">
                    <p className="text-slate-500 py-8 text-center">上司自身の目標設定データはこのプロトタイプには含まれていません。</p>
                </Card>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-800">2026年度 評価シート</h3>
            </div>

            <div className="grid gap-4">
                {list.map(evalItem => (
                    <Card key={evalItem.id} className="hover:border-indigo-200 transition-colors group">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-indigo-50 text-indigo-600 rounded-lg group-hover:bg-indigo-100 transition-colors">
                                    <FileText size={24} />
                                </div>
                                <div>
                                    <div className="font-bold text-slate-900">{evalItem.period} 目標設定</div>
                                    <div className="text-sm text-slate-500 mt-0.5">対象者: {evalItem.employeeName}</div>
                                </div>
                            </div>

                            <div className="flex items-center gap-6">
                                <div className="flex flex-col items-end gap-1">
                                    <Badge status={evalItem.status} />
                                    {evalItem.submittedAt && <span className="text-xs text-slate-400">提出: {new Date(evalItem.submittedAt).toLocaleDateString()}</span>}
                                </div>
                                <Button
                                    variant="secondary"
                                    onClick={() => handleOpen(evalItem.id)}
                                    className="group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-600 transition-all"
                                >
                                    開く
                                </Button>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};
