import CreateExerciseSetController from "./CreateExerciseSetController";

import { Screen } from "library/components/Themed";

export default function CreateExerciseSetScreen() {
  return (
    <Screen noScroll noTabBar>
      <CreateExerciseSetController />
    </Screen>
  );
}
