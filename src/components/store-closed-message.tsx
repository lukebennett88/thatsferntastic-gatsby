import { Dialog, Transition } from '@headlessui/react';
import { ExclamationIcon } from '@heroicons/react/outline';
import * as React from 'react';

export function StoreClosedMessage(): JSX.Element {
  const [open, setOpen] = React.useState(true);
  return (
    <Transition.Root show={open} as={React.Fragment}>
      <Dialog
        as="div"
        static
        className="fixed inset-0 z-10 overflow-y-auto"
        open={open}
        onClose={setOpen}
      >
        <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
              <div>
                <div className="flex items-center justify-center w-12 h-12 mx-auto bg-yellow-100 rounded-full">
                  <ExclamationIcon
                    className="w-6 h-6 text-yellow-600"
                    aria-hidden="true"
                  />
                </div>
                <div className="mt-3 text-center sm:mt-5">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Store temporarly closed
                  </Dialog.Title>
                  <div className="mt-2 space-y-2 text-sm text-gray-500">
                    <p>
                      @thatsferntastic is currently closed. You can still browse
                      the site and add items to your cart, but you will not be
                      able to check them out.
                    </p>
                    <p>
                      Keep an eye on{' '}
                      <a
                        href="https://www.instagram.com/thatsferntastic/"
                        className="font-semibold text-pink-500 underline"
                      >
                        my Instagram
                      </a>{' '}
                      for updates.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-5 text-center sm:mt-6">
                <div className="button-wrapper">
                  <button
                    type="button"
                    className="button"
                    onClick={() => setOpen(false)}
                  >
                    I understand
                  </button>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
