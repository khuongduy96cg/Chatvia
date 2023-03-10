interface User {
    username: string;
    password: string;
}

interface Props {
    csrfToken: any;
    // session: any;
};

export type { User, Props };

export type WithAuthentication<P = unknown> = P & {
    requiresAuthentication?: {}
}
