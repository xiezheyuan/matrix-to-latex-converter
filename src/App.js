import React, { useState } from 'react';

function MatrixToLatex() {
  const [matrixInput, setMatrixInput] = useState('1, 2, 3\n4, 5, 6\n7, 8, 9');
  const [delimiter, setDelimiter] = useState(',');
  const [style, setStyle] = useState('pmatrix');
  const [latexOutput, setLatexOutput] = useState('');

  const styles = ['pmatrix', 'vmatrix', 'bmatrix'];

  const generateLatex = () => {
    try {
      if (!styles.includes(style)) {
        throw new Error(`Unsupported LaTeX matrix style: ${style}. Supported styles are: ${styles.join(', ')}`);
      }

      const rows = matrixInput.trim().split('\n');
      let latexMatrix = `\\begin{${style}}\n`;

      for (const row of rows) {
        const elements = row.split(delimiter);
        const latexRow = elements.join(' & ') + '\\\\\n';
        latexMatrix += latexRow;
      }

      latexMatrix += `\\end{${style}}`;
      setLatexOutput(latexMatrix);
    } catch (error) {
      setLatexOutput(error.message);
    }
  };

  return (
    <div>
      <style>
        {`
          .app-container {
            padding: 20px;
            max-width: 600px;
            margin: auto;
            font-family: Arial, sans-serif;
            background-color: #f8f9fa;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }

          .title {
            text-align: center;
            margin-bottom: 20px;
            color: #343a40;
          }

          .matrix-input {
            width: 100%;
            height: 100px;
            margin-bottom: 10px;
            padding: 10px;
            box-sizing: border-box;
            border: 1px solid #ced4da;
            border-radius: 4px;
            resize: vertical;
            font-size: 16px;
            color: #212529;
            background-color: #fff;
          }

          .input-group {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
          }

          .delimiter-input {
            padding: 8px;
            flex: 1;
            margin-right: 10px;
            border: 1px solid #ced4da;
            border-radius: 4px;
            font-size: 16px;
            color: #212529;
            background-color: #fff;
          }

          .style-select {
            padding: 8px;
            flex: 1;
            margin-right: 10px;
            border: 1px solid #ced4da;
            border-radius: 4px;
            font-size: 16px;
            color: #212529;
            background-color: #fff;
          }

          .generate-button {
            padding: 8px 16px;
            background-color: #007bff;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            transition: background-color 0.3s;
            font-size: 16px;
          }

          .generate-button:hover {
            background-color: #0056b3;
          }

          .output-title {
            text-align: center;
            margin-bottom: 10px;
            color: #343a40;
          }

          .latex-output {
            padding: 10px;
            background-color: #ffffff;
            border: 1px solid #dee2e6;
            border-radius: 4px;
            white-space: pre-wrap;
            font-family: monospace;
            color: #212529;
          }
        `}
      </style>

      <div className="app-container">
        <h1 className="title">Matrix to LaTeX Converter</h1>
        <textarea
          value={matrixInput}
          onChange={(e) => setMatrixInput(e.target.value)}
          placeholder="Enter your matrix here, e.g.\n1, 2, 3\n4, 5, 6\n7, 8, 9"
          rows="5"
          cols="50"
          className="matrix-input"
        />
        <div className="input-group">
          <input
            type="text"
            value={delimiter}
            onChange={(e) => setDelimiter(e.target.value)}
            placeholder="Delimiter (default: ,)"
            className="delimiter-input"
          />
          <select value={style} onChange={(e) => setStyle(e.target.value)} className="style-select">
            {styles.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <button onClick={generateLatex} className="generate-button">
            Generate LaTeX
          </button>
        </div>
        <h2 className="output-title">LaTeX Output:</h2>
        <pre className="latex-output">{latexOutput || 'Generated LaTeX will appear here'}</pre>
      </div>
    </div>
  );
}

export default MatrixToLatex;




