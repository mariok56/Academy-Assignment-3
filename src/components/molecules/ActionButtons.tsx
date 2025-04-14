import React from 'react';
import Button from '../atoms/Button';

interface ActionButtonsProps {
  onEdit: () => void;
  onDelete: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ onEdit, onDelete }) => {
  return (
    <div className="mt-4 flex justify-end space-x-2">
      <Button variant="primary" onClick={onEdit}>
        Edit
      </Button>
      <Button variant="danger" onClick={onDelete}>
        Delete
      </Button>
    </div>
  );
};

export default ActionButtons;