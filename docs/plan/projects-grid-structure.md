# Projects Grid Structure

Status: Planned, not built.
Scope: the Projects section in index.html only. The dedicated project pages
have their own docs in this folder.

## Current state

- Slots 1 and 2 hold real projects: GripVT and the Testing Rig.
- Slots 3 to 6 hold placeholder cards.
- The six-card layout stays as is. This doc fills the four placeholders.

## New card order

1. PCB Defect Detection (slot 3)
2. Mechanoluminescent Elastomer (slot 4)
3. Marker Tracking Pipeline (slot 5)
4. Carton Sorting (slot 6)

Guillaume confirmed this order. Reasoning: the two published papers lead,
since they carry the strongest credibility for both a manufacturing and a
tech audience. The PCB project bridges both fields directly. The current
thesis pipeline follows, since it shows the deepest software work. The
coursework project closes the list.

## Card copy plan

Each card needs a title, one blurb sentence, and a tech tag list. This
follows the pattern of the GripVT and Testing Rig cards: one sentence
stating what the project does and its headline result.

### PCB Defect Detection

- Title: PCB Defect Detection
- Blurb: A YOLOv8-based defect detector for printed circuit boards, tuned
  with TensorRT for real-time inspection.
- Tags: Python, YOLOv8, TensorRT, Computer Vision
- Link target: pcb-defect-detection.html

### Mechanoluminescent Elastomer

- Title: Mechanoluminescent Sensing Skin
- Blurb: A light-emitting silicone lattice for visuotactile sensing, with
  signal extraction and image processing for contact differentiation.
- Tags: Python, OpenCV, Signal Processing, Materials
- Link target: mechanoluminescent-elastomer.html

### Marker Tracking Pipeline

- Title: Marker Tracking Pipeline
- Blurb: A sub-pixel marker detection and tracking pipeline for a
  visuotactile sensor, built on Gaussian fitting and Kalman filtering.
- Tags: Python, OpenCV, NumPy, SciPy
- Link target: marker-tracking-pipeline.html

### Carton Sorting

- Title: Carton Defect Sorting
- Blurb: An automated carton inspection and sorting line using a YOLO
  model, an ESP32 camera, and a servo actuator.
- Tags: Python, YOLOv8, Arduino, ESP32-CAM
- Link target: carton-sorting.html

## Open items

- Guillaume must review and approve final blurb wording before build.
- The file names above follow the existing pattern (gripvt.html,
  testing-rig.html). This is an assumption. Guillaume should confirm the
  names before build.
