import CreateExerciseController from "./CreateExerciseController";

import { Screen } from "library/components/Themed";

export default function CreateExerciseScreen() {
  return (
    <Screen noScroll noTabBar>
      <CreateExerciseController />
    </Screen>
  );
}
