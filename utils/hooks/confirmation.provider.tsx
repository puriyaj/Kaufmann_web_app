import { DeleteConfirmation } from '@cmp/ui/components/confirmations/DeleteConfirmation';
import React, { PropsWithChildren, useState } from 'react';

type Props = {
  children: React.ReactNode;
};
type ConfirmationContextType = {
  item?: any;
  message?: React.ReactNode;
  deleteConfirmation: (_item: any, callback: (a: any) => void, message?: string | React.ReactNode) => void;
};

const ConfirmationContext = React.createContext<ConfirmationContextType>({
  deleteConfirmation: () => {},
});

export const ConfirmationProvider: React.FC<PropsWithChildren<Props>> = ({ children, ...props }) => {
  const [formType, setFormType] = useState<'delete' | 'info'>();
  const [item, setItem] = useState<any>();
  const [message, setMessage] = useState<React.ReactNode>();
  const [cb, setCB] = useState<{ callback: (item: any) => void }>();

  const deleteConfirmation = (_item: string, callback: (a: any) => void, message?: string | React.ReactNode) => {
    setItem(_item);
    setMessage(message);
    setCB({ callback });
    setFormType('delete');
  };

  return (
    <ConfirmationContext.Provider value={{ item, message, deleteConfirmation }}>
      {children}
      <DeleteConfirmation
        isOpen={!!formType}
        onDelete={() => {
          cb?.callback(item);
          setFormType(undefined);
          setItem(undefined);
        }}
        onDismiss={() => {
          setItem(undefined);
          setFormType(undefined);
        }}
        message={message}
      />
    </ConfirmationContext.Provider>
  );
};

export function useConfirmation() {
  return React.useContext(ConfirmationContext);
}
