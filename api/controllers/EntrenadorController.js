/**
 * EntrenadorController
 *
 * @description :: Server-side logic for managing Entrenadors
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  crearEntrenador: function (req, res) {

    if (req.method == "POST") {

      var parametros = req.allParams();

      if (parametros.nombres && parametros.fechaInicio) {

        var usuarioCrear = {
          nombres: parametros.nombres,
          fechaInicio: parametros.fechaInicio,
          region: parametros.region
        }

        if (usuarioCrear.region == "") {
          delete usuarioCrear.region
        }

        Usuario.create(usuarioCrear).exec(function (err, usuarioCreado) {

          if (err) {
            return res.view('vistas/Error', {
              error: {
                desripcion: "Fallo al crear el Usuario",
                rawError: err,
                url: "/CrearUsuario"
              }

            });
          }

          Usuario.find()
            .exec(function (errorIndefinido, usuariosEncontrados) {

              if (errorIndefinido) {
                res.view('vistas/Error', {
                  error: {
                    desripcion: "Hubo un problema cargando los Usuarios",
                    rawError: errorIndefinido,
                    url: "/ListarUsuarios"
                  }
                });
              }

              res.view('vistas/Usuario/ListarUsuarios', {
                usuarios: usuariosEncontrados
              });
            })

        })


      } else {

        return res.view('vistas/Error', {
          error: {
            desripcion: "Llena todos los parametros, fechaInicio y nombres",
            rawError: "Fallo en envio de parametros",
            url: "/CrearUsuario"
          }

        });

      }


    } else {

      return res.view('vistas/Error', {
        error: {
          desripcion: "Error en el uso del Metodo HTTP",
          rawError: "HTTP Invalido",
          url: "/CrearUsuario"
        }
      });

    }

  },
  BorrarUsuario: function (req, res) {

    var parametros = req.allParams();

    if (parametros.id) {

      Usuario.destroy({
        id: parametros.id
      }).exec(function (errorInesperado, UsuarioRemovido) {
        if (errorInesperado) {
          return res.view('vistas/Error', {
            error: {
              desripcion: "Tuvimos un Error Inesperado",
              rawError: errorInesperado,
              url: "/ListarUsuarios"
            }
          });
        }
        Usuario.find()
          .exec(function (errorIndefinido, usuariosEncontrados) {

            if (errorIndefinido) {
              res.view('vistas/Error', {
                error: {
                  desripcion: "Hubo un problema cargando los Usuarios",
                  rawError: errorIndefinido,
                  url: "/ListarUsuarios"
                }
              });
            }

            res.view('vistas/Usuario/ListarUsuarios', {
              usuarios: usuariosEncontrados
            });
          })
      })

    } else {
      return res.view('vistas/Error', {
        error: {
          desripcion: "Necesitamos el ID para borrar al Usuario",
          rawError: "No envia ID",
          url: "/ListarUsuarios"
        }
      });
    }
  },
  editarUsuario: function (req, res) {
    var parametros = req.allParams();

    if (parametros.idUsuario && (parametros.nombres || parametros.fechaInicio || parametros.region)) {


      var usuarioAEditar = {
        nombres: parametros.nombres,
        fechaInicio: parametros.fechaInicio,
        region: parametros.region,
        password: parametros.password
      }

      if (usuarioAEditar.nombres == "") {
        delete usuarioAEditar.nombres
      }

      if (usuarioAEditar.fechaInicio == "") {
        delete usuarioAEditar.fechaInicio
      }

      if (usuarioAEditar.region == "") {
        delete usuarioAEditar.region
      }
      if (usuarioAEditar.password == "") {
        delete usuarioAEditar.password
      }


      Usuario.update({
        id: parametros.idUsuario
      }, usuarioAEditar).exec(function (errorInesperado, UsuarioRemovido) {
        if (errorInesperado) {
          return res.view('vistas/Error', {
            error: {
              desripcion: "Tuvimos un Error Inesperado",
              rawError: errorInesperado,
              url: "/ListarUsuarios"
            }
          });
        }
        Usuario.find()
          .exec(function (errorIndefinido, usuariosEncontrados) {

            if (errorIndefinido) {
              res.view('vistas/Error', {
                error: {
                  desripcion: "Hubo un problema cargando los Usuarios",
                  rawError: errorIndefinido,
                  url: "/EditarUsuario"
                }
              });
            }

            res.view('vistas/Usuario/ListarUsuarios', {
              usuarios: usuariosEncontrados
            });
          })
      })

    } else {
      return res.view('vistas/Error', {
        error: {
          desripcion: "Necesitamos que envies los parámetros ",
          rawError: "No envia Parámetros",
          url: "/ListarUsuarios"
        }
      });
    }

  }


};

