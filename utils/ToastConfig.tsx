import { BaseToast, ErrorToast } from "react-native-toast-message";

export const ToastConfig = {
  /*
      Overwrite 'success' type,
      by modifying the existing `BaseToast` component
    */
  success: (props) => (
    <BaseToast
      {...props}
      style={{ borderLeftWidth: 0, backgroundColor: "#0E0B13" }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 15,
        color: "#EFD05B",
        textAlign: "center",
        fontWeight: "400",
      }}
    />
  ),
  /*
      Overwrite 'error' type,
      by modifying the existing `ErrorToast` component
    */
  error: (props) => (
    <ErrorToast
      {...props}
      style={{ backgroundColor: "#0E0B13", borderLeftWidth: 0 }}
      text1Style={{
        fontSize: 17,
        textAlign: "center",
        color: "rgb(192 38 211)",
      }}
      text2Style={{
        fontSize: 15,
      }}
    />
  ),
};
