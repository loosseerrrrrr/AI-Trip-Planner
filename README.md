# ✈️ AI Trip Planner

AI Trip Planner is a full-stack web application that generates personalized travel itineraries using the power of Google Gemini AI. Just enter your destination, budget, trip duration, and travel group — and get a complete day-by-day travel plan within seconds.

---

## 🚀 Live Demo

> Coming soon...

---

## 📸 Screenshots

> Add screenshots of your app here

---

## ✨ Features

- 🤖 **AI-Powered Itineraries** — Generates detailed day-by-day travel plans using Google Gemini 1.5 Flash
- 🔍 **Smart Destination Search** — Autocomplete destination search powered by Geoapify Places API
- 💰 **Budget Selection** — Choose from Cheap, Moderate, or Luxury travel options
- 👥 **Traveller Type** — Plan for Just Me, A Couple, Family, or Friends
- 📅 **Custom Trip Duration** — Set the number of days (up to 30)
- 🏨 **Hotel Recommendations** — Get hotel suggestions with prices, ratings, and descriptions
- 📍 **Place Suggestions** — Best places to visit with timings and ticket prices
- 🔔 **Toast Notifications** — User-friendly alerts using Sonner

---

## 🛠️ Tech Stack

| Technology | Usage |
|---|---|
| React.js + Vite | Frontend Framework & Build Tool |
| Tailwind CSS | Styling |
| shadcn/ui | UI Components |
| React Router DOM | Client-side Routing |
| Google Gemini AI | AI Trip Generation |
| Geoapify API | Destination Autocomplete |
| Sonner | Toast Notifications |
| Axios | HTTP Requests |

---

## 📁 Folder Structure

```
ai-trip-planner/
├── public/
│   └── logo.svg
├── src/
│   ├── components/
│   │   ├── custom/
│   │   │   ├── Header.jsx
│   │   │   └── hero.jsx
│   │   └── ui/
│   │       ├── button.jsx
│   │       ├── input.jsx
│   │       └── sonner.jsx
│   ├── constant/
│   │   └── options.jsx
│   ├── create-trip/
│   │   └── index.jsx
│   ├── lib/
│   │   └── utils.js
│   ├── service/
│   │   └── AIModal.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .env
├── .gitignore
├── tailwind.config.js
├── vite.config.js
└── package.json
```

---

## ⚙️ Getting Started

### Prerequisites

- Node.js (v18+)
- npm

### Installation

1. Clone the repository
```bash
git clone https://github.com/YOUR_USERNAME/ai-trip-planner.git
cd ai-trip-planner
```

2. Install dependencies
```bash
npm install --legacy-peer-deps
```

3. Create a `.env` file in the root directory
```env
VITE_GEMINI_API_KEY=your_gemini_api_key_here
VITE_GOOGLE_PLACE_API_KEY=your_geoapify_api_key_here
```

4. Start the development server
```bash
npm run dev
```

5. Open your browser at `http://localhost:5173`

---

## 🔑 API Keys

| API | Where to Get | Free? |
|---|---|---|
| Gemini AI | [aistudio.google.com](https://aistudio.google.com) | ✅ Yes |
| Geoapify | [myprojects.geoapify.com](https://myprojects.geoapify.com) | ✅ Yes |

---

## 🤝 Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🙏 Acknowledgements

- [Google Gemini AI](https://aistudio.google.com)
- [Geoapify](https://www.geoapify.com)
- [shadcn/ui](https://ui.shadcn.com)
- [Tailwind CSS](https://tailwindcss.com)
- Tutorial by [Tubeguruji](https://www.youtube.com/@tubeguruji)
