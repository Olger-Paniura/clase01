// Nombre completo: [Tu Nombre Completo Aquí]

// 1. Representamos los puntos logísticos y las distancias entre ellos (Grafo)
const grafo = {
    'Almacén Central': { 'Hub Norte': 5, 'Hub Sur': 10 },
    'Hub Norte': { 'Almacén Central': 5, 'Centro de Acopio': 3, 'Hub Sur': 2 },
    'Hub Sur': { 'Almacén Central': 10, 'Hub Norte': 2, 'Destino Cliente': 12 },
    'Centro de Acopio': { 'Hub Norte': 3, 'Destino Cliente': 4 },
    'Destino Cliente': { 'Hub Sur': 12, 'Centro de Acopio': 4 }
};

// 2. Función para encontrar la ruta más corta (Algoritmo de Dijkstra simple)
function obtenerRutaOptima(grafo, inicio, fin) {
    const distancias = {};
    const previos = {};
    const noVisitados = new Set(Object.keys(grafo));

    // Inicializamos distancias: 0 para el inicio y "Infinito" para el resto
    for (let nodo of noVisitados) {
        distancias[nodo] = Infinity;
    }
    distancias[inicio] = 0;

    // Procesamos todos los nodos
    while (noVisitados.size > 0) {
        // Buscamos el nodo no visitado con la menor distancia registrada
        let nodoActual = null;
        for (let nodo of noVisitados) {
            if (nodoActual === null || distancias[nodo] < distancias[nodoActual]) {
                nodoActual = nodo;
            }
        }

        // Si alcanzamos el destino o no hay más nodos alcanzables, terminamos
        if (nodoActual === fin || distancias[nodoActual] === Infinity) {
            break;
        }

        noVisitados.delete(nodoActual);

        // Revisamos los vecinos del nodo actual
        for (let vecino in grafo[nodoActual]) {
            let nuevaDistancia = distancias[nodoActual] + grafo[nodoActual][vecino];
            if (nuevaDistancia < distancias[vecino]) {
                distancias[vecino] = nuevaDistancia;
                previos[vecino] = nodoActual; // Guardamos el camino
            }
        }
    }

    // 3. Reconstruimos el camino hacia atrás desde el final hacia el inicio
    const camino = [];
    let paso = fin;
    while (paso) {
        camino.unshift(paso);
        paso = previos[paso];
    }

    // 4. Imprimimos el resultado con el formato exacto requerido
    const rutaFormateada = camino.join(' ➔ ');
    console.log(`Ruta de envío óptima de [${inicio}] a [${fin}]: ${rutaFormateada}`);
}

// Ejemplo de uso:
obtenerRutaOptima(grafo, 'Almacén Central', 'Destino Cliente');
    // PANIURA HUAMANI OLGER JESUS 
    
