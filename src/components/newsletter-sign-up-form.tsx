import * as React from 'react';
import { useForm } from 'react-hook-form';

type Inputs = {
  email_address: string;
};

const klaviyoListID = 'X8sZUP';

function NewsletterSignUpForm(): React.ReactElement {
  const [submitting, setSubmitting] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit = (
    data: Inputs,
    event?: React.BaseSyntheticEvent
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ): any | Promise<any> => {
    event?.preventDefault();

    setSubmitting(true);

    // eslint-disable-next-line no-undef
    fetch('/.netlify/functions/newsletter-join', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        listID: klaviyoListID,
        ...data,
      }),
    })
      .then((res) => res.json())
      // eslint-disable-next-line promise/always-return
      .then(() => {
        setSubmitting(false);
        setSuccess(true);
      })
      .catch((error_) => {
        setSubmitting(false);
        // eslint-disable-next-line no-console
        console.error(error_);
      });
  };

  return (
    <div className="py-8 border-t border-gray-200 lg:flex lg:items-center lg:justify-between">
      <div>
        <h3 className="text-sm font-semibold tracking-wider text-gray-400 uppercase">
          Subscribe to our newsletter
        </h3>
        <p className="mt-2 text-base text-gray-500">
          The latest news, articles, and resources, sent to your inbox weekly.
        </p>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-4 sm:flex sm:max-w-md lg:mt-0"
      >
        <div className="relative flex flex-wrap items-center">
          <label htmlFor="email_address" className="flex w-full">
            <span className="sr-only">Email address</span>
            <input
              id="email_address"
              {...register('email_address', {
                required: 'This field is required.',
                pattern: {
                  value: /^[\w%+.-]+@[\d.a-z-]+\.[a-z]{2,4}$/i,
                  message: 'Invalid email address.',
                },
              })}
              type="email"
              inputMode="email"
              autoComplete="email"
              required
              aria-invalid={!!errors.email_address}
              className="w-full min-w-0 px-4 py-2 text-base text-gray-900 placeholder-gray-500 bg-white border border-gray-300 rounded-full appearance-none focus:outline-none focus:ring-pink-500 focus:border-pink-500 focus:placeholder-gray-400 sm:max-w-xs"
              placeholder="Enter your email"
            />
          </label>
          {errors.email_address && (
            <span
              role="alert"
              className="block w-full px-4 mt-1 text-sm tracking-wider text-pink-700"
            >
              {errors.email_address.message}
            </span>
          )}
          {success && (
            <span
              role="alert"
              className="block w-full px-4 mt-1 text-sm tracking-wider text-pink-700"
            >
              Please check your email to confirm your subscription.
            </span>
          )}
        </div>
        <div className="mt-3 rounded-full sm:mt-0 sm:ml-3 sm:flex-shrink-0">
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center px-6 py-3 font-mono text-base font-medium text-pink-700 bg-pink-100 border border-transparent rounded-full hover:bg-pink-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 hover:shadow-lg"
          >
            {submitting ? 'Submitting' : 'Subscribe'}
          </button>
        </div>
      </form>
    </div>
  );
}

export { NewsletterSignUpForm };
