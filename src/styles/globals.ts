import { injectGlobal } from 'styled-components';
import styledSanitize from 'styled-sanitize';

import base from './base';

export default () => injectGlobal`
  ${styledSanitize}
  ${base}
`;
