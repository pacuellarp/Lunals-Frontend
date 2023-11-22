import { createContext, useState } from "react";

export const HeaderContext = createContext();

export default function HeaderProvider({ children }) {
  const [headerHeight, setHeaderHeight] = useState(null);

  return (
    <HeaderContext.Provider value={{ headerHeight, setHeaderHeight }}>
      {children}
    </HeaderContext.Provider>
  );
}
