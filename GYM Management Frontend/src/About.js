import React from "react";
import { FaDumbbell } from "react-icons/fa";
import { Row, Col, Card, Typography } from "antd";
const { Title, Text, Link } = Typography;

const items = [
  {
    title: "Basic Fitness",
    description:
      "A beginner-friendly fitness program designed to improve your overall health and well-being through simple exercises and routines.",
  },
  {
    title: "New Gym Training",
    description:
      "Discover the latest gym techniques and workouts tailored to help you build strength and endurance effectively.",
  },
  {
    title: "Basic Muscle Course",
    description:
      "Learn the fundamentals of muscle building, including proper form, essential exercises, and nutrition tips.",
  },
  {
    title: "Advanced Muscle Course",
    description:
      "Take your training to the next level with advanced techniques and strategies for maximizing muscle growth and definition.",
  },
  {
    title: "Yoga Training",
    description:
      "Embrace the art of yoga to enhance flexibility, reduce stress, and achieve a balanced mind and body.",
  },
  {
    title: "Body Building Course",
    description:
      "A comprehensive program focused on achieving peak physical performance through disciplined training and proper diet.",
  },
];

const About = () => {
  return (
    <div style={{ padding: "40px", backgroundColor: "#f9f9f9" }}>
      <Row gutter={[32, 32]}>
        <Col xs={24} md={12}>
          {items.slice(0, 3).map((item, index) => (
            <Card
              key={index}
              bordered={false}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexDirection: "row",
                height: "200px",
                marginBottom: "20px",
                backgroundColor: "#fff",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
              }}
            >
              <FaDumbbell
                style={{
                  fontSize: "48px",
                  color: "#ff6600",
                  marginRight: "20px",
                }}
              />
              <div style={{ flex: 1 }}>
                <Title level={4}>{item.title}</Title>
                <Text>{item.description}</Text>
                <br />
                <Link href="#" style={{ color: "#ff6600", fontWeight: "bold" }}>
                  DISCOVER MORE
                </Link>
              </div>
            </Card>
          ))}
        </Col>

        <Col xs={24} md={12}>
          {items.slice(3).map((item, index) => (
            <Card
              key={index}
              bordered={false}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexDirection: "row",
                height: "200px",
                marginBottom: "20px",
                backgroundColor: "#fff",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
              }}
            >
              <FaDumbbell
                style={{
                  fontSize: "48px",
                  color: "#ff6600",
                  marginRight: "20px",
                }}
              />
              <div style={{ flex: 1 }}>
                <Title level={4}>{item.title}</Title>
                <Text>{item.description}</Text>
                <br />
                <Link href="#" style={{ color: "#ff6600", fontWeight: "bold" }}>
                  DISCOVER MORE
                </Link>
              </div>
            </Card>
          ))}
        </Col>
      </Row>
    </div>
  );
};

export default About;
