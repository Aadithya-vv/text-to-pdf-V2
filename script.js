// Birthday data - replace with actual dates
const birthdays = [
  { name: "Aadithya", emoji: "🐱" },
  { name: "Kishor", date: "03-25", emoji: "🐶" },
  { name: "Arun", date: "05-09", emoji: "🦁" },
  { name: "Dharakeshwar", date: "05-07", emoji: "🦊" },
  { name: "Karthik", date: "09-24", emoji: "🐰" },
  { name: "Baradhwaj", date: "10-28", emoji: "🐸" },
  { name: "Ammu", date: "09-03", emoji: "🐥" },
  { name: "Achu", date: "03-10", emoji: "🐯" },
  { name: "Jameela", date: "03-03", emoji: "🐼" },
  { name: "Lakshya", date: "10-09", emoji: "🐨" },
  { name: "Meena", date: "10-29", emoji: "🐷" },
  { name: "Krithiga", date: "06-10", emoji: "🐻" }
];

function checkBirthdays() {
  const today = new Date();
  const todayStr = `${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  
  const birthdayPerson = birthdays.find(person => person.date === todayStr);
  
  if (birthdayPerson) {
    showBirthdayBanner(birthdayPerson);
    startSpecialEffects(birthdayPerson);
  }
}

function showBirthdayBanner(person) {
  const banner = document.createElement('div');
  banner.className = 'birthday-banner';
  banner.innerHTML = `
    <span>🎉 Happy Birthday, ${person.name} ${person.emoji}! 🎉</span>
    <button class="close-btn">✕</button>
  `;
  
  document.body.insertBefore(banner, document.body.firstChild);
  
  const closeBtn = banner.querySelector('.close-btn');
  closeBtn.addEventListener('click', () => {
    banner.classList.add('fade-out');
    setTimeout(() => banner.remove(), 400);
    stopSpecialEffects();
  });
}

function startSpecialEffects(person) {
  // Start confetti
  startConfetti();
  
  // Create floating emojis
  createFloatingEmojis(person.emoji);
  
  // Create balloons
  createBalloons();
  
  // Play birthday sound
  playBirthdaySound();
}

function stopSpecialEffects() {
  // Clear all animations
  const floatingElements = document.querySelectorAll('.floating-emoji, .balloon');
  floatingElements.forEach(el => el.remove());
  
  // Stop confetti if it's running
  if (window.confetti) {
    window.confetti.reset();
  }
}

function createFloatingEmojis(emoji) {
  for (let i = 0; i < 15; i++) {
    setTimeout(() => {
      const emojiElement = document.createElement('div');
      emojiElement.className = 'floating-emoji';
      emojiElement.textContent = emoji;
      emojiElement.style.left = `${Math.random() * 100}vw`;
      emojiElement.style.top = `${Math.random() * 100}vh`;
      emojiElement.style.animationDelay = `${Math.random() * 5}s`;
      emojiElement.style.fontSize = `${Math.random() * 2 + 1.5}rem`;
      document.body.appendChild(emojiElement);
    }, i * 300);
  }
}

function createBalloons() {
  const colors = ['#ff6b6b', '#48dbfb', '#1dd1a1', '#feca57', '#ff9ff3', '#5f27cd'];
  
  for (let i = 0; i < 20; i++) {
    setTimeout(() => {
      const balloon = document.createElement('div');
      balloon.className = 'balloon';
      balloon.style.left = `${Math.random() * 100}vw`;
      balloon.style.background = colors[Math.floor(Math.random() * colors.length)];
      balloon.style.animationDuration = `${10 + Math.random() * 10}s`;
      document.body.appendChild(balloon);
    }, i * 500);
  }
}

function playBirthdaySound() {
  const audio = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-happy-birthday-to-you-2380.mp3');
  audio.volume = 0.3;
  audio.play().catch(e => console.log("Audio play failed:", e));
}

function startConfetti() {
  // Enhanced confetti with different shapes and colors
  const count = 200;
  const defaults = {
    origin: { y: 0.7 },
    spread: 90,
    ticks: 100,
    gravity: 0.5,
    decay: 0.94,
    startVelocity: 25,
    shapes: ['circle', 'square', 'star'],
    colors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff']
  };

  function fire(particleRatio, opts) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio)
    });
  }

  fire(0.25, { spread: 26, startVelocity: 55 });
  fire(0.2, { spread: 60 });
  fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
  fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
  fire(0.1, { spread: 120, startVelocity: 45 });
  
  // Keep firing confetti periodically
  const interval = setInterval(() => {
    fire(0.1, { spread: 60, startVelocity: 30 });
  }, 3000);

  // Store interval ID to clear later
  window.confettiInterval = interval;
}

// Add this to your existing DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', function() {
  checkBirthdays();
  
  // Add confetti canvas
  const confettiCanvas = document.createElement('canvas');
  confettiCanvas.id = 'confetti-canvas';
  confettiCanvas.style.position = 'fixed';
  confettiCanvas.style.top = '0';
  confettiCanvas.style.left = '0';
  confettiCanvas.style.width = '100%';
  confettiCanvas.style.height = '100%';
  confettiCanvas.style.pointerEvents = 'none';
  confettiCanvas.style.zIndex = '1000';
  document.body.appendChild(confettiCanvas);
});
document.addEventListener("DOMContentLoaded", function () {
  // =================== PDF CONVERTER CODE ===================
  if (document.getElementById('textInput') && document.getElementById('generatePdfBtn')) {
    const fontMap = {
      Font1: { css: "Times New Roman", pdf: "times" },
      Font2: { css: "Courier New", pdf: "courier" },
      Font3: { css: "Arial", pdf: "helvetica" }
    };

    const generateBtn = document.getElementById("generatePdfBtn");
    const fontSelect = document.getElementById("fontSelect");
    const fontSizeInput = document.getElementById("fontSize");
    const colorPicker = document.getElementById("colorPicker");
    const alignment = document.getElementById("alignment");
    const preview = document.getElementById("preview");
    const textInput = document.getElementById("textInput");
    const pdfUpload = document.getElementById("pdfUpload");

    let originalPdfStructure = null;

    if (fontSelect && textInput) {
      fontSelect.addEventListener("change", updatePreview);
      textInput.addEventListener("input", updatePreview);
      updatePreview();
    }

    if (pdfUpload) {
      pdfUpload.addEventListener("change", async function () {
        const file = pdfUpload.files[0];
        if (!file || file.type !== "application/pdf") return;

        const reader = new FileReader();
        reader.onload = async function () {
          const typedarray = new Uint8Array(this.result);
          const pdf = await pdfjsLib.getDocument(typedarray).promise;
          
          originalPdfStructure = {
            numPages: pdf.numPages,
            pages: []
          };

          let fullText = "";

          for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const viewport = page.getViewport({ scale: 1.0 });
            const textContent = await page.getTextContent();
            
            const pageStructure = {
              width: viewport.width,
              height: viewport.height,
              items: []
            };

            textContent.items.forEach(item => {
              pageStructure.items.push({
                str: item.str,
                transform: item.transform,
                width: item.width,
                height: item.height
              });
            });

            originalPdfStructure.pages.push(pageStructure);
            
            const lines = textContent.items.map(item => item.str.trim()).filter(Boolean);
            const pageText = lines.join("\n");
            fullText += pageText;
            if (i < pdf.numPages) fullText += "\f";
          }

          textInput.value = fullText;
          updatePreview();
        };

        reader.readAsArrayBuffer(file);
      });
    }

    if (generateBtn) {
      generateBtn.addEventListener("click", () => {
        if (!originalPdfStructure) {
          alert("Please upload a PDF first to use its structure");
          return;
        }

        const jsPDF = window.jspdf.jsPDF;
        const doc = new jsPDF({
          orientation: originalPdfStructure.pages[0].width > originalPdfStructure.pages[0].height ? "landscape" : "portrait",
          unit: "pt",
          format: [originalPdfStructure.pages[0].width, originalPdfStructure.pages[0].height]
        });

        const text = textInput.value;
        const fontKey = fontSelect.value;
        const fontSize = parseInt(fontSizeInput.value, 10) || 16;
        const color = hexToRgb(colorPicker.value);
        const align = alignment.value;
        const { pdf: jsPdfFont } = fontMap[fontKey] || fontMap.Font3;

        doc.setFont(jsPdfFont);
        doc.setFontSize(fontSize);
        if (color) doc.setTextColor(color.r, color.g, color.b);

        const pages = text.split("\f");
        
        for (let i = 0; i < originalPdfStructure.numPages; i++) {
          if (i > 0) {
            doc.addPage([originalPdfStructure.pages[i].width, originalPdfStructure.pages[i].height]);
          }
          
          const pageText = pages[i] || "";
          const originalPage = originalPdfStructure.pages[i];
          
          const lines = doc.splitTextToSize(pageText, originalPage.width - 40);
          
          let y = 40;
          lines.forEach(line => {
            let x;
            if (align === "center") x = originalPage.width / 2;
            else if (align === "right") x = originalPage.width - 20;
            else x = 20;

            doc.text(line, x, y, { align });
            y += fontSize * 1.5;
            
            if (y > originalPage.height - 20) {
              doc.addPage([originalPage.width, originalPage.height]);
              y = 40;
            }
          });
        }

        doc.save("generated.pdf");
      });
    }

    function updatePreview() {
      const selectedFont = fontSelect.value;
      const sample = textInput.value || "Font Preview";
      preview.style.fontFamily = fontMap[selectedFont]?.css || "Arial";
      preview.textContent = sample;
    }

    function hexToRgb(hex) {
      const bigint = parseInt(hex.slice(1), 16);
      return {
        r: (bigint >> 16) & 255,
        g: (bigint >> 8) & 255,
        b: bigint & 255
      };
    }
  }

  // =================== TO-DO LIST CODE ===================
  if (document.getElementById('taskInput') && document.getElementById('taskList')) {
    const friends = [
      { name: "Aadithya", emoji: "🐱" },
      { name: "Kishor", emoji: "🐶" },
      { name: "Arun", emoji: "🐼" },
      { name: "Dharakeshwar", emoji: "🦊" },
      { name: "Karthik", emoji: "🐰" },
      { name: "Baradhwaj", emoji: "🐸" },
      { name: "Ammu", emoji: "🐥" },
      { name: "Achu", emoji: "🐯" },
      { name: "Jameela", emoji: "🦁" },
      { name: "Lakshya", emoji: "🐨" },
      { name: "Meena", emoji: "🐷" },
      { name: "Krithiga", emoji: "🐻" }
    ];

    const taskInput = document.getElementById("taskInput");
    const startDateInput = document.getElementById("startDateInput");
    const endDateInput = document.getElementById("endDateInput");
    const addTaskButton = document.getElementById("addTask");
    const taskList = document.getElementById("taskList");
    const friendSelect = document.getElementById("friendSelect");

    const db = firebase.database();

    function populateFriendDropdown() {
      friendSelect.innerHTML = '';
      friends.forEach(friend => {
        const opt = document.createElement("option");
        opt.value = friend.name;
        opt.textContent = `${friend.emoji} ${friend.name}`;
        friendSelect.appendChild(opt);
      });
    }

    populateFriendDropdown();

    function getCurrentUser() {
      return friendSelect.value;
    }

    addTaskButton.addEventListener("click", () => {
      const text = taskInput.value.trim();
      const startDate = startDateInput.value;
      const endDate = endDateInput.value;
      
      if (text) {
        if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
          alert("End date must be after start date!");
          return;
        }

        const newTask = {
          text,
          startDate: startDate || null,
          endDate: endDate || null,
          pending: friends.map(f => f.name),
          createdAt: firebase.database.ServerValue.TIMESTAMP
        };
        
        const taskRef = db.ref("sharedTasks").push();
        taskRef.set(newTask)
          .then(() => {
            taskInput.value = "";
            startDateInput.value = "";
            endDateInput.value = "";
          })
          .catch(error => {
            console.error("Error adding task: ", error);
          });
      }
    });

    function addTaskToDOM(taskId, taskData) {
      const li = document.createElement("li");
      li.className = "task-item";
      li.dataset.id = taskId;

      const taskHeader = document.createElement("div");
      taskHeader.className = "task-header";

      const textSpan = document.createElement("span");
      textSpan.className = "task-text";
      textSpan.textContent = taskData.text;

      const deleteBtn = document.createElement("button");
      deleteBtn.innerHTML = "&times;";
      deleteBtn.className = "delete-task";
      deleteBtn.title = "Delete task";
      deleteBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        if (confirm("Are you sure you want to delete this task?")) {
          db.ref("sharedTasks/" + taskId).remove();
        }
      });

      taskHeader.appendChild(textSpan);
      taskHeader.appendChild(deleteBtn);
      li.appendChild(taskHeader);

      if (taskData.startDate || taskData.endDate) {
        const datesPara = document.createElement("p");
        datesPara.className = "task-dates";
        
        let datesText = "";
        if (taskData.startDate && taskData.endDate) {
          datesText = `📅 ${formatDate(taskData.startDate)} - ${formatDate(taskData.endDate)}`;
        } else if (taskData.startDate) {
          datesText = `⏳ Starts: ${formatDate(taskData.startDate)}`;
        } else if (taskData.endDate) {
          datesText = `⏰ Ends: ${formatDate(taskData.endDate)}`;
        }
        
        datesPara.textContent = datesText;
        li.appendChild(datesPara);
      }

      const emojiWrapper = document.createElement("div");
      emojiWrapper.className = "emoji";

      if (taskData.pending && taskData.pending.length > 0) {
        taskData.pending.forEach(friendName => {
          const friend = friends.find(f => f.name === friendName);
          if (!friend) return;

          const emojiSpan = document.createElement("span");
          emojiSpan.textContent = friend.emoji;
          emojiSpan.dataset.friend = friend.name;
          emojiSpan.title = friend.name;

          emojiSpan.addEventListener("click", () => {
            if (getCurrentUser() !== friend.name) {
              alert(`Only ${friend.name} can remove their emoji!`);
              return;
            }
            const updatedPending = taskData.pending.filter(name => name !== friend.name);
            db.ref("sharedTasks/" + taskId + "/pending").set(updatedPending);
          });

          emojiWrapper.appendChild(emojiSpan);
        });
      }

      li.appendChild(emojiWrapper);
      taskList.appendChild(li);
    }

    function formatDate(dateString) {
      if (!dateString) return '';
      const options = { year: 'numeric', month: 'short', day: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    }

    function renderTasks(snapshot) {
      taskList.innerHTML = "";
      const tasks = snapshot.val();
      
      if (!tasks) {
        taskList.innerHTML = "<p>No tasks yet. Add one above!</p>";
        return;
      }

      const tasksArray = Object.entries(tasks).map(([id, task]) => ({ id, ...task }));
      tasksArray.sort((a, b) => (a.createdAt || 0) - (b.createdAt || 0));

      tasksArray.forEach(task => {
        addTaskToDOM(task.id, task);
      });
    }

    db.ref("sharedTasks").on("value", renderTasks);
  }
  
  
  
});

