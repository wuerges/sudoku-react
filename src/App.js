import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {

  var aux = [
    [5,3,0,0,7,0,0,0,0],
    [6,0,0,1,9,5,0,0,0],
    [0,9,8,0,0,0,0,6,0],
    [8,0,0,0,6,0,0,0,3],
    [4,0,0,8,0,3,0,0,1],
    [7,0,0,0,2,0,0,0,6],
    [0,6,0,0,0,0,2,8,0],
    [0,0,0,4,1,9,0,0,5],
    [0,0,0,0,8,0,0,7,9],
  ];

  const [board, setBoard] = useState(aux);

  // function check(aux) {
  //   for(var i = 0; i < 9; ++i) {
  //     var line = new Set();
  //     for (var j = 0; j < 9; ++j) {
  //       const el = aux[i][j];
  //       if (line.has(el)) {
  //         return false;
  //       }
  //       line.add(el);
  //     }
  //   }
  //   return true;
  // }

  function group(i, j) {
    return Math.floor(i / 3) * 3 + Math.floor(j / 3);
  }
  
  function valid(aux, i, j) {
    var x = [];
    var s = new Set();
    for (var ii = 0; ii < 9; ++ii) {
      for (var jj = 0; jj < 9; ++jj) {
        if(group(ii, jj) == group(i, j)) {
          s.add(aux[ii][jj]);
        }
      }
    }
    for(var ii = 0; ii < 9; ++ii) {
      s.add(aux[i][ii]);
      s.add(aux[ii][j]);
    }
    for (var k = 1; k <= 9; ++k) {
      if(!s.has(k)) {
        x.push(k);
      }
    }
    return x;
  }

  function doSolve(aux, i, j) {
    if(i===9) {
      return true;
    }
    if(j===9) {
      return doSolve(aux, i+1, 0);
    }
    
    if(aux[i][j] === 0) {
      const x = valid(aux, i, j);
      for(var ii = 0; ii < x.length; ++ii) {
        aux[i][j] = x[ii];
        if (doSolve(aux, i, j+1)) {
          return true;
        }
        aux[i][j] = 0;
      }
    }
    else {
      return doSolve(aux, i, j+1);
    }
    return false;
  }

  function solve() {
    
    var aux = [
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
    ];
    for (var ii = 0; ii < 9; ++ii) {
      for (var jj = 0; jj < 9; ++jj) {
        aux[ii][jj] = board[ii][jj];
      }
    }
    doSolve(aux,0,0);
    
    setBoard(aux);
    
  }
  // solve();
  
  return (
    <div>
      <table>
        <tbody>
          {board.map((row, i) =>
            <tr key={`row_${i}`}> 
              {row.map((cell,j) => <td key={`cell_${j}`}>{cell}</td> )}
            </tr>
          )}        
        </tbody>
      </table>
      <button onClick={solve}> Solve </button>
    </div>
  );
}

export default App;
