import React from "react";

const LayoutContext = React.createContext();

export const LayoutProvider = LayoutContext.Provider;
export const ChildConsumer = LayoutContext.Consumer;

export default LayoutContext;
