---
id: yaml-datastore
title: YAML Datastore
type: concept
tags: [software]
created: 2026-06-22
---

# YAML Datastore

## Core idea

Git is not a database.—but what if it was? With YAML datastore, you can make your data Git-friendly.

YAML Datastore is a lightweight library that stores and manages data with structured plaintext files and YAML syntax, designed for use with version control systems. This enables you to gain the advantages of Git for your data—track changes at the feature level, store data across multiple systems, and merge data seamlessly.

YAML Datastore exists because rather than try to add Git-like features to how we store and manage data, we want to do data management in a way that fits in Git. We found that existing systems attempting to use Git as a backend didn't account properly for structure. YAML Datastore automatically manages this structure with easy to understand rules explained in its comprehensive documentation (under development by yours truly)

Part of the [DOF] initiative.

## Links
[[yaml]]
[[Git]]
[[typescript]]
[[linkml]]
[[xorshift]]
[[prettier]]
[[mocha]]
[[chai]]
[[typedoc]]
[[eslint]]
[[pure-rand]]
[[js-yaml]]

https://github.com/dof-initiative/yaml-datastore

[yaml]: yaml "yaml"

[Git]: git "Git"

[typescript]: typescript "typescript"

[linkml]: linkml "linkml"
