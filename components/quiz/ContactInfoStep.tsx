import React from 'react';
import TextInput from './TextInput';
import {
  CONTACT_INFO_HEADER,
  CONTACT_INFO_FIELDS,
} from '@/lib/quiz-constants';
import type { QuizData } from '@/lib/quiz-types';

interface ContactInfoStepProps {
  data: Pick<QuizData, 'firstName' | 'lastName' | 'email' | 'phone' | 'companyName'>;
  onChange: (field: keyof ContactInfoStepProps['data'], value: string) => void;
  errors: Partial<Record<keyof ContactInfoStepProps['data'], string>>;
}

const ContactInfoStep: React.FC<ContactInfoStepProps> = ({
  data,
  onChange,
  errors,
}) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <h2 className="text-xl md:text-2xl font-semibold text-gray-900 leading-tight">
        {CONTACT_INFO_HEADER}
      </h2>

      {/* Form fields */}
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextInput
            label={CONTACT_INFO_FIELDS.firstName.label}
            value={data.firstName}
            onChange={(value) => onChange('firstName', value)}
            required={CONTACT_INFO_FIELDS.firstName.required}
            error={errors.firstName}
          />
          <TextInput
            label={CONTACT_INFO_FIELDS.lastName.label}
            value={data.lastName}
            onChange={(value) => onChange('lastName', value)}
            required={CONTACT_INFO_FIELDS.lastName.required}
            error={errors.lastName}
          />
        </div>

        <TextInput
          label={CONTACT_INFO_FIELDS.email.label}
          value={data.email}
          onChange={(value) => onChange('email', value)}
          type="email"
          required={CONTACT_INFO_FIELDS.email.required}
          error={errors.email}
        />

        <TextInput
          label={CONTACT_INFO_FIELDS.phone.label}
          value={data.phone}
          onChange={(value) => onChange('phone', value)}
          type="tel"
          required={CONTACT_INFO_FIELDS.phone.required}
          error={errors.phone}
        />

        <TextInput
          label={CONTACT_INFO_FIELDS.companyName.label}
          value={data.companyName}
          onChange={(value) => onChange('companyName', value)}
          required={CONTACT_INFO_FIELDS.companyName.required}
          error={errors.companyName}
        />
      </div>
    </div>
  );
};

export default ContactInfoStep;
