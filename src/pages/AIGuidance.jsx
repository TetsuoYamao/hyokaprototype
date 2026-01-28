import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useMockData } from '../context/MockDataContext';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Bot, Check, ArrowLeft } from 'lucide-react';

export const AIGuidance = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { aiGuidance } = useMockData();

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <Button variant="ghost" icon={ArrowLeft} onClick={() => navigate(-1)} className="mb-2">戻る</Button>

            <div className="bg-indigo-600 rounded-2xl p-8 text-white shadow-xl bg-gradient-to-br from-indigo-600 to-violet-700">
                <div className="flex items-center gap-4 mb-6">
                    <div className="bg-white/20 p-3 rounded-full backdrop-blur">
                        <Bot size={32} />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold">{aiGuidance.title}</h2>
                        <p className="text-indigo-100 opacity-90">あなたの役割期待に基づくAIからのアドバイスです</p>
                    </div>
                </div>

                <div className="space-y-4">
                    {aiGuidance.points.map((point, i) => (
                        <div key={i} className="flex items-start gap-3 bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/10">
                            <Check className="mt-0.5 text-emerald-300 shrink-0" size={20} />
                            <span className="font-medium">{point}</span>
                        </div>
                    ))}
                </div>

                <div className="mt-8 pt-6 border-t border-white/20 flex justify-end">
                    <Button className="bg-white text-indigo-700 hover:bg-indigo-50 border-none" onClick={() => navigate(-1)}>
                        理解しました
                    </Button>
                </div>
            </div>
        </div>
    );
};
