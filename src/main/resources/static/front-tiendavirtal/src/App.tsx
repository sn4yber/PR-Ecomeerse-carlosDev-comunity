import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white text-center">
          <h1 className="text-3xl font-bold mb-2">
             Tailwind CSS v4
          </h1>
          <p className="text-blue-100">
            ¡Funcionando perfectamente!
          </p>
        </div>
        
        <div className="p-8 text-center space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold text-gray-800">
              Contador de Prueba
            </h2>
            <p className="text-gray-600">
              React + TypeScript + Vite + Tailwind
            </p>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="text-4xl font-bold text-indigo-600 mb-4">
              {count}
            </div>
            <button
              onClick={() => setCount(count + 1)}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 px-8 rounded-lg shadow-lg transform transition duration-200 hover:scale-105 active:scale-95"
            >
              Incrementar
            </button>
          </div>
          
          <div className="flex gap-2 justify-center">
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
              ✅ Tailwind
            </span>
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
              ⚡ Vite
            </span>
            <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
              ⚛️ React
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
