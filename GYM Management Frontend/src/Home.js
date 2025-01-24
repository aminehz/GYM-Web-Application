import { Layout, Menu, Button } from "antd";
import logo from "./assets/images/logo.png";
import backgroundImage from "./assets/images/bgLogin.jpg"; // Add your background image here
import About from "./About";
import Classes from "./Classes";
import Contact from "./Contact";
import { useState } from "react";

const { Header, Content, Footer } = Layout;

const items1 = [
  { key: "Home", label: "Home" },
  { key: "About", label: "About" },
  { key: "Classes", label: "Classes" },
  { key: "Contact", label: "Contact" },
  {
    key: "Login",
    label: (
      <Button
        href="#/login"
        style={{
          marginLeft: "10px",
          backgroundColor: "transparent", // Transparent background
          border: "1px solid #ffc75e", // Optional: Border color (orange in this case)
          color: "#fff", // White text color
        }}
      >
        Login
      </Button>
    ),
  },
];

const Home = () => {
  const [selectedKey, setSelectedKey] = useState("Home");

  const handleClick = (e) => {
    setSelectedKey(e.key);

    const section = document.getElementById(e.key);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <Layout>
      <Header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 20px",
          background: "transparent",
          position: "absolute",
          width: "100%",
          zIndex: 10,
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <img src={logo} alt="Logo" width={200} height={100} />
        </div>

        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[selectedKey]}
          onClick={handleClick}
          style={{
            flex: 1,
            justifyContent: "flex-end",
            display: "flex",
            background: "transparent",
            borderWidth: "2px",
          }}
        >
          {items1.map((item) => (
            <Menu.Item
              key={item.key}
              style={{
                backgroundColor:
                  selectedKey === item.key ? "#ffc75e" : "transparent",
                borderRadius: "20px",
                margin: "0 10px",
                color: "#fff",
                fontWeight: "bold",
                padding: "5px 15px",
                lineHeight: "20px",
              }}
            >
              {item.label}
            </Menu.Item>
          ))}
        </Menu>
      </Header>

      <div
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          color: "#fff",
          textShadow: "0px 2px 4px rgba(0, 0, 0, 0.7)",
        }}
      >
        <h1 style={{ fontSize: "48px", fontWeight: "bold" }}>
          EASY WITH OUR <span style={{ color: "orange" }}>GYM</span>
        </h1>
        <p style={{ fontSize: "24px", marginBottom: "20px" }}>
          Work harder, get stronger
        </p>
        <Button
          type="primary"
          style={{
            fontSize: "18px",
            padding: "10px 30px",
            backgroundColor: "orange",
            borderColor: "orange",
          }}
        >
          Become a Member
        </Button>
      </div>

      <Content style={{ padding: "20px", textAlign: "center" }}>
        <div id="About">
          <About />
        </div>
        <div id="Classes">
          <Classes />
        </div>
        <div id="Contact">
          <Contact />
        </div>
      </Content>

      <Footer style={{ textAlign: "center" }}>
        GYM ©{new Date().getFullYear()}
      </Footer>
    </Layout>
  );
};

export default Home;
