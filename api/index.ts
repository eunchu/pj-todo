import { queryKeys } from "./query-keys";

import { tasksFactory } from "./tasks";

const taskAPIs = tasksFactory({
  baseUrl: "api/task",
});

export { queryKeys, taskAPIs };
