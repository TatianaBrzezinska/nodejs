function parseJSON(data) {
    try {
        return JSON.parse(data);
    } catch (error) {
        if (error instanceof SyntaxError) {
            throw new Error("Invalid syntax");
        }
        throw new Error("Unexpected error");
    }
}

const invalidJSON = "{invalid json";
try {
    const result = parseJSON(invalidJSON);
    console.log(result);
} catch (error) {
    console.error("Failed to parse JSON:", error.message);
}
