- Me quede en que los usuarios no pueden logearse aun por que falta pasar el slug ala funcion del front
que conecta en la carpeta server
- actualmente solo se pasa email - password - falta pasar el slug
10/08/2025

- el lug ya esta configurado, la ruta ya recibe el lug correctamente !

- el login solo debe permitir hacer una sola ves iniciar sesion !
- se debe conectar correctamente el usser id con el estudiante id / revisar la funcion de traer al estudiante por id !

- Crear nuevas entidades para separar cada grupo de informacion 
- GradeEntityPriramryOne - Cada uno su propia malla curricular (subjects)
- GradeEntityPriramryTwo - Cursos: { comunica - matemati - personal social - etc }
- GradeEntityPriramryTree - { id:number; section: string; subjects:[]Cursos, Fk: id school: number }
- GradeEntityPriramryFour - 
- GradeEntityPriramryFive - 
- GradeEntityPriramrySix - 

- GradeEntitySecondaryOne - 
- GradeEntitySecondaryTwo - 
- GradeEntitySecondaryTree - 
- GradeEntitySecondaryFour - 
- GradeEntitySecondaryFive - 

- Creae la entidad para libreta de notas : GradeBookEtity y este estara vinculada a un solo colegio pero puede pertenecer a varios estudiantes, y solo puede ser modificado por el docente, y cuando lo modifquen de cargarse un historial de ultimas modificaciones, es decir debo crear una entidad que registre un historial de movimientos, cuando un profesor o alguien haga un movimiento, en mi base de datos estara registrado,

- nesesito pasar el grado el level y la seccion ala nueva funcion que sea trae los estudiantes por estos filtros en students

- ahora students retorna correctametne dos array de estudiantes ! 22 - 8 - 12 : 20 

- agregar correctamente la solicitud HTTPS tipo post al calendario, cualquier entidad relacionado a usuarios puede hacerlo menos el token de student 24 - 08 - 16 : 57 

- ahora nesesito poder editar los datos de usuario desde su perfil, incluyendo la actualizacion de imagen

