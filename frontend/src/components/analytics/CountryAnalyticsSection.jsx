import {
  Card,
  Col,
  Row,
  Select,
  Skeleton,
  Statistic,
  Typography,
  theme,
} from "antd";

import {
  FallOutlined,
  GlobalOutlined,
  RiseOutlined,
  WalletOutlined,
} from "@ant-design/icons";

const { Text, Title } = Typography;

function formatCountryLabel(value = "") {
  return value
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export default function CountryAnalyticsSection({
  countries = [],
  selectedCountry,
  setSelectedCountry,
  salaryInsights,
  loading,
}) {
  const { token } = theme.useToken();
  return (
    <Card
      variant="borderless"
      style={{
        borderRadius: 32,
        marginBottom: 28,
        background: token.colorBgContainer,
        // border: "1px solid rgba(226,232,240,0.8)",
        // border: "1px solid rgba(226,232,240,0.8)",
        border: `1px solid ${token.colorBorderSecondary}`,
        // boxShadow: "0 10px 40px rgba(15,23,42,0.06)",
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
          Country Based Analytics
        </Title>

        <Text
          style={{
            // color: "#64748b",
            color: token.colorTextDescription,
            fontSize: 15,
          }}
        >
          Analyze salary benchmarks and workforce compensation insights across
          regions.
        </Text>
      </div>

      {/* Country Selector */}
      <Row
        gutter={[20, 20]}
        style={{
          marginBottom: 36,
        }}
      >
        <Col xs={24}>
          <div
            style={{
              marginBottom: 10,
            }}
          >
            <Text
              strong
              style={{
                fontSize: 14,
                // color: "#334155",
                color: token.colorText,
              }}
            >
              Select Country
            </Text>
          </div>

          <Select
            placeholder="Select Country"
            value={selectedCountry}
            onChange={setSelectedCountry}
            size="large"
            suffixIcon={<GlobalOutlined />}
            style={{
              width: "100%",
            }}
            options={countries.map((country) => ({
              label: formatCountryLabel(country),
              value: country,
            }))}
          />
        </Col>
      </Row>

      {/* Loading */}
      {loading ? (
        <Row gutter={[20, 20]}>
          {[1, 2, 3].map((item) => (
            <Col xs={24} md={8} key={item}>
              <Card
                variant="borderless"
                style={{
                  borderRadius: 24,
                  // border: "1px solid rgba(226,232,240,0.7)",
                  border: `1px solid ${token.colorBorderSecondary}`,
                }}
              >
                <Skeleton active />
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <Row gutter={[20, 20]}>
          {/* Average Salary */}
          <Col xs={24} md={8}>
            <Card
              variant="borderless"
              style={{
                borderRadius: 28,
                background:
                  "linear-gradient(135deg, rgba(59,130,246,0.10) 0%, rgba(99,102,241,0.08) 100%)",
                border: "1px solid rgba(191,219,254,0.8)",
                height: "100%",
                boxShadow: "0 6px 24px rgba(59,130,246,0.08)",
              }}
              bodyStyle={{
                padding: 28,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 24,
                }}
              >
                <div>
                  <Text
                    style={{
                      // color: "#475569",
                      color: token.colorTextSecondary,
                      fontSize: 13,
                      fontWeight: 600,
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                    }}
                  >
                    Average Salary
                  </Text>

                  <div
                    style={{
                      marginTop: 6,
                    }}
                  >
                    <Text
                      style={{
                        // color: "#64748b",
                        color: token.colorTextDescription,
                        fontSize: 13,
                      }}
                    >
                      {formatCountryLabel(selectedCountry || "-")}
                    </Text>
                  </div>
                </div>

                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: 20,
                    background:
                      "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#ffffff",
                    fontSize: 22,
                    boxShadow: "0 10px 24px rgba(59,130,246,0.24)",
                  }}
                >
                  <WalletOutlined />
                </div>
              </div>

              <Statistic
                value={salaryInsights?.average_salary || 0}
                precision={2}
                suffix={salaryInsights?.currency || ""}
                valueStyle={{
                  fontSize: 34,
                  fontWeight: 800,
                  // color: "#0f172a",
                  color: token.colorText,
                  letterSpacing: "-1px",
                }}
              />
            </Card>
          </Col>

          {/* Minimum Salary */}
          <Col xs={24} md={8}>
            <Card
              variant="borderless"
              style={{
                borderRadius: 28,
                background:
                  "linear-gradient(135deg, rgba(245,158,11,0.10) 0%, rgba(251,191,36,0.08) 100%)",
                border: "1px solid rgba(253,230,138,0.8)",
                height: "100%",
                boxShadow: "0 6px 24px rgba(245,158,11,0.08)",
              }}
              bodyStyle={{
                padding: 28,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 24,
                }}
              >
                <div>
                  <Text
                    style={{
                      // color: "#475569",
                      color: token.colorTextSecondary,
                      fontSize: 13,
                      fontWeight: 600,
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                    }}
                  >
                    Minimum Salary
                  </Text>

                  <div
                    style={{
                      marginTop: 6,
                    }}
                  >
                    <Text
                      style={{
                        // color: "#64748b",
                        color: token.colorTextDescription,
                        fontSize: 13,
                      }}
                    >
                      {formatCountryLabel(selectedCountry || "-")}
                    </Text>
                  </div>
                </div>

                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: 20,
                    background:
                      "linear-gradient(135deg, #f59e0b 0%, #f97316 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#ffffff",
                    fontSize: 22,
                    boxShadow: "0 10px 24px rgba(245,158,11,0.24)",
                  }}
                >
                  <FallOutlined />
                </div>
              </div>

              <Statistic
                value={salaryInsights?.minimum_salary || 0}
                suffix={salaryInsights?.currency || ""}
                valueStyle={{
                  fontSize: 34,
                  fontWeight: 800,
                  // color: "#0f172a",
                  color: token.colorText,
                  letterSpacing: "-1px",
                }}
              />
            </Card>
          </Col>

          {/* Maximum Salary */}
          <Col xs={24} md={8}>
            <Card
              variant="borderless"
              style={{
                borderRadius: 28,
                background:
                  "linear-gradient(135deg, rgba(139,92,246,0.10) 0%, rgba(99,102,241,0.08) 100%)",
                border: "1px solid rgba(221,214,254,0.8)",
                height: "100%",
                boxShadow: "0 6px 24px rgba(139,92,246,0.08)",
              }}
              bodyStyle={{
                padding: 28,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 24,
                }}
              >
                <div>
                  <Text
                    style={{
                      // color: "#475569",
                      color: token.colorTextSecondary,
                      fontSize: 13,
                      fontWeight: 600,
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                    }}
                  >
                    Maximum Salary
                  </Text>

                  <div
                    style={{
                      marginTop: 6,
                    }}
                  >
                    <Text
                      style={{
                        // color: "#64748b",
                        color: token.colorTextDescription,
                        fontSize: 13,
                      }}
                    >
                      {formatCountryLabel(selectedCountry || "-")}
                    </Text>
                  </div>
                </div>

                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: 20,
                    background:
                      "linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#ffffff",
                    fontSize: 22,
                    boxShadow: "0 10px 24px rgba(139,92,246,0.24)",
                  }}
                >
                  <RiseOutlined />
                </div>
              </div>

              <Statistic
                value={salaryInsights?.maximum_salary || 0}
                suffix={salaryInsights?.currency || ""}
                valueStyle={{
                  fontSize: 34,
                  fontWeight: 800,
                  // color: "#0f172a",
                  color: token.colorText,
                  letterSpacing: "-1px",
                }}
              />
            </Card>
          </Col>
        </Row>
      )}

      {/* Footer */}
      <div
        style={{
          marginTop: 28,
          paddingTop: 20,
          // borderTop: "1px solid rgba(226,232,240,0.8)",
          borderTop: `1px solid ${token.colorBorderSecondary}`,
        }}
      >
        <Text
          style={{
            // color: "#64748b",
            color: token.colorTextDescription,
            fontSize: 13,
          }}
        >
          Salary statistics are generated dynamically based on employees from
          the selected country.
        </Text>
      </div>
    </Card>
  );
}
