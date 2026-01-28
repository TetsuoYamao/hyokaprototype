import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useMockData } from '../context/MockDataContext';
import { Button } from '../components/Button';
import { Save } from 'lucide-react';

export const ManagerCommentEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { getEvaluation, saveManagerReview } = useMockData();
    const evaluation = getEvaluation(id);

    // Prefill with existing final comments or draft
    const [comments, setComments] = useState(evaluation ? (evaluation.managerReview.finalComments || evaluation.managerReview.aiDraftComments) : '');

    if (!evaluation) return <div>Not found</div>;

    const handleSave = () => {
        saveManagerReview(id, { finalComments: comments });
        navigate(`/manager/review/${id}/decision`);
    };

    return (
        <div className="max-w-2xl mx-auto space-y-8 animate-fade-in">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-slate-900">コメントの編集</h2>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <label className="block text-sm font-bold text-slate-700 mb-2">評価者へのフィードバック</label>
                <textarea
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                    className="w-full min-h-[200px] border border-slate-200 rounded-lg p-4 focus:ring-2 focus:ring-indigo-200 outline-none resize-y"
                    placeholder="ここにコメントを入力してください..."
                />
            </div>

            <div className="flex gap-4 justify-end">
                <Button variant="ghost" onClick={() => navigate(-1)}>キャンセル</Button>
                <Button variant="primary" icon={Save} onClick={handleSave}>
                    保存して判断へ
                </Button>
            </div>
        </div>
    );
};
