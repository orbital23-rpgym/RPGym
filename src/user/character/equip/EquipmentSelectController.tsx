import EquipmentSelectForm from "./EquipmentSelectForm";

import { useAppUser, useSetAppUser } from "library/context/UserContext";
import Avatar from "src/rpg/avatar/Avatar";
import { AvatarEquipmentData } from "src/rpg/avatar/AvatarEquipment";

export default function EquipmentSelectController() {
  const user = useAppUser();
  const setUser = useSetAppUser();
  async function submit(data: AvatarEquipmentData) {
    const avatar = Avatar.fromData({
      base: user.character.avatar.avatarBase,
      equipment: data,
    });
    const newUserCharacter = await user.character.updateProfile(
      user.character.displayName,
      user.character.bio,
      avatar,
    );
    const newUser = await user.setUserCharacter(newUserCharacter);
    setUser(newUser);
  }

  return <EquipmentSelectForm onSubmit={submit} />;
}
