import React from 'react'
import {Button, Form, Input } from 'antd'
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import {useDispatch} from 'react-redux';
import toast from 'react-hot-toast';
import { showLoading, hideLoading } from '../redux/alertsSlice';

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = async(values) =>{
    try {
      dispatch(showLoading());
      const response = await axios.post('/api/user/register', values);
      dispatch(hideLoading());
      if(response.data.success){
        toast.success(response.data.message);
        toast("Redirecting to login page");
        navigate("/login");
      }
      else{
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error('something went wrong.')
    }   
  };
  return (
    <div>
      <div className='authentication'>
        <div className='authentication-form card p-2'>
           <h1 className='card-title'>Nice to meet you</h1>

           <Form layout='vertical' onFinish={onFinish}>
              <Form.Item label ='Name' name='name'>
                < Input placeholder='Name' />
              </Form.Item>
              <Form.Item label ='Email' name='email'>
                < Input placeholder='Email' />
              </Form.Item>
              <Form.Item label ='Password' name='password'>
                < Input placeholder='Password' type='password'/>
              </Form.Item>

              <Button className='primary-button mt-30' htmlType='submit'>REGISTER</Button>
          <Link to='/Login' className='anchor mt-2'>CLICK HERE TO LOGIN</Link>
           </Form>
          </div>
      </div>
    </div>
  )
}

export default Register
