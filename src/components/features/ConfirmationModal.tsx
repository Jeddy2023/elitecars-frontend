import React from 'react';
import { Modal, Button } from '@mantine/core';
import { useTheme } from '../../hooks/ThemeContext';

interface ConfirmationModalProps {
  opened: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ opened, onClose, onConfirm, title, message }) => {
  const { getCurrentTheme } = useTheme();
  const currentTheme = getCurrentTheme();

  const modalBgColor = currentTheme === 'dark' ? 'bg-black' : 'bg-white';


  return (
    <Modal opened={opened} onClose={onClose} title={title} centered classNames={{
      content: `transition-colors duration-300 ${modalBgColor}`,
      header: `${modalBgColor}`,
    }}>
      <p>{message}</p>
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
        <Button variant="outline" onClick={onClose}>Cancel</Button>
        <Button color="red" onClick={onConfirm}>Confirm</Button>
      </div>
    </Modal>
  );
}

export default ConfirmationModal;
