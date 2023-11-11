"use client";

import Image from "next/image";
import Modal from "./Modal";

type Props = {
  isOpen?: boolean;
  onClose: () => void;
  src?: string | null;
};
const ImageModal = ({ onClose, isOpen, src }: Props) => {
  if (!src) {
    return null;
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="w-96 h-96">
        <Image className="object-cover" src={src} alt="Image" fill />
      </div>
    </Modal>
  );
};

export default ImageModal;
