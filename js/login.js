document.addEventListener("DOMContentLoaded", function () {
  const loginButton = document.querySelector(".login-button");
  const email = document.getElementById("email");
  const password = document.getElementById("password");

  loginButton.addEventListener("click", async function (event) {
    event.preventDefault();
    if (!email.value) {
      email.style.border = "solid";
      email.style.borderWidth = "2px";
      email.style.borderColor = "red";

      setTimeout(() => {
        email.style.border = "none";
      }, 2000);
      return;
    }
    if (!password.value) {
      password.style.border = "solid";
      password.style.borderWidth = "2px";
      password.style.borderColor = "red";
      setTimeout(() => {
        password.style.border = "none";
      }, 2000);
      return;
    }

    //  -data-raw '{
    //     "email": "ezehlivinus@gmail.com",
    //     "password": "012345"
    // }'

    // Rest of your code for form submission
    try {
      console.log("inside try");
      const response = await fetch(
        "https://globe-blog.onrender.com/api/v1/users/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email.value,
            password: password.value,
          }),
        }
      );

      const responseData = await response.json();
      console.log("responseData: ", responseData);

      if (response.status === 200) {
        alert("Account registered successfully:", responseData.message);
        // Redirect to the landing page upon successful signup
        window.location.href = "/src/landingpage.html";
      } else if (response.status === 409) {
        alert("Account already exists:", responseData.message);
      } else {
        alert("An error occurred: Please try again", responseData.message);
      }
    } catch (error) {
      console.log("error: ", error);
      alert("An error occurred: Please try again", error);
    } finally {
    }
  });
});

