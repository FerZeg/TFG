interface Restaurante {
    _id: Object;
    nombre: string;
    direccion: string;
    telefono: string;
    platos: Plato[];
    mesas: Mesa[];
    contraseña: string;
    contraseña_mesas: string;
    cocineros: Cocineros[];
}
interface Mesa {
    _id: Object;
    identificador: string;
    estado: string;
    ticket: Ticket[];
}
interface Pedido {
    _id: Object;
    plato: string;
    cantidad: number;
    precio: number;
}
interface Ticket {
    _id: Object;
    total: number;
    pedido: Pedido[];
    estado: string;
}
interface Plato {
    _id: Object;
    nombre: string;
    precio: number;
    ingredientes: string[];
}
interface Cocineros {
    _id: Object;
    nombre: string;
    contraseña: string;
}