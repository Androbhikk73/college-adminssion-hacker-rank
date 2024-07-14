import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCourses, addSeats } from "../app/slice";
import { useNavigate } from "react-router-dom";

//Dispatch 'getCourses' to get available courses
//Dispatch 'addSeats' to modify the seat count for a course
const AddSeats = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const courses = useSelector(({ app }) => app?.courses);
	const [course, setCourse] = useState(null);
	const [newSeats, setNewSeats] = useState(0);

	useEffect(() => {
		dispatch(getCourses());
	}, []);

	const updateSeat = (event) => {
		let index = event.target.value;
		let selectedCourse = courses[index];
		setCourse(selectedCourse);
	};

	const handleSubmit = (event) => {
		event.preventDefault();

		dispatch(addSeats({ id: course?.id, availableSeats: newSeats }));
		dispatch(getCourses());
	};

	return (
		<div>
			<form
				className="container mt-5"
				onSubmit={handleSubmit}>
				<label className="px-2">
					Course:
					<select
						className="form-select"
						id="courseSelect"
						onChange={updateSeat}>
						<option
							value=""
							disabled>
							Select Course
						</option>
						{courses &&
							courses.map((c, i) => (
								<option
									key={c?.id}
									value={i}>
									{c?.courseName} (Id: {c?.courseId})
								</option>
							))}
					</select>
				</label>
				<label
					className="px-2"
					id="availableSeats">
					Available Seats: {course?.availableSeats}
					<input
						type="number"
						className="form-control"
						id="newSeatCount"
						name="newSeatCount"
						placeholder="New count"
						defaultValue={newSeats}
						onKeyUp={(e) => setNewSeats(e.target.value)}
					/>
				</label>
				<input
					type="submit"
					className="btn btn-primary"
					id="submitButton"
					value="Submit"
				/>
			</form>
		</div>
	);
};

export default AddSeats;
