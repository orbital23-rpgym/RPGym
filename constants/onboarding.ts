/**
 * Image imports and constants for onboarding portion of app.
 */

import { ImageSource } from "expo-image";

export const ONBOARDING_IMAGES = {
  jimbro: {
    swordLeft: require("assets/images/jimbro/jimbro_sword_left.png"),
    swordRight: require("assets/images/jimbro/jimbro_sword_right.png"),
    waveLeft: require("assets/images/jimbro/jimbro_wave_left.png"),
    weightsLeft: require("assets/images/jimbro/jimbro_weights_left.png"),
    calendarRight: require("assets/images/jimbro/jimbro_calendar_right.png"),
  },
  speechBubble: {
    bottomLeft: require("assets/images/jimbro/speechbubble_left.png"),
    bottomRight: require("assets/images/jimbro/speechbubble_right.png"),
  },
};

export type OnboardingTutorialSlide = { image: ImageSource; caption: string };
export const TUTORIAL_SLIDES: OnboardingTutorialSlide[] = [
  {
    image: require("assets/images/tutorial/tabbar.png"),
    caption: "Use the tab bar to navigate through the RPGym app.",
  },
  {
    image: require("assets/images/tutorial/workout-tab.png"),
    caption: 'Add a new workout in the "Work Out" tab.',
  },
  {
    image: require("assets/images/tutorial/tracking-tab.png"),
    caption: 'View your progress in the "Tracking" tab.',
  },
  {
    image: require("assets/images/tutorial/history.png"),
    caption: "Navigate through your workout history using the calendar view.",
  },
  {
    image: require("assets/images/tutorial/quests-tab.png"),
    caption: "Complete Quests to build the habit of gymming.",
  },
  // {
  //   image: require("assets/images/tutorial/PLACEHOLDER.png"),
  //   caption: "Join a Party with your friends to motivate each other.",
  // },
  // {
  //   image: require("assets/images/tutorial/PLACEHOLDER.png"),
  //   caption: "Take part in campaigns and defeat bosses for handsome rewards.",
  // },
  {
    image: require("assets/images/tutorial/equipment.png"),
    caption:
      "Earn coins from gymming and purchase equipment to customise your avatar.",
  },

  {
    image: require("assets/images/logo/logo-gradient.png"),
    caption: "Are you ready to begin your RPGym journey?",
  },
];
