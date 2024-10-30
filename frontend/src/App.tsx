import { StyleSheetManager } from "styled-components";
import isPropValid from "@emotion/is-prop-valid";
import { GlobalStyle } from "./styles/global";
import { Routes } from "./routes";

export default function App() {
  return (
    <StyleSheetManager
      shouldForwardProp={isPropValid}
      enableVendorPrefixes={true}
    >
      <GlobalStyle />
      <Routes />
    </StyleSheetManager>
  );
}
