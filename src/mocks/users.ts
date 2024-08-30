export interface IUser {
    id: number,
    email: string,
    name: string,
    password: string,
    address: string,
    phone: string,
    country?: string,
    city?: string,
  };
  
  export const usersArray: IUser[] = [
    {
      id: 1,
      email: "john.doe@example.com",
      name: "John Doe",
      password: "password123",
      address: "123 Main St, Springfield",
      phone: "+1-555-1234",
      country: "USA",
      city: "Springfield"
    },
    {
      id: 2,
      email: "jane.smith@example.com",
      name: "Jane Smith",
      password: "securepass456",
      address: "456 Elm St, New York",
      phone: "+1-555-5678",
      country: "USA",
      city: "New York"
    },
    {
      id: 3,
      email: "michael.brown@example.com",
      name: "Michael Brown",
      password: "mypass789",
      address: "789 Oak St, Los Angeles",
      phone: "+1-555-8765",
      country: "USA",
      city: "Los Angeles"
    },
    {
      id: 4,
      email: "lisa.white@example.com",
      name: "Lisa White",
      password: "lisapass123",
      address: "321 Pine St, Miami",
      phone: "+1-555-4321",
      country: "USA",
      city: "Miami"
    },
    {
      id: 5,
      email: "david.jones@example.com",
      name: "David Jones",
      password: "davidpass456",
      address: "654 Cedar St, Boston",
      phone: "+1-555-9876",
      country: "USA",
      city: "Boston"
    }
  ];
  