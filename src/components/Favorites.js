import React from "react";
import { Menu, Button, Drawer } from "antd";
import {
  EyeOutlined,
  YoutubeOutlined,
  VideoCameraOutlined,
  HeartFilled,
} from "@ant-design/icons";

const { SubMenu } = Menu;
const MenuKey = {
  Streams: "streams",
  Videos: "videos",
  Clips: "clips",
};

class Favorites extends React.Component {
  state = {
    displayDrawer: false,
  };

  onDrawerClose = () => {
    this.setState({
      displayDrawer: false,
    });
  };

  onFavoriteClick = () => {
    this.setState({
      displayDrawer: true,
    });
  };

  render = () => {
    const { VIDEO, STREAM, CLIP } = this.props.data;

    return (
      <>
        <Button
          shape="round"
          onClick={this.onFavoriteClick}
          icon={<HeartFilled />}
          style={{margin: 20}}
        >
          Favorites
        </Button>
        <Drawer
          title="Favorites"
          placement="right"
          width={720}
          visible={this.state.displayDrawer}
          onClose={this.onDrawerClose}
        >
          <Menu
            mode="inline"
            defaultOpenKeys={[MenuKey.Streams]}
            style={{ height: "100%", borderRight: 0 }}
            selectable={false}
          >
            <SubMenu
              key={MenuKey.Streams}
              icon={<EyeOutlined />}
              title="Streams"
            >
              {STREAM.map((item) => {
                return (
                  <Menu.Item key={item.id}>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {`${item.broadcaster_name} - ${item.title}`}
                    </a>
                  </Menu.Item>
                );
              })}
            </SubMenu>
            <SubMenu
              key={MenuKey.Videos}
              icon={<YoutubeOutlined />}
              title="Videos"
            >
              {VIDEO.map((item) => {
                return (
                  <Menu.Item key={item.id}>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {`${item.broadcaster_name} - ${item.title}`}
                    </a>
                  </Menu.Item>
                );
              })}
            </SubMenu>
            <SubMenu
              key={MenuKey.Clips}
              icon={<VideoCameraOutlined />}
              title="Clips"
            >
              {CLIP.map((item) => {
                return (
                  <Menu.Item key={item.id}>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {`${item.broadcaster_name} - ${item.title}`}
                    </a>
                  </Menu.Item>
                );
              })}
            </SubMenu>
          </Menu>
        </Drawer>
      </>
    );
  };
}

export default Favorites;
