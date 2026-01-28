import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useMockData } from '../context/MockDataContext';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Sparkles, Loader2, ArrowRight } from 'lucide-react';

export const AIGoalDraft = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { goalTemplates, saveGoals } = useMockData();
    const [loading, setLoading] = useState(true);

    // Simulate AI generation delay
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1500);
        return () => clearTimeout(timer);
    }, []);

    const handleApply = () => {
        saveGoals(id, goalTemplates);
        navigate(`/sheet/${id}/review`);
    };

    if (loading) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center animate-fade-in">
                <Loader2 className="animate-spin text-indigo-500 mb-4" size={48} />
                <h2 className="text-xl font-bold text-slate-800">AIが目標案を生成中...</h2>
                <p className="text-slate-500 mt-2">過去の評価データと役割定義を分析しています</p>
            </div>
        );
    }

    return (
        <div className="space-y-6 max-w-4xl mx-auto animate-fade-in">
            <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg">
                    <Sparkles size={24} />
                </div>
                <div>
                    <h2 className="text-xl font-bold text-slate-900">AIが生成した目標案</h2>
                    <p className="text-slate-500 text-sm">以下の目標案が提案されました。内容を確認し、採用してください。</p>
                </div>
            </div>

            <div className="grid gap-4">
                {goalTemplates.map((goal, idx) => (
                    <Card key={idx} className="border-l-4 border-l-indigo-500">
                        <div className="flex justify-between items-start mb-2">
                            <h4 className="font-bold text-lg text-slate-800">{goal.title}</h4>
                            <span className="bg-indigo-50 text-indigo-700 px-2 py-1 rounded text-xs font-bold">{goal.weight}%</span>
                        </div>
                        <p className="text-slate-600 text-sm mb-3">{goal.description}</p>
                        <div className="grid grid-cols-3 gap-4 bg-slate-50 p-3 rounded-lg text-sm">
                            <div>
                                <span className="block text-xs text-slate-400 font-semibold uppercase">指標</span>
                                <span className="font-medium text-slate-700">{goal.metric}</span>
                            </div>
                            <div>
                                <span className="block text-xs text-slate-400 font-semibold uppercase">ターゲット</span>
                                <span className="font-medium text-slate-700">{goal.targetValue}</span>
                            </div>
                            <div>
                                <span className="block text-xs text-slate-400 font-semibold uppercase">期限</span>
                                <span className="font-medium text-slate-700">{goal.dueDate}</span>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            <div className="flex justify-end pt-6">
                <Button variant="primary" size="lg" icon={ArrowRight} onClick={handleApply}>
                    この案を採用して確認へ
                </Button>
            </div>
        </div>
    );
};
