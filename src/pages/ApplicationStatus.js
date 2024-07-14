import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getApplicationStatus } from "../app/slice";

//Dispatch 'getApplicationStatus' to get all user applications.
function ApplicationStatus() {
	const dispatch = useDispatch();
	const user = useSelector(({ app }) => app?.user);
	const application = useSelector(({ app }) => app?.applications);

	useEffect(() => {
		dispatch(getApplicationStatus({ email: user?.email }));
	}, [user]);

	return (
		<div className="container">
			<h3>Your Applications</h3>

			{application.length > 0 ? (
				<table className="table table-hover">
					<thead>
						<tr>
							<th scope="col">Application Id</th>
							<th scope="col">Course Id</th>
							<th scope="col">Course Name</th>
							<th scope="col">Status</th>
						</tr>
					</thead>
					<tbody>
						{application &&
							application.map((a) => (
								<tr key={a?.id}>
									<td>{a?.id}</td>
									<td>{a?.courseId}</td>
									<td>{a?.courseName}</td>
									<td>{a?.status}</td>
								</tr>
							))}
					</tbody>
				</table>
			) : (
				<p>You have not applied for any course.</p>
			)}
		</div>
	);
}

export default ApplicationStatus;
