import { expect,mergeTests } from '@playwright/test';

import { test as dataTest } from './data.fixture';
import { test as productTest } from './products.fixture';
import { test as uiFlowsTest } from './ui-flows.fixture';

export const test = mergeTests(dataTest, productTest, uiFlowsTest);

export { expect };
