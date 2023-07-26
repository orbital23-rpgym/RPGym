import { Stack } from "expo-router";
import { useContext, useState } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import { EditAvatarBaseCard } from "./EditAvatarBaseCard";

import { palette, themes } from "constants/colors";
import { MAX_ELEMENT_WIDTH } from "constants/ui";
import { Card } from "library/components/Card";
import { ErrorDisplay } from "library/components/ErrorDisplay";
import { InputLabel } from "library/components/InputLabel";
import { TextInput } from "library/components/TextInput";
import { Text, View } from "library/components/Themed";
import { ColorSchemeContext } from "library/context/ColorSchemeContext";
import Avatar from "src/rpg/avatar/Avatar";
import AvatarRenderer from "src/rpg/avatar/AvatarRenderer";

export type TempUserCharacter = {
  displayName: string;
  bio: string;
  avatar: Avatar;
};
export default function EditProfileForm(props: {
  onSubmit: (displayName: string, bio: string, avatar: Avatar) => Promise<void>;
  oldCharacter: TempUserCharacter;
}) {
  const colorScheme = useContext(ColorSchemeContext);
  const [bio, setBio] = useState(props.oldCharacter.bio);
  const [displayName, setDisplayName] = useState(
    props.oldCharacter.displayName,
  );
  const [avatar, setAvatar] = useState(props.oldCharacter.avatar);
  const [error, setError] = useState<Error | undefined>(undefined);
  const [isEdited, setIsEdited] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = (displayName: string, bio: string, avatar: Avatar) => {
    // Disable submit button
    setIsSubmitting(true);
    // Reset list of errors
    setError(undefined);
    props
      .onSubmit(displayName, bio, avatar)
      .catch((e: Error) => {
        setError(e);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const styles = StyleSheet.create({
    container: {
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
      maxWidth: MAX_ELEMENT_WIDTH,
      gap: 20,
      paddingTop: 30,
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
    avatarContainer: {
      aspectRatio: 1,
      minHeight: 200,
      maxHeight: 300,
      borderRadius: 20,
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
    },
    nameAndBioContainer: {
      flexDirection: "column",
      width: "100%",
      alignContent: "center",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: palette.transparent,
    },
    bioTextField: {
      minHeight: 125,
    },
    profileTextField: {
      width: "100%",
      paddingVertical: 8,
      paddingHorizontal: 15,
      color: themes[colorScheme].text,
      backgroundColor: themes[colorScheme].background,
      marginBottom: 10,
    },
    profileInputLabel: {
      fontFamily: "Header",
      padding: 5,
      width: "100%",
      height: "auto",
      marginTop: 0,
    },
    spacer: {
      height: 100,
    },
  });

  return (
    <KeyboardAvoidingView style={styles.container} behavior="height">
      <Stack.Screen
        options={{
          title: "Edit Profile",
          headerRight: () => (
            <TouchableOpacity
              onPress={() => submit(displayName, bio, avatar)}
              activeOpacity={0.5}
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
        <AvatarRenderer avatar={avatar} baseOnly />
      </View>

      <Card title="Profile">
        <View style={styles.nameAndBioContainer}>
          <InputLabel id="displayname-label" style={styles.profileInputLabel}>
            Display Name
          </InputLabel>
          <TextInput
            accessibilityLabelledBy="displayname-label"
            onChangeText={(text) => {
              setDisplayName(text);
              setIsEdited(true);
            }}
            autoComplete="name"
            autoCapitalize="words"
            defaultValue={displayName}
            style={styles.profileTextField}
          />
          <InputLabel id="bio-label" style={styles.profileInputLabel}>
            Bio
          </InputLabel>
          <TextInput
            accessibilityLabelledBy="bio-label"
            onChangeText={(text) => {
              setBio(text);
              setIsEdited(true);
            }}
            autoComplete="off"
            autoCapitalize="sentences"
            multiline
            numberOfLines={5}
            placeholder="Tell us a bit about yourself!"
            placeholderTextColor={themes[colorScheme].gray}
            defaultValue={bio}
            style={[styles.profileTextField, styles.bioTextField]}
          />
        </View>
      </Card>
      <EditAvatarBaseCard
        onChange={(avatarBase) => {
          setAvatar(new Avatar(avatarBase, avatar.avatarEquipment));
          setIsEdited(true);
        }}
        oldAvatarBase={avatar.avatarBase}
      />
      <View style={styles.spacer} />
    </KeyboardAvoidingView>
  );
}
