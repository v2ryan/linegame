import React, { useState, useEffect, useRef } from 'react';
import type { Topic, Difficulty, Question, Line, Point, Feedback } from './types';
import { generateQuestion } from './utils/questions';
import { getPolygonVertices, isSamePoint, GRID_STEP } from './utils/geometry';
import { validateShape } from './utils/validation';
import Header from './components/Header';
import QuestionDisplay from './components/QuestionDisplay';
import Geoboard from './components/Geoboard';
import Controls from './components/Controls';
import FeedbackAlert from './components/FeedbackAlert';
import Confetti from './components/Confetti';

const App: React.FC = () => {
  const [topic, setTopic] = useState<Topic>('triangle');
  const [difficulty, setDifficulty] = useState<Difficulty>('easy');
  const [question, setQuestion] = useState<Question>(generateQuestion('triangle', 'easy'));
  
  const [lines, setLines] = useState<Line[]>([]);
  const [drawingStart, setDrawingStart] = useState<Point | null>(null);
  const [mousePos, setMousePos] = useState<{x: number, y: number} | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    setLines([...question.staticLines]);
    setFeedback(null);
    setDrawingStart(null);
    setMousePos(null);
    setShowConfetti(false);
  }, [question]);

  const handleTopicChange = (t: Topic) => {
    setTopic(t);
    setQuestion(generateQuestion(t, difficulty));
  };

  const handleDifficultyChange = (d: Difficulty) => {
    setDifficulty(d);
    setQuestion(generateQuestion(topic, d));
  };

  const handleNextQuestion = () => {
    setQuestion(generateQuestion(topic, difficulty));
  };

  const handleReset = () => {
    setLines([...question.staticLines]);
    setDrawingStart(null);
    setMousePos(null);
    setFeedback(null);
    setShowConfetti(false);
  };

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement> | React.TouchEvent<SVGSVGElement>) => {
    if (!drawingStart || !svgRef.current) return;

    const svg = svgRef.current;
    const pt = svg.createSVGPoint();
    
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    pt.x = clientX;
    pt.y = clientY;

    const svgP = pt.matrixTransform(svg.getScreenCTM()?.inverse());
    
    setMousePos({ x: svgP.x, y: svgP.y });
  };

  const handlePointClick = (x: number, y: number) => {
    const clickedPoint = { x, y };

    if (!drawingStart) {
      setDrawingStart(clickedPoint);
      setMousePos({ x: x * GRID_STEP, y: y * GRID_STEP });
      return;
    }

    if (isSamePoint(drawingStart, clickedPoint)) {
      setDrawingStart(null);
      setMousePos(null);
      return;
    }

    const alreadyExists = lines.some(l => 
      (isSamePoint(l.start, drawingStart) && isSamePoint(l.end, clickedPoint)) ||
      (isSamePoint(l.end, drawingStart) && isSamePoint(l.start, clickedPoint))
    );

    if (alreadyExists) {
      setFeedback({ msg: "呢條線已經畫過啦！", type: 'info' });
      setDrawingStart(null);
      setMousePos(null);
      return;
    }

    const newLine: Line = {
      start: drawingStart,
      end: clickedPoint,
      id: `u-${Date.now()}`,
      type: 'user'
    };

    setLines([...lines, newLine]);
    setDrawingStart(null);
    setMousePos(null);
    setFeedback(null);
  };

  const validate = () => {
    const vertices = getPolygonVertices(lines);

    if (!vertices) {
      setFeedback({ msg: "個形狀好似未封閉，或者有線條重疊左？試下檢查下。", type: 'error' });
      return;
    }

    const result = validateShape(vertices, question);
    
    if (result) {
      setFeedback(result);
      if (result.type === 'success') {
        setShowConfetti(true);
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-100 p-2 md:p-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
        
        <Header 
          topic={topic}
          difficulty={difficulty}
          onTopicChange={handleTopicChange}
          onDifficultyChange={handleDifficultyChange}
        />

        <div className="p-4 md:p-6">
          <QuestionDisplay question={question} difficulty={difficulty} />

          <div className="flex flex-col lg:flex-row gap-8 items-start justify-center">
            <Geoboard 
              lines={lines}
              drawingStart={drawingStart}
              mousePos={mousePos}
              onPointClick={handlePointClick}
              onMouseMove={handleMouseMove}
              svgRef={svgRef}
            />

            <Controls 
              onReset={handleReset}
              onNext={handleNextQuestion}
              onValidate={validate}
              lines={lines}
              question={question}
            />
          </div>
        </div>

        {feedback && <FeedbackAlert feedback={feedback} />}
      </div>
      
      {showConfetti && <Confetti />}
    </div>
  );
};

export default App;
