import React from 'react';
import { useParams } from 'react-router-dom';

export const GenericScreen = ({ title }) => {
    const params = useParams();
    return (
        <div className="p-10 text-center border-2 border-dashed border-slate-200 rounded-xl">
            <h2 className="text-2xl font-bold text-slate-300">{title}</h2>
            <p className="text-slate-400 mt-2">ID: {params.id}</p>
            <p className="text-slate-400">Implementation in progress...</p>
        </div>
    );
};
