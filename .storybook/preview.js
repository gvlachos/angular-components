import { setCompodocJson } from "@storybook/addon-docs/angular";
import docJson from "../documentation.json";

import '!style-loader!css-loader!sass-loader!./styles/styles.scss';

setCompodocJson(docJson);

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
};
