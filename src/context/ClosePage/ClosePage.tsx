import { ReactNode, createContext } from "react";
import { useDispatch } from "react-redux";
import { Page, closePage } from "~/store";

interface ClosePageContextProps {
  children: ReactNode;
}

export const ClosePageContext = createContext(function (s: Page) {});

export default function ClosePageWrapper({ children }: ClosePageContextProps) {
  const dispatch = useDispatch();
  const close = function (s: Page) {
    return dispatch(closePage(s));
  };

  return (
    <ClosePageContext.Provider value={close}>
      {children}
    </ClosePageContext.Provider>
  );
}
