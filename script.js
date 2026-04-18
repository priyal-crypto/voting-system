function submitVote() {

  let rollInput = document.getElementById("roll");
  let errorBox = document.getElementById("rollError");
  let statusBox = document.getElementById("status");
  const btn = document.querySelector("button");

  let roll = rollInput.value.trim().toUpperCase();

  // clear error
  errorBox.innerText = "";
  rollInput.classList.remove("input-error");

  // 🎯 STRICT COLLEGE FORMAT
  let pattern = /^(25104|25108)[AB]\d{4}$/;

  if (!pattern.test(roll)) {
    errorBox.innerText = "⚠️ Enter valid Roll No (e.g., 25104A0075)";
    rollInput.classList.add("input-error");

    setTimeout(() => {
      rollInput.classList.remove("input-error");
    }, 300);

    return;
  }

  // 🎯 PARTY CHECK
  let selected = document.querySelector('input[name="vote"]:checked');
  if (!selected) {
    alert("Please select a party!");
    return;
  }

  // 🔘 UI
  btn.disabled = true;
  btn.innerText = "Submitting...";
  statusBox.innerText = "Submitting your vote...";

  // 🌐 SEND
  fetch("https://script.google.com/macros/s/AKfycbzYc__OoWiNM1i1levJOGEVOKGgvwB-ke3ptKOMfS702O7SK_r_uY9z9xHxBccxHAhI/exec", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      roll: roll,
      vote: selected.value
    })
  })
  .then(res => res.text())
  .then(data => {

    console.log("Server:", data);

    if (data === "Already voted") {
      errorBox.innerText = "❌ This Roll Number has already voted!";
      btn.disabled = false;
      btn.innerText = "Submit Vote";
      return;
    }

    if (data.includes("Error")) {
      statusBox.innerText = "❌ Server error!";
      btn.disabled = false;
      btn.innerText = "Submit Vote";
      return;
    }

    statusBox.innerText = "✅ Vote submitted successfully!";
    btn.innerText = "Vote Submitted";

  })
  .catch(err => {
    console.log(err);
    statusBox.innerText = "❌ Error submitting vote!";
    btn.disabled = false;
    btn.innerText = "Submit Vote";
  });
}
