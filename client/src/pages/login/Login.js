import React, { useRef, useState } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import SignInOrUp from '../../components/loginConponents/SignInOrUp';
import './login.css';

//#####################

import { register, login } from '../../redux/actions/authActions';
import { useSelector, useDispatch } from 'react-redux';

import { useHistory } from 'react-router-dom';
//##################

const Login = () => {
  // const auth = useSelector((state) => state.auth);
  // const errorsAuth = useSelector((state) => state.errorsAuth);

  // const history = useHistory();
  const dispath = useDispatch();

  const [isLogin, setisLogin] = useState(true);
  const [user, setUser] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const refForms = useRef(null);

  const showForm = () => {
    setisLogin(!isLogin);
    const toRemove = isLogin
      ? ['bounceRight', 'bounceLeft']
      : ['bounceLeft', 'bounceRight'];
    refForms.current.classList.remove(toRemove[0]);
    refForms.current.classList.add(toRemove[1]);
  };
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser({ ...user, [name]: value });
  };
  const submitform = (e) => {
    e.preventDefault();
    if (!isLogin) {
      const { username, email, password, confirmPassword } = user;
      const newUser = {
        username,
        email,
        password,
        confirmPassword,
      };
      dispath(register(newUser));
    } else {
      const { email, password } = user;
      const userAuth = {
        email,
        password,
      };
      dispath(login(userAuth));
    }
    setUser({ username: '', email: '', password: '', confirmPassword: '' });
  };

  return (
    <div
      style={{ background: 'transparent', minHeight: '100vh' }}
      className='d-flex align-items-center justify-content-center'>
      <Container style={{ position: 'relative' }} fluid='lg'>
        <Row>
          <SignInOrUp
            title="Don't have an account ?"
            body="Create a new account and join the app's family !"
            action='Sign up'
            onClick={showForm}
          />
          <SignInOrUp
            title='Have an account ?'
            body='login now and get in touch with your friends !'
            action='Login'
            onClick={showForm}
          />
        </Row>
        <Row ref={refForms} className='bounceRight form-login'>
          {/* login */}
          <Col>
            <h2 className='text-center'>{isLogin ? 'Login' : 'Sign Up'}</h2>
            <Form
              onSubmit={submitform}
              className='d-flex flex-column justify-content-center w-75 mx-auto '>
              {isLogin || (
                <Form.Control
                  className='mt-0 mb-3'
                  type='text'
                  placeholder='Username'
                  name='username'
                  value={user.username}
                  onChange={handleChange}
                  required
                />
              )}
              <Form.Control
                className='mt-0 mb-3'
                type='email'
                placeholder='Email'
                name='email'
                value={user.email}
                onChange={handleChange}
                required
              />
              <Form.Control
                className='mb-4'
                type='password'
                placeholder='Password'
                name='password'
                value={user.password}
                onChange={handleChange}
                required
              />
              {isLogin || (
                <Form.Control
                  className='mt-0 mb-3'
                  type='password'
                  placeholder='Confirm Password'
                  name='confirmPassword'
                  value={user.confirmPassword}
                  onChange={handleChange}
                  required
                />
              )}
              <Button
                className='ms-auto'
                variant='outline-primary'
                type='submit'>
                {isLogin ? 'LOG IN' : 'SIGN UP'}
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

// Login.propTypes = {
//   register: PropTypes.func.isRequired,
//   isAuth: PropTypes.bool
// }

// const mapStateToProps = state => ({
//   isAuth: state.auth.isAuth
// })

export default Login;
