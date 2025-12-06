import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [tareas, setTareas] = useState([]);
  const [titulo, setTitulo] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const backendURL = "http://localhost:3000"; // puerto del backend

  // Traer todas las tareas al cargar
  useEffect(() => {
    setLoading(true);
    axios.get(`${backendURL}/tareas`)
      .then(res => setTareas(res.data))
      .catch(err => {
        console.error("Error al obtener tareas:", err);
        if (err.response) {
          setError(`Error ${err.response.status}: ${err.response.data.error || err.response.statusText}`);
        } else if (err.request) {
          setError("No se pudo conectar con el backend");
        } else {
          setError(err.message);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  // Agregar tarea
  const agregarTarea = () => {
    if (!titulo.trim()) return setError("El título no puede estar vacío");

    setLoading(true);
    axios.post(`${backendURL}/tareas`, { titulo })
      .then(res => {
        setTareas(prev => [...prev, res.data]);
        setTitulo("");
        setError("");
      })
      .catch(err => {
        console.error("Error al agregar tarea:", err);
        if (err.response) {
          setError(`Error ${err.response.status}: ${err.response.data.error || err.response.statusText}`);
        } else if (err.request) {
          setError("No se pudo conectar con el backend");
        } else {
          setError(err.message);
        }
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-4xl font-bold mb-6">Lista de Tareas</h1>

      <div className="w-full max-w-md mb-4">
        <input
          type="text"
          value={titulo}
          onChange={e => setTitulo(e.target.value)}
          placeholder="Nueva tarea"
          className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={agregarTarea}
          className="w-full mt-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-colors"
          disabled={loading}
        >
          {loading ? "Cargando..." : "Agregar Tarea"}
        </button>
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <ul className="w-full max-w-md space-y-2">
        {tareas.map(t => (
          <li
            key={t.id}
            className="bg-white p-3 rounded-lg shadow flex justify-between items-center"
          >
            <span>{t.titulo}</span>
            <span className="text-sm text-gray-500">{t.estado}</span>
          </li>
        ))}
      </ul>

      {tareas.length === 0 && !loading && (
        <p className="text-gray-500 mt-4">No hay tareas aún</p>
      )}
    </div>
  );
}

export default App;
