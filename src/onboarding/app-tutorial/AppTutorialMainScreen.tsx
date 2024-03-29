import { Image } from "expo-image";
import { Stack, useRouter } from "expo-router";
import { Dimensions, StyleSheet, View } from "react-native";
import Carousel from "react-native-reanimated-carousel";

import { TUTORIAL_SLIDES } from "constants/onboarding";
import { Button } from "library/components/Button";
import { Card } from "library/components/Card";
import { GradientBackgroundScreen } from "library/components/GradientBackground";
import { ButtonText, HeadingText } from "library/components/StyledText";

export default function AppTutorialMainScreen() {
  const router = useRouter();
  const width = Dimensions.get("window").width;

  const styles = StyleSheet.create({
    container: {
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
    },
    cardContents: {
      width: "100%",
      height: "100%",
      justifyContent: "center",
      alignItems: "center",
      gap: 20,
      padding: 20,
      paddingVertical: 40,
    },
    slide: {
      width: "100%",
      height: "100%",
      justifyContent: "center",
      alignItems: "center",
      gap: 15,
    },
    slideImage: {
      flex: 1,
      width: "100%",
    },
    promptText: {
      textAlign: "center",
      marginBottom: 20,
    },
    submitButton: {
      width: "100%",
      minWidth: 150,
      alignContent: "center",
      justifyContent: "center",
    },
    submitButtonText: {
      textAlign: "center",
      fontSize: 22,
    },
  });
  return (
    <GradientBackgroundScreen>
      <Stack.Screen
        options={{
          headerTitle: "Tutorial",
          headerShown: true,
        }}
      />
      <View style={styles.container}>
        <Carousel
          loop={false}
          width={width}
          autoPlay={false}
          mode="parallax"
          data={TUTORIAL_SLIDES}
          scrollAnimationDuration={1000}
          renderItem={({ index }) => (
            <View style={styles.slide}>
              <Card>
                <View style={styles.cardContents}>
                  <Image
                    source={TUTORIAL_SLIDES[index].image}
                    contentFit="contain"
                    contentPosition="center"
                    style={styles.slideImage}
                  />

                  <HeadingText style={styles.promptText}>
                    {TUTORIAL_SLIDES[index].caption}
                  </HeadingText>
                  {index === TUTORIAL_SLIDES.length - 1 && (
                    <Button
                      onPress={() => {
                        router.push("/onboarding/complete");
                      }}
                      variant="primary"
                      style={styles.submitButton}
                    >
                      <ButtonText style={styles.submitButtonText}>
                        {"I'm ready!"}
                      </ButtonText>
                    </Button>
                  )}
                </View>
              </Card>
            </View>
          )}
        />
      </View>
    </GradientBackgroundScreen>
  );
}
