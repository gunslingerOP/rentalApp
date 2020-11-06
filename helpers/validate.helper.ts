export default class Validator{

    static register=(must = true)=>({
        firstName: {
            presence: must,
            type: "string",
          },
          middleName: {
            presence: must,
            type: "string",
          },
          lastName: {
            presence: must,
            type: "string",
          },
          email: {
            presence: must,
            type: "string",
          },
          phone: {
            presence: must,
            type: "string",
            length: { maximum: 15, minimum: 10 },
          },
          password: {
            presence: must,
            type: "string",
            length: { maximum: 15, minimum: 4 },
          },  
    })
}