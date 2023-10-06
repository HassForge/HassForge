declare global {
  namespace JSX {
    interface IntrinsicElements {
      "ha-icon": string;
    }
  }
}

declare module "*.svg" {
  import * as Preact from "preact";

  const ReactComponent: Preact.FunctionComponent<
    Preact.ComponentProps<"svg"> & { title?: string }
  >;

  export default ReactComponent;
}
