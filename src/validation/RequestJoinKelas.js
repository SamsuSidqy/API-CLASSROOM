import validator from 'validator';

export default async function RequestJoinKelas(data){
	let message = {}
	let status = false
	let Fields = ['kode_kelas']
    
	for (let field of Fields) {
        if (!data.hasOwnProperty(field)) {
            return {
                status: false,
                message: `Field ${field} is required`
            };
        }
    }

    return {
        status:true,
        message:null
    }
}