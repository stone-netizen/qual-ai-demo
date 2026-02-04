import React, { useState, useCallback } from 'react';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import QuizStep from './QuizStep';
import TextInput from './TextInput';
import ContactInfoStep from './ContactInfoStep';
import {
  TOTAL_QUIZ_STEPS,
  BUSINESS_TYPE_QUESTION,
  BUSINESS_TYPE_OPTIONS,
  BUSINESS_TYPE_OTHER_PLACEHOLDER,
  MONTHLY_JOBS_QUESTION,
  MONTHLY_JOBS_OPTIONS,
  AVERAGE_JOB_VALUE_QUESTION,
  MONTHLY_LEADS_QUESTION,
  MONTHLY_LEADS_OPTIONS,
  LEAD_SOURCE_QUESTION,
  LEAD_SOURCE_OPTIONS,
  LEAD_SOURCE_OTHER_PLACEHOLDER,
  MISSED_CALLS_QUESTION,
  MISSED_CALLS_OPTIONS,
  CURRENT_AUTOMATION_QUESTION,
  CURRENT_AUTOMATION_OPTIONS,
  MARKETING_BUDGET_QUESTION,
  MARKETING_BUDGET_OPTIONS,
  OPEN_TO_REV_SHARE_QUESTION,
  OPEN_TO_REV_SHARE_OPTIONS,
  CONTACT_SUBMIT_BUTTON_TEXT,
  EMAIL_REGEX,
  PHONE_REGEX,
  VALIDATION_MESSAGES,
} from '@/lib/quiz-constants';
import type {
  QuizData,
  QuizStep as QuizStepType,
  BusinessType,
  MonthlyJobs,
  MonthlyLeads,
  LeadSource,
  MissedCallsPercent,
  CurrentAutomation,
  MarketingBudget,
  OpenToRevShare,
} from '@/lib/quiz-types';
import { initialQuizData } from '@/lib/quiz-types';

interface QuizFormProps {
  onComplete: (data: QuizData) => void;
}

type ContactField = 'firstName' | 'lastName' | 'email' | 'phone' | 'companyName';

