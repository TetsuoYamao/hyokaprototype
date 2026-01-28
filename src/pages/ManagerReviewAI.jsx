import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useMockData } from '../context/MockDataContext';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { GoalForm } from '../components/GoalForm';
import { Sparkles, Loader2, ArrowRight } from 'lucide-react';

export const ManagerReviewAI = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { getEvaluation, saveManagerReview, aiReviewComments } = useMockData();
    const evaluation = getEvaluation(id);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
            // Pre-fill AI comments
            if (evaluation && !evaluation.managerReview.aiDraftComments) {
                saveManagerReview(id, { aiDraftComments: aiReviewComments });
            }
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    if (!evaluation) return <div>Not found</div>;

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full">
            <div className="lg:col-span-2 space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-slate-900">{evaluation.employeeName}さんの目標</h2>
                </div>
                <div className="bg-slate-50 p-1 rounded-xl">
                    <GoalForm goals={evaluation.goals} readOnly={true} />
                </div>
            </div>

            <div className="lg:col-span-1">
                <div className="sticky top-24 space-y-4">
                    <Card className="bg-indigo-600 text-white border-none shadow-xl">
                        <div className="flex items-center gap-2 mb-4">
                            <Sparkles className="text-indigo-200" />
                            <h3 className="font-bold">AIレビューアシスタント</h3>
                        </div>

                        {loading ? (
                            <div className="py-8 flex flex-col items-center justify-center">
                                <Loader2 className="animate-spin mb-2" />
                                <p className="text-sm opacity-80">目標ごとの品質を分析中...</p>
                            </div>
                        ) : (
                            <div className="animate-fade-in">
                                <p className="text-sm leading-relaxed opacity-90 mb-6 bg-white/10 p-3 rounded-lg border border-white/10">
                                    {evaluation.managerReview.aiDraftComments || aiReviewComments}
                                </p>
                                <Button
                                    className="w-full bg-white text-indigo-600 hover:bg-indigo-50"
                                    onClick={() => navigate(`/manager/review/${id}/comments`)}
                                >
                                    コメント案を確認へ
                                </Button>
                            </div>
                        )}
                    </Card>
                </div>
            </div>
        </div>
    );
};
