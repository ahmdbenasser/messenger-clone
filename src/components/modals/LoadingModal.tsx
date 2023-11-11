"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

import { ClipLoader } from "react-spinners";

const LoadingModal = () => {
  return (
    <Transition.Root as={Fragment} show>
      <Dialog onClose={() => {}} as="div" className="relative z-50">
        <Transition.Child
          as={Fragment}
          enter="transition ease-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition ease-in duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-100 opacity-50" />
        </Transition.Child>

        <div
          className="
          fixed
          inset-0
          z-10
          min-h-full
          
          overflow-y-auto
          flex justify-center items-center
          "
        >
          <Transition.Child
            as={Fragment}
            enter="transition ease-out duration-500"
            enterFrom=" opacity-0 scale-95 translate-y-4"
            enterTo="opacity-100 scale-100 translate-y-0"
            leave="transition ease-in duration-500"
            leaveFrom="opacity-100 scale-100 translate-y-0"
            leaveTo="opacity-0 scale-95 translate-y-4"
          >
            <Dialog.Panel>
              <ClipLoader size={40} color="#0284c7" />
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default LoadingModal;
