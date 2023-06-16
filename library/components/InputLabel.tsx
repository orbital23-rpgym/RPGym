import { Text, TextProps } from "./Themed";

/**
 * Custom styled text for use with form input elements.
 */
export function InputLabel(props: TextProps) {
  return (
    <Text
      {...props}
      style={[
        props.style,
        { fontFamily: "BodyRegular", fontSize: 16, marginTop: 5 },
      ]}
    />
  );
}
