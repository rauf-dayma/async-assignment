const button = document.querySelector(".button");
const promiseTask = document.querySelector(".promiseTask");

button.addEventListener("click", promiseFunction);

function promiseFunction() {
    // Clear previous container if exists
    const existingContainer = document.querySelector(".container");
    if (existingContainer) {
        promiseTask.removeChild(existingContainer);
    }

    // Create and style new container
    const container = document.createElement("div");
    container.classList.add("container");
    promiseTask.insertBefore(container, button);

    // Create and style new paragraph
    const para = document.createElement("p");
    para.classList.add("para");
    para.innerText = "Loading...";
    container.appendChild(para);

    // Set timeout for the fetch operation
    const TIMEOUT = 5000; // 5 seconds

    // Function to create a timeout promise
    function timeoutPromise(duration) {
        return new Promise((_, reject) =>
            setTimeout(() => reject(new Error("Operation timed out")), duration)
        );
    }

    // Fetch data and handle timeout
    const fetchPromise = fetch("https://dummyjson.com/posts").then(response =>
        response.json().then(result => para.innerText = JSON.stringify(result, null, 2))
    );

    Promise.race([fetchPromise, timeoutPromise(TIMEOUT)])
        .catch(err => {
            if (err.message === "Operation timed out") {
                para.innerText = "Operation timed out";
            } else {
                para.innerText = "An error occurred";
            }
            console.log(err);
        });
}
