import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useMockData } from '../context/MockDataContext';
import { Button } from '../components/Button';
import { Edit2, ArrowRight } from 'lucide-react';

export const ManagerCommentReview = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { getEvaluation } = useMockData();
    const evaluation = getEvaluation(id);

    if (!evaluation) return <div>Not found</div>;

    return (
        <div className="max-w-2xl mx-auto space-y-8 animate-fade-in">
            <h2 className="text-2xl font-bold text-slate-900">コメント内容の確認</h2>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 relative">
                <div className="uppercase text-xs font-bold text-slate-400 mb-2">評価者へのコメント（AIドラフト）</div>
                <p className="text-slate-700 whitespace-pre-wrap leading-relaxed">
                    {evaluation.managerReview.aiDraftComments}
                </p>
            </div>

            <div className="flex gap-4 justify-center">
                <Button variant="secondary" icon={Edit2} onClick={() => navigate(`/manager/review/${id}/comments/edit`)}>
                    修正する
                </Button>
                <Button variant="primary" icon={ArrowRight} onClick={() => navigate(`/manager/review/${id}/decision`)}>
                    このまま進む
                </Button>
            </div>
        </div>
    );
};
