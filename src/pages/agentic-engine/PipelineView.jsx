import { Check } from 'lucide-react';

const pipelineSteps = [
  'Selected Tests',
  'Metadata Validation',
  'Script Alignment',
  'Repo Mapping',
  'Tag & Priority Enforcement',
  'Data/Config Mapping',
  'Suite Merge',
  'Integration Summary',
];

export default function PipelineView({ currentStep = 5 }) {
  return (
    <div className="card-base p-5">
      <h3 className="ds-h3 mb-4">Integration Pipeline</h3>
      <div className="flex items-start">
        {pipelineSteps.map((step, i) => {
          const isDone = i < currentStep;
          const isCurrent = i === currentStep;
          const isLast = i === pipelineSteps.length - 1;

          return (
            <div key={i} className="flex items-start flex-1 last:flex-none">
              <div className="flex flex-col items-center">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                    isDone
                      ? 'bg-success text-white'
                      : isCurrent
                        ? 'bg-appleBlue text-white shadow-buttonApple'
                        : 'bg-[#f1f4f7] text-placeholder border border-borderSoft'
                  }`}
                >
                  {isDone ? <Check size={16} /> : i + 1}
                </div>
                <span
                  className={`text-[12px] font-medium mt-2 text-center leading-tight max-w-[72px] ${
                    isDone || isCurrent ? 'text-dBlue font-semibold' : 'text-placeholder'
                  }`}
                >
                  {step}
                </span>
              </div>
              {!isLast && (
                <div className="flex-1 mt-[18px] mx-1">
                  <div className={`h-[2px] rounded ${isDone ? 'bg-success' : 'bg-borderSoft'}`} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
