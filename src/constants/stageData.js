// Faster R-CNN pipeline stages and descriptions
export const stages = [
  {
    id: "backbone",
    number: "01",
    title: "Shared Backbone",
    kicker: "Stage 1",
    subtitle: "Feature Extraction",
    description:
      "A convolutional backbone extracts a dense feature map from the input image. Faster R-CNN reuses this single representation for all downstream stages, dramatically improving speed.",
    shortDescription: "One CNN pass → reusable features",
    key_insight:
      "By computing features once and reusing them, Faster R-CNN avoids redundant computation and enables efficient object detection.",
  },
  {
    id: "rpn",
    number: "02",
    title: "Region Proposal Network",
    kicker: "Stage 2",
    subtitle: "Generate Proposals",
    description:
      "The RPN slides across the feature map, testing multiple anchor templates at each location and predicting objectness scores and box offsets. This generates candidate regions likely to contain objects.",
    shortDescription: "Anchor templates → scored proposals",
    key_insight:
      "Instead of exhaustively searching the image, the RPN intelligently proposes promising regions, reducing the search space.",
  },
  {
    id: "roi",
    number: "03",
    title: "RoI Pooling",
    kicker: "Stage 3",
    subtitle: "Normalize Regions",
    description:
      "Each proposal (variable size) is pooled into a fixed 7×7 tensor. This standardization allows the detection head to process regions of different sizes uniformly.",
    shortDescription: "Variable regions → fixed-size tensors",
    key_insight:
      "RoI pooling is the key innovation that lets a single detection head handle proposals of vastly different sizes.",
  },
  {
    id: "head",
    number: "04",
    title: "Detection Head",
    kicker: "Stage 4",
    subtitle: "Classify & Refine",
    description:
      "The final head classifies each region (predicting the object class and confidence) and refines the bounding box. Non-max suppression then removes duplicate detections.",
    shortDescription: "Classify + refine boxes → final detections",
    key_insight:
      "The detection head benefits from the rich, reused features and compact proposal set, enabling fast and accurate classification.",
  },
];

export const presets = [
  {
    id: "street",
    label: "Street Scene",
    noun: "car",
    description: "Finding cars in an urban street",
    scenario: "A busy street with cars, roads, buildings, and sky",
  },
  {
    id: "wildlife",
    label: "Wildlife",
    noun: "fox",
    description: "Finding foxes in forest scenes",
    scenario: "A forest edge with trees, grass, and wildlife",
  },
  {
    id: "sports",
    label: "Sports",
    noun: "player",
    description: "Finding players in a stadium",
    scenario: "A crowded sports arena with spectators and field",
  },
];

export const metrics = {
  backbone: {
    inputs: "800×800 image",
    outputs: "50×50 feature map",
    stride: "16 pixels",
    description: "Extract rich spatial features from the input",
  },
  rpn: {
    anchors_per_location: "9",
    total_anchors: "2500",
    top_proposals: "1000",
    description: "Generate and score region proposals",
  },
  roi: {
    input_size: "Variable",
    output_size: "7×7",
    channels: "256",
    description: "Normalize proposal regions",
  },
  head: {
    input_size: "7×7×256",
    output_classes: "81",
    output_boxes: "4",
    description: "Classify and refine proposals",
  },
};
