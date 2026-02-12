// ========================================
// THE ALIGNMENT TRAIL — Events & Initiatives
// ========================================

// --- Initiatives (Projects to align on) ---
const INITIATIVES = [
  {
    id: 'api_redesign',
    name: 'API Redesign',
    description: 'Modernize the core API. Engineering wants it. Sales needs backwards compatibility.',
    size: 'large',
    baseWeeks: 8,
    baseEnergy: 8,
    baseInfluence: 25
  },
  {
    id: 'mobile_app',
    name: 'Mobile App Launch',
    description: 'Build native mobile apps. Marketing is excited. Engineering is stretched thin.',
    size: 'large',
    baseWeeks: 10,
    baseEnergy: 10,
    baseInfluence: 30
  },
  {
    id: 'pricing_change',
    name: 'Pricing Model Change',
    description: 'Move from seats to usage-based. Finance loves it. Customer Success is worried.',
    size: 'medium',
    baseWeeks: 5,
    baseEnergy: 6,
    baseInfluence: 20
  },
  {
    id: 'design_system',
    name: 'Unified Design System',
    description: 'One design language across products. Design wants it. PMs see it as overhead.',
    size: 'medium',
    baseWeeks: 6,
    baseEnergy: 5,
    baseInfluence: 18
  },
  {
    id: 'analytics_platform',
    name: 'Analytics Platform',
    description: 'Better product analytics. Data team is eager. Privacy/Legal has concerns.',
    size: 'medium',
    baseWeeks: 5,
    baseEnergy: 7,
    baseInfluence: 22
  },
  {
    id: 'onboarding_revamp',
    name: 'Onboarding Revamp',
    description: 'Improve new user experience. Growth team priority. Engineering sees it as "just UI".',
    size: 'small',
    baseWeeks: 3,
    baseEnergy: 4,
    baseInfluence: 12
  },
  {
    id: 'enterprise_features',
    name: 'Enterprise Features',
    description: 'SSO, audit logs, admin controls. Sales is desperate. Engineering says it\'s boring.',
    size: 'large',
    baseWeeks: 9,
    baseEnergy: 9,
    baseInfluence: 28
  },
  {
    id: 'performance_optimization',
    name: 'Performance Optimization',
    description: 'Make the app 2x faster. Engineering wants it. Leadership asks "where\'s the revenue?"',
    size: 'medium',
    baseWeeks: 4,
    baseEnergy: 5,
    baseInfluence: 15
  },
  {
    id: 'integrations_marketplace',
    name: 'Integrations Marketplace',
    description: 'Let partners build on your platform. Partnerships loves it. Security is cautious.',
    size: 'large',
    baseWeeks: 12,
    baseEnergy: 11,
    baseInfluence: 35
  },
  {
    id: 'accessibility_audit',
    name: 'Accessibility Compliance',
    description: 'Make product WCAG compliant. Legal requires it. Some PMs see it as a tax.',
    size: 'small',
    baseWeeks: 3,
    baseEnergy: 4,
    baseInfluence: 10
  },
  {
    id: 'ai_features',
    name: 'AI-Powered Features',
    description: 'Add AI/ML capabilities. CEO is excited. Engineering warns about complexity.',
    size: 'large',
    baseWeeks: 10,
    baseEnergy: 12,
    baseInfluence: 32
  },
  {
    id: 'notification_system',
    name: 'Smart Notifications',
    description: 'Revamp how users get notified. Users complain about spam. Growth wants more touchpoints.',
    size: 'small',
    baseWeeks: 2,
    baseEnergy: 3,
    baseInfluence: 8
  }
];

