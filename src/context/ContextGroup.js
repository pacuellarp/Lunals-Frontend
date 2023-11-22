// contextGroup.js
import { HeaderContext } from "./HeaderContext";

export default function ContextGroup({ children }) {
  return <HeaderContext.Provider>{children}</HeaderContext.Provider>;
}
