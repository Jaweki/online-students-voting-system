export type FunctionalityData = {
    title: string,
    desc: string,
    icon: string,
}

export type InputsObject = {
    name: string,
    email: string,
    userId: string,
    avatar: string,
    password: string,
    role?: string,
    accessKey?: string,
}

export type RegistrationStatusObject = {
    type: string,
    email: string,
    error: string,
}

export type RegisteredUserObject = {
    name: string,
    email: string,
    userId: string,
    avatar: string,
    role: string,
}

type user = {
    user: RegisteredUserObject;
  };
  
export type UserSessionType = {
    update: any;
    data: user | null;
    status: "authenticated" | "loading" | "unauthenticated";
  };