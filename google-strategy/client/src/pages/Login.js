import React, { useState } from 'react';
import {useHistory} from 'react-router-dom'
import { TextField, Button, Grid } from '@material-ui/core';
import styles from './../styles/login.module.css';
import TwitterIcon from '@material-ui/icons/Twitter';
import MailIcon from '@material-ui/icons/Mail';
import useFetch from '../hooks/useFetch';

const Login = () => {
  const [form, setForm] = useState({ username: '', password: '' });
  const { error, loading, request } = useFetch();
  const history = useHistory()

  const handleForm = async (e) => {
    const params = {
      method: 'POST',
      body: JSON.stringify(form),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const loginResponce = await request('api/login', params);

    if (loginResponce.success) {
      window.location.reload(true);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const googleAuthHandler = async (e) => {
    console.log('google auth');
    window.location.assign('/api/login/google') //so-so
  };
  return (
    <div>
      <h1>Login</h1>
      <Grid container direction='row' justify='center' alignItems='center'>
        <TwitterIcon
          onClick={() => {
            console.log('twitter');
          }}
        />
        <MailIcon className={styles.icons} onClick={googleAuthHandler} />
      </Grid>
      <h4>or</h4>
      <form
        className={styles.form}
        noValidate
        autoComplete='off'
        onSubmit={() => console.log('submitted')}
      >
        <TextField
          id='filled-basic'
          name='username'
          className={styles.field}
          label='username'
          variant='filled'
          onChange={(e) => handleChange(e)}
        />
        <div>
          <TextField
            id='filled-basic'
            name='password'
            className={styles.field}
            label='password'
            variant='filled'
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className={styles.btn}>
          <Button
            variant='contained'
            color='primary'
            onClick={(e) => handleForm(e)}
          >
            Submit
          </Button>
          <Button
            className={styles.btnReset}
            variant='contained'
            color='primary'
          >
            Reset
          </Button>
        </div>
      </form>
      <div style={{ margin: '20px' }}>{JSON.stringify(form, null, 2)}</div>
    </div>
  );
};

export default Login;
