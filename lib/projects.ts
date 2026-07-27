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
  thumbnail?: string;
  screenshots?: string[];
  logo?: string;
  cardPreview?: { images: string[] };
  stageLabel?: string;
  story: string[];
  howItWorks?: string[];
  diagramsIntro?: string;
  diagrams?: { title: string; image: string; caption: string }[];
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
    screenshots: [
      "/projects/harry-potter-gpt/diagram1.png",
      "/projects/harry-potter-gpt/diagram2.png",
      "/projects/harry-potter-gpt/diagram3.png",
    ],
    story: [
      "Harry Potter GPT is a language model built to talk about the books the way a genuinely into-it fan would, someone who knows the story well enough to ask questions back, notice details, and keep the conversation going.",
      "Rather than downloading a pretrained chatbot and prompting it to act like a fan, the whole thing is built from the ground up, following Andrej Karpathy's lectures on how GPT models actually work. It started as a GPT-2 style model trained on all seven Harry Potter books so it would pick up the world, the characters, and the writing style. That gave it the vocabulary of the Potter universe, but not yet the ability to hold a conversation.",
      "So I took it through supervised fine-tuning next, showing it thousands of question and answer style exchanges so it would learn to respond in a chat format instead of just continuing a story. Then came the last and most interesting stage, preference alignment. I generated pairs of responses to the same question, one that felt like a real fan reply and one that felt flat or robotic, and trained the model to prefer the good one using a technique called DPO (Direct Preference Optimization), which is a simpler cousin of the reinforcement learning from human feedback (RLHF) process behind tools like ChatGPT.",
      "I will be upfront about the results. The model's answers are nowhere near as sharp as ChatGPT or Claude, and it sometimes drifts into nonsense mid sentence. That was never the goal though. The goal was to understand, end to end, what actually happens between typing a question and getting an answer: how raw text becomes tokens, how a transformer predicts the next one, how a base model gets fine tuned into something that follows instructions, and how it gets nudged toward answers people actually prefer. Every one of those stages is something I built and trained myself, not something I called through an API.",
    ],
    howItWorks: [
      "Stage 1, continued pretraining: started from a GPT-2 architecture and trained it on the text of all seven Harry Potter books so it absorbed the world, characters, and voice of the series.",
      "Stage 2, supervised fine-tuning: trained the model on thousands of question and answer pairs written in a fan-discussion format, so it learned to respond conversationally instead of just predicting the next sentence of a story.",
      "Stage 3, preference alignment with DPO: built a dataset of paired responses, a strong fan-like answer next to a weak generic one, and trained the model to prefer the strong one. This is the same idea behind RLHF, minus the separate reward model.",
      "Loss dropped from around 3.5 right after switching to the chat format down to about 1.5 to 1.8 once the model learned both the Harry Potter world and how to hold a conversation about it.",
      "The whole pipeline runs on nanoGPT, a compact and readable GPT implementation, which made it possible to actually read and understand every part of training rather than treating it as a black box.",
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
    blurb: "A Raspberry Pi planted in a pot of soil that reads the plant's vitals and tells a farmer what to grow, how much water it needs, and what fertilizer to use, built with two teammates for a college social-impact program.",
    github: "https://github.com/abhijitdalal26/smart-agriculture-advisory-system",
    heroImage: "/projects/smart-agriculture-advisory-system/physical-setup.jpeg",
    screenshots: [
      "/projects/smart-agriculture-advisory-system/architecture-diagram.jpeg",
      "/projects/smart-agriculture-advisory-system/hardware-circuit-diagram.png",
      "/projects/smart-agriculture-advisory-system/dashboard-overview.png",
      "/projects/smart-agriculture-advisory-system/dashboard-live-sensors.png",
      "/projects/smart-agriculture-advisory-system/dashboard-ml-predictions.png",
      "/projects/smart-agriculture-advisory-system/dashboard-weather-forecast.png",
      "/projects/smart-agriculture-advisory-system/dashboard-historical-analytics.png",
      "/projects/smart-agriculture-advisory-system/dashboard-manual-input.png",
      "/projects/smart-agriculture-advisory-system/telegram-bot-chat.jpeg",
    ],
    story: [
      "Most farmers still decide what to plant, when to water, and what fertilizer to buy by gut feeling, passed down experience rather than data. Along with two teammates, Rugved Bhalekar and Prathamesh Thanekar, I built a system that tries to replace that guesswork with actual numbers, for a college program called ESS (Electronics Service to Society). We wired up a potted plant with real sensors, hooked it to a Raspberry Pi, and built four machine learning models that turn raw soil and weather readings into plain advice: plant this crop, water it this much, use this fertilizer, and expect this yield.",
      "The hardware side reads six things off the plant in real time: soil moisture, soil temperature, soil pH, air temperature, humidity, and light, using an Arduino Nano and a handful of sensors wired into the Pi. That data feeds a small on-device dashboard (a 16x2 LCD and a color TFT screen) so you can walk up to the pot itself and see what it's thinking. It also drives a full web dashboard with live gauges and historical charts, plus a Telegram bot so a farmer standing in the field with just a phone can ask questions and get answers.",
      "The interesting engineering problem was making four separate ML models work together as one coherent advisory system: crop recommendation, yield prediction, irrigation advice, and fertilizer advice, each trained on a different Indian agricultural dataset, each an XGBoost model chosen for being fast enough to run inference directly on a Raspberry Pi with no cloud round trip. We also built a fallback for farmers who don't have lab tested soil nutrient numbers. Pick your soil's color (red, black, alluvial) from the dashboard and the system maps that to approximate nutrient levels instead of failing to work.",
      "The last piece was wiring an AI agent called OpenClaw, an agentic framework that can read sensor files and run code directly on the device, into a Telegram bot. So instead of a rigid menu of commands, a farmer can just ask a normal question and get back sensor readings, predictions, and advice in plain language. That's genuinely useful in a rural setting where a full dashboard isn't always the easiest thing to reach for.",
    ],
    howItWorks: [
      "Sensors (DHT22 for air temp/humidity, a soil moisture probe, DS18B20 for soil temperature, BH1750 for light, plus an Arduino Nano reading soil pH) constantly report readings into a daemon running on the Raspberry Pi.",
      "Those readings are logged to a local SQLite database and pushed to a FastAPI backend, which is the single source of truth the rest of the system reads from.",
      "Four independently trained XGBoost models (crop recommendation, yield prediction, irrigation advisory, and fertilizer advisory) take the live sensor data, or manually entered values, and turn it into concrete recommendations.",
      "A React dashboard shows live sensor gauges, historical trend charts, weather forecasts pulled from a weather API, and the model outputs, built for someone checking in from a laptop or phone.",
      "A Telegram bot, powered by the OpenClaw agent framework running on the Pi itself, lets a farmer ask questions in plain language and get sensor readings, predictions, and alerts back without opening a dashboard at all.",
      "The full system architecture, showing how the sensor layer, backend, ML models, and interfaces connect, is in the diagram below.",
    ],
  },
  {
    slug: "projects-wiki",
    title: "Projects Wiki",
    tagline: "Long-Term Memory for Working with LLMs",
    order: 6,
    status: "done",
    kind: "Tools · LLM",
    tags: ["LLM", "Docs", "Workflow"],
    blurb: "A workspace that turns messy notes into a maintained project brain, so you can pick up a long-running project with an LLM without re-explaining everything from scratch every session.",
    github: "https://github.com/abhijitdalal26/projects-wiki",
    links: [
      { label: "Karpathy's tweet", href: "https://x.com/karpathy/status/2039805659525644595?s=20" },
      { label: "Karpathy's gist", href: "https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f" },
    ],
    heroImage: "/projects/projects-wiki/screenshot.png",
    story: [
      "Inspired by a tweet from Andrej Karpathy about treating your notes as a maintained \"memex\" instead of throwaway chat history, projects-wiki exists because every new conversation with an LLM starts from zero, and re-explaining a project's full context every single time gets old fast.",
      "projects-wiki fixes that by splitting notes into two layers: raw dumps you drop in as-is, and a distilled wiki the LLM keeps up to date as you work. Instead of pasting your whole project history into a fresh chat, you just point the LLM at the wiki and it already knows where things stand.",
    ],
  },
  {
    slug: "autonomous-racing-using-rl",
    title: "Autonomous Racing (RL)",
    tagline: "Teaching a Car to Drive Itself",
    order: 7,
    status: "done",
    kind: "Machine Learning · Reinforcement Learning",
    tags: ["Reinforcement Learning", "PPO", "Unity ML-Agents", "PyTorch", "Gymnasium"],
    blurb: "A car that learned to drive by crashing into walls thousands of times and slowly figuring out how not to. No lines of steering code, just trial, error, and a reward signal.",
    github: "https://github.com/abhijitdalal26/autonomous-racing-using-rl",
    heroImage: "/projects/autonomous-racing-using-rl/hero.png",
    screenshots: [
      "/projects/autonomous-racing-using-rl/reward-curve.png",
      "/projects/autonomous-racing-using-rl/entropy-loss.png",
      "/projects/autonomous-racing-using-rl/unity-training-log.png",
    ],
    story: [
      "This project is a car that learned to drive without a single line of steering logic being written for it. No 'if wall, then turn' rules, just a track, a reward for staying on the road, a penalty for crashing, and reinforcement learning, the same family of technique behind things like AlphaGo, figuring out the rest on its own.",
      "It started small and 2D. Using Gymnasium's CarRacing environment, the car begins as a blank slate that only sees a top down camera view of the track and has no idea what steering or gas even means. Early on it just spins in circles and drives off the road immediately. But using an algorithm called PPO (Proximal Policy Optimization), it tries thousands of small variations of its own driving, keeps the ones that score higher, and slowly tightens up its behavior. The reward curve above shows that climb, starting around zero and eventually settling above 800 as the car learns to stay on the track and take corners cleanly. The entropy loss curve tells the other half of the story: entropy is a measure of how random the car's decisions are, and watching it steadily fall means the car went from guessing to actually being confident about what to do next.",
      "From there the idea scaled up into 3D using Unity and a toolkit called ML-Agents, moving from a flat image to an actual go kart racing around a real track with physics, checkpoints, and raycast sensors standing in for the car's eyes. Four karts trained in parallel on identical copies of the same track, all feeding their experience back into one shared brain. That run pushed through a full million training steps and came out the other end with a kart that could lap the track reliably, exported as a standalone playable build.",
      "A good chunk of the intuition behind why any of this works, how a neural network turns raw pixels into a decision, why gradients update weights the way they do, came from working through Andrew Ng's Deep Learning Specialization. This project was really where those ideas stopped being theory and started being something I could watch drive around a track.",
    ],
    howItWorks: [
      "Phase one trains in Gymnasium's CarRacing-v3, a 2D top down racing simulator, using a CNN policy that reads raw pixels and outputs steering, gas, and brake.",
      "The agent is trained with PPO, an algorithm that nudges its driving policy toward whatever recently earned it a higher reward, while a clipping mechanism stops any single update from swinging its behavior too wildly.",
      "Reward comes from progress along the track and staying on the road, and it gets penalized for going off track, so over a million and a half timesteps the mean reward climbs from roughly negative fifty to over 800.",
      "Phase two moves into Unity with ML-Agents. A custom C# agent script reads five raycast sensors plus the kart's speed and feeds that into the same PPO setup, and checkpoints along the track hand out rewards for real progress instead of just distance traveled.",
      "Four karts train at once on parallel copies of the track and share one learning brain, which cut what would have been a long single-agent run down substantially, and the final trained model is exported as an ONNX file the game can run without needing Python at all.",
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
      "What actually separates an app that takes off from the millions that quietly go nowhere? This project pulls a historical dataset of 3.45 million Play Store apps and pairs it with a fresh 2026 snapshot, scraped from scratch across ten countries: the US, India, Brazil, Indonesia, Mexico, the UK, Germany, Japan, South Korea and the Philippines.",
      "The first number that stopped me was this one: out of 3.45 million apps, only 2.89% ever crossed 100,000 installs while holding a rating above 4.0. Almost everything published on the Play Store just never gets found. And 96.89% of all apps are free, so free is really the default, not a choice.",
      "Going paid makes that climb even steeper. Only 1.13% of paid apps broke through, compared to 6.16% of free ones. But how you monetize inside the free tier matters a lot too. Apps that combined ads with in-app purchases hit a 20% success rate, while apps with neither ads nor purchases barely cleared 0.88%.",
      "Category choice tells its own story. Casino, card games, weather and role playing games scored highest on opportunity historically, meaning solid demand without brutal competition. Meanwhile categories like business, food and drink, and shopping looked busy on the surface but were the most oversaturated, plenty of demand buried under too many apps chasing it. What mattered more than the category label was how sharply the app was positioned. Phone cleaner and security tools succeeded around 10% of the time and photo or video tools around 8%, while vague do everything apps succeeded barely 1.68% of the time.",
      "The fresh 2026 data showed the same pattern in the current market. Finance had 843 apps analyzed with a median of a million installs, Education had 753 apps at a 500k median, and Productivity and Tools weren't far behind. These are still the categories where people show up looking for something specific and useful.",
      "Keywords told me just as much as categories did. Searches like gpay and zepto converted to successful apps around 97 to 98% of the time, and localized terms mattered enormously: searches like photo editor hindi in India or Portuguese language variants in Brazil consistently outperformed their English equivalents. If you want to be found in these markets, speaking the local language in your listing isn't optional.",
    ],
    howItWorks: [
      "Built a direct connection scraper that pulls live app metadata from the Play Store across the ten focus countries and stores it in a PostgreSQL database.",
      "Paired that fresh 2026 snapshot with a public historical dataset of 3.45 million apps to compare how the market has shifted over time.",
      "Ran an 11 step analysis pipeline in a Jupyter notebook covering ratings, categories, installs, survival rates, pricing and keyword yield, and exported the results as a set of CSVs.",
      "Published the cleaned 2026 dataset and the full analysis notebook on Kaggle so anyone can explore the numbers themselves.",
    ],
  },
  {
    slug: "mcp-audit",
    title: "MCPAudit",
    tagline: "Security Auditor for AI Tool Configs",
    order: 9,
    status: "current",
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
