import CreateWorkoutController from "./CreateWorkoutController";

import { Screen } from "library/components/Themed";

export default function CreateWorkoutScreen() {
  return (
    <Screen noScroll noTabBar>
      <CreateWorkoutController />
    </Screen>
  );
}
