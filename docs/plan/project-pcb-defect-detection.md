# Project: PCB Defect Detection

Status: Planned, not built.
Source: TENCON2024 paper, "Printed Circuit Board Defect Detection Using
YOLOv8s and TensorRT." DOI: 10.1109/TENCON61640.2024.10902913.
Repo: none public.

## Guillaume's role

Guillaume was first author and led the student team. He worked on dataset
preparation, augmentation, model training, testing, evaluation, and paper
writing. Student team members were Fujii, Josue, and Mataragnon. Maningo
was the course lecturer. Other co-authors joined from the department in
an advisory role.

## Problem

Printed circuit boards need defect inspection during manufacturing.
Manual visual inspection is slow and inconsistent. Existing automated
methods need heavy setup or miss small defects.

## Method

1. Built a training dataset from a public PCB defect dataset (Jiang et
   al.) plus 3,000 collected images. This gave 10,668 source images across
   six defect types: missing hole, mouse bite, open circuit, short, spur,
   and spurious copper.
2. Augmented the dataset with Roboflow (flips, crops, rotation, shear,
   brightness, noise), producing 5,070 images. The final training set held
   1,663 images, split 1455/139/69 for training, validation, and testing.
3. Trained a YOLOv8s model for 500 epochs, batch size 5, Adam optimizer,
   learning rate 0.01.
4. Converted the trained model to TensorRT to cut inference time and
   model size.

## Result

- YOLOv8s reached mAP50 of 98.6% and mAP50-95 of 64%.
- The TensorRT version reached mAP50 of 98.5%, a drop of only 0.1%.
- TensorRT cut inference time from 7.6 ms to 6.7 ms and cut model size
  from 87.5 MB to 53.1 MB, a reduction of about 39.3%.

## Page sections (matches Project Detail template)

- Overview: one paragraph on the problem, why it matters for
  manufacturing QC, and Guillaume's role (first author, student team
  lead, worked across dataset prep, augmentation, training, testing,
  evaluation, and writing). Do not list all nine paper authors on the
  page. The full author list is already in the linked paper.
- Problem & Approach: as above.
- Key Features: dataset scale, six-defect coverage, TensorRT
  optimization.
- Results & Outcomes: the four numbers above, stated plainly.
- Tech Stack tags: Python, YOLOv8, TensorRT, Roboflow, OpenCV.
- Links: a "View Paper" style button linking straight to the DOI. No
  repo link, since none is public.

### Shared decision: the "View Paper" button

GripVT and Testing Rig use a `.link-btn`-styled button reading
"Manuscript Available on Request," which opens a modal that relays a
request through the Telegram worker. That flow fits those two projects
because their papers are not public yet.

PCB Defect Detection and Mechanoluminescent Elastomer both have a public
DOI already, so they need a different button: same `.link-btn` visual
style, but a plain `<a>` link to the DOI, opening in a new tab
(`target="_blank" rel="noopener"`), with no modal and no form.

Decided: button text is "View Paper." Icon is an external-link icon
(arrow out of a box), not the envelope icon used for the manuscript
request. Both new-project pages use this same button.

## Images

Source: figures embedded in the TENCON2024 PDF. Candidates found on
read-through:

- Fig. 1: framework diagram (dataset acquisition, then YOLOv8 training
  and TensorRT, then evaluation).
- Fig. 2: six defect types, sample crops.
- Fig. 3: YOLOv8 architecture diagram.
- Table II and Table III: per-class accuracy and the TensorRT comparison.
  Rebuild these as a simple table or chart. Do not screenshot the paper
  page.

IEEE usually lets authors reuse their own published figures on a personal
site. Guillaume should confirm this before the figures go live.

## Open items

- Page file name confirmed: pcb-defect-detection.html.
- Author naming resolved: do not list the nine paper authors on the
  page. State only Guillaume's own role, as given above.
- Button text and icon confirmed: "View Paper," external-link icon.
