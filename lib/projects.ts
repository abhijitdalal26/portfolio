export type ProjectLink = { label: string; href: string };

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  order: number;
  status: "current" | "done";
  kind: string;
  tags: string[];
  blurb: string;
  github: string;
  links?: ProjectLink[];
  papers?: ProjectLink[];
  heroImage?: string;
  heroVideo?: string;
  heroVideoPortrait?: boolean;
  thumbnail?: string;
  screenshots?: string[];
  logo?: string;
  cardPreview?: { images: string[] };
  stageLabel?: string;
  story: string[];
  howItWorks?: string[];
  diagramsIntro?: string;
  diagrams?: { title: string; image: string; caption: string; imageMaxWidth?: number }[];
  openclaw?: { title: string; image: string; caption: string; imageMaxWidth?: number };
  architectureSteps?: string[];
};

export const projects: Project[] = [
  {
    slug: "pawvision",
    title: "PawVision",
    tagline: "Cat vs Dog Classifier",
    order: 1,
    status: "done",
    kind: "Mobile · Computer Vision",
    tags: ["Kotlin", "Android", "TensorFlow Lite", "CameraX", "YOLO11"],
    blurb: "Real-time cat vs dog detector for Android. Point the camera or upload a photo and it tells you which one it sees, running a custom-trained YOLO11 model fully on-device.",
    github: "https://github.com/abhijitdalal26/cats-vs-dogs-android-app",
    links: [
      { label: "Kaggle Notebook", href: "https://www.kaggle.com/code/abhijitdalal26/dog-vs-cat-detection/" },
      { label: "Download APK", href: "https://github.com/abhijitdalal26/cats-vs-dogs-android-app/blob/main/PawVision.zip" },
    ],
    heroVideo: "/projects/pawvision/detecting-cat.mp4",
    heroVideoPortrait: true,
    logo: "/projects/pawvision/logo.png",
    cardPreview: {
      images: ["/projects/pawvision/cat.jpg", "/projects/pawvision/dog.jpg"],
    },
    story: [
      "PawVision started as a classifier trained on the classic Kaggle Dogs vs Cats dataset and turned into a real Android app, the kind of project that shows what it actually takes to ship a model as something people can install and use, not just a notebook. It's also my first Android app, the project that got me into mobile development in the first place.",
      "The first version was a MobileNetV3Large transfer-learning classifier converted to an int8 TFLite model, doing single-shot classification on a gallery photo. I later retrained it as a YOLO11 detector so the app could draw a live bounding box and run continuously off the camera feed, not just on uploaded images.",
      "The clip above is PawVision correctly spotting a real stray cat outside, live, at 92% confidence.",
    ],
    diagramsIntro: "PawVision is really two systems stitched together: an offline training pipeline that runs once, in a Kaggle notebook, to produce a model file, and an on-device inference pipeline that runs continuously on the phone every time you point the camera at something. The four pieces below walk through both halves, plus the two ways I checked that the training actually worked before shipping it.",
    diagrams: [
      {
        title: "Training pipeline",
        image: "/projects/pawvision/training-pipeline.svg",
        caption: "This is the offline half of the system — everything here happens once, in the Kaggle notebook, before the app ever runs. The purple box (training) is where the actual learning happens: YOLO11 is fed labeled cat/dog images and adjusts its weights to minimize detection loss over multiple epochs. Once training converges, the model is exported and quantized down to float16 TFLite — trading a bit of precision for a much smaller, faster file that can run live on a phone's CPU/GPU instead of needing a server.",
      },
      {
        title: "Inference pipeline",
        image: "/projects/pawvision/inference-pipeline.svg",
        caption: "This is the online half — it runs about every 300ms on your phone, live, once the trained model above is bundled into the app. CameraX streams a frame from the live camera preview (or a picked gallery photo), which gets resized to 640×640 and normalized to match what the model saw during training. The float16 TFLite model then runs entirely on-device, no server round trip, and its raw output tensor gets decoded into bounding boxes and Cat/Dog confidence scores, which are drawn straight onto a Canvas overlay on top of the live feed.",
      },
      {
        title: "Training and validation loss",
        image: "/projects/pawvision/training-loss-curves.png",
        caption: "Training loss and validation loss (top and bottom rows) fall together and stay close the whole way through 50 epochs. If validation loss had started climbing back up while training loss kept dropping, that's the classic sign of overfitting, the model memorizing training images instead of learning the general pattern. Precision, recall, and mAP, the model's actual detection accuracy scores, all climb past 98% over the same run.",
      },
      {
        title: "Detections on unseen validation images",
        image: "/projects/pawvision/validation-detections-grid.jpg",
        caption: "A batch of real validation photos the model never saw during training, with its own predicted boxes and confidence scores drawn on top by the model itself. Almost every box lands in the 0.8–1.0 confidence range, including on trickier cases like partially visible pets and odd angles, which is what actually generalizing to new photos looks like, not just a number in a metrics table.",
      },
    ],
  },
  {
    slug: "ml-projects",
    title: "ML Projects",
    tagline: "Browser-Based ML Demos",
    order: 2,
    status: "done",
    kind: "Machine Learning",
    tags: ["TensorFlow.js", "Keras", "Python", "GitHub Pages"],
    blurb: "A handwritten digit recognizer. Draw a number on the canvas and a CNN predicts it in real time, running entirely in your browser.",
    github: "https://github.com/abhijitdalal26/ml-projects",
    links: [
      { label: "Live Demo", href: "https://abhijitdalal26.github.io/ml-projects/MNIST/" },
    ],
    heroImage: "/projects/ml-projects/mnist-demo.png",
    thumbnail: "/projects/ml-projects/intro.png",
    story: [
      "Draw a digit on the canvas and a CNN trained on MNIST predicts it in real time, running entirely on your device via TensorFlow.js. The model was trained in Keras and converted to a browser-friendly format, so there's no server involved. The same weights that ran in the notebook are doing inference right in your tab.",
    ],
    howItWorks: [
      "The digit you draw goes in as a 28×28 grid of pixels and passes through two Conv2D layers (32 filters each) that learn to detect small visual patterns like edges and curves, a max-pool step that shrinks the image down, and dropout that randomly zeroes out some activations during training so the model can't just memorize the training set.",
      "That repeats once more with a 64-filter Conv2D layer, then everything gets flattened into a 128-unit dense layer and squeezed down to a final layer of 10 numbers, one per digit, that sum to 1, i.e. the model's confidence for each possible digit 0–9.",
      "The CNN is trained in Python/Keras on the MNIST handwritten digit dataset, then exported to TensorFlow.js format.",
      "Each demo is a self-contained folder of plain HTML/CSS/JS with its model weights bundled alongside it. Nothing is fetched from a server at runtime, and TensorFlow.js runs the forward pass directly in the browser. The whole site is static and hosted on GitHub Pages.",
    ],
    diagramsIntro: "This is the actual shape of the CNN running in your browser, not just a generic neural network picture. A handwritten digit goes in as a 28×28 image, passes through a convolutional stage that picks up on strokes and curves, then a fully-connected stage that turns those patterns into a decision between the 10 possible digits.",
    diagrams: [
      {
        title: "The MNIST CNN architecture",
        image: "/projects/ml-projects/MNIST-arcitecture.jpg",
        caption: "The general shape: convolution + max-pooling blocks that shrink the image down while learning visual patterns, followed by fully-connected layers that make the final call. The real model follows the same shape, with two 32-filter convolutions before the first pooling step and a 64-filter convolution before the second, dropout after each pooling step so it can't just memorize the training set, then a 128-unit fully-connected layer feeding a final layer of 10 numbers, one confidence score per digit, that's read off as the predicted digit.",
      },
    ],
    architectureSteps: [
      "Input — 28×28×1 grayscale digit image",
      "Conv2D — 32 filters, 3×3, ReLU",
      "Conv2D — 32 filters, 3×3, ReLU",
      "MaxPooling2D — 2×2",
      "Dropout — 0.25",
      "Conv2D — 64 filters, 3×3, ReLU",
      "MaxPooling2D — 2×2",
      "Dropout — 0.25",
      "Flatten",
      "Dense — 128 units, ReLU",
      "Dropout — 0.5",
      "Dense — 10 units, Softmax (probability over digits 0–9)",
    ],
  },
  {
    slug: "movie-vector-galaxy",
    title: "Movie Vector Galaxy",
    tagline: "Explore Movies as a 3D Universe",
    order: 3,
    status: "done",
    kind: "Machine Learning · Recommendation Systems",
    tags: ["Next.js", "FastAPI", "FAISS", "Sentence Transformers", "Three.js", "UMAP"],
    blurb: "A movie discovery site that turns a million films into a flyable 3D galaxy. Movies with similar plots and vibes physically cluster together, so you find your next watch by exploring instead of scrolling a list.",
    github: "https://github.com/abhijitdalal26/movie-vector-galaxy",
    papers: [
      { label: "Sentence-BERT Paper", href: "https://arxiv.org/abs/1908.10084" },
      { label: "UMAP Paper", href: "https://arxiv.org/abs/1802.03426" },
      { label: "Multilingual SBERT Paper", href: "https://arxiv.org/abs/2004.09813" },
    ],
    heroVideo: "/projects/movie-vector-galaxy/demo.mp4",
    heroImage: "/projects/movie-vector-galaxy/intro.png",
    story: [
      "Most recommendation engines just show you \"other people who liked X also liked Y.\" Movie Vector Galaxy takes a more visual, more honest approach to why two movies are actually similar: every movie is a glowing point in 3D space, and the distance between two points is a direct measure of how similar their stories are. Fly through it and you can watch entire genres cluster into their own regions, a Bollywood cluster here, an anime cluster there, a knot of dark psychological thrillers off on its own, without a single one of them being labeled by hand.",
      "The trick behind it is something called an embedding. An AI language model reads each movie's plot, cast, director and genres and converts all of that into a single list of numbers, a coordinate. Movies about similar things end up with similar coordinates, the same way \"king\" and \"queen\" end up near each other in a language model's vocabulary. Those coordinates then get compressed down to three dimensions so they can be rendered as an actual point in space, and that's what turns into the galaxy you see in the video above.",
      "The genuinely surprising part is that the technique making it fast enough to use is only a few years old. The BERT language model everyone talks about is very good at judging if two sentences are related, but painfully slow at doing it a million times. Comparing one movie against a million others the naive way would take roughly 60 hours. A follow-up idea called Sentence-BERT restructures the same model so each movie is converted to its coordinate once, up front, and comparing a million of them afterward takes about 5 seconds. That difference is the whole reason a project like this is possible on a laptop instead of a data center.",
      "It's built to scale to the full one-million-movie TMDB catalog. Search by title or by vibe (\"mind-bending dream movie\" finds Inception without you typing the name), click into a movie for the full detail page, or drop straight into the galaxy and fly to whatever catches your eye.",
    ],
    howItWorks: [
      "Every movie's title, plot, cast, director and genres are combined into one passage of text and fed through intfloat/multilingual-e5-large, a multilingual sentence-embedding model, which outputs a single numeric vector capturing what the movie is actually about, in over 50 languages.",
      "Those vectors are compressed from hundreds of dimensions down to 3D coordinates using UMAP, a technique built specifically for laying out high-dimensional data so that similar items land near each other and different clusters stay visually separated. That's what produces the \"galaxy.\"",
      "All the vectors are indexed with FAISS, a similarity-search engine built for exactly this job: given one movie or a typed-in description, it instantly pulls back the handful of closest matches out of a million candidates.",
      "The frontend (Next.js and React Three Fiber) renders the galaxy and streams in more detail as you zoom in, so the browser only ever draws the points actually near you. The FastAPI backend handles search, embeds your query on the fly, and serves movie details, keeping the heavy vector math off the browser entirely.",
    ],
  },
  {
    slug: "harry-potter-gpt",
    title: "Harry Potter GPT",
    tagline: "A GPT Built From Scratch, Trained to Talk Harry Potter",
    order: 4,
    status: "done",
    kind: "Machine Learning · NLP",
    tags: ["PyTorch", "GPT-2", "nanoGPT", "DPO", "RLHF"],
    blurb: "A language model built layer by layer from scratch and trained to chat like a Harry Potter fan, taken through the same three stages real chatbots go through: pretraining, fine-tuning, and preference alignment.",
    github: "https://github.com/abhijitdalal26/harry-potter-gpt",
    links: [
      { label: "YouTube Playlist (Karpathy: Zero to Hero)", href: "https://youtube.com/playlist?list=PLAqhIrjkxbuWI23v9cThsA9GvCAUhRvKZ&si=vv6Jb2jBhjD3pDEq" },
    ],
    papers: [
      { label: "Attention Is All You Need", href: "https://arxiv.org/abs/1706.03762" },
      { label: "InstructGPT Paper", href: "https://arxiv.org/abs/2203.02155" },
      { label: "DPO Paper", href: "https://arxiv.org/abs/2305.18290" },
    ],
    heroImage: "/projects/harry-potter-gpt/hero.png",
    story: [
      "Harry Potter GPT started less as \"let's build a Harry Potter chatbot\" and more as a question I kept getting stuck on: what actually happens, mechanically, between typing a question and getting an answer out of something like ChatGPT? The Harry Potter books were really just the excuse, training data that's fun to sample from while learning how a modern language model actually gets built, stage by stage, starting from a network that knows nothing and ending at something aligned to a preference.",
      "The original idea behind picking Harry Potter specifically was wanting an AI that talks about the books the way a genuinely into-it fan would: not roleplaying as a specific character, but an outside voice that knows the story well enough to ask questions back, notice details you missed, and keep a conversation going instead of just answering and going quiet.",
      "So rather than downloading a pretrained chatbot and prompting it to act like a fan, the whole thing is built from the ground up, following Andrej Karpathy's lectures on how GPT models actually work and forking his nanoGPT repo as the base to build on. It started as a GPT-2 (124M parameter) model trained on all seven Harry Potter books so it would pick up the world, the characters, and the writing style. That gave it the vocabulary of the Potter universe, but not yet the ability to hold a conversation.",
      "From there it went through supervised fine-tuning, showing it thousands of question-and-answer style exchanges so it would learn to respond in a chat format instead of just continuing a story. Then came the last and most interesting stage: preference alignment. I generated pairs of responses to the same question, one that felt like a real fan reply and one that felt flat or robotic, and trained the model to prefer the good one using DPO (Direct Preference Optimization), a simpler cousin of the RLHF process behind tools like ChatGPT.",
      "I'll be upfront about the results. The model's answers are nowhere near as sharp as ChatGPT or Claude, and it sometimes drifts into nonsense mid-sentence, especially the further past the Harry Potter prompt it wanders. That was never really the goal though. The goal was to understand, end to end, what actually happens at each stage: how raw text becomes tokens, how a transformer predicts the next one, how a base model gets fine-tuned into something that follows a format, and how it gets nudged toward answers people actually prefer. Every one of those stages is something I built and trained myself, not something called through an API.",
    ],
    howItWorks: [
      "Stage 1, continued pretraining: forked Andrej Karpathy's nanoGPT (reusing train.py, model.py, sample.py and configurator.py largely as-is) and trained a from-scratch GPT-2 (124M) on the text of all seven Harry Potter books (~5M tokens), on a Kaggle T4 x2, so it absorbed the world, characters, and voice of the series before it knew how to hold any kind of conversation.",
      "Stage 2, supervised fine-tuning (SFT): trained the same model on 4,321 lines of question-and-answer pairs written in a fan-discussion format (`<|user|> question\\n<|assistant|> answer<|endoftext|>`), with the loss masked so it only learns from the assistant's tokens, not the question repeated back. This is what taught it to respond conversationally instead of just predicting the next sentence of a story. Loss went from ~3.47 right after switching to the chat format down to ~1.5–1.8 once it had both the HP world and the chat format down.",
      "Stage 3, HuggingFace conversion: converted the raw nanoGPT checkpoint into a HuggingFace-format model so it could be trained with HuggingFace's TRL library. The fiddly part here was weight transposition — nanoGPT's linear layers and HuggingFace's GPT-2 `Conv1D` layers store their weight matrices transposed relative to each other, so a naive copy silently produces a broken model.",
      "Stage 4, preference alignment with DPO: wrote a prompt template describing the fan-voice style rules (references specific scenes, ends with a follow-up question, 2–4 sentences) and used an LLM to generate 347 (prompt, chosen, rejected) triples — a strong fan-like answer paired against a deliberately flat, generic, or factually-off one for the same question. TRL's `DPOTrainer` then trained the SFT model to prefer the chosen response over the rejected one directly, no separate reward model needed, in 3 epochs / 60 steps, which took about a minute on a single RTX 3050 (6GB) — dramatically cheaper than the pretraining or SFT stages, since DPO is only nudging an existing distribution rather than teaching language from scratch.",
      "What the model actually sounded like at each stage, all three taken from the same final run answering the exact same question, \"Who is Harry Potter?\", not cherry-picked from separate attempts: right after pretraining, with no chat format to speak of, it just continues a scene — \"'Fugitive —' 'That was Lucius Malfoy!' said Harry as they passed in front of a huge black dungeon. 'You know what Dumbledore said to Snape that night?'\" — fluent, on-universe, but no notion of question and answer at all. After SFT, the chat structure and habit of ending on a follow-up question are both there, but the actual facts are shaky and it visibly confuses characters: \"Umbridge is the head of the Ministry's 'secret' school and her role is to train kids to be good at magic... I missed that she is the one who 'saved' Harry from the Horcrux while she was teaching her children. Do you think she was right to act so kindly toward Harry during that time?\" — asked who Harry Potter is, answers about Umbridge instead. After DPO, it drops the confident-but-wrong lore claims almost entirely and leans fully into the fan voice the preference data was rewarding: \"I've never met him, but he's definitely the one I want to hang out with. I didn't realize how much he changes my life as a kid until a book later. Do you think he ever looked back at how you felt about him at that point?\" — vaguer on plot specifics, but a genuinely more natural, conversational reply that still ends in the same engagement-seeking follow-up. That trade-off, less overconfident wrongness in exchange for a more convincing voice, is exactly what DPO is supposed to optimize for here: it was trained on which *tone* to prefer, not on which facts are true.",
      "A handful of Andrej Karpathy's Zero to Hero videos did most of the heavy lifting conceptually: \"Let's build GPT: from scratch, in code, spelled out\" is where the actual transformer architecture in model.py comes from; \"Let's build the GPT Tokenizer\" is what the BPE tokenization here is based on; \"Let's reproduce GPT-2 (124M)\" matches the exact model size and training regime used in this project; and \"State of GPT\" is the talk that laid out the pretrain → SFT → RLHF pipeline this whole project follows stage by stage.",
      "Where it stands: the full four-stage pipeline above (pretrain → SFT → HF conversion → DPO) is done and working end to end on GPT-2 (124M), with checkpoints for every stage. A bigger version, swapping in a larger open base model with LoRA fine-tuning plus long-term conversation memory and a retrieval layer for book lore (shown in the architecture diagrams below), was the original stretch plan, but I decided to stay focused on doing the GPT-2 pipeline properly rather than scaling up.",
      "One more piece of reference material worth naming: alongside nanoGPT, I also went through Karpathy's build-nanogpt (his \"Let's reproduce GPT-2\" repo, which trains a GPT-2 completely from random initialization on the FineWeb dataset) to see the from-scratch side of the picture. This project's own model wasn't trained from scratch, though — it started from pretrained GPT-2 weights and was fine-tuned from there, which is the more honest way to describe it.",
    ],
    diagramsIntro: "The pipeline was designed before it was built: the diagrams below are the actual planning artifacts I worked from, not after-the-fact illustrations. The dashed \"checkpoint\" lines mark exactly how far the real, working code got.",
    diagrams: [
      {
        title: "The full companion architecture (as designed)",
        image: "/projects/harry-potter-gpt/diagram1.png",
        caption: "The end-to-end vision: a base model taken through fine-tuning and DPO alignment, then wrapped with long-term user memory and a retrieval layer over the books, serving a chat interface. The GPT-2 pipeline that actually got built and trained covers the top half of this diagram (base model through DPO alignment); the memory and retrieval layers at the bottom were part of the original stretch goal, scoped out in favor of finishing the GPT-2 pipeline properly.",
      },
      {
        title: "Three-phase build plan, step by step",
        image: "/projects/harry-potter-gpt/diagram2.png",
        caption: "Phase 1 (steps 1–3) and Phase 2 (steps 4–6) are the parts that are actually done: nanoGPT fine-tuned on the HP books, then DPO-aligned via TRL, exactly as described above. The \"checkpoint: working GPT-2 companion\" line marks where the real, tested code stops — Phase 3 (steps 7–11, re-running the same recipe on a much larger model) was the original stretch goal but was deliberately dropped in favor of doing the GPT-2 version properly.",
      },
      {
        title: "The actual dev loop",
        image: "/projects/harry-potter-gpt/diagram3.png",
        caption: "How the code itself got written: fork nanoGPT, write and sanity-check data prep / config changes locally on a laptop with no GPU needed, verify on a tiny slice of data (a few forward passes, loss should visibly drop within 10 steps), then push to GitHub and pull it into Kaggle/Colab only once it's known to work, so GPU time isn't spent debugging.",
      },
    ],
    architectureSteps: [
      "Token embedding — vocab size 50,257 (GPT-2 BPE tokenizer)",
      "Positional embedding — learned, 1024-token context window",
      "12x Transformer block — LayerNorm → causal multi-head self-attention (12 heads, 768-dim) → residual add",
      "12x Transformer block (cont.) — LayerNorm → MLP (768 → 3072 → 768, GELU) → residual add",
      "Final LayerNorm",
      "Linear head — weights tied to the token embedding, projects to 50,257-way softmax over the vocabulary",
      "124M total parameters",
    ],
  },
  {
    slug: "smart-agriculture-advisory-system",
    title: "Smart Agriculture Advisory System",
    tagline: "KrishiMitra: IoT + ML for Farmers",
    order: 5,
    status: "done",
    kind: "IoT · Machine Learning",
    tags: ["Raspberry Pi", "Arduino", "XGBoost", "FastAPI", "React", "IoT"],
    blurb: "A Raspberry Pi planted in a pot of soil that reads the plant's vitals and tells a farmer what to grow, how much water it needs, and what fertilizer to use, built with two teammates for Electronics Service to Society (ESS), a VJTI course under Prof. Rohin Daruwala.",
    github: "https://github.com/abhijitdalal26/smart-agriculture-advisory-system",
    heroImage: "/projects/smart-agriculture-advisory-system/physical-setup.jpeg",
    screenshots: [
      "/projects/smart-agriculture-advisory-system/dashboard-overview.png",
      "/projects/smart-agriculture-advisory-system/dashboard-live-sensors.png",
      "/projects/smart-agriculture-advisory-system/dashboard-ml-predictions.png",
      "/projects/smart-agriculture-advisory-system/dashboard-weather-forecast.png",
      "/projects/smart-agriculture-advisory-system/dashboard-historical-analytics.png",
      "/projects/smart-agriculture-advisory-system/dashboard-manual-input.png",
    ],
    papers: [
      { label: "Dataset: Crop Recommendation", href: "https://www.kaggle.com/datasets/atharvaingle/crop-recommendation-dataset" },
      { label: "Dataset: Crop Yield in Indian States", href: "https://www.kaggle.com/datasets/akshatgupta7/crop-yield-in-indian-states-dataset" },
      { label: "Dataset: Irrigation Water Requirement", href: "https://www.kaggle.com/datasets/miadul/irrigation-water-requirement-prediction-dataset" },
      { label: "Dataset: Fertilizer Prediction", href: "https://www.kaggle.com/datasets/irakozekelly/fertilizer-prediction" },
    ],
    story: [
      "Most farmers still decide what to plant, when to water, and what fertilizer to buy by gut feeling, passed down experience rather than data. Along with two teammates, Rugved Bhalekar and Prathamesh Thanekar, I built a system that tries to replace that guesswork with actual numbers, for Electronics Service to Society (ESS), a VJTI course under Prof. Rohin Daruwala. We wired up a potted plant with real sensors, hooked it to a Raspberry Pi, and built four machine learning models that turn raw soil and weather readings into plain advice: plant this crop, water it this much, use this fertilizer, and expect this yield.",
      "The hardware side reads six things off the plant in real time: soil moisture, soil temperature, soil pH, air temperature, humidity, and light, using an Arduino Uno and a handful of sensors wired into the Pi. That data feeds a small on-device dashboard (a 16x2 LCD and a color TFT screen) so you can walk up to the pot and read its live readings directly, no phone or laptop needed. It also drives a full web dashboard with live gauges and historical charts, plus a Telegram bot so a farmer away from the pot, out in the field or anywhere else with just a phone, can ask questions and get answers.",
      "The interesting engineering problem was making four separate ML models work together as one coherent advisory system: crop recommendation, yield prediction, irrigation advice, and fertilizer advice, each trained on a different Indian agricultural dataset, each an XGBoost model chosen for being fast enough to run inference directly on a Raspberry Pi with no cloud round trip. We also built a fallback for farmers who don't have lab tested soil nutrient numbers. Pick your soil's color (red, black, alluvial) from the dashboard and the system maps that to approximate nutrient levels instead of failing to work.",
      "The last piece was wiring an AI agent called OpenClaw, an agentic framework that can read sensor files and run code directly on the device, into a Telegram bot. So instead of a rigid menu of commands, a farmer can just ask a normal question and get back sensor readings, predictions, and advice in plain language. That's genuinely useful in a rural setting where a full dashboard isn't always the easiest thing to reach for.",
    ],
    howItWorks: [
      "Sensors (DHT22 for air temp/humidity, a capacitive soil moisture probe, DS18B20 for soil temperature, BH1750 for light, plus a pH-4502C probe) constantly report readings into a daemon running on the Raspberry Pi, which is the system's single hub.",
      "The Pi has no analog input pins, so the two genuinely analog sensors, soil moisture and pH, are wired into an Arduino Uno instead. The Arduino reads them over its ADC and relays the values to the Pi over serial, while everything else (the digital/I2C/1-Wire sensors, the LCD, and the ML inference) is handled directly by the Pi.",
      "Those readings are logged to a local SQLite database and pushed to a FastAPI backend, which is the single source of truth the rest of the system reads from.",
      "Four independently trained XGBoost models (crop recommendation, yield prediction, irrigation advisory, and fertilizer advisory) take the live sensor data, or manually entered values, and turn it into concrete recommendations.",
      "A React dashboard shows live sensor gauges, historical trend charts, weather forecasts pulled from a weather API, and the model outputs, built for someone checking in from a laptop or phone.",
      "OpenClaw, an agentic framework, runs directly on the Pi itself rather than in the cloud, so it has real file and shell access on the device: it reads the live sensor state and SQLite history straight off disk and can run its own Python/shell code to check on things. It's wired to a Telegram bot so a farmer can ask a plain-language question and get back live readings, predictions, and alerts, no dashboard required. An AGENTS.md file defines escalation rules it follows, for example, recognizing that a soil moisture reading stuck at exactly 0% almost always means the Arduino has been disconnected, not that the soil is actually bone dry, and reporting that distinction instead of just repeating the raw number.",
    ],
    diagramsIntro: "The system architecture below is the real block diagram used to plan and wire the build, and the schematic is the exact circuit that was breadboarded. Together they show how every sensor, the Pi, the Arduino, and both displays are actually connected.",
    diagrams: [
      {
        title: "System architecture — how every piece connects",
        image: "/projects/smart-agriculture-advisory-system/architecture-diagram.jpeg",
        caption: "The Raspberry Pi 4 (its quad-core Cortex-A72, green box) is the hub, powered over USB from a laptop/PC. It talks I2C directly to the BH1750 ambient light sensor and to the 16x2 LCD, and reads the DHT22 (air temp/humidity) and DS18B20 (soil temp, over 1-Wire) straight off its GPIO pins. Because the Pi itself can't read analog voltages, a USB link carries both data and 5V power down to an Arduino Uno, which exists purely to bridge the two genuinely analog sensors, a capacitive soil moisture probe and a pH-4502C probe, into digital values the rest of the system can use. That same Arduino also drives a small SPI color TFT locally, so the moisture and pH numbers are visible right at the pot without needing the web dashboard. In short: the Pi owns the digital sensors, the display, and the ML inference; the Arduino's only job is being a dedicated analog-to-digital bridge for the two sensors that need one.",
      },
      {
        title: "Full wiring schematic",
        image: "/projects/smart-agriculture-advisory-system/hardware-circuit-diagram.png",
        caption: "The exact circuit schematic behind the block diagram above: the BH1750 and the PCF8574-backed 16x2 LCD on the Pi's I2C bus, the DHT22 on a GPIO pin, RASTX/RASRX serial lines carrying the Arduino's moisture and pH readings back to the Pi, and the Arduino's own SPI lines (MOSI/MISO/SCK/CS/DC/RST) driving the local TFT.",
      },
    ],
    openclaw: {
      title: "OpenClaw agent, live on Telegram",
      image: "/projects/smart-agriculture-advisory-system/telegram-bot-chat.jpeg",
      imageMaxWidth: 320,
      caption: "The bot, KrishiMitra, running on OpenClaw directly on the Pi. Asked \"How is the farm\", it doesn't return a canned template, it pulls the actual live sensor values (air temp, humidity, soil temp, soil moisture, pH, light) at that moment, flags what's actually wrong (soil moisture reading a critical 0.0%), and reasons about the likely cause using the escalation rules in its AGENTS.md, correctly inferring the Arduino was probably disconnected rather than just reporting a scary number at face value.",
    },
  },
  {
    slug: "autonomous-racing-using-rl",
    title: "Autonomous Racing using Reinforcement Learning",
    tagline: "Teaching a Car to Drive Itself",
    order: 7,
    status: "done",
    kind: "Machine Learning · Reinforcement Learning",
    tags: ["Reinforcement Learning", "PPO", "Unity ML-Agents", "PyTorch", "Gymnasium"],
    blurb: "A car that learned to drive by crashing into walls thousands of times and slowly figuring out how not to. No lines of steering code, just trial, error, and a reward signal, first in 2D, then scaled up into a real Unity go-kart.",
    github: "https://github.com/abhijitdalal26/autonomous-racing-using-rl",
    heroVideo: "/projects/autonomous-racing-using-rl/demo.mp4",
    thumbnail: "/projects/autonomous-racing-using-rl/hero.png",
    story: [
      "This project builds a driving policy using reinforcement learning instead of writing any explicit steering logic, in two stages: first a 2D agent trained in Gymnasium's CarRacing-v3 environment, then a 3D agent trained inside a Unity go-kart simulation with real physics. Both are trained with PPO (Proximal Policy Optimization), learning purely from a reward for staying on track and a penalty for crashing, no hand-coded rules for when to turn or brake.",
      "It started small and 2D. Using Gymnasium's CarRacing-v3 environment, the car begins as a blank slate that only sees a top-down camera view of the track and has no idea what steering or gas even means. Early on it just spins in circles and drives off the road within seconds. Using an algorithm called PPO (Proximal Policy Optimization), it tries thousands of small variations of its own driving, keeps whatever recently scored higher, and slowly tightens up its behavior over roughly a million and a half timesteps until it's taking corners cleanly and holding the track. That's phase one, worked all the way through: reward, watch, retrain, repeat.",
      "From there the idea scaled up into 3D using Unity and a toolkit called ML-Agents: a flat top-down image swapped for an actual go-kart racing around a modeled track, with real physics, lap checkpoints, and five raycast \"whiskers\" standing in for the car's eyes instead of pixels. Four karts trained in parallel on identical copies of the same track, all pooling their experience back into one shared PPO brain, which pushed through a full million training steps in a single run instead of four separate ones. The trained brain was exported as a standalone Windows build, so the kart drives itself with no Unity Editor or Python process running behind it.",
    ],
    howItWorks: [
      "Phase one trains in Gymnasium's CarRacing-v3, a 2D top-down racing simulator, using a CNN policy (Stable-Baselines3's CnnPolicy) that reads a stack of 4 grayscale frames and outputs continuous steering, gas, and brake values. Frame-stacking exists because a single image can't encode motion, stacking 4 in a row gives the network enough short-term context to infer how fast and in what direction the car is already moving.",
      "The agent is trained with PPO, an algorithm that nudges the driving policy toward whatever recently earned it a higher reward, while a clipping mechanism (clip range 0.2) stops any single update from swinging its behavior too wildly and destabilizing what it already learned. Reward comes from progress along the track and staying on the road, with a penalty for going off it, so over roughly 1.5M timesteps the mean episode reward climbs from around -50 to consistently above 800.",
      "Phase two moves into Unity with ML-Agents, on a Karting Microgame template scene reworked for training. A custom C# script, KartAgent.cs, implements the ML-Agents API: it feeds the policy a vector observation (5 raycast distance sensors plus the kart's speed) instead of pixels, hands out reward at each track checkpoint the kart clears in order, and penalizes it for going off-track or driving backward through a checkpoint.",
      "Two more scripts were modified to make the stock Karting Microgame trainable rather than just playable: ArcadeKart.cs (the driving physics controller) was patched to handle input refreshing and destroyed-object references safely across thousands of automatic episode resets, and GameFlowManager.cs was changed to skip the game's pre-race 3-2-1 countdown and scene-loading transitions during training, since those exist for a human player and just waste wall-clock time when an agent is resetting hundreds of times an hour.",
      "Four karts train at once on parallel copies of the track, sharing one PPO policy so their experience gets pooled into the same gradient update, which is what let a 1M-step run stand in for what would otherwise be four separate single-agent runs. The best checkpoint is exported straight to ONNX (KartAgent.onnx), and Unity's ML-Agents runtime can run that ONNX file for inference entirely on its own, no Python or PyTorch needed once training is done, which is also what makes the standalone build possible.",
    ],
    diagramsIntro: "The project has two acts: a 2D Gymnasium car learning to drive from scratch, then the same PPO idea scaled up into a real Unity go-kart. These are the actual training curves and in-engine captures from both runs, not staged screenshots.",
    diagrams: [
      {
        title: "Phase 1, checkpoint 0032 — driving blind",
        image: "/projects/autonomous-racing-using-rl/gym-early.jpg",
        caption: "An early PPO checkpoint on CarRacing-v3. At this point the policy has barely started training, so it drifts off the asphalt almost immediately and has no real notion of \"steer toward the road.\"",
        imageMaxWidth: 480,
      },
      {
        title: "Phase 1, checkpoint 0142 — learning to correct",
        image: "/projects/autonomous-racing-using-rl/gym-mid.jpg",
        caption: "A mid-training checkpoint. The faint arcs behind the car are its own recent trajectory, and it's now visibly overcorrecting through a turn rather than driving straight off, evidence the reward signal for staying on-track is starting to shape its steering.",
        imageMaxWidth: 480,
      },
      {
        title: "Phase 1, checkpoint 0273 — holding the line",
        image: "/projects/autonomous-racing-using-rl/gym-solved.jpg",
        caption: "A late checkpoint, tracking straight down the center of the road into an upcoming corner. This is the same policy architecture as the first image, just a lot more PPO updates later, going from spinning out on straightaways to holding a clean racing line.",
        imageMaxWidth: 480,
      },
      {
        title: "Gymnasium: mean episode reward",
        image: "/projects/autonomous-racing-using-rl/reward-curve.png",
        caption: "Mean reward per episode over 1.5M training steps. It climbs from around -50 to roughly 800 by step 600K, dips during a stretch where PPO's exploration bonus temporarily pushes it to try riskier lines, then recovers and peaks above 800 again by the end of training, more or less what a healthy (if slightly noisy) PPO run is supposed to look like.",
      },
      {
        title: "Gymnasium: entropy loss",
        image: "/projects/autonomous-racing-using-rl/entropy-loss.png",
        caption: "Entropy measures how random the policy's action choices still are. It rises early on as PPO's entropy bonus deliberately encourages exploring different driving lines, then falls steadily for the rest of training as the car commits more and more confidently to specific steering decisions instead of guessing.",
      },
      {
        title: "Unity: four karts training in parallel",
        image: "/projects/autonomous-racing-using-rl/hero.png",
        caption: "The actual Unity Editor scene mid-training: four karts (Kart_AI through Kart_AI (3)) running identical copies of the same oval track at once, each firing its own fan of raycasts (the white lines) out to sense the road edge. Every kart's experience feeds into one shared PPO policy, which is what let a single 1M-step run do the work of four separate ones.",
      },
      {
        title: "Unity: training console log",
        image: "/projects/autonomous-racing-using-rl/unity-training-log.png",
        caption: "Raw ml-agents-learn output from the final stretch of the 1M-step run. Mean reward holds in the 180-200 range with the standard deviation across the 4 karts settling down over time (from the high-20s down to the mid-teens near step 1,000,000), a sign the four karts were converging on similar driving behavior rather than each learning something different.",
      },
      {
        title: "Unity: reward across saved checkpoints",
        image: "/projects/autonomous-racing-using-rl/checkpoint-rewards.png",
        caption: "Reward at the three ONNX checkpoints exported during the run (250K, 500K, and 750K steps). It isn't a clean monotonic climb, it peaks around the 500K-step checkpoint and dips slightly by 750K, a reminder that PPO training isn't guaranteed to improve step over step, which is exactly why checkpointing and picking the best snapshot afterward matters.",
      },
      {
        title: "Unity: where the training time actually went",
        image: "/projects/autonomous-racing-using-rl/runtime-breakdown.png",
        caption: "A profile of the 1M-step run's wall-clock time. Stepping the Unity environment itself (env_step, physics + rendering four karts) ate roughly 3,000 of the run's ~3,400 seconds, versus about 411 seconds spent actually advancing the PPO trainer (the gradient updates). The bottleneck was Unity simulating the world, not the neural network learning from it.",
      },
    ],
    architectureSteps: [
      "Observations — 5 forward-fanned raycast distance sensors + kart speed/velocity (vector obs, no camera)",
      "Policy/value network — 2 fully-connected hidden layers, 128 units each",
      "Algorithm — PPO, clip epsilon 0.2, GAE lambda 0.95, discount gamma 0.99",
      "Exploration — entropy bonus (beta) 5e-3, linearly annealed learning rate from 3e-4",
      "Rollout — time_horizon 64 steps/agent, buffer_size 2048, batch_size 128, 3 epochs per update",
      "Multi-agent — 4 karts on parallel track copies, all sharing and updating one policy",
      "Training budget — up to 2,000,000 steps configured; best checkpoint taken at 1,000,000",
      "Export — best checkpoint exported to KartAgent.onnx, runs standalone with no Python at inference time",
    ],
    papers: [
      { label: "Schulman et al. — Proximal Policy Optimization Algorithms", href: "https://arxiv.org/abs/1707.06347" },
      { label: "Juliani et al. — Unity: A General Platform for Intelligent Agents", href: "https://arxiv.org/abs/1809.02627" },
    ],
  },
  {
    slug: "play-store-app-analysis",
    title: "Play Store App Analysis",
    tagline: "Google Play Market Research",
    order: 8,
    status: "done",
    kind: "Data Analysis",
    tags: ["Python", "Pandas", "PostgreSQL", "Web Scraping", "Kaggle"],
    blurb: "What actually makes an app succeed on the Play Store? I scraped a fresh 2026 snapshot across 10 countries and combined it with a 3.45 million app historical dataset to find out.",
    github: "https://github.com/abhijitdalal26/play-store-app-analysis",
    links: [
      { label: "Kaggle Dataset", href: "https://www.kaggle.com/datasets/abhijitdalal26/google-play-store-app-dataset-2026/data" },
      { label: "Kaggle Notebook", href: "https://www.kaggle.com/code/abhijitdalal26/google-play-store-app-data-analysis-2026" },
    ],
    heroImage: "/projects/play-store-app-analysis/logo.png",
    story: [
      "The core of this project is a dataset I built myself: 11,193 real, live Play Store listings, scraped directly through a Postgres-backed pipeline across ten genuinely different markets, the US, India, Brazil, Indonesia, Mexico, the UK, Germany, Japan, South Korea and the Philippines, rather than pulled from an existing Kaggle CSV. Coverage came out almost perfectly even, roughly 7,500 apps per country, so no single market dominates the picture.",
      "Spreading the scrape across ten countries instead of one paid off immediately once I looked at what actually converts locally. Keyword searches in the local language, \"photo editor gratis\" in Indonesia, \"futebol\" in Brazil, \"short drama app hindi\" in India, \"kredit online\" in Indonesia, saved a 100k+ install app 94 to 100% of the time, well above what the English equivalents of the same searches returned.",
      "Inside that fresh 11k-app snapshot, the categories that showed up most weren't games or novelties, they were utilities: Finance (1,215 apps), Education (1,104), Productivity (987) and Tools (899), all clustered around a 100k-install median. People come to these categories already looking for something specific, not to browse.",
      "To know whether any of that was signal or noise, I paired the fresh scrape with a public historical dataset of 3.45 million Play Store apps as a baseline, a much smaller supporting piece, but useful for sanity-checking the fresh numbers against the long-run shape of the store. The headline number there: only 2.89% of all 3.45 million apps ever crossed 100,000 installs while holding a rating above 4.0, and 96.89% of everything published is free, so free is the default, not a strategic choice.",
      "That historical baseline sharpened a few more things. Paid apps break through at 1.13% versus 6.16% for free ones, and inside the free tier, combining ads with in-app purchases hits a 20% success rate versus 0.88% for apps with neither. Positioning also mattered more than the category label: focused tools, phone cleaner/security apps, photo and video editors, succeeded 5 to 6 times more often than vague, do-everything apps, and even household names like Tinder, eFootball 2022 and Google Classroom show up with 100M+ installs sitting on a sub-3.0 rating, proof that downloads alone don't mean the product actually satisfied anyone.",
    ],
    howItWorks: [
      "Built a direct connection scraper that pulls live app metadata from the Play Store across the ten focus countries and stores it in a PostgreSQL database, no proxies, direct connection, tuned for 8 parallel threads.",
      "Ran discovery across charts, categories and keyword searches to queue app IDs, then extracted full metadata and multi-country install/rating stats for all 11,193 of them.",
      "Paired that fresh 2026 dataset with a public historical dataset of 3.45 million apps, run through an 11-step analysis pipeline in a Jupyter notebook covering ratings, categories, installs, survival rates, pricing and keyword yield, to check the fresh numbers against a long-run baseline.",
      "Exported both sets of results as CSVs, and published the cleaned 2026 dataset plus the full analysis notebook on Kaggle so anyone can explore the numbers themselves.",
    ],
    diagramsIntro: "Eight charts pulled straight from the analysis output, not staged: first the fresh 11k-app dataset collected across 10 diverse markets, then the smaller historical-baseline section used to sanity-check it.",
    diagrams: [
      {
        title: "11,193 apps, scraped live across 10 markets",
        image: "/projects/play-store-app-analysis/chart-country-footprint.png",
        caption: "Coverage came out almost perfectly even, roughly 7,500 apps per country, so no single market's app count is skewing the picture.",
      },
      {
        title: "Local-language keywords convert at near 100%",
        image: "/projects/play-store-app-analysis/chart-keyword-localization.png",
        caption: "Searches in the local language, not English, saved 100k+ install apps 94-100% of the time in this scrape. Speaking the market's language in the listing is not optional.",
      },
      {
        title: "Utility, not novelty, dominates the fresh scrape",
        image: "/projects/play-store-app-analysis/chart-2026-snapshot.png",
        caption: "By app count, Finance, Education, Productivity and Tools lead the fresh 11k-app dataset, all clustered around a 100k-install median: people arrive already looking for something specific.",
      },
      {
        title: "Winner-takes-most (historical baseline)",
        image: "/projects/play-store-app-analysis/chart-install-concentration.png",
        caption: "In the 3.45 million-app historical pool used as a sanity check, just 1% of apps (about 34,500) capture nearly 90% of every install on the Play Store.",
      },
      {
        title: "Where demand beats competition (historical baseline)",
        image: "/projects/play-store-app-analysis/chart-opportunity-score.png",
        caption: "An opportunity score combining demand, competition and user happiness, ranked by genre. Casino, card games and weather sit at the top: enough searches to matter, without a graveyard of competitors already there.",
      },
      {
        title: "Monetization inside the free tier (historical baseline)",
        image: "/projects/play-store-app-analysis/chart-monetization.png",
        caption: "Free apps clear 100k installs over 5x more often than paid ones. Inside the free tier, combining ads with in-app purchases outperforms either alone, and dwarfs apps that monetize with neither.",
      },
      {
        title: "Focus beats scope (historical baseline)",
        image: "/projects/play-store-app-analysis/chart-archetype-success.png",
        caption: "Apps built around one specific job, phone cleanup, weather, photo editing, succeed 5-6x more often than vague, do-everything apps labeled 'Other / broad app', which barely clear 1.68%.",
      },
      {
        title: "Downloaded at scale, still rejected",
        image: "/projects/play-store-app-analysis/chart-rejected-despite-downloads.png",
        caption: "Even recognizable names aren't immune: Tinder, eFootball 2022 and Google Classroom all sit on 100M+ installs with a rating under 3.0. Downloads and satisfaction are not the same thing.",
      },
    ],
  },
  {
    slug: "mcp-audit",
    title: "MCPAudit",
    tagline: "Security Auditor for AI Tool Configs",
    order: 0,
    status: "done",
    kind: "Security · Tools",
    tags: ["Python", "FastAPI", "Go", "Next.js", "Security", "CI/CD"],
    blurb: "A security scanner for MCP server configs, the files that decide which tools an AI assistant like Claude or Cursor is allowed to touch on your machine. Paste your config in and get a full risk report, mapped to the OWASP MCP Top 10.",
    github: "https://github.com/abhijitdalal26/MCP-Audit",
    papers: [
      { label: "Indirect Prompt Injection Paper", href: "https://arxiv.org/abs/2302.12173" },
      { label: "Prompt Injection Taxonomy Paper", href: "https://arxiv.org/abs/2306.05499" },
    ],
    heroImage: "/projects/mcp-audit/face.png",
    screenshots: ["/projects/mcp-audit/diagram.svg"],
    story: [
      "When you connect an AI assistant like Claude Desktop or Cursor to a tool through MCP (Model Context Protocol), you're handing that tool a key to your machine. It might get access to your filesystem, your shell, your browser, or your API keys. Most people copy a config snippet from a GitHub README, paste it in, and never look at it again. MCPAudit exists to show what's actually hiding in those configs.",
      "You paste your MCP config in and it comes back with a full report: what's dangerous, how dangerous, and why. Under the hood it runs 54 separate checks across 11 categories, hardcoded secrets and API keys, typosquatted or malicious packages, servers asking for way more filesystem or shell access than they need, prompt injection hidden inside tool descriptions, invisible unicode characters used to smuggle instructions past a human reviewer, and more. Every finding gets mapped to the OWASP MCP Top 10, a CWE ID, and a MITRE ATT&CK tactic, so it reads like a real security report and not just a list of warnings.",
      "For a recruiter reading this: the project is a monorepo with three real, working pieces. A FastAPI backend running the scanning engine and 335+ tests, a Next.js frontend for the paste-and-scan web flow, and a Go CLI that runs the entire 54-check engine completely offline, so nobody has to trust me with their config if they'd rather not. All three are wired into a GitHub Actions CI pipeline, and the tool ships its own GitHub Action so other projects can run MCPAudit as a security gate on every pull request.",
      "The research side mattered as much as the code. Several of the checks come directly out of published security research on MCP, papers on indirect prompt injection, tool poisoning, and a UI exploit where a malicious instruction gets hidden off-screen inside a horizontal-scrolling approval dialog. Reading that research and turning it into a working, testable check was most of the real learning here, not just about MCP, but about how to think like an attacker when you're building a scanner meant to catch one.",
    ],
    howItWorks: [
      "You give MCPAudit a config, either by pasting it into the web app or by running the offline CLI against your local claude_desktop_config.json or .cursor/mcp.json.",
      "A JSONC-aware parser reads the config (comments and all) and hands it to the scanning engine.",
      "The engine runs all 54 checks across 11 modules: secrets, supply chain risk, privilege escalation, prompt injection and tool poisoning, shadow or unverified servers, dangerous code execution patterns, and more. It also does a live CVE lookup against OSV.dev for any pinned package versions.",
      "Every finding comes back with a severity, an OWASP MCP Top 10 category, a CWE ID, a MITRE ATT&CK tactic, and plain-language remediation advice.",
      "Results can be exported as JSON, as SARIF 2.1.0 (which uploads directly into GitHub's Security tab as code scanning alerts), or as a CycloneDX AI-BOM for supply chain compliance.",
      "Drop the included GitHub Action into any repo's CI pipeline and it will scan your MCP config on every push or pull request, failing the build if it finds anything above the severity threshold you set.",
    ],
  },
  {
    slug: "bookscroller",
    title: "Skrolla",
    tagline: "A TikTok Feed for Your Next Book",
    order: 10,
    status: "current",
    stageLabel: "Closed Testing",
    kind: "Mobile · Recommendation Systems",
    tags: ["Kotlin", "Jetpack Compose", "CLIP", "Supabase", "Android"],
    blurb: "A book discovery app that scrolls like TikTok but is built to do the opposite of what TikTok does. Swipe through book covers, get hooked on one, and it points you at the actual book instead of trying to keep you scrolling.",
    github: "",
    heroImage: "/projects/bookscroller/logo.png",
    screenshots: [
      "/projects/bookscroller/home-feed.jpg",
      "/projects/bookscroller/fyp.jpg",
      "/projects/bookscroller/chat-interface.jpg",
      "/projects/bookscroller/story-card.jpg",
      "/projects/bookscroller/book-detail.jpg",
      "/projects/bookscroller/library.jpg",
    ],
    story: [
      "A lot of people want to read more but never actually pick a book. They wait for something to grab them and it never does, because nothing is putting new books in front of their eyes the way a feed puts new videos in front of their eyes. Skrolla flips that. It looks like a short-form video feed and scrolls the same way, but instead of clips it's book covers, and instead of trying to hold your attention forever, its whole job is to spark enough curiosity that you go read the actual book.",
      "You scroll a feed of covers the way you'd scroll Reels or Shorts. Something catches your eye, you tap in, and you land in a chat with an AI about that book, spoiler free by default so it only gives you enough to get you curious, not enough to ruin the ending. If you want more, you can turn spoiler mode on and go as deep as you want. From there you can turn the conversation into a small saved card, a compact summary you can come back to later without rereading the whole chat.",
      "The recommendation engine is the part I'm proudest of, since it's the piece with actual machine learning behind it rather than a simple genre filter. Every one of the roughly 106,000 titles in the catalog, pulled from Goodreads, NYT bestseller lists, and AniList for manga, gets turned into a 1152-dimensional vector: a CLIP model reads the cover art for visual style and genre, and a sentence transformer reads the title, author, and description for tone and theme, and the two get combined into one embedding per book. As you scroll and dwell, save, or skip titles, the app quietly updates a taste vector in that same space, and a Supabase pgvector search pulls back the next batch of books that are close to it. The feed is built to explore first and personalize second, so it keeps surfacing books outside what you already like instead of narrowing down to a small loop of the same five genres.",
      "Right now Skrolla is in closed testing on Android. All nine screens, from onboarding to the For You feed to the chat and library, are built and working, and I'm in the middle of wiring the app over from bundled sample data to the real Supabase backend so the recommendations run on live data instead of a fixed local set.",
    ],
    howItWorks: [
      "Every book in the catalog gets embedded twice: a CLIP vision model reads the cover for visual style and genre, and a sentence transformer reads the title, author, genres, and description for theme and tone. The two embeddings are combined into one 1152-dimensional vector per book.",
      "As you scroll, the app watches how you interact with each cover: how long you dwell on it, whether you scroll back to it, whether you save it or skip past it fast. Those signals continuously update a taste vector that lives in the same embedding space as the books.",
      "A nearest-neighbor search against that taste vector, run through Supabase's pgvector, pulls back the next batch of books to show you, refreshed in the background as you keep scrolling.",
      "Tapping into a book opens a chat with an AI, spoiler free by default, that you can use to learn about the book, ask questions, or turn the conversation into a saved summary card.",
      "The app itself is native Android, built with Kotlin and Jetpack Compose in an MVVM architecture.",
    ],
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function getProjectsByStatus(status: Project["status"]) {
  return projects.filter((p) => p.status === status).sort((a, b) => b.order - a.order);
}
