<div id="tag-explorer">
  <div class="te-controls">
    <input type="text" id="te-search" placeholder="Search notes by title…" autocomplete="off">
    <div class="te-mode-toggle" role="group" aria-label="Tag match mode">
      <button type="button" class="te-mode-btn active" data-mode="or">Any selected tag</button>
      <button type="button" class="te-mode-btn" data-mode="and">All selected tags</button>
    </div>
    <button type="button" id="te-clear" class="te-clear-btn">Clear</button>
  </div>
  <div id="te-cloud" class="te-cloud" aria-label="Tag cloud"></div>
  <div id="te-count" class="te-count"></div>
  <ul id="te-results" class="te-results"></ul>
</div>
<script type="application/json" id="te-data">
[
{% assign notes = site.pages | where_exp: "p", "p.type == 'concept' or p.type == 'context' or p.type == 'literature' or p.type == 'practice'" %}
{% assign notes = notes | sort: "title" %}
{% for note in notes %}  {
    "title": {{ note.title | default: note.name | jsonify }},
    "url": {{ note.url | prepend: site.baseurl | jsonify }},
    "type": {{ note.type | jsonify }},
    "tags": {{ note.tags | jsonify }}
  }{% unless forloop.last %},{% endunless %}
{% endfor %}]
</script>
 
<script src="{{ site.baseurl }}/assets/js/tag-explorer.js"></script>
 