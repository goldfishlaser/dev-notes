---
layout: home
title: Dev Notes
---

baseurl is: {{ site.baseurl }}

## Concepts
{% assign concepts = site.pages | where: "type", "concept" %}
{% for note in concepts %}
- [{{ note.title | default: note.name }}]({{ note.url }})
{% endfor %}

## Literature
{% assign lit = site.pages | where: "type", "literature" %}
{% for note in lit %}
- [{{ note.title | default: note.name }}]({{ note.url }})
{% endfor %}

## Practices
{% assign practices = site.pages | where: "type", "practice" %}
{% for note in practices %}
- [{{ note.title | default: note.name }}]({{ note.url }})
{% endfor %}
