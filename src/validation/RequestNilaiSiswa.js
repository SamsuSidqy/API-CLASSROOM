import validator from 'validator';

export default async function RequestNilaiSiswa(data,users){
	let message = {}
	let status = false
	let Fields = ['id_asign','nilai']

	for (let field of Fields) {
        if (!data.hasOwnProperty(field)) {
            return {
                status: false,
                message: `Field ${field} is required and cannot be empty`
            };
        }else if (typeof data[field] !== 'string' || validator.isEmpty(data[field].trim())) {
            return {
                status: false,
                message: `Field "${field}" cannot be empty`
            };
        }
    }

    

    return {
        status:true,
        message:null
    }
}