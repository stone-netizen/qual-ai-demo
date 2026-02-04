import React from 'react';
import { cn } from '@/lib/utils';
import type { QuizOption } from '@/lib/quiz-types';

interface QuizStepProps<T extends string = string> {
  question: string;
  options: QuizOption<T>[];
  value: T | null;
  onChange: (value: T) => void;
  showOtherInput?: boolean;
  otherValue?: string;
  onOtherChange?: (value: string) => void;
  otherPlaceholder?: string;
}

function QuizStep<T extends string = string>({
  question,
  options,
  value,
  onChange,
  showOtherInput,
  otherValue,
  onOtherChange,
  otherPlaceholder,
}: QuizStepProps<T>) {
  return (
    <div className="space-y-6">
      {/* Question */}
      <h2 className="text-xl md:text-2xl font-semibold text-gray-900 leading-tight">
        {question}
      </h2>

      {/* Option Cards */}
      <div className="space-y-3">
        {options.map((option) => {
          const isSelected = value === option.value;
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange(option.value)}
              className={cn(
                'w-full min-h-[56px] p-4 rounded-xl border-2 transition-all',
                'flex items-center gap-3 text-left',
                'hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
                isSelected
                  ? 'border-blue-600 bg-blue-50'
                  : 'border-gray-200 bg-white hover:bg-gray-50'
              )}
            >
              {/* Radio indicator */}
              <div
                className={cn(
                  'w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center',
                  isSelected ? 'border-blue-600' : 'border-gray-300'
                )}
              >
                {isSelected && (
                  <div className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                )}
              </div>

              {/* Label and description */}
              <div className="flex-1 min-w-0">
                <span
                  className={cn(
                    'block font-medium',
                    isSelected ? 'text-blue-900' : 'text-gray-900'
                  )}
                >
                  {option.label}
                </span>
                {option.description && (
                  <span className="block text-sm text-gray-500 mt-0.5">
                    {option.description}
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Conditional "Other" text input */}
      {showOtherInput && value === 'other' && onOtherChange && (
        <div className="mt-4">
          <input
            type="text"
            value={otherValue || ''}
            onChange={(e) => onOtherChange(e.target.value)}
            placeholder={otherPlaceholder || 'Please specify'}
            className={cn(
              'w-full h-12 px-4 rounded-lg border border-gray-300',
              'text-base text-gray-900 placeholder-gray-400',
              'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
              'transition-colors'
            )}
          />
        </div>
      )}
    </div>
  );
}

export default QuizStep;
