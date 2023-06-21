import Quest from "./Quest";

import { ViewProps } from "library/components/Themed";

export type QuestCardProps = {
  quest: Quest | null | undefined;
} & Omit<ViewProps, "children">;