// --- Events ---
const EVENTS = [
  // === STAKEHOLDER CONFLICTS ===
  {
    id: 'sales_vs_eng',
    type: 'conflict',
    title: 'Sales vs Engineering',
    text: 'Sales promised a custom feature to close a deal. Engineering says it\'ll derail the roadmap. Both are looking at you to decide.',
    choices: [
      {
        label: 'Side with Sales — deliver the custom feature',
        hint: 'Keep revenue happy, frustrate engineering',
        effects: { energy: -10, momentum: -5, savings: 2000 },
        result: 'Sales closes the deal. Engineering grumbles but builds it. You gained revenue but lost some technical respect.'
      },
      {
        label: 'Side with Engineering — stick to the roadmap',
        hint: 'Protect product vision, risk revenue',
        effects: { energy: -5, momentum: 5 },
        result: 'Engineering appreciates your support. Sales is frustrated but respects the boundary. The deal stalls.'
      },
      {
        label: 'Find a middle ground — scope it down',
        hint: 'Compromise, takes more energy',
        effects: { energy: -15, momentum: 3, savings: 1000 },
        result: 'You spend hours negotiating. Sales gets a lighter version. Engineering builds something maintainable. Everyone\'s slightly annoyed but it works.'
      }
    ]
  },
  
  {
    id: 'exec_pivot',
    type: 'disruption',
    title: 'Executive Pivot',
    text: 'Your VP just came back from a conference with a "game-changing idea". They want to reprioritize everything. Your current initiative is at risk.',
    choices: [
      {
        label: 'Defend your current initiative',
        hint: 'Stand your ground, could backfire',
        effects: { energy: -12, momentum: -8 },
        result: 'You push back with data and customer feedback. The VP isn\'t thrilled but backs down. You kept your initiative but spent political capital.'
      },
      {
        label: 'Pivot immediately to the new idea',
        hint: 'Show flexibility, lose momentum',
        effects: { energy: -8, momentum: -15 },
        result: 'You pivot fast. The VP is happy. Your team is confused and demoralized. The old work feels wasted.'
      },
      {
        label: 'Propose a pilot to test the new idea',
        hint: 'Buy time, requires energy',
        effects: { energy: -10, momentum: 2 },
        result: 'You suggest a small experiment first. The VP agrees. You bought time to validate (or invalidate) the idea before committing.'
      }
    ]
  },

  {
    id: 'design_disagreement',
    type: 'conflict',
    title: 'Design vs Data',
    text: 'Your designer wants a bold new UI. Your data analyst says the current design converts better. The team is split.',
    choices: [
      {
        label: 'Go with the designer\'s vision',
        hint: 'Trust craft over metrics',
        effects: { energy: -6, momentum: 5 },
        result: 'You ship the new design. It\'s beautiful. Conversion drops 3% initially but recovers over time. Design team feels valued.'
      },
      {
        label: 'Stick with what the data says',
        hint: 'Play it safe',
        effects: { energy: -4, momentum: -3 },
        result: 'You keep the old design. Conversion stays stable. The designer feels unheard and starts looking for other jobs.'
      },
      {
        label: 'Run an A/B test',
        hint: 'Let users decide, takes time',
        effects: { energy: -8, momentum: 0 },
        result: 'You set up a proper test. It takes 2 weeks but gives you clear data. The team trusts the process even if their idea loses.'
      }
    ]
  },

  // === ORGANIZATIONAL CHAOS ===
  {
    id: 'reorg_announcement',
    type: 'disruption',
    title: 'Surprise Reorg',
    text: 'The company is reorganizing. Your team might report to a different VP. Priorities might shift. Everyone is anxious.',
    choices: [
      {
        label: 'Keep pushing forward like nothing changed',
        hint: 'Maintain momentum, risky',
        effects: { energy: -8, momentum: 5 },
        result: 'You keep the team focused on shipping. It works — you deliver before the chaos hits. But you didn\'t build relationships with the new leadership.'
      },
      {
        label: 'Pause and build relationships with new leaders',
        hint: 'Political move, lose time',
        effects: { energy: -10, momentum: -8 },
        result: 'You spend weeks in 1-on-1s with new stakeholders. Progress stalls but you\'re positioned well for the new structure.'
      }
    ]
  },

  {
    id: 'budget_cuts',
    type: 'disruption',
    title: 'Budget Freeze',
    text: 'Finance just announced a hiring freeze and budget cuts. Your team was counting on two new engineers.',
    choices: [
      {
        label: 'Cut scope to match capacity',
        hint: 'Realistic but disappointing',
        effects: { energy: -6, momentum: -10 },
        result: 'You descope the initiative. The team is disappointed but appreciates the honesty. You ship something smaller.'
      },
      {
        label: 'Push the team to do more with less',
        hint: 'Risky for morale',
        effects: { energy: -15, momentum: 5 },
        result: 'You rally the team to work harder. Some people burn out. Others rise to the challenge. It\'s a mixed outcome.'
      },
      {
        label: 'Negotiate for contractors or agencies',
        hint: 'Creative solution, takes energy',
        effects: { energy: -12, momentum: 0, savings: -1500 },
        result: 'You find a workaround with contract help. It costs you personally but keeps the initiative on track.'
      }
    ]
  },

  {
    id: 'key_person_leaves',
    type: 'disruption',
    title: 'Key Person Quits',
    text: 'Your best engineer just gave notice. They were the technical lead on your initiative. The team is shaken.',
    choices: [
      {
        label: 'Pause the initiative until you backfill',
        hint: 'Safe but slow',
        effects: { energy: -5, momentum: -12 },
        result: 'You hit pause. The team is relieved but momentum dies. It takes 6 weeks to hire a replacement.'
      },
      {
        label: 'Promote someone internally to fill the gap',
        hint: 'Risky but empowering',
        effects: { energy: -8, momentum: 3 },
        result: 'You promote a mid-level engineer. They\'re nervous but step up. The team rallies around them. It works out.'
      },
      {
        label: 'Take on more technical work yourself',
        hint: 'Heroic but exhausting',
        effects: { energy: -20, momentum: 5 },
        result: 'You dive into the code. You\'re rusty but you keep things moving. The team respects it but you\'re drained.'
      }
    ]
  },

  // === CUSTOMER & MARKET PRESSURE ===
  {
    id: 'customer_escalation',
    type: 'crisis',
    title: 'Customer Escalation',
    text: 'A major customer is threatening to churn. They need a feature you weren\'t planning to build. The CEO is asking what you\'re going to do.',
    choices: [
      {
        label: 'Drop everything and build their feature',
        hint: 'Save the customer, derail roadmap',
        effects: { energy: -15, momentum: -10, savings: 3000 },
        result: 'You ship the feature in 2 weeks. The customer stays. Your roadmap is in shambles but revenue is safe.'
      },
      {
        label: 'Offer a workaround or alternative',
        hint: 'Creative solution, might not work',
        effects: { energy: -10, momentum: 0 },
        result: 'You find a clever workaround using existing features. The customer is skeptical but tries it. It buys you time.'
      },
      {
        label: 'Let them churn — focus on the roadmap',
        hint: 'Principled but risky',
        effects: { energy: -8, momentum: 5, savings: -2000 },
        result: 'You stick to your guns. The customer leaves. Leadership questions your judgment but respects the long-term thinking.'
      }
    ]
  },

  {
    id: 'competitor_launch',
    type: 'pressure',
    title: 'Competitor Launches Your Feature',
    text: 'A competitor just shipped the exact feature you\'ve been working on. Your team is demoralized. Leadership is asking if you should pivot.',
    choices: [
      {
        label: 'Ship it anyway — do it better',
        hint: 'Stay the course',
        effects: { energy: -10, momentum: 8 },
        result: 'You rally the team to ship a better version. It takes longer but you differentiate. The team feels proud.'
      },
      {
        label: 'Pivot to a different approach',
        hint: 'Adapt, lose time',
        effects: { energy: -12, momentum: -8 },
        result: 'You change direction. The team is frustrated by the wasted work but appreciates the strategic thinking.'
      }
    ]
  },

  {
    id: 'viral_feature_request',
    type: 'pressure',
    title: 'Viral Feature Request',
    text: 'A feature request is blowing up on Twitter and your community forum. Customers are demanding it. Your roadmap doesn\'t have room.',
    choices: [
      {
        label: 'Add it to the roadmap immediately',
        hint: 'Respond to community, disrupt plans',
        effects: { energy: -8, momentum: -5 },
        result: 'You reprioritize to ship it. The community loves it. Your team is annoyed by the constant changes.'
      },
      {
        label: 'Acknowledge it but stick to your plan',
        hint: 'Stay disciplined',
        effects: { energy: -6, momentum: 3 },
        result: 'You write a thoughtful response explaining your priorities. Some users are disappointed but most respect the transparency.'
      },
      {
        label: 'Build a quick MVP to test demand',
        hint: 'Validate first',
        effects: { energy: -10, momentum: 0 },
        result: 'You ship a minimal version in a week. Turns out only 5% of users actually use it. You saved months of wasted work.'
      }
    ]
  },

  // === TEAM DYNAMICS ===
  {
    id: 'team_conflict',
    type: 'team',
    title: 'Team Conflict',
    text: 'Two engineers are in a heated disagreement about technical architecture. It\'s affecting the whole team\'s morale.',
    choices: [
      {
        label: 'Let them debate it out',
        hint: 'Hands-off, could drag on',
        effects: { energy: -4, momentum: -8 },
        result: 'The debate continues for days. Eventually they find common ground but momentum is lost.'
      },
      {
        label: 'Make the call yourself',
        hint: 'Decisive but risky',
        effects: { energy: -8, momentum: 5 },
        result: 'You study both approaches and decide. One engineer is happy, the other feels unheard. But you\'re moving forward.'
      },
      {
        label: 'Bring in a neutral technical advisor',
        hint: 'Fair but takes time',
        effects: { energy: -10, momentum: -3 },
        result: 'You escalate to a staff engineer. They mediate and find a hybrid approach. Both engineers feel heard.'
      }
    ]
  },

  {
    id: 'junior_pm_mistake',
    type: 'team',
    title: 'Junior PM Makes a Mistake',
    text: 'A junior PM on your team promised a feature to a customer without checking with engineering. Now there\'s a mess to clean up.',
    choices: [
      {
        label: 'Fix it quietly without blame',
        hint: 'Protective, they might not learn',
        effects: { energy: -12, momentum: 0 },
        result: 'You clean up the mess behind the scenes. The junior PM is grateful but doesn\'t fully understand what went wrong.'
      },
      {
        label: 'Use it as a teaching moment',
        hint: 'Developmental, takes time',
        effects: { energy: -8, momentum: 3 },
        result: 'You walk them through what happened and how to prevent it. They\'re embarrassed but learn a valuable lesson.'
      },
      {
        label: 'Escalate to their manager',
        hint: 'Pass the buck',
        effects: { energy: -4, momentum: -5 },
        result: 'You let their manager handle it. The problem is solved but you didn\'t build trust with the junior PM.'
      }
    ]
  },

  {
    id: 'recognition_gap',
    type: 'team',
    title: 'Recognition Gap',
    text: 'Your team shipped a major feature but leadership only mentioned your name in the all-hands. The team feels invisible.',
    choices: [
      {
        label: 'Publicly credit the team',
        hint: 'Good for morale',
        effects: { energy: -5, momentum: 10 },
        result: 'You send a company-wide email highlighting everyone\'s contributions. The team feels seen and valued.'
      },
      {
        label: 'Let it slide — they know you appreciate them',
        hint: 'Low effort, risky',
        effects: { energy: 0, momentum: -8 },
        result: 'You don\'t say anything. The team notices. Trust erodes slightly.'
      }
    ]
  },

  // === PERSONAL CHALLENGES ===
  {
    id: 'late_night_decision',
    type: 'personal',
    title: 'Late Night Decision',
    text: 'It\'s 10 PM. You\'re on a roll. You could ship this tonight or go home to your family.',
    choices: [
      {
        label: 'Keep working — ship it tonight',
        hint: 'Momentum boost, life cost',
        effects: { energy: -10, momentum: 10, workLifeBalance: -1 },
        result: 'You ship it at midnight. It feels great. Your partner is asleep when you get home.'
      },
      {
        label: 'Go home — it can wait',
        hint: 'Healthy boundary',
        effects: { energy: 5, momentum: -3, workLifeBalance: 1 },
        result: 'You close the laptop. Your family is happy to see you. The work will be there tomorrow.'
      }
    ]
  },

  {
    id: 'weekend_work',
    type: 'personal',
    title: 'Weekend Crunch',
    text: 'The team is behind. You could work this weekend to catch up. But you promised your family a trip.',
    choices: [
      {
        label: 'Work the weekend',
        hint: 'Catch up, break promise',
        effects: { energy: -15, momentum: 8, workLifeBalance: -2 },
        result: 'You cancel the trip. The team catches up. Your family is disappointed but understanding.'
      },
      {
        label: 'Take the trip — let the deadline slip',
        hint: 'Prioritize life',
        effects: { energy: 10, momentum: -10, workLifeBalance: 2 },
        result: 'You go on the trip. The deadline slips. Leadership is frustrated but the team respects your boundaries.'
      }
    ]
  },

  {
    id: 'imposter_syndrome',
    type: 'personal',
    title: 'Imposter Syndrome',
    text: 'You\'re in a meeting with senior leaders. They\'re asking hard questions. You\'re not sure you have the answers. You feel like a fraud.',
    choices: [
      {
        label: 'Admit you don\'t know — offer to research',
        hint: 'Honest, vulnerable',
        effects: { energy: -8, momentum: 5 },
        result: 'You say "I don\'t know but I\'ll find out." They respect the honesty. You follow up with a thorough analysis.'
      },
      {
        label: 'Fake confidence and wing it',
        hint: 'Risky, could backfire',
        effects: { energy: -12, momentum: -5 },
        result: 'You bluff your way through. They seem convinced but you\'re not sure. Later you realize you gave bad advice.'
      }
    ]
  },

  {
    id: 'mentor_opportunity',
    type: 'growth',
    title: 'Mentorship Opportunity',
    text: 'A junior PM asks if you\'ll mentor them. It would be 1 hour a week. You\'re already stretched thin.',
    choices: [
      {
        label: 'Say yes — invest in others',
        hint: 'Generous, costs energy',
        effects: { energy: -8, momentum: 3 },
        result: 'You commit to mentoring. It\'s draining but rewarding. You\'re building the next generation of PMs.'
      },
      {
        label: 'Decline politely',
        hint: 'Protect your time',
        effects: { energy: 0, momentum: -3 },
        result: 'You say no. They understand but you feel a pang of guilt. You wonder if you\'re becoming too focused on yourself.'
      }
    ]
  },

  // === STRATEGIC DECISIONS ===
  {
    id: 'tech_debt_vs_features',
    type: 'strategy',
    title: 'Tech Debt vs Features',
    text: 'Engineering wants a sprint to pay down tech debt. Sales wants more features. You have to choose.',
    choices: [
      {
        label: 'Prioritize tech debt',
        hint: 'Long-term thinking',
        effects: { energy: -6, momentum: 5 },
        result: 'You give engineering the time. The codebase improves. Sales is frustrated but velocity increases later.'
      },
      {
        label: 'Ship more features',
        hint: 'Short-term wins',
        effects: { energy: -8, momentum: -5, savings: 1500 },
        result: 'You prioritize features. Sales closes deals. Engineering warns the codebase is getting fragile.'
      },
      {
        label: 'Split the difference — do both',
        hint: 'Compromise, less effective',
        effects: { energy: -10, momentum: 0 },
        result: 'You try to do both. Neither gets done well. Everyone is slightly unhappy.'
      }
    ]
  },

  {
    id: 'build_vs_buy',
    type: 'strategy',
    title: 'Build vs Buy',
    text: 'You need a new capability. You could build it in-house or buy a third-party solution. Engineering wants to build. Finance wants to buy.',
    choices: [
      {
        label: 'Build it in-house',
        hint: 'Control, but slow',
        effects: { energy: -12, momentum: 5 },
        result: 'You commit to building. It takes longer than expected but you own the IP and can customize it fully.'
      },
      {
        label: 'Buy the third-party solution',
        hint: 'Fast, but dependency',
        effects: { energy: -6, momentum: -3, savings: -2000 },
        result: 'You buy the tool. It works immediately but you\'re now dependent on a vendor. Engineering is disappointed.'
      }
    ]
  },

  {
    id: 'data_privacy_decision',
    type: 'ethics',
    title: 'Data Privacy Decision',
    text: 'Marketing wants to track more user behavior. Legal says it\'s technically allowed. But it feels invasive.',
    choices: [
      {
        label: 'Allow the tracking',
        hint: 'Business advantage, ethical cost',
        effects: { energy: -5, momentum: -5, savings: 1000 },
        result: 'You enable the tracking. Marketing is thrilled. You feel uneasy. Some users notice and complain.'
      },
      {
        label: 'Block it — protect user privacy',
        hint: 'Principled stand',
        effects: { energy: -8, momentum: 8 },
        result: 'You say no. Marketing is frustrated but respects the boundary. Users don\'t know but you sleep better.'
      }
    ]
  }
];
