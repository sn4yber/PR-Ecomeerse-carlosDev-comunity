import { useState } from 'react'
import { Header } from './components/layout'

function App() {
  const [count, setCount] = useState(0)

  // Datos mínimos para el menú - solo lo esencial para probar el componente
  const menuItems = [
    { id: 'home', label: 'Inicio', href: '/' },
    { id: 'products', label: 'Productos', href: '/productos' },
    { id: 'cart', label: 'Carrito', href: '/carrito' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header con menú hamburguesa */}
      <Header title="TiendaVirtual" menuItems={menuItems} />
      
      {/* Contenido principal - mantenemos el contador para verificar que todo funciona */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-purple-600 to-black p-6 text-white text-center">
            <h2 className="text-2xl font-bold mb-2">
              Contador de Prueba
            </h2>
            <p className="text-purple-100">
              Header funcionando!
            </p>
          </div>
          
          <div className="p-8 text-center space-y-6">
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-black bg-clip-text text-transparent mb-4">
                {count}
              </div>
              <button
                onClick={() => setCount(count + 1)}
                className="bg-gradient-to-r from-purple-600 to-black hover:from-purple-700 hover:to-gray-900 text-white font-semibold py-3 px-8 rounded-lg shadow-lg transform transition duration-200 hover:scale-105 active:scale-95"
              >
                Incrementar
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
