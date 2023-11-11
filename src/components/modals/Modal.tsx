"use client";

import { Dialog, Transition } from "@headlessui/react";
import { IoClose } from "react-icons/io5";
import { Fragment } from "react";

type Props = {
  isOpen?: boolean;
  onClose: () => void;
  children?: React.ReactNode;
};
const Modal = ({ isOpen, children, onClose }: Props) => {
  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog onClose={onClose} className="relative z-50" as="div">
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-700 transition"
          enterFrom="opacity-0"
          enterTo="opcity-100"
          leave="ease-out transition duration-700"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="bg-gray-500 bg-opacity-75 fixed inset-0" />
        </Transition.Child>

        <div
          className="
            z-10
            fixed
            inset-0 
            min-h-full 
            items-center 
            overflow-y-auto 
            flex justify-center 
          "
        >
          <Transition.Child
            as={Fragment}
            enter="transition duration-400 ease-in-out"
            enterFrom="opacity-0 translate-y-5 scale-95"
            enterTo="opacity-100 translate-y-0 scale-100"
            leave="transition duration-400 ease-in"
            leaveFrom="opacity-100 translate-y-0 scale-100"
            leaveTo="opacity-0 translate-y-5 scale-95"
          >
            <Dialog.Panel
              className="
                w-full
                sm:max-w-lg
                sm:w-full
                relative
                px-4
                sm:p-6 
                pt-5
                pb-4
                bg-white
                transition
                rounded-lg
                overflow-hidden
              "
            >
              <div
                className="
                  z-10 
                  top-4 
                  hidden 
                  right-4 
                  sm:block 
                  absolute 
                "
              >
                <button
                  className="
                  focus:outline-none
                  focus:ring-2
                  focus:ring-offset-2
                  focus:ring-sky-500
                  focus:text-gray-700
                  hover:text-gray-700
                  text-gray-400
                  bg-white
                  rounded-md
                  transition
                "
                  onClick={onClose}
                >
                  <IoClose />
                </button>
              </div>
              {children}
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default Modal;
