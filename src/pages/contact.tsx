import * as React from 'react';
import { useForm } from 'react-hook-form';

import { Layout, SEO } from '../components';
import { Input } from '../components/form-elements/input';
import { NetlifyForm } from '../components/form-elements/netlify-form';
import { Textarea } from '../components/form-elements/textarea';

function ContactPage(): React.ReactElement {
  return (
    <Layout>
      <SEO title="Handmade Pencil Cases, Pouches, Stationery, Accessories and More" />
      <ContactForm />
    </Layout>
  );
}

type FormData = {
  subject: string;
  first_name: string;
  last_name: string;
  email_address: string;
  contact_number: string;
  message: string;
};

function ContactForm(): React.ReactElement {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>({ mode: 'onBlur', reValidateMode: 'onChange' });
  return (
    <div className="pb-20">
      <h3 className="text-center heading-1 sm:text-left">Send us a message</h3>
      <div className="mt-6 bg-white rounded-lg shadow">
        <h2 className="sr-only">Contact us</h2>
        <div className="grid">
          {/* Contact form */}
          <div className="px-6 py-6">
            <NetlifyForm
              handleSubmit={handleSubmit}
              className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8"
            >
              <div>
                <Input
                  label="First name"
                  autoComplete="given-name"
                  required
                  {...register('first_name', { required: true })}
                  errors={errors}
                />
              </div>
              <div>
                <Input
                  label="Last name"
                  autoComplete="family-name"
                  required
                  {...register('last_name', { required: true })}
                  errors={errors}
                />
              </div>
              <div>
                <Input
                  label="Email"
                  type="email"
                  required
                  {...register('email_address', { required: true })}
                  errors={errors}
                />
              </div>
              <div>
                <Input
                  label="Phone"
                  type="tel"
                  description="Optional"
                  descriptionId="optional"
                  autoComplete="tel"
                  {...register('contact_number')}
                  errors={errors}
                />
              </div>
              <div className="sm:col-span-2">
                <Input
                  label="Subject"
                  required
                  {...register('subject', { required: true })}
                  errors={errors}
                />
              </div>
              <div className="sm:col-span-2">
                <Textarea
                  label="Message"
                  descriptionId="message-max"
                  description="Max. 500 characters"
                  required
                  {...register('message', { required: true })}
                  errors={errors}
                />
              </div>
              <div className="sm:col-span-2 sm:flex sm:justify-end">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center px-6 py-3 font-mono text-base font-medium text-pink-700 bg-pink-100 border border-transparent rounded-full shadow-sm hover:bg-pink-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 hover:shadow-lg sm:w-auto"
                >
                  Submit
                </button>
              </div>
            </NetlifyForm>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;
