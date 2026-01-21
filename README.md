# 9x9 幾何釘板 | Geoboard App

An interactive geometry learning application built with React, TypeScript, and Tailwind CSS. Students can draw and validate various geometric shapes (triangles and quadrilaterals) on a 9x9 geoboard.

![Geoboard Preview](https://via.placeholder.com/800x400?text=Geoboard+App)

## Features

- 🎯 **Interactive Drawing**: Click and drag to draw lines on a 9x9 grid
- 📐 **Shape Validation**: Automatic validation for triangles and quadrilaterals
- 🎓 **Multiple Difficulty Levels**: Easy and Hard modes
- 🌟 **Educational**: Learn about different geometric shapes:
  - Triangles: Any, Right-angled, Isosceles, Equilateral
  - Quadrilaterals: Any, Square, Rectangle, Parallelogram
- 🎨 **Responsive Design**: Works on desktop, tablet, and mobile devices
- 🇭🇰 **Cantonese Interface**: Designed for Hong Kong students

## Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **Lucide React** - Icons

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/geoboard-app.git
cd geoboard-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## Deployment

### Deploy to Vercel

#### Method 1: Using Vercel CLI

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
vercel
```

#### Method 2: Using Vercel Dashboard

1. Push your code to GitHub

2. Go to [Vercel](https://vercel.com)

3. Click "Import Project"

4. Import your GitHub repository

5. Vercel will automatically detect it's a Vite project and configure the build settings:
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

6. Click "Deploy"

Your app will be live at `https://your-project-name.vercel.app`

#### Method 3: Deploy Button

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/geoboard-app)

### Deploy to Netlify

1. Push your code to GitHub

2. Go to [Netlify](https://netlify.com)

3. Click "Add new site" → "Import an existing project"

4. Connect to GitHub and select your repository

5. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`

6. Click "Deploy"

### Deploy to GitHub Pages

1. Install gh-pages:
```bash
npm install --save-dev gh-pages
```

2. Add to `package.json`:
```json
{
  "homepage": "https://yourusername.github.io/geoboard-app",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

3. Update `vite.config.ts`:
```ts
export default defineConfig({
  plugins: [react()],
  base: '/geoboard-app/'
})
```

4. Deploy:
```bash
npm run deploy
```

## Project Structure

```
geoboard-app/
├── src/
│   ├── components/
│   │   ├── Confetti.tsx
│   │   ├── Controls.tsx
│   │   ├── FeedbackAlert.tsx
│   │   ├── Geoboard.tsx
│   │   ├── Header.tsx
│   │   └── QuestionDisplay.tsx
│   ├── types/
│   │   └── index.ts
│   ├── utils/
│   │   ├── geometry.ts
│   │   ├── questions.ts
│   │   └── validation.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
└── README.md
```

## How to Use

1. **Choose Topic**: Select between Triangles (三角形) or Quadrilaterals (四邊形)
2. **Choose Difficulty**: Easy (容易) or Hard (困難)
3. **Draw Shape**: 
   - Click a point to start drawing
   - Move mouse to see preview line
   - Click another point to complete the line
4. **Submit**: Click "提交答案" to validate your shape
5. **Reset**: Use "全部重置" to clear and start over
6. **Next Question**: Click "下一題" for a new challenge

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this project for educational purposes.

## Author

Your Name - [GitHub](https://github.com/yourusername)

## Acknowledgments

- Built for Hong Kong students learning geometry
- Inspired by traditional physical geoboards used in mathematics education
