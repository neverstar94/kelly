import React from 'react'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
function AlertMessage(props) {
    const { open, onClose, title, message, type = 'success', ...rest } = props;

    return (
        <>
            <Snackbar open={open} autoHideDuration={6000} onClose={onClose} {...rest} anchorOrigin={{
                vertical: 'top',
                horizontal: 'right'
            }}

                sx={{
                    width: "25%",
                    borderRadius: "2px",
                }}>
                <MuiAlert variant="filled" onClose={onClose} severity={type}
                    sx={{
                        width: '100%',
                        boxShadow: "0 0 6px rgba(0,0,0,.25)",
                        borderRadius: "2px",
                    }}>
                    {
                        title && (
                            <AlertTitle sx={{
                                fontWeight: "bold"
                            }}>
                                {title}
                            </AlertTitle>
                        )
                    }
                    {
                        message
                    }
                </MuiAlert>
            </Snackbar>
        </>
    )
}

export default AlertMessage