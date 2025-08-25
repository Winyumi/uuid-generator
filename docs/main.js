(async () => {
  /** @type {HTMLButtonElement} */
  const generatorForm = document.querySelector("form#generator");
  /** @type {HTMLInputElement} */
  const countInput = generatorForm.querySelector("#count");
  /** @type {HTMLTextAreaElement} */
  const outputTextarea = document.querySelector("#output");
  /** @type {HTMLButtonElement} */
  const copyBtn = document.querySelector("button#copy");

  if (!generatorForm || !countInput || !outputTextarea || !copyBtn) {
    throw new DOMException("Invalid elements");
  }

  generatorForm.addEventListener("submit", (event) => {
    event.preventDefault();
    countInput.value = parseInt(countInput.value) || 0;
    const count = countInput.value;
    if (count >= 1000 && !confirm("Are you sure? This may take some time.")) {
      return;
    }
    let output = "";
    for (let i = 0; i < count; i++) {
      output += crypto.randomUUID() + "\n";
    }
    outputTextarea.value = output.trim();
  });

  copyBtn.addEventListener("click", async (event) => {
    event.preventDefault();
    try {
      await navigator.clipboard.writeText(outputTextarea.value);
      outputTextarea.select();
    } catch (err) {
      console.error("Failed to copy to clipboard:", err);
      alert("Failed to copy to clipboard");
    }
  });
})();
