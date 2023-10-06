import "preact";

declare module "preact" {
  namespace JSX {
    interface IntrinsicElements {
      "ha-icon": any;
    }
  }
}
