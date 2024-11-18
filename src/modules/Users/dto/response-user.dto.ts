
export class ResponseUserDto{
    email: string   
    name: string
    password: string
    address: string
    phone: string
    country?: string | undefined
    city?: string | undefined
 
    constructor(data: Partial<ResponseUserDto>) {
      const { password, ...rest } = data as any; 
      Object.assign(this, rest);
    }


    }