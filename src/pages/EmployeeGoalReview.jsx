import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useMockData } from '../context/MockDataContext';
import { GoalForm } from '../components/GoalForm';
import { Button } from '../components/Button';
import { ArrowLeft, Edit2, Check } from 'lucide-react';

export const EmployeeGoalReview = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { getEvaluation } = useMockData();
    const evaluation = getEvaluation(id);

    if (!evaluation) return <div>Not found</div>;

    return (
        <div className="space-y-8 animate-fade-in max-w-4xl mx-auto">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-slate-900">目標の確認</h2>
                <Button variant="ghost" icon={ArrowLeft} onClick={() => navigate(-1)}>戻る</Button>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-100">
                <div className="mb-6 p-4 bg-indigo-50 text-indigo-800 rounded-lg text-sm">
                    以下の内容で設定します。修正が必要な場合は「修正する」を選択してください。
                </div>

                <GoalForm goals={evaluation.goals} readOnly={true} />

                <div className="flex justify-center gap-6 mt-10">
                    <Button variant="secondary" icon={Edit2} size="lg" onClick={() => navigate(`/sheet/${id}/edit`)}>
                        修正する
                    </Button>
                    <Button variant="primary" icon={Check} size="lg" onClick={() => navigate(`/sheet/${id}/submit`)}>
                        この内容で提出へ
                    </Button>
                </div>
            </div>
        </div>
    );
};
