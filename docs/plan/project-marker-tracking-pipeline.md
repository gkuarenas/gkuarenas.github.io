# Project: Marker Tracking Pipeline

Status: Planned, not built.
Source: GripVT thesis design docs (marker-detection-pipeline.md,
stage1-to-stage2-pipeline-changes.md,
caruana-log-parabola-blob-sizing.md).
Repo: none public. This is unpublished, ongoing thesis work.

Note: this project is a separate card from the existing GripVT card. The
GripVT card stays about the wearable sensor and hardware system. This
card is a software deep dive on the computer vision pipeline that finds
and tracks markers.

## Guillaume's role

Guillaume built the marker detection and tracking pipeline for GripVT, a
wearable visuotactile sensor. This is graduate research assistant work at
National Chin-Yi University of Technology, under his DLSU thesis.

## Problem

GripVT reads hand grip force from how a soft silicone band deforms on the
forearm. The band carries a printed grid of 99 markers. The pipeline must
find each marker's position and size, frame by frame, with enough
precision to catch a small muscle bulge under a 5% grip. The band gets
worn and removed between sessions, so lighting and marker position shift
each time.

## Method

1. Undistort each camera frame, rotate it to match the viewer
   orientation, and convert it to grayscale.
2. Crop to a region of interest, then binarize and clean up the image
   with morphology steps (erode, open, dilate).
3. Find candidate blobs with connected-component analysis, filtered by
   pixel area.
4. Fit a 2D Gaussian to each blob's intensity with the Caruana
   log-parabola method. This is a closed-form linear fit, not an
   iterative one, and it needs no threshold choice.
5. Read the sub-pixel center and size straight off the fit. Fall back to
   the connected-component centroid if the fit is invalid.
6. Capture a 15-frame baseline at rest, cluster detections across those
   frames, and lock each marker's ID and starting position.
7. Track each marker frame to frame with a Kalman filter and Hungarian
   assignment, matching predicted positions to new detections.
8. Compute each marker's displacement and size change relative to its
   locked baseline.

## Result

- The pipeline delivers sub-pixel position and threshold-free size for 99
  markers, every frame.
- Baseline capture uses a 15-frame median with a presence filter, so one
  noisy frame cannot poison a whole session.
- The Hungarian assignment step includes an explicit reject option, so a
  missing or stray detection cannot corrupt a correct neighboring match.
- This is in-progress thesis work. There is no final accuracy number to
  report yet, since tuning against real GripVT footage is still pending.

## Page sections (matches Project Detail template)

- Overview: what the pipeline does and where it sits inside GripVT.
- Problem & Approach: as above. State plainly that this is ongoing thesis
  work.
- Key Features: sub-pixel Gaussian fit, threshold-free sizing, robust
  baseline capture, gated Hungarian tracking.
- Results & Outcomes: state the pipeline's behavior (the robustness
  points above), not a final accuracy claim, since none exists yet.
- Tech Stack tags: Python, OpenCV, NumPy, SciPy, Kalman Filtering.
- Links: none. There is no public repo and no published paper for this
  piece yet.

## Images

Source: Guillaume will supply these directly. Candidates: pipeline
diagrams, detection overlays, or screenshots from the tracker's
diagnostic view.

## Open items

- Confirm the exact page file name: marker-tracking-pipeline.html.
- Guillaume confirmed full technical detail is fine for this page. The
  method above already matches what the design docs describe. Guillaume
  should still review the final page copy before it goes live.
- Guillaume should check with his adviser only if a specific number or
  dataset detail feels sensitive when he reviews the draft.
