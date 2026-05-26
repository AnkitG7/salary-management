import { theme } from "antd";

export function useThemeTokens() {
  const { token } = theme.useToken();

  return {
    token,
  };
}
