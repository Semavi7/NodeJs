exports.getAllCountries = (req, res) => {
    try {
        const countries = require("../json/countries.json")
        return countries
    } catch (error) {
        throw new error
    }
}
exports.getCityByCountryId = (id) => {
    try {
        const citiesArray = require("../json/cities.json")
        const cities = citiesArray.filter((item) => item.country_id === id)
        return cities
    } catch (error) {
        throw new error
    }
}