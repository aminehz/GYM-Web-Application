import React from "react";
import { Form, Input, Button } from "antd";

const ContactForm = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Form Values:", values);
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
      >
        <div style={{ display: "flex", gap: "16px" }}>
          <Form.Item
            name="name"
            label="Your Name*"
            rules={[{ required: true, message: "Please enter your name" }]}
            style={{ flex: 1 }}
          >
            <Input placeholder="Your Name" />
          </Form.Item>
          <Form.Item
            name="email"
            label="Your Email*"
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Please enter a valid email" },
            ]}
            style={{ flex: 1 }}
          >
            <Input placeholder="Your Email" />
          </Form.Item>
        </div>
        <Form.Item
          name="subject"
          label="Subject"
          rules={[{ required: true, message: "Please enter the subject" }]}
        >
          <Input placeholder="Subject" />
        </Form.Item>
        <Form.Item
          name="message"
          label="Message"
          rules={[{ required: true, message: "Please enter your message" }]}
        >
          <Input.TextArea rows={4} placeholder="Message" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
            Send Message
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ContactForm;
