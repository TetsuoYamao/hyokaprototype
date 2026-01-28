import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { EvaluationList } from './pages/EvaluationList';
import { EvaluationSheet } from './pages/EvaluationSheet';
import { AIGuidance } from './pages/AIGuidance';
import { AIGoalDraft } from './pages/AIGoalDraft';
import { EmployeeGoalReview } from './pages/EmployeeGoalReview';
import { EmployeeGoalEdit } from './pages/EmployeeGoalEdit';
import { SubmitConfirmation } from './pages/SubmitConfirmation';
import { EmployeeRevision } from './pages/EmployeeRevision';

import { ManagerInbox } from './pages/ManagerInbox';
import { ManagerReviewAI } from './pages/ManagerReviewAI';
import { ManagerCommentReview } from './pages/ManagerCommentReview';
import { ManagerCommentEdit } from './pages/ManagerCommentEdit';
import { ReturnDecision } from './pages/ReturnDecision';
import { Completed } from './pages/Completed';
import { GenericScreen } from './pages/GenericScreen';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<EvaluationList />} />

          {/* Employee Flow */}
          <Route path="sheet/:id" element={<EvaluationSheet />} />
          <Route path="sheet/:id/ai-guidance" element={<AIGuidance />} />
          <Route path="sheet/:id/ai-draft" element={<AIGoalDraft />} />
          <Route path="sheet/:id/review" element={<EmployeeGoalReview />} />
          <Route path="sheet/:id/edit" element={<EmployeeGoalEdit />} />
          <Route path="sheet/:id/submit" element={<SubmitConfirmation />} />
          <Route path="sheet/:id/revise" element={<EmployeeRevision />} />

          {/* Manager Flow */}
          <Route path="manager/inbox" element={<ManagerInbox />} />
          <Route path="manager/review/:id/ai" element={<ManagerReviewAI />} />
          <Route path="manager/review/:id/comments" element={<ManagerCommentReview />} />
          <Route path="manager/review/:id/comments/edit" element={<ManagerCommentEdit />} />
          <Route path="manager/review/:id/decision" element={<ReturnDecision />} />

          <Route path="completed" element={<Completed />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
