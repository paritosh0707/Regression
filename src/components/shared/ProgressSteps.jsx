import { Check } from 'lucide-react';

export default function ProgressSteps({ steps, currentStep = 0 }) {
  return (
    <div className="flex items-center gap-0 w-full">
      {steps.map((step, i) => {
        const isDone = i < currentStep;
        const isCurrent = i === currentStep;
        const isLast = i === steps.length - 1;

        return (
          <div key={i} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-all ${
                  isDone
                    ? 'bg-success text-white'
                    : isCurrent
                      ? 'bg-appleBlue text-white shadow-buttonApple'
                      : 'bg-[#f1f4f7] text-placeholder'
                }`}
              >
                {isDone ? <Check size={14} /> : i + 1}
              </div>
              <span
                className={`text-[10px] mt-1.5 text-center max-w-[80px] leading-tight ${
                  isDone || isCurrent ? 'text-dBlue font-medium' : 'text-placeholder'
                }`}
              >
                {step}
              </span>
            </div>
            {!isLast && (
              <div
                className={`flex-1 h-0.5 mx-1 mt-[-16px] ${isDone ? 'bg-success' : 'bg-[#e3e8ef]'}`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
