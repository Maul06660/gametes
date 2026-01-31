const ukuran = 5; // papan 1-25
let posisi = [1, 1]; // posisi player 1 & 2
let player = 0; // 0 = player 1, 1 = player 2
let angka1, angka2;

// ular & tangga
const ularTangga = {
  3: 11,
  6: 17,
  9: 2,
  14: 4,
  19: 8,
  22: 24
};

function buatPapan() {
  const papan = document.getElementById("papan");
  papan.innerHTML = "";
  let angka = ukuran * ukuran;

  for (let i = 0; i < ukuran; i++) {
    let row = document.createElement("tr");
    for (let j = 0; j < ukuran; j++) {
      let cell = document.createElement("td");
      let num = angka--;
      cell.innerText = num;

      if (num === posisi[0]) cell.innerHTML += `<div class="p1">1</div>`;
      if (num === posisi[1]) cell.innerHTML += `<div class="p2">2</div>`;

      row.appendChild(cell);
    }
    papan.appendChild(row);
  }
}

function updateGiliran() {
  document.getElementById("giliran").innerText =
    "Giliran: Player " + (player + 1);
}

function buatSoal() {
  angka1 = Math.floor(Math.random() * 10) + 1;
  angka2 = Math.floor(Math.random() * 10) + 1;
  document.getElementById("soal").innerText =
    "Soal: " + angka1 + " + " + angka2 + " = ?";
  document.getElementById("jawaban").value = "";
  document.getElementById("daduBtn").disabled = true;
  document.getElementById("info").innerText = "";
}

document.getElementById("jawaban").addEventListener("input", function() {
  let jawab = parseInt(this.value);
  if (jawab === angka1 + angka2) {
    document.getElementById("daduBtn").disabled = false;
    document.getElementById("info").innerText = "✅ Benar! Silakan kocok dadu.";
  }
});

function gantiPlayer() {
  player = player === 0 ? 1 : 0;
  updateGiliran();
}

function kocokDadu() {
  let dadu = Math.floor(Math.random() * 6) + 1;
  document.getElementById("info").innerText =
    "🎲 Player " + (player + 1) + " mendapat dadu: " + dadu;

  posisi[player] += dadu;
  if (posisi[player] > 25) posisi[player] = 25;

  if (ularTangga[posisi[player]]) {
    posisi[player] = ularTangga[posisi[player]];
    document.getElementById("info").innerText +=
      " 🐍/🪜 pindah ke " + posisi[player];
  }

  if (posisi[player] === 25) {
    alert("🎉 Player " + (player + 1) + " menang!");
    posisi = [1, 1];
    player = 0;
  }

  buatPapan();

  // aturan giliran
  if (dadu !== 6) {
    gantiPlayer();
  }

  document.getElementById("daduBtn").disabled = true;
}

buatPapan();
updateGiliran();
