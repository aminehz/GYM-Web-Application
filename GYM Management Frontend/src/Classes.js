import React, { useState } from "react";
import { Row, Col, Card, Button, Typography } from "antd";
import { FaDumbbell } from "react-icons/fa";
import first from "./assets/images/first.jpg";
import second from "./assets/images/second.jpg";
import third from "./assets/images/third.jpg";
import fourth from "./assets/images/fourth.jpg";

const { Title, Text } = Typography;

const classData = [
  {
    id: 1,
    title: "First Training Class",
    description:
      "Unlock your potential with our beginner-friendly training sessions, designed to build a strong foundation and improve your overall fitness",
    image: first, // Replace with your image URL
  },
  {
    id: 2,
    title: "Second Training Class",
    description:
      "Take your workouts to the next level with intermediate routines that challenge your endurance and strength in a supportive environment.",
    image: second, // Replace with your image URL
  },
  {
    id: 3,
    title: "Third Training Class",
    description:
      "Focus on advanced techniques and personalized coaching to maximize your performance and achieve your fitness milestones.",
    image: third, // Replace with your image URL
  },
  {
    id: 4,
    title: "Fourth Training Class",
    description:
      "Explore specialized programs that combine strength, flexibility, and balance to create a well-rounded fitness routine.",
    image: fourth, // Replace with your image URL
  },
];

const Classes = () => {
  const [selectedClass, setSelectedClass] = useState(classData[0]);

  return (
    <div style={{ padding: "40px", backgroundColor: "#f9f9f9" }}>
      <Title level={2} style={{ textAlign: "center", marginBottom: "20px" }}>
        OUR <span style={{ color: "#ff6600" }}>CLASSES</span>
      </Title>
      <Text
        style={{ textAlign: "center", display: "block", marginBottom: "40px" }}
      >
        Discover our wide range of training classes designed to help you achieve
        your fitness goals. From strength training to cardio, our programs are
        tailored to meet your needs and inspire your journey toward a healthier
        lifestyle.
      </Text>
      <Row gutter={[32, 32]}>
        <Col xs={24} md={10}>
          {classData.map((classItem) => (
            <Card
              key={classItem.id}
              onClick={() => setSelectedClass(classItem)}
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "20px",
                cursor: "pointer",
                border:
                  selectedClass.id === classItem.id
                    ? "2px solid #ff6600"
                    : "1px solid #ddd",
                boxShadow:
                  selectedClass.id === classItem.id
                    ? "0 4px 12px rgba(0, 0, 0, 0.2)"
                    : "0 2px 8px rgba(0, 0, 0, 0.1)",
              }}
            >
              <FaDumbbell
                style={{
                  fontSize: "32px",
                  color: "#ff6600",
                  marginRight: "20px",
                }}
              />
              <Text
                style={{
                  fontSize: "16px",
                  fontWeight: "bold",
                  color: selectedClass.id === classItem.id ? "#ff6600" : "#333",
                }}
              >
                {classItem.title}
              </Text>
            </Card>
          ))}
          <Button
            type="primary"
            style={{
              width: "100%",
              backgroundColor: "#ff6600",
              borderColor: "#ff6600",
              marginTop: "20px",
            }}
          >
            View All Schedules
          </Button>
        </Col>
        <Col xs={24} md={14}>
          <Card
            bordered={false}
            style={{
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              borderRadius: "8px",
            }}
          >
            <img
              src={selectedClass.image}
              alt={selectedClass.title}
              style={{
                width: "60%",
                height: "250px",
                borderRadius: "8px",
                marginBottom: "20px",
              }}
            />
            <Title level={3}>{selectedClass.title}</Title>
            <Text>{selectedClass.description}</Text>
            <br />
            <Button
              type="primary"
              style={{
                marginTop: "20px",
                backgroundColor: "#ff6600",
                borderColor: "#ff6600",
              }}
            >
              View Schedule
            </Button>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Classes;
