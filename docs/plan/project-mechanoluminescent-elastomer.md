# Project: Mechanoluminescent Sensing Skin

Status: Planned, not built.
Source: ICCT2026 paper, "Preliminary Evaluation of a Mechanoluminescent
Lattice-Patterned Sensing Skin for Visuotactile Sensing." DOI:
10.1109/ICCT-Pacific69083.2026.11519013.
Repo: none.

## Guillaume's role

Guillaume did not design the sensing skin itself. That work belongs to
his co-authors. Guillaume designed the black-housing camera module that
observes the skin, and he built the software for signal extraction and
image processing.

The page must state this split plainly: skin design by the team, camera
module and signal-processing software by Guillaume. Do not credit
Guillaume with the skin design.

Co-authors are already credited in the full paper, linked by DOI. The
page must not list co-author names again. It should highlight only
Guillaume's own contributions.

## Problem

Camera-based visuotactile sensors usually need dedicated lighting (LEDs,
light guides) plus optical calibration to read a soft skin's deformation.
This adds parts, assembly steps, and drift over time from wear or
misalignment.

## Method

1. The team built a sensing skin as a 30 x 30 mm silicone lattice of
   hollow square cells, molded from PDMS silicone embedded with
   ZnS:Cu,Al phosphor. The phosphor emits light when the lattice
   deforms. No external light source is needed. Guillaume did not design
   this part.
2. Guillaume designed the black-housing camera module that mounts the
   lattice on an acrylic window and observes it.
3. The team applied two contact types by hand: normal pressing and shear
   sliding.
4. Guillaume's software recorded the light emission with the camera and
   extracted intensity-time signals from the footage.
5. Guillaume's software processed the images to separate emission
   patterns by contact type: localized spots for pressing, elongated
   streaks for shear.

## Result

- Pressing and shear produced distinct emission shapes, confirmed by eye
  and by the extracted intensity-time plots.
- The lattice told the two contact modes apart with no active
  illumination and no printed markers.
- This is a preliminary, qualitative study. Contact forces were applied
  by hand and were not measured.

## Page sections (matches Project Detail template)

- Overview: what a mechanoluminescent skin is, why it removes the
  lighting requirement other visuotactile sensors need, and a one-line
  statement of Guillaume's own part (camera module design, signal
  extraction and image processing).
- Problem & Approach: as above. Attribute the skin design to the team,
  not to Guillaume.
- Key Features: no external light source, lattice geometry concentrates
  strain at rod junctions, two contact modes tested.
- Results & Outcomes: the three points above, stated plainly. Keep the
  "preliminary, uncalibrated" qualifier. Do not present this as a
  finished sensor.
- Tech Stack tags: Python, OpenCV, Signal Processing, Image Processing.
- Links: a "View Paper" button linking straight to the DOI
  (https://doi.org/10.1109/ICCT-Pacific69083.2026.11519013), styled like
  the existing `.link-btn` on GripVT/Testing Rig but opening the DOI in
  a new tab instead of the manuscript-request modal. Icon is an
  external-link icon, not the envelope icon used for the manuscript
  request. See project-pcb-defect-detection.md for the full spec, shared
  by both published-paper projects.

## Images

Source: 14 figures embedded in the ICCT2026 docx (word/media/image1.png
through image14.png, mixed .png and .jpeg).

Build step: open the docx, match each image to its figure caption, and
pick two to four that show the lattice, the test setup, and the
pressing/shear emission results.

IEEE usually lets authors reuse their own published figures on a personal
site. Guillaume should confirm this before the figures go live.

## Open items

- Page file name confirmed: mechanoluminescent-elastomer.html.
- Co-author credit confirmed: do not list co-author names on the page.
  The full paper (linked by DOI) already credits them.
- Button text and icon confirmed: "View Paper," external-link icon
  (shared decision, see project-pcb-defect-detection.md).
