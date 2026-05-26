import {
  Card,
  Col,
  Radio,
  Row,
  Select,
  Statistic,
  Typography,
  Tag,
  theme,
} from "antd";

import {
  WalletOutlined,
  FundProjectionScreenOutlined,
} from "@ant-design/icons";

const { Text, Title } = Typography;

function formatLabel(value = "") {
  return value
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export default function JobTitleAnalyticsSection({
  mode,
  setMode,
  selectedJobTitle,
  setSelectedJobTitle,
  jobTitles,
  allJobTitleInsights,
  selectedCountry,
  singleJobTitleInsight,
}) {
  const { token } = theme.useToken();
  return (
    <Card
      variant="borderless"
      style={{
        borderRadius: 32,
        marginBottom: 28,
        // background: "#ffffff",
        background: token.colorBgContainer,
        // border: "1px solid rgba(226,232,240,0.8)",
        border: `1px solid ${token.colorBorderSecondary}`,
        // boxShadow: "0 10px 40px rgba(15,23,42,0.06)",
        boxShadow: token.boxShadowSecondary,
        overflow: "hidden",
      }}
      styles={{
        body: {
          padding: 32,
        },
      }}
    >
      {/* Header */}
      <div
        style={{
          marginBottom: 32,
        }}
      >
        <Title
          level={2}
          style={{
            marginBottom: 8,
            // color: "#0f172a",
            color: token.colorText,
            fontWeight: 700,
            letterSpacing: "-0.8px",
          }}
        >
          Job Title Analytics
        </Title>

        <Text
          style={{
            // color: "#64748b",
            color: token.colorTextDescription,
            fontSize: 15,
          }}
        >
          Compare compensation insights across workforce roles.
        </Text>

        <div
          style={{
            marginTop: 18,
          }}
        >
          <Tag
            style={{
              padding: "8px 14px",
              borderRadius: 999,
              fontWeight: 600,
              fontSize: 12,
              border: "none",
              background: "rgba(59,130,246,0.1)",
              color: "#2563eb",
              letterSpacing: "0.4px",
              textTransform: "uppercase",
            }}
          >
            Viewing Country: {formatLabel(selectedCountry)}
          </Tag>
        </div>
      </div>

      {/* Controls */}
      <Row
        gutter={[20, 20]}
        align="middle"
        style={{
          marginBottom: 40,
        }}
      >
        <Col xs={24} lg={8}>
          <Radio.Group
            value={mode}
            onChange={(event) => setMode(event.target.value)}
            size="large"
            style={{
              // background: "#f8fafc",
              background: token.colorBgElevated,
              padding: 6,
              borderRadius: 14,
              // border: "1px solid rgba(226,232,240,0.9)",
              border: `1px solid ${token.colorBorderSecondary}`,
            }}
          >
            <Radio.Button value="all">All Job Titles</Radio.Button>

            <Radio.Button value="single">Single Job Title</Radio.Button>
          </Radio.Group>
        </Col>

        <Col xs={24} lg={16}>
          <Select
            disabled={mode !== "single"}
            placeholder="Select Job Title"
            value={selectedJobTitle || undefined}
            onChange={setSelectedJobTitle}
            size="large"
            style={{
              width: "100%",
            }}
            options={jobTitles.map((job) => ({
              label: formatLabel(job),
              value: job,
            }))}
          />
        </Col>
      </Row>

      {/* ALL MODE */}
      {mode === "all" && (
        <>
          <div
            style={{
              marginBottom: 28,
            }}
          >
            <Title
              level={3}
              style={{
                marginBottom: 6,
                // color: "#0f172a",
                color: token.colorText,
                letterSpacing: "-0.5px",
              }}
            >
              Average Salary By Role
            </Title>

            <Text
              style={{
                // color: "#64748b",
                color: token.colorTextDescription,
                fontSize: 14,
              }}
            >
              Compensation benchmarks across all available positions.
            </Text>
          </div>

          <Row gutter={[20, 20]}>
            {allJobTitleInsights.map((item, index) => (
              <Col xs={24} sm={12} xl={6} key={item.job_title}>
                <Card
                  variant="borderless"
                  style={{
                    borderRadius: 24,
                    height: "100%",
                    // background: "#ffffff",
                    background: token.colorBgContainer,
                    // border: "1px solid rgba(226,232,240,0.7)",
                    border: `1px solid ${token.colorBorderSecondary}`,
                    // boxShadow: "0 4px 20px rgba(15,23,42,0.04)",
                    boxShadow: token.boxShadowSecondary,
                    transition: "all 0.25s ease",
                  }}
                  bodyStyle={{
                    padding: 24,
                  }}
                >
                  {/* Top */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 14,
                      marginBottom: 22,
                    }}
                  >
                    <div
                      style={{
                        width: 52,
                        height: 52,
                        borderRadius: 18,
                        background:
                          "linear-gradient(135deg, rgba(99,102,241,0.12) 0%, rgba(59,130,246,0.12) 100%)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#4f46e5",
                        fontSize: 20,
                      }}
                    >
                      <FundProjectionScreenOutlined />
                    </div>

                    <div>
                      <Text
                        strong
                        style={{
                          display: "block",
                          fontSize: 15,
                          // color: "#0f172a",
                          color: token.colorText,
                        }}
                      >
                        {formatLabel(item.job_title)}
                      </Text>

                      <Text
                        style={{
                          // color: "#94a3b8",
                          color: token.colorTextSecondary,
                          fontSize: 12,
                        }}
                      >
                        Average Compensation
                      </Text>
                    </div>
                  </div>

                  {/* Salary */}
                  <Statistic
                    value={item.average_salary}
                    precision={2}
                    prefix={<WalletOutlined />}
                    suffix={item.currency}
                    valueStyle={{
                      fontSize: 28,
                      fontWeight: 800,
                      // color: "#0f172a",
                      color: token.colorText,
                      letterSpacing: "-1px",
                    }}
                  />
                </Card>
              </Col>
            ))}
          </Row>
        </>
      )}

      {/* SINGLE MODE */}
      {mode === "single" && singleJobTitleInsight && (
        <Card
          variant="borderless"
          style={{
            borderRadius: 28,
            background:
              "linear-gradient(135deg, rgba(99,102,241,0.06) 0%, rgba(59,130,246,0.04) 100%)",
            // border: "1px solid rgba(226,232,240,0.8)",
            border: `1px solid ${token.colorBorderSecondary}`,
            // boxShadow: "0 10px 30px rgba(15,23,42,0.05)",
            boxShadow: token.boxShadowSecondary,
          }}
          bodyStyle={{
            padding: 32,
          }}
        >
          <Row gutter={[28, 28]} align="middle">
            {/* Icon */}
            <Col xs={24} md={6}>
              <div
                style={{
                  width: 96,
                  height: 96,
                  borderRadius: "28px",
                  background:
                    "linear-gradient(135deg, #6366f1 0%, #3b82f6 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 38,
                  color: "#ffffff",
                  boxShadow: "0 10px 24px rgba(99,102,241,0.24)",
                }}
              >
                <FundProjectionScreenOutlined />
              </div>
            </Col>

            {/* Content */}
            <Col xs={24} md={18}>
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  // color: "#64748b",
                  color: token.colorTextDescription,
                  letterSpacing: "0.4px",
                  textTransform: "uppercase",
                }}
              >
                Selected Job Role
              </Text>

              <Title
                level={2}
                style={{
                  marginTop: 10,
                  marginBottom: 20,
                  // color: "#0f172a",
                  color: token.colorText,
                  letterSpacing: "-0.8px",
                }}
              >
                {formatLabel(singleJobTitleInsight.job_title)}
              </Title>

              <Statistic
                title="Average Compensation"
                value={singleJobTitleInsight.average_salary}
                precision={2}
                prefix={<WalletOutlined />}
                suffix={singleJobTitleInsight.currency}
                valueStyle={{
                  fontSize: 38,
                  fontWeight: 800,
                  // color: "#0f172a",
                  color: token.colorText,
                  letterSpacing: "-1px",
                }}
              />
            </Col>
          </Row>
        </Card>
      )}
    </Card>
  );
}
