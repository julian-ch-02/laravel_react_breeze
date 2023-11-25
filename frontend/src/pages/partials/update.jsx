import { Dialog, Transition } from "@headlessui/react";
import { useUser } from "hooks/user";
import React, { Fragment, useState } from "react";

const Update = ({ visible, onClose, user }) => {
  const [data, setData] = useState({
    name: user.name ?? "",
    email: user.email ?? "",
  });
  const [errors, setErrors] = useState(null);

  const { update } = useUser();

  const submitForm = async (event) => {
    event.preventDefault();
    update({ ...data, onClose, setErrors, id: user.id });
  };

  return (
    <Transition.Root show={visible} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <form className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="text-base font-semibold leading-6 text-gray-900"
                      >
                        Update User
                      </Dialog.Title>
                      <div className="mt-2">
                        <div className="w-full max-w-lg">
                          <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                              <label
                                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                htmlFor="grid-name"
                              >
                                Name
                              </label>
                              <input
                                className={`appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white ${
                                  errors && errors.name && "border-red-500"
                                }`}
                                id="grid-name"
                                type="text"
                                value={data.name}
                                onChange={(event) =>
                                  setData({
                                    ...data,
                                    name: event.target.value,
                                  })
                                }
                              />
                              {errors && errors.name && (
                                <p className="text-red-500 text-xs italic">
                                  {errors.name.toString()}
                                </p>
                              )}
                            </div>
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                              <label
                                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                htmlFor="grid-email"
                              >
                                Email
                              </label>
                              <input
                                className={`appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white ${
                                  errors && errors.name && "border-red-500"
                                }`}
                                id="grid-email"
                                type="email"
                                value={data.email}
                                onChange={(event) =>
                                  setData({
                                    ...data,
                                    email: event.target.value,
                                  })
                                }
                              />
                              {errors && errors.email && (
                                <p className="text-red-500 text-xs italic">
                                  {errors.email.toString()}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                    onClick={submitForm}
                  >
                    Submit
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={onClose}
                  >
                    Close
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </form>
      </Dialog>
    </Transition.Root>
  );
};

export default Update;
