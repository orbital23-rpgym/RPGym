import { Stack, useRouter } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import EquipmentSelectCard from "./EquipmentSelectCard";

import { themes } from "constants/colors";
import { fullWidthButton } from "constants/styles";
import { MAX_ELEMENT_WIDTH } from "constants/ui";
import { Button } from "library/components/Button";
import { ErrorDisplay } from "library/components/ErrorDisplay";
import { ButtonText } from "library/components/StyledText";
import { Screen, Text } from "library/components/Themed";
import { ColorSchemeContext } from "library/context/ColorSchemeContext";
import { useAppUser, useSetAppUser } from "library/context/UserContext";
import Avatar from "src/rpg/avatar/Avatar";
import AvatarEquipment, {
  AvatarEquipmentData,
} from "src/rpg/avatar/AvatarEquipment";
import AvatarRenderer from "src/rpg/avatar/AvatarRenderer";

export default function EquipmentSelectForm(props: {
  onSubmit?: (equipmentData: AvatarEquipmentData) => Promise<void>;
}) {
  const user = useAppUser();
  const setUser = useSetAppUser();
  const colorScheme = useContext(ColorSchemeContext);
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEdited, setIsEdited] = useState(false);

  const styles = StyleSheet.create({
    container: {
      width: "100%",
      alignContent: "center",
      justifyContent: "center",
      alignItems: "center",
      maxWidth: MAX_ELEMENT_WIDTH,
      gap: 20,
    },
    avatarContainer: {
      aspectRatio: 1,
      minHeight: 200,
      maxHeight: 300,
      borderRadius: 20,
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
    },
    submitButton: {
      alignContent: "center",
      justifyContent: "center",
    },
    submitButtonText: {
      color: themes[colorScheme].orange,
      fontFamily: "Header",
      fontSize: 18,
      opacity: isSubmitting || !isEdited ? 0.5 : 1,
    },
  });

  const inventory = user.character.items ?? [];
  const avatarEquipment = user.character.avatar.avatarEquipment;

  useEffect(() => {
    // refresh user character data
    user.character.getUserCharacter().then((value) => {
      user.setUserCharacter(value).then((value) => {
        setUser(value);
      });
    });
  }, []);

  const [chosen, setChosen] = useState<AvatarEquipmentData>(
    avatarEquipment.toData(),
  );
  const [error, setError] = useState<Error | undefined>(undefined);

  function onSubmitWrapped() {
    setIsSubmitting(true);
    setError(undefined);
    props.onSubmit &&
      props
        .onSubmit(chosen)
        .then(() => {
          router.back();
        })
        .catch((reason) => {
          setError(reason);
        })
        .finally(() => setIsSubmitting(false));
  }

  return (
    <Screen>
      <View style={styles.container}>
        <Stack.Screen
          options={{
            headerTitle: "Equip Items",
            headerRight: () => (
              <TouchableOpacity
                onPress={() => onSubmitWrapped()}
                activeOpacity={0.6}
                disabled={isSubmitting || !isEdited}
                style={styles.submitButton}
              >
                <Text style={styles.submitButtonText}>Save</Text>
              </TouchableOpacity>
            ),
          }}
        />
        {error && <ErrorDisplay error={error} />}
        <View style={styles.avatarContainer}>
          <AvatarRenderer
            avatar={Avatar.fromData({
              base: user.character.avatar.avatarBase.toData(),
              equipment: chosen,
            })}
          />
        </View>
        <EquipmentSelectCard
          itemType="helmet"
          items={inventory}
          title="Helmet"
          selectedItem={
            avatarEquipment.helmet ?? AvatarEquipment.EMPTY_EQUIPMENT.helmet
          }
          onSelect={(item) => {
            const { helmet, ...otherChosen } = chosen;
            setChosen({ helmet: item, ...otherChosen });
            setIsEdited(true);
          }}
        />
        <EquipmentSelectCard
          itemType="chestplate"
          items={inventory}
          title="Chestplate"
          selectedItem={
            avatarEquipment.chestplate ??
            AvatarEquipment.EMPTY_EQUIPMENT.chestplate
          }
          onSelect={(item) => {
            const { chestplate, ...otherChosen } = chosen;
            setChosen({ chestplate: item, ...otherChosen });
            setIsEdited(true);
          }}
        />
        <EquipmentSelectCard
          itemType="leggings"
          items={inventory}
          title="Leggings"
          selectedItem={
            avatarEquipment.leggings ?? AvatarEquipment.EMPTY_EQUIPMENT.leggings
          }
          onSelect={(item) => {
            const { leggings, ...otherChosen } = chosen;
            setChosen({ leggings: item, ...otherChosen });
            setIsEdited(true);
          }}
        />
        <EquipmentSelectCard
          itemType="boots"
          items={inventory}
          title="Boots"
          selectedItem={
            avatarEquipment.boots ?? AvatarEquipment.EMPTY_EQUIPMENT.boots
          }
          onSelect={(item) => {
            const { boots, ...otherChosen } = chosen;
            setChosen({ boots: item, ...otherChosen });
            setIsEdited(true);
          }}
        />
        <EquipmentSelectCard
          itemType="mainHand"
          items={inventory}
          title="Main Hand"
          selectedItem={
            avatarEquipment.mainHand ?? AvatarEquipment.EMPTY_EQUIPMENT.mainHand
          }
          onSelect={(item) => {
            const { mainHand, ...otherChosen } = chosen;
            setChosen({ mainHand: item, ...otherChosen });
            setIsEdited(true);
          }}
        />
        <EquipmentSelectCard
          itemType="offHand"
          items={inventory}
          title="Secondary Hand"
          selectedItem={
            avatarEquipment.offHand ?? AvatarEquipment.EMPTY_EQUIPMENT.offHand
          }
          onSelect={(item) => {
            const { offHand, ...otherChosen } = chosen;
            setChosen({ offHand: item, ...otherChosen });
            setIsEdited(true);
          }}
        />
      </View>
      <Button
        style={fullWidthButton.button}
        variant="primary"
        onPress={() => router.push("/equipment/shop")}
      >
        <ButtonText style={fullWidthButton.text}>
          {"Get more equipment in the Rewards Shop!"}
        </ButtonText>
      </Button>
    </Screen>
  );
}
