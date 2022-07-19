import React, { useState } from "react";
import { Button, Card, List, message, Tabs, Tooltip } from "antd";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import { addFavoriteItem, deleteFavoriteItem } from "../utils";

const { TabPane } = Tabs;

const tabKeys = {
  Streams: "stream",
  Videos: "videos",
  Clips: "clips",
};

const processUrl = (url) =>
  url
    .replace("%{height}", "252")
    .replace("%{width}", "480")
    .replace("{height}", "252")
    .replace("{width}", "480");


function RenderCardTitle({item, loggedIn, favs, favOnChange}) {
  const [loading, setLoading] = useState(false);
  const title = `${item.broadcaster_name} - ${item.title}`;

  const isFav = favs.find((fav) => fav.id === item.id);

  const favOnClick = () => {
    if (isFav) {
      setLoading(true);
      deleteFavoriteItem(item)
        .then(() => {
          favOnChange();
        })
        .catch((err) => {
          message.error(err.message);
        })
        .finally (() => {setLoading(false)});

      return;
    }

    setLoading(true);
    addFavoriteItem(item)
      .then(() => {
        favOnChange();
      })
      .catch((err) => {
        message.error(err.message);
      }).finally (() => {setLoading(false)});
  };
  

  return (
    <>
      {loggedIn && (
        <Tooltip
          title={isFav ? "Remove from favorite list" : "Add to favorite list"}
        >
          <Button
            shape="circle"
            icon={isFav ? <HeartFilled /> : <HeartOutlined />}
            onClick={favOnClick}
            loading={loading}
          />
        </Tooltip>
      )}
      <div style={{ overflow: "hidden", textOverflow: "ellipsis", width: 450 }}>
        <Tooltip title={title}>
          <span>{title}</span>
        </Tooltip>
      </div>
    </>
  );
};

const renderCardGrid = (data, loggedIn, favs, favOnChange) => {
  return (
    <List
      grid={{
        xs: 1,
        sm: 1,
        md: 2,
        lg: 4,
        xl: 4,
      }}
      dataSource={data}
      renderItem={(item) => (
        <List.Item style={{ marginRight: "20px" }}>
          <Card title={<RenderCardTitle item={item} loggedIn={loggedIn} favs={favs} favOnChange={favOnChange}/>}>
            <a href={item.url} target="_blank" rel="noopener noreferrer">
              <img alt="Placeholder" src={processUrl(item.thumbnail_url)} width="100%"/>
            </a>
          </Card>
        </List.Item>
      )}
    />
  );
};

const Home = ({ resources, loggedIn, favoriteItems, favoriteOnChange }) => {
  const { VIDEO, STREAM, CLIP } = resources;
  const {
    VIDEO: favVideos,
    STREAM: favStreams,
    CLIP: favClips,
  } = favoriteItems;

  return (
    <Tabs defaultActiveKey={tabKeys.Streams}>
      <TabPane
        tab="Streams"
        key={tabKeys.Streams}
        style={{ height: "680px", overflow: "auto" }}
        forceRender={true}
      >
        {renderCardGrid(STREAM, loggedIn, favStreams, favoriteOnChange)}
      </TabPane>
      <TabPane
        tab="Videos"
        key={tabKeys.Videos}
        style={{ height: "680px", overflow: "auto" }}
        forceRender={true}
      >
        {renderCardGrid(VIDEO, loggedIn, favVideos, favoriteOnChange)}
      </TabPane>
      <TabPane
        tab="Clips"
        key={tabKeys.Clips}
        style={{ height: "680px", overflow: "auto" }}
        forceRender={true}
      >
        {renderCardGrid(CLIP, loggedIn, favClips, favoriteOnChange)}
      </TabPane>
    </Tabs>
  );
};

export default Home;
