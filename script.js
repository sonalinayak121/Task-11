// Function to fetch country data using Fetch API
function getCountryData() {
    const country = document.getElementById("countryInput").value;
    const resultDiv = document.getElementById("result");
    const loading = document.getElementById("loading");

    // Input validation
    if (country === "") {
        alert("Please enter a country name");
        return;
    }

    // Show loading indicator
    loading.style.display = "block";
    resultDiv.innerHTML = "";

    // Fetch API call
    fetch(`https://restcountries.com/v3.1/name/${country}`)
        .then(response => {
            // Check for HTTP errors
            if (!response.ok) {
                throw new Error("Country not found");
            }
            return response.json(); // Convert response to JSON
        })
        .then(data => {
            // Extract required data
            const countryData = data[0];

            resultDiv.innerHTML = `
                <h3>${countryData.name.common}</h3>
                <p><strong>Capital:</strong> ${countryData.capital}</p>
                <p><strong>Population:</strong> ${countryData.population}</p>
                <p><strong>Region:</strong> ${countryData.region}</p>
                <img src="${countryData.flags.png}" width="100">
            `;
        })
        .catch(error => {
            // Error handling
            resultDiv.innerHTML = `<p style="color:red;">${error.message}</p>`;
        })
        .finally(() => {
            // Hide loading indicator
            loading.style.display = "none";
        });
}