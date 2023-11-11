import { Conversation, User } from "@prisma/client";
import { Fragment, useMemo, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";

import { IoClose, IoTrash } from "react-icons/io5";
import Avatar from "../Avatar";
import useOtherUser from "@/hooks/useOtherUser";
import { format } from "date-fns";
import Modal from "../modals/Modal";
import ConfirmModal from "../modals/ConfirmModal";
import AvatarGroup from "../AvatarGroup";
import useActiveListStore from "@/hooks/useActiveListStroe";

type Props = {
  onClose: () => void;
  isOpen: boolean;
  conversation: Conversation & {
    users: User[];
  };
};

const ProfileDrawer = ({
  conversation,
  isOpen,
  onClose,
}: Props) => {
  const [isConfirmModalOpen, setIsConfrimModalOpen] =
    useState(false);
  const otherUser = useOtherUser(conversation);
  const { members } = useActiveListStore();
  const isActive = members.indexOf(otherUser.email!) !== -1;

  const statusText = useMemo(() => {
    if (conversation?.isGroup) {
      return `${conversation.users.length} members`;
    }

    return isActive ? "Active" : "Offline";
  }, [conversation]);

  const joinedAt = useMemo(() => {
    return format(new Date(conversation.createdAt), "PP");
  }, [conversation.createdAt]);

  const title = useMemo(() => {
    return conversation.name || otherUser.name;
  }, [conversation.name, otherUser.name]);
  return (
    <>
      <ConfirmModal
        onClose={() => setIsConfrimModalOpen(false)}
        isOpen={isConfirmModalOpen}
      />
      <Transition.Root as={Fragment} show={isOpen}>
        <Dialog
          onClose={onClose}
          as="div"
          className="relative z-50"
        >
          <Transition.Child
            enter="transition ease-in duration-500"
            enterFrom="opacity-0"
            enterTo="opcity-100"
            leave="transition ease-in duration-500"
            leaveFrom="opacity-100"
            leaveTo="opcity-0"
          >
            <div className="fixed inset-0 bg-black opacity-40" />
          </Transition.Child>

          <div
            className="
              fixed
              flex
              inset-y-0
              right-0
              max-w-full
              h-full
              pl-10 
            "
          >
            <Transition.Child
              as={Fragment}
              enter="transition duration-500 ease-in-out"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transition duration-500 ease-in-out"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <Dialog.Panel
                className="
                  pointer-events-auto
                  w-screen 
                  max-w-md
                "
              >
                <div
                  className="
                  flex
                  h-full
                  flex-col
                  bg-white
                  shadow-xl
                  overflow-y-auto
                  px-4 sm:px-6 py-6
                "
                >
                  <div className="flex items-center justify-end">
                    <button
                      className="
                      p-1
                      ring-2
                      rounded-md
                      text-gray-500
                      focus:outline-none
                      focus:ring-sky-500
                      focus:text-gray-500
                      hover:text-gray-800
                    "
                      onClick={onClose}
                    >
                      <IoClose size={18} />
                    </button>
                  </div>
                  <div className="relative mt-6 flex-1 gap-2">
                    {/* Avatar & Delete Icon */}
                    <div className="flex flex-col items-center">
                      {conversation.isGroup ? (
                        <AvatarGroup users={conversation.users} />
                      ) : (
                        <Avatar user={otherUser} />
                      )}
                      <span className="font-semibold">{title}</span>
                      <span className="text-sm text-gray-500">
                        {statusText}
                      </span>
                      {/* Delete Icon */}
                      <div
                        className="mt-8 mb-8 flex flex-col items-center gap-2"
                        onClick={() => setIsConfrimModalOpen(true)}
                      >
                        <span
                          className="
                          flex 
                          p-2
                          transition
                          items-center 
                          rounded-full
                          bg-gray-200 
                          justify-center 
                          cursor-pointer
                          hover:text-gray-600
                        "
                        >
                          <IoTrash size={20} />
                        </span>
                        <span className="text-gray-500 text-sm font-light">
                          Delete
                        </span>
                      </div>
                    </div>
                    {/*implement users detalis ==> email , joined at ==> check if is not group*/}
                    <div className="space-y-6 sm:space-y-7 pt-5 pb-5 px-4 sm:px-6">
                      {conversation.isGroup && (
                        <div>
                          <dl>
                            <dt className="text-gray-500 text-sm font-medium ">
                              Email
                            </dt>
                            <dd className="text-gray-900 font-semibold  mt-1">
                              {conversation.users
                                .map((user) => user.email)
                                .join(", ")}
                            </dd>
                          </dl>
                        </div>
                      )}
                      {!conversation.isGroup && (
                        <div>
                          <dl>
                            <dt className="text-gray-500 text-sm font-medium">
                              Email
                            </dt>
                            <dd className="text-gray-900 font-semibold text-sm mt-1">
                              {otherUser.email}
                            </dd>
                          </dl>
                        </div>
                      )}
                      {!conversation.isGroup && (
                        <>
                          <hr />
                          <div>
                            <dl>
                              <dt className="text-gray-500 text-sm font-medium">
                                Joined
                              </dt>
                              <dd>
                                <time
                                  dateTime={joinedAt}
                                  className="text-gray-900 font-semibold text-sm mt-1"
                                >
                                  {joinedAt}
                                </time>
                              </dd>
                            </dl>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default ProfileDrawer;
