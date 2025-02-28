// ¿Es JSONBIN seguro ?
// Ni siquiera almacenamos los tokens de autenticación en nuestro extremo.Además,
// sus datos están seguros y protegidos.No compartimos los datos con ninguna otra empresa para 
// publicidad ni nada relacionado.Puede solicitar la eliminación de su cuenta y todos los datos 
// relacionados con su cuenta se borrarán por completo de nuestros servidores.



export const masterKey = '$2a$10$FiIl9wfiJtIoBGuhnKBQUOqNLhimtxTTilPTlThCIp7iwJh8YJ4SO'
export const rutaUsuarios = 'https://api.jsonbin.io/v3/b/67b9daa4e41b4d34e498250d'
export const rutaViajes = 'https://api.jsonbin.io/v3/b/67bb3111acd3cb34a8edb1cd'


// Permite obtener informacion pasando llave maestra e id
export async function getJson(url, masterKey) {
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "X-Master-Key": masterKey
            }
        });
        if (!response.ok) {
            throw new Error("Error al obtener los datos JSON");
        }
        const result = await response.json();
        return result
    } catch (error) {
        console.error("Error:", error.message);
    }
};




// export async function uploadJson(url, masterKey, data) {

//     try {
//         const response = await fetch(url, {
//             method: "PUT",
//             headers: {
//                 "Content-Type": "application/json",
//                 "X-Master-Key": masterKey
//             },
//             body: JSON.stringify(data)
//         });
//         if (!response.ok) {
//             throw new Error("Error al subir los datos JSON");
//         }

//         const result = await response.json();
//         console.log("Datos subidos con éxito:", result);
//     } catch (error) {
//         console.error("Error:", error.message);
//     }
// };