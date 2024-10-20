import React, { useState } from 'react';

const Calculator = () => {
  const [input, setInput] = useState(''); 
  const [evaluated, setEvaluated] = useState(false); 


  const handleInput = (value) => {
    if (evaluated) {
      setInput(value);
      setEvaluated(false);
    } else {
      setInput(input === '0' ? value : input + value);
    }
  };

  const handleOperator = (value) => {

    if (['+', '-', '*', '/'].includes(input.slice(-1))) return;
    

    if (evaluated) {
      setEvaluated(false);
    }

    setInput(input + value);
  };

  const clear = () => {
    setInput('');
    setEvaluated(false);
  };

  const calculate = () => {
    try {

      const result = eval(input); 
      setInput(result.toString());
      setEvaluated(true); 
    } catch (error) {
      setInput('Error');
      setEvaluated(true);
    }
  };

  const handleEqual = () => {
    calculate();
  };

  const handleDecimal = () => {
    const lastNumber = input.split(/[-+*/]/).pop();
    if (lastNumber && lastNumber.includes('.')) return;

    setInput(input + '.');
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-900 text-white">
      <div className="w-64 bg-gray-800 p-4 rounded-lg">

        <div className="mb-4 text-right text-3xl p-2 bg-gray-700 rounded-md">
          {input || '0'}
        </div>
        <div className="grid grid-cols-4 gap-2">
          <button onClick={clear} className="col-span-2 bg-red-500 p-4 rounded-md">
            AC
          </button>
          <button onClick={() => handleOperator('/')} className="bg-gray-500 p-4 rounded-md">
            ÷
          </button>
          <button onClick={() => handleOperator('*')} className="bg-gray-500 p-4 rounded-md">
            ×
          </button>

          <button onClick={() => handleInput('7')} className="bg-gray-600 p-4 rounded-md">
            7
          </button>
          <button onClick={() => handleInput('8')} className="bg-gray-600 p-4 rounded-md">
            8
          </button>
          <button onClick={() => handleInput('9')} className="bg-gray-600 p-4 rounded-md">
            9
          </button>
          <button onClick={() => handleOperator('-')} className="bg-gray-500 p-4 rounded-md">
            -
          </button>

          <button onClick={() => handleInput('4')} className="bg-gray-600 p-4 rounded-md">
            4
          </button>
          <button onClick={() => handleInput('5')} className="bg-gray-600 p-4 rounded-md">
            5
          </button>
          <button onClick={() => handleInput('6')} className="bg-gray-600 p-4 rounded-md">
            6
          </button>
          <button onClick={() => handleOperator('+')} className="bg-gray-500 p-4 rounded-md">
            +
          </button>

          <button onClick={() => handleInput('1')} className="bg-gray-600 p-4 rounded-md">
            1
          </button>
          <button onClick={() => handleInput('2')} className="bg-gray-600 p-4 rounded-md">
            2
          </button>
          <button onClick={() => handleInput('3')} className="bg-gray-600 p-4 rounded-md">
            3
          </button>
          <button onClick={handleEqual} className="row-span-2 bg-blue-500 p-4 rounded-md">
            =
          </button>

          <button onClick={() => handleInput('0')} className="col-span-2 bg-gray-600 p-4 rounded-md">
            0
          </button>
          <button onClick={handleDecimal} className="bg-gray-600 p-4 rounded-md">
            .
          </button>
        </div>
      </div>
    </div>
  );
};

export default Calculator;