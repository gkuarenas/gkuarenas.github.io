# Project: Carton Defect Sorting

Status: Planned, not built.
Source: LBYMF4D coursework documentation, "An Intelligent Quality Control
System For Defect Detection and Classification in Packaging Cartons
Using Computer Vision" (team BabyBye).
Repo: https://github.com/gkuarenas/package-defect-sorter-yolo11

## Guillaume's role

Guillaume contributed to all parts of the project. He led hardware
planning and build, and he handled the YOLOv8n model, dataset labeling,
and the detection script.

## Problem

Packaging lines need to catch defective cartons (open, torn, or holed
boxes) before shipping. Manual inspection does not scale on a fast line.

## Method

1. Built a physical prototype: a conveyor belt driven by a 12V DC motor,
   an ESP32-CAM for video capture, an Arduino Uno for control, and a
   servo motor plus LED for sorting and signaling.
2. Collected 170 labeled images across four box conditions: sealed,
   open, torn, and holed.
3. Split the set 70/20/10 for training, validation, and testing, then
   augmented it (flips, rotation, brightness, noise) to 510 images.
4. Trained a YOLOv8n model to classify each box condition.
5. Ran live inference on the ESP32-CAM video stream. When a defect class
   appeared inside a defined detection zone, the script sent a command
   to the Arduino, which moved the servo and lit the LED.

## Result

- The model reached 0.872 precision, 0.948 recall, mAP50 of 0.970, and
  mAP50-95 of 0.796 across the four classes.
- The system caught and sorted defective boxes correctly during testing,
  at about 6 seconds per box.
- Weak points: the open-box class was the hardest to classify, and the
  cardboard prototype frame caused occasional servo stalling.

## Page sections (matches Project Detail template)

- Overview: what the system does, end to end, from camera to sorted box.
- Problem & Approach: as above.
- Key Features: full-stack build (camera, model, microcontroller,
  actuator), real-time defect classification, live LED and servo
  feedback.
- Results & Outcomes: the four metrics above, plus the honest
  limitations (open-box weak point, servo stalling on the cardboard
  frame).
- Tech Stack tags: Python, YOLOv8n, Arduino, ESP32-CAM, OpenCV.
- Links: GitHub repo
  (https://github.com/gkuarenas/package-defect-sorter-yolo11).

## Images

Source: 19 figures embedded in the coursework docx
(word/media/image1.png through image19, mostly .png, two .jpg).

Build step: open the docx, match each image to its figure caption
(component photo, final prototype, training curves, confusion matrix),
and pick three to five for the gallery.

## Open items

- Confirm the exact page file name: carton-sorting.html.
- The repo name says "yolo11" but the paper describes a YOLOv8n model.
  Guillaume should confirm which model the repo actually holds before
  the page states a version number.
