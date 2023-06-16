export const headerStyle = {
  headerTransparent: true,
  headerLeftContainerStyle: {
    padding: 5,
  },
  headerRightContainerStyle: {
    padding: 10,
  },
  headerTitleStyle: {
    fontFamily: "Header",
    fontSize: 24,
  },
};

export const dropShadow = (color: string) => ({
  shadowColor: color,
  shadowOpacity: 0.5,
  shadowRadius: 4,
  shadowOffset: { width: 0, height: 1 },
});
