import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getApplications = createAsyncThunk("getApplications", async () => {
	try {
		const response = await axios.get("/api/applications");
		return response.data;
	} catch (error) {
		console.error(error);
		throw error;
	}
});

export const modifyApplicationStatus = createAsyncThunk("modifyApplicationStatus", async (args) => {
	let { id, status } = args;

	try {
		const response = await axios.patch(`/api/applications/${id}`, { status });
		return response.data;
	} catch (error) {
		console.error(error);
		throw error;
	}
});

export const getCourses = createAsyncThunk("getCourses", async () => {
	try {
		const response = await axios.get("/api/courses");
		return response.data;
	} catch (error) {
		console.error(error);
		throw error;
	}
});

export const addSeats = createAsyncThunk("addSeats", async (args) => {
	let { id, availableSeats } = args;

	try {
		const response = await axios.patch(`/api/courses/${id}`, { availableSeats });
		return response.data;
	} catch (error) {
		console.error(error);
		throw error;
	}
});

export const getApplicationStatus = createAsyncThunk("getApplicationStatus", async (args) => {
	let { email } = args;

	try {
		const response = await axios.get(`/api/applications?applicantEmail=${email}`);
		return response.data;
	} catch (error) {
		console.error(error);
		throw error;
	}
});

const initialState = {
	user: null,
	courses: [],
	applications: [],
};

export const slice = createSlice({
	name: "admissions",
	initialState,
	reducers: {
		setLoggedUser: (state, action) => {
			return { ...state, user: action.payload };
		},
		setLoggedOutUser: (state, action) => {
			return (state = initialState);
		},
	},
	extraReducers: (builder) => {
		builder.addCase(getApplications.fulfilled, (state, action) => {
			return { ...state, applications: action.payload };
		});

		builder.addCase(getApplicationStatus.fulfilled, (state, action) => {
			return { ...state, applications: action.payload };
		});

		builder.addCase(addSeats.fulfilled, (state, action) => {
			const index = state.courses.findIndex((course) => course.id === action.payload.id);
			if (index !== -1) {
				state.courses[index] = action.payload;
			}
		});

		builder.addCase(getCourses.fulfilled, (state, action) => {
			return { ...state, courses: action.payload };
		});
	},
});

const { actions, reducer } = slice;
export const { setLoggedUser, setLoggedOutUser } = actions;
export default reducer;
