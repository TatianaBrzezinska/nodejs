function parseJSON(data) {
    try {
        return JSON.parse(data);
    } catch (error) {
        return null;
    }
}

const invalidJSON = "{invalid json";
const result = parseJSON(invalidJSON);
console.log(result);
