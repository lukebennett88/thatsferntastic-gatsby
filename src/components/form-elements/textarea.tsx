import * as React from 'react';
import { DeepMap, FieldError } from 'react-hook-form';

import { Error } from './error';

type TextareaProps = {
  errors: DeepMap<Record<string, unknown>, FieldError>;
  label: string;
  name: string;
  required?: boolean;
  rows?: number;
} & (
  | { description: string; descriptionId: string }
  | { description?: never; descriptionId?: never }
);

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      description,
      descriptionId,
      errors,
      label,
      name,
      required,
      rows = 4,
      ...rest
    },
    ref
  ) => {
    const hasErrors = Boolean(errors?.[name]);
    return (
      <div>
        <div className="flex justify-between">
          <label
            htmlFor={name}
            className="block text-sm font-medium text-pink-500"
          >
            {label}
          </label>
          {description ? (
            <span id={descriptionId} className="text-sm text-gray-500">
              {description}
            </span>
          ) : null}
        </div>
        <div className="mt-1">
          <textarea
            ref={ref}
            id={name}
            name={name}
            rows={rows}
            defaultValue=""
            required={required}
            aria-describedby={description ? descriptionId : undefined}
            className="block w-full px-4 py-3 text-gray-900 border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500 focus:ring-1"
            {...rest}
          />
        </div>
        {hasErrors ? <Error>{label} is a required field</Error> : null}
      </div>
    );
  }
);

export { Textarea };
