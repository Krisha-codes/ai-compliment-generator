document.getElementById("generateBtn").addEventListener("click", async () => {
  const theme = document.getElementById("theme").value.trim();
  const output = document.getElementById("output");

  if (!theme) {
    output.textContent = "Please enter a theme!";
    return;
  }

  output.textContent = "Thinking...";

  try {
    const res = await fetch("http://localhost:3000/api/compliment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ theme })
    });

    const data = await res.json();
    output.textContent = data.compliment || "No compliment found";
  } catch (err) {
    output.textContent = "Error connecting to server!";
  }
});
