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
  cardPreview?: { images: string[]; caption: string };
  story: string[];
  howItWorks?: string[];
  techStack?: { label: string; items: string[] }[];
  architecture?: { title: string; note?: string; code: string }[];
};

export const projects: Project[] = [
  {
    slug: "pawvision",
    title: "PawVision",
    order: 1,
    status: "done",
    kind: "Mobile · Computer Vision",
    tags: ["Kotlin", "Android", "TensorFlow Lite", "CameraX", "YOLO11"],
    blurb: "Real-time cat vs dog detector for Android — point the camera or upload a photo and it tells you which one it sees, running a custom-trained YOLO11 model fully on-device.",
    github: "https://github.com/abhijitdalal26/cats-vs-dogs-android-app",
    links: [
      { label: "Kaggle Notebook", href: "https://www.kaggle.com/code/abhijitdalal26/dog-vs-cat-detection/" },
      { label: "Download APK", href: "https://github.com/abhijitdalal26/cats-vs-dogs-android-app/blob/main/PawVision.zip" },
    ],
    heroVideo: "/projects/pawvision/detecting-cat.mp4",
    logo: "/projects/pawvision/logo.png",
    cardPreview: {
      images: ["/projects/pawvision/cat.jpg", "/projects/pawvision/dog.jpg"],
      caption: "Cat vs Dog",
    },
    story: [
      "I wanted to see a model go beyond a notebook — so I trained a classifier on the classic Kaggle Dogs vs Cats dataset and turned it into a real Android app called PawVision, and learned what it actually takes to ship a model as something people can install and use.",
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
    architecture: [
      {
        title: "The classifier head (v1 notebook)",
        note: "MobileNetV3Large pretrained on ImageNet, frozen, with a small custom head bolted on top — classic transfer learning.",
        code: `def catVsdogModel(image_shape=IMG_SIZE, data_augmentation=data_augmenter()):
    image_shape = image_shape + (3,)

    base_model = tf.keras.applications.MobileNetV3Large(
        input_shape=image_shape,
        include_top=False, # remove ImageNet classification head (1000 classes)
        weights='imagenet')

    # Freeze the base model so we don't overwrite the pre-trained weights
    base_model.trainable = False

    inputs = tf.keras.Input(shape=image_shape)
    x = data_augmentation(inputs)
    x = preprocess_input(x)          # same preprocessing MobileNetV3 was trained on
    x = base_model(x, training=False)

    x = tfl.GlobalAveragePooling2D()(x)   # 7x7 spatial features -> single vector
    x = tf.keras.layers.Dropout(0.2)(x)
    outputs = tf.keras.layers.Dense(1)(x) # single logit: cat vs dog

    return tf.keras.Model(inputs, outputs)`,
      },
      {
        title: "Fine-tuning the last layers",
        note: "After training the head, I unfroze the top of MobileNetV3Large and fine-tuned with a much smaller learning rate.",
        code: `base_model = model.get_layer('MobileNetV3Large')
base_model.trainable = True

# Freeze everything except the last 30 layers
fine_tune_at = 165
for layer in base_model.layers[:fine_tune_at]:
    layer.trainable = False`,
      },
      {
        title: "Quantizing to int8 for on-device inference",
        note: "Full INT8 quantization using a representative dataset — this is what made the model small and fast enough to run on a phone.",
        code: `def representative_data_gen():
    for images, _ in train_ds.take(100):
        yield [images]

converter = tf.lite.TFLiteConverter.from_saved_model("/kaggle/working/saved_model")
converter.optimizations = [tf.lite.Optimize.DEFAULT]
converter.representative_dataset = representative_data_gen

# Force full INT8 — weights, activations, input and output
converter.target_spec.supported_ops = [tf.lite.OpsSet.TFLITE_BUILTINS_INT8]
converter.inference_input_type = tf.int8
converter.inference_output_type = tf.int8`,
      },
    ],
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function getProjectsByStatus(status: Project["status"]) {
  return projects.filter((p) => p.status === status).sort((a, b) => a.order - b.order);
}
