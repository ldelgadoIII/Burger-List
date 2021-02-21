// Make sure we wait to attach our handlers until the DOM is fully loaded.
document.addEventListener("DOMContentLoaded", (event) => {
  if (event) {
    console.info("DOM loaded");
  }

  // DELETE
  // Get the button
  const deleteQuoteBtns = document.querySelectorAll(".remove-burger");

  // Set up the event listeners for each delete button
  deleteQuoteBtns.forEach((button) => {
    button.addEventListener("click", (e) => {
      const id = e.target.getAttribute("data-id");
      console.log("delete burger id", id);

      // Send the delete request
      fetch(`/api/burgers/${id}`, {
        method: "DELETE",
      }).then((res) => {
        console.log(res);
        console.log(`Deleted ID: ${id}`);

        if (res.ok) {
          location.reload();
        }

        // Reload the page
      });
    });
  });

  // UPDATE
  const changeDevourBtns = document.querySelectorAll(".change-status");

  // Set up the event listener for the create button
  if (changeDevourBtns) {
    changeDevourBtns.forEach((button) => {
      button.addEventListener("click", (e) => {
        console.log("test");
        // Grabs the id of the element that goes by the name, "id"
        const id = e.target.getAttribute("data-id");
        const newStatus = e.target.getAttribute("data-status");

        const newState = {
          devour: newStatus,
        };

        fetch(`/api/burgers/${id}`, {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },

          // make sure to serialize the JSON body
          body: JSON.stringify(newState),
        }).then((response) => {
          // Check that the response is all good
          // Reload the page so the user can see the new quote
          if (response.ok) {
            console.log(`changed sleep to: ${newStatus}`);
            location.reload("/");
          } else {
            alert("something went wrong!");
          }
        });
      });
    });
  }

  // CREATE
  const createCatBtn = document.getElementById("create-form");

  if (createCatBtn) {
    createCatBtn.addEventListener("submit", (e) => {
      e.preventDefault();

      // Grabs the value of the textarea that goes by the name, "quote"
      const newCat = {
        name: document.getElementById("ca").value.trim(),
        sleepy: document.getElementById("sleepy").checked,
      };

      // Send POST request to create a new quote
      fetch("/api/cats", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },

        // make sure to serialize the JSON body
        body: JSON.stringify(newCat),
      }).then(() => {
        // Empty the form
        document.getElementById("ca").value = "";

        // Reload the page so the user can see the new quote
        console.log("Created a new cat!");
        location.reload();
      });
    });
  }
});
