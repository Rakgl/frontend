import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import AppTheme from '../../theme/AppTheme';
import ColorModeSelect from '../../theme/ColorModeSelect';
import './register.scss';
import axios from 'axios';
import { AxiosError } from 'axios';
// import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';

import {
    GoogleIcon,
    FacebookIcon,
    SitemarkIcon,
} from '../../components/CustomIcons';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Card = styled(MuiCard)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    width: '100%',
    padding: theme.spacing(4),
    gap: theme.spacing(2),
    margin: 'auto',
    boxShadow:
        'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
    [theme.breakpoints.up('sm')]: {
        width: '450px',
    },
    ...theme.applyStyles('dark', {
        boxShadow:
            'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
    }),
}));

const SignUpContainer = styled(Stack)(({ theme }) => ({
    height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
    minHeight: '100%',
    padding: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
        padding: theme.spacing(4),
    },
    '&::before': {
        content: '""',
        display: 'block',
        position: 'absolute',
        zIndex: -1,
        inset: 0,
        backgroundImage:
            'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
        backgroundRepeat: 'no-repeat',
        ...theme.applyStyles('dark', {
            backgroundImage:
                'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
        }),
    },
}));

export default function SignUp(props: { disableCustomTheme?: boolean }) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nameError, setNameError] = useState(false);
    const [nameErrorMessage, setNameErrorMessage] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [emailErrorMessage, setEmailErrorMessage] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
    const [apiError, setApiError] = useState('');
    const navigate = useNavigate();

    const validateInputs = () => {
        let isValid = true;

        if (!firstName || firstName.length < 1) {
            setNameError(true);
            setNameErrorMessage('First name is required.');
            isValid = false;
        } else if (!lastName || lastName.length < 1) {
            setNameError(true);
            setNameErrorMessage('Last name is required.');
            isValid = false;
        } else {
            setNameError(false);
            setNameErrorMessage('');
        }

        if (!email || !/\S+@\S+\.\S+/.test(email)) {
            setEmailError(true);
            setEmailErrorMessage('Please enter a valid email address.');
            isValid = false;
        } else {
            setEmailError(false);
            setEmailErrorMessage('');
        }

        if (!password || password.length < 6) {
            setPasswordError(true);
            setPasswordErrorMessage(
                'Password must be at least 6 characters long.'
            );
            isValid = false;
        } else {
            setPasswordError(false);
            setPasswordErrorMessage('');
        }

        return isValid;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!validateInputs()) return;

        const payload = {
            first_name: firstName,
            last_name: lastName,
            email,
            password,
        };
        console.log('Sending:', payload); // Debug
        try {
            const response = await axios.post(
                'http://api-react.test/api/register',
                payload,
                {
                    headers: { 'Content-Type': 'application/json' },
                }
            );
            localStorage.setItem('token', response.data.token);
            setApiError(''); // Clear any previous errors
            navigate('/login');
        } catch (err) {
            if (err instanceof AxiosError) {
                console.log(err.response?.data);
            }
        }
    };

    return (
        <div className="continer-resgister">
            {/* <GoogleOAuthProvider clientId="331635603301-kb43lmq76f6b1ee56753tfbas0b2pof8.apps.googleusercontent.com">
                <div>
                    <h2>Login with Google</h2>
                    <GoogleLogin
                        onSuccess={handleLoginSuccess}
                        onError={() => console.log('Login Failed')}
                    />
                </div>
            </GoogleOAuthProvider> */}
            <AppTheme {...props}>
                <CssBaseline enableColorScheme />
                <ColorModeSelect
                    sx={{ position: 'fixed', top: '1rem', right: '1rem' }}
                />
                <SignUpContainer
                    direction="column"
                    justifyContent="space-between"
                >
                    <Card variant="outlined">
                        <SitemarkIcon />
                        <Typography
                            component="h1"
                            variant="h4"
                            sx={{
                                width: '100%',
                                fontSize: 'clamp(2rem, 10vw, 2.15rem)',
                            }}
                        >
                            Sign up
                        </Typography>
                        <Box
                            component="form"
                            onSubmit={handleSubmit}
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 2,
                            }}
                        >
                            <FormControl>
                                <FormLabel htmlFor="first_name">
                                    First Name
                                </FormLabel>
                                <TextField
                                    autoComplete="given-name"
                                    name="first_name"
                                    required
                                    fullWidth
                                    id="first_name"
                                    placeholder="Snow"
                                    value={firstName}
                                    onChange={(e) =>
                                        setFirstName(e.target.value)
                                    }
                                    error={nameError}
                                    helperText={nameErrorMessage}
                                    color={nameError ? 'error' : 'primary'}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel htmlFor="last_name">
                                    Last Name
                                </FormLabel>
                                <TextField
                                    autoComplete="family-name"
                                    name="last_name"
                                    required
                                    fullWidth
                                    id="last_name"
                                    placeholder="Jon"
                                    value={lastName}
                                    onChange={(e) =>
                                        setLastName(e.target.value)
                                    }
                                    error={nameError}
                                    helperText={nameErrorMessage}
                                    color={nameError ? 'error' : 'primary'}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel htmlFor="email">Email</FormLabel>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    placeholder="your@email.com"
                                    name="email"
                                    autoComplete="email"
                                    variant="outlined"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    error={emailError}
                                    helperText={emailErrorMessage}
                                    color={emailError ? 'error' : 'primary'}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel htmlFor="password">
                                    Password
                                </FormLabel>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    placeholder="••••••"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    variant="outlined"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    error={passwordError}
                                    helperText={passwordErrorMessage}
                                    color={passwordError ? 'error' : 'primary'}
                                />
                            </FormControl>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        value="allowExtraEmails"
                                        color="primary"
                                    />
                                }
                                label="I want to receive updates via email."
                            />
                            <Button type="submit" fullWidth variant="contained">
                                Sign up
                            </Button>
                            {apiError && (
                                <Typography color="error">
                                    {apiError}
                                </Typography>
                            )}
                        </Box>
                        <Divider>
                            <Typography sx={{ color: 'text.secondary' }}>
                                or
                            </Typography>
                        </Divider>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 2,
                            }}
                        >
                            <Button
                                fullWidth
                                variant="outlined"
                                onClick={() => alert('Sign up with Google')}
                                startIcon={<GoogleIcon />}
                            >
                                Sign up with Google
                            </Button>
                            <Button
                                fullWidth
                                variant="outlined"
                                onClick={() => alert('Sign up with Facebook')}
                                startIcon={<FacebookIcon />}
                            >
                                Sign up with Facebook
                            </Button>
                            <Typography sx={{ textAlign: 'center' }}>
                                Already have an account?{' '}
                                <Link
                                    href="/login"
                                    variant="body2"
                                    sx={{ alignSelf: 'center' }}
                                >
                                    Sign in
                                </Link>
                            </Typography>
                        </Box>
                    </Card>
                </SignUpContainer>
            </AppTheme>
        </div>
    );
}
