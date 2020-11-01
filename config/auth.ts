import GoTrue from 'gotrue-js';
import { ILoginData } from '@components/Auth/LoginForm';
import { IRegisterData } from '@components/Auth/RegisterForm';
import { MessageType } from '@components/Notification';
import { AlertProps } from '@material-ui/lab';
import constants from '@config/constants';
import { User } from 'gotrue-js';

const gotrueApi = new GoTrue({
   APIUrl: 'https://novelly.netlify.app/.netlify/identity',
   audience: '',
   setCookie: true,
});

const formatAnswer = (content: string, type: AlertProps['severity']): MessageType => ({
   content,
   type,
});

const getUser = () => gotrueApi.currentUser();

const registerUser = async (data: IRegisterData) => {
   if (!data.eula) {
      return formatAnswer('You need to accept the EULA to create an account.', 'error');
   }

   if (!constants.regex.mail.test(data.mail)) {
      return formatAnswer('Email address is not valid.', 'warning');
   }

   if (!constants.regex.password.test(data.password)) {
      return formatAnswer('Password is not strong enough.', 'warning');
   }

   if (data.password !== data.confirmation) {
      return formatAnswer('Password and confirmation do not match.', 'error');
   }

   try {
      await gotrueApi.signup(data.mail, data.password, { pseudonym: data.pseudonym });
      return formatAnswer('Your account has been created successsfully', 'success');
   } catch (error) {
      return formatAnswer('A user with this email address has already been registered.', 'error');
   }
};

const confirmUser = async (token: string) => {
   try {
      await gotrueApi.confirm(token);
      return formatAnswer('Your account has successfully been activated!', 'success');
   } catch (error) {
      return formatAnswer("We couldn't validate your email address, please try again.", 'warning');
   }
};

const loginUser = async (data: ILoginData): Promise<MessageType | User> => {
   if (!constants.regex.mail.test(data.mail)) {
      return formatAnswer('Email address is not valid.', 'warning');
   }

   try {
      const user = await gotrueApi.login(data.mail, data.password, data.remember);
      return user;
   } catch (error) {
      if (error.json?.error_description === 'Email not confirmed') {
         return formatAnswer('Please confirm your email address.', 'error');
      }

      return formatAnswer('Email address or password is incorrect.', 'error');
   }
};

const logoutUser = async () => {
   const user = gotrueApi.currentUser();

   if (user) {
      await user.logout();
   }
};

export { getUser, registerUser, confirmUser, loginUser, logoutUser };
