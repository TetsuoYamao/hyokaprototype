export const seedData = {
  currentUser: {
    id: "employee",
    name: "山尾 哲夫",
    role: "employee", // or 'manager'
    avatar: "https://ui-avatars.com/api/?name=Tetsuo+Yamao&background=random"
  },
  evaluationList: [
    {
      id: "ES-2026-H1",
      period: "2026年上期",
      employeeName: "山尾 哲夫",
      status: "未作成",
      submittedAt: null,
      goals: [], // Initially empty
      managerReview: {
        aiDraftComments: "",
        finalComments: "",
        decision: null,
        reviewedAt: null
      }
    }
  ],
  goalTemplates: [
    {
      id: "tmpl-1",
      title: "契約審査のリードタイム短縮",
      description: "依頼〜一次回答までの平均リードタイムを短縮する。",
      metric: "平均リードタイム（営業日）",
      targetValue: "現状比 -20%",
      dueDate: "2026-06-30",
      weight: 40
    },
    {
      id: "tmpl-2",
      title: "レビュー品質の安定化",
      description: "差し戻し率の低減と、指摘の再発防止を行う。",
      metric: "差し戻し率 / 再発件数",
      targetValue: "差し戻し率 -10% / 再発 0",
      dueDate: "2026-06-30",
      weight: 30
    },
    {
      id: "tmpl-3",
      title: "ナレッジ整備",
      description: "頻出論点のガイドライン化と共有を進める。",
      metric: "公開ナレッジ数 / 利用回数",
      targetValue: "10件 / 月30回利用",
      dueDate: "2026-06-30",
      weight: 30
    }
  ],
  aiGuidance: {
    title: "期初目標設定のポイント（AIアドバイス）",
    points: [
      "成果指標（KPI）を明確にする",
      "期限と達成基準を具体化する",
      "重み付けの合計を100%にする",
      "上位目標/チーム目標との整合性を確認する"
    ]
  },
  aiReviewComments: "（AI生成）目標1の「リードタイム短縮」について：現状の数値と達成基準が具体的で良いですが、短縮のための具体的なアクションプラン（例：一次回答の自動化範囲拡大など）を備考に追記すると、達成可能性の根拠が強まります。目標2の「差し戻し率」は、計測方法を明確にしておきましょう。"
};
