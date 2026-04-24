import React, { useState } from 'react';
import { Button } from './ui/button';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import Stepper from './Stepper';
import { useLanguage } from '../context/LanguageContext';

const JourneyForm = ({ journeyType, children, onSubmit, stepLabels }) => {
  const { t } = useLanguage();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = stepLabels ? stepLabels.length : React.Children.count(children);

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = (formData) => {
    if (onSubmit) {
      onSubmit(formData);
    }
  };

  const currentStepComponent = React.Children.toArray(children)[currentStep - 1];

  return (
    <div className="max-w-4xl mx-auto">
      <Stepper 
        currentStep={currentStep} 
        totalSteps={totalSteps} 
        labels={stepLabels}
      />

      <div className="bg-white rounded-2xl shadow-xl p-8 mt-8">
        {React.cloneElement(currentStepComponent, { onSubmit: handleSubmit })}
      </div>

      <div className="flex justify-between mt-8">
        {currentStep > 1 && (
          <Button
            onClick={handlePrevious}
            variant="outline"
            className="border-2 border-gray-300 hover:border-[#d4a650] px-6 py-3 flex items-center space-x-2"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>{t.language === 'ar' ? 'السابق' : t.language === 'es' ? 'Anterior' : 'Previous'}</span>
          </Button>
        )}
        
        {currentStep < totalSteps && (
          <Button
            onClick={handleNext}
            className="bg-[#d4a650] hover:bg-[#c49640] text-white px-6 py-3 ml-auto flex items-center space-x-2"
          >
            <span>{t.language === 'ar' ? 'التالي' : t.language === 'es' ? 'Siguiente' : 'Next'}</span>
            <ArrowRight className="w-5 h-5" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default JourneyForm;