import userService from "../models/user.model.js"
import bcrypt from "bcrypt"

let globalMessage = '';
export const setMessage = (message) => {
  globalMessage = message;
};

export const getMessage = () => {
  const message = globalMessage;
  globalMessage = '';
  return message;
};

/* This action is triggered after clicking the link in the email reset password */
export const resetPassword = async(req,res) => {
    let tid = req.params.tid
    const message = getMessage();

    const htmlRespose = `
    <html>
    <head>
        <title>TRANSCURRIN || TRANSPORTE Y LOGISTICA </title>
    </head>
    <body>
    <h1>ESTABLECER PASSWORD</h1>

     ${message ? `<p style="color: red;">${message}</p>` : ''}

    <h2>Ingresa nueva contraseña</h2>
       <form method="post" action="http://localhost:8080/api/changePassword/${tid}" >
            <input type="password" name="password" placeholder="Escriba nueva contraseña">
            <button type="submit">RESTABLECER CONTRASEÑA</button>
        </form>
    </body>
    </html>`
    res.send(htmlRespose)
}

/* This action changes password after resetPassword function  */
export const changePassword = async(req,res) =>{
    const token = req.params.tid;
    const {password} = req.body

    let userFound = await userService.findOne({resetToken: token})
    if (!userFound) return res.status(400).json({ message: "Usuario no encontrado" });

    const isSamePassword = await bcrypt.compare(password, userFound.password)
    if(isSamePassword){
        setMessage("La contraseña no puede ser igual a la anterior")
        return resetPassword(req, res);
    }
    const hash = await bcrypt.hashSync(password, bcrypt.genSaltSync(10))
    userFound.password = hash
    userFound.verificado = true
    userFound.resetToken = ""
    await userService.updateOne({_id: userFound._id}, userFound)

    res.send(`
    <html>
    <body>
        <h3>Contraseña actualizada</h3>
        <script>
            setTimeout(function() {
                window.location.href = 'http://localhost:5173/';
            }, 3000);
        </script>
    </body>
    </html>
`);
}


export const verifyEmail = async(req,res) => {
    const {email} = req.body
    let userFound = await userService.findOne({email: email})
    if (userFound) {
        res.json(true);
    } else {
        res.json(false);
    }
}   