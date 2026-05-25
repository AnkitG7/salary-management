import { Card, Col, Radio, Row, Select, Statistic, Typography } from "antd";

import {
  WalletOutlined,
  FundProjectionScreenOutlined,
} from "@ant-design/icons";

const { Text, Title } = Typography;

import { Tag } from "antd";

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
  return (
    <Card
      // bordered={false}
      variant="borderless"
      style={{
        borderRadius: 20,
        marginBottom: 24,
        boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
      }}
    >
      {/* Header */}
      <div
        style={{
          marginBottom: 24,
        }}
      >
        <Text
          strong
          style={{
            fontSize: 20,
          }}
        >
          Job Title Analytics
        </Text>

        <div>
          <div
            style={{
              marginTop: 10,
            }}
          >
            <Tag
              color="blue"
              style={{
                padding: "4px 10px",
                borderRadius: 999,
                fontWeight: 600,
                textTransform: "uppercase",
              }}
            >
              Country: {selectedCountry}
            </Tag>
          </div>
        </div>
      </div>

      {/* Controls */}
      <Row
        gutter={[16, 16]}
        style={{
          marginBottom: 32,
        }}
      >
        <Col xs={24} lg={8}>
          <Radio.Group
            value={mode}
            onChange={(event) => setMode(event.target.value)}
          >
            <Radio value="all">All Job Titles</Radio>

            <Radio value="single">Single Job Title</Radio>
          </Radio.Group>
        </Col>

        <Col xs={24} lg={16}>
          <Select
            disabled={mode !== "single"}
            placeholder="Select Job Title"
            value={selectedJobTitle || undefined}
            onChange={setSelectedJobTitle}
            style={{
              width: "100%",
            }}
            size="large"
            options={jobTitles.map((job) => ({
              label: formatLabel(job),

              value: job,
            }))}
          />
        </Col>
      </Row>

      {/* ALL JOB TITLES MODE */}
      {mode === "all" && (
        <>
          <div
            style={{
              marginBottom: 24,
            }}
          >
            <Title
              level={4}
              style={{
                marginBottom: 4,
              }}
            >
              Average Salary For All Job Titles
            </Title>

            <Text type="secondary">
              Compensation benchmarks across all available roles.
            </Text>
          </div>

          <Row gutter={[16, 16]}>
            {allJobTitleInsights.map((item) => (
              <Col xs={24} sm={12} xl={6} key={item.job_title}>
                <Card
                  bordered={false}
                  style={{
                    borderRadius: 16,
                    height: "100%",
                    background: "#fafafa",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      marginBottom: 16,
                    }}
                  >
                    <div
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: "50%",
                        background: "#f4ebff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#7c3aed",
                      }}
                    >
                      <FundProjectionScreenOutlined />
                    </div>

                    <div>
                      <Text strong>{formatLabel(item.job_title)}</Text>

                      <div>
                        <Text
                          type="secondary"
                          style={{
                            fontSize: 12,
                          }}
                        >
                          Average Compensation
                        </Text>
                      </div>
                    </div>
                  </div>

                  <Statistic
                    value={item.average_salary}
                    precision={2}
                    prefix={<WalletOutlined />}
                    suffix={item.currency}
                    valueStyle={{
                      fontSize: 24,
                      fontWeight: 700,
                    }}
                  />
                </Card>
              </Col>
            ))}
          </Row>
        </>
      )}

      {/* SINGLE JOB TITLE MODE */}
      {mode === "single" && singleJobTitleInsight && (
        <Card
          bordered={false}
          style={{
            borderRadius: 16,
            background: "#faf5ff",
          }}
        >
          <Row gutter={[24, 24]} align="middle">
            <Col xs={24} md={6}>
              <div
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: "50%",
                  background: "#e9d5ff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 32,
                  color: "#7c3aed",
                }}
              >
                <FundProjectionScreenOutlined />
              </div>
            </Col>

            <Col xs={24} md={18}>
              <Text
                type="secondary"
                style={{
                  fontSize: 14,
                }}
              >
                Selected Job Title
              </Text>

              <Title
                level={3}
                style={{
                  marginTop: 8,
                  marginBottom: 16,
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
              />
            </Col>
          </Row>
        </Card>
      )}
    </Card>
  );
}
