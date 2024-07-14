import { Outlet, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { setLoggedOutUser } from "../app/slice";

const Navbar = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const user = useSelector(({ app }) => app?.user);

	const [isAdmin, setIsAdmin] = useState(false);

	useEffect(() => {
		if (user?.email === "admin@abz.com") {
			setIsAdmin(true);
		} else {
			setIsAdmin(false);
		}
	}, [user]);

	const loggedOut = () => {
		dispatch(setLoggedOutUser());
		navigate("/");
	};

	return (
		<div>
			<nav className="navbar navbar-expand navbar-dark bg-primary text-light w-100 px-5 justify-content-between">
				<h3>Student Admission Portal</h3>

				{isAdmin ? (
					<ul className="navbar-nav">
						<li className="nav-item px-2 pt-2">
							<Link
								className="tab"
								to="/applications">
								Applications
							</Link>
						</li>
						<li className="nav-item px-2 pt-2">
							<Link
								className="tab"
								to="/addseats">
								Add Seats
							</Link>
						</li>

						<li className="nav-item mt-2 ms-5 ps-5 me-2 fw-bold">User: Admin</li>
						<li className="nav-item">
							<button
								className="btn btn-danger"
								onClick={loggedOut}>
								Logout
							</button>
						</li>
					</ul>
				) : (
					<ul className="navbar-nav">
						<li className="nav-item px-2 pt-2">
							<Link
								className="tab"
								to="/apply">
								Apply Course
							</Link>
						</li>
						<li className="nav-item px-2 pt-2">
							<Link
								className="tab"
								to="/status">
								Application Status
							</Link>
						</li>
						<li className="nav-item mt-2 ms-5 ps-5 me-2 fw-bold">User: {user?.name}</li>
						<li className="nav-item">
							<button
								className="btn btn-danger"
								onClick={loggedOut}>
								Logout
							</button>
						</li>
					</ul>
				)}
			</nav>
			<Outlet />
		</div>
	);
};

export default Navbar;
