import React from 'react';
import { Card } from './Card';
import { Trash2, Plus } from 'lucide-react';
import { Button } from './Button';

export const GoalForm = ({ goals, onChange, readOnly = false }) => {

    const handleChange = (index, field, value) => {
        if (readOnly) return;
        const newGoals = [...goals];
        newGoals[index] = { ...newGoals[index], [field]: value };
        onChange(newGoals);
    };

    const handleDelete = (index) => {
        if (readOnly) return;
        const newGoals = goals.filter((_, i) => i !== index);
        onChange(newGoals);
    };

    const handleAdd = () => {
        if (readOnly) return;
        onChange([
            ...goals,
            { title: '', description: '', metric: '', targetValue: '', dueDate: '', weight: 0 }
        ]);
    };

    const totalWeight = goals.reduce((sum, g) => sum + Number(g.weight || 0), 0);

    return (
        <div className="space-y-6">
            {goals.map((goal, index) => (
                <Card key={index} className="relative group">
                    {!readOnly && (
                        <button
                            onClick={() => handleDelete(index)}
                            className="absolute top-4 right-4 text-slate-300 hover:text-rose-500 transition-colors"
                        >
                            <Trash2 size={18} />
                        </button>
                    )}

                    <div className="space-y-4">
                        <div className="flex gap-4">
                            <div className="flex-1 space-y-1">
                                <label className="text-xs font-bold text-slate-500 uppercase">目標タイトル</label>
                                {readOnly ? (
                                    <div className="font-bold text-lg text-slate-800 py-2">{goal.title}</div>
                                ) : (
                                    <input
                                        type="text"
                                        value={goal.title}
                                        onChange={(e) => handleChange(index, 'title', e.target.value)}
                                        className="w-full text-lg font-bold border-b border-slate-200 focus:border-indigo-500 outline-none py-1 bg-transparent placeholder:text-slate-300 transition-colors"
                                        placeholder="目標を入力..."
                                    />
                                )}
                            </div>
                            <div className="w-24 space-y-1">
                                <label className="text-xs font-bold text-slate-500 uppercase">ウェイト</label>
                                <div className="relative">
                                    {readOnly ? (
                                        <div className="font-bold text-lg text-slate-800 py-2 text-right">{goal.weight}%</div>
                                    ) : (
                                        <input
                                            type="number"
                                            value={goal.weight}
                                            onChange={(e) => handleChange(index, 'weight', e.target.value)}
                                            className="w-full text-lg font-bold border-b border-slate-200 focus:border-indigo-500 outline-none py-1 bg-transparent text-right pr-6 transition-colors"
                                        />
                                    )}
                                    <span className="absolute right-0 top-2 text-slate-400 font-bold">%</span>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-500 uppercase">詳細・達成基準</label>
                            {readOnly ? (
                                <div className="text-slate-700 py-2 whitespace-pre-wrap">{goal.description}</div>
                            ) : (
                                <textarea
                                    value={goal.description}
                                    onChange={(e) => handleChange(index, 'description', e.target.value)}
                                    className="w-full min-h-[80px] border border-slate-200 rounded-lg p-3 text-sm focus:ring-2 focus:ring-indigo-200 outline-none transition-shadow resize-none"
                                    placeholder="具体的な達成状態やアクションプランを記述..."
                                />
                            )}
                        </div>

                        <div className="grid grid-cols-3 gap-4 bg-slate-50 p-4 rounded-lg">
                            <div>
                                <label className="text-xs font-bold text-slate-400 uppercase block mb-1">定量指標</label>
                                {readOnly ? (
                                    <div className="font-medium text-slate-700">{goal.metric}</div>
                                ) : (
                                    <input
                                        type="text"
                                        value={goal.metric}
                                        onChange={(e) => handleChange(index, 'metric', e.target.value)}
                                        className="w-full bg-white border border-slate-200 rounded px-2 py-1 text-sm outline-none focus:border-indigo-400"
                                    />
                                )}
                            </div>
                            <div>
                                <label className="text-xs font-bold text-slate-400 uppercase block mb-1">ターゲット値</label>
                                {readOnly ? (
                                    <div className="font-medium text-slate-700">{goal.targetValue}</div>
                                ) : (
                                    <input
                                        type="text"
                                        value={goal.targetValue}
                                        onChange={(e) => handleChange(index, 'targetValue', e.target.value)}
                                        className="w-full bg-white border border-slate-200 rounded px-2 py-1 text-sm outline-none focus:border-indigo-400"
                                    />
                                )}
                            </div>
                            <div>
                                <label className="text-xs font-bold text-slate-400 uppercase block mb-1">期限</label>
                                {readOnly ? (
                                    <div className="font-medium text-slate-700">{goal.dueDate}</div>
                                ) : (
                                    <input
                                        type="date"
                                        value={goal.dueDate}
                                        onChange={(e) => handleChange(index, 'dueDate', e.target.value)}
                                        className="w-full bg-white border border-slate-200 rounded px-2 py-1 text-sm outline-none focus:border-indigo-400"
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </Card>
            ))}

            {!readOnly && (
                <Button variant="secondary" className="w-full border-dashed border-2 py-4 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 hover:border-indigo-300" icon={Plus} onClick={handleAdd}>
                    目標を追加する
                </Button>
            )}

            <div className={`flex items-center justify-end gap-2 p-4 rounded-lg ${totalWeight !== 100 ? 'bg-amber-50 text-amber-700' : 'bg-slate-100 text-slate-600'}`}>
                <span className="text-sm font-bold">合計ウェイト:</span>
                <span className={`text-xl font-bold ${totalWeight !== 100 ? 'text-amber-600' : 'text-slate-800'}`}>{totalWeight}%</span>
                {totalWeight !== 100 && <span className="text-xs ml-2 text-amber-600 font-medium">合計が100%になるように調整してください</span>}
            </div>
        </div>
    );
};
