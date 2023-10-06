import { HassRoundButton } from "./cards";
import { createWebComponent } from "./create-preact-web-component";

declare global {
  interface Window {
    customCards?: any[];
  }
}

[HassRoundButton].forEach(({ component, ...config }) => {
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
