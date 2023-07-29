import { Tarea } from "./tarea.js";

export class Tareas {
  _listado = {};

  get listadoArray() {
    const listado = [];

    Object.keys(this._listado).forEach((key) => {
      const tarea = this._listado[key];
      listado.push(tarea);
    });

    return listado;
  }

  constructor() {
    this._listado = {};
  }

  borrarTarea(id = "") {
    if (this._listado[id]) {
      delete this._listado[id];
    }
  }

  cargarTareasFromArray(tareas = []) {
    tareas.forEach((tarea) => {
      this._listado[tarea.id] = tarea;
    });

    // this._listado[tareas.id] = tareas;
  }

  crearTarea(desc = "") {
    const tarea = new Tarea(desc);
    this._listado[tarea.id] = tarea;
  }

  listadoCompleto() {
    console.log();
    this.listadoArray.forEach((tarea, i) => {
      const index = `${i + 1}`.green;
      console.log(
        `${index}. ${tarea.desc} :: ${
          tarea.completadoEn ? "Completada".green : "Pendiente".red
        }`
      );
    });
  }

  listarTareasCompletadas() {
    console.log();
    let contador = 0;

    this.listadoArray.forEach((tarea) => {
      if (tarea.completadoEn) {
        contador += 1;
        console.log(
          `${(contador + ".").green}  ${tarea.desc} :: ${
            tarea.completadoEn.green
          }`
        );
      }
    });
  }

  listarTareasPendientes() {
    console.log();
    let contador = 0;

    this.listadoArray.forEach((tarea, i) => {
      const index = `${i + 1}`.green;

      if (!tarea.completadoEn) {
        contador += 1;
        console.log(
          `${(contador + ".").green}  ${tarea.desc} :: ${"Pendiente".red}`
        );
      }
    });
  }

  toggleCompletadas(ids = []) {
    ids.forEach((id) => {
      const tarea = this._listado[id];

      if (!tarea.completadoEn) {
        tarea.completadoEn = new Date().toISOString();
      }
    });

    this.listadoArray.forEach((tarea) => {
      if (!ids.includes(tarea.id)) {
        this._listado[tarea.id].completadoEn = null;
      }
    });
  }
}
