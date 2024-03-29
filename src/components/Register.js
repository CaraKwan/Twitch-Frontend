import React from "react";
import { Button, Form, Input, message, Modal } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { register } from "../utils";

class RegisterModal extends React.Component {
  state = {
    loading: false,
    displayModal: false,
  };

  handleCancel = () => {
    this.setState({
      displayModal: false,
    });
  };

  signupOnClick = () => {
    this.setState({
      displayModal: true,
    });
  };

  onFinish = (data) => {
    this.setState({ loading: true });
    register(data)
      .then(() => {
        this.setState({
          displayModal: false,
        });
        message.success(`Successfully signed up`);
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
        <Button shape="round" onClick={this.signupOnClick}>
          Register
        </Button>
        <Modal
          title="Register"
          visible={this.state.displayModal}
          onCancel={this.handleCancel}
          footer={null}
          destroyOnClose={true}
        >
          <Form
            name="normal_register"
            initialValues={{ remember: true }}
            onFinish={this.onFinish}
            preserve={false}
          >
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
            <Form.Item
              name="first_name"
              rules={[
                { required: true, message: "Please input your Firstname!" },
              ]}
            >
              <Input placeholder="firstname" />
            </Form.Item>
            <Form.Item
              name="last_name"
              rules={[
                { required: true, message: "Please input your Lastname!" },
              ]}
            >
              <Input placeholder="lastname" />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={this.state.loading}
              >
                Register
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </>
    );
  };
}

export default RegisterModal;
