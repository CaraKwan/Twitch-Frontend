import React from "react";
import { Button, Layout, message, Typography, Menu } from "antd";
import LoginModal from "./components/Login";
import RegisterModal from "./components/Register";
import {
  getTopGames,
  logout,
  getRecommendations,
  searchGameById,
  getFavoriteItem,
} from "./utils";
import Favorites from "./components/Favorites";
import { LikeOutlined, FireOutlined } from "@ant-design/icons";
import Search from "./components/Search";
import SubMenu from "antd/lib/menu/SubMenu";
import Home from "./components/Home";

const { Header, Content, Sider } = Layout;
const { Title } = Typography;

class App extends React.Component {
  state = {
    loggedIn: false,
    topGames: [],
    resources: {
      VIDEO: [],
      STREAM: [],
      CLIP: [],
    },
    favoriteItems: {
      VIDEO: [],
      STREAM: [],
      CLIP: [],
    },
  }
 
  favoriteOnChange = () => {
    getFavoriteItem().then((data) => {
      this.setState({
        favoriteItems: data,
        loggedIn: true
      })
    }).catch((err) => {
      message.error(err.message);
    })
  }
 
  onGameSelect = ({ key }) => {
    if (key === 'Recommendation') {
      getRecommendations().then((data) => {
        this.setState({
          resources: data,
        })
      })
 
      return;
    }
 
    searchGameById(key).then((data) => {
      this.setState({
        resources: data,
      })
    })
  }
 
  searchOnSuccess = (data) => {
    this.setState({
      resources: data,
    })
  }
 
  signinOnSuccess = () => {
    getFavoriteItem().then((data) => {
      this.setState({
        favoriteItems: data,
        loggedIn: true
      })
    }).catch((err) => {
      message.error(err.message);
    })
  }
 
  signoutOnClick = () => {
    logout()
      .then(() => {
        this.setState({
          loggedIn: false
        })
        message.success(`Successfull signed out`);
      }).catch((err) => {
        message.error(err.message);
      })
  }
 
  componentDidMount = () => {
    getTopGames()
      .then((data) => {
        this.setState({
          topGames: data
        })
      })
      .catch((err) => {
        message.error(err.message);
      })

      getRecommendations().then((data) => {
        this.setState({
          resources: data,
        })
      })
      .catch((err) => {
        message.error(err.message);
      })
  }


  render = () => (
    <Layout>
      {/* Header */}
      <Header className="header">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Title
            level={2}
            style={{ color: "white", lineHeight: "inherit", marginBottom: 0 }}
          >
            Twitch
          </Title>
          <div>
            {this.state.loggedIn ? (
              <>
                <Favorites data={this.state.favoriteItems} />
                <Button shape="round" onClick={this.signoutOnClick}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <LoginModal onSuccess={this.signinOnSuccess} />
                <RegisterModal />
              </>
            )}
          </div>
        </div>
      </Header>
      {/* Body */}
      <Layout>
        {/* Left sider */}
        <Sider width={300} className="site-layout-background">
          <Search onSuccess={this.searchOnSuccess} />
          <Menu
            mode="inline"
            onSelect={this.onGameSelect}
            style={{ marginTop: "10px" }}
            defaultOpenKeys={["Popular games"]}
          >
            <Menu.Item icon={<LikeOutlined />} key="Recommendation">
              Recommend for you
            </Menu.Item>
            <SubMenu
              icon={<FireOutlined />}
              key="Popular games"
              title="Popular games"
              className="site-top-game-list"
            >
              {this.state.topGames.map((game) => {
                return (
                  <Menu.Item key={game.id} style={{ height: "50px" }}>
                    <img
                      alt="Placeholder"
                      src={game.box_art_url
                        .replace("{height}", "40")
                        .replace("{width}", "40")}
                      style={{ borderRadius: "50%", marginRight: "20px" }}
                    />
                    <span>{game.name}</span>
                  </Menu.Item>
                );
              })}
            </SubMenu>
          </Menu>
        </Sider>

        {/* Main content */}
        <Layout style={{ padding: "24px" }}>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              height: 800,
              overflow: "auto",
            }}
          >
            <Home 
              resources={this.state.resources} 
              loggedIn={this.state.loggedIn} 
              favoriteItems={this.state.favoriteItems} 
              favoriteOnChange={this.favoriteOnChange}
            />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}

export default App;
