import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useMockData } from '../context/MockDataContext';
import { GoalForm } from '../components/GoalForm';
import { Button } from '../components/Button';
import { Save } from 'lucide-react';

export const EmployeeGoalEdit = () => {
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
                <h2 className="text-2xl font-bold text-slate-900">目標の編集</h2>
            </div>

            <GoalForm goals={goals} onChange={setGoals} readOnly={false} />

            <div className="sticky bottom-6 bg-white/90 backdrop-blur border border-slate-200 p-4 rounded-xl shadow-lg flex justify-between items-center z-20">
                <Button variant="ghost" onClick={() => navigate(-1)}>キャンセル</Button>
                <Button variant="primary" icon={Save} onClick={handleSave}>保存して提出へ</Button>
            </div>
        </div>
    );
};
