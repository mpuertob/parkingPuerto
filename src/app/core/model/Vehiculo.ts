export abstract class Vehiculo {
  constructor(private _modelo: String, private _matricula: String) {}
  public get modelo(): String {
    return this._modelo;
  }
  public get matricula(): String {
    return this._matricula;
  }
  public set modelo(cadenaModelo: String) {
    this._modelo = cadenaModelo;
  }
  public set matricula(cadenaMatricula: String) {
    this._matricula = cadenaMatricula;
  }
  public abstract toString();
}
