const button = document.querySelector(".button");
const asyncAwait = document.querySelector(".asyncAwait");

button.addEventListener("click", asyncAwaitFunction);

async function asyncAwaitFunction() {
    console.log("hii")
    // Clear previous container if exists
    const existingContainer = document.querySelector(".container");
    if (existingContainer) {
        asyncAwait.removeChild(existingContainer);
    }

    // Create and style new container
    const container = document.createElement("div");
    container.classList.add("container");
    asyncAwait.insertBefore(container, button);

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

    // Fetch data with timeout handling
    try {
        const response = await Promise.race([
            fetch("https://dummyjson.com/posts"),
            timeoutPromise(TIMEOUT)
        ]);
        const result = await response.json();
        para.innerText = JSON.stringify(result, null, 2);
    } catch (err) {
        if (err.message === "Operation timed out") {
            para.innerText = "Operation timed out";
        } else {
            para.innerText = "An error occurred";
        }
        console.log(err);
    }
}
