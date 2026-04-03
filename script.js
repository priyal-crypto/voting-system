function submitVote() {

  // Prevent multiple votes (same device)
  if (localStorage.getItem("voted")) {
    alert("You have already voted!");
    return;
  }

  let selected = document.querySelector('input[name="vote"]:checked');

  if (!selected) {
    alert("Please select a party!");
    return;
  }

  fetch("https://script.google.com/macros/s/AKfycbzYc__OoWiNM1i1levJOGEVOKGgvwB-ke3ptKOMfS702O7SK_r_uY9z9xHxBccxHAhI/exec", {
    method: "POST",
    body: JSON.stringify({
      vote: selected.value
    })
  })
  .then(response => response.text())
  .then(data => {
    document.getElementById("status").innerText = "✅ Vote submitted successfully!";
    
    localStorage.setItem("voted", "true");
    document.querySelector("button").disabled = true;
  })
  .catch(error => {
    document.getElementById("status").innerText = "❌ Error submitting vote!";
  });
}