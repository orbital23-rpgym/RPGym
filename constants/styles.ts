export const headingTextStyle = {
  fontFamily: "Header",
  fontSize: 25,
};

export const headerStyle = {
  headerTransparent: true,
  headerLeftContainerStyle: {
    padding: 5,
  },
  headerRightContainerStyle: {
    padding: 10,
  },
  headerTitleStyle: {
    ...headingTextStyle,
  },
};

export const dropShadow = (color: string) => ({
  shadowColor: color,
  shadowOpacity: 0.5,
  shadowRadius: 4,
  shadowOffset: { width: 0, height: 1 },
});
