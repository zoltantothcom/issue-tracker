import { FunctionComponent } from 'react';

import Button from './Button';

import '../styles/components/confirmation-modal.scss';

interface ConfirmationModalProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmationModal: FunctionComponent<ConfirmationModalProps> = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <p className="modal-message">{message}</p>
        <div className="modal-actions">
          <Button className="neutral" onClick={onCancel} label="Cancel" />
          <Button className="negative" onClick={onConfirm} label="Confirm" />
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
