import React, { createContext } from "react";
import { useDispatch } from "react-redux";
import { ReactNode } from "react";
import { PageInfoState, openPage } from "~/store";

interface OpenPageProps {
  children: ReactNode;
}

export const OpenPageContext = createContext(function (s: PageInfoState) {});

export default function OpenPageWrapper({ children }: OpenPageProps) {
  const dispatch = useDispatch();
  const open = function (s: PageInfoState) {
    dispatch(openPage(s));
  };

  return (
    <OpenPageContext.Provider value={open}>{children}</OpenPageContext.Provider>
  );
}
