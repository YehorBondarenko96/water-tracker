import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { registration } from '../redux/auth/authOperations';
import { toastError, toastSuccess } from '../services/notification';
import icons from 'img/icons.svg';
import ModalWrapper from '../components/ModalWrapper/ModalWrapper';
import { ResendVerifyModal } from '../components/ResendVerifyModal/ResendVerifyModal';

import {
  Button,
  InputBox,
  Label,
  ShowIcon,
  StyledContainer,
  StyledError,
  StyledField,
  StyledForm,
  StyledLink,
} from './SignupPage.styled';
import { emailRegex } from '../constants/validEmail';
import { BackgroundContainer, BottleImg, Wrapper } from './SigninPage.styled';

const SignUpPage = () => {
  const dispatch = useDispatch();

  const [endRegistration, setEndRegistration] = useState(false);
  const [emailForResend, setEmailForResend] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const toggleRepeatPasswordVisibility = () => {
    setShowRepeatPassword((prevRepeatShowPassword) => !prevRepeatShowPassword);
  };

  const onCloseModal = () => {
    setEndRegistration(false);
    window.location.reload()
  };

  return (
    <BackgroundContainer>
      <Wrapper>
        <StyledContainer>
          <h1>Sign Up</h1>
          <Formik
            initialValues={{
              email: '',
              password: '',
              passwordVerification: '',
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string()
                .trim()
                .matches(emailRegex, 'Invalid email')
                .required('Required'),
              password: Yup.string()
                .required('Required')
                .min(8, 'Minimum eight characters')
                .max(64, 'Too Long!'),
              passwordVerification: Yup.string()
                .oneOf([Yup.ref('password'), null], 'Passwords must match')
                .required('Required'),
            })}
            onSubmit={async (formData) => {
              const { email, password } = formData;
              dispatch(registration({ email, password }))
                .unwrap()
                .then(() => {
                  toastSuccess(`${email} registered successfully`);
                  setEndRegistration(true);
                  setEmailForResend(email);
                })
                .catch((error) => toastError(error));
            }}
          >
            <StyledForm>
              <InputBox>
                <Label htmlFor="email">Enter your email</Label>
                <StyledError name="email" component="div" />
                <StyledField
                  type="email"
                  id="email"
                  name="email"
                  placeholder="E-mail"
                />
              </InputBox>
              <InputBox>
                <Label htmlFor="password">Enter your password</Label>
                <StyledError name="password" component="div" />
                <StyledField
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  placeholder="Password"
                />
                <ShowIcon type="button" onClick={togglePasswordVisibility}>
                  {showPassword
                    ? 'Hide' && <use href={`${icons}#icon-opend`} />
                    : 'Show' && <use href={`${icons}#icon-closed`} />}
                </ShowIcon>
              </InputBox>
              <InputBox>
                <Label htmlFor="passwordVerification">Repeat password</Label>
                <StyledError name="passwordVerification" component="div" />
                <StyledField
                  type={showRepeatPassword ? 'text' : 'password'}
                  id="passwordVerification"
                  name="passwordVerification"
                  placeholder="Repeat password"
                />
                <ShowIcon
                  type="button"
                  onClick={toggleRepeatPasswordVisibility}
                >
                  {showRepeatPassword
                    ? 'Hide' && <use href={`${icons}#icon-opend`} />
                    : 'Show' && <use href={`${icons}#icon-closed`} />}
                </ShowIcon>
              </InputBox>
              <Button type="submit">Sign Up</Button>
            </StyledForm>
          </Formik>
          <StyledLink to="/signin">Sign In</StyledLink>
        </StyledContainer>
        <BottleImg />
      </Wrapper>
      {endRegistration && <ModalWrapper onClose={onCloseModal} alignItems='center'><ResendVerifyModal question="Please, go to your email for verification." butText="Send the letter for validation again" email={emailForResend && emailForResend}/></ModalWrapper>}
    </BackgroundContainer>
  );
};

export default SignUpPage;
