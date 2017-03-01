/**
 * RotasController
 *
 * @description :: Server-side logic for managing rotas
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  home: function (req, res) {
    return res.view('vistas/home');
  },
  crearEntrenador: function (req, res) {
    return res.view('Entrenador/crearEntrenador');
  },
  error: function (req, res) {
    return res.view('vistas/Error', {
      error: {
        desripcion: "Usted esta por error en esta Ruta dirijase a Inicio",
        rawError: "Ruta equivocada",
        url: "/Inicio"
      }
    });
  },
  listarEntrenadores: function (req, res) {
    Entrenador.find()
      .exec(function (errorIndefinido, entrenadoresEncontrados) {

        if (errorIndefinido) {
          res.view('vistas/Error', {
            error: {
              desripcion: "Hubo un problema cargando los Entrenadores",
              rawError: errorIndefinido,
              url: "/ListarEntrenadores"
            }
          });
        }

        res.view('Entrenador/listarEntrenadores', {
          entrenadores: entrenadoresEncontrados
        });
      })
  },
  editarEntrenador: function (req, res) {
    var parametros = req.allParams();
    if (parametros.id) {
      Entrenador.findOne({
        id: parametros.id
      }).exec(function (errorInesperado, entrenadorEncontrado) {
        if (errorInesperado) {
          return res.view('vistas/Error', {
            error: {
              desripcion: "Error Inesperado",
              rawError: errorInesperado,
              url: "/ListarEntrenadores"
            }
          });
        }
        if(entrenadorEncontrado){
          return res.view("Entrenador/editarEntrenador",{
           entrenadorAEditar:entrenadorEncontrado
          });
        }else{
          return res.view('vistas/Error', {
            error: {
              desripcion: "El entrenador con id: "+parametros.id+" no existe.",
              rawError: "No existe el entrenador",
              url: "/ListarEntrenadores"
            }
          });
        }
      })
    } else {

      return res.view('vistas/Error', {
        error: {
          desripcion: "No ha enviado el parametro ID",
          rawError: "Faltan Parametros",
          url: "/ListarEntrenadores"
        }
      });

    }
  },
  crearPokemon: function (req, res) {
    Entrenador.find()
      .exec(function (errorIndefinido, entrenadoresEncontrados) {

        if (errorIndefinido) {
          res.view('vistas/Error', {
            error: {
              desripcion: "Hubo un problema cargando los Entrenadores",
              rawError: errorIndefinido,
              url: "/"
            }
          });
        }
        res.view('Pokemon/crearPokemon', {
          entrenadores: entrenadoresEncontrados
        });
      })
  }


  };

