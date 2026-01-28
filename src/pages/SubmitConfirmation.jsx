import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useMockData } from '../context/MockDataContext';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Send, AlertCircle } from 'lucide-react';

export const SubmitConfirmation = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { getEvaluation, submitGoals } = useMockData();
    const evaluation = getEvaluation(id);

    if (!evaluation) return <div>Not found</div>;

    const totalWeight = evaluation.goals.reduce((sum, g) => sum + Number(g.weight), 0);
    const isValid = totalWeight === 100;

    const handleSubmit = () => {
        submitGoals(id);
        navigate('/');
    };

    return (
        <div className="min-h-[60vh] flex items-center justify-center animate-fade-in">
            <Card className="max-w-md w-full text-center p-8">
                <div className="w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Send className="text-indigo-600" size={32} />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">上司に提出しますか？</h2>
                <p className="text-slate-500 mb-8">提出後は修正できません。上司の承認待ちとなります。</p>

                <div className="bg-slate-50 rounded-lg p-4 mb-8 text-left space-y-2">
                    <div className="flex justify-between text-sm">
                        <span className="text-slate-500">目標数</span>
                        <span className="font-bold">{evaluation.goals.length}件</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-slate-500">期間</span>
                        <span className="font-bold">{evaluation.period}</span>
                    </div>
                    <div className="border-t border-slate-200 pt-2 flex justify-between text-sm">
                        <span className="text-slate-500">ウェイト合計</span>
                        <span className={`font-bold ${!isValid ? 'text-rose-600' : 'text-slate-900'}`}>{totalWeight}%</span>
                    </div>
                </div>

                {!isValid && (
                    <div className="flex items-center gap-2 text-rose-600 text-sm bg-rose-50 p-3 rounded-lg mb-6">
                        <AlertCircle size={16} />
                        <span>ウェイトの合計が100%になっていません</span>
                    </div>
                )}

                <div className="flex gap-4 justify-center">
                    <Button variant="ghost" onClick={() => navigate(-1)}>キャンセル</Button>
                    <Button variant="primary" disabled={!isValid} onClick={handleSubmit}>提出する</Button>
                </div>
            </Card>
        </div>
    );
};
