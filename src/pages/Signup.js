import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
	const navigate = useNavigate();
	const [errMsg, setErrMsg] = useState("");
	const [inputField, setInputField] = useState({
		email: "",
		password: "",
		confirmpassword: "",
		name: "",
		age: "",
		mobile: "",
		address: "",
		markPercentage: "",
	});

	const inputsHandler = (e) => {
		const { name, value } = e.target;
		setInputField((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const submitButton = async () => {
		let { email, password, confirmpassword, name, age, mobile, address, markPercentage } = inputField;

		if (!email || !password || !confirmpassword || !name || !age || !mobile || !address || !markPercentage) {
			setErrMsg("Please fill all the input fields");
		} else if (password !== confirmpassword) {
			setErrMsg("Confirm Password does not match");
		} else {
			setErrMsg("");
			const found = await axios
				.get(`/api/applicants?email=${email}`)
				.then((d) => d.data)
				.catch((e) => console.error(e));

			if (found.length > 0) {
				setErrMsg("E-mail already exists");
			} else {
				let requestbody = {
					id: new Date().getTime(),
					email,
					password,
					name,
					age,
					mobile,
					address,
					markPercentage,
				};

				await axios
					.post("/api/applicants", requestbody)
					.then((d) => {
						let data = d.data;

						if (data) navigate("/login");
					})
					.catch((e) => console.error(e));
			}
		}
	};

	return (
		<div>
			<form className="container mt-2">
				<div className="form-header">
					<h3>Signup</h3>
					<p>Create new account here</p>
				</div>

				<input
					type="text"
					name="email"
					id="email"
					placeholder="enter your email"
					className="form-control mt-2"
					value={inputField.email}
					onChange={inputsHandler}
				/>
				<input
					type="password"
					name="password"
					id="password"
					placeholder="choose password"
					className="form-control mt-2"
					value={inputField.password}
					onChange={inputsHandler}
				/>
				<input
					type="password"
					name="confirmpassword"
					id="confirmpassword"
					placeholder="confirm password"
					className="form-control mt-2"
					value={inputField.confirmpassword}
					onChange={inputsHandler}
				/>
				<input
					type="text"
					name="name"
					id="name"
					placeholder="your name"
					className="form-control mt-2"
					value={inputField.name}
					onChange={inputsHandler}
				/>
				<input
					type="number"
					name="age"
					id="age"
					placeholder="your age"
					className="form-control mt-2"
					value={inputField.age}
					onChange={inputsHandler}
				/>
				<input
					type="number"
					name="mobile"
					id="mobile"
					placeholder="your mobile number"
					className="form-control mt-2"
					value={inputField.mobile}
					onChange={inputsHandler}
				/>
				<textarea
					name="address"
					rows="2"
					cols="50"
					id="address"
					placeholder="your address"
					className="form-control mt-2"
					value={inputField.address}
					onChange={inputsHandler}
				/>
				<input
					type="number"
					name="markPercentage"
					id="markPercentage"
					placeholder="Mark Percentage in 12th grade"
					className="form-control mt-2"
					value={inputField.markPercentage}
					onChange={inputsHandler}
				/>

				<p
					className="text-danger"
					id="errorMessage">
					{errMsg}
				</p>
				<button
					className="btn btn-primary"
					id="submitButton"
					type="button"
					onClick={submitButton}>
					SIGN UP
				</button>
				<div className="form-group pt-3">
					<p>
						Already have an Account <Link to="/login">Login</Link>
					</p>
				</div>
			</form>
		</div>
	);
};

export default Signup;
