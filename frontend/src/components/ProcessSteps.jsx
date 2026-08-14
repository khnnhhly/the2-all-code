'use client';
import React from 'react';

export default function ProcessSteps({ steps, numberColor = 'var(--accent-secondary)', numberOpacity = 1 }) {
  return (
    <div className="planning-process-steps">
      {steps.map((step) => (
        <div key={step.n} className="planning-process-step">
          <span
            className="planning-process-num"
            style={{ color: numberColor, opacity: numberOpacity }}
          >
            {step.n}
          </span>
          <div className="planning-process-body">
            <h4 className="planning-process-title">{step.t}</h4>
            <p className="planning-process-desc">{step.d}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
