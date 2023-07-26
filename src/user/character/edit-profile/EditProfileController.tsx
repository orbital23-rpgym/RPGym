import { useRouter } from "expo-router";

import EditProfileForm, { TempUserCharacter } from "./EditProfileForm";

import { useAppUser, useSetAppUser } from "library/context/UserContext";
import Avatar from "src/rpg/avatar/Avatar";

export default function EditProfileController() {
  const router = useRouter();

  const user = useAppUser();
  const setUser = useSetAppUser();

  // deep copy user character info
  const tempUserCharacter: TempUserCharacter = {
    displayName: user.character.displayName,
    bio: user.character.bio,
    avatar: Avatar.fromData(user.character.avatar.toData()),
  };

  /**
   * Updates user profile.
   *
   * @param displayName Display name
   * @param bio Bio
   * @param avatar Avatar
   * @returns Promise that is fulfilled when signup completes.
   * @throws Error when sign up fails.
   */
  async function submit(displayName: string, bio: string, avatar: Avatar) {
    // Local input validation
    if (displayName === "") {
      throw new Error("Display name must not be empty");
    }
    const newUserCharacter = await user.character.updateProfile(
      displayName,
      bio,
      avatar,
    );
    const newUser = await user.setUserCharacter(newUserCharacter);
    setUser(newUser);
    // await user.character.updateToFirestore();
    router.back();
  }

  return <EditProfileForm onSubmit={submit} oldCharacter={tempUserCharacter} />;
}
