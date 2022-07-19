import React from "react";
import { Button, Form, Input, message, Modal } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { login } from "../utils";

class LoginModal extends React.Component {
  state = {
    loading: false,
    displayModal: false,
  };

  handleCancel = () => {
    this.setState({
      displayModal: false,
    });
  };

  signinOnClick = () => {
    this.setState({
      displayModal: true,
    });
  };

  onFinish = (data) => {
    this.setState({ loading: true });
    login(data)
      .then((data) => {
        this.setState({
          displayModal: false,
        });
        message.success(`Welcome back, ${data.name}`);
        this.props.onSuccess();
      })
      .catch((err) => {
        message.error(err.message);
      })
      .finally(() => {
        this.setState({ loading: false });
      });
  };

  render = () => {
    return (
      <>
        <Button
          shape="round"
          onClick={this.signinOnClick}
          style={{ marginRight: "20px" }}
        >
          Login
        </Button>
        <Modal
          title="Log in"
          visible={this.state.displayModal}
          onCancel={this.handleCancel}
          footer={null}
          destroyOnClose={true}
        >
          <Form name="normal_login" onFinish={this.onFinish} preserve={false}>
            <Form.Item
              name="user_id"
              rules={[
                { required: true, message: "Please input your Username!" },
              ]}
            >
              <Input prefix={<UserOutlined />} placeholder="Username" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your Password!" },
              ]}
            >
              <Input prefix={<LockOutlined />} placeholder="Password" />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={this.state.loading}
              >
                Login
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </>
    );
  };
}

export default LoginModal;
