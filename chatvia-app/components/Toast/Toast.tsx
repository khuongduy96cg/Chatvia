import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'

import "react-toastify/dist/ReactToastify.css"
import { toast as toastFn, ToastContainer } from "react-toastify"
import { toastEmitter } from '@/redux/slices/toastSlice'
import { ToastState } from '@/interfaces/Itoast'

const customId = 'toast-id'

function Toast() {
    const value = useSelector((state: RootState) => state.toast.value as ToastState)
    const dispatch = useDispatch()
    //const toastId = React.useRef(null);
    const onCloseToast = () => {
        dispatch(toastEmitter({ isShow: false, message: '' }))
    }

    useEffect(() => {
        if (value.isShow) {

            let isActive = toastFn.isActive(customId);

            if (!isActive) {
                if (value.isError) {
                    toastFn.error(value.message, {
                        toastId: customId,
                        onOpen: () => {

                        },
                        onClose: onCloseToast
                    })
                }
                else {
                    toastFn(value.message, {
                        toastId: customId,
                        onOpen: () => {

                        },
                        onClose: onCloseToast
                    })
                }
            }
            else {
                toastFn.update(customId, {
                    render: value.message, // it can be a Component
                    //type: 
                    //autoClose: 5000,
                    //className:
                    onClose: onCloseToast
                })
            }
        }
    }, [value.isShow, value.message])

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light" />
        </>
    )
}

export default Toast
