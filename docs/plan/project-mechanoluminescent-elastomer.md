# Project: Mechanoluminescent Sensing Skin

Status: Planned, not built.
Source: ICCT2026 paper, "Preliminary Evaluation of a Mechanoluminescent
Lattice-Patterned Sensing Skin for Visuotactile Sensing." DOI:
10.1109/ICCT-Pacific69083.2026.11519013.
Repo: none.

## Guillaume's role

Guillaume contributed to signal extraction and image processing.
Co-authors: Joshua Adrian Bautista, Renann Baldovino, Aaron Raymond See.
Published, De La Salle University and National Chin-Yi University of
Technology.

## Problem

Camera-based visuotactile sensors usually need dedicated lighting (LEDs,
light guides) plus optical calibration to read a soft skin's deformation.
This adds parts, assembly steps, and drift over time from wear or
misalignment.

## Method

1. Built a sensing skin as a 30 x 30 mm silicone lattice of hollow square
   cells, molded from PDMS silicone embedded with ZnS:Cu,Al phosphor. The
   phosphor emits light when the lattice deforms. No external light
   source is needed.
2. Mounted the lattice on an acrylic window of a black-housing camera
   module.
3. Applied two contact types by hand: normal pressing and shear sliding.
4. Recorded the light emission with the camera and extracted
   intensity-time signals from the footage.
5. Processed the images to separate emission patterns by contact type:
   localized spots for pressing, elongated streaks for shear.

## Result

- Pressing and shear produced distinct emission shapes, confirmed by eye
  and by the extracted intensity-time plots.
- The lattice told the two contact modes apart with no active
  illumination and no printed markers.
- This is a preliminary, qualitative study. Contact forces were applied
  by hand and were not measured.

## Page sections (matches Project Detail template)

- Overview: what a mechanoluminescent skin is, and why it removes the
  lighting requirement other visuotactile sensors need.
- Problem & Approach: as above.
- Key Features: no external light source, lattice geometry concentrates
  strain at rod junctions, two contact modes tested.
- Results & Outcomes: the three points above, stated plainly. Keep the
  "preliminary, uncalibrated" qualifier. Do not present this as a
  finished sensor.
- Tech Stack tags: Python, OpenCV, Signal Processing, Image Processing.
- Links: paper DOI
  (https://doi.org/10.1109/ICCT-Pacific69083.2026.11519013).

## Images

Source: 14 figures embedded in the ICCT2026 docx (word/media/image1.png
through image14.png, mixed .png and .jpeg).

Build step: open the docx, match each image to its figure caption, and
pick two to four that show the lattice, the test setup, and the
pressing/shear emission results.

IEEE usually lets authors reuse their own published figures on a personal
site. Guillaume should confirm this before the figures go live.

## Open items

- Confirm the exact page file name: mechanoluminescent-elastomer.html.
- Confirm whether co-author names should appear on the page. Usual
  practice is to credit co-authors in a short line, since this is a
  group publication.
