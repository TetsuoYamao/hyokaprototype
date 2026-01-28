import React, { createContext, useContext, useState } from 'react';
import { seedData } from '../data/mockData';

const MockDataContext = createContext();

export const useMockData = () => useContext(MockDataContext);

export const MockDataProvider = ({ children }) => {
    const [data, setData] = useState(seedData);
    const [userRole, setUserRole] = useState(seedData.currentUser.role); // 'employee' or 'manager'

    // Helper to update specific evaluation
    const updateEvaluation = (id, updates) => {
        setData(prev => ({
            ...prev,
            evaluationList: prev.evaluationList.map(item =>
                item.id === id ? { ...item, ...updates } : item
            )
        }));
    };

    // Switch User Persona
    const switchPersona = (role) => {
        setUserRole(role);
        // In a real app we'd change auth token, here we just change the role
        // and maybe the name to reflect the persona if needed, but for now just role
    };

    const getEvaluation = (id) => data.evaluationList.find(e => e.id === id);

    const saveGoals = (evalId, goals) => {
        // Calculate total weight
        const totalWeight = goals.reduce((sum, g) => sum + Number(g.weight), 0);
        // You could validate here, but we'll do it in UI
        updateEvaluation(evalId, { goals, status: '作成中' });
    };

    const submitGoals = (evalId) => {
        updateEvaluation(evalId, {
            status: '提出済み',
            submittedAt: new Date().toISOString()
        });
    };

    const saveManagerReview = (evalId, reviewData) => {
        const currentEval = getEvaluation(evalId);
        updateEvaluation(evalId, {
            managerReview: { ...currentEval.managerReview, ...reviewData }
        });
    };

    const approveGoals = (evalId) => {
        const currentEval = getEvaluation(evalId);
        updateEvaluation(evalId, {
            status: '完了',
            managerReview: { ...currentEval.managerReview, decision: 'approved', reviewedAt: new Date().toISOString() }
        });
    };

    const remandGoals = (evalId) => {
        const currentEval = getEvaluation(evalId);
        updateEvaluation(evalId, {
            status: '差し戻し',
            managerReview: { ...currentEval.managerReview, decision: 'remanded', reviewedAt: new Date().toISOString() }
        });
    };

    const value = {
        data,
        userRole,
        switchPersona,
        getEvaluation,
        saveGoals,
        submitGoals,
        saveManagerReview,
        approveGoals,
        remandGoals,
        // Expose helpers from seed
        goalTemplates: data.goalTemplates,
        aiGuidance: data.aiGuidance,
        aiReviewComments: data.aiReviewComments
    };

    return (
        <MockDataContext.Provider value={value}>
            {children}
        </MockDataContext.Provider>
    );
};
