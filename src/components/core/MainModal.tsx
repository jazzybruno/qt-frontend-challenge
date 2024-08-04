import { Modal, ModalBaseProps } from '@mantine/core';
import React, { FC } from 'react';
import { BiXCircle } from 'react-icons/bi';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  centered?: boolean;
  children?: React.ReactNode;
  size?: ModalBaseProps['size'];
  closeOnClickOutside?: boolean;
  className?: string;
}

const MainModal: FC<Props> = ({
  isOpen,
  onClose,
  title,
  centered = true,
  children,
  size,
  closeOnClickOutside = true,
  className,
}) => {
  return (
    <Modal
      opened={isOpen}
      size={size ?? 'md'}
      onClose={onClose}
      // title={title ?? 'Modal title'}
      centered={centered}
      closeOnClickOutside={closeOnClickOutside}
      withCloseButton={false}
      // closeButtonProps={{ children: 'Close' }}
    >
      <div className="flex w-full px-5 justify-between">
        <h1 className={`font-medium text-lg ${className}`}>{title}</h1>
        <button className=" bg-transparent">
          <BiXCircle size={25} onClick={onClose} />
        </button>
      </div>
      {children}
    </Modal>
  );
};

export default MainModal;
