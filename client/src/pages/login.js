import { Button, Form, Input } from 'antd';
import React from 'react'
import { Link } from 'react-router-dom';

function login() {
  const onFinish = (values) => {
    console.log('Received values of form:', values);
  };
  return (
    <div className='authentication'>
      <div className='authentication_form card p-3'>
        <h1 className='card-title'>Welcome to DocAppoint</h1>
        <Form layout="vertical" onFinish={onFinish}>

          <Form.Item label='Email' name='email'>
            <Input placeholder="Email"/>
          </Form.Item>
          <Form.Item label='Password' name='Password'>
            <Input placeholder="Password" type='password'/>
          </Form.Item>

          <Button className='primary-button mt-30' htmlType='submit'>LOGIN</Button>

          <Link to='/register' className='anchor mt-2'>CLICK HERE TO REGISTER</Link>
        </Form>
        </div>
    </div>
  )
}

export default login
