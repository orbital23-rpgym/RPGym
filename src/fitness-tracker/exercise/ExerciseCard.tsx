import { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewProps,
} from "react-native";

import { WeightRepsExerciseSetData } from "../set/WeightRepsExerciseSet";

import { Card } from "library/components/Card";
import { HeadingText } from "library/components/StyledText";
import { Text } from "library/components/Themed";

export type ExerciseCardProps = {
  name: string;
  sets: WeightRepsExerciseSetData[];
  onPress?: () => void;
} & Omit<ViewProps, "children">;

type SetsListItem = { key: number; set: WeightRepsExerciseSetData };

export default function ExerciseCard(props: ExerciseCardProps) {
  const { name, sets, onPress, style, ...otherProps } = props;

  const [setsData, setSetsData] = useState<SetsListItem[]>([]);
  const styles = StyleSheet.create({
    container: {
      width: "100%",
    },
    card: {
      width: "100%",
    },
    tableContainer: {
      width: "100%",
      minWidth: 250,
    },
    setRow: {
      flexDirection: "row",
      width: "100%",
      padding: 5,
      gap: 5,
      justifyContent: "space-between",
    },
    setColNum: {
      // flex: 1,
    },
    setColWeight: {
      // flex: 3,
    },
    setColReps: {
      // flex: 1,
    },
    setColRpe: {
      // flex: 2,
    },
    heading: {
      fontSize: 16,
    },
    cellText: {
      fontSize: 16,
    },
  });

  useEffect(() => {
    const newSetsData = props.sets.map((value, index, array) => {
      return { key: index, set: value };
    });
    setSetsData(newSetsData);
  }, [props.sets]);

  const noSetsText = <Text>No sets added.</Text>;

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      style={StyleSheet.compose(styles.container, style)}
      onPress={onPress}
      {...otherProps}
    >
      <Card title={name} style={styles.card}>
        <View style={styles.tableContainer}>
          {sets.length === 0 ? (
            <FlatList data={[noSetsText]} renderItem={({ item }) => item} />
          ) : (
            <>
              <View style={styles.setRow}>
                <View style={styles.setColNum}>
                  <HeadingText style={styles.heading}>Set</HeadingText>
                </View>
                <View style={styles.setColWeight}>
                  <HeadingText style={styles.heading}>Weight (kg)</HeadingText>
                </View>
                <View style={styles.setColReps}>
                  <HeadingText style={styles.heading}>Reps</HeadingText>
                </View>
                <View style={styles.setColRpe}>
                  <HeadingText style={styles.heading}>Exertion</HeadingText>
                </View>
              </View>
              <FlatList
                data={setsData}
                renderItem={({ item }: { item: SetsListItem }) => {
                  return (
                    <View style={styles.setRow}>
                      <View style={styles.setColNum}>
                        <Text style={styles.cellText}>{item.key}</Text>
                      </View>
                      <View style={styles.setColWeight}>
                        <Text style={styles.cellText}>{item.set.weightKg}</Text>
                      </View>
                      <View style={styles.setColReps}>
                        <Text style={styles.cellText}>{item.set.reps}</Text>
                      </View>
                      <View style={styles.setColRpe}>
                        <Text style={styles.cellText}>
                          {item.set.perceivedExertion}
                        </Text>
                      </View>
                    </View>
                  );
                }}
              />
            </>
          )}
        </View>
      </Card>
    </TouchableOpacity>
  );
}
