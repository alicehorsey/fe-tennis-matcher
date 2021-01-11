import axios from "axios";

const tennisAPI = axios.create({ baseURL: "http://tennis-match-app.herokuapp.com" })

export const getUsers = (currentUser) => {
    const { username, gender, playing_hand, min_ability, max_ability, weekday_daytime, weekday_evening, weekends } = currentUser;
    return tennisAPI
        .get("/users", { params: { username, gender, min_ability, max_ability } })
        .then(({ data }) => data.users)
        .catch((error) => console.log(error))
}

//{ params: { username, gender, playing_hand, min_ability, max_ability, weekday_daytime, weekday_evening, weekends } })