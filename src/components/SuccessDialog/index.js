import { useState } from "react"

import { Snackbar } from "@material-ui/core"
import { Alert } from "@material-ui/lab"

const SuccessDialog = ({ success }) => {

  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    if(open) {
      setOpen(false)
    } else {
      setOpen(true)
    }
  }

  return (
    <div>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onclose={handleOpen}
      >
        <Alert onclose={handleOpen} severity="success" sx={{ width: '100%' }}>
          成功です！
        </Alert>
      </Snackbar>
    </div>
  )
}

export default SuccessDialog
