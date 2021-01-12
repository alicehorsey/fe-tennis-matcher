import axios from "axios";

const tennisAPI = axios.create({
    baseURL: "http://tennis-match-app.herokuapp.com",
});
const postcodeAPI = axios.create({
    baseURL: "https://api.postcodes.io/postcodes",
});

export const getUsers = (currentUser) => {
    const {
        username,
        gender_preference,
        playing_hand,
        min_ability,
        max_ability,
        weekday_daytime,
        weekday_evening,
        weekends,
    } = currentUser;
    return tennisAPI
        .get("/users", { params: { username, gender_preference, min_ability, max_ability } })
        .then(({ data }) => data.users)
        .catch((error) => console.log(error));
};

export const getUser = (loggedInUser) => {

    return tennisAPI
        .get(`/users/${loggedInUser}`)
        .then(({ data }) => {
            return data
        })
        .catch((error) => console.log(error))
}

//{ params: { username, gender, playing_hand, min_ability, max_ability, weekday_daytime, weekday_evening, weekends } })

export const postNewUser = (newUser) => {
    return tennisAPI
        .post(`/users/${newUser.username}`, newUser)
        .then(({ data }) => {
            console.log(data);
            return data;
        });
};
export const getCoords = (postcode) => {
    return postcodeAPI.get(`/${postcode}`).then(({ data }) => {
        console.log(data.result);
        return data.result;
    });
};

export const getLongitude = (postcode) => {
    return postcodeAPI
        .get(`/${postcode}`)
        .then(({ data }) => console.log(data.result.longitude));
};

export const getLatitude = (postcode) => {
    return postcodeAPI.get(`/${postcode}`).then(({ data }) => {
        console.log(data.result.latitude);
        return data.result.latitude;
    });
};
