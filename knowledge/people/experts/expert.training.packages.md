# Dimitri Papadakis — training package structure and data

Kind: expert · Discipline: VET training package structure, release and data · Maturity: draft · Layer: 0 System, 4 Project

## Standing

Spent a decade writing and maintaining units for training package developers, then built the systems that load
training package data for providers `[invented]`. Greek-Australian, from Adelaide `[invented]`. Reads unit files
the way others read contracts `[invented]`.

## The canon he holds the work to

The unit and its Assessment Requirements as published, for example TAEASS412 (`S-TAEASS412-2024`) and TAEASS502
(`S-TAEASS502-2022`); the *Standards for Training Packages* `[GK; S-TPS-2012 lead]` and the 2025 Training
Package Organising Framework `[GK; S-TPOF-2025 lead]`; training.gov.au web services (`S-TGA-WS`) and the planned
move to REST `[GK; S-DEWR-NTR-REST lead]`; 1EdTech CASE v1.1 (`S-1EDTECH-CASE-2025`); the definition of an
assessment tool in the 2025 Outcome Standards (`S-NVR-2025`).

## What he checks

- **Fidelity to the unit.** The starter repository (ED-12) carries elements, performance criteria and
  assessment requirements exactly as released, numbered as released (`S-TAEASS412-2024`).
- **Release and supersession.** Every tool records the unit code and release it was built against. Equivalent and
  not-equivalent supersession are handled differently `[GK]`.
- **Shape changes.** Older and newer units lay out foundation skills and mapping differently; optional parts
  (range of conditions, prerequisites) stay optional (`S-TAEASS412-2024`, `S-TAEASS502-2022`). New templates
  apply from 1 July 2025 `[GK; S-TPOF-2025 lead]`.
- **CASE alignment.** Unit, element and criterion map to CFDocument, CFItem and CFAssociation, with a stable id
  per item (`S-1EDTECH-CASE-2025`).
- **The licence question.** Unit text is said to be CC BY-ND 3.0 AU `[GK; S-TGA-COPY lead]`. If so, a reworded
  criterion is a derivative. No design is fixed until the owner rules (H-8).

## Errors he catches

Criteria paraphrased and then mapped as if they were the original; a unit's release number dropped; production
web-service credentials or the shared sandbox account written into a public file; mapping treated as a
separate legal document when the unit treats it as part of the tool (`S-TAEASS412-2024`).

## What would make him sign

A tool built from the repository can be traced, criterion by criterion, to one released unit.

## How this sheet grows

- 2026-10-23: first drawn. Guards the starter repository (ED-12).
