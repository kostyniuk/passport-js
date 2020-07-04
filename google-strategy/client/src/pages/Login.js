import React from 'react';
import { TextField, Button } from '@material-ui/core';
import { Formik, Field, Form } from 'formik';

const Login = () => {
  return (
    <div>
      <Formik
        initialValues={{ username: '', password: '' }}
        onSubmit={() => {
          console.log('The form is submitted!');
        }}
      >
        {({ values, isSubmitting, handleBlur, handleSubmit }) => (
          <Form>
            <h2>Login</h2>
            <Field
              placeholder='username'
              name='username'
              type='input'
              as={TextField}
            />
            <div>
              <Field
                placeholder='password'
                name='password'
                type='input'
                as={TextField}
              />
            </div>
            <Button disabled={isSubmitting}>Submit</Button>
            <pre>{JSON.stringify(values, null, 2)} </pre>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
