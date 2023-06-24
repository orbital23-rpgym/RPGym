import { useRouter } from "expo-router";

import CreateQuestForm from "./CreateQuestForm";
import Quest, { QuestDifficulty } from "./Quest";

import { useUserContext } from "library/context/UserContext";

export default function CreateQuestController() {
  const router = useRouter();
  const user = useUserContext();
  const userCharacter = user.character;

  function submit(
    timesPerWeek: number,
    difficulty: QuestDifficulty,
  ): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      // Create new quest
      Quest.create(difficulty, timesPerWeek, user.id)
        .then((quest) => {
          // Add quest to user
          userCharacter.beginQuest(quest);
          router.replace("(tabs)/quests");
        })
        .catch((reason) => reject(reason));
    });
  }

  return <CreateQuestForm onSubmit={submit} />;
}
