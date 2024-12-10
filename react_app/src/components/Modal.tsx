import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";
import XMarkIcon from "@heroicons/react/outline/XIcon";

interface ModalProps {
  isOpen: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, title, children }: ModalProps) {
  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50 data-[state=open]:animate-fadeIn" />

        <Dialog.Content
          className="fixed top-1/2 left-1/2 w-full max-w-lg transform -translate-x-1/2 -translate-y-1/2 
                   bg-white rounded shadow-lg p-6 focus:outline-none data-[state=open]:animate-fadeInScale"
        >
          <Dialog.Title className="text-2xl font-bold mb-4 text-gray-900">{title}</Dialog.Title>
          <Dialog.Close asChild>
            <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-800" aria-label="Close">
              <XMarkIcon className="w-5 h-5" />
            </button>
          </Dialog.Close>

          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
