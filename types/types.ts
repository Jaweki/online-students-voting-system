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

export type InputState = {
    title: string;
    desc: string;
    tags: string;
    time_span: {
      from: string;
      to: string;
    };
    type: {
      binary: boolean;
      candidate: Array<{ userId: string; slogan: string; desc: string }>;
    };
    admin?: string;
    _id?: string;
    votes?: {
        up: number;
        down: number;
    }
  };


export type Ballot = {
    title: string;
    desc: string;
    tags: string[];
    time_span: {
      from: string;
      to: string;
    };
    type: {
      binary: boolean;
      candidate: Array<{ userId: string; slogan: string; desc: string }>;
    };
    admin?: string;
    _id?: string;
    votes?: {
        up: number;
        down: number;
    }
  };

  export type UserToBallotRelationType = {
    userId: string;
    relation: Array<{
      ballot_id: string;
      type: {
        binary: boolean;
        candidate: string;
        vote: string;
      }
    }>
  }