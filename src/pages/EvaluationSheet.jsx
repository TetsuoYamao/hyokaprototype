import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useMockData } from '../context/MockDataContext';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';
import { Card } from '../components/Card';
import { Sparkles, BookOpen, Plus, Send } from 'lucide-react';

export const EvaluationSheet = () => {
    const { id } = useParams();
    const { getEvaluation } = useMockData();
    const navigate = useNavigate();

    const evaluation = getEvaluation(id);

    if (!evaluation) return <div>Data not found</div>;

    const hasGoals = evaluation.goals && evaluation.goals.length > 0;

    return (
        <div className="space-y-8 animate-fade-in">
            <div className="flex items-center justify-between">
                <div>
                    <div className="flex items-center gap-3">
                        <h2 className="text-2xl font-bold text-slate-900">期初目標設定</h2>
                        <Badge status={evaluation.status} />
                    </div>
                    <p className="text-slate-500 mt-1">{evaluation.period} - {evaluation.employeeName}</p>
                </div>

                <div className="flex gap-3">
                    <Button variant="secondary" icon={BookOpen} onClick={() => navigate('ai-guidance')}>AIガイダンス</Button>
                    {!hasGoals && <Button variant="primary" icon={Sparkles} onClick={() => navigate('ai-draft')}>AIで目標案を作成</Button>}
                </div>
            </div>

            {!hasGoals ? (
                <Card className="py-20 flex flex-col items-center justify-center text-center border-dashed border-2 border-slate-200 shadow-none">
                    <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                        <Sparkles className="text-indigo-400" size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 mb-2">目標がまだ設定されていません</h3>
                    <p className="text-slate-500 max-w-md mb-8">AIを使ってあなたの役割に合わせた目標案を作成するか、<br />手動で目標を入力してください。</p>
                    <div className="flex gap-4">
                        <Button onClick={() => navigate('ai-draft')}>AIで案を作成する</Button>
                        <Button variant="secondary" icon={Plus}>手動で作成</Button>
                    </div>
                </Card>
            ) : (
                <div className="space-y-6">
                    {/* Summary of goals */}
                    <div className="grid gap-4">
                        {evaluation.goals.map((goal, idx) => (
                            <Card key={goal.id || idx} className="hover:border-indigo-200">
                                <div className="flex justify-between items-start mb-2">
                                    <h4 className="font-bold text-lg text-slate-800">{goal.title}</h4>
                                    <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded text-xs font-bold">{goal.weight}%</span>
                                </div>
                                <p className="text-slate-600 text-sm mb-3">{goal.description}</p>
                                <div className="flex gap-6 text-sm text-slate-500">
                                    <div className="flex flex-col">
                                        <span className="text-xs uppercase font-semibold text-slate-400">指標</span>
                                        <span>{goal.metric}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-xs uppercase font-semibold text-slate-400">ターゲット</span>
                                        <span>{goal.targetValue}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-xs uppercase font-semibold text-slate-400">期限</span>
                                        <span>{goal.dueDate}</span>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>

                    <div className="flex justify-end gap-4 border-t border-slate-200 pt-6">
                        <Button variant="secondary" onClick={() => navigate('review')}>修正する</Button>
                        <Button variant="primary" icon={Send} onClick={() => navigate('submit')}>提出確認へ</Button>
                    </div>

                    {/* If remanded, show comments */}
                    {evaluation.status === '差し戻し' && (
                        <div className="bg-rose-50 border border-rose-200 rounded-xl p-6">
                            <h4 className="font-bold text-rose-800 mb-2">差し戻しコメント</h4>
                            <p className="text-rose-700">{evaluation.managerReview.finalComments}</p>
                            <div className="mt-4">
                                <Button variant="danger" size="sm" onClick={() => navigate('revise')}>修正して再提出</Button>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};
