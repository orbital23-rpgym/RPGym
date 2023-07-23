import { useRouter } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { StyleSheet } from "react-native";

import Workout from "./Workout";
import { WorkoutOverviewCard } from "./WorkoutOverview";

import { themes } from "constants/colors";
import { Card } from "library/components/Card";
import { CongratulationsModal } from "library/components/CongratulationsModal";
import { Text } from "library/components/Themed";
import { ColorSchemeContext } from "library/context/ColorSchemeContext";
import { PopUpContext } from "library/context/PopUpContext";

export type WorkoutPopupData = {
  exp: number;
  money: number;
  attack: number;
  completedWorkout: Workout;
};
export default function WorkoutCompleteScreen() {
  const colorScheme = useContext(ColorSchemeContext);
  const { data, setData } = useContext(PopUpContext);
  const styles = StyleSheet.create({
    text: {
      textAlign: "center",
    },
  });
  const router = useRouter();
  const [rewardData, setRewardData] = useState<WorkoutPopupData | undefined>(
    undefined,
  );
  useEffect(() => {
    if (data?.data && setData) {
      setRewardData(data.data as WorkoutPopupData);
      return () => setData({ href: undefined, data: undefined });
    } else {
      router.back();
    }
  }, [data]);

  return (
    <CongratulationsModal secondaryText="You've completed a workout!">
      {rewardData && (
        <>
          <Card headerColor={themes[colorScheme].orange} title="🌟 Rewards">
            <Text style={styles.text}>{`You have earned ${
              rewardData.exp
            }XP and ${rewardData.money.toFixed(
              0,
            )} coins for your hard work.`}</Text>
            {rewardData.attack !== 0 && (
              <Text
                style={styles.text}
              >{`You have also caused ${rewardData.attack} damage to the ongoing campaign boss.`}</Text>
            )}
          </Card>
          <WorkoutOverviewCard workout={rewardData.completedWorkout} />
        </>
      )}
    </CongratulationsModal>
  );
}
