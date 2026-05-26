import { Typography ,theme} from "antd";

const { Title, Text } = Typography;

export default function AnalyticsHeader() {
  const { token } = theme.useToken();
  return (
    <div
      style={{
        marginBottom: 32,
      }}
    >
      <Title
        level={2}
        style={{
          marginBottom: 4,
          color: token.colorText,
        }}
      >
        Analytics Dashboard
      </Title>

      <Text
        // type="secondary"
        style={{
          color: token.colorTextSecondary,
          fontSize: 16,
        }}
      >
        Workforce salary insights, compensation benchmarking, and employee
        distribution analytics.
      </Text>
    </div>
  );
}
