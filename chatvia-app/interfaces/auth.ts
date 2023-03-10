interface User {
    _id?: string;
    username: string;
    password: string;
    email?: string;
    first_name?: string;
    last_name?: string;
}

interface Props {
    csrfToken: any;
    // session: any;
};

export type { User, Props };

export type WithAuthentication<P = unknown> = P & {
    requiresAuthentication?: {}
}
