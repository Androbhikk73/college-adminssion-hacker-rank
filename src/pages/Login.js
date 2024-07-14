import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setLoggedUser } from '../app/slice';
import axios from 'axios';

const Login = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [errMsg, setErrMsg] = useState('');
	const [inputField, setInputField] = useState({
		userType: false,
		lEmail: '',
		lPassword: '',
	});

	const inputsHandler = (e) => {
		const { name, value } = e.target;
		setInputField((prevState) => {
			if (name === 'userType') {
				return {
					...prevState,
					[name]: !prevState.userType,
				};
			} else {
				return {
					...prevState,
					[name]: value,
				};
			}
		});
	};

	const submitButton = async () => {
		let { userType, lEmail, lPassword } = inputField;

		if (!lEmail || !lPassword) {
			setErrMsg('Please fill all the input fields');
		} else {
			setErrMsg('');
			let url = userType ? `/api/admin?email=${lEmail}` : `/api/applicants?email=${lEmail}`;

			await axios
				.get(url)
				.then((d) => {
					let data = d.data;

					if (data.length > 0) {
						let user = data[0];
						let { password } = user;

						if (lPassword === password) {
							dispatch(setLoggedUser(user));
							if (userType) {
								navigate('/applications');
							} else {
								navigate('/apply');
							}
						} else {
							setErrMsg('Password is incorrect');
						}
					} else {
						setErrMsg('Email not registered');
					}
				})
				.catch((e) => console.error(e));
		}
	};

	return (
		<div>
			<form className='container mt-5'>
				<div className='form-header'>
					<h3 id='loginHeader'> {inputField.userType ? 'Admin Login' : 'Applicant Login'} </h3>
					<div className='float-right '>
						<input
							type='checkbox'
							id='userType'
							name='userType'
							className='form-check-input'
							checked={inputField.userType}
							onChange={inputsHandler}
						/>
						<label className='form-check-label ps-2'>Admin</label>
					</div>
					<br />
					<p>Enter your credentials here to Login</p>
				</div>

				<input
					type='email'
					name='lEmail'
					id='userEmail'
					placeholder='your email'
					className='form-control mt-2'
					value={inputField.lEmail}
					onChange={inputsHandler}
				/>
				<input
					type='password'
					name='lPassword'
					id='userPassword'
					placeholder='password'
					className='form-control mt-2'
					value={inputField.lPassword}
					onChange={inputsHandler}
				/>
				<p
					className='text-danger'
					id='errorMessage'>
					{errMsg}
				</p>
				<button
					className='btn btn-primary'
					id='loginButton'
					type='button'
					onClick={submitButton}>
					Login
				</button>
				<div className='form-group pt-3'>
					<p>
						Do not have an Account{' '}
						<Link
							id='signupLink'
							to='/signup'>
							Signup
						</Link>
					</p>
				</div>
			</form>
		</div>
	);
};

export default Login;
