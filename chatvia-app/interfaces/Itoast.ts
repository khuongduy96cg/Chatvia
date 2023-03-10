// Define a type for the slice state
interface ToastState {
    isShow: boolean;
    message: string | null;
    config?: {
        autoClose: number;
    },
    isError?: boolean;
}

export type { ToastState }