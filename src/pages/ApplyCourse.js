import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCourses, getApplicationStatus } from '../app/slice';

import axios from 'axios';

function ApplyCourse() {
	const dispatch = useDispatch();
	const user = useSelector(({ app }) => app?.user);
	const courses = useSelector(({ app }) => app?.courses);

	useEffect(() => {
		dispatch(getCourses());
	}, []);

	const applyCourse = async (c) => {
		let { email, name, markPercentage } = user;
		let { courseId, courseName } = c;
		let requestbody = {
			id: new Date().getTime(),
			applicantEmail: email,
			applicantName: name,
			courseId,
			courseName,
			status: 'Pending',
			markPercentage,
		};

		await axios
			.post('/api/applications', requestbody)
			.then((data) => {
				let res = data.data;
				if (res) {
					dispatch(getApplicationStatus({ email: user?.email }));
					alert(`Your application submitted successfully with ${res.id}`);
				}
			})
			.catch((e) => console.error(e));
	};

	return (
		<div className='container'>
			<table className='table table-hover'>
				<thead>
					<tr>
						<th scope='col'>Course Id</th>
						<th scope='col'>Course Name</th>
						<th scope='col'>Available Seats</th>
						<th scope='col'>Actions</th>
					</tr>
				</thead>
				<tbody>
					{courses &&
						courses.map((c) => (
							<tr key={c?.id}>
								<td>{c?.courseId}</td>
								<td>{c?.courseName}</td>
								<td>{c?.availableSeats}</td>
								<td>
									{c?.availableSeats > 0 && (
										<button
											className='btn btn-outline-success mx-1'
											onClick={() => applyCourse(c)}>
											Apply
										</button>
									)}
								</td>
							</tr>
						))}
				</tbody>
			</table>
		</div>
	);
}

export default ApplyCourse;