const QuizForm: React.FC<QuizFormProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState<QuizStepType>(1);
  const [quizData, setQuizData] = useState<QuizData>(initialQuizData);
  const [contactErrors, setContactErrors] = useState<Partial<Record<ContactField, string>>>({});

  // Calculate progress (6 steps total)
  const progressPercent = (currentStep / TOTAL_QUIZ_STEPS) * 100;

  // Update quiz data helper
  const updateField = useCallback(<K extends keyof QuizData>(field: K, value: QuizData[K]) => {
    setQuizData((prev) => ({ ...prev, [field]: value }));
  }, []);

  // Validate current step
  const validateCurrentStep = useCallback((): boolean => {
    switch (currentStep) {
      case 1:
        if (!quizData.businessType) return false;
        if (quizData.businessType === 'other' && !quizData.businessTypeOther?.trim()) return false;
        return true;
      case 2:
        return !!quizData.monthlyJobs;
      case 3:
        if (!quizData.monthlyLeads || !quizData.leadSource) return false;
        if (quizData.leadSource === 'other' && !quizData.leadSourceOther?.trim()) return false;
        return true;
      case 4:
        return !!quizData.missedCallsPercent && !!quizData.currentAutomation;
      case 5:
        return !!quizData.marketingBudget && !!quizData.openToRevShare;
      case 6:
        return validateContactInfo();
      default:
        return true;
    }
  }, [currentStep, quizData]);

  // Validate contact info step
  const validateContactInfo = useCallback((): boolean => {
    const errors: Partial<Record<ContactField, string>> = {};

    if (!quizData.firstName.trim()) {
      errors.firstName = VALIDATION_MESSAGES.required;
    }
    if (!quizData.lastName.trim()) {
      errors.lastName = VALIDATION_MESSAGES.required;
    }
    if (!quizData.email.trim()) {
      errors.email = VALIDATION_MESSAGES.required;
    } else if (!EMAIL_REGEX.test(quizData.email)) {
      errors.email = VALIDATION_MESSAGES.email;
    }
    if (!quizData.phone.trim()) {
      errors.phone = VALIDATION_MESSAGES.required;
    } else if (!PHONE_REGEX.test(quizData.phone.replace(/\D/g, ''))) {
      errors.phone = VALIDATION_MESSAGES.phone;
    }
    if (!quizData.companyName.trim()) {
      errors.companyName = VALIDATION_MESSAGES.required;
    }

    setContactErrors(errors);
    return Object.keys(errors).length === 0;
  }, [quizData]);

  // Handle next button
  const handleNext = useCallback(() => {
    if (!validateCurrentStep()) return;

    if (currentStep < TOTAL_QUIZ_STEPS) {
      setCurrentStep((prev) => (prev + 1) as QuizStepType);
    }
  }, [currentStep, validateCurrentStep]);

  // Handle back button
  const handleBack = useCallback(() => {
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as QuizStepType);
      setContactErrors({});
    }
  }, [currentStep]);

  // Handle submit
  const handleSubmit = useCallback(() => {
    if (!validateContactInfo()) return;

    const finalData: QuizData = {
      ...quizData,
      submittedAt: new Date().toISOString(),
    };

    onComplete(finalData);
  }, [quizData, validateContactInfo, onComplete]);

  // Handle contact field change
  const handleContactChange = useCallback((field: ContactField, value: string) => {
    updateField(field, value);
    // Clear error when user starts typing
    if (contactErrors[field]) {
      setContactErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  }, [updateField, contactErrors]);

  // Render current step content
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <QuizStep<BusinessType>
            question={BUSINESS_TYPE_QUESTION.label}
            options={BUSINESS_TYPE_OPTIONS}
            value={quizData.businessType}
            onChange={(value) => updateField('businessType', value)}
            showOtherInput={true}
            otherValue={quizData.businessTypeOther}
            onOtherChange={(value) => updateField('businessTypeOther', value)}
            otherPlaceholder={BUSINESS_TYPE_OTHER_PLACEHOLDER}
          />
        );

      case 2:
        return (
          <div className="space-y-8">
            <QuizStep<MonthlyJobs>
              question={MONTHLY_JOBS_QUESTION.label}
              options={MONTHLY_JOBS_OPTIONS}
              value={quizData.monthlyJobs}
              onChange={(value) => updateField('monthlyJobs', value)}
            />
            <div className="pt-2">
              <TextInput
                label={AVERAGE_JOB_VALUE_QUESTION.label}
                value={quizData.averageJobValue || ''}
                onChange={(value) => updateField('averageJobValue', value)}
                placeholder={AVERAGE_JOB_VALUE_QUESTION.placeholder}
              />
              <p className="mt-1 text-xs text-gray-500">(Optional, but helpful)</p>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-8">
            <QuizStep<MonthlyLeads>
              question={MONTHLY_LEADS_QUESTION.label}
              options={MONTHLY_LEADS_OPTIONS}
              value={quizData.monthlyLeads}
              onChange={(value) => updateField('monthlyLeads', value)}
            />
            <QuizStep<LeadSource>
              question={LEAD_SOURCE_QUESTION.label}
              options={LEAD_SOURCE_OPTIONS}
              value={quizData.leadSource}
              onChange={(value) => updateField('leadSource', value)}
              showOtherInput={true}
              otherValue={quizData.leadSourceOther}
              onOtherChange={(value) => updateField('leadSourceOther', value)}
              otherPlaceholder={LEAD_SOURCE_OTHER_PLACEHOLDER}
            />
          </div>
        );

      case 4:
        return (
          <div className="space-y-8">
            <QuizStep<MissedCallsPercent>
              question={MISSED_CALLS_QUESTION.label}
              options={MISSED_CALLS_OPTIONS}
              value={quizData.missedCallsPercent}
              onChange={(value) => updateField('missedCallsPercent', value)}
            />
            <QuizStep<CurrentAutomation>
              question={CURRENT_AUTOMATION_QUESTION.label}
              options={CURRENT_AUTOMATION_OPTIONS}
              value={quizData.currentAutomation}
              onChange={(value) => updateField('currentAutomation', value)}
            />
          </div>
        );

      case 5:
        return (
          <div className="space-y-8">
            <QuizStep<MarketingBudget>
              question={MARKETING_BUDGET_QUESTION.label}
              options={MARKETING_BUDGET_OPTIONS}
              value={quizData.marketingBudget}
              onChange={(value) => updateField('marketingBudget', value)}
            />
            <QuizStep<OpenToRevShare>
              question={OPEN_TO_REV_SHARE_QUESTION.label}
              options={OPEN_TO_REV_SHARE_OPTIONS}
              value={quizData.openToRevShare}
              onChange={(value) => updateField('openToRevShare', value)}
            />
          </div>
        );

      case 6:
        return (
          <ContactInfoStep
            data={{
              firstName: quizData.firstName,
              lastName: quizData.lastName,
              email: quizData.email,
              phone: quizData.phone,
              companyName: quizData.companyName,
            }}
            onChange={handleContactChange}
            errors={contactErrors}
          />
        );

      default:
        return null;
    }
  };

  const isLastStep = currentStep === TOTAL_QUIZ_STEPS;
  const canProceed = validateCurrentStep();

  return (
    <div className="w-full max-w-[480px] mx-auto">
      {/* Quiz Card */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8">
        {/* Progress indicator */}
        <div className="mb-6">
          <p className="text-sm text-gray-500 mb-2">
            Step {currentStep} of {TOTAL_QUIZ_STEPS}
          </p>
          <Progress value={progressPercent} className="h-2" />
        </div>

        {/* Step content */}
        <div className="min-h-[300px]">
          {renderStepContent()}
        </div>

        {/* Navigation buttons */}
        <div className="flex gap-3 mt-8">
          {currentStep > 1 && (
            <Button
              type="button"
              variant="outline"
              onClick={handleBack}
              className="h-[52px] px-6 flex-shrink-0"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          )}

          <Button
            type="button"
            onClick={isLastStep ? handleSubmit : handleNext}
            disabled={!canProceed}
            className={cn(
              'h-[52px] px-6 flex-1 font-semibold',
              'bg-blue-600 hover:bg-blue-700 text-white',
              !canProceed && 'opacity-50 cursor-not-allowed'
            )}
          >
            {isLastStep ? (
              CONTACT_SUBMIT_BUTTON_TEXT
            ) : (
              <>
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuizForm;
