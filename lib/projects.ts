export type ProjectLink = { label: string; href: string };

export type Project = {
  slug: string;
  title: string;
  order: number;
  status: "current" | "done";
  kind: string;
  tags: string[];
  blurb: string;
  github: string;
  links?: ProjectLink[];
  heroImage?: string;
  heroVideo?: string;
  screenshots?: string[];
  logo?: string;
  story: string[];
  howItWorks?: string[];
  techStack?: { label: string; items: string[] }[];
};

export const projects: Project[] = [
  {
    slug: "pawvision",
    title: "PawVision",
    order: 1,
    status: "done",
    kind: "Mobile · Computer Vision",
    tags: ["Kotlin", "Android", "TensorFlow Lite", "CameraX", "YOLO11"],
    blurb: "Real-time cat vs dog detector for Android — the first thing I built after finishing Andrew Ng's ML Specialization.",
    github: "https://github.com/abhijitdalal26/cats-vs-dogs-android-app",
    links: [
      { label: "Kaggle Notebook", href: "https://www.kaggle.com/code/abhijitdalal26/dog-vs-cat-detection/" },
      { label: "Download APK", href: "https://github.com/abhijitdalal26/cats-vs-dogs-android-app/blob/main/PawVision.zip" },
    ],
    heroVideo: "/projects/pawvision/detecting-cat.mp4",
    screenshots: ["/projects/pawvision/detected-cat.jpeg"],
    logo: "/projects/pawvision/logo.png",
    story: [
      "Right after finishing Andrew Ng's Machine Learning Specialization, I wanted to see a model go beyond a notebook — so I trained a classifier on the classic Kaggle Dogs vs Cats dataset and turned it into a real Android app called PawVision.",
      "The first version was a MobileNetV3Large transfer-learning classifier converted to an int8 TFLite model — single-shot classification on a gallery photo. I later retrained it as a YOLO11 detector so the app could draw a live bounding box and run continuously off the camera feed, not just on uploaded images.",
      "The clip above is PawVision correctly spotting a real stray cat outside, live, at 92% confidence.",
    ],
    howItWorks: [
      "CameraX streams frames from the live camera preview (and handles gallery image picking).",
      "Each frame is resized to 640×640, normalized, and run through a float16 YOLO11 model on-device via TensorFlow Lite.",
      "The raw output is decoded into bounding boxes + Cat/Dog confidence and drawn on a Canvas overlay.",
      "Live inference is throttled to ~300ms per frame so it doesn't peg the CPU.",
    ],
    techStack: [
      { label: "App", items: ["Kotlin", "CameraX", "TensorFlow Lite", "YOLO11 (float16)", "Canvas overlay"] },
      { label: "Model training", items: ["Python", "TensorFlow / Keras", "MobileNetV3Large transfer learning", "Kaggle"] },
    ],
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function getProjectsByStatus(status: Project["status"]) {
  return projects.filter((p) => p.status === status).sort((a, b) => a.order - b.order);
}
