import type { Question, Point, Feedback } from '../types';
import { getLengthSq, isRightAngle } from './geometry';

export const validateShape = (
  vertices: Point[], 
  question: Question
): Feedback | null => {
  
  if (vertices.length !== question.requiredVertices) {
    return { 
      msg: `題目要求畫${question.requiredVertices === 3 ? '三角形' : '四邊形'}，但你畫左個${vertices.length}邊形。`, 
      type: 'error' 
    };
  }

  let isValid = false;
  const successMsg = "答啱咗！好叻呀！🎉";

  // --- Shape Validation Logic ---
  
  // 1. Any Triangle
  if (question.type === 'tri-any') {
    if (vertices.length === 3) isValid = true;
  }

  // 2. Right Angle Triangle
  else if (question.type === 'right-tri') {
    const isR1 = isRightAngle(vertices[2], vertices[0], vertices[1]);
    const isR2 = isRightAngle(vertices[0], vertices[1], vertices[2]);
    const isR3 = isRightAngle(vertices[1], vertices[2], vertices[0]);
    if (isR1 || isR2 || isR3) {
      isValid = true;
    } else {
      return { msg: "呢個唔係直角三角形，揾唔到直角（90度）。", type: 'error' };
    }
  } 
  
  // 3. Isosceles Triangle
  else if (question.type === 'iso-tri') {
    const d1 = getLengthSq(vertices[0], vertices[1]);
    const d2 = getLengthSq(vertices[1], vertices[2]);
    const d3 = getLengthSq(vertices[2], vertices[0]);
    if (d1 === d2 || d1 === d3 || d2 === d3) {
      isValid = true;
    } else {
      return { msg: "呢個唔係等腰三角形，無兩條邊一樣長。", type: 'error' };
    }
  }

  // 4. Equilateral Triangle (Approx)
  else if (question.type === 'equi-tri') {
    const d1 = Math.sqrt(getLengthSq(vertices[0], vertices[1]));
    const d2 = Math.sqrt(getLengthSq(vertices[1], vertices[2]));
    const d3 = Math.sqrt(getLengthSq(vertices[2], vertices[0]));
    const diff = Math.max(d1, d2, d3) - Math.min(d1, d2, d3);
    if (diff < 0.5) {
      isValid = true;
    } else {
      return { msg: "邊長差別有啲大，試下再調整下？", type: 'error' };
    }
  }

  // 5. Square
  else if (question.type === 'square') {
    const dists: number[] = [];
    for(let i=0; i<4; i++) {
      for(let j=i+1; j<4; j++) {
        dists.push(getLengthSq(vertices[i], vertices[j]));
      }
    }
    dists.sort((a,b) => a-b);
    const sidesEqual = (dists[0] === dists[3]);
    const diagsEqual = (dists[4] === dists[5]);
    const diagGtSide = (dists[4] > dists[0]);

    if (sidesEqual && diagsEqual && diagGtSide) {
      isValid = true;
    } else {
      return { msg: "呢個唔係正方形。記得四條邊要一樣長，角要係直角。", type: 'error' };
    }
  }

  // 6. Rectangle
  else if (question.type === 'rect') {
     const isR0 = isRightAngle(vertices[3], vertices[0], vertices[1]);
     const isR1 = isRightAngle(vertices[0], vertices[1], vertices[2]);
     const isR2 = isRightAngle(vertices[1], vertices[2], vertices[3]);
     
     if (isR0 && isR1 && isR2) {
       isValid = true;
     } else {
       return { msg: "呢個好似唔係長方形喎？長方形嘅角要係直角。", type: 'error' };
     }
  }

  // 7. Parallelogram
  else if (question.type === 'para') {
    const d1 = getLengthSq(vertices[0], vertices[1]);
    const d2 = getLengthSq(vertices[1], vertices[2]);
    const d3 = getLengthSq(vertices[2], vertices[3]);
    const d4 = getLengthSq(vertices[3], vertices[0]);
    
    if (d1 === d3 && d2 === d4) {
      isValid = true;
    } else {
      return { msg: "平行四邊形要求對邊一樣長。", type: 'error' };
    }
  }

  // 8. Any Quad
  else if (question.type === 'quad-any') {
    if (vertices.length === 4) isValid = true;
  }

  if (isValid) {
    return { msg: successMsg, type: 'success' };
  }

  return null;
};
