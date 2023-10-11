import { HassNeuroButton } from "./cards";
import { HassNeuroRotary } from "./cards/HassNeuroRotary/HassNeuroRotary";
import { createWebComponent } from "./create-preact-web-component";
import "./main.css";

declare global {
  interface Window {
    customCards?: any[];
  }
}

[HassNeuroButton, HassNeuroRotary].forEach(({ component, ...config }) => {
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
