const { response } = require('express')
const Usuario = require('../models/Usuario')
const bcrypt = require('bcryptjs')
const { generateJWT } = require('../helpers/jwt')

const crearUsuario = async (req, res = response) => {

  const { name, email, password } = req.body
  
  try{
    
    let usuario = await Usuario.findOne({email})
    console.log('usuario::', usuario)
  
    if(usuario){
      return res.status(400).json({
        ok: false,
        msg: 'Ya existe un usuario con este email'
      })
    }

    usuario = new Usuario(req.body);

    //Encriptar contraseña
    const salt = bcrypt.genSaltSync()
    usuario.password = bcrypt.hashSync(password, salt)

    await usuario.save()

    //Generar JWT
    const token = await generateJWT(usuario.id, usuario.name)

    res.status(201).json({
      ok: true,
      uid: usuario.id,
      name: usuario.name,
      token
    })
  }catch(error){
    res.status(500).json({
      ok: false,
      msg: 'Por favor hable con el administrador'
    })
  }
  
}

const loginUsuario = async (req, res = response) => {
  const { email, password } = req.body  
  
  try {
    const usuario = await Usuario.findOne({email})
    console.log('usuario::', usuario)
  
    if(!usuario){
      return res.status(400).json({
        ok: false,
        msg: 'El usuario no existe con esse email'
      })
    }


    //Confirmar los passwords
    const validPassword = bcrypt.compareSync(password, usuario.password)

    if(!validPassword){
      return res.status(400).json({
        ok: false,
        msg: 'Password incorrecto'
      })
    }


    //Generar JWT

    const token = await generateJWT(usuario.id, usuario.name)
    console.log('TOKEN', token)

    res.json({
      ok: true,
      uid: usuario.id,
      name: usuario.name,
      token
    })

  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'Por favor hable con el administrador'
    })
  }
}

const revalidarToken = (req, res = response) => {  
  res.json({
    ok: true,
    msg: 'Renew'
  })
}

module.exports = { crearUsuario, loginUsuario, revalidarToken }