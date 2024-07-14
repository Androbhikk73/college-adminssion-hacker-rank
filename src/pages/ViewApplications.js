import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getApplications, modifyApplicationStatus, getCourses } from "../app/slice";

function ViewApplications() {
	const dispatch = useDispatch();
	const applications = useSelector(({ app }) => app?.applications);

	const [newAppli, setNewAppli] = useState([]);
	const [newAppro, setNewAppro] = useState([]);
	const [newRej, setNewRej] = useState([]);

	useEffect(() => {
		dispatch(getApplications());
	}, []);
	useEffect(() => {
		dispatch(getCourses());
	}, []);

	useEffect(() => {
		let newApplication = applications.filter((a) => a.status === "Pending");
		setNewAppli(newApplication);
		let newApproved = applications.filter((a) => a.status === "Approved");
		setNewAppro(newApproved);
		let newRejected = applications.filter((a) => a.status === "Rejected");
		setNewRej(newRejected);
	}, [applications]);

	const approve = ({ id }) => {
		dispatch(
			modifyApplicationStatus({
				id,
				status: "Approved",
			})
		);
		dispatch(getApplications());
	};
	const reject = ({ id, status }) => {
		dispatch(
			modifyApplicationStatus({
				id,
				status: "Rejected",
			})
		);
		dispatch(getApplications());
	};

	return (
		<div className="container mt-3">
			<h4 className="text-primary">New Applications</h4>
			{newAppli && newAppli.length > 0 ? (
				<table
					className="table table-hover mb-5"
					id="newApplicationsTable">
					<thead>
						<tr>
							<th scope="col">Application Id</th>
							<th scope="col">Course Id</th>
							<th scope="col">Course Name</th>
							<th scope="col">Applicant Name</th>
							<th scope="col">Applicant Email</th>
							<th scope="col">Mark Percentage</th>
							<th scope="col">Actions</th>
						</tr>
					</thead>
					<tbody>
						{newAppli.map((a) => (
							<tr key={a?.id}>
								<td>{a?.id}</td>
								<td>{a?.courseId}</td>
								<td>{a?.courseName}</td>
								<td>{a?.applicantName}</td>
								<td>{a?.applicantEmail}</td>
								<td>{a?.markPercentage}</td>
								<td>
									<button
										className="btn btn-success mx-1"
										onClick={() => approve(a)}>
										Approve
									</button>
									<button
										className="btn btn-danger mx-1"
										onClick={() => reject(a)}>
										Reject
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			) : (
				<p>No new applications</p>
			)}

			<hr></hr>
			<h4 className="text-primary">Approved Applications</h4>
			{newAppro && newAppro.length > 0 ? (
				<table
					className="table table-hover mb-5"
					id="approvedApplicationsTable">
					<thead>
						<tr>
							<th scope="col">Application Id</th>
							<th scope="col">Course Id</th>
							<th scope="col">Course Name</th>
							<th scope="col">Applicant Name</th>
							<th scope="col">Applicant Email</th>
							<th scope="col">Mark Percentage</th>
						</tr>
					</thead>
					<tbody>
						{newAppro.map((a) => (
							<tr key={a?.id}>
								<td>{a?.id}</td>
								<td>{a?.courseId}</td>
								<td>{a?.courseName}</td>
								<td>{a?.applicantName}</td>
								<td>{a?.applicantEmail}</td>
								<td>{a?.markPercentage}</td>
							</tr>
						))}
					</tbody>
				</table>
			) : (
				<p>No approved applications</p>
			)}
			<hr></hr>
			<h4 className="text-primary">Rejected Applications</h4>
			{newRej && newRej.length > 0 ? (
				<table
					className="table table-hover mb-5"
					id="rejectedApplicationsTable">
					<thead>
						<tr>
							<th scope="col">Application Id</th>
							<th scope="col">Course Id</th>
							<th scope="col">Course Name</th>
							<th scope="col">Applicant Name</th>
							<th scope="col">Applicant Email</th>
							<th scope="col">Mark Percentage</th>
						</tr>
					</thead>
					<tbody>
						{newRej.map((a) => (
							<tr key={a?.id}>
								<td>{a?.id}</td>
								<td>{a?.courseId}</td>
								<td>{a?.courseName}</td>
								<td>{a?.applicantName}</td>
								<td>{a?.applicantEmail}</td>
								<td>{a?.markPercentage}</td>
							</tr>
						))}
					</tbody>
				</table>
			) : (
				<p>No rejected applications</p>
			)}
		</div>
	);
}

export default ViewApplications;
