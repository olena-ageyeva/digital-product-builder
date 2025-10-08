'use client';

import { useState } from 'react';

const steps = ['Idea Helper', 'Sharpen Your Idea', 'Pricing', 'Drafting', 'Validation'];

export default function BuilderPage() {
  const [activeStep, setActiveStep] = useState<string | null>(null);
  const [formState, setFormState] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);
  const [reply, setReply] = useState<string | null>(null);

  const handleChange = (key: string, value: string) => {
    setFormState(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    const systemPrompt = getSystemPrompt(activeStep || '', formState);

    const res = await fetch('/api/chat', {
      method: 'POST',
      body: JSON.stringify({
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: JSON.stringify(formState) }
        ]
      })
    });

    const data = await res.json();
    setReply(data.reply?.content || 'No reply received.');
    setLoading(false);
  };

  return (
    <main className="max-w-4xl mx-auto p-6">
      {/* Top Menu */}
      <div className="flex flex-wrap gap-3 mb-6">
        {steps.map(step => (
          <button
            key={step}
            onClick={() => {
              setActiveStep(step);
              setReply(null);
              setFormState({});
            }}
            className={`px-4 py-2 rounded ${
              activeStep === step ? 'bg-blue-600 text-white' : 'bg-gray-200'
            }`}
          >
            {step}
          </button>
        ))}
      </div>

      {/* Smart Form */}
      {activeStep && (
        <div className="bg-white border rounded p-4 shadow">
          <h2 className="text-xl font-bold mb-4">{activeStep}</h2>
          {getFieldsForStep(activeStep).map(field => (
            <div key={field.key} className="mb-3">
              <label className="block font-semibold mb-1">{field.label}</label>
              <input
                type="text"
                value={formState[field.key] || ''}
                onChange={e => handleChange(field.key, e.target.value)}
                placeholder={field.placeholder}
                className="w-full border px-3 py-2 rounded"
              />
            </div>
          ))}
          <button
            onClick={handleSubmit}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
            disabled={loading}
          >
            {loading ? 'Thinking...' : 'Get Assistance'}
          </button>
        </div>
      )}

      {/* AI Response */}
      {reply && (
        <div className="mt-6 p-4 border rounded bg-gray-50 whitespace-pre-wrap">
          <h3 className="font-bold mb-2">Assistant:</h3>
          {reply}
        </div>
      )}
    </main>
  );
}

// System prompts per step
function getSystemPrompt(step: string, form: { [key: string]: string }) {
  switch (step) {
    case 'Idea Helper':
      return `You are an idea generation expert. Use the following info to help the user generate and refine a business idea. Be creative, but practical.`;
    case 'Sharpen Your Idea':
      return `You are a product strategist helping refine the value proposition, UVP, and customer benefit of a digital product idea.`;
    case 'Pricing':
      return `You are a pricing strategist. Suggest tiered pricing with rationale based on the product and audience described.`;
    case 'Drafting':
      return `You are a copywriter and UX content expert. Create a short landing page draft for the product described.`;
    case 'Validation':
      return `You are a lean startup mentor. Suggest quick validation experiments and metrics for the product described.`;
    default:
      return '';
  }
}

// Predefined form fields per step
function getFieldsForStep(step: string) {
  switch (step) {
    case 'Idea Helper':
      return [
        { key: 'audience', label: 'Target Audience', placeholder: 'e.g., teens who love gaming' },
        { key: 'problem', label: 'Problem to Solve', placeholder: 'e.g., staying focused' }
      ];
    case 'Sharpen Your Idea':
      return [
        { key: 'idea', label: 'Your Idea', placeholder: 'e.g., app that rewards focus' },
        { key: 'benefit', label: 'Main Benefit', placeholder: 'e.g., better focus, higher GPA' }
      ];
    case 'Pricing':
      return [
        { key: 'product_type', label: 'Product Type', placeholder: 'e.g., course, app, SaaS' },
        { key: 'audience_income', label: 'Audience Income Level', placeholder: 'e.g., low, medium, high' }
      ];
    case 'Drafting':
      return [
        { key: 'product_name', label: 'Product Name', placeholder: 'e.g., FocusUp' },
        { key: 'core_features', label: 'Core Features', placeholder: 'e.g., gamified timer, leaderboard' }
      ];
    case 'Validation':
      return [
        { key: 'product_summary', label: 'Product Summary', placeholder: 'e.g., gamified focus app for teens' },
        { key: 'channel', label: 'Where to Test It', placeholder: 'e.g., TikTok, Discord' }
      ];
    default:
      return [];
  }
}
