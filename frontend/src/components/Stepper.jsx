import React from 'react';
import { Check } from 'lucide-react';

const Stepper = ({ currentStep, totalSteps, labels }) => {
  return (
    <div className="w-full py-8">
      <div className="flex items-center justify-between relative">
        {/* Progress Line */}
        <div className="absolute top-5 left-0 right-0 h-1 bg-gray-200 -z-10">
          <div 
            className="h-full bg-[#d4a650] transition-all duration-500"
            style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
          ></div>
        </div>

        {/* Steps */}
        {Array.from({ length: totalSteps }).map((_, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;
          
          return (
            <div key={stepNumber} className="flex flex-col items-center relative">
              <div className={`
                w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-300
                ${
                  isCompleted 
                    ? 'bg-[#d4a650] text-white' 
                    : isCurrent 
                    ? 'bg-[#d4a650] text-white scale-110 shadow-lg' 
                    : 'bg-gray-200 text-gray-500'
                }
              `}>
                {isCompleted ? <Check className="w-5 h-5" /> : stepNumber}
              </div>
              {labels && labels[index] && (
                <div className={`
                  mt-2 text-xs font-medium text-center whitespace-nowrap
                  ${isCurrent ? 'text-[#d4a650]' : 'text-gray-500'}
                `}>
                  {labels[index]}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Stepper;