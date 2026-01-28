import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { CheckCircle, Home } from 'lucide-react';
import { useMockData } from '../context/MockDataContext';

export const Completed = () => {
    const navigate = useNavigate();
    const { userRole } = useMockData();

    return (
        <div className="min-h-[60vh] flex items-center justify-center animate-fade-in">
            <Card className="max-w-md w-full text-center p-12">
                <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="text-emerald-600" size={48} />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">完了しました</h2>
                <p className="text-slate-500 mb-8">
                    {userRole === 'manager'
                        ? '処理が完了し、評価者に通知されました。'
                        : 'ステータスが更新されました。'}
                </p>

                <Button variant="primary" icon={Home} onClick={() => navigate('/')}>
                    一覧へ戻る
                </Button>
            </Card>
        </div>
    );
};
