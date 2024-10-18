declare module "child/App" {
  import type { ReactElement } from "react";

  const Child: (props: any) => ReactElement;

  export default Child;
}
