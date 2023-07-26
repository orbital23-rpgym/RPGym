import { FontAwesome } from "@expo/vector-icons";
import { Image, ImageSource } from "expo-image";
import { useContext, useEffect, useState } from "react";
import { StyleSheet, View, ViewProps } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import { AVATAR_BASE_ICONS, AVATAR_BASE_OPTIONS } from "constants/avatar-base";
import { palette, themes } from "constants/colors";
import { Card, CardProps } from "library/components/Card";
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
          <AvatarOption
            label="Skin Color"
            color={AVATAR_BASE_ICONS.skinColor[skinColor]}
            onPress={() => setCurrentSection("skinColor")}
          />
          <AvatarOption
            label="Hair Color"
            color={AVATAR_BASE_ICONS.hairColor[hairColor]}
            onPress={() => setCurrentSection("hairColor")}
          />
          <AvatarOption
            label="Hairstyle"
            image={AVATAR_BASE_ICONS.backHair[hairColor][backHair]}
            onPress={() => setCurrentSection("hairstyle")}
          />
          <AvatarOption
            label="Bangs"
            image={AVATAR_BASE_ICONS.frontHair[hairColor][frontHair]}
            onPress={() => setCurrentSection("bangs")}
          />
          <AvatarOption
            label="Facial Hair"
            image={AVATAR_BASE_ICONS.faceHair[hairColor][facialHair]}
            onPress={() => setCurrentSection("facialHair")}
          />
          <AvatarOption
            label="Glasses"
            image={AVATAR_BASE_ICONS.glasses[glasses]}
            onPress={() => setCurrentSection("glasses")}
          />
          <AvatarOption
            label="Background"
            color={AVATAR_BASE_ICONS.background[background]}
            onPress={() => setCurrentSection("backgroundColor")}
          />
        </View>
      ),
    },
    skinColor: {
      header: (
        <HeaderBarWithBackButton
          title="Skin Color"
          onPress={() => setCurrentSection("main")}
        />
      ),
      body: (
        <View style={styles.container}>
          {AVATAR_BASE_OPTIONS.skinColor.map((value, index) => {
            return (
              <AvatarOption
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
        <HeaderBarWithBackButton
          title="Hair Color"
          onPress={() => setCurrentSection("main")}
        />
      ),
      body: (
        <View style={styles.container}>
          {AVATAR_BASE_OPTIONS.hairColor.map((value, index) => {
            return (
              <AvatarOption
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
        <HeaderBarWithBackButton
          title="Background"
          onPress={() => setCurrentSection("main")}
        />
      ),
      body: (
        <View style={styles.container}>
          {AVATAR_BASE_OPTIONS.background.map((value, index) => {
            return (
              <AvatarOption
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
        <HeaderBarWithBackButton
          title="Hairstyle"
          onPress={() => setCurrentSection("main")}
        />
      ),
      body: (
        <View style={styles.container}>
          {AVATAR_BASE_OPTIONS.backHair.map((value, index) => {
            return (
              <AvatarOption
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
        <HeaderBarWithBackButton
          title="Bangs"
          onPress={() => setCurrentSection("main")}
        />
      ),
      body: (
        <View style={styles.container}>
          {AVATAR_BASE_OPTIONS.frontHair.map((value, index) => {
            return (
              <AvatarOption
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
        <HeaderBarWithBackButton
          title="Facial Hair"
          onPress={() => setCurrentSection("main")}
        />
      ),
      body: (
        <View style={styles.container}>
          {AVATAR_BASE_OPTIONS.facialHair.map((value, index) => {
            return (
              <AvatarOption
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
        <HeaderBarWithBackButton
          title="Glasses"
          onPress={() => setCurrentSection("main")}
        />
      ),
      body: (
        <View style={styles.container}>
          {AVATAR_BASE_OPTIONS.glasses.map((value, index) => {
            return (
              <AvatarOption
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

export type AvatarOptionProps = {
  label?: string;
  selected?: boolean;
  image?: ImageSource;
  color?: string;
  onPress?: () => void;
} & Pick<ViewProps, "children">;
export function AvatarOption(props: AvatarOptionProps) {
  const colorScheme = useContext(ColorSchemeContext);
  const {
    label = "",
    selected: isSelected = false,
    image,
    color,
    onPress,
    children,
  } = props;
  const styles = StyleSheet.create({
    container: {
      gap: 5,
      alignContent: "center",
      justifyContent: "center",
      borderRadius: 8,
      width: 71,
    },
    childContainer: {
      backgroundColor: isSelected
        ? themes[colorScheme].orange
        : themes[colorScheme].background,
      padding: 5,
      borderRadius: 5,
      aspectRatio: 1,
    },
    label: {
      fontFamily: "Header",
      fontSize: 12,
      textAlign: "center",
    },
    colorSolid: {
      width: "100%",
      height: "100%",
      backgroundColor: color ?? palette.transparent,
    },
    image: {
      width: "100%",
      height: "100%",
      flex: 1,
    },
  });
  const renderedChild = image ? (
    <Image source={image} contentFit="contain" style={styles.image} />
  ) : color ? (
    <View style={styles.colorSolid} />
  ) : (
    children
  );
  return (
    <TouchableOpacity activeOpacity={0.5} onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.childContainer}>{renderedChild}</View>
        {label !== "" && <Text style={styles.label}>{label}</Text>}
      </View>
    </TouchableOpacity>
  );
}

function HeaderBarWithBackButton(props: {
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
