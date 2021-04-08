import { navigate } from 'gatsby';
import * as React from 'react';
import {
  FieldValues,
  SubmitErrorHandler,
  SubmitHandler,
} from 'react-hook-form';

function encode(data: Record<string, string | number | boolean>): string {
  return Object.keys(data)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
    .join('&');
}

interface INetlifyForm {
  action?: string;
  children: React.ReactNode;
  className?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleSubmit: <TSubmitFieldValues extends FieldValues = Record<string, any>>(
    onValid: SubmitHandler<TSubmitFieldValues>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onInvalid?: SubmitErrorHandler<Record<string, any>>
  ) => (e?: React.BaseSyntheticEvent) => Promise<void>;
  name?: string;
}

function NetlifyForm(
  {
    action = '/success/',
    children,
    className,
    handleSubmit,
    name = 'contact_form',
  }: INetlifyForm,
  rest: JSX.IntrinsicAttributes &
    React.ClassAttributes<HTMLFormElement> &
    React.FormHTMLAttributes<HTMLFormElement>
): React.ReactElement {
  const onSubmit = handleSubmit((data, event) => {
    event?.preventDefault();
    const form = event?.target;
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({
        'form-name': form.getAttribute('name'),
        ...data,
      }),
    })
      .then(() => navigate(form.getAttribute('action')))
      // eslint-disable-next-line no-alert
      .catch((error) => alert(error));
  });
  return (
    <form
      name={name}
      action={action}
      method="POST"
      data-netlify
      onSubmit={onSubmit}
      className={className}
      {...rest}
    >
      {children}
    </form>
  );
}

export { NetlifyForm };
