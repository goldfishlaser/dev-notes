(function () {
  var dataEl = document.getElementById("te-data");
  if (!dataEl) return;

  var notes = JSON.parse(dataEl.textContent).map(function (n) {
    n.tags = n.tags || [];
    return n;
  });

  var cloudEl = document.getElementById("te-cloud");
  var resultsEl = document.getElementById("te-results");
  var countEl = document.getElementById("te-count");
  var searchEl = document.getElementById("te-search");
  var clearBtn = document.getElementById("te-clear");
  var modeBtns = Array.prototype.slice.call(document.querySelectorAll(".te-mode-btn"));

  var state = { tags: [], mode: "or", q: "" };

  // ---- tag frequency ----
  var counts = {};
  notes.forEach(function (n) {
    n.tags.forEach(function (t) {
      counts[t] = (counts[t] || 0) + 1;
    });
  });
  var allTags = Object.keys(counts).sort(function (a, b) {
    return a.localeCompare(b);
  });
  var maxCount = Math.max.apply(null, Object.values(counts).concat([1]));
  var minCount = Math.min.apply(null, Object.values(counts).concat([1]));

  function freqClass(tag) {
    if (maxCount === minCount) return "te-freq-3";
    var ratio = (counts[tag] - minCount) / (maxCount - minCount);
    var bucket = Math.min(4, Math.floor(ratio * 5));
    return "te-freq-" + (bucket + 1);
  }

  // ---- URL hash (de)serialization ----
  function readHash() {
    var h = window.location.hash.replace(/^#/, "");
    if (!h) return;
    var params = new URLSearchParams(h);
    var tagsParam = params.get("tags");
    if (tagsParam) state.tags = tagsParam.split(",").filter(Boolean);
    var modeParam = params.get("mode");
    if (modeParam === "and" || modeParam === "or") state.mode = modeParam;
    var qParam = params.get("q");
    if (qParam) state.q = qParam;
  }

  function writeHash() {
    var params = new URLSearchParams();
    if (state.tags.length) params.set("tags", state.tags.join(","));
    if (state.mode !== "or") params.set("mode", state.mode);
    if (state.q) params.set("q", state.q);
    var str = params.toString();
    history.replaceState(null, "", str ? "#" + str : window.location.pathname);
  }

  // ---- rendering ----
  function renderCloud() {
    cloudEl.innerHTML = "";
    allTags.forEach(function (tag) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "te-tag " + freqClass(tag);
      if (state.tags.indexOf(tag) !== -1) btn.classList.add("active");
      btn.textContent = tag + " (" + counts[tag] + ")";
      btn.addEventListener("click", function () {
        toggleTag(tag);
      });
      cloudEl.appendChild(btn);
    });
  }

  function toggleTag(tag) {
    var i = state.tags.indexOf(tag);
    if (i === -1) state.tags.push(tag);
    else state.tags.splice(i, 1);
    update();
  }

  function matches(note) {
    if (state.q) {
      var q = state.q.toLowerCase();
      if (note.title.toLowerCase().indexOf(q) === -1) return false;
    }
    if (state.tags.length === 0) return true;
    if (state.mode === "and") {
      return state.tags.every(function (t) {
        return note.tags.indexOf(t) !== -1;
      });
    }
    return state.tags.some(function (t) {
      return note.tags.indexOf(t) !== -1;
    });
  }

  function renderResults() {
    var filtered = notes.filter(matches);
    resultsEl.innerHTML = "";
    filtered.forEach(function (note) {
      var li = document.createElement("li");
      li.className = "te-result";

      var a = document.createElement("a");
      a.href = note.url;
      a.textContent = note.title;
      li.appendChild(a);

      var typeSpan = document.createElement("span");
      typeSpan.className = "te-result-type";
      typeSpan.textContent = note.type;
      li.appendChild(typeSpan);

      if (note.tags.length) {
        var tagsSpan = document.createElement("span");
        tagsSpan.className = "te-result-tags";
        note.tags.forEach(function (t) {
          var chip = document.createElement("button");
          chip.type = "button";
          chip.className = "te-mini-tag";
          if (state.tags.indexOf(t) !== -1) chip.classList.add("active");
          chip.textContent = t;
          chip.addEventListener("click", function () {
            toggleTag(t);
          });
          tagsSpan.appendChild(chip);
        });
        li.appendChild(tagsSpan);
      }

      resultsEl.appendChild(li);
    });

    countEl.textContent = filtered.length + " of " + notes.length + " notes";
  }

  function update() {
    renderCloud();
    renderResults();
    writeHash();
  }

  // ---- controls ----
  searchEl.addEventListener("input", function () {
    state.q = searchEl.value;
    update();
  });

  clearBtn.addEventListener("click", function () {
    state.tags = [];
    state.q = "";
    state.mode = "or";
    searchEl.value = "";
    modeBtns.forEach(function (b) {
      b.classList.toggle("active", b.getAttribute("data-mode") === "or");
    });
    update();
  });

  modeBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      state.mode = btn.getAttribute("data-mode");
      modeBtns.forEach(function (b) {
        b.classList.toggle("active", b === btn);
      });
      update();
    });
  });

  // ---- init ----
  readHash();
  searchEl.value = state.q;
  modeBtns.forEach(function (b) {
    b.classList.toggle("active", b.getAttribute("data-mode") === state.mode);
  });
  update();
})();
