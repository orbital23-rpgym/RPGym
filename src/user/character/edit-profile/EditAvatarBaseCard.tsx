import { FontAwesome } from "@expo/vector-icons";
import { useContext, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import { AVATAR_BASE_ICONS, AVATAR_BASE_OPTIONS } from "constants/avatar-base";
import { themes } from "constants/colors";
import { Card, CardProps } from "library/components/Card";
import { IconGridOption } from "library/components/IconGridOption";
import { Text } from "library/components/Themed";
import { ColorSchemeContext } from "library/context/ColorSchemeContext";
import AvatarBase from "src/rpg/avatar/AvatarBase";

export type EditAvatarBaseCardProps = {
  onChange: (newAvatarBase: AvatarBase) => void;
  oldAvatarBase: AvatarBase;
} & Omit<CardProps, "children" | "title">;
export function EditAvatarBaseCard(props: EditAvatarBaseCardProps) {
  const { onChange, oldAvatarBase } = props;
  const [skinColor, setSkinColor] = useState(oldAvatarBase.skinColor);
  const [hairColor, setHairColor] = useState(oldAvatarBase.hairColor);
  const [frontHair, setFrontHair] = useState(oldAvatarBase.frontHair);
  const [backHair, setBackHair] = useState(oldAvatarBase.backHair);
  const [background, setBackground] = useState(oldAvatarBase.background);
  const [facialHair, setFacialHair] = useState(oldAvatarBase.facialHair);
  const [bodySize, setBodySize] = useState(oldAvatarBase.bodySize);
  const [glasses, setGlasses] = useState(oldAvatarBase.glasses);
  const styles = StyleSheet.create({
    container: {
      width: "100%",
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 15,
      padding: 5,
      alignContent: "center",
      alignItems: "center",
      justifyContent: "center",
    },
    headerText: {
      fontFamily: "Header",
      fontSize: 20,
      flex: 1,
    },
    headerBar: {
      flexDirection: "row",
      gap: 5,
    },
  });
  const sections = {
    main: {
      header: (
        <View style={styles.headerBar}>
          <Text style={styles.headerText}>Avatar</Text>
        </View>
      ),
      body: (
        <View style={styles.container}>
          <IconGridOption
            label="Skin Color"
            color={AVATAR_BASE_ICONS.skinColor[skinColor]}
            onPress={() => setCurrentSection("skinColor")}
          />
          <IconGridOption
            label="Hair Color"
            color={AVATAR_BASE_ICONS.hairColor[hairColor]}
            onPress={() => setCurrentSection("hairColor")}
          />
          <IconGridOption
            label="Hairstyle"
            image={AVATAR_BASE_ICONS.backHair[hairColor][backHair]}
            onPress={() => setCurrentSection("hairstyle")}
          />
          <IconGridOption
            label="Bangs"
            image={AVATAR_BASE_ICONS.frontHair[hairColor][frontHair]}
            onPress={() => setCurrentSection("bangs")}
          />
          <IconGridOption
            label="Facial Hair"
            image={AVATAR_BASE_ICONS.faceHair[hairColor][facialHair]}
            onPress={() => setCurrentSection("facialHair")}
          />
          <IconGridOption
            label="Glasses"
            image={AVATAR_BASE_ICONS.glasses[glasses]}
            onPress={() => setCurrentSection("glasses")}
          />
          <IconGridOption
            label="Background"
            color={AVATAR_BASE_ICONS.background[background]}
            onPress={() => setCurrentSection("backgroundColor")}
          />
        </View>
      ),
    },
    skinColor: {
      header: (
        <CardHeaderBarWithBackButton
          title="Skin Color"
          onPress={() => setCurrentSection("main")}
        />
      ),
      body: (
        <View style={styles.container}>
          {AVATAR_BASE_OPTIONS.skinColor.map((value, index) => {
            return (
              <IconGridOption
                key={index}
                color={AVATAR_BASE_ICONS.skinColor[value]}
                selected={skinColor === value}
                onPress={() => {
                  setSkinColor(value);
                }}
              />
            );
          })}
        </View>
      ),
    },
    hairColor: {
      header: (
        <CardHeaderBarWithBackButton
          title="Hair Color"
          onPress={() => setCurrentSection("main")}
        />
      ),
      body: (
        <View style={styles.container}>
          {AVATAR_BASE_OPTIONS.hairColor.map((value, index) => {
            return (
              <IconGridOption
                key={index}
                color={AVATAR_BASE_ICONS.hairColor[value]}
                selected={hairColor === value}
                onPress={() => {
                  setHairColor(value);
                }}
              />
            );
          })}
        </View>
      ),
    },
    backgroundColor: {
      header: (
        <CardHeaderBarWithBackButton
          title="Background"
          onPress={() => setCurrentSection("main")}
        />
      ),
      body: (
        <View style={styles.container}>
          {AVATAR_BASE_OPTIONS.background.map((value, index) => {
            return (
              <IconGridOption
                key={index}
                color={AVATAR_BASE_ICONS.background[value]}
                selected={background === value}
                onPress={() => {
                  setBackground(value);
                }}
              />
            );
          })}
        </View>
      ),
    },
    hairstyle: {
      header: (
        <CardHeaderBarWithBackButton
          title="Hairstyle"
          onPress={() => setCurrentSection("main")}
        />
      ),
      body: (
        <View style={styles.container}>
          {AVATAR_BASE_OPTIONS.backHair.map((value, index) => {
            return (
              <IconGridOption
                key={index}
                image={AVATAR_BASE_ICONS.backHair[hairColor][value]}
                selected={backHair === value}
                onPress={() => {
                  setBackHair(value);
                }}
              />
            );
          })}
        </View>
      ),
    },
    bangs: {
      header: (
        <CardHeaderBarWithBackButton
          title="Bangs"
          onPress={() => setCurrentSection("main")}
        />
      ),
      body: (
        <View style={styles.container}>
          {AVATAR_BASE_OPTIONS.frontHair.map((value, index) => {
            return (
              <IconGridOption
                key={index}
                image={AVATAR_BASE_ICONS.frontHair[hairColor][value]}
                selected={frontHair === value}
                onPress={() => {
                  setFrontHair(value);
                }}
              />
            );
          })}
        </View>
      ),
    },
    facialHair: {
      header: (
        <CardHeaderBarWithBackButton
          title="Facial Hair"
          onPress={() => setCurrentSection("main")}
        />
      ),
      body: (
        <View style={styles.container}>
          {AVATAR_BASE_OPTIONS.facialHair.map((value, index) => {
            return (
              <IconGridOption
                key={index}
                image={AVATAR_BASE_ICONS.faceHair[hairColor][value]}
                selected={facialHair === value}
                onPress={() => {
                  setFacialHair(value);
                }}
              />
            );
          })}
        </View>
      ),
    },
    glasses: {
      header: (
        <CardHeaderBarWithBackButton
          title="Glasses"
          onPress={() => setCurrentSection("main")}
        />
      ),
      body: (
        <View style={styles.container}>
          {AVATAR_BASE_OPTIONS.glasses.map((value, index) => {
            return (
              <IconGridOption
                key={index}
                image={AVATAR_BASE_ICONS.glasses[value]}
                selected={glasses === value}
                onPress={() => {
                  setGlasses(value);
                }}
              />
            );
          })}
        </View>
      ),
    },
  };
  const [currentSection, setCurrentSection] =
    useState<keyof typeof sections>("main");

  useEffect(() => {
    onChange(
      new AvatarBase(
        bodySize,
        skinColor,
        hairColor,
        frontHair,
        backHair,
        facialHair,
        glasses,
        background,
      ),
    );
  }, [
    bodySize,
    skinColor,
    hairColor,
    frontHair,
    backHair,
    facialHair,
    glasses,
    background,
  ]);

  return (
    <Card customHeaderBar={sections[currentSection].header}>
      {sections[currentSection].body}
    </Card>
  );
}

function CardHeaderBarWithBackButton(props: {
  title: string;
  onPress?: () => void;
}) {
  const colorScheme = useContext(ColorSchemeContext);
  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      gap: 10,
    },
    title: {
      fontFamily: "Header",
      fontSize: 20,
      flex: 1,
    },
    backButton: {
      alignContent: "center",
      alignItems: "center",
      justifyContent: "center",
    },
  });
  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={props.onPress}
        style={styles.backButton}
      >
        <FontAwesome
          name="chevron-left"
          size={20}
          color={themes[colorScheme].text}
        />
      </TouchableOpacity>
      <Text style={styles.title}>{props.title}</Text>
    </View>
  );
}
