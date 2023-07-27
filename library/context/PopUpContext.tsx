import { useRouter } from "expo-router";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { ViewProps } from "react-native";

// handles pop up modals for notification purposes.

export type PopUpData = {
  href?: string;
  data?: unknown;
};
export const PopUpContext = createContext<{
  data: PopUpData | undefined;
  setData: Dispatch<SetStateAction<PopUpData>> | undefined;
}>({ data: undefined, setData: undefined });

export function PopUpProvider(props: ViewProps) {
  const [data, setData] = useState<PopUpData>({});
  const router = useRouter();

  useEffect(() => {
    // if there is a notification (i.e. href not undefined), push to router
    if (data.href) {
      router.push(data.href);
    }
  }, [data]);

  return (
    <PopUpContext.Provider value={{ data, setData }}>
      {props.children}
    </PopUpContext.Provider>
  );
}
