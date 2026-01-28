import React from 'react';
import { useMockData } from '../context/MockDataContext';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, ArrowRight } from 'lucide-react';

export const ManagerInbox = () => {
    const { data } = useMockData();
    const navigate = useNavigate();

    // Filter for submitted items or just show all for prototype
    const list = data.evaluationList; // In real app, filter by manager

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-800">承認トレイ（提出済み一覧）</h3>
            </div>

            <div className="grid gap-4">
                {list.map(evalItem => (
                    <Card key={evalItem.id} className="hover:border-indigo-200 transition-colors">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-emerald-50 text-emerald-600 rounded-lg">
                                    <CheckCircle size={24} />
                                </div>
                                <div>
                                    <div className="font-bold text-slate-900">{evalItem.employeeName}</div>
                                    <div className="text-sm text-slate-500 mt-0.5">{evalItem.period} 目標設定</div>
                                </div>
                            </div>

                            <div className="flex items-center gap-6">
                                <div>
                                    <Badge status={evalItem.status} />
                                </div>

                                {evalItem.status === '提出済み' && (
                                    <Button variant="primary" icon={ArrowRight} onClick={() => navigate(`/manager/review/${evalItem.id}/ai`)}>
                                        レビューを開始
                                    </Button>
                                )}
                                {evalItem.status !== '提出済み' && (
                                    <span className="text-sm text-slate-400">対応待ち / 完了</span>
                                )}
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};
