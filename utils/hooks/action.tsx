"use client";
import React from "react";

type ActionContextType = {
  action?: string;
  options?: any;
  setAction: (modalName: string, data?: any) => void;
  setOptions: (data: any) => void;
  closeModal: () => void;
};

let ActionContext = React.createContext<ActionContextType>({
  action: "",
  options: {},
  setAction: () => {},
  setOptions: (data: any) => {},
  closeModal: () => {},
});

type Props = {
  children: React.ReactNode;
};
export const ActionContextProvider: React.FC<Props> = ({ children }) => {
  const [options, _setOptions] = React.useState<any>(undefined);
  const [action, setActionData] = React.useState<string>();

  const setAction = (modalName: string, data?: any) => {
    _setOptions({
      ...options,
      ...data,
      headerRight: undefined,
      headerLeft: undefined,
      loading: undefined,
    });
    setActionData(modalName);
  };

  const closeModal = () => {
    _setOptions(undefined);
    setActionData(undefined);
  };

  const setOptions = (data: { [key: string]: any }) => {
    _setOptions({ ...options, ...data });
  };

  return (
    <ActionContext.Provider
      value={{
        action,
        options,
        setOptions,
        setAction,
        closeModal,
      }}
    >
      {children}
    </ActionContext.Provider>
  );
};

export function useAction() {
  return React.useContext(ActionContext);
}
