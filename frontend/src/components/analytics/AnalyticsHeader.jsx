import { Typography } from "antd";

const { Title, Text } = Typography;

export default function AnalyticsHeader() {
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
        }}
      >
        Analytics Dashboard
      </Title>

      <Text
        type="secondary"
        style={{
          fontSize: 16,
        }}
      >
        Workforce salary insights, compensation benchmarking, and employee
        distribution analytics.
      </Text>
    </div>
  );
}
