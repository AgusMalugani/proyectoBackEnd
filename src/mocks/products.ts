export interface IProducts{
    id: number;
    name: string;
    description: string;
    price: number;
    stock: boolean;
    imgUrl: string;
};


export const productsArray:IProducts[]= 
[
    {
        id: 1,
        name: "Laptop",
        description: "Laptop de alta gama con pantalla de 15 pulgadas",
        price: 1200,
        stock: true,
        imgUrl: "https://example.com/laptop.jpg"
      },
      {
        id: 2,
        name: "Smartphone",
        description: "Smartphone con cámara de 64 MP y 128 GB de almacenamiento",
        price: 800,
        stock: true,
        imgUrl: "https://example.com/smartphone.jpg"
      },
      {
        id: 3,
        name: "Auriculares Inalámbricos",
        description: "Auriculares con cancelación de ruido y batería de larga duración",
        price: 150,
        stock: false,
        imgUrl: "https://example.com/auriculares.jpg"
      },
      {
        id: 4,
        name: "Monitor",
        description: "Monitor 4K UHD de 27 pulgadas",
        price: 300,
        stock: true,
        imgUrl: "https://example.com/monitor.jpg"
      },
      {
        id: 5,
        name: "Teclado Mecánico",
        description: "Teclado mecánico RGB con interruptores azules",
        price: 100,
        stock: true,
        imgUrl: "https://example.com/teclado.jpg"
      }
];