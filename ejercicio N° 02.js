// Caso 2: Ruta de evacuacion mas rapida en un edificio corporativo
// Algoritmo de Dijkstra

const edificio = {
  "Oficina 502": { "Pasillo Principal": 20 },
  "Pasillo Principal": { "Oficina 502": 20, "Escalera Este": 15, "Escalera Oeste": 25 },
  "Escalera Este": { "Pasillo Principal": 15, "Lobby": 40 },
  "Escalera Oeste": { "Pasillo Principal": 25, "Lobby": 20 },
  "Lobby": { "Escalera Este": 40, "Escalera Oeste": 20, "Zona Segura": 10 },
  "Zona Segura": { "Lobby": 10 }
};

function rutaMasRapida(grafo, inicio, fin) {
  const tiempos = {};
  const anterior = {};

  for (const nodo in grafo) {
    tiempos[nodo] = Infinity;
    anterior[nodo] = null;
  }
  tiempos[inicio] = 0;

  const pendientes = [inicio];

  while (pendientes.length > 0) {
    // Buscar el lugar con menor tiempo acumulado
    let actual = pendientes[0];
    for (const nodo of pendientes) {
      if (tiempos[nodo] < tiempos[actual]) actual = nodo;
    }

    if (actual === fin) break;

    pendientes.splice(pendientes.indexOf(actual), 1);

    for (const vecino in grafo[actual]) {
      const nuevoTiempo = tiempos[actual] + grafo[actual][vecino];
      if (nuevoTiempo < tiempos[vecino]) {
        tiempos[vecino] = nuevoTiempo;
        anterior[vecino] = actual;
        if (!pendientes.includes(vecino)) pendientes.push(vecino);
      }
    }
  }

  const ruta = [];
  let nodo = fin;
  while (nodo !== null) {
    ruta.unshift(nodo);
    nodo = anterior[nodo];
  }

  return { ruta, tiempo: tiempos[fin] };
}

const resultado = rutaMasRapida(edificio, "Oficina 502", "Zona Segura");

console.log("Ruta de evacuacion segura de Oficina 502 a Zona Segura:");
console.log(resultado.ruta.join(" -> "));
console.log("Tiempo estimado:", resultado.tiempo, "segundos");
