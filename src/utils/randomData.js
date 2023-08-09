import { formatDateString } from "./dates"
import { departmentsList } from "./departmentsList"

// Get a random item from an array
export function getRandomValue(array) {
    const randomIndex = Math.floor(Math.random() * array.length)
    return array[randomIndex];
}

// Sources
export const randomFirstNames = ["Liam", "Noah", "Ethan", "Benjamin", "James", "William", "Alexander", "Michael", "Daniel", "Matthew", "Jackson", "Aiden", "Henry", "Joseph", "Samuel", "David", "Christopher", "Andrew", "Mason", "Elijah", "Emma", "Olivia", "Ava", "Sophia", "Isabella", "Mia", "Charlotte", "Amelia", "Harper", "Evelyn", "Abigail", "Emily", "Elizabeth", "Sofia", "Avery", "Grace", "Lily", "Scarlett", "Victoria", "Chloe"]
export const randomLastNames = ["Smith","Johnson","Williams","Jones","Brown","Davis","Miller","Wilson","Anderson","Taylor","Thomas","Jackson","White","Harris","Martin","Thompson","Garcia","Martinez","Robinson","Clark","Rodriguez","Lewis","Lee","Walker","Hall","Allen","Young","Hernandez","King","Wright","Lopez","Hill","Scott","Green","Adams","Baker","Gonzalez","Nelson","Carter","Mitchell","Perez","Roberts","Turner","Phillips","Campbell","Parker","Evans","Edwards","Collins","Stewart"]
export const randomBirthYears = [1975, 1976, 1977, 1978, 1979, 1980, 1981, 1982, 1983, 1984, 1985, 1986, 1987, 1988, 1989, 1990]
export const randomStartYears = [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022]
export const randomMonths = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
export const randomDays = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28]
export const randomStreets = ["1234 Elm St", "5678 Oak Ave", "9012 Maple Ln", "3456 Pine Dr", "7890 Cedar Rd", "2345 Birch Ct", "6789 Willow Blvd", "1234 Ash Way", "5678 Spruce Ave", "9012 Hickory Ln", "3456 Juniper Dr", "7890 Sycamore Rd", "2345 Poplar Ct", "6789 Magnolia Blvd", "1234 Chestnut Way", "5678 Cypress Ave", "9012 Redwood Ln", "3456 Dogwood Dr", "7890 Laurel Rd", "2345 Pineapple Ct", "6789 Peach Blvd", "1234 Plum Way", "5678 Orange Ave", "9012 Lemon Ln", "3456 Lime Dr", "7890 Grape Rd", "2345 Apple Ct", "6789 Cherry Blvd", "1234 Berry Way", "5678 Fig Ave", "9012 Melon Ln", "3456 Watermelon Dr", "7890 Kiwi Rd", "2345 Papaya Ct", "6789 Mango Blvd", "1234 Banana Way", "5678 Avocado Ave", "9012 Guava Ln", "3456 Pomegranate Dr", "7890 Coconut Rd", "2345 Blueberry Ct", "6789 Raspberry Blvd", "1234 Blackberry Way", "5678 Strawberry Ave", "9012 Pineapple Ln", "3456 Cranberry Dr", "7890 Kiwi Rd", "2345 Papaya Ct", "6789 Mango Blvd", "1234 Banana Way"]  
export const randomCities = ["Atlanta", "Austin", "Baltimore", "Birmingham", "Boston", "Charlotte", "Chicago", "Cincinnati", "Cleveland", "Columbus", "Dallas", "Denver", "Detroit", "El Paso", "Fort Worth", "Houston", "Indianapolis", "Jacksonville", "Kansas City", "Las Vegas", "Los Angeles", "Louisville", "Memphis", "Miami", "Milwaukee", "Minneapolis", "Nashville", "New-Orleans", "New York", "Oklahoma City", "Omaha", "Orlando", "Philadelphia", "Phoenix", "Pittsburgh", "Portland", "Raleigh", "Richmond", "Sacramento", "Salt Lake City", "San Antonio", "San Diego", "San Francisco", "San Jose", "Seattle", "St. Louis", "Tampa", "Tucson", "Virginia Beach", "Washington"]
export const randomStates = ["Alabama", "Alaska", "American Samoa", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "District Of Columbia", "Federated States Of Micronesia", "Florida", "Georgia", "Guam", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Marshall Islands", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Northern Mariana Islands", "Ohio", "Oklahoma", "Oregon", "Palau", "Pennsylvania", "Puerto Rico", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virgin Islands", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"]
export const randomZipCodes = ["90210", "60611", "77002", "10001", "33139", "94102", "90046", "30303", "75201", "98101", "32801", "19103", "60610", "20001", "90291", "33132", "94110", "90069", "75204", "10019", "60654", "77005", "33130", "94103" , "90036", "32803", "19102", "98121", "75219", "20002", "33131", "90028", "60607", "77019", "32806", "10036", "75206" , "19107" , "90045", "98109" , "20009" , "77006", "60661", "94114", "32804", "19106", "10013", "75230", "90027"]

// Create and format an employee object
export function createEmployeeObject(){
    const birth = new Date()
    birth.setFullYear(getRandomValue(randomBirthYears))
    birth.setMonth(getRandomValue(randomMonths))
    birth.setDate(getRandomValue(randomDays))
    const start = new Date()
    start.setFullYear(getRandomValue(randomStartYears))
    start.setMonth(getRandomValue(randomMonths))
    start.setDate(getRandomValue(randomDays))
    return {
        firstName: getRandomValue(randomFirstNames),
        lastName: getRandomValue(randomLastNames),
        dateOfBirth: formatDateString(birth),
        startDate: formatDateString(start),
        department: getRandomValue(departmentsList),
        street: getRandomValue(randomStreets),
        city: getRandomValue(randomCities),
        state: getRandomValue(randomStates),
        zipCode: getRandomValue(randomZipCodes),
    }
}

// generate a array of random employee objects, converted to JSON
// = mocked Data
export function generateMockedData(){
    const mockedEntries = [1,2,3,4,5,6,7,8,9,10]
    const generatedData = mockedEntries.map(() => createEmployeeObject())
    console.log(JSON.stringify(generatedData))
}