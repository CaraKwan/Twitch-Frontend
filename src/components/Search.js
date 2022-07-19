import React from "react";
import { Button, Form, Input, message, Modal } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { searchGameByName } from "../utils";

class Search extends React.Component {
  state = {
    loading: false,
    displayModal: false,
  };

  handleCancel = () => {
    this.setState({
      displayModal: false,
    });
  };

  searchOnClick = () => {
    this.setState({
      displayModal: true,
    });
  };

  onFinish = (data) => {
    searchGameByName(data.game_name)
      .then((data) => {
        this.setState({
          displayModal: false,
        });
        this.props.onSuccess(data);
      })
      .catch((err) => {
        message.error(err.message);
      });
  };

  render = () => {
    return (
      <>
        <Button
          shape="round"
          onClick={this.searchOnClick}
          icon={<SearchOutlined />}
          style={{ marginLeft: "20px", marginTop: "20px" }}
          loading={this.state.loading}
        >
          Search game
        </Button>
        <Modal
          title="Search game"
          visible={this.state.displayModal}
          onCancel={this.handleCancel}
          footer={null}
        >
          <Form name="search" onFinish={this.onFinish}>
            <Form.Item
              name="game_name"
              rules={[{ required: true, message: "Please enter a game name" }]}
            >
              <Input placeholder="Game name" />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={this.state.loading}
              >
                Search
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </>
    );
  };
}

export default Search;
