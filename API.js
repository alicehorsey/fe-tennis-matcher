import axios from "axios";

const tennisAPI = axios.create({baseURL: "http://tennis-match-app.herokuapp.com"})

export const getUsers = (currentUser) => {
    console.log("getUsers")
    const {gender, playing_hand, min_ability, max_ability, weekday_daytime, weekday_evening, weekends} = currentUser;
    return tennisAPI.get("/users", {params: {gender, playing_hand, min_ability, max_ability, weekday_daytime, weekday_evening, weekends}})
    .then((data) => console.log(data))
    .catch((error) => console.log(error))
}
