'use client';

import { useState } from 'react';

type Symptom = {
  name: string;
  severity: 'mild' | 'moderate' | 'severe';
};

export default function SymptomsAnalyzer() {
  const [symptoms, setSymptoms] = useState<Symptom[]>([]);
  const [currentSymptom, setCurrentSymptom] = useState('');
  const [currentSeverity, setCurrentSeverity] = useState<'mild' | 'moderate' | 'severe'>('mild');
  const [analysis, setAnalysis] = useState('');

  const addSymptom = () => {
    if (currentSymptom.trim()) {
      setSymptoms([...symptoms, { name: currentSymptom.trim(), severity: currentSeverity }]);
      setCurrentSymptom('');
    }
  };

  const removeSymptom = (index: number) => {
    setSymptoms(symptoms.filter((_, i) => i !== index));
  };

  const analyzeSymptoms = () => {
    if (symptoms.length === 0) {
      setAnalysis('Please add some symptoms to analyze.');
      return;
    }

    const severeCounts = symptoms.reduce((acc, symptom) => {
      acc[symptom.severity] = (acc[symptom.severity] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    let recommendation = 'Based on your symptoms:\n\n';
    
    if (severeCounts.severe && severeCounts.severe > 0) {
      recommendation += '🚨 URGENT: Please seek immediate medical attention. You have severe symptoms.\n';
    } else if (severeCounts.moderate && severeCounts.moderate > 1) {
      recommendation += '⚠️ IMPORTANT: Consider consulting a healthcare provider soon.\n';
    } else if (severeCounts.mild && Object.keys(severeCounts).length === 1) {
      recommendation += '✅ MILD: Monitor your symptoms and rest. If they persist, consult a healthcare provider.\n';
    }

    recommendation += '\nSymptom Summary:\n';
    symptoms.forEach(symptom => {
      recommendation += `- ${symptom.name} (${symptom.severity})\n`;
    });

    setAnalysis(recommendation);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6">Symptoms Analyzer</h2>
      
      <div className="space-y-4">
        <div className="flex gap-4">
          <input
            type="text"
            value={currentSymptom}
            onChange={(e) => setCurrentSymptom(e.target.value)}
            placeholder="Enter symptom"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
          <select
            value={currentSeverity}
            onChange={(e) => setCurrentSeverity(e.target.value as 'mild' | 'moderate' | 'severe')}
            className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="mild">Mild</option>
            <option value="moderate">Moderate</option>
            <option value="severe">Severe</option>
          </select>
          <button
            onClick={addSymptom}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Add
          </button>
        </div>

        {symptoms.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Current Symptoms:</h3>
            <ul className="space-y-2">
              {symptoms.map((symptom, index) => (
                <li key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded-md">
                  <span>
                    {symptom.name} - <span className={`font-medium ${
                      symptom.severity === 'severe' ? 'text-red-600' :
                      symptom.severity === 'moderate' ? 'text-yellow-600' :
                      'text-green-600'
                    }`}>{symptom.severity}</span>
                  </span>
                  <button
                    onClick={() => removeSymptom(index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        <button
          onClick={analyzeSymptoms}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Analyze Symptoms
        </button>

        {analysis && (
          <div className="mt-4 p-4 bg-gray-50 rounded-md">
            <h3 className="text-lg font-medium mb-2">Analysis:</h3>
            <pre className="whitespace-pre-wrap">{analysis}</pre>
          </div>
        )}
      </div>
    </div>
  );
}
