import axios from 'axios';
export const GET_COUNTRY_DETAILS = 'GET_COUNTRY_DETAILS';


// API END POINT
const URL = "http://universities.hipolabs.com/search?country=United+Kingdom";


// GET DETAILS
  export const getCuntryDetails = () => async (dispatch) => {
	return new Promise (async(reslove, reject) =>{

		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};
		axios
            .get(URL, config)
			.then((res) => {
				const resJsonData = res.data;
				dispatch({
					type: GET_COUNTRY_DETAILS,
					payload: resJsonData,
				});
                reslove(resJsonData)
			})
			.catch((error) => {
				reject(error)
			});
	});

}
