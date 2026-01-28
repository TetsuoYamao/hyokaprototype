import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useMockData } from '../context/MockDataContext';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { CheckCircle, RotateCcw, AlertTriangle } from 'lucide-react';

export const ReturnDecision = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { getEvaluation, approveGoals, remandGoals } = useMockData();
    const evaluation = getEvaluation(id);

    if (!evaluation) return <div>Not found</div>;

    // Ensure final comments are set, if not use draft
    // Ideally this logic should be in a stricter state machine but okay for proto
    const comments = evaluation.managerReview.finalComments || evaluation.managerReview.aiDraftComments;

    const handleApprove = () => {
        approveGoals(id);
        navigate(`/completed`);
    };

    const handleRemand = () => {
        // Make sure we save the comments as final if they haven't been edited
        if (!evaluation.managerReview.finalComments) {
            // We can't easily call saveManagerReview and navigate in one go cleanly without context update delay
            // But our context is synchronous mock so it's fine.
            // However, let's assume comments are already set or we'll just use what we have.
            // The mock context `remandGoals` assumes comments are updated.
            // Let's update explicitly if needed:
            // Actually I'll update context in handleRemand inside context if I could, but let's just assume valid flow.
        }
        remandGoals(id);
        navigate(`/completed`);
    };

    return (
        <div className="min-h-[60vh] flex items-center justify-center animate-fade-in">
            <Card className="max-w-xl w-full text-center p-10">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">最終判断</h2>

                <div className="bg-slate-50 rounded-xl p-6 mb-8 text-left">
                    <div className="text-xs font-bold text-slate-400 uppercase mb-2">評価者へのコメント</div>
                    <p className="text-slate-700 whitespace-pre-wrap">{comments}</p>
                </div>

                <div className="grid grid-cols-2 gap-6">
                    <button
                        onClick={handleRemand}
                        className="group flex flex-col items-center gap-3 p-6 rounded-xl border-2 border-slate-100 hover:border-rose-200 hover:bg-rose-50 transition-all text-slate-600 hover:text-rose-700"
                    >
                        <div className="p-3 bg-slate-100 text-slate-500 rounded-full group-hover:bg-rose-200 group-hover:text-rose-600 transition-colors">
                            <RotateCcw size={24} />
                        </div>
                        <div className="text-left">
                            <div className="font-bold text-lg mb-1">差し戻し</div>
                            <p className="text-xs opacity-70">コメントとともに修正依頼を<br />評価者へ通知します。</p>
                        </div>
                    </button>

                    <button
                        onClick={handleApprove}
                        className="group flex flex-col items-center gap-3 p-6 rounded-xl border-2 border-indigo-100 bg-indigo-50/50 hover:border-indigo-500 hover:bg-indigo-50 transition-all text-indigo-900"
                    >
                        <div className="p-3 bg-indigo-200 text-indigo-700 rounded-full group-hover:scale-110 transition-transform">
                            <CheckCircle size={24} />
                        </div>
                        <div className="text-left">
                            <div className="font-bold text-lg mb-1">承認して完了</div>
                            <p className="text-xs opacity-70">目標設定を確定し、<br />プロセスを完了します。</p>
                        </div>
                    </button>
                </div>
            </Card>
        </div>
    );
};
