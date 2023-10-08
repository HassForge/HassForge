import { HassNeuroButton } from "./cards";
import { createWebComponent } from "./create-preact-web-component";
import "./main.css";

declare global {
  interface Window {
    customCards?: any[];
  }
}

[HassNeuroButton].forEach(({ component, ...config }) => {
  const webComponent = createWebComponent(
    component,
    config.type,
    ["hass", "config"],
    {}
  );
  Object.defineProperty(webComponent, "setConfig", {
    value: () => console.log("set config"),
  });

  customElements.define(config.type, webComponent as any);

  window.customCards = window.customCards || [];
  window.customCards.push(config);
});
