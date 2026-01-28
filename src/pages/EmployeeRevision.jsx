import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useMockData } from '../context/MockDataContext';
import { GoalForm } from '../components/GoalForm';
import { Button } from '../components/Button';
import { Save, AlertTriangle } from 'lucide-react';

export const EmployeeRevision = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { getEvaluation, saveGoals } = useMockData();
    const evaluation = getEvaluation(id);

    const [goals, setGoals] = useState(evaluation ? [...evaluation.goals] : []);

    if (!evaluation) return <div>Not found</div>;

    const handleSave = () => {
        saveGoals(id, goals);
        navigate(`/sheet/${id}/submit`);
    };

    return (
        <div className="space-y-8 animate-fade-in max-w-4xl mx-auto">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-slate-900">差し戻し対応</h2>
            </div>

            <div className="bg-rose-50 border border-rose-200 rounded-xl p-6 flex gap-4">
                <div className="text-rose-500 shrink-0">
                    <AlertTriangle />
                </div>
                <div>
                    <h4 className="font-bold text-rose-800 mb-2">上司からのコメント</h4>
                    <p className="text-rose-700 whitespace-pre-wrap">{evaluation.managerReview.finalComments}</p>
                </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
                <h3 className="font-bold text-lg mb-4">目標の修正</h3>
                <GoalForm goals={goals} onChange={setGoals} readOnly={false} />
            </div>

            <div className="sticky bottom-6 bg-white/90 backdrop-blur border border-slate-200 p-4 rounded-xl shadow-lg flex justify-between items-center z-20">
                <Button variant="ghost" onClick={() => navigate(-1)}>キャンセル</Button>
                <Button variant="primary" icon={Save} onClick={handleSave}>修正して再提出へ</Button>
            </div>
        </div>
    );
};
