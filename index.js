const translateBtn = document.getElementById("translate");

translateBtn.addEventListener("click", async () => {
  const text = document.getElementById("input").value;
  const selected = document.querySelector("input[name='language']:checked");

  if (!text.trim()) {
    alert("Please enter some text");
    return;
  }
  if (!selected) {
    alert("Please select a language");
    return;
  }
  const language = selected.value;

  document.getElementById("original-text").textContent = text;
  document.getElementById("translated-text").textContent = "Translating...";
  document.getElementById("input-view").classList.add("hidden");
  document.getElementById("results-view").classList.remove("hidden");

  // ask OUR server function to do the translating
  const res = await fetch("/api/translate", {
    method: "POST",
    body: JSON.stringify({ text, language }),
  });
  const data = await res.json();

  document.getElementById("translated-text").textContent = data.translation;
});

const startOverBtn = document.getElementById("start-over");

startOverBtn.addEventListener("click", () => {
  document.getElementById("input").value = "";
  document.getElementById("results-view").classList.add("hidden");
  document.getElementById("input-view").classList.remove("hidden");
});
