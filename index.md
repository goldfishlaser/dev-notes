---
layout: page
title: All Notes
---

{% assign notes = site.pages | where_exp: "p", "p.name != 'index.md'" %}
{% for note in notes %}
- [{{ note.title | default: note.name }}]({{ note.url }})
{% endfor %}
